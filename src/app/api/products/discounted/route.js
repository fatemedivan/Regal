// app/api/products/discounted/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/utils/auth';

export async function GET(request) {
  try {
    // از verifyToken استفاده می‌کنیم تا userId را برای بررسی وضعیت لایک محصول بگیریم
    // اگر نمی‌خواهید در صفحه اصلی، وضعیت لایک نمایش داده شود، می‌توانید این خط را حذف کنید
    // و سپس بخش مربوط به likedProductsByUser و productsWithLikedStatus را نیز بردارید.
    const { userId } = await verifyToken(request); 

    const discountedProducts = await prisma.product.findMany({
      where: {
        isDiscounted: true, // فقط محصولات تخفیف‌دار
        discountedPrice: {
          not: null, // اطمینان از اینکه قیمت تخفیف‌دار تنظیم شده است
        },
      },
      take: 6, // فقط 6 محصول را بگیر
      orderBy: {
        createdAt: 'desc', // می‌توانید اینجا یک مرتب‌سازی دلخواه (مثلاً جدیدترین تخفیف‌ها) داشته باشید
      },
      include: {
        category: {
          select: { name: true } // شامل نام دسته‌بندی
        }
      }
    });

    // بررسی اینکه آیا هر محصول توسط کاربر فعلی لایک شده است (اختیاری)
    const productIds = discountedProducts.map(p => p.id);
    const likedProductsByUser = await prisma.likedProduct.findMany({
      where: {
        userId: userId,
        productId: { in: productIds }
      },
      select: { productId: true }
    });

    const likedProductIds = new Set(likedProductsByUser.map(lp => lp.productId));

    const productsWithLikedStatus = discountedProducts.map(product => ({
      ...product,
      isLiked: likedProductIds.has(product.id)
    }));


    // پاسخ شامل فقط لیست محصولات تخفیف‌دار است
    return NextResponse.json(productsWithLikedStatus, { status: 200 });

  } catch (error) {
    console.error('Error fetching discounted products for home page:', error.message);
    // مدیریت خطاهای احراز هویت. اگر verifyToken را حذف کنید، این بخش نیز باید حذف شود.
    if (error.message.includes('Authentication required') || error.message.includes('Invalid or expired token')) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    return NextResponse.json({ message: 'Internal server error fetching discounted products.' }, { status: 500 });
  }
}