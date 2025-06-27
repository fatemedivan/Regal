import { NextResponse } from 'next/server';
import { verifyToken } from '../../../../utils/auth';
import { prisma } from '../../../../lib/prisma';

// GET: دریافت تمام سفارشات کاربر
export async function GET(request) {
  try {
    const { userId } = await verifyToken(request);

    const orders = await prisma.order.findMany({
      where: { userId: userId },
      orderBy: { orderDate: 'desc' }, // جدیدترین سفارشات اول باشند
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
              }
            }
          }
        }
      }
    });

    return NextResponse.json(orders, { status: 200 });

  } catch (error) {
    console.error('Error fetching orders:', error.message);
    if (error.message.includes('Authentication required') || error.message.includes('Invalid or expired token')) {
      return NextResponse.json({ message: 'برای دسترسی به سفارشات، احراز هویت لازم است.' }, { status: 401 });
    }
    return NextResponse.json({ message: 'خطای داخلی سرور در دریافت سفارشات.' }, { status: 500 });
  }
}

// POST: ثبت یک سفارش جدید از محتویات سبد خرید
export async function POST(request) {
  try {
    const { userId } = await verifyToken(request);

    // 1. دریافت سبد خرید کاربر
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
              }
            }
          }
        }
      }
    });

    if (!userCart || userCart.items.length === 0) {
      return NextResponse.json({ message: 'سبد خرید شما خالی است.' }, { status: 400 });
    }

    // 2. محاسبه مبلغ کل سفارش
    let totalAmount = 0;
    const orderItemsData = userCart.items.map(item => {
      const priceToUse = item.product.isDiscounted && item.product.discountedPrice !== null
        ? item.product.discountedPrice
        : item.product.price;
      totalAmount += priceToUse * item.quantity;

      return {
        productId: item.productId,
        quantity: item.quantity,
        priceAtOrder: priceToUse, // قیمت محصول در لحظه سفارش
      };
    });

    // 3. ایجاد سفارش جدید در یک تراکنش (transaction)
    // این کار اطمینان می دهد که یا کل سفارش ثبت می شود یا هیچ چیز (atomicity)
    const order = await prisma.$transaction(async (prisma) => {
      const newOrder = await prisma.order.create({
        data: {
          userId: userId,
          totalAmount: totalAmount,
          status: "pending", // وضعیت اولیه سفارش
          items: {
            createMany: {
              data: orderItemsData,
            },
          },
        },
      });

      // 4. خالی کردن سبد خرید پس از ثبت سفارش
      await prisma.cartItem.deleteMany({
        where: { cartId: userCart.id },
      });

      return newOrder;
    });

    return NextResponse.json({ message: 'سفارش شما با موفقیت ثبت شد!', orderId: order.id }, { status: 201 });

  } catch (error) {
    console.error('Error placing order:', error.message);
    if (error.message.includes('Authentication required') || error.message.includes('Invalid or expired token')) {
      return NextResponse.json({ message: 'برای ثبت سفارش، احراز هویت لازم است.' }, { status: 401 });
    }
    return NextResponse.json({ message: 'خطای داخلی سرور در ثبت سفارش.' }, { status: 500 });
  }
}