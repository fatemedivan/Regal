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
  const [totalPric, setTotalPrice] = useState(null);
  const [cart, setCart] = useState([]);
  const [isEmptyCart, setIsEmptyCart] = useState(true);
  const [countOfProduct, setCountOfPrroduct] = useState(0);

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
      });
      if (res.status === 201) {
        toast.success("با موفقیت به سبد خرید اضافه شد");
      } else if (res.status === 401) {
        toast.error("لطفاً ابتدا ثبت نام کنید");
      } else {
        toast.error(" ناموفق");
      }
    } catch (error) {
      //console.log(error);
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
        await getCart();
      } else {
        toast.error("ناموفق");
      }
    } catch (error) {
      console.log(error);
      toast.error("خطایی رخ داد");
    }
  };
  useEffect(() => {
    if (!token) return;
    getCart();
  }, [token]);

  const getCart = async () => {
    try {
      const res = await fetch(`${baseUrl}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setIsEmptyCart(false);
        setCart(data);
        const total = Math.floor(
          data.reduce((sum, cartItem) => {
            return sum + cartItem.quantity * cartItem.Entity.price;
          }, 0)
        );

        setTotalPrice(total.toLocaleString());
      }
      if (res.status === 404) {
        setIsEmptyCart(true);
      }
    } catch (error) {
     // console.log(error);
    }
  };
  useEffect(() => {
    const totalCount = cart.reduce(
      (sum, cartItem) => sum + cartItem.quantity,
      0
    );
    setCountOfPrroduct(totalCount);
  }, [cart]);
  return (
    <BasketContext.Provider
      value={{
        addToCart,
        removeFromCart,
        getCart,
        cart,
        totalPric,
        countOfProduct,
        isEmptyCart,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
