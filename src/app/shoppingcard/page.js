"use client";
import ProgressBar from "@/components/ProgressBar";
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
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  return (
    <div className="container mx-auto px-5 lg:px-12">
      <div className="mt-6 flex justify-between items-center lg:hidden">
        <Image
          width={24}
          height={24}
          className="cursor-pointer"
          src="/img/arrow-right-6.svg"
          alt=""
        />
        <h3 className="text-[20px] font-semibold leading-6 text-neutral-gray-13">
          سبد خرید
        </h3>
        <Image
          width={24}
          height={24}
          className="cursor-pointer"
          src="/img/trash-2.svg"
          alt=""
          onClick={() => setIsOpenDeleteModal(true)}
        />
      </div>
      <div className="xl:px-40.5">
        <ProgressBar progress={"basket"} />
      </div>

      <div className="lg:hidden">
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

              <div className="flex items-center justify-between gap-4">
                <div>
                  {item.percentOff && (
                    <div className="flex items-center gap-1">
                      <p className="text-sm leading-4.5 text-neutral-gray-7 line-through">
                        {item.price}
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
                <div className="flex items-center gap-4">
                  <button className="p-3 rounded-lg border border-neutral-gray-8 cursor-pointer">
                    <Image width={16} height={16} src="/img/add.svg" alt="" />
                  </button>
                  <span>1</span>
                  <button className="p-3 rounded-lg  border border-neutral-gray-8 cursor-pointer">
                    <Image width={16} height={16} src="/img/trash.svg" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:flex lg:gap-6">
        <div className="hidden lg:block rounded-2xl border border-neutral-gray-4 p-8 max-w-222 max-h-max lg:mb-22">
          <div className="space-y-6">
            <div className="grid grid-cols-4 text-neutral-gray-12 font-bold text-lg leading-5.5">
              <div className="text-right">محصولات</div>
              <div className="text-center">قیمت</div>
              <div className="text-center">تعداد</div>
              <div className="text-left">جمع کل</div>
            </div>

            {basketItems.map((item, index) => (
              <div key={item.id} className="space-y-3">
                <div
                  className={`grid grid-cols-4 items-center ${
                    index !== basketItems.length - 1
                      ? "border-b border-gray-200 pb-6"
                      : ""
                  }`}
                >
                  <div className="flex gap-4">
                    <Image
                      className="object-cover max-w-21 max-h-21 rounded-lg"
                      width={84}
                      height={84}
                      src={item.img}
                      alt=""
                    />
                    <div>
                      <p className="leading-7 text-neutral-gray-10 xl:text-nowrap">
                        {item.title}
                      </p>
                      <p className="text-sm leading-6 text-neutral-gray-10">
                        سایز: {item.size}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm leading-6 text-neutral-gray-10">
                          رنگ:
                        </p>
                        <div
                          style={{ backgroundColor: item.color }}
                          className="w-5 h-5 rounded-sm"
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center items-center">
                    <div>
                      {item.percentOff && (
                        <div className="flex items-center gap-1">
                          <p className="text-sm leading-6 text-neutral-gray-7 line-through">
                            {item.price}
                          </p>
                          <div className="px-3 py-1 bg-cognac-primery rounded-100 text-white text-sm leading-5">
                            {item.percentOff}
                          </div>
                        </div>
                      )}
                      <p className="text-neutral-gray-10 text-sm leading-6">
                        {item.finalPrice} تومان
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center items-center">
                    <div className="flex items-center gap-4">
                      <button className="p-3 rounded-lg border border-neutral-gray-8 cursor-pointer">
                        <Image
                          width={16}
                          height={16}
                          src="/img/add.svg"
                          alt=""
                        />
                      </button>
                      <span>1</span>
                      <button className="p-3 rounded-lg border border-neutral-gray-8 cursor-pointer">
                        <Image
                          width={16}
                          height={16}
                          src="/img/trash.svg"
                          alt=""
                        />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end items-center">
                    <p className="text-sm leading-6 text-neutral-gray-10">
                      {item.finalPrice} تومان
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 lg:border lg:border-neutral-gray-4 lg:rounded-2xl lg:p-8 lg:mt-0 mb-auto">
          <div className="hidden lg:flex justify-between items-center pb-6 mb-6 border-b border-neutral-gray-4">
            <h6 className="text-lg font-bold leading-5.5 text-black">
              سبد خرید
            </h6>
            <Image
              width={24}
              height={24}
              onClick={() => setIsOpenDeleteModal(true)}
              className="cursor-pointer"
              src="/img/trash-2.svg"
              alt=""
            />
          </div>
          <h5 className="font-semibold leading-5 text-neutral-gray-13 border-b border-neutral-gray-4 pb-4 mb-4 lg:border-none lg:pb-0 lg:font-normal lg:leading-7">
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
            <p className="text-xs leading-4.5 text-neutral-gray-9 mt-4 mb-6 lg:text-sm lg:leading-5">
              کالاهای موجود در سبد شما رزرو و ثبت نشده اند. برای ثبت سفارش مراحل
              بعدی را تکمیل کنید.
            </p>
            <div className="border border-neutral-gray-4 rounded-2xl p-5 mb-16 lg:mb-0 lg:border-none lg:p-0">
              <div className="flex items-center gap-2 mb-4 lg:hidden">
                <p className="text-neutral-gray-13 text-xs leading-5">
                  مبلغ قابل پرداخت:
                </p>
                <h6 className="text-neutral-gray-13 text-sm font-semibold leading-4">
                  ۸٬۸۲۶٬۰۰۰ تومان
                </h6>
              </div>
              <div className="flex justify-center items-center">
                <button className="bg-cognac-primery leading-5.5 text-white rounded-lg py-3.25 px-28.5 lg:px-24 xl:px-36 cursor-pointer">
                  ثبت سفارش
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpenDeleteModal && (
        <>
          <div
            className="fixed inset-0 bg-[#1E1E1E] opacity-50 z-50"
            onClick={() => setIsOpenDeleteModal(false)}
          />
          <div className="bg-white fixed bottom-0 left-0 right-0 z-60 w-full rounded-tr-3xl rounded-tl-3xl pt-4 px-5 pb-6 lg:w-108 lg:p-6 lg:top-1/2 lg:right-1/2 lg:transform lg:translate-x-1/2 lg:-translate-y-1/2 lg:bottom-auto lg:rounded-3xl">
            <div className="flex justify-between items-center pb-4 border-b border-neutral-gray-4 mb-4 lg:mb-8 lg:border-none">
              <p className="leading-7 text-black lg:text-lg lg:font-bold lg:leading-5.5">
                حذف سبد خرید
              </p>
              <Image
                width={16}
                height={16}
                src="/img/close-icon-filter.svg"
                className="cursor-pointer lg:w-6 lg:h-6"
                alt=""
                onClick={() => setIsOpenDeleteModal(false)}
              />
            </div>
            <p className="text-sm leading-7 text-neutral-gray-11 mb-8 lg:mb-10 lg:leading-6">
              آیا از حذف سبد خرید اطمینان دارید؟
            </p>
            <div className="flex items-center gap-4 justify-center flex-wrap">
              <button
                onClick={() => setIsOpenDeleteModal(false)}
                className="leading-5.5 py-3.25 px-14.75 border border-neutral-gray-8 rounded-lg cursor-pointer lg:px-17"
              >
                انصراف
              </button>
              <button
                onClick={() => {
                  setIsOpenDeleteModal(false);
                  setBasketItems([]);
                }}
                className="leading-5.5 bg-error-primery text-white py-3.25 px-16.5 rounded-lg cursor-pointer lg:px-18.75"
              >
                حذف
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
