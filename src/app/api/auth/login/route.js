import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  if (!JWT_SECRET) {
    return NextResponse.json({ message: 'JWT_SECRET is not defined in environment variables.' }, { status: 500 });
  }

  try {
    const { phoneNumber, password } = await request.json();

    if (!phoneNumber || !password) {
      return NextResponse.json({ message: 'Phone number and password are required.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (!user) {
      return NextResponse.json({ message:'کاربری با این مشخصات پیدا نشد لطفا ثبت نام کنید' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'کاربری با این مشخصات پیدا نشد لطفا ثبت نام کنید' }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user.id, phoneNumber: user.phoneNumber, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({ message: 'Login successful.', token }, { status: 200 });

  } catch (error) {
    console.error('Error during user login:', error);
    return NextResponse.json({ message: 'Internal server error during login.' }, { status: 500 });
  }
}