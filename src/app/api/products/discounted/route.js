import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "../../../../utils/auth";

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
          where: userId ? { userId: userId } : { id: "a_non_existent_like_id" },
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