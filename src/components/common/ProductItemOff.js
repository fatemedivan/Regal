"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "react-toastify/dist/ReactToastify.css";

export default function ProductItemOff({
  id,
  img,
  title,
  price,
  finalPrice,
  offPercent,
  isMore,
  colors,
  favorites,
}) {
  return (
    <>
      <div className="min-w-41.75 lg:min-w-79.5 relative">
        <Link href={`/products/${id}`}>
          <div
            className={`w-41.75 h-60 lg:w-79.5 lg:h-119 relative object-cover group`}
          >
            <Image
              fill
              className="cursor-pointer"
              src={img}
              alt=""
              quality={100}
              sizes="(min-width: 1024px) 318px, 167px"
            />
            <div className="absolute w-full top-3 lg:top-4 flex justify-between items-center px-3 lg:px-4">
              {favorites && favorites.length ? (
                <Image
                  width={24}
                  height={24}
                  className="cursor-pointer"
                  src="/img/Favorite-icon-2.svg"
                  alt=""
                  quality={100}
                />
              ) : (
                <Image
                  width={24}
                  height={24}
                  className="cursor-pointer"
                  src="/img/favorite-icon.svg"
                  alt=""
                  quality={100}
                />
              )}

              {offPercent > 0 ? (
                <div className="bg-cognac-primery px-2 py-0.5 lg:px-3 lg:py-1 rounded-100 text-white text-xs leading-4.5">
                  {offPercent}٪
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] transition duration-200 ease-in-out rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer">
              <button className="border border-neutral-gray-8 rounded-lg py-2.5 px-4 text-sm leading-5 text-neutral-gray-3 cursor-pointer lg:px-14">
                مشاهده جزئیات
              </button>
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
              {colors.map((color, index) => (
                <div
                  key={`${color}-${index}`}
                  style={{ backgroundColor: color }}
                  className={`w-5 h-5 rounded-sm`}
                ></div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 text-black lg:justify-start">
            {price && finalPrice && offPercent !== 0 && (
              <p className="text-neutral-gray-8 text-xs leading-4.5 lg:text-sm lg:leading-4.5 lg:line-through">
                {price}
              </p>
            )}

            <p className="text-sm leading-6 lg:text-[1rem] lg:leading-7">
              <span className="ml-1">{finalPrice}</span>تومان
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}
