import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { verifyToken } from '../../../utils/auth';


export async function GET(request) {
  try {
    const { userId } = await verifyToken(request);

    const addresses = await prisma.address.findMany({
      where: { userId: userId },

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

export async function POST(request) {
  try {
    const { userId } = await verifyToken(request);

    const { fullAddress, province, city, postalCode, details } = await request.json();


    if (!fullAddress || !province || !city || !postalCode || !details) {
      return NextResponse.json({ message: 'لطفاً تمام فیلدهای اجباری آدرس (آدرس کامل، استان، شهر، کد پستی، جزئیات) را پر کنید.' }, { status: 400 });
    }


    const newAddress = await prisma.address.create({
      data: {
        userId: userId,
        fullAddress: fullAddress,
        province: province,
        city: city,
        postalCode: postalCode,
        details: details,
      },
    });

    return NextResponse.json({ message: 'آدرس با موفقیت اضافه شد.', address: newAddress }, { status: 201 });
  } catch (error) {
    console.error('Error adding address:', error.message);
    if (error.message.includes('Authentication required') || error.message.includes('Invalid or expired token')) {
      return NextResponse.json({ message: 'برای افزودن آدرس، احراز هویت لازم است.' }, { status: 401 });
    }

    return NextResponse.json({ message: 'خطای داخلی سرور در افزودن آدرس.' }, { status: 500 });
  }
}