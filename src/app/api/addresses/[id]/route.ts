import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../../../utils/auth";
import { prisma } from "../../../../lib/prisma";
import { AddressBody } from "../types";

export async function GET(request: NextRequest) {
  try {
    const { userId } = await verifyToken(request);
    const { pathname } = request.nextUrl;
    const addressId = pathname.split("/").pop();

    const address = await prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!address) {
      return NextResponse.json({ message: "آدرس یافت نشد." }, { status: 404 });
    }

    if (address.userId !== userId) {
      return NextResponse.json(
        { message: "شما اجازه دسترسی به این آدرس را ندارید." },
        { status: 403 }
      );
    }

    return NextResponse.json(address, { status: 200 });
  } catch (error) {
    if (
      error.message.includes("Authentication required") ||
      error.message.includes("Invalid or expired token")
    ) {
      return NextResponse.json(
        { message: "برای دسترسی به جزئیات آدرس، احراز هویت لازم است." },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { message: "خطای داخلی سرور در دریافت جزئیات آدرس." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId } = await verifyToken(request);
    const { pathname } = request.nextUrl;
    const addressId = pathname.split("/").pop();

    const { fullAddress, province, city, postalCode, details } =
      (await request.json()) as AddressBody;

    const existingAddress = await prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!existingAddress) {
      return NextResponse.json({ message: "آدرس یافت نشد." }, { status: 404 });
    }
    if (existingAddress.userId !== userId) {
      return NextResponse.json(
        { message: "شما اجازه به‌روزرسانی این آدرس را ندارید." },
        { status: 403 }
      );
    }

    const updatedAddress = await prisma.address.update({
      where: { id: addressId },
      data: {
        fullAddress:
          fullAddress !== undefined ? fullAddress : existingAddress.fullAddress,
        province: province ?? existingAddress.province,
        city: city ?? existingAddress.city,
        postalCode: postalCode ?? existingAddress.postalCode,
        details: details ?? existingAddress.details,
      },
    });

    return NextResponse.json(
      { message: "آدرس با موفقیت به‌روز شد.", address: updatedAddress },
      { status: 200 }
    );
  } catch (error) {
    if (
      error.message.includes("Authentication required") ||
      error.message.includes("Invalid or expired token")
    ) {
      return NextResponse.json(
        { message: "برای به‌روزرسانی آدرس، احراز هویت لازم است." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "خطای داخلی سرور در به‌روزرسانی آدرس." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await verifyToken(request);
    const { pathname } = request.nextUrl;
    const addressId = pathname.split("/").pop();

    const existingAddress = await prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!existingAddress) {
      return NextResponse.json({ message: "آدرس یافت نشد." }, { status: 404 });
    }
    if (existingAddress.userId !== userId) {
      return NextResponse.json(
        { message: "شما اجازه حذف این آدرس را ندارید." },
        { status: 403 }
      );
    }

    await prisma.address.delete({
      where: { id: addressId },
    });

    return NextResponse.json(
      { message: "آدرس با موفقیت حذف شد." },
      { status: 200 }
    );
  } catch (error) {
    if (
      error.message.includes("Authentication required") ||
      error.message.includes("Invalid or expired token")
    ) {
      return NextResponse.json(
        { message: "برای حذف آدرس، احراز هویت لازم است." },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { message: "خطای داخلی سرور در حذف آدرس." },
      { status: 500 }
    );
  }
}
