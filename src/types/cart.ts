import { Product, ProductColor, ProductSize } from "./product";

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;

  productColorId?: string | null;
  productSizeId?: string | null;

  productColor?: ProductColor;
  productSize?: ProductSize;

  product: Product;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
}
