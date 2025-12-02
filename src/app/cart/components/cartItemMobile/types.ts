import { CartItem } from "@/types/cart";

export type CartItemMobileProps = {
  item: CartItem;
  onUpdate: (itemId: string, newQuantity: number) => Promise<boolean>;
  onDelete: (itemId: string) => Promise<boolean>;
};
