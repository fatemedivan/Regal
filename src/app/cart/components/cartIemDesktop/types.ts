import { CartItem } from "@/types/cart";

export type CartItemDesktopProps = {
  item: CartItem;
  index: number;
  totalCount: number;
  onUpdate: (itemId: string, newQuantity: number) => Promise<boolean>;
  onDelete: (itemId: string) => Promise<boolean>;
};
