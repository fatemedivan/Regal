import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { verifyToken } from "../../../../../utils/auth";

export async function POST(request, { params }) {
  try {

    const { userId } = await verifyToken(request);
    const productId = params.id;


    const productExists = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true },
    });

    if (!productExists) {
      return NextResponse.json({ message: "محصول یافت نشد." }, { status: 404 });
    }


    const existingLike = await prisma.likedProduct.findUnique({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
    });

    if (existingLike) {

      await prisma.likedProduct.delete({
        where: {
          id: existingLike.id,
        },
      });
      return NextResponse.json(
        { message: "محصول با موفقیت دیسلایک شد.", liked: false },
        { status: 200 }
      );
    } else {

      await prisma.likedProduct.create({
        data: {
          userId: userId,
          productId: productId,
        },
      });
      return NextResponse.json(
        { message: "محصول با موفقیت لایک شد.", liked: true },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("خطا در لایک/دیسلایک کردن محصول:", error.message);

    if (
      error.message.includes("Authentication required") ||
      error.message.includes("Invalid or expired token")
    ) {
      return NextResponse.json(
        { message: "برای انجام این عملیات، احراز هویت لازم است." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "خطای داخلی سرور رخ داد." },
      { status: 500 }
    );
  }
}
