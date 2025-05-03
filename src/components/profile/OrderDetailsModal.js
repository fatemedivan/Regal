import Image from "next/image";
import React from "react";

export default function OrderDetailsModal({ handleCloseModal }) {
  return (
    <div>
      <div
        className="fixed inset-0 bg-[#1E1E1E] opacity-50 z-50"
        onClick={() => handleCloseModal()}
      />
      <div className="bg-white fixed bottom-0 left-0 right-0 z-60 w-full rounded-tr-3xl rounded-tl-3xl px-5 pt-4 pb-6">
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-neutral-gray-4">
          <p className="leading-7 text-neutral-gray-13">اقلام سفارش</p>
          <Image
            width={16}
            height={16}
            src="/img/close-icon-filter.svg"
            className="cursor-pointer lg:w-6 lg:h-6"
            alt=""
            onClick={() => handleCloseModal()}
          />
        </div>
        <div className=" pb-4 mb-4 border-b border-b-neutral-gray-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm leading-6 text-neutral-gray-11">
              لباس میدی مدرن راشا (x۱)
            </p>
            <p className="text-sm leading-6 text-neutral-gray-10">
              ۱,۹۹۹,۰۰۰ تومان
            </p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm leading-6 text-neutral-gray-11">
              لباس میدی رکسان (x۲)
            </p>
            <p className="text-sm leading-6 text-neutral-gray-10">
              ۱,۹۹۹,۰۰۰ تومان
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm leading-6 text-neutral-gray-11">
              لباس میدی توری یاس (x۱)
            </p>
            <p className="text-sm leading-6 text-neutral-gray-10">
              ۱,۹۹۹,۰۰۰ تومان
            </p>
          </div>
        </div>
        <div className="pb-4 mb-4 border-b border-b-neutral-gray-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm leading-6 text-neutral-gray-11">
              مجموع سفارش
            </p>
            <p className="text-sm leading-6 text-neutral-gray-10">
              ۳,۹۹۸,۰۰۰ تومان
            </p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm leading-6 text-cognac-primery">تخفیف</p>
            <p className="text-sm leading-6 text-cognac-primery">
              ۱۱۰.۰۰۰ تومان
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm leading-6 text-neutral-gray-11">
              هزینه ارسال
            </p>
            <p className="text-sm leading-6 text-neutral-gray-10">
              ۸۰.۰۰۰ تومان
            </p>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <p className="text-sm leading-6 text-neutral-gray-11">
              مبلغ پرداخت شده
            </p>
            <p className="text-sm leading-6 text-neutral-gray-10">
              ۳,۹۹۸,۰۰۰ تومان
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
