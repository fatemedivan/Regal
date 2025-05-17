"use client";
import Image from "next/image";
import React, { useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";
import ProgressBarProfile from "./ProgressBarProfile";

export default function OrderDetailsCard({
  status,
  deliveryType,
  deliveryStatus,
  date,
  time,
  address,
  receivingTime,
  orderItem,
  amountPaid,
  amountDiscount,
}) {
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const handleCloseDetailsModal = () => {
    setIsOpenDetailsModal(false);
  };

  return (
    <div className="p-3 border border-neutral-gray-4 rounded-xl mb-4">
      <div className="flex justify-between items-center mb-3.5">
        <div className="flex items-center gap-1">
          <Image width={16} height={16} src="/img/clock-3.svg" alt="" />
          <p className="text-neutral-gray-11 text-xs leading-4.5">
            {deliveryStatus}
            {receivingTime && (
              <span className="text-cognac-primery mr-1">{receivingTime}</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-cognac-tint-1 text-xs leading-4.5 py-0.5 px-2 rounded-100 text-cognac-primery">
            {deliveryType === "COURIER" ? "ارسال با پیک" : "تحویل حضوری"}
          </div>
          <div
            className={` text-xs leading-4.5 py-0.5 px-2 rounded-100  ${
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
            {status === "CURRENT" && "جاری"}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 mb-3">
        <Image width={16} height={16} src="/img/calendar.svg" alt="" />
        <p className="text-neutral-gray-11 text-xs leading-4.5">
          {date}،<span className="mr-1">{time}</span>
        </p>
      </div>
      <div
        className={`flex gap-1 ${
          status === "CURRENT" && deliveryType !== "تحویل حضوری"
            ? "mb-8"
            : "mb-3"
        }`}
      >
        <Image width={16} height={16} src="/img/location-3.svg" alt="" />
        <p className="text-neutral-gray-11 text-xs leading-4.5">{address}</p>
      </div>
      {status === "CURRENT" && deliveryType !== "تحویل حضوری" && (
        <ProgressBarProfile />
      )}

      <div
        className={` ${
          status === "CURRENT" && deliveryType !== "تحویل حضوری" && "pt-8"
        } flex justify-center items-center`}
      >
        <button
          onClick={() => setIsOpenDetailsModal(true)}
          className="text-cognac-primery border border-cognac-primery py-2.5 rounded-lg text-sm leading-5 w-full cursor-pointer"
        >
          جزئیات سفارش
        </button>
      </div>

      {isOpenDetailsModal && (
        <OrderDetailsModal
          handleCloseModal={handleCloseDetailsModal}
          orderItem={orderItem}
          amountPaid={amountPaid}
          amountDiscount={amountDiscount}
        />
      )}
    </div>
  );
}
