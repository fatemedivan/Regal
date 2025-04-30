import Image from "next/image";
import React from "react";

export default function DateModal({ handleCloseModal }) {
  return (
    <>
      <div
        className="fixed inset-0 bg-[#1E1E1E] opacity-50 z-50"
        onClick={() => handleCloseModal()}
      />
      <div className="bg-white fixed bottom-0 left-0 right-0 z-60 w-full rounded-tr-3xl rounded-tl-3xl pt-4 px-5 pb-6 lg:w-108 lg:p-6 lg:top-1/2 lg:right-1/2 lg:transform lg:translate-x-1/2 lg:-translate-y-1/2 lg:bottom-auto lg:rounded-3xl">
        <div className="flex justify-between items-center pb-4 border-b border-neutral-gray-4 mb-4 lg:mb-8 lg:border-none">
          <p className="leading-7 text-black lg:text-lg lg:font-bold lg:leading-5.5">
            تاریخ
          </p>
          <Image
            width={16}
            height={16}
            src="/img/close-icon-filter.svg"
            className="cursor-pointer lg:w-6 lg:h-6"
            alt=""
            onClick={() => handleCloseModal()}
          />
        </div>
        <div>
          <div className="flex items-center justify-between border-b border-neutral-gray-4 pb-4 mb-4">
            <p className="text-neutral-gray-6 text-sm leading-5">شنبه</p>
            <p className="text-neutral-gray-6 text-sm leading-5">۲۱ آبان</p>
            <p className="text-neutral-gray-6 text-sm leading-5">۱۴۰۳</p>
          </div>
          <div className="flex items-center justify-between border-b border-neutral-gray-4 pb-4 mb-4">
            <p className="text-neutral-gray-11 text-sm leading-5">یکشنبه</p>
            <p className="text-neutral-gray-11 text-sm leading-5">۲۲ آبان</p>
            <p className="text-neutral-gray-11 text-sm leading-5">۱۴۰۳</p>
          </div>
          <div className="flex items-center justify-between mb-8">
            <p className="text-neutral-gray-6 text-sm leading-5">دوشنبه</p>
            <p className="text-neutral-gray-6 text-sm leading-5">۲۳ آبان</p>
            <p className="text-neutral-gray-6 text-sm leading-5">۱۴۰۳</p>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => handleCloseModal()}
              className="bg-white rounded-lg border border-cognac-primery text-cognac-primery py-3.25 px-30 cursor-pointer"
            >
              تایید
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
