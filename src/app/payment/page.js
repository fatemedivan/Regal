"use client";
import DetailsModal from "@/components/DetailsModal";
import ProgressBar from "@/components/ProgressBar";
import Image from "next/image";
import React, { useState } from "react";

export default function Page() {
  const [payment, setPayment] = useState("online");
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const handleCloseModal = () => {
    setIsOpenDetailsModal(false);
  };
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
                  className="hidden peer outline-none"
                  value="online"
                  onChange={() => setPayment("online")}
                  defaultChecked
                />
                <span className="w-4 h-4 rounded-full border border-neutral-gray-5 flex items-center justify-center peer-checked:border-cognac-primery cursor-pointer">
                  <span className="w-3 h-3 inline-block rounded-full bg-cognac-primery opacity-0 peer-checked:opacity-100 transition" />
                </span>
                <div>
                  <p className="text-sm leading-6 text-neutral-gray-11">
                    پرداخت اینترنتی
                  </p>
                  <p className="text-neutral-gray-9 text-xs leading-4.5">
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
                <span className="w-4 h-4 rounded-full border border-neutral-gray-5 flex items-center justify-center peer-checked:border-cognac-primery cursor-pointer">
                  <span className="w-3 h-3 rounded-full bg-cognac-primery opacity-0 peer-checked:opacity-100 transition" />
                </span>
                <div>
                  <p className="text-sm leading-6 text-neutral-gray-11">
                    پرداخت در محل فروشگاه
                  </p>
                  <p className="text-neutral-gray-9 text-xs leading-4.5">
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
              <div className="flex flex-col justify-center items-center gap-4 lg:gap-6 lg:items-start lg:border lg:border-neutral-gray-4 lg:rounded-2xl lg:p-6">
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
                <p className="text-neutral-gray-9 text-xs leading-4.5">
                  پرداخت از طریق کلیه کارتهای عضو شتاب امکان پذیر است.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 lg:border lg:border-neutral-gray-4 lg:rounded-2xl lg:p-8">
          <div className="hidden lg:block">
            <h5 className="font-semibold leading-5 text-neutral-gray-13 pb-6.5 mb-6 border-b border-neutral-gray-4">
              سبد خرید
            </h5>
            <div className="pb-6 mb-6 border-b border-neutral-gray-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm leading-6 text-neutral-gray-11">
                  لباس میدی رکسان
                </p>
                <p className="text-sm leading-6 text-neutral-gray-11">۱ عدد</p>
                <p className="text-sm leading-6 text-neutral-gray-11">
                  ۲,۳۸۰,۰۰۰ تومان
                </p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm leading-6 text-neutral-gray-11">
                  لباس میدی راشا
                </p>
                <p className="text-sm leading-6 text-neutral-gray-11">۲ عدد</p>
                <p className="text-sm leading-6 text-neutral-gray-11">
                  ۴,۱۹۶,۰۰۰ تومان
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm leading-6 text-neutral-gray-11">
                  پیراهن ساحلی
                </p>
                <p className="text-sm leading-6 text-neutral-gray-11">۱ عدد</p>
                <p className="text-sm leading-6 text-neutral-gray-11">
                  ۲,۲۵۰,۰۰۰ تومان
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center border-b border-neutral-gray-4 pb-4 mb-4 lg:border-none lg:pb-0 ">
            <h5 className="font-semibold leading-5 text-neutral-gray-13 lg:font-normal lg:leading-7">
              جزئیات پرداخت
            </h5>
            <div
              className="flex gap-2 items-center lg:hidden"
              onClick={() => setIsOpenDetailsModal(true)}
            >
              <p className="text-cognac-primery text-sm leading-5 cursor-pointer">
                مشاهده اقلام
              </p>
              <Image
                width={16}
                height={16}
                src="/img/arrow-left-5.svg"
                alt=""
                className="cursor-pointer"
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
        <div className="lg:hidden">
          {isOpenDetailsModal && (
            <DetailsModal handleCloseModal={handleCloseModal} />
          )}
        </div>
      </div>
    </div>
  );
}
