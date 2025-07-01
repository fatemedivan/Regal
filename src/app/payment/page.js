// src/app/payment/page.jsx

"use client";
import BasketDetailsCard from "@/components/common/BasketDetailsCard";
import ProgressBar from "@/components/common/ProgressBar";
import { useBasketContext } from "@/context/BasketContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify"; // مطمئن شوید این پکیج نصب شده است: npm install react-hot-toast

export default function Page() {
  const [payment, setPayment] = useState("online"); // 'online' یا 'store'
  const { countOfProduct, totalPric, cart, clearEntireCart } = useBasketContext(); 
  const router = useRouter();
  const [token, setToken] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false); // وضعیت بارگذاری برای دکمه
  const [errorMessage, setErrorMessage] = useState(null); // پیام خطای داخلی کامپوننت

  useEffect(() => {
    // 1. بررسی وجود توکن
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      toast.error("برای ادامه فرآیند سفارش، لطفاً ابتدا وارد حساب کاربری خود شوید.");
      router.push("/auth/login"); // هدایت به صفحه ورود
      return; 
    }

    // 2. بررسی وجود آدرس کامل
    const storedFullAddress = sessionStorage.getItem("full address");
    if (storedFullAddress) {
      setFullAddress(storedFullAddress);
    } else {
      toast.error("لطفاً آدرس تحویل سفارش را مشخص کنید.");
      // router.push("/checkout/address"); // شاید لازم باشد به صفحه آدرس دهی هدایت کنید
      return;
    }

    // 3. بررسی وجود روش تحویل
    const storedDeliveryMethod = sessionStorage.getItem("deliveryMethod");
    if (storedDeliveryMethod) {
      setDeliveryMethod(storedDeliveryMethod);
    } else {
      toast.error("لطفاً روش ارسال سفارش را انتخاب کنید.");
      // router.push("/checkout/delivery"); // شاید لازم باشد به صفحه انتخاب روش تحویل هدایت کنید
      return;
    }

    // 4. بررسی خالی نبودن سبد خرید (اگرچه در بک‌اند هم چک می‌شود، اینجا برای UX بهتر است)
    if (!cart || cart.length === 0) {
      toast.error("سبد خرید شما خالی است و امکان ثبت سفارش وجود ندارد.");
      router.push("/cart"); // هدایت به صفحه سبد خرید
      return;
    }

  }, [router, cart]); // `router` و `cart` برای اطمینان از اجرای مجدد `useEffect` در صورت تغییر

  const addOrders = async () => {
    setErrorMessage(null); // پاک کردن خطاهای قبلی
    setIsLoading(true); // فعال کردن وضعیت بارگذاری

    // اعتبارسنجی نهایی در فرانت‌اند قبل از ارسال درخواست
    if (!token) {
      toast.error("خطا: توکن احراز هویت یافت نشد. لطفاً دوباره وارد شوید.");
      setIsLoading(false);
      return;
    }
    if (!fullAddress) {
      toast.error("خطا: آدرس تحویل سفارش مشخص نشده است.");
      setIsLoading(false);
      return;
    }
    if (!deliveryMethod) {
      toast.error("خطا: روش ارسال سفارش مشخص نشده است.");
      setIsLoading(false);
      return;
    }
    if (!cart || cart.length === 0) {
      toast.error("خطا: سبد خرید شما خالی است و نمی‌توانید سفارش ثبت کنید.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullAddress: fullAddress,
          deliveryMethod: deliveryMethod,
          paymentMethod: payment, // ارسال روش پرداخت انتخاب شده
        }),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success(`سفارش شما با موفقیت ثبت شد! کد سفارش: ${data.orderId}`);
        clearEntireCart(); // خالی کردن سبد خرید در کانتکست
        sessionStorage.removeItem("full address"); // پاک کردن اطلاعات آدرس از sessionStorage
        sessionStorage.removeItem("deliveryMethod"); // پاک کردن اطلاعات روش ارسال از sessionStorage
        router.push("/payment/success"); // هدایت به صفحه موفقیت
      } else {
        const errorData = await res.json();
        const apiErrorMessage = errorData.message || "خطا در ثبت سفارش.";
        setErrorMessage(apiErrorMessage); // ذخیره پیام خطا برای نمایش زیر فرم
        toast.error(apiErrorMessage); // نمایش پیام خطا به کاربر به صورت پاپ‌آپ

        // مدیریت خطاهای خاص از API برای هدایت کاربر
        if (res.status === 401) {
          router.push("/auth/login"); // توکن نامعتبر یا منقضی شده
        } else if (res.status === 400 && apiErrorMessage.includes("سبد خرید شما خالی است.")) {
          router.push("/cart"); // سبد خرید خالی شده است
        }
      }
    } catch (err) {
      console.error("خطا در برقراری ارتباط با سرور هنگام ثبت سفارش:", err);
      setErrorMessage("مشکل در اتصال به سرور. لطفاً از اتصال اینترنت خود مطمئن شده و دوباره امتحان کنید.");
      toast.error("خطای شبکه یا سرور. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsLoading(false); // غیرفعال کردن وضعیت بارگذاری در هر صورت
    }
  };

  return (
    <div className="container mx-auto px-5 pt-6 pb-16 lg:pt-0 lg:px-12">
      <div className="flex justify-between items-center mb-6 lg:hidden">
        <Image
          width={24}
          height={24}
          className="cursor-pointer"
          src="/img/arrow-right-6.svg"
          alt=""
          onClick={() => router.back()}
        />
        <p className="font-semibold text-xl leading-6 text-neutral-gray-13">
          پرداخت
        </p>
        <div></div>
      </div>

      <div className="xl:px-40.5">
        <ProgressBar progress={"payment"} />
      </div>

      <div className="mt-8 lg:flex lg:gap-6 lg:justify-between lg:mt-12">
        <div className="flex-1">
          <h5 className="font-semibold leading-5 text-black mb-4 lg:font-bold lg:text-lg lg:leading-5.5 lg:mb-6">
            کد تخفیف یا کارت هدیه
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
          <div className="mb-8">
            <h5 className="font-semibold leading-5 text-black mb-5 lg:font-bold lg:text-lg lg:leading-5.5 lg:mb-6">
              روش پرداخت
            </h5>
            <div className="p-4 border border-neutral-gray-4 rounded-xl flex gap-6 items-center">
              <label className="flex items-center gap-1 lg:gap-4">
                <input
                  type="radio"
                  name="payment"
                  className="hidden peer"
                  value="online"
                  onChange={() => setPayment("online")}
                  defaultChecked
                />
                <span className="w-4 h-4 rounded-full border border-neutral-gray-5 peer-checked:border-cognac-primery cursor-pointer group relative">
                  <span className="w-3 h-3 rounded-full bg-cognac-primery opacity-0 group-peer-checked:opacity-100 transition  absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
                </span>
                <div>
                  <p className="text-sm leading-6 text-neutral-gray-11">
                    پرداخت اینترنتی
                  </p>
                  <p className="text-neutral-gray-9 text-xs leading-4.5 hidden lg:block">
                    توسط پیک رگال ارسال شود.
                  </p>
                </div>
              </label>
              <label className="flex items-center gap-1 lg:gap-4">
                <input
                  type="radio"
                  name="payment"
                  className="hidden peer"
                  value="store"
                  onChange={() => setPayment("store")}
                />
                <span className="w-4 h-4 rounded-full border border-neutral-gray-5 peer-checked:border-cognac-primery cursor-pointer group relative">
                  <span className="w-3 h-3 rounded-full bg-cognac-primery opacity-0 group-peer-checked:opacity-100 transition  absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
                </span>
                <div>
                  <p className="text-sm leading-6 text-neutral-gray-11">
                    پرداخت در محل فروشگاه
                  </p>
                  <p className="text-neutral-gray-9 text-xs leading-4.5 hidden lg:block">
                    توسط مشتری در محل فروشگاه دریافت شود.
                  </p>
                </div>
              </label>
            </div>
            {payment === "store" && (
              <div className="bg-neutral-gray-1 rounded-2xl p-4 mt-3 lg:p-6 lg:mt-8">
                <div className="flex items-center gap-2 mb-2">
                  <Image
                    width={24}
                    height={24}
                    src="/img/warning-3.svg"
                    alt=""
                  />
                  <h6 className="text-lg font-bold leading-5 lg:text-[1rem] lg:leading-7 lg:font-normal text-neutral-gray-13">
                    قابل توجه
                  </h6>
                </div>
                <p className="text-xs leading-4.5 text-neutral-gray-9">
                  هزینه سفارش شما در حین تحویل کالا دریافت خواهد شد. لطفا قبل از
                  تحویل کالا کارت بانکی یا پول نقد همراه خود داشته باشید و از
                  درخواست برای پرداخت در زمان بعدی یا نسیه خودداری فرمایید. با
                  تشکر از همراهی شما.
                </p>
              </div>
            )}
          </div>
          {payment === "online" && (
            <div className="mb-8">
              <h5 className="font-semibold leading-5 text-black mb-4 lg:font-bold lg:text-lg lg:leading-5.5 lg:mb-6">
                درگاه پرداخت
              </h5>
              <div className="lg:border lg:border-neutral-gray-4 lg:rounded-2xl lg:p-6">
                <div className="flex items-center gap-4 lg:gap-10">
                  <Image
                    width={64}
                    height={64}
                    src="/img/Bank-card-1.svg"
                    alt=""
                    className="cursor-pointer"
                  />
                  <Image
                    width={64}
                    height={64}
                    src="/img/Bank-card-2.svg"
                    alt=""
                    className="cursor-pointer"
                  />
                  <Image
                    width={64}
                    height={64}
                    src="/img/Bank-card-3.svg"
                    alt=""
                    className="cursor-pointer"
                  />
                  <Image
                    width={64}
                    height={64}
                    src="/img/Bank-card-4.svg"
                    alt=""
                    className="cursor-pointer"
                  />
                </div>
                <p className="text-neutral-gray-9 text-xs leading-4.5 mt-4 lg:mt-6 mr-2">
                  پرداخت از طریق کلیه کارتهای عضو شتاب امکان پذیر است.
                </p>
              </div>
            </div>
          )}
        </div>

        <BasketDetailsCard
          step={3}
          totalPric={totalPric}
          count={countOfProduct}
          cart={cart}
          addOrders={addOrders}
          isLoading={isLoading} // پاس دادن وضعیت بارگذاری به کامپوننت فرزند
        />
      </div>
      {/* نمایش پیام خطا در پایین صفحه (اختیاری) */}
      {errorMessage && (
        <div className="text-red-600 text-center mt-4 p-2 border border-red-400 rounded-md bg-red-50">
          {errorMessage}
        </div>
      )}
    </div>
  );
}