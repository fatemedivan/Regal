import Image from "next/image";
import React from "react";

export default function ProductSearchItem({
  img,
  title,
  finalPrice,
  offPercent,
  isMore,
}) {
  return (
    <div className="min-w-41.75 lg:min-w-50.5 relative group">
      <div className={`w-41.75 h-60 lg:w-50.5 lg:h-71 relative object-cover`}>
        <Image
          width={167}
          height={239}
          className="w-full h-full"
          src={img}
          alt=""
          quality={100}
        />
        <div className="absolute w-full top-3 lg:top-4 flex justify-between items-center px-3 lg:px-4">
          <Image
            width={24}
            height={24}
            className="cursor-pointer"
            src="/img/favorite-icon.svg"
            alt=""
            quality={100}
          />
          {offPercent && (
            <div className="bg-cognac-primery px-2 py-0.5 lg:px-3 lg:py-1 rounded-100 text-white text-xs leading-4.5">
              {offPercent}٪
            </div>
          )}
        </div>
        <div className="absolute z-10 inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-xl">
          <button className="border border-neutral-gray-8 rounded-lg py-2.5 px-2 lg:px-6 flex items-center justify-center gap-2 cursor-pointer">
            <img src="/img/shopping-cart-3.svg" alt="" />
            <p className="text-sm leading-5 text-neutral-gray-3">
              افزودن به سبد خرید
            </p>
          </button>
        </div>
      </div>
      <div
        className={`lg:flex lg:justify-between lg:items-center lg:mt-3 lg:mb-2 lg:max-w-50.5`}
      >
        <p className="text-sm leading-6 my-2.5 lg:text-[1rem] lg:leading-7 lg:my-0">
          {title}
        </p>

        <div className="flex items-center gap-1 mb-2.5 lg:mb-0 lg:hidden">
          {isMore && (
            <div className="hidden lg:block py-0.25 px-0.75 border border-neutral-gray-5 text-neutral-gray-12 rounded-sm leading-4.5 text-xs">
              ۲+
            </div>
          )}
          <div
            className={`w-5 h-5 rounded-sm bg-[#97AAB4] ${isMore && "hidden"}`}
          ></div>
          <div className="w-5 h-5 rounded-sm bg-[#94999F]"></div>
          <div className="w-5 h-5 rounded-sm bg-[#C2B1A5]"></div>
          <div className="w-5 h-5 rounded-sm bg-[#F1AB90]"></div>
        </div>
      </div>

      <p className="text-sm leading-6 lg:text-[1rem] lg:leading-7">
        {" "}
        <span className="ml-1">{finalPrice}</span>تومان
      </p>
    </div>
  );
}
