"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProgressBarProfile from "./ProgressBarProfile";
import moment from "jalali-moment";
import OrderDetailsModal from "./OrderDetailsModal";

export default function OrderDetailsCard({
  status,
  deliveryType,
  paymentMethod,
  deliveryStatus,
  date,
  address,
  receivingTime,
  orderItems,
}) {
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

  const formatJalaliDateTime = (isoString) => {
    if (!isoString) return "";
    return moment(isoString).locale("fa").format("dddd D MMMM HH:mm");
  };

  const translateStatus = (statusKey) => {
    switch (statusKey) {
      case "pending":
        return "در حال بررسی";
      case "processing":
        return "در حال آماده‌سازی";
      case "shipped":
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

  const handleCloseDetailsModal = () => {
    setIsOpenDetailsModal(false);
  };

  return (
    <div className="p-3 border border-neutral-gray-4 rounded-xl mb-4">
      <div className="flex justify-between items-center mb-3.5">
        <div className="flex items-center gap-1">
          <Image width={16} height={16} src="/img/clock-3.svg" alt="" />
          <p className="text-neutral-gray-11 text-xs leading-4.5">
            {deliveryStatus && `${deliveryStatus} `}
            {receivingTime && (
              <span className="text-cognac-primery mr-1">{receivingTime}</span>
            )}
            {!deliveryStatus && !receivingTime && "زمان تحویل: نامشخص"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* نمایش روش تحویل */}
          <div className="bg-cognac-tint-1 text-xs leading-4.5 py-0.5 px-2 rounded-100 text-cognac-primery text-nowrap">
            {translateDeliveryMethod(deliveryType)}
          </div>
          {/* نمایش وضعیت سفارش */}
          <div
            className={`text-xs leading-4.5 py-0.5 px-2 rounded-100 ${
              status === "pending"
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
      <div className="flex items-center gap-1 mb-3">
        <Image width={16} height={16} src="/img/calendar.svg" alt="" />
        <p className="text-neutral-gray-11 text-xs leading-4.5">
          {formattedDate || "تاریخ ثبت نشده"}
        </p>
      </div>
      <div
        className={`flex gap-1 ${
          status === "pending" && deliveryType === "delivery" ? "mb-8" : "mb-3"
        }`}
      >
        <Image width={16} height={16} src="/img/location-3.svg" alt="" />
        <p className="text-neutral-gray-11 text-xs leading-4.5">
          {address || "آدرس ثبت نشده"}
        </p>
      </div>
      {/* نمایش روش پرداخت */}
      <div className="flex items-center gap-1 mb-3">
        <p className="text-neutral-gray-11 text-xs leading-4.5">
          روش پرداخت:{" "}
          <span className="font-medium">
            {translatePaymentMethod(paymentMethod)}
          </span>
        </p>
      </div>

      {status === "pending" && deliveryType === "delivery" && (
        <ProgressBarProfile />
      )}

      <div
        className={`${
          status === "pending" && deliveryType === "delivery" ? "pt-8" : ""
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
          orderItems={orderItems}
        />
      )}
    </div>
  );
}
