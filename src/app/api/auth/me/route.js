import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { verifyToken } from '../../../../../utils/auth';

export async function GET(request) {
  try {
    const { userId } = await verifyToken(request);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        phoneNumber: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'کاربر مورد نظر یافت نشد.' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    console.error('Error fetching user profile (GET):', error);

    if (error.message.includes('Authentication required') || error.message.includes('Invalid or expired token')) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    return NextResponse.json({ message: 'خطای داخلی سرور در دریافت اطلاعات پروفایل.' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { userId } = await verifyToken(request);

    const { firstName, lastName, email } = await request.json();

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: 'فرمت ایمیل نامعتبر است.' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
      },
      select: {
        id: true,
        phoneNumber: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ message: 'اطلاعات پروفایل با موفقیت به‌روزرسانی شد!', user: updatedUser }, { status: 200 });

  } catch (error) {
    console.error('Error updating user profile (PATCH):', error);

    if (error.message.includes('Authentication required') || error.message.includes('Invalid or expired token')) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    if (error.code === 'P2025') {
      return NextResponse.json({ message: 'کاربر مورد نظر برای به‌روزرسانی یافت نشد.' }, { status: 404 });
    }

    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return NextResponse.json({ message: 'این آدرس ایمیل قبلاً توسط کاربر دیگری استفاده شده است.' }, { status: 409 });
    }

    return NextResponse.json({ message: 'خطای داخلی سرور در به‌روزرسانی اطلاعات پروفایل.' }, { status: 500 });
  }
}