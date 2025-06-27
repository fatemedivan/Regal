import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/utils/auth';

// GET: دریافت جزئیات یک آدرس خاص
export async function GET(request, { params }) {
  try {
    const { userId } = await verifyToken(request);
    const addressId = params.id;

    const address = await prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!address) {
      return NextResponse.json({ message: 'آدرس یافت نشد.' }, { status: 404 });
    }

    // اطمینان حاصل کنید که کاربر فقط به آدرس‌های خودش دسترسی دارد
    if (address.userId !== userId) {
      return NextResponse.json({ message: 'شما اجازه دسترسی به این آدرس را ندارید.' }, { status: 403 });
    }

    return NextResponse.json(address, { status: 200 });

  } catch (error) {
    console.error('Error fetching single address:', error.message);
    if (error.message.includes('Authentication required') || error.message.includes('Invalid or expired token')) {
      return NextResponse.json({ message: 'برای دسترسی به جزئیات آدرس، احراز هویت لازم است.' }, { status: 401 });
    }
    return NextResponse.json({ message: 'خطای داخلی سرور در دریافت جزئیات آدرس.' }, { status: 500 });
  }
}

// PUT: به‌روزرسانی یک آدرس
export async function PUT(request, { params }) {
  try {
    const { userId } = await verifyToken(request);
    const addressId = params.id;
    // حالا فقط title, province, city, postalCode, details و isDefault را دریافت می‌کنیم
    const { title, province, city, postalCode, details, isDefault } = await request.json();

    // ابتدا آدرس را پیدا می‌کنیم تا مطمئن شویم به کاربر فعلی تعلق دارد
    const existingAddress = await prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!existingAddress) {
      return NextResponse.json({ message: 'آدرس یافت نشد.' }, { status: 404 });
    }
    if (existingAddress.userId !== userId) {
      return NextResponse.json({ message: 'شما اجازه به‌روزرسانی این آدرس را ندارید.' }, { status: 403 });
    }

    // اگر آدرس جدید به عنوان پیش‌فرض تنظیم شده باشد، آدرس‌های پیش‌فرض قبلی کاربر را غیرفعال کن
    if (isDefault === true) { // از === true استفاده می‌کنیم تا undefined را شامل نشود
      await prisma.address.updateMany({
        where: { userId: userId, isDefault: true, id: { not: addressId } }, // همه به جز این آدرس
        data: { isDefault: false },
      });
    }

    const updatedAddress = await prisma.address.update({
      where: { id: addressId },
      data: {
        title: title ?? existingAddress.title,
        province: province ?? existingAddress.province,
        city: city ?? existingAddress.city,
        postalCode: postalCode ?? existingAddress.postalCode,
        details: details ?? existingAddress.details, // به‌روزرسانی فیلد details
        isDefault: isDefault ?? existingAddress.isDefault,
      },
    });

    return NextResponse.json({ message: 'آدرس با موفقیت به‌روز شد.', address: updatedAddress }, { status: 200 });

  } catch (error) {
    console.error('Error updating address:', error.message);
    if (error.message.includes('Authentication required') || error.message.includes('Invalid or expired token')) {
      return NextResponse.json({ message: 'برای به‌روزرسانی آدرس، احراز هویت لازم است.' }, { status: 401 });
    }
    // مدیریت خطای منحصر به فرد بودن عنوان آدرس
    if (error.code === 'P2002' && error.meta?.target?.includes('title')) {
        return NextResponse.json({ message: 'شما قبلاً یک آدرس با این عنوان ثبت کرده‌اید. لطفاً عنوان دیگری انتخاب کنید.' }, { status: 409 });
    }
    return NextResponse.json({ message: 'خطای داخلی سرور در به‌روزرسانی آدرس.' }, { status: 500 });
  }
}

// DELETE: حذف یک آدرس
export async function DELETE(request, { params }) {
  try {
    const { userId } = await verifyToken(request);
    const addressId = params.id;

    // ابتدا آدرس را پیدا می‌کنیم تا مطمئن شویم به کاربر فعلی تعلق دارد
    const existingAddress = await prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!existingAddress) {
      return NextResponse.json({ message: 'آدرس یافت نشد.' }, { status: 404 });
    }
    if (existingAddress.userId !== userId) {
      return NextResponse.json({ message: 'شما اجازه حذف این آدرس را ندارید.' }, { status: 403 });
    }

    await prisma.address.delete({
      where: { id: addressId },
    });

    return NextResponse.json({ message: 'آدرس با موفقیت حذف شد.' }, { status: 200 });

  } catch (error) {
    console.error('Error deleting address:', error.message);
    if (error.message.includes('Authentication required') || error.message.includes('Invalid or expired token')) {
      return NextResponse.json({ message: 'برای حذف آدرس، احراز هویت لازم است.' }, { status: 401 });
    }
    return NextResponse.json({ message: 'خطای داخلی سرور در حذف آدرس.' }, { status: 500 });
  }
}