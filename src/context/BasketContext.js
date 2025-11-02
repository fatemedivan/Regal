"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { toast } from "react-toastify";

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setCart({ items: [] });
      setIsLoading(false);
    }
  }, []);

  const getCart = useCallback(async () => {
    if (!token) {
      setCart({ items: [] });
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
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
        const errorData = await res.json();
        // toast.error(errorData.message || "خطا در دریافت سبد خرید.");
        setCart({ items: [] });
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("خطا در ارتباط با سرور برای دریافت سبد خرید.");
      setCart({ items: [] });
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      getCart();
    }
  }, [token, getCart]);

  const addToCart = async (
    productId,
    quantity = 1,
    productColorId = null,
    productSizeId = null
  ) => {
    if (!token) {
      toast.error("برای افزودن به سبد خرید، وارد شوید.");
      return false;
    }
    setIsLoading(true);
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
        const errorData = await res.json();
        toast.error(errorData.message || "افزودن به سبد خرید ناموفق بود.");
        return false;
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("خطایی در افزودن محصول به سبد خرید رخ داد.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItemQuantity = async (cartItemId, newQuantity) => {
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

    setIsLoading(true);
    try {
      if (!cart || !cart.items) {
        toast.error("سبد خرید در دسترس نیست. لطفاً دوباره تلاش کنید.");
        setIsLoading(false);
        return false;
      }

      const itemToUpdate = cart.items.find((item) => item.id === cartItemId);
      if (!itemToUpdate) {
        toast.error("آیتم مورد نظر برای به‌روزرسانی در سبد خرید یافت نشد.");
        setIsLoading(false);
        return false;
      }

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
        const errorData = await res.json();
        toast.error(errorData.message || "به‌روزرسانی تعداد ناموفق بود.");
        return false;
      }
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
      toast.error("خطایی در به‌روزرسانی تعداد آیتم سبد خرید رخ داد.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const removeCartItem = async (cartItemId) => {
    if (!token) {
      toast.error("برای حذف از سبد خرید، وارد شوید.");
      return false;
    }
    setIsLoading(true);
    try {
      if (!cart || !cart.items) {
        toast.error("سبد خرید در دسترس نیست. لطفاً دوباره تلاش کنید.");
        setIsLoading(false);
        return false;
      }

      const itemToRemove = cart.items.find((item) => item.id === cartItemId);
      if (!itemToRemove) {
        toast.error("آیتم مورد نظر برای حذف در سبد خرید یافت نشد.");
        setIsLoading(false);
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
        const errorData = await res.json();
        toast.error(errorData.message || "حذف آیتم ناموفق بود.");
        return false;
      }
    } catch (error) {
      console.error("Error removing cart item:", error);
      toast.error("خطایی در حذف آیتم سبد خرید رخ داد.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearEntireCart = async () => {
    if (!token) {
      toast.error("برای پاک کردن سبد خرید، وارد شوید.");
      return false;
    }
    setIsLoading(true);
    try {

      const res = await fetch("/api/cart/clear-all", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {

        setCart({ items: [] });
        toast.success("سبد خرید شما با موفقیت خالی شد.");
        return true;
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "پاک کردن سبد خرید ناموفق بود.");
        return false;
      }
    } catch (error) {
      console.error("Error clearing entire cart:", error);
      toast.error("خطایی در پاک کردن سبد خرید رخ داد.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const countOfProduct =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const totalPric =
    cart?.items?.reduce((acc, item) => {
      const itemPrice = item.product.isDiscounted
        ? item.product.discountedPrice
        : item.product.price;
      return acc + itemPrice * item.quantity;
    }, 0) || 0;

  const isEmptyCart = !cart || !cart.items || cart.items.length === 0;

  const contextValue = {
    cart,
    getCart,
    addToCart,
    updateCartItemQuantity,
    removeCartItem,
    clearEntireCart,
    countOfProduct,
    totalPric,
    isEmptyCart,
    isLoading,
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