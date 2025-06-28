// app/api/products/[id]/route.js
import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { verifyToken } from "../../../../../utils/auth";

export async function GET(request, { params }) {
  try {
    const token = request.cookies.get("token")?.value;

    let userId = null;
    if (token) {
      try {
        const decoded = await verifyToken(token);
        userId = decoded.userId;
      } catch (tokenError) {
        console.warn(
          "Invalid or expired token in single product fetch:",
          tokenError.message
        );
      }
    }

    const { id } = params;

    const product = await prisma.product.findUnique({
      where: { id: id },
      include: {
        category: {
          select: { id: true, name: true },
        },
        productColors: {
          include: {
            color: { select: { hexCode: true, name: true } },
          },
        },
        productSizes: {
          include: {
            size: { select: { name: true } },
          },
        },
        images: {
          select: { imageUrl: true },
          orderBy: { createdAt: 'asc' }
        },
        likes: {
          // ✅ Same conditional filtering for likes
          where: userId ? { userId: userId } : undefined,
          select: { userId: true },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found." },
        { status: 404 }
      );
    }

    const relatedProducts = await prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        id: {
          not: id,
        },
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
          // ✅ Same conditional filtering for likes in related products
          where: userId ? { userId: userId } : undefined,
          select: { userId: true },
        },
      },
      take: 4,
      orderBy: { createdAt: 'desc' }
    });

    const formattedRelatedProducts = relatedProducts.map((relatedProduct) => {
      let offPercent = 0;
      if (
        relatedProduct.price &&
        relatedProduct.discountedPrice &&
        relatedProduct.price > 0
      ) {
        offPercent = Math.round(
          ((relatedProduct.price - relatedProduct.discountedPrice) /
            relatedProduct.price) *
            100
        );
      }

      const availableColors = relatedProduct.productColors.map(pc => pc.color.hexCode);
      const availableSizes = relatedProduct.productSizes.map(ps => ps.size.name);
      const mainImageUrl = relatedProduct.images.length > 0 ? relatedProduct.images[0].imageUrl : "/img/default-product.png";

      return {
        id: relatedProduct.id,
        img: mainImageUrl,
        title: relatedProduct.name,
        finalPrice: relatedProduct.discountedPrice || relatedProduct.price,
        price: relatedProduct.price,
        offPercent: offPercent,
        isLiked: relatedProduct.likes.length > 0,
        colors: availableColors,
        sizes: availableSizes,
      };
    });

    const productData = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      discountedPrice: product.discountedPrice,
      isDiscounted: product.isDiscounted,
      categoryName: product.category.name,
      categoryId: product.category.id,
      colors: product.productColors.map((pc) => ({
        name: pc.color.name,
        hexCode: pc.color.hexCode,
      })),
      sizes: product.productSizes.map((ps) => ps.size.name),
      images: product.images.map((img) => img.imageUrl),
      isLiked: product.likes.length > 0,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      offPercent:
        product.isDiscounted && product.price && product.discountedPrice && product.price > 0
          ? Math.round(
              ((product.price - product.discountedPrice) / product.price) * 100
            )
          : 0,
      relatedProducts: formattedRelatedProducts,
    };

    return NextResponse.json(productData, { status: 200 });
  } catch (error) {
    console.error("Error fetching single product:", error);
    if (
      error.message.includes("Authentication required") ||
      error.message.includes("Invalid or expired token")
    ) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    return NextResponse.json(
      { message: "خطای داخلی سرور در دریافت محصول." },
      { status: 500 }
    );
  }
}