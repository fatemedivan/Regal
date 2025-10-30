"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProgressBarProfile from "./ProgressBarProfile";
import moment from "jalali-moment";

export default function OrderDetailsCardDesktop({
  status,
  deliveryType,
  paymentMethod,
  address,
  date,
  time,
  orderItems,
}) {
  const [isShownDetails, setIsShownDetails] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

  const formatJalaliDateTime = (isoString) => {
    if (!isoString) return "";
    return moment(isoString).locale("fa").format("dddd D MMMM HH:mm");
  };

  // تابع برای ترجمه وضعیت سفارش
  const translateStatus = (statusKey) => {
    switch (statusKey) {
      case "pending":
        return "در حال بررسی";
      case "processing":
        return "در حال آماده‌سازی";
      case "shipped":
      case "delivering":
        return "ارسال شده";
      case "delivered":
        return "تحویل شده";
      case "cancelled":
        return "لغو شده";
      case "returned":
        return "مرجوع شده";
      default:
        return statusKey;
    }
  };

  // تابع برای ترجمه روش تحویل
  const translateDeliveryMethod = (methodKey) => {
    switch (methodKey) {
      case "pickup":
        return "تحویل حضوری در فروشگاه";
      case "delivery":
        return "ارسال با پیک";
      default:
        return methodKey;
    }
  };

  // تابع برای ترجمه روش پرداخت
  const translatePaymentMethod = (methodKey) => {
    switch (methodKey) {
      case "online":
        return "پرداخت اینترنتی";
      case "store":
        return "پرداخت در محل فروشگاه";
      default:
        return methodKey;
    }
  };

  useEffect(() => {
    if (date) {
      setFormattedDate(formatJalaliDateTime(date));
    }
  }, [date]);

  // تابع کمکی برای فرمت کردن اعداد (با قابلیت مدیریت ناعدد)
  const formatPrice = (price) => {
    const numericPrice = Number(price);
    if (isNaN(numericPrice)) {
      return ""; 
    }
    return numericPrice.toLocaleString('fa-IR');
  };


  const shippingCost = 80000;

  const calculatedProductsTotal = orderItems?.reduce((sum, item) => {
    const priceAtOrder = Number(item.priceAtOrder || 0);
    const quantity = Number(item.quantity || 0);

    const validPriceAtOrder = isNaN(priceAtOrder) ? 0 : priceAtOrder;
    const validQuantity = isNaN(quantity) ? 0 : quantity;

    return sum + (validPriceAtOrder * validQuantity);
  }, 0) || 0; 

  // 2. محاسبه تخفیف کل (تفاوت قیمت اصلی و قیمت پرداخت شده در لحظه سفارش)
  const calculatedTotalDiscount = orderItems?.reduce((sum, item) => {
    const originalPrice = Number(item.product?.price || 0);
    const priceAtOrder = Number(item.priceAtOrder || 0);
    const quantity = Number(item.quantity || 0);

    const validOriginalPrice = isNaN(originalPrice) ? 0 : originalPrice;
    const validPriceAtOrder = isNaN(priceAtOrder) ? 0 : priceAtOrder;
    const validQuantity = isNaN(quantity) ? 0 : quantity;

    if (validOriginalPrice > validPriceAtOrder) {
      return sum + (validOriginalPrice - validPriceAtOrder) * validQuantity;
    }
    return sum;
  }, 0) || 0;

  const finalOrderTotalAmount = calculatedProductsTotal + shippingCost;

  return (
    <div className="border border-neutral-gray-4 rounded-xl p-6 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1 xl:gap-4">
          <div className="flex items-center gap-1">
            <Image width={20} height={20} src="/img/wallet-2.svg" alt="" />
            <p className="text-neutral-gray-11 text-sm leading-5">
              مبلغ کل: {formatPrice(finalOrderTotalAmount)} تومان
            </p>
          </div>

          {calculatedTotalDiscount > 0 ? (
            <div className="flex items-center gap-1">
              <Image
                width={20}
                height={20}
                src="/img/discount-shape.svg"
                alt=""
              />
              <p className="text-neutral-gray-11 text-sm leading-5">
                تخفیف کل: {formatPrice(calculatedTotalDiscount)} تومان
              </p>
            </div>
          ) : null}
          <div className="flex items-center gap-1">
            <Image width={20} height={20} src="/img/truck-fast-2.svg" alt="" />
            <p className="text-neutral-gray-11 text-sm leading-5">
              هزینه ارسال: {formatPrice(shippingCost)} تومان
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-cognac-tint-1 text-xs leading-4.5 py-0.5 px-2 rounded-100 text-cognac-primery text-nowrap">
            {translateDeliveryMethod(deliveryType)}
          </div>
          <div
            className={`text-xs leading-4.5 py-0.5 px-2 rounded-100 text-nowrap ${status === "pending"
                ? "border border-neutral-gray-4 bg-neutral-gray-1 text-neutral-gray-11"
                : status === "delivered"
                  ? "bg-success-tint-1 text-success-primery"
                  : status === "cancelled"
                    ? "bg-error-tint-1 text-error-primery"
                    : status === "returned"
                      ? "bg-warning-tint-1 text-warning-primery"
                      : "bg-gray-100 text-gray-700"
              }`}
          >
            {translateStatus(status)}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 mt-0.5">
          <Image width={20} height={20} src="/img/location-3.svg" alt="" />
          <p className="text-neutral-gray-11 text-sm leading-5">{address || 'آدرس ثبت نشده'}</p>
        </div>
        {time && (
          <div className="flex items-center gap-1">
            <Image width={16} height={16} src="/img/clock-3.svg" alt="" />
            <p className="text-neutral-gray-11 text-sm leading-5">
              تحویل تا<span className="mr-1 text-cognac-primery">{time}</span>
            </p>
          </div>
        )}
      </div>
      <div
        className={`flex items-center gap-1 ${status === "pending" && deliveryType === "delivery" ? "mb-8" : "mb-4"
          }`}
      >
        <Image width={20} height={20} src="/img/calendar.svg" alt="" />
        <p className="text-neutral-gray-11 text-sm leading-5">{formattedDate || 'تاریخ ثبت نشده'}</p>
      </div>

      <div className="flex items-center gap-1 mb-4">
        <p className="text-neutral-gray-11 text-sm leading-5">
          روش پرداخت: <span className="font-medium">{translatePaymentMethod(paymentMethod)}</span>
        </p>
      </div>

      <div
        className={`mb-4 border-b border-dashed border-neutral-gray-4 ${status === "pending" && deliveryType === "delivery" ? "pb-8" : "pb-0"
          }`}
      >
        {status === "pending" && deliveryType === "delivery" && (
          <ProgressBarProfile />
        )}
      </div>
      <div>
        <div
          onClick={() => setIsShownDetails(!isShownDetails)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <p className="text-neutral-gray-13 text-sm leading-6">جزئیات سفارش</p>
          <Image
            width={20}
            height={20}
            className={`transition duration-300 ease-in-out ${isShownDetails ? "rotate-180" : "rotate-0"
              }`}
            src="/img/arrow-down-5.svg"
            alt=""
          />
        </div>
        {isShownDetails && (
          <div className="transition duration-300 ease-in-out mt-4">
            <div className="grid grid-cols-5 bg-neutral-gray-1 rounded-sm px-4 py-1 text-right">
              <p className="text-neutral-gray-10 text-sm leading-6">
                عنوان کالا
              </p>
              <p className="text-neutral-gray-10 text-sm leading-6">تعداد</p>
              <p className="text-neutral-gray-10 text-sm leading-6">قیمت واحد</p>
              <p className="text-neutral-gray-10 text-sm leading-6">تخفیف واحد</p>
              <p className="text-neutral-gray-10 text-sm leading-6">جمع جزء</p>
            </div>
            <div className="grid grid-cols-5 gap-y-2 gap-x-4 mt-5 px-4 text-right">
              {orderItems && orderItems.length > 0 ? (
                orderItems.map((item) => {
                  // استفاده از || 0 برای اطمینان از اینکه null/undefined به 0 تبدیل شوند
                  const originalPrice = Number(item.product?.price || 0);
                  const priceAtOrder = Number(item.priceAtOrder || 0);
                  const quantity = Number(item.quantity || 0);

                  // اگر بعد از تبدیل هم همچنان NaN بود، آن را 0 در نظر بگیر
                  const validOriginalPrice = isNaN(originalPrice) ? 0 : originalPrice;
                  const validPriceAtOrder = isNaN(priceAtOrder) ? 0 : priceAtOrder;
                  const validQuantity = isNaN(quantity) ? 0 : quantity;

                  const itemDiscount = validOriginalPrice > validPriceAtOrder ? validOriginalPrice - validPriceAtOrder : 0;
                  const itemTotalPrice = validPriceAtOrder * validQuantity;

                  return (
                    <React.Fragment key={item.id}>
                      <p className="text-neutral-gray-11 text-sm leading-6">
                        {item.product?.name || 'نامشخص'}
                      </p>
                      <p className="text-neutral-gray-11 text-sm leading-6">
                        {formatPrice(validQuantity)} عدد
                      </p>
                      <p className="text-neutral-gray-11 text-sm leading-6">
                        {formatPrice(validOriginalPrice)} تومان
                      </p>
                      <p className="text-neutral-gray-11 text-sm leading-6">
                        {formatPrice(itemDiscount)} تومان
                      </p>
                      <p className="text-neutral-gray-11 text-sm leading-6">
                        {formatPrice(itemTotalPrice)} تومان
                      </p>
                    </React.Fragment>
                  );
                })
              ) : (
                <p className="col-span-5 text-center text-neutral-gray-9 text-sm leading-6 mt-4">
                  هیچ آیتمی در این سفارش یافت نشد.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}