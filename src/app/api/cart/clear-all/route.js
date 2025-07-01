import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma"; 
import { verifyToken } from "../../../../../utils/auth"; 

export async function DELETE(request) {
  try {
    const { userId } = await verifyToken(request);

    const userCart = await prisma.cart.findUnique({
      where: { userId: userId },
    });

    if (!userCart) {
      return NextResponse.json(
        { message: "سبد خریدی برای این کاربر یافت نشد." },
        { status: 404 }
      );
    }

    await prisma.cartItem.deleteMany({
      where: { cartId: userCart.id },
    });


    console.log(`Cart for user ${userId} has been cleared.`);

    return NextResponse.json(
      { message: "سبد خرید با موفقیت پاک شد." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error clearing entire cart:", error.message);
    if (
      error.message.includes("Authentication required") ||
      error.message.includes("Invalid or expired token")
    ) {
      return NextResponse.json(
        { message: "برای پاک کردن سبد خرید، احراز هویت لازم است." },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { message: "خطای داخلی سرور در پاک کردن سبد خرید." },
      { status: 500 }
    );
  }
}