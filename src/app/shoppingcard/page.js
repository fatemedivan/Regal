"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function Page() {
  const [basketItems, setBasketItems] = useState([
    {
      id: 1,
      title: "لباس میدی رکسان",
      img: "/img/itemCard-1.svg",
      size: "M",
      color: "#1C1B19",
      percentOff: "۱۵٪",
      price: "۲,۸۰۰,۰۰۰",
      finalPrice: "۲,۳۸۰,۰۰۰",
    },
    {
      id: 2,
      title: "لباس میدی راشا",
      img: "/img/itemCard-2.svg",
      size: "M",
      color: "#E2E2E0",
      finalPrice: "۲,۰۹۸,۰۰۰",
    },
    {
      id: 3,
      title: "پیراهن ساحلی",
      img: "/img/itemCard-3.svg",
      size: "M",
      color: "#DBD6C5",
      percentOff: "۱۰٪",
      price: "۲,۵۰۰,۰۰۰",
      finalPrice: "۲,۲۵۰,۰۰۰",
    },
  ]);
  return (
    <div className="container mx-auto px-5">
      <div className="mt-6 flex justify-between items-center">
        <Image width={24} height={24} className="cursor-pointer" src="/img/arrow-right-6.svg" alt="" />
        <h3 className="text-[20px] font-semibold leading-6 text-neutral-gray-13">
          سبد خرید
        </h3>
        <Image width={24} height={24} className="cursor-pointer" src="/img/trash-2.svg" alt="" />
      </div>
      <div className="relative flex items-center justify-between w-full py-2 border-t-2 border-dashed border-neutral-gray-6 my-8">
        <div className="bg-white pl-1.5 relative z-20 -top-7">
          <Image
            className=""
            width={24}
            height={24}
            src="/img/bag-2.svg"
            alt=""
          />
        </div>
        <div className="bg-white p-1.5 relative z-20 -top-7">
          <Image
            className=""
            width={24}
            height={24}
            src="/img/pen-add.svg"
            alt=""
          />
        </div>
        <div className="bg-white pr-1.5 relative z-20 -top-7">
          <Image
            className=""
            width={24}
            height={24}
            src="/img/card-pos.svg"
            alt=""
          />
        </div>
      </div>
      <div>
        {basketItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-2 border-b border-neutral-gray-4 pb-4 mb-4"
          >
            <Image width={88} height={116} src={item.img} alt="" />
            <div className="w-full">
              <p className="text-sm leading-5 text-neutral-gray-11">
                {item.title}
              </p>
              <div className="flex items-center gap-4 my-3.75">
                <p className="text-xs leading-4.5 text-neutral-gray-9">
                  سایز: {item.size}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-xs leading-4.5 text-neutral-gray-9">
                    رنگ:
                  </p>
                  <div
                    style={{ backgroundColor: item.color }}
                    className="w-5 h-5 rounded-sm"
                  ></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  {item.percentOff && (
                    <div className="flex items-center gap-1">
                      <p className="text-sm leading-4.5 text-neutral-gray-7 line-through">
                        {item.finalPrice}
                      </p>
                      <div className="px-2 py-0.5 bg-cognac-primery rounded-100 text-white text-sm leading-5">
                        {item.percentOff}
                      </div>
                    </div>
                  )}
                  <p className="text-neutral-gray-11 text-sm leading-5 mt-1">
                    {item.finalPrice} تومان
                  </p>
                </div>
                <div className="flex items-center">
                  <button className="p-3 rounded-lg  border border-neutral-gray-8 cursor-pointer">
                    <Image width={16} height={16} src="/img/add.svg" alt="" />
                  </button>
                  <span className="px-4 py-1.5">1</span>
                  <button className="p-3 rounded-lg  border border-neutral-gray-8 cursor-pointer">
                    <Image width={16} height={16} src="/img/trash.svg" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h5 className="font-semibold leading-5 text-neutral-gray-13 border-b border-neutral-gray-4 pb-4 mb-4">
          جزئیات پرداخت
        </h5>
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm leading-6 text-neutral-gray-11">تعداد</p>
            <p className="text-sm leading-6 text-neutral-gray-10"> 4 عدد</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm leading-6 text-neutral-gray-11">
              قیمت کالاها
            </p>
            <p className="text-sm leading-6 text-neutral-gray-10">
              ۹,۴۹۶,۰۰۰ تومان
            </p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm leading-6 text-cognac-primery">تخفیف</p>
            <p className="text-sm leading-6 text-cognac-primery">
              ۶۷۰,۰۰۰ تومان
            </p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm leading-6 text-neutral-gray-11">
              هزینه ارسال
            </p>
            <p className="text-sm leading-6 text-neutral-gray-10">۰ تومان</p>
          </div>
          <div className="flex items-center mb-4 gap-1">
            <Image width={16} height={16} src="/img/warning-2.svg" alt="" />
            <p className="text-xs leading-4.5 text-warning-shade-1">
              هزینه ارسال در ادامه بر اساس آدرس، زمان و نحوه ارسال انتخابی شما
              محاسبه و به این مبلغ اضافه خواهد شد.
            </p>
          </div>
          <div className="flex justify-between items-center mb-4 border-b pb-4 border-neutral-gray-4">
            <p className="text-sm leading-6 text-neutral-gray-11">
              مبلغ قابل پرداخت
            </p>
            <p className="text-sm leading-6 text-neutral-gray-10">
              ۸,۸۲۶,۰۰۰ تومان
            </p>
          </div>
          <p className="text-xs leading-4.5 text-neutral-gray-9 mt-4 mb-6">
            کالاهای موجود در سبد شما رزرو و ثبت نشده اند. برای ثبت سفارش مراحل
            بعدی را تکمیل کنید.
          </p>
          <div className="border border-neutral-gray-4 rounded-2xl p-5 mb-16">
            <div className="flex items-center gap-2 mb-4">
              <p className="text-neutral-gray-13 text-xs leading-5">
                مبلغ قابل پرداخت:
              </p>
              <h6 className="text-neutral-gray-13 text-sm font-semibold leading-4">
                ۸٬۸۲۶٬۰۰۰ تومان
              </h6>
            </div>
            <div className="flex justify-center items-center">
              <button className="bg-cognac-primery leading-5.5 text-white rounded-lg py-3.25 px-28.5 cursor-pointer">
                ثبت سفارش
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
