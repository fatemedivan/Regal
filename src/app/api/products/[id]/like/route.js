import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // مطمئن شوید مسیر درست است
import { verifyToken } from '@/utils/auth'; // مطمئن شوید مسیر درست است

export async function POST(request, { params }) {
  try {
    // احراز هویت کاربر و گرفتن شناسه کاربری (userId) از توکن
    const { userId } = await verifyToken(request); 
    const productId = params.id; // گرفتن شناسه محصول (ID) از پارامترهای URL

    // 1. بررسی وجود محصول
    // ابتدا مطمئن می‌شویم محصولی با این شناسه واقعا وجود دارد.
    const productExists = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true } // فقط نیاز داریم بدانیم که آیا وجود دارد یا نه
    });

    if (!productExists) {
      return NextResponse.json({ message: 'محصول یافت نشد.' }, { status: 404 });
    }

    // 2. بررسی اینکه آیا کاربر قبلاً این محصول را لایک کرده است
    // از محدودیت یکتایی (@@unique) که در مدل LikedProduct تعریف کرده‌ایم استفاده می‌کنیم.
    const existingLike = await prisma.likedProduct.findUnique({
      where: {
        userId_productId: { 
          userId: userId,
          productId: productId
        }
      }
    });

    if (existingLike) {
      // 3. اگر قبلاً لایک شده بود، آن را "دیسلایک" کن (حذف رکورد)
      await prisma.likedProduct.delete({
        where: {
          id: existingLike.id // بر اساس شناسه رکورد لایک، آن را حذف می‌کنیم
        }
      });
      return NextResponse.json({ message: 'محصول با موفقیت دیسلایک شد.', liked: false }, { status: 200 });
    } else {
      // 4. اگر لایک نشده بود، آن را "لایک" کن (ایجاد یک رکورد جدید)
      await prisma.likedProduct.create({
        data: {
          userId: userId,
          productId: productId
        }
      });
      return NextResponse.json({ message: 'محصول با موفقیت لایک شد.', liked: true }, { status: 201 });
    }

  } catch (error) {
    console.error('خطا در لایک/دیسلایک کردن محصول:', error.message);
    // مدیریت خطاهای مربوط به احراز هویت (توکن نامعتبر یا ناموجود)
    if (error.message.includes('Authentication required') || error.message.includes('Invalid or expired token')) {
      return NextResponse.json({ message: 'برای انجام این عملیات، احراز هویت لازم است.' }, { status: 401 });
    }
    // مدیریت خطاهای داخلی سرور
    return NextResponse.json({ message: 'خطای داخلی سرور رخ داد.' }, { status: 500 });
  }
}