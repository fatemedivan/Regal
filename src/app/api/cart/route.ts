import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { verifyToken } from "../../../utils/auth";
import { CartItemBody, CartItemFull, CartWithItems } from "./types";
import { CartItem } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const { userId } = await verifyToken(request);

    let userCart: CartWithItems | null = await prisma.cart.findUnique({
      where: { userId: userId },
      include: {
        items: {
          include: {
            product: {
              include: { images: true },
            },
            productColor: {
              include: {
                color: true,
              },
            },
            productSize: {
              include: {
                size: true,
              },
            },
          },
        },
      },
    });

    if (!userCart) {
      const newCart = await prisma.cart.create({
        data: { userId: userId },
        include: {
          items: {
            include: {
              product: {
                include: { images: true },
              },
              productColor: { include: { color: true } },
              productSize: { include: { size: true } },
            },
          },
        },
      });
      userCart = newCart;
    }

    const cartWithCalculatedFields: CartWithItems = {
      ...userCart,
      items: userCart.items.map((item): CartItemFull => {
        const imageUrl =
          item.product.images.length > 0
            ? item.product.images[0].imageUrl
            : null;

        let offPercent = 0;
        if (
          item.product.isDiscounted &&
          item.product.discountedPrice !== null &&
          item.product.price > 0
        ) {
          offPercent =
            ((item.product.price - item.product.discountedPrice) /
              item.product.price) *
            100;
          offPercent = Math.round(offPercent);
        }

        return {
          ...item,
          product: {
            ...item.product,
            imageUrl: imageUrl,
            offPercent: offPercent,
          },
        };
      }),
    };

    return NextResponse.json(cartWithCalculatedFields, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "خطای داخلی سرور در دریافت سبد خرید." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await verifyToken(request);

    const {
      productId,
      quantity = 1,
      productColorId,
      productSizeId,
    } = (await request.json()) as CartItemBody;

    if (!productId || typeof quantity !== "number" || quantity < 1) {
      return NextResponse.json(
        { message: "شناسه محصول و تعداد معتبر لازم است." },
        { status: 400 }
      );
    }

    if (productColorId) {
      const existingProductColor = await prisma.productColor.findUnique({
        where: { id: productColorId, productId: productId },
      });
      if (!existingProductColor) {
        return NextResponse.json(
          { message: "رنگ محصول نامعتبر است." },
          { status: 400 }
        );
      }
    }

    if (productSizeId) {
      const existingProductSize = await prisma.productSize.findUnique({
        where: { id: productSizeId, productId: productId },
      });
      if (!existingProductSize) {
        return NextResponse.json(
          { message: "سایز محصول نامعتبر است." },
          { status: 400 }
        );
      }
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return NextResponse.json({ message: "محصول یافت نشد." }, { status: 404 });
    }

    let userCart = await prisma.cart.findUnique({ where: { userId: userId } });
    if (!userCart) {
      userCart = await prisma.cart.create({ data: { userId: userId } });
    }

    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId_productColorId_productSizeId: {
          cartId: userCart.id,
          productId: productId,
          productColorId: productColorId || null,
          productSizeId: productSizeId || null,
        },
      },
    });

    let cartItem: CartItem;
    if (existingCartItem) {
      cartItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });
    } else {
      cartItem = await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productId: productId,
          quantity: quantity,
          productColorId: productColorId,
          productSizeId: productSizeId,
        },
      });
    }

    return NextResponse.json(
      { message: "محصول با موفقیت به سبد خرید اضافه شد.", item: cartItem },
      { status: 200 }
    );
  } catch (error) {
    if (
      error.message.includes("Authentication required") ||
      error.message.includes("Invalid or expired token")
    ) {
      return NextResponse.json(
        { message: "برای افزودن به سبد خرید، احراز هویت لازم است." },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { message: "خطای داخلی سرور در افزودن به سبد خرید." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId } = await verifyToken(request);
    let requestBody: CartItemBody;

    try {
      requestBody = await request.json();
    } catch (jsonError) {
      return NextResponse.json(
        { message: "فرمت بدنه درخواست نامعتبر است (باید JSON باشد)." },
        { status: 400 }
      );
    }

    const { productId, quantity, productColorId, productSizeId } = requestBody;

    if (!productId) {
      return NextResponse.json(
        { message: "شناسه محصول لازم است." },
        { status: 400 }
      );
    }
    if (typeof quantity !== "number" || quantity < 0) {
      return NextResponse.json(
        { message: "تعداد معتبر لازم است (عدد مثبت یا صفر)." },
        { status: 400 }
      );
    }

    const userCart = await prisma.cart.findUnique({
      where: { userId: userId },
    });
    if (!userCart) {
      return NextResponse.json(
        { message: "سبد خرید یافت نشد." },
        { status: 404 }
      );
    }

    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId_productColorId_productSizeId: {
          cartId: userCart.id,
          productId: productId,
          productColorId: productColorId || null,
          productSizeId: productSizeId || null,
        },
      },
    });

    if (!existingCartItem) {
      return NextResponse.json(
        { message: "محصول در سبد خرید یافت نشد." },
        { status: 404 }
      );
    }

    let updatedItem: CartItem;

    if (quantity === 0) {
      await prisma.cartItem.delete({ where: { id: existingCartItem.id } });
      return NextResponse.json(
        { message: "محصول از سبد خرید حذف شد.", removed: true },
        { status: 200 }
      );
    } else {
      updatedItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: quantity },
      });
    }

    return NextResponse.json(
      {
        message: "تعداد محصول در سبد خرید با موفقیت به‌روز شد.",
        item: updatedItem,
      },
      { status: 200 }
    );
  } catch (error) {
    if (
      error.message.includes("Authentication required") ||
      error.message.includes("Invalid or expired token")
    ) {
      return NextResponse.json(
        { message: "برای به‌روزرسانی سبد خرید، احراز هویت لازم است." },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { message: "خطای داخلی سرور در به‌روزرسانی سبد خرید." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await verifyToken(request);
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId") as string | null;
    const productColorId = searchParams.get("productColorId") as string | null;
    const productSizeId = searchParams.get("productSizeId") as string | null;

    if (!productId) {
      return NextResponse.json(
        { message: "شناسه محصول برای حذف لازم است." },
        { status: 400 }
      );
    }

    const userCart = await prisma.cart.findUnique({
      where: { userId: userId },
    });
    if (!userCart) {
      return NextResponse.json(
        { message: "سبد خرید یافت نشد." },
        { status: 404 }
      );
    }

    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId_productColorId_productSizeId: {
          cartId: userCart.id,
          productId: productId,
          productColorId: productColorId || null,
          productSizeId: productSizeId || null,
        },
      },
    });

    if (!existingCartItem) {
      return NextResponse.json(
        { message: "محصول در سبد خرید یافت نشد." },
        { status: 404 }
      );
    }

    await prisma.cartItem.delete({
      where: { id: existingCartItem.id },
    });

    return NextResponse.json(
      { message: "محصول با موفقیت از سبد خرید حذف شد." },
      { status: 200 }
    );
  } catch (error) {
    if (
      error.message.includes("Authentication required") ||
      error.message.includes("Invalid or expired token")
    ) {
      return NextResponse.json(
        { message: "برای حذف از سبد خرید، احراز هویت لازم است." },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { message: "خطای داخلی سرور در حذف از سبد خرید." },
      { status: 500 }
    );
  }
}
