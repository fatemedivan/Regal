import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { verifyToken } from "../../../utils/auth";

export async function GET(request) {
  let userId = null;
  try {
    const decoded = await verifyToken(request);
    if (decoded && decoded.userId) {
      userId = decoded.userId;
    }
  } catch (error) {

  }

  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const sort = searchParams.get("sort");
    let orderBy = {};

    switch (sort) {
      case "cheapest":
        orderBy = { price: "asc" };
        break;
      case "most_expensive":
        orderBy = { price: "desc" };
        break;
      case "oldest":
        orderBy = { createdAt: "asc" };
        break;
      case "newest":
      default:
        orderBy = { createdAt: "desc" };
        break;
    }

    const filter = {};
    const minPrice = parseFloat(searchParams.get("minPrice"));
    const maxPrice = parseFloat(searchParams.get("maxPrice"));
    const color = searchParams.get("color");
    const size = searchParams.get("size");
    const categoryId = searchParams.get("categoryId");
    const isDiscounted = searchParams.get("isDiscounted");
    const search = searchParams.get("search");

    if (minPrice && maxPrice) {
      filter.price = { gte: minPrice, lte: maxPrice };
    } else if (minPrice) {
      filter.price = { gte: minPrice };
    } else if (maxPrice) {
      filter.price = { lte: maxPrice };
    }

    if (color) {
      filter.productColors = {
        some: {
          color: {
            hexCode: color,
          },
        },
      };
    }
    if (size) {
      filter.productSizes = {
        some: {
          size: {
            name: size,
          },
        },
      };
    }

    if (categoryId) {
      filter.OR = [
        { categoryId: categoryId },
        { category: { parentId: categoryId } }
      ];
    }

    if (isDiscounted === "true") filter.isDiscounted = true;
    if (isDiscounted === "false") filter.isDiscounted = false;

    if (search) {
      filter.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const [products, totalProducts] = await prisma.$transaction([
      prisma.product.findMany({
        where: filter,
        skip: skip,
        take: limit,
        orderBy: orderBy,
        include: {
          category: {
            select: { name: true },
          },
          productColors: {
            include: { color: true },
          },
          productSizes: {
            include: { size: true },
          },
          images: true,
        },
      }),
      prisma.product.count({ where: filter }),
    ]);

    let likedProductIds = new Set();
    if (userId) {
      const productIds = products.map((p) => p.id);
      const likedProductsByUser = await prisma.likedProduct.findMany({
        where: {
          userId: userId,
          productId: { in: productIds },
        },
        select: { productId: true },
      });
      likedProductIds = new Set(likedProductsByUser.map((lp) => lp.productId));
    }

    const productsWithCalculatedFields = products.map((product) => {
      let offPercent = 0;
      if (
        product.isDiscounted &&
        product.discountedPrice !== null &&
        product.price > 0
      ) {
        offPercent =
          ((product.price - product.discountedPrice) / product.price) * 100;
        offPercent = Math.round(offPercent);
      }
      const imageUrl = product.images.length > 0 ? product.images[0].url : null;

      return {
        ...product,
        isLiked: userId ? likedProductIds.has(product.id) : false,
        offPercent: offPercent,
        imageUrl: imageUrl,
      };
    });

    return NextResponse.json(
      {
        products: productsWithCalculatedFields,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts: totalProducts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return NextResponse.json(
      { message: "Internal server error fetching products." },
      { status: 500 }
    );
  }
}
