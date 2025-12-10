import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { verifyToken } from "../../../../utils/auth";
import { SingleProductWithIncludes } from "../types";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    let userId = null;
    if (token) {
      try {
        const decoded = await verifyToken(request);
        userId = decoded.userId;
      } catch (tokenError) {}
    }

    const urlParts = request.nextUrl.pathname.split("/");
    const id = urlParts[urlParts.length - 1];

    const product: SingleProductWithIncludes | null =
      await prisma.product.findUnique({
        where: { id: id },
        include: {
          category: {
            select: { id: true, name: true },
          },
          productColors: {
            select: {
              id: true,
              color: { select: { id: true, hexCode: true, name: true } },
            },
          },
          productSizes: {
            select: {
              id: true,
              size: { select: { id: true, name: true } },
            },
          },
          images: {
            select: { id: true, imageUrl: true },
            orderBy: { createdAt: "asc" },
          },
          likes: userId
            ? { where: { userId }, select: { userId: true } }
            : false,
        },
      });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found." },
        { status: 404 }
      );
    }

    const relatedProducts: SingleProductWithIncludes[] =
      await prisma.product.findMany({
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
              color: { select: { hexCode: true } },
            },
          },
          productSizes: {
            include: {
              size: { select: { name: true } },
            },
          },
          images: {
            select: { id: true, imageUrl: true },
            orderBy: { createdAt: "asc" },
          },

          likes: userId
            ? { where: { userId }, select: { userId: true } }
            : undefined,
        },
        take: 4,
        orderBy: { createdAt: "desc" },
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

      const productColors = relatedProduct.productColors.map((pc) => ({
        id: pc.id,
        name: pc.color.name,
        hexCode: pc.color.hexCode,
      }));
      const productSizes = relatedProduct.productSizes.map((ps) => ({
        id: ps.id,
        name: ps.size.name,
      }));

      const mainImageUrl =
        relatedProduct.images.length > 0
          ? relatedProduct.images[0].imageUrl
          : "/img/default-product.png";

      return {
        id: relatedProduct.id,
        img: mainImageUrl,
        title: relatedProduct.name,
        finalPrice: relatedProduct.discountedPrice || relatedProduct.price,
        price: relatedProduct.price,
        offPercent: offPercent,
        isLiked: relatedProduct.likes.length > 0,
        productColors,
        productSizes,
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

      productColors: product.productColors.map((pc) => ({
        id: pc.id,
        name: pc.color.name,
        hexCode: pc.color.hexCode,
      })),

      productSizes: product.productSizes.map((ps) => ({
        id: ps.id,
        name: ps.size.name,
      })),
      images: product.images.map((img) => ({
        id: img.id,
        imageUrl: img.imageUrl,
      })),

      isLiked: product.likes.length > 0,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      offPercent:
        product.isDiscounted &&
        product.price &&
        product.discountedPrice &&
        product.price > 0
          ? Math.round(
              ((product.price - product.discountedPrice) / product.price) * 100
            )
          : 0,
      relatedProducts: formattedRelatedProducts,
    };

    return NextResponse.json(productData, { status: 200 });
  } catch (error) {
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
