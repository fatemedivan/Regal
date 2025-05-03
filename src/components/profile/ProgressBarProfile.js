import Image from "next/image";
import React from "react";

export default function ProgressBarProfile() {
  return (
    <div className="relative w-full">
      <div className="absolute w-full flex">
        <div className="w-2/6 border-t-2 border-dashed border-cognac-primery"></div>
        <div className="w-4/6 border-t-2 border-dashed border-neutral-gray-6"></div>
      </div>
      <div className="w-full flex justify-between items-center absolute -top-4">
        <div className="bg-white pl-2 lg:flex items-center gap-1">
          <Image width={24} height={24} src="/img/box-primery.svg" alt="" />
          <p className="hidden lg:block text-lg font-bold leading-5.5 text-cognac-primery">
            در حال آماده‌سازی
          </p>
        </div>
        <div className="bg-white px-2 lg:flex items-center gap-1">
          <Image
            width={20}
            height={20}
            className="lg:w-4 lg:h-4"
            src="/img/truck-fast.svg"
            alt=""
          />
          <p className="hidden lg:block leading-7 text-neutral-gray-6">
            ارسال توسط پیک
          </p>
        </div>
        <div className="bg-white pr-2 lg:flex items-center gap-1">
          <Image
            width={20}
            height={20}
            className="lg:w-4 lg:h-4"
            src="/img/tick-square.svg"
            alt=""
          />
          <p className="hidden lg:block leading-7 text-neutral-gray-6">
            تحویل داده شد
          </p>
        </div>
      </div>
    </div>
  );
}
