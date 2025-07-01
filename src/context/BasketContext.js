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
        console.log(data);
        
        setCart(data);
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "خطا در دریافت سبد خرید.");
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
      return;
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
        const errorData = await res.json();
        toast.error(errorData.message || "افزودن به سبد خرید ناموفق بود.");
        return false;
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("خطایی در افزودن محصول به سبد خرید رخ داد.");
      return false;
    }
  };

  const updateCartItemQuantity = async (cartItemId, newQuantity) => {
    if (!token) {
      toast.error("برای به‌روزرسانی سبد خرید، وارد شوید.");
      return;
    }
    if (newQuantity < 0) return; // از تعداد منفی جلوگیری کن

    setIsLoading(true);
    try {
      const res = await fetch(`/api/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: cart.items.find((item) => item.id === cartItemId)
            ?.productId,
          productColorId: cart.items.find((item) => item.id === cartItemId)
            ?.productColorId,
          productSizeId: cart.items.find((item) => item.id === cartItemId)
            ?.productSizeId,
          quantity: newQuantity,
        }),
      });

      if (res.ok) {
        await getCart();
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
      return;
    }
    setIsLoading(true);
    try {
      const itemToRemove = cart.items.find((item) => item.id === cartItemId);
      if (!itemToRemove) {
        toast.error("آیتم مورد نظر برای حذف در سبد خرید یافت نشد.");
        setIsLoading(false);
        return false;
      }

      // ارسال این اطلاعات به عنوان query parameters
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
      return;
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
        toast.success("سبد خرید شما پاک شد.");
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

  // محاسبه تعداد کل محصولات
  const countOfProduct =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  // محاسبه قیمت کل (با در نظر گرفتن تخفیف و تعداد)
  const totalPric =
    cart?.items?.reduce((acc, item) => {
      const itemPrice = item.product.isDiscounted
        ? item.product.discountedPrice
        : item.product.price;
      return acc + itemPrice * item.quantity;
    }, 0) || 0;

  // بررسی خالی بودن سبد خرید
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
