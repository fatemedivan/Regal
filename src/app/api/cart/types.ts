import type {
  Cart,
  CartItem,
  Product,
  ProductColor,
  ProductSize,
  ProductImage,
  Color,
  Size,
} from "@prisma/client";

export type CartItemBody = {
  productId: string;
  quantity?: number;
  productColorId?: string | null;
  productSizeId?: string | null;
};

export type CartItemFull = CartItem & {
  product: Product & {
    images: ProductImage[];
    imageUrl?: string | null;
    offPercent?: number;
  };
  productColor: (ProductColor & { color: Color }) | null;
  productSize: (ProductSize & { size: Size }) | null;
};

export type CartWithItems = Cart & {
  items: CartItemFull[];
};