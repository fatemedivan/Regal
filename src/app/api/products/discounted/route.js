import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { verifyToken } from '../../../../../utils/auth'; // مطمئن شوید مسیر و تابع درست است

export async function GET(request) {
  try {
    let userId = null;
    try {
      // تلاش برای استخراج userId. اگر توکن نامعتبر باشد، خطا می‌دهد و userId null می‌ماند.
      const verificationResult = await verifyToken(request);
      userId = verificationResult.userId;
    } catch (authError) {
      console.warn("Authentication failed for discounted products API, proceeding without user ID:", authError.message);
      // نیازی به return 401 در اینجا نیست، چون ممکن است بخواهیم محصولات را بدون وضعیت لایک نمایش دهیم.
      // اگر حتماً نیاز به احراز هویت برای دیدن این لیست دارید، اینجا 401 برگردانید.
    }

    const discountedProducts = await prisma.product.findMany({
      where: {
        isDiscounted: true, // فقط محصولات تخفیف‌دار
        discountedPrice: {
          not: null, // اطمینان از اینکه قیمت تخفیف‌دار تنظیم شده است
        },
      },
      take: 4, 
      orderBy: {
        createdAt: 'desc', // می‌توانید اینجا یک مرتب‌سازی دلخواه (مثلاً جدیدترین تخفیف‌ها) داشته باشید
      },
      include: {
        category: {
          select: { name: true } // شامل نام دسته‌بندی
        },
        // اگر ProductColor و Favorite مدل‌های مرتبط با Product هستند، باید آن‌ها را include کنید
        // در غیر این صورت، این خطوط را حذف کنید
        // ProductColor: true, // فرض می‌کنیم ProductColor یک رابطه در schema.prisma است
        // Favorite: true,     // فرض می‌کنیم Favorite (LikedProduct) یک رابطه است
      }
    });

    // بررسی اینکه آیا هر محصول توسط کاربر فعلی لایک شده است (اختیاری)
    const likedProductIds = new Set();
    if (userId) { // فقط اگر userId معتبر باشد، لایک‌ها را بررسی کن
      const productIds = discountedProducts.map(p => p.id);
      const likedProductsByUser = await prisma.likedProduct.findMany({
        where: {
          userId: userId,
          productId: { in: productIds }
        },
        select: { productId: true }
      });
      likedProductsByUser.forEach(lp => likedProductIds.add(lp.productId));
    }

    const productsWithLikedStatus = discountedProducts.map(product => {
      // محاسبه درصد تخفیف
      let offPercent = 0;
      if (product.price && product.discountedPrice && product.price > 0) {
        offPercent = Math.round(((product.price - product.discountedPrice) / product.price) * 100);
      }

      return {
        id: product.id,
        img: product.imageUrl || '/img/default-product.png', // تصویر پیش‌فرض اگر imageUrl وجود نداشت
        title: product.name, // نام محصول
        finalPrice: product.discountedPrice || product.price, // قیمت بعد از تخفیف
        price: product.price, // قیمت اصلی
        offPercent: offPercent,
        isLiked: likedProductIds.has(product.id), // وضعیت لایک
        colors: product.color || [], 
        favorites: product.Favorite || [], 
      };
    });

    return NextResponse.json(productsWithLikedStatus, { status: 200 });

  } catch (error) {
    console.error('Error fetching discounted products:', error.message);
    if (error.message.includes('Authentication required') || error.message.includes('Invalid or expired token')) {
      return NextResponse.json({ message: "Authentication is required or your token is invalid/expired." }, { status: 401 });
    }
    return NextResponse.json({ message: 'Internal server error fetching discounted products.' }, { status: 500 });
  } finally {
    // await prisma.$disconnect();
  }
}