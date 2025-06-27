import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma'; 
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  if (!JWT_SECRET) {
    return NextResponse.json({ message: 'JWT_SECRET is not defined in environment variables.' }, { status: 500 });
  }

  try {
    const { phoneNumber, password } = await request.json();

    // 1. Validation
    if (!phoneNumber || !password) {
      return NextResponse.json({ message: 'Phone number and password are required.' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ message: 'Password must be at least 6 characters long.' }, { status: 400 });
    }

    // 2. Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'A user with this phone number already exists.' }, { status: 409 });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create new user
    const newUser = await prisma.user.create({
      data: {
        phoneNumber,
        hashedPassword,
        role: "user", // Default role
      },
      select: {
        id: true,
        phoneNumber: true,
        role: true,
      }
    });

    // 5. Generate JWT token
    // const token = jwt.sign(
    //   { userId: newUser.id, phoneNumber: newUser.phoneNumber, role: newUser.role },
    //   JWT_SECRET,
    //   { expiresIn: '1h' }
    // );

    // 6. Return success response with token
    return NextResponse.json({ message: 'Registration successful.', user: newUser }, { status: 201 });

  } catch (error) {
    console.error('Error during user registration:', error);
    return NextResponse.json({ message: 'Internal server error during registration.' }, { status: 500 });
  }
}