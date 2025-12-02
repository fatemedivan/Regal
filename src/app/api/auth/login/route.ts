import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, password } = await request.json();

    if (!phoneNumber || !password) {
      return NextResponse.json(
        { message: "شماره و رمز عبور الزامی است" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (!user) {
      return NextResponse.json(
        { message: "کاربری با این مشخصات پیدا نشد لطفا ثبت نام کنید" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "کاربری با این مشخصات پیدا نشد لطفا ثبت نام کنید" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user.id, phoneNumber: user.phoneNumber, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json(
      { message: "Login successful.", token },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "خطای داخلی سرور" }, { status: 500 });
  }
}
