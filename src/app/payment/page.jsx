"use client";
import BasketDetailsCard from "@/components/BasketDetailsCard";
import PageHeader from "@/components/PageHeader";
import { useBasketContext } from "@/context/BasketContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const { countOfProduct, totalPric, cart, clearEntireCart } =
    useBasketContext();
  const router = useRouter();
  const [token, setToken] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      toast.error(
        "برای ادامه فرآیند سفارش، لطفاً ابتدا وارد حساب کاربری خود شوید."
      );
      router.push("/auth/login");
      return;
    }

    const storedFullAddress = sessionStorage.getItem("full address");
    if (storedFullAddress) {
      setFullAddress(storedFullAddress);
    } else {
      toast.error("لطفاً آدرس تحویل سفارش را مشخص کنید.");
      return;
    }

    if (!cart || cart.length === 0) {
      toast.error("سبد خرید شما خالی است و امکان ثبت سفارش وجود ندارد.");
      router.push("/cart");
      return;
    }
  }, [router, cart]);

  const addOrders = async () => {
    if (!token)
      toast.error("خطا: توکن احراز هویت یافت نشد. لطفاً دوباره وارد شوید.");
    if (!fullAddress) toast.error("خطا: آدرس تحویل سفارش مشخص نشده است.");
    if (!cart || cart.length === 0)
      toast.error("خطا: سبد خرید شما خالی است و نمی‌توانید سفارش ثبت کنید.");

    try {
      setIsLoading(true);
      const res = await fetch(`/api/orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullAddress: fullAddress,
          deliveryMethod: "COURIER",
          paymentMethod: "online",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success(`سفارش شما با موفقیت ثبت شد! کد سفارش: ${data.orderId}`);
        clearEntireCart();
        sessionStorage.removeItem("full address");

        router.push("/payment/success");
      } else {
        toast.error("خطا در ثبت سفارش.");
        if (res.status === 401) router.push("/auth/login");
      }
    } catch (err) {
      toast.error("خطای شبکه یا سرور. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-5 pt-6 pb-16 lg:pt-0 lg:px-12">
      <PageHeader title={"پرداخت"} steper={"payment"} />
      <div className="mt-8 lg:flex lg:gap-6 lg:justify-between lg:mt-12">
        <div className="flex-1">
          <h5 className="font-semibold leading-5 text-black mb-4 lg:font-bold lg:text-lg lg:leading-5.5 lg:mb-6">
            کد تخفیف
          </h5>
          <div className="lg:border lg:border-neutral-gray-4 lg:p-6 lg:w-full lg:rounded-2xl lg:mb-8">
            <div className="flex items-center gap-2 mb-8 lg:mb-0">
              <input
                type="text"
                placeholder="کد تخفیف"
                className="border border-neutral-gray-4 py-3.75 px-4 w-59 rounded-lg placeholder:text-neutral-gray-7 placeholder:text-xs placeholder:leading-4.5 lg:placeholder:text-[1rem] lg:placeholder:leading-5.5 lg:w-84 outline-none"
              />
              <button className="py-3.75 px-3 sm:px-6 border border-cognac-primery text-cognac-primery rounded-lg leading-5.5 lg:px-12.5 cursor-pointer">
                اعمال کد
              </button>
            </div>
          </div>
        </div>

        <BasketDetailsCard
          step={3}
          totalPric={totalPric}
          count={countOfProduct}
          cart={cart}
          addOrders={addOrders}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
