import { Cart } from "@/types/cart";

export type UserInfo = {
  phoneNumber: string;
  name: string;
  family: string;
  email: string;
};

export type AuthContextType = UserInfo & {
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  refreshUser: () => Promise<void>;
  logout: () => void;
};

export type ProviderProps = {
  children: React.ReactNode;
};

export interface BasketContextType {
  cart: Cart;
  getCart: () => Promise<void>;
  addToCart: (
    productId: string,
    quantity?: number,
    productColorId?: string | null,
    productSizeId?: string | null
  ) => Promise<boolean>;
  updateCartItemQuantity: (
    cartItemId: string,
    newQuantity: number
  ) => Promise<boolean>;
  removeCartItem: (cartItemId: string) => Promise<boolean>;
  clearEntireCart: () => Promise<boolean>;
  countOfProduct: number;
  totalPrice: number;
  isEmptyCart: boolean;
}
