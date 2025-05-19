import Image from "next/image";
import React from "react";

export default function ProductItemOff({
  id,
  img,
  title,
  price,
  finalPrice,
  offPercent,
  isMore,
  colors,
  disLikeProduct,
}) {
  return (
    <div className="min-w-41.75 lg:min-w-79.5">
      <div className={`w-41.75 h-60 lg:w-79.5 lg:h-119 relative object-cover`}>
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
            onClick={() => disLikeProduct(id)}
            width={24}
            height={24}
            className="cursor-pointer"
            src="/img/Favorite-icon-2.svg"
            alt=""
            quality={100}
          />
          {offPercent && (
            <div className="bg-cognac-primery px-2 py-0.5 lg:px-3 lg:py-1 rounded-100 text-white text-xs leading-4.5">
              {offPercent}٪
            </div>
          )}
        </div>
      </div>
      <div
        className={`lg:flex lg:justify-between lg:items-center lg:mt-3 lg:mb-2 lg:max-w-79.5`}
      >
        <p className="text-sm leading-6 my-2.5 lg:text-[1rem] lg:leading-7 lg:my-0">
          {title}
        </p>

        <div className="flex items-center gap-1 mb-2.5 lg:mb-0">
          {isMore && (
            <div className="hidden lg:block py-0.25 px-0.75 border border-neutral-gray-5 text-neutral-gray-12 rounded-sm leading-4.5 text-xs">
              ۲+
            </div>
          )}
          {colors.map((color) => (
            <div
              key={color + Math.random()}
              style={{ backgroundColor: color }}
              className={`w-5 h-5 rounded-sm
                `}
            ></div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 text-black lg:justify-start">
        <p className="text-neutral-gray-8 text-xs leading-4.5 lg:text-sm lg:leading-4.5 lg:line-through">
          {price}
        </p>
        <p className="text-sm leading-6 lg:text-[1rem] lg:leading-7">
          {" "}
          <span className="ml-1">{finalPrice}</span>تومان
        </p>
      </div>
      <div className="w-41.75 lg:w-79.5 mt-3">
        <button className="border rounded-lg border-cognac-tint-7 text-cognac-primery py-2.5 w-full lg:flex lg:justify-center lg:gap-2 cursor-pointer">
          <Image
            width={16}
            height={16}
            className="hidden lg:block"
            src="/img/shopping-cart-primery.svg"
            alt=""
          />
          <p className="lg:flex">
            اضافه به سبد<span className="hidden lg:block">خرید </span>
          </p>
        </button>
      </div>
    </div>
  );
}
