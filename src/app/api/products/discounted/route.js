// app/api/products/discounted/route.js
import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma"; // مسیر فایل prisma.js شما
import { cookies } from "next/headers";
import { verifyToken } from "../../../../../utils/auth"; // مسیر utils/auth شما

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    let userId = null;
    if (token) {
      try {
        const decoded = await verifyToken(token);
        userId = decoded.userId;
      } catch (tokenError) {
        console.warn("Invalid or expired token:", tokenError.message);
        // اگر توکن نامعتبر بود، userId همچنان null می‌ماند که باعث می‌شود isLiked false شود
      }
    }

    const discountedProducts = await prisma.product.findMany({
      where: {
        isDiscounted: true,
      },
      include: {
        category: { select: { name: true } },
        // ✅ include کردن روابط جدید
        productColors: {
          include: {
            color: { select: { hexCode: true } }
          }
        },
        productSizes: {
          include: {
            size: { select: { name: true } }
          }
        },
        likes: {
          where: { userId: userId || undefined }, // فقط لایک‌های کاربر فعلی (اگر لاگین کرده باشد)
          select: { userId: true },
        },
      },
    });

    const productsWithLikedStatus = discountedProducts.map((product) => {
      let offPercent = 0;
      if (product.price && product.discountedPrice && product.price > 0) {
        offPercent = Math.round(
          ((product.price - product.discountedPrice) / product.price) * 100
        );
      }

      // ✅ استخراج فقط کدهای هگز از productColors
      const availableColors = product.productColors.map(pc => pc.color.hexCode);
      // ✅ استخراج فقط نام سایزها از productSizes
      const availableSizes = product.productSizes.map(ps => ps.size.name);

      return {
        id: product.id,
        img: product.imageUrl || "/img/default-product.png",
        title: product.name,
        finalPrice: product.discountedPrice || product.price,
        price: product.price,
        offPercent: offPercent,
        isLiked: product.likes.length > 0, // اگر لایکی برای این کاربر پیدا شد، true
        colors: availableColors, // ✅ آرایه‌ای از کدهای هگز
        sizes: availableSizes,   // ✅ آرایه‌ای از نام سایزها
      };
    });

    return NextResponse.json(productsWithLikedStatus, { status: 200 });
  } catch (error) {
    console.error("Error fetching discounted products:", error);
    return NextResponse.json(
      { message: "خطا در دریافت محصولات تخفیف‌دار." },
      { status: 500 }
    );
  } finally {
    // ✅ مطمئن شوید این خط حذف شده است
    // await prisma.$disconnect();
  }
}