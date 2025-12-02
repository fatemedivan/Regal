import { Cart } from "@/types/cart";

export type BasketDetailsCardProps = {
  step: number;
  count: number;
  totalPrice: number;
  cart: Cart;
  addOrders?: () => Promise<void>;
  deleteCart?: () => void;
  isLoading?: boolean;
  selectedAddressId?: number;
};
