// app/api/products/discounted/route.js
import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { cookies } from "next/headers"; // Changed from 'next/headers' for clarity
import { verifyToken } from "../../../../../utils/auth";

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
        // if token is invalid, userId remains null, so isLiked will be false
      }
    }

    const discountedProducts = await prisma.product.findMany({
      where: {
        isDiscounted: true,
      },
      include: {
        category: { select: { name: true } },
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
        images: {
          select: { imageUrl: true },
          orderBy: { createdAt: 'asc' }
        },
        likes: {
          // ✅ A user ID is only provided if the user is logged in and the token is valid.
          // If userId is null, this where condition is effectively skipped for filtering by userId,
          // and Prisma will not try to find likes for a non-existent user.
          where: userId ? { userId: userId } : undefined, // Only filter by userId if it exists
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

      const availableColors = product.productColors.map(pc => pc.color.hexCode);
      const availableSizes = product.productSizes.map(ps => ps.size.name);
      const mainImageUrl = product.images.length > 0 ? product.images[0].imageUrl : "/img/default-product.png";

      return {
        id: product.id,
        img: mainImageUrl,
        title: product.name,
        finalPrice: product.discountedPrice || product.price,
        price: product.price,
        offPercent: offPercent,
        // ✅ isLiked is true if the filtered 'likes' array contains an entry for this user
        isLiked: product.likes.length > 0,
        colors: availableColors,
        sizes: availableSizes,
      };
    });

    return NextResponse.json(productsWithLikedStatus, { status: 200 });
  } catch (error) {
    console.error("Error fetching discounted products:", error);
    return NextResponse.json(
      { message: "خطا در دریافت محصولات تخفیف‌دار." },
      { status: 500 }
    );
  }
}