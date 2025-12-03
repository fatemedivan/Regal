import { Product } from "./product";

type ProductColor = {
  id: string
  color:{
    id:string
    hexCode: string
  }
}
type ProductSize = {
  id: string
  size:{
    id:string
    name: string
  }
}
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
