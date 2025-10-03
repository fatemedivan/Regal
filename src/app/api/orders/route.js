import { NextResponse } from 'next/server';
import { verifyToken } from '../../../utils/auth';
import { prisma } from '../../../lib/prisma';

export async function GET(request) {
  try {

    const { userId } = await verifyToken(request);


    const orders = await prisma.order.findMany({
      where: { userId: userId },
      select: {
        id: true,
        userId: true,
        totalAmount: true,
        status: true,
        orderDate: true,
        fullAddress: true,
        deliveryMethod: true,
        paymentMethod: true,
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
                price: true,
                discountedPrice: true,
                isDiscounted: true,
              },
            },
          },
        },
      },
      orderBy: {
        orderDate: 'desc',
      },
    });

    return NextResponse.json(orders, { status: 200 });

  } catch (error) {
    console.error('Error fetching user orders:', error);


    if (error.message.includes('Authentication required') || error.message.includes('Invalid or expired token')) {
      return NextResponse.json({ message: 'برای مشاهده سفارشات، احراز هویت لازم است. لطفاً وارد شوید.' }, { status: 401 });
    }


    return NextResponse.json({ message: 'خطای داخلی سرور در دریافت سفارشات. لطفاً بعداً امتحان کنید.' }, { status: 500 });
  }
}


export async function POST(request) {
  try {
    const { userId } = await verifyToken(request);
    const { fullAddress, deliveryMethod, paymentMethod } = await request.json();

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
      return NextResponse.json({ message: 'سبد خرید شما خالی است و امکان ثبت سفارش وجود ندارد.' }, { status: 400 });
    }

    if (!fullAddress || !deliveryMethod || !paymentMethod) {
      return NextResponse.json({ message: 'اطلاعات آدرس، روش ارسال یا روش پرداخت ناقص است.' }, { status: 400 });
    }

    let totalAmount = 0;
    const orderItemsData = userCart.items.map(item => {
      const priceToUse = item.product.isDiscounted && item.product.discountedPrice !== null
        ? item.product.discountedPrice
        : item.product.price;
      totalAmount += priceToUse * item.quantity;

      return {
        productId: item.productId,
        quantity: item.quantity,
        priceAtOrder: priceToUse,
      };
    });

    const order = await prisma.$transaction(async (prisma) => {
      const newOrder = await prisma.order.create({
        data: {
          userId: userId,
          totalAmount: totalAmount,
          status: "pending",
          fullAddress: fullAddress,
          deliveryMethod: deliveryMethod,
          paymentMethod: paymentMethod,
          items: {
            createMany: {
              data: orderItemsData,
            },
          },
        },
      });

      await prisma.cartItem.deleteMany({
        where: { cartId: userCart.id },
      });

      return newOrder;
    });

    return NextResponse.json({ message: 'سفارش شما با موفقیت ثبت شد!', orderId: order.id }, { status: 201 });

  } catch (error) {
    console.error('خطا در ثبت سفارش:', error.message);
    if (error.message.includes('Authentication required') || error.message.includes('Invalid or expired token')) {
      return NextResponse.json({ message: 'برای ثبت سفارش، احراز هویت لازم است.' }, { status: 401 });
    }
    if (error.message.includes('subd-invalid-request-body') || error.message.includes('Expected JSON body')) {
      return NextResponse.json({ message: 'اطلاعات ارسالی نامعتبر است. لطفا فرم را بررسی کنید.' }, { status: 400 });
    }
    return NextResponse.json({ message: 'خطای داخلی سرور در ثبت سفارش. لطفاً بعداً امتحان کنید.' }, { status: 500 });
  }
}