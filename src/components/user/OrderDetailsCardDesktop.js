import Image from "next/image";
import React, { useState } from "react";
import ProgressBarProfile from "./ProgressBarProfile";

export default function OrderDetailsCardDesktop({
  status,
  deliveryType,
  address,
  date,
  time,
  orderItem,
  amountPaid,
  amountDiscount,
}) {
  const [isShownDetails, setIsShownDetails] = useState(false);
  return (
    <div className="border border-neutral-gray-4 rounded-xl p-6 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1 xl:gap-4">
          <div className="flex items-center gap-1">
            <Image width={20} height={20} src="/img/wallet-2.svg" alt="" />
            <p className="text-neutral-gray-11 text-sm leading-5">
              مبلغ پرداخت شده: {amountPaid} تومان
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Image
              width={20}
              height={20}
              src="/img/discount-shape.svg"
              alt=""
            />
            <p className="text-neutral-gray-11 text-sm leading-5">
              تخفیف کل: {amountDiscount}تومان
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Image width={20} height={20} src="/img/truck-fast-2.svg" alt="" />
            <p className="text-neutral-gray-11 text-sm leading-5">
              هزینه ارسال: 80000 تومان
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-cognac-tint-1 text-xs leading-4.5 py-0.5 px-2 rounded-100 text-cognac-primery text-nowrap">
           {deliveryType === "COURIER" ? "ارسال با پیک" : "تحویل حضوری"}
          </div>
          <div
            className={` text-xs leading-4.5 py-0.5 px-2 rounded-100 text-nowrap ${
              status === "CURRENT"
                ? "border border-neutral-gray-4 bg-neutral-gray-1 text-neutral-gray-11"
                : status === "تحویل شده"
                ? "bg-success-tint-1 text-success-primery"
                : status === "لغو شده"
                ? "bg-error-tint-1 text-error-primery"
                : status === "مرجوع شده"
                ? "bg-warning-tint-1 text-warning-primery"
                : ""
            }`}
          >
            {status === 'CURRENT' && 'جاری'}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 mt-0.5">
          <Image width={20} height={20} src="/img/location-3.svg" alt="" />
          <p className="text-neutral-gray-11 text-sm leading-5">{address}</p>
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
        className={`flex items-center gap-1 ${
          status === "جاری" && deliveryType !== "تحویل حضوری" ? "mb-8" : "mb-4"
        }`}
      >
        <Image width={20} height={20} src="/img/calendar.svg" alt="" />
        <p className="text-neutral-gray-11 text-sm leading-5">{date}</p>
      </div>
      <div
        className={`mb-4 border-b border-dashed border-neutral-gray-4 ${
          status === "جاری" && deliveryType !== "تحویل حضوری" ? "pb-8" : "pb-0"
        }`}
      >
        {status === "جاری" && deliveryType !== "تحویل حضوری" && (
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
            className={`transition duration-300 ease-in-out ${
              isShownDetails ? "rotate-180" : "rotate-0"
            }`}
            src="/img/arrow-down-5.svg"
            alt=""
          />
        </div>
        {/* AI */}
        {isShownDetails && (
          <div className="transition duration-300 ease-in-out mt-4">
            <div className="grid grid-cols-5 bg-neutral-gray-1 rounded-sm px-4 py-1 text-right">
              <p className="text-neutral-gray-10 text-sm leading-6">
                عنوان کالا
              </p>
              <p className="text-neutral-gray-10 text-sm leading-6">تعداد</p>
              <p className="text-neutral-gray-10 text-sm leading-6">قیمت</p>
              <p className="text-neutral-gray-10 text-sm leading-6">تخفیف</p>
              <p className="text-neutral-gray-10 text-sm leading-6">مبلغ کل</p>
            </div>
            <div className="grid grid-cols-5 gap-y-2 gap-x-4 mt-5 px-4 text-right">
              {orderItem &&
                orderItem.map((item) => (
                  <React.Fragment key={item.id}>
                    <p className="text-neutral-gray-11 text-sm leading-6">
                      {item.productTitle}
                    </p>
                    <p className="text-neutral-gray-11 text-sm leading-6">
                      {item.number} عدد
                    </p>
                    <p className="text-neutral-gray-11 text-sm leading-6">
                      {item.price} تومان
                    </p>
                    <p className="text-neutral-gray-11 text-sm leading-6">
                      {item.discount} تومان
                    </p>
                    <p className="text-neutral-gray-11 text-sm leading-6">
                      {amountPaid} تومان
                    </p>
                  </React.Fragment>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
