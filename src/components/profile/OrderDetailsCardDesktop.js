import Image from "next/image";
import React from "react";
import ProgressBarProfile from "./ProgressBarProfile";

export default function OrderDetailsCardDesktop({
  status,
  deliveryType,
  address,
  payment,
  discount,
  shippingcost,
  date,
  time,
}) {
  return (
    <div className="border border-neutral-gray-4 rounded-xl p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1 xl:gap-4">
          <div className="flex items-center gap-1">
            <Image width={20} height={20} src="/img/wallet-2.svg" alt="" />
            <p className="text-neutral-gray-11 text-sm leading-5">
              مبلغ پرداخت شده: {payment} تومان
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
              تخفیف کل: {discount}تومان
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Image width={20} height={20} src="/img/truck-fast-2.svg" alt="" />
            <p className="text-neutral-gray-11 text-sm leading-5">
              هزینه ارسال: {shippingcost} تومان
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-cognac-tint-1 text-xs leading-4.5 py-0.5 px-2 rounded-100 text-cognac-primery text-nowrap">
            {deliveryType}
          </div>
          <div
            className={` text-xs leading-4.5 py-0.5 px-2 rounded-100  ${
              status === "جاری"
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
            {status}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 mt-0.5">
          <Image width={20} height={20} src="/img/location-3.svg" alt="" />
          <p className="text-neutral-gray-11 text-sm leading-5">{address}</p>
        </div>
        <div className="flex items-center gap-1">
          <Image width={16} height={16} src="/img/clock-3.svg" alt="" />
          <p className="text-neutral-gray-11 text-sm leading-5">
            تحویل تا<span className="mr-1 text-cognac-primery">{time}</span>
          </p>
        </div>
      </div>
      <div
        className={`flex items-center gap-1 ${
          status === "جاری" && deliveryType !== "تحویل حضوری" ? "mb-8" : "mb-4"
        }`}
      >
        <Image width={20} height={20} src="/img/calendar.svg" alt="" />
        <p className="text-neutral-gray-11 text-sm leading-5">{date}</p>
      </div>
      <div className="mb-4 pb-4 border-b border-dashed border-neutral-gray-4">
        {status === "جاری" && deliveryType !== "تحویل حضوری" && (
          <ProgressBarProfile />
        )}
      </div>
    </div>
  );
}
