import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';

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
    if (password.length < 6) {
      return NextResponse.json({ message: 'Password must be at least 6 characters long.' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'A user with this phone number already exists.' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        phoneNumber,
        hashedPassword,
        role: "user",
      },
      select: {
        id: true,
        phoneNumber: true,
        role: true,
      }
    });

    return NextResponse.json({ message: 'Registration successful.', user: newUser }, { status: 201 });

  } catch (error) {
    console.error('Error during user registration:', error);
    return NextResponse.json({ message: 'Internal server error during registration.' }, { status: 500 });
  }
}