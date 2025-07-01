import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { verifyToken } from '../../../../utils/auth';

// GET: دریافت تمام آدرس‌های کاربر
export async function GET(request) {
  try {
    const { userId } = await verifyToken(request);

    const addresses = await prisma.address.findMany({
      where: { userId: userId },
      // isDefault حذف شده است، بنابراین این orderBy را حذف می کنیم یا آن را به یک فیلد دیگر تغییر می دهیم
      // در حال حاضر فقط بر اساس زمان ایجاد مرتب می کنیم
      orderBy: { createdAt: 'asc' },
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
    // حالا فقط fullAddress, province, city, postalCode و details را از ورودی می‌گیریم
    const { fullAddress, province, city, postalCode, details } = await request.json();

    // اعتبارسنجی ورودی‌های ضروری
    if (!fullAddress || !province || !city || !postalCode || !details) {
      return NextResponse.json({ message: 'لطفاً تمام فیلدهای اجباری آدرس (آدرس کامل، استان، شهر، کد پستی، جزئیات) را پر کنید.' }, { status: 400 });
    }

    // isDefault حذف شده است، بنابراین کد مربوط به آن نیز حذف می شود.
    // اگر همچنان نیاز به یک آدرس پیش‌فرض دارید، باید منطق جدیدی برای آن پیاده‌سازی کنید.

    const newAddress = await prisma.address.create({
      data: {
        userId: userId,
        fullAddress: fullAddress,
        province: province,
        city: city,
        postalCode: postalCode,
        details: details, // شامل خیابان، پلاک، واحد و توضیحات اضافی
      },
    });

    return NextResponse.json({ message: 'آدرس با موفقیت اضافه شد.', address: newAddress }, { status: 201 });
  } catch (error) {
    console.error('Error adding address:', error.message);
    if (error.message.includes('Authentication required') || error.message.includes('Invalid or expired token')) {
      return NextResponse.json({ message: 'برای افزودن آدرس، احراز هویت لازم است.' }, { status: 401 });
    }
    // خطای منحصر به فرد بودن عنوان آدرس (P2002) حذف شد زیرا title دیگر وجود ندارد.
    return NextResponse.json({ message: 'خطای داخلی سرور در افزودن آدرس.' }, { status: 500 });
  }
}