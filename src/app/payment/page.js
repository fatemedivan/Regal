"use client";
import ProgressBar from "@/components/ProgressBar";
import Image from "next/image";
import React, { useState } from "react";

export default function Page() {
  const [payment, setPayment] = useState("");
  return (
    <div className="container mx-auto px-5 pt-6 pb-16 lg:pt-0 lg:px-12">
      <div className="flex justify-between items-center mb-6 lg:hidden ">
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
      <div className="xl:px-40.5">
        <ProgressBar progress={"payment"} />
      </div>
      <div className=" mt-8">
        <h5 className=" font-semibold leading-5 text-black mb-4">
          کد تخفیف یا کارت هدیه
        </h5>
        <div className="flex items-center gap-2 mb-8">
          <input
            type="text"
            placeholder="کد تخفیف"
            className="border border-neutral-gray-4 py-3.75 px-4 rounded-lg placeholder:text-neutral-gray-7 placeholder:text-sm placeholder:leading-4.5"
          />
          <button className="py-3.75 px-3 sm:px-6 border border-cognac-primery text-cognac-primery rounded-lg leading-5.5">
            اعمال کد
          </button>
        </div>
        <div className="mb-8">
          <h5 className=" font-semibold leading-5 text-black mb-5">
            روش پرداخت
          </h5>
          <div className=" p-4 border border-neutral-gray-4 rounded-xl flex  gap-6 items-center">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="payment"
                className="hidden peer"
                value="online"
                onChange={() => setPayment("online")}
              />
              <span className="w-4 h-4 rounded-full border border-neutral-gray-5 flex items-center justify-center peer-checked:border-cognac-primery cursor-pointer">
                <span className="w-3 h-3 inline-block rounded-full bg-cognac-primery opacity-0 peer-checked:opacity-100 transition" />
              </span>
              <p className="text-sm leading-6 text-neutral-gray-11">
                پرداخت اینترنتی
              </p>
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="payment"
                className="hidden peer"
                value="store"
                onChange={() => setPayment("store")}
              />
              <span className="w-4 h-4 rounded-full border border-neutral-gray-5 flex items-center justify-center peer-checked:border-cognac-primery cursor-pointer">
                <span className="w-3 h-3 rounded-full bg-cognac-primery opacity-0 peer-checked:opacity-100 transition" />
              </span>
              <p className="text-sm leading-6 text-neutral-gray-11">
                پرداخت در محل فروشگاه
              </p>
            </label>
          </div>
          {payment === "store" && (
            <div className="bg-neutral-gray-1 rounded-2xl p-4 mt-3">
              <div className="flex items-center gap-2 mb-2">
                <Image width={24} height={24} src="/img/warning-3.svg" alt="" />
                <h6 className="text-lg font-bold leading-5 text-neutral-gray-13">
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
            <h5 className=" font-semibold leading-5 text-black mb-4">
              درگاه پرداخت
            </h5>
            <div className="flex flex-col justify-center items-center gap-4">
              <div className="flex items-center gap-4">
                <Image
                  width={64}
                  height={64}
                  src="/img/Bank-card-1.svg"
                  alt=""
                />
                <Image
                  width={64}
                  height={64}
                  src="/img/Bank-card-2.svg"
                  alt=""
                />
                <Image
                  width={64}
                  height={64}
                  src="/img/Bank-card-3.svg"
                  alt=""
                />
                <Image
                  width={64}
                  height={64}
                  src="/img/Bank-card-4.svg"
                  alt=""
                />
              </div>
              <p className="text-neutral-gray-9 text-xs leading-4.5">
                پرداخت از طریق کلیه کارتهای عضو شتاب امکان پذیر است.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8">
          <div className="flex justify-between items-center border-b border-neutral-gray-4 pb-4 mb-4 lg:border-none lg:pb-0 ">
            <h5 className="font-semibold leading-5 text-neutral-gray-13lg:font-normal lg:leading-7">
              جزئیات پرداخت
            </h5>
            <div className="flex gap-2 items-center">
              <a href="" className="text-cognac-primery text-sm leading-5">
                مشاهده اقلام
              </a>
              <Image
                width={16}
                height={16}
                src="/img/arrow-left-5.svg"
                alt=""
              />
            </div>
          </div>

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
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm leading-6 text-neutral-gray-11">
                هزینه ارسال
              </p>
              <p className="text-sm leading-6 text-neutral-gray-10">
                ۵۰,۰۰۰ تومان
              </p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm leading-6 text-neutral-gray-11">
                مبلغ قابل پرداخت
              </p>
              <p className="text-sm leading-6 text-neutral-gray-10">
                ۸,۸۲۶,۰۰۰ تومان
              </p>
            </div>

            <div className="border border-neutral-gray-4 rounded-2xl p-5 mb-16 lg:mb-0 lg:border-none lg:p-0">
              <div className="flex items-center gap-2 mb-4 lg:hidden">
                <p className="text-neutral-gray-13 text-xs leading-4.5">
                  مبلغ قابل پرداخت:
                </p>
                <h6 className="text-neutral-gray-13 text-lg leading-5.5 font-bold">
                  ۸٬۸۲۶٬۰۰۰ تومان
                </h6>
              </div>
              <div className="flex justify-center items-center">
                <button className="bg-cognac-primery leading-5.5 text-white rounded-lg py-3.25 px-28.5 lg:px-24 xl:px-36 cursor-pointer">
                  پرداخت
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
