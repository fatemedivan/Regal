import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/utils/auth';

// GET: دریافت محتویات سبد خرید کاربر
export async function GET(request) {
  try {
    const { userId } = await verifyToken(request);

    const userCart = await prisma.cart.findUnique({
      where: { userId: userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                discountedPrice: true,
                isDiscounted: true,
                imageUrl: true,
              }
            }
          }
        }
      }
    });

    if (!userCart) {
      // اگر کاربر سبد خرید ندارد، یک سبد خرید خالی برایش ایجاد کن
      const newCart = await prisma.cart.create({
        data: { userId: userId },
        include: { items: { include: { product: true } } }
      });
      return NextResponse.json(newCart, { status: 200 });
    }

    return NextResponse.json(userCart, { status: 200 });

  } catch (error) {
    console.error('Error fetching cart:', error.message);
    if (error.message.includes('Authentication required') || error.message.includes('Invalid or expired token')) {
      return NextResponse.json({ message: 'برای دسترسی به سبد خرید، احراز هویت لازم است.' }, { status: 401 });
    }
    return NextResponse.json({ message: 'خطای داخلی سرور در دریافت سبد خرید.' }, { status: 500 });
  }
}

// POST: افزودن محصول به سبد خرید
export async function POST(request) {
  try {
    const { userId } = await verifyToken(request);
    const { productId, quantity = 1 } = await request.json();

    if (!productId || typeof quantity !== 'number' || quantity < 1) {
      return NextResponse.json({ message: 'شناسه محصول و تعداد معتبر لازم است.' }, { status: 400 });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return NextResponse.json({ message: 'محصول یافت نشد.' }, { status: 404 });
    }

    let userCart = await prisma.cart.findUnique({ where: { userId: userId } });
    if (!userCart) {
      userCart = await prisma.cart.create({ data: { userId: userId } });
    }

    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: userCart.id,
          productId: productId,
        },
      },
    });

    let cartItem;
    if (existingCartItem) {
      // اگر محصول از قبل در سبد خرید هست، تعداد آن را افزایش بده
      cartItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });
    } else {
      // در غیر این صورت، محصول جدید را به سبد خرید اضافه کن
      cartItem = await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productId: productId,
          quantity: quantity,
        },
      });
    }

    return NextResponse.json({ message: 'محصول با موفقیت به سبد خرید اضافه شد.', item: cartItem }, { status: 200 });

  } catch (error) {
    console.error('Error adding to cart:', error.message);
    if (error.message.includes('Authentication required') || error.message.includes('Invalid or expired token')) {
      return NextResponse.json({ message: 'برای افزودن به سبد خرید، احراز هویت لازم است.' }, { status: 401 });
    }
    return NextResponse.json({ message: 'خطای داخلی سرور در افزودن به سبد خرید.' }, { status: 500 });
  }
}

// PUT: به‌روزرسانی تعداد یک محصول در سبد خرید
// این متد انتظار دارد که productId و quantity جدید را در body دریافت کند.
export async function PUT(request) {
  try {
    const { userId } = await verifyToken(request);
    const { productId, quantity } = await request.json();

    if (!productId || typeof quantity !== 'number' || quantity < 0) {
      return NextResponse.json({ message: 'شناسه محصول و تعداد معتبر لازم است.' }, { status: 400 });
    }

    const userCart = await prisma.cart.findUnique({ where: { userId: userId } });
    if (!userCart) {
      return NextResponse.json({ message: 'سبد خرید یافت نشد.' }, { status: 404 });
    }

    // پیدا کردن آیتم سبد خرید بر اساس cartId و productId
    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: userCart.id,
          productId: productId,
        },
      },
    });

    if (!existingCartItem) {
      return NextResponse.json({ message: 'محصول در سبد خرید یافت نشد.' }, { status: 404 });
    }

    let updatedItem;
    if (quantity === 0) {
      // اگر تعداد 0 بود، آیتم را حذف کن
      await prisma.cartItem.delete({ where: { id: existingCartItem.id } });
      return NextResponse.json({ message: 'محصول از سبد خرید حذف شد.', removed: true }, { status: 200 });
    } else {
      // در غیر این صورت، تعداد را به‌روزرسانی کن
      updatedItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: quantity },
      });
    }

    return NextResponse.json({ message: 'تعداد محصول در سبد خرید با موفقیت به‌روز شد.', item: updatedItem }, { status: 200 });

  } catch (error) {
    console.error('Error updating cart item quantity:', error.message);
    if (error.message.includes('Authentication required') || error.message.includes('Invalid or expired token')) {
      return NextResponse.json({ message: 'برای به‌روزرسانی سبد خرید، احراز هویت لازم است.' }, { status: 401 });
    }
    return NextResponse.json({ message: 'خطای داخلی سرور در به‌روزرسانی سبد خرید.' }, { status: 500 });
  }
}

// DELETE: حذف یک محصول از سبد خرید
// این متد انتظار دارد که productId را در query parameter دریافت کند.
export async function DELETE(request) {
  try {
    const { userId } = await verifyToken(request);
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId'); // productId را از query parameter بگیر

    if (!productId) {
      return NextResponse.json({ message: 'شناسه محصول برای حذف لازم است.' }, { status: 400 });
    }

    const userCart = await prisma.cart.findUnique({ where: { userId: userId } });
    if (!userCart) {
      return NextResponse.json({ message: 'سبد خرید یافت نشد.' }, { status: 404 });
    }

    // پیدا کردن آیتم سبد خرید بر اساس cartId و productId
    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: userCart.id,
          productId: productId,
        },
      },
    });

    if (!existingCartItem) {
      return NextResponse.json({ message: 'محصول در سبد خرید یافت نشد.' }, { status: 404 });
    }

    await prisma.cartItem.delete({
      where: { id: existingCartItem.id },
    });

    return NextResponse.json({ message: 'محصول با موفقیت از سبد خرید حذف شد.' }, { status: 200 });

  } catch (error) {
    console.error('Error deleting cart item:', error.message);
    if (error.message.includes('Authentication required') || error.message.includes('Invalid or expired token')) {
      return NextResponse.json({ message: 'برای حذف از سبد خرید، احراز هویت لازم است.' }, { status: 401 });
    }
    return NextResponse.json({ message: 'خطای داخلی سرور در حذف از سبد خرید.' }, { status: 500 });
  }
}