import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { verifyToken } from "../../../../../utils/auth";

// GET: دریافت جزئیات یک سفارش خاص
export async function GET(request, { params }) {
  try {
    const { userId } = await verifyToken(request);
    const orderId = params.id;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: {
          select: { phoneNumber: true }, // مثلاً برای نمایش شماره تلفن کاربر
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
                // price: true, // اگر می خواهید قیمت اصلی را هم ببینید
              },
            },
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ message: "سفارش یافت نشد." }, { status: 404 });
    }

    // اطمینان حاصل کنید که کاربر فقط به سفارشات خودش دسترسی دارد
    if (order.userId !== userId) {
      return NextResponse.json(
        { message: "شما اجازه دسترسی به این سفارش را ندارید." },
        { status: 403 }
      );
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Error fetching single order:", error.message);
    if (
      error.message.includes("Authentication required") ||
      error.message.includes("Invalid or expired token")
    ) {
      return NextResponse.json(
        { message: "برای دسترسی به جزئیات سفارش، احراز هویت لازم است." },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { message: "خطای داخلی سرور در دریافت جزئیات سفارش." },
      { status: 500 }
    );
  }
}
