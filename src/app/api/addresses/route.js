import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { verifyToken } from '../../../../utils/auth';

// GET: دریافت تمام آدرس‌های کاربر
export async function GET(request) {
  try {
    const { userId } = await verifyToken(request);

    const addresses = await prisma.address.findMany({
      where: { userId: userId },
      orderBy: { isDefault: 'desc', createdAt: 'asc' }, // آدرس پیش‌فرض اول باشد، سپس بر اساس زمان ایجاد
    });

    return NextResponse.json(addresses, { status: 200 });

  } catch (error) {
    console.error('Error fetching addresses:', error.message);
    if (error.message.includes('Authentication required') || error.message.includes('Invalid or expired token')) {
      return NextResponse.json({ message: 'برای دسترسی به آدرس‌ها، احراز هویت لازم است.' }, { status: 401 });
    }
    return NextResponse.json({ message: 'خطای داخلی سرور در دریافت آدرس‌ها.' }, { status: 500 });
  }
}

// POST: افزودن آدرس جدید
export async function POST(request) {
  try {
    const { userId } = await verifyToken(request);
    // حالا فقط title, province, city, postalCode و details را از ورودی می‌گیریم
    const { title, province, city, postalCode, details, isDefault = false } = await request.json();

    // اعتبارسنجی ورودی‌های ضروری
    if (!province || !city || !postalCode || !details) {
      return NextResponse.json({ message: 'لطفاً تمام فیلدهای اجباری آدرس (استان، شهر، کد پستی، جزئیات کامل آدرس) را پر کنید.' }, { status: 400 });
    }

    // اگر آدرس جدید به عنوان پیش‌فرض تنظیم شده باشد، آدرس‌های پیش‌فرض قبلی کاربر را غیرفعال کن
    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId: userId, isDefault: true },
        data: { isDefault: false },
      });
    }

    const newAddress = await prisma.address.create({
      data: {
        userId: userId,
        title: title, // title می‌تواند null باشد
        province: province,
        city: city,
        postalCode: postalCode,
        details: details, // شامل خیابان، پلاک، واحد و توضیحات اضافی
        isDefault: isDefault,
      },
    });

    return NextResponse.json({ message: 'آدرس با موفقیت اضافه شد.', address: newAddress }, { status: 201 });

  } catch (error) {
    console.error('Error adding address:', error.message);
    if (error.message.includes('Authentication required') || error.message.includes('Invalid or expired token')) {
      return NextResponse.json({ message: 'برای افزودن آدرس، احراز هویت لازم است.' }, { status: 401 });
    }
    // مدیریت خطای منحصر به فرد بودن عنوان آدرس (اگر title پر شده باشد)
    if (error.code === 'P2002' && error.meta?.target?.includes('title')) {
        return NextResponse.json({ message: 'شما قبلاً یک آدرس با این عنوان ثبت کرده‌اید. لطفاً عنوان دیگری انتخاب کنید.' }, { status: 409 });
    }
    return NextResponse.json({ message: 'خطای داخلی سرور در افزودن آدرس.' }, { status: 500 });
  }
}