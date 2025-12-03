import { Prisma } from "@prisma/client";

export type ProductWithIncludes = Prisma.ProductGetPayload<{
  include: {
    category: { select: { name: true } };
    productColors: { include: { color: true } };
    productSizes: { include: { size: true } };
    images: true;
  };
}>;
export type LikedProductByUser = { productId: string };

export type DiscountedProductWithIncludes = Prisma.ProductGetPayload<{
  include: {
    category: { select: { name: true } };
    productColors: { include: { color: { select: { hexCode: true } } } };
    productSizes: { include: { size: { select: { name: true } } } };
    images: { select: { imageUrl: true } };
    likes: { select: { userId: true } };
  };
}>;

export interface Params {
  params: { id: string };
}

export type SingleProductWithIncludes = Prisma.ProductGetPayload<{
  include: {
    category: { select: { id: true; name: true } };
    productColors: {
      select: {
        id: true;
        color: { select: { hexCode: true; name: true } };
      };
    };
    productSizes: {
      select: { id: true; size: { select: { name: true } } };
    };
    images: { select: { imageUrl: true; id: true } };
    likes: { select: { userId: true } };
  };
}>;
