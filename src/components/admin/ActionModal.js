import Image from "next/image";
import React from "react";

export default function ActionModal({ title, onCancel, onDelete }) {
  return (
    <>
      <div
        className="fixed inset-0 bg-[#1E1E1E] opacity-50 z-50"
        onClick={() => onCancel()}
      />
      <div className="bg-white fixed bottom-0 left-0 right-0 z-60 w-full rounded-tr-3xl rounded-tl-3xl pt-4 px-5 pb-6 lg:w-108 lg:p-6 lg:top-1/2 lg:right-1/2 lg:transform lg:translate-x-1/2 lg:-translate-y-1/2 lg:bottom-auto lg:rounded-3xl">
        <div className="flex justify-between items-center pb-4 border-b border-neutral-gray-4 mb-4 lg:mb-8 lg:border-none">
          <p className="leading-7 text-black lg:text-lg lg:font-bold lg:leading-5.5">
            حذف
          </p>
          <Image
            width={16}
            height={16}
            src="/img/close-icon-filter.svg"
            className="cursor-pointer lg:w-6 lg:h-6"
            alt=""
            onClick={() => onCancel()}
          />
        </div>
        <p className="text-sm leading-7 text-neutral-gray-11 mb-8 lg:mb-10 lg:leading-6">
          {title}
        </p>
        <div className="flex items-center gap-4 justify-center flex-wrap">
          <button
            onClick={() => onCancel()}
            className="leading-5.5 py-3.25 px-14.75 border border-neutral-gray-8 rounded-lg cursor-pointer lg:px-17"
          >
            انصراف
          </button>
          <button
            onClick={() => onDelete()}
            className="leading-5.5 bg-error-primery text-white py-3.25 px-16.5 rounded-lg cursor-pointer lg:px-18.75"
          >
            بله
          </button>
        </div>
      </div>
    </>
  );
}
