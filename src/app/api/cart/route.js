import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma"; 
import { verifyToken } from "../../../../utils/auth"; 

export async function GET(request) {
  try {
    const { userId } = await verifyToken(request);

    let userCart = await prisma.cart.findUnique({
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

    const cartWithCalculatedFields = {
      ...userCart,
      items: userCart.items.map((item) => {
        const imageUrl =
          item.product.images.length > 0 ? item.product.images[0].url : null;

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
    console.error("Error fetching cart:", error.message);
    if (
      error.message.includes("Authentication required") ||
      error.message.includes("Invalid or expired token")
    ) {
      return NextResponse.json(
        { message: "برای دسترسی به سبد خرید، احراز هویت لازم است." },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { message: "خطای داخلی سرور در دریافت سبد خرید." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { userId } = await verifyToken(request);

    const {
      productId,
      quantity = 1,
      productColorId,
      productSizeId,
    } = await request.json();

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

    let cartItem;
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
    console.error("Error adding to cart:", error.message);
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

export async function PUT(request) {
  try {
    const { userId } = await verifyToken(request);
    let requestBody;

    try {
      requestBody = await request.json();
      // ✅ لاگ برای نمایش محتوای بدنه
      console.log("Parsed PUT Request Body:", requestBody);
    } catch (jsonError) {
      console.error("Error parsing request body as JSON in PUT:", jsonError.message);
      return NextResponse.json(
        { message: "فرمت بدنه درخواست نامعتبر است (باید JSON باشد)." },
        { status: 400 }
      );
    }

    const { productId, quantity, productColorId, productSizeId } = requestBody;

    if (!productId) {
      console.error("PUT Validation Error: productId is missing.");
      return NextResponse.json(
        { message: "شناسه محصول لازم است." },
        { status: 400 }
      );
    }
    if (typeof quantity !== "number" || quantity < 0) {
      console.error("PUT Validation Error: Invalid quantity.", { quantity });
      return NextResponse.json(
        { message: "تعداد معتبر لازم است (عدد مثبت یا صفر)." },
        { status: 400 }
      );
    }

    const userCart = await prisma.cart.findUnique({
      where: { userId: userId },
    });
    if (!userCart) {
      console.error("PUT Error: Cart not found for user:", userId);
      return NextResponse.json(
        { message: "سبد خرید یافت نشد." },
        { status: 404 }
      );
    }

    console.log("Searching for cart item with:", {
      cartId: userCart.id,
      productId: productId,
      productColorId: productColorId || null,
      productSizeId: productSizeId || null,
    });

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

    console.log("Found existingCartItem for PUT:", existingCartItem);

    if (!existingCartItem) {
      console.error("PUT Error: Product not found in cart for update:", {
        cartId: userCart.id,
        productId,
        productColorId,
        productSizeId,
      });
      return NextResponse.json(
        { message: "محصول در سبد خرید یافت نشد." },
        { status: 404 }
      );
    }

    let updatedItem;
    if (quantity === 0) {
      await prisma.cartItem.delete({ where: { id: existingCartItem.id } });
      console.log("PUT: Cart item deleted (quantity 0):", existingCartItem.id);
      return NextResponse.json(
        { message: "محصول از سبد خرید حذف شد.", removed: true },
        { status: 200 }
      );
    } else {
      updatedItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: quantity },
      });
      console.log("PUT: Cart item quantity updated:", updatedItem);
    }

    return NextResponse.json(
      {
        message: "تعداد محصول در سبد خرید با موفقیت به‌روز شد.",
        item: updatedItem,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unhandled error in PUT handler:", error.message, error.stack);
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

export async function DELETE(request) {
  try {
    const { userId } = await verifyToken(request);
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const productColorId = searchParams.get("productColorId");
    const productSizeId = searchParams.get("productSizeId");

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
    console.error("Error deleting cart item:", error.message);
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