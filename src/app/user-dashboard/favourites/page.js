"use client";
import UserPannel from "@/components/profile/UserPannel";
import FavouriteProduct from "@/components/profile/FavouriteProduct";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";


export default function Page() {
  const [isHadFavourite, setIsHadFavourite] = useState(true);
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [selectedOptionSort, setSelectedOptionSort] = useState("");
  const router = useRouter()
  return (
    <>
      <div className="container mx-auto px-5 py-6 lg:hidden">
        <div className="flex justify-between items-center mb-8">
          <Image
            width={24}
            height={24}
            className="cursor-pointer"
            src="/img/arrow-right-6.svg"
            alt=""
            onClick={() => router.back()}
          />
          <p className="font-semibold text-xl leading-6 text-neutral-gray-13">
            لیست علاقه‌مندی‌ها
          </p>
          <div></div>
        </div>
        <div className="relative w-full mb-6">
          <button
            onClick={() => setIsOpenSort(!isOpenSort)}
            className="w-full border border-neutral-gray-4 rounded-lg py-5 pl-8 pr-6 text-right flex justify-between items-center cursor-pointer"
          >
            <p className="text-neutral-gray-7 text-xs leading-4.5">
              {selectedOptionSort || "مرتب سازی بر اساس"}
            </p>
            <Image
              src="/img/drop-down.svg"
              width={16}
              height={16}
              alt="dropdown icon"
              className={`absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none transition ${
                isOpenSort && "rotate-180"
              }`}
            />
          </button>

          {isOpenSort && (
            <ul className="absolute w-full z-20 bg-white border border-neutral-gray-4 mt-1 rounded-lg shadow-lg text-sm">
              {["جدیدترین", "قدیمی‌ترین", "ارزان‌ترین", "گران‌ترین"].map(
                (option) => (
                  <li
                    key={option}
                    onClick={() => {
                      setSelectedOptionSort(option);
                      setIsOpenSort(false);
                    }}
                    className="px-4 py-2 hover:bg-neutral-gray-2 cursor-pointer text-xs leading-4.5 text-neutral-gray-7"
                  >
                    {option}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
        {isHadFavourite ? (
          <div className="flex flex-wrap gap-4">
            <FavouriteProduct
              img={"/img/product-off-1.png"}
              title={"لباس میدی رایا"}
              finalPrice={"۳,۵۰۲,۰۰۰"}
              isMore={false}
              colors={["#97AAB4", "#94999F", "#C2B1A5", "#F1AB90"]}
            />
            <FavouriteProduct
              img={"/img/favourite-product.svg"}
              title={"لباس میدی مدرن مارال"}
              finalPrice={"۳,۸۶۴,۰۰۰"}
              price={"۴,۲۰۰,۰۰۰"}
              offPercent={"۸"}
              isMore={false}
              colors={["#97AAB4", "#94999F", "#C2B1A5", "#F1AB90"]}
            />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-6 mt-28">
            <Image
              width={128}
              height={116}
              src="/img/order-not-found.svg"
              alt=""
            />
            <p className="text-sm leading-6 text-neutral-gray-9">
              شما در حال حاضر هیچ محصولی را به علاقه‌مندی‌ها اضافه نکرده‌اید!
            </p>
            <div className="mt-60 flex items-center justify-center">
              <Link href={"/"}>
                <button className="bg-cognac-primery rounded-lg py-3.25 px-28.5 text-white leading-5.5 cursor-pointer">
                  برو به صفحه اصلی
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="hidden lg:block">
        <UserPannel rout={"favourites"}>
          {isHadFavourite ? (
            <div className="w-full flex flex-wrap justify-between gap-4 my-6">
              <FavouriteProduct
                img={"/img/product-off-1.png"}
                title={"لباس میدی رایا"}
                finalPrice={"۳,۵۰۲,۰۰۰"}
                isMore={false}
                colors={["#97AAB4", "#94999F", "#C2B1A5", "#F1AB90"]}
              />
              <FavouriteProduct
                img={"/img/favourite-product.jpg"}
                title={"لباس میدی مدرن مارال"}
                finalPrice={"۳,۸۶۴,۰۰۰"}
                price={"۴,۲۰۰,۰۰۰"}
                offPercent={"۸"}
                isMore={false}
                colors={["#97AAB4", "#94999F", "#C2B1A5", "#F1AB90"]}
              />
              <FavouriteProduct
                img={"/img/product-off-4.png"}
                title={"لباس میدی تک شانه نولا"}
                finalPrice={"۳,۲۳۰,۰۰۰"}
                isMore={false}
                colors={["#97AAB4", "#94999F", "#C2B1A5", "#F1AB90"]}
              />
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-8 my-12.5">
              <Image
                width={128}
                height={116}
                src="/img/order-not-found.svg"
                alt=""
              />
              <p className="leading-7 text-neutral-gray-9">
                شما در حال حاضر هیچ محصولی را به علاقه‌مندی‌ها اضافه نکرده‌اید!
              </p>
              <Link href={"/"}>
                <button className="bg-cognac-primery rounded-lg py-3.25 px-12 text-white leading-5.5 cursor-pointer">
                  برو به صفحه اصلی
                </button>
              </Link>
            </div>
          )}
        </UserPannel>
      </div>
    </>
  );
}
