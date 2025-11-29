"use client";

import getToken from "@/utils/getToken";
import { BasketContextType, ProviderProps } from "./types";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { toast } from "react-toastify";
import { Cart } from "@/types/cart";

const BasketContext = createContext<BasketContextType | null>(null);

export const BasketProvider: React.FC<ProviderProps> = ({ children }) => {
  const token = getToken();
  const [cart, setCart] = useState<Cart>({ id: "", userId: "", items: [] });

  const resetCartState = () => setCart({ items: [], id: "", userId: "" });
  const getCart = useCallback(async () => {
    try {
      const res = await fetch("/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setCart(data);
      } else {
        resetCartState();
      }
    } catch (error) {
      toast.error("خطا در ارتباط با سرور برای دریافت سبد خرید.");
      resetCartState();
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      resetCartState();
      return;
    }
    getCart();
  }, [token]);

  const addToCart = async (
    productId: string,
    quantity: number = 1,
    productColorId: string | null = null,
    productSizeId: string | null = null
  ): Promise<boolean> => {
    if (!token) {
      toast.error("برای افزودن به سبد خرید، وارد شوید.");
      return false;
    }

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity,
          productColorId,
          productSizeId,
        }),
      });

      if (res.ok) {
        toast.success("محصول به سبد خرید اضافه شد.");
        await getCart();
        return true;
      } else {
        toast.error("افزودن به سبد خرید ناموفق بود.");
        return false;
      }
    } catch (error) {
      toast.error("خطایی در افزودن محصول به سبد خرید رخ داد.");
      return false;
    }
  };

  const updateCartItemQuantity = async (
    cartItemId: string,
    newQuantity: number
  ): Promise<boolean> => {
    if (!token) {
      toast.error("برای به‌روزرسانی سبد خرید، وارد شوید.");
      return false;
    }
    if (newQuantity === 0) {
      return await removeCartItem(cartItemId);
    }
    if (newQuantity < 0) {
      toast.error("تعداد محصول نمی‌تواند منفی باشد.");
      return false;
    }

    try {
      if (!cart || !cart.items) {
        toast.error("سبد خرید در دسترس نیست. لطفاً دوباره تلاش کنید.");

        return false;
      }

      const itemToUpdate = cart.items.find((item) => item.id === cartItemId);
      if (!itemToUpdate) return toast.error("آیتم مورد نظر یافت نشد."), false;

      const res = await fetch(`/api/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: itemToUpdate.productId,
          productColorId: itemToUpdate.productColorId || null,
          productSizeId: itemToUpdate.productSizeId || null,
          quantity: newQuantity,
        }),
      });

      if (res.ok) {
        await getCart();
        toast.success("تعداد محصول به‌روزرسانی شد.");
        return true;
      } else {
        toast.error("به‌روزرسانی تعداد ناموفق بود.");
        return false;
      }
    } catch (error) {
      toast.error("خطایی در به‌روزرسانی تعداد آیتم سبد خرید رخ داد.");
      return false;
    }
  };

  const removeCartItem = async (cartItemId: string): Promise<boolean> => {
    if (!token) {
      toast.error("برای حذف از سبد خرید، وارد شوید.");
      return false;
    }

    try {
      if (!cart || !cart.items) {
        toast.error("سبد خرید در دسترس نیست. لطفاً دوباره تلاش کنید.");

        return false;
      }

      const itemToRemove = cart.items.find((item) => item.id === cartItemId);
      if (!itemToRemove) {
        toast.error("آیتم مورد نظر برای حذف در سبد خرید یافت نشد.");

        return false;
      }

      const queryParams = new URLSearchParams({
        productId: itemToRemove.productId,
      });
      if (itemToRemove.productColorId) {
        queryParams.append("productColorId", itemToRemove.productColorId);
      }
      if (itemToRemove.productSizeId) {
        queryParams.append("productSizeId", itemToRemove.productSizeId);
      }

      const res = await fetch(`/api/cart?${queryParams.toString()}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        await getCart();
        toast.success("آیتم از سبد خرید حذف شد.");
        return true;
      } else {
        toast.error("حذف آیتم ناموفق بود.");
        return false;
      }
    } catch (error) {
      toast.error("خطایی در حذف آیتم سبد خرید رخ داد.");
      return false;
    }
  };

  const clearEntireCart = async () => {
    if (!token) {
      toast.error("برای پاک کردن سبد خرید، وارد شوید.");
      return false;
    }

    try {
      const res = await fetch("/api/cart/clear-all", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        resetCartState();
        toast.success("سبد خرید شما با موفقیت خالی شد.");
        return true;
      } else {
        toast.error("پاک کردن سبد خرید ناموفق بود.");
        return false;
      }
    } catch (error) {
      toast.error("خطایی در پاک کردن سبد خرید رخ داد.");
      return false;
    }
  };

  const countOfProduct = useMemo(
    () => cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0,
    [cart.items]
  );

  const totalPrice = useMemo(
    () =>
      cart?.items?.reduce((acc, item) => {
        const itemPrice = item.product.isDiscounted
          ? item.product.discountedPrice
          : item.product.price;
        return acc + itemPrice * item.quantity;
      }, 0) || 0,
    [cart.items]
  );

  const isEmptyCart = useMemo(() => cart.items.length === 0, [cart.items]);

  const contextValue: BasketContextType = {
    cart,
    getCart,
    addToCart,
    updateCartItemQuantity,
    removeCartItem,
    clearEntireCart,
    countOfProduct,
    totalPrice,
    isEmptyCart,
  };

  return (
    <BasketContext.Provider value={contextValue}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasketContext = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasketContext must be used within a BasketProvider");
  }
  return context;
};
