"use client";
import AdressCard from "@/components/AdressCard";
import BasketDetails from "@/components/BasketDetails";
import DateModal from "@/components/DateModal";
import ProgressBar from "@/components/ProgressBar";
import TimeModal from "@/components/TimeModal";
import Image from "next/image";
import React, { useState } from "react";

export default function Page() {
  const [text, setText] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("courier");
  const maxLenght = 200;
  const [isShowDateModal, setIsShowDateModal] = useState(false);
  const [isShowTimeModal, setIsShowTimeModal] = useState(false);
  const [isHadAdress, setIsHadAdress] = useState(true);
  const handleCloseDateModal = () => {
    setIsShowDateModal(false);
  };
  const handleCloseTimeModal = () => {
    setIsShowTimeModal(false);
  };

  return (
    <div className="container mx-auto px-5 pt-6 pb-16">
      <div className="flex justify-between items-center mb-8 lg:hidden">
        <Image
          width={24}
          height={24}
          className="cursor-pointer"
          src="/img/arrow-right-6.svg"
          alt=""
        />
        <p className="font-semibold text-xl leading-6 text-neutral-gray-13">
          پرداخت
        </p>
        <div></div>
      </div>
      <ProgressBar progress={"completeData"} />
      <div className="mb-9">
        <h5 className="font-semibold leading-5 text-black mb-4">
          روش تحویل سفارش
        </h5>
        <div className="p-4 border border-neutral-gray-4 rounded-xl flex gap-6 items-center">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              className="hidden peer"
              name="radio"
              value="courier"
              onChange={() => setDeliveryOption("courier")}
              defaultChecked
            />
            <div className="w-4 h-4 rounded-full border border-neutral-gray-5 flex items-center justify-cente cursor-pointer">
              <div className="w-3 h-3 rounded-full bg-cognac-primery opacity-0 peer-checked:opacity-100 transition" />
            </div>
            <p className="text-sm leading-6 text-neutral-gray-11">
              ارسال توسط پیک
            </p>
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              className="hidden peer"
              name="radio"
              value="person"
              onChange={() => setDeliveryOption("person")}
            />
            <div className="w-4 h-4 rounded-full border border-neutral-gray-5 flex items-center justify-center cursor-pointer">
              <div className="w-3 h-3 rounded-full bg-cognac-primery opacity-0 peer-checked:opacity-100 transition" />
            </div>
            <p className="text-sm leading-6 text-neutral-gray-11">
              تحویل حضوری
            </p>
          </label>
        </div>
      </div>
      {deliveryOption === "person" ? (
        <div className="mb-9">
          {isHadAdress ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-semibold leading-5 text-black">
                  لیست آدرس‌ها
                </h5>
                <div className="flex items-center gap-2">
                  <Image
                    width={16}
                    height={16}
                    src="/img/add-circle.svg"
                    className="cursor-pointer"
                    alt=""
                  />
                  <p className="text-cognac-primery text-sm leading-5">
                    افزودن آدرس جدید
                  </p>
                </div>
              </div>
              <AdressCard isActive={true} />
              <AdressCard isAtive={false} />
            </>
          ) : (
            <div>
              <h5 className="font-semibold leading-5 text-black mb-4">
                لیست آدرس‌ها
              </h5>
              <div className="border border-neutral-gray-4 rounded-xl py-12 px-11.5 flex flex-col items-center justify-center gap-6">
                <p className="text-neutral-gray-9 leading-6 text-sm">
                  شما در حال حاضر هیچ آدرسی ثبت نکرده‌اید!
                </p>
                <button className="text-white bg-cognac-primery rounded-lg leading-5.5 py-3.25 px-9.5">
                  افزودن آدرس
                </button>
              </div>
            </div>
          )}
        </div>
      ) : deliveryOption === "courier" ? (
        <div className="mb-9">
          <h5 className="font-semibold leading-5 text-black mb-4">
            آدرس فروشگاه
          </h5>
          <div className="border border-neutral-gray-4 rounded-xl p-4">
            <div>
              <div className="flex gap-1 mb-3">
                <Image width={16} height={16} src="/img/location2.svg" alt="" />
                <p className="text-neutral-gray-13 text-sm leading-5">
                  تهران،‌ خیابان ولیعصر نرسیده به میدان ونک
                </p>
              </div>
              <div className="flex gap-1 mb-3">
                <Image width={16} height={16} src="/img/call-2.svg" alt="" />
                <p className="text-neutral-gray-13 text-sm leading-5">
                  ۰۲۱-۱۲۳۴۵۶۷۸ شماره تماس:{" "}
                </p>
              </div>
              <div className="flex gap-1 mb-3">
                <Image width={16} height={16} src="/img/mobile.svg" alt="" />
                <p className="text-neutral-gray-13 text-sm leading-5">
                  ۰۹۱۲۳۴۵۶۷۸۹ شماره همراه:
                </p>
              </div>
              <div className="flex gap-1">
                <Image width={16} height={16} src="/img/clock-2.svg" alt="" />
                <p className="text-neutral-gray-13 text-sm leading-5">
                  ساعت کاری: شنبه تا چهارشنبه ( ۹ صبح تا ۱۸)
                </p>
              </div>
            </div>
            <div className="relative mt-6">
              <Image width={318} height={180} src="/img/map.svg" alt="" />
              <div className="absolute rounded-xl bottom-2 right-2 bg-white border border-cognac-primery p-3.5 cursor-pointer">
                <Image width={20} height={20} src="/img/gps.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="mb-9">
        <h5 className="font-semibold leading-5 text-black mb-4">
          انتخاب زمان ارسال
        </h5>
        <div
          onClick={() => setIsShowDateModal(true)}
          className="px-4 py-3.75 border border-neutral-gray-4 rounded-lg flex justify-between items-center relative cursor-pointer"
        >
          <p className="text-xs leading-4.5 text-neutral-gray-13">
            شنبه ۲۱ آبان ۱۴۰۳
          </p>
          <Image width={16} height={16} src="/img/arrow-down-2.svg" alt="" />
          <div className="absolute -top-2.5">
            <p className="text-neutral-gray-7 text-xs leading-4.5 font-normal bg-white px-1">
              تاریخ
            </p>
          </div>
        </div>
        <div
          onClick={() => setIsShowTimeModal(true)}
          className="px-4 py-3.75 border border-neutral-gray-4 rounded-lg flex justify-between items-center relative mt-3 cursor-pointer"
        >
          <p className="text-xs leading-4.5 text-neutral-gray-13">
            ساعت ۹ تا ۱۲
          </p>
          <Image width={16} height={16} src="/img/arrow-down-2.svg" alt="" />
          <div className="absolute -top-2.5">
            <p className="text-neutral-gray-7 text-xs leading-4.5 font-normal bg-white px-1">
              بازه زمانی
            </p>
          </div>
        </div>
      </div>
      <div className="mb-9">
        <h5 className="font-semibold leading-5 text-black mb-4">
          توضیحات سفارش (اختیاری)
        </h5>
        <div className="p-4 border border-neutral-gray-4 rounded-lg">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={200}
            placeholder="توضیحات سفارش"
            className="placeholder:text-neutral-gray-7 placeholder:text-sm placeholder:leading-5 w-full h-full outline-none resize-none"
          ></textarea>
          <div className="flex items-center justify-end">
            <p className="text-xs text-neutral-gray-7 leading-4.5 ">
              {text.length}/{maxLenght}
            </p>
          </div>
        </div>
      </div>
      <BasketDetails step={2} />
      {isShowDateModal && <DateModal handleCloseModal={handleCloseDateModal} />}
      {isShowTimeModal && <TimeModal handleCloseModal={handleCloseTimeModal} />}
    </div>
  );
}
