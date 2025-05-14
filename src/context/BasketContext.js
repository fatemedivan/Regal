"use client";

import { toast } from "react-toastify";

const { createContext, useContext, useState, useEffect } = require("react");

const BasketContext = createContext();

export const useBasketContext = () => {
  const context = useContext(BasketContext);
  return context;
};

export const BasketContextProvider = ({ children }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const addToCart = async (productId) => {
    try {
      const res = await fetch(`${baseUrl}/cart/${productId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log(res)
      if (res.status === 201) {
        toast.success("با موفقیت به سبد خرید اضافه شد");
      } else if (res.status === 401) {
        toast.error("لطفاً ابتدا ثبت نام کنید");
      } else {
        toast.error(" ناموفق");
      }
    } catch (error) {
      console.log(error);
      toast.error("خطایی رخ داد");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await fetch(`${baseUrl}/cart/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success("با موفقیت حذف شد");
      } else {
        toast.error("ناموفق");
      }
    } catch (error) {
      console.log(error);
      toast.error("خطایی رخ داد");
    }
  };

  return (
    <BasketContext.Provider value={{ addToCart, removeFromCart }}>
      {children}
    </BasketContext.Provider>
  );
};
