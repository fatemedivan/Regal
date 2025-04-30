import Image from "next/image";
import React from "react";

export default function Breadcrumb() {
  return (
    <ul className="flex items-center gap-1 bg-neutral-gray-1 py-3 pr-5 lg:pr-12 overflow-x-hidden">
      <li className="flex justify-center items-center gap-1 lg:gap-3 min-w-max">
        <p className="text-xs leading-4.5 lg:text-sm lg:leading-6 text-nowrap">صفحه اصلی</p>
        <Image width={16} height={16} src="/img/arrow-left-3.svg" alt="" />
      </li>
      <li className="flex justify-center items-center gap-1 lg:gap-3 min-w-max">
        <p className="text-xs leading-4.5 lg:text-sm lg:leading-6 text-nowrap">دسته‌بندی محصولات</p>
        <Image width={16} height={16} src="/img/arrow-left-3.svg" alt="" />
      </li>
      <li className="flex justify-center items-center gap-1 lg:gap-3 min-w-max">
        <p className="text-xs leading-4.5 lg:text-sm lg:leading-6 text-nowrap">لباس مجلسی</p>
        <Image width={16} height={16} src="/img/arrow-left-3.svg" alt="" />
      </li>
      <li className="flex justify-center items-center gap-1 lg:gap-3 min-w-max">
        <p className="text-xs leading-4.5 lg:text-sm lg:leading-6 text-nowrap">لباس مجلسی میدی</p>
      </li>
    </ul>
  );
}
