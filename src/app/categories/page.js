"use client";
import Breadcrumb from "@/components/Breadcrumb";
import FilterMenuMobile from "@/components/FilterMenuMobile";
import Pagination from "@/components/Pagination";
import ProductItemOff from "@/components/ProductItemOff";
import Image from "next/image";
import React, { useState } from "react";

export default function page() {
  const [isOpenFilterMenu, setIsOpenFilterMenu] = useState(false);
  const handleCloseFilter = () => {
    setIsOpenFilterMenu(false);
  };
  return (
    <div className="container mx-auto">
      {isOpenFilterMenu && (
        <div className="lg:hidden">
          <FilterMenuMobile handleCloseFilter={handleCloseFilter} />
        </div>
      )}

      <div>
        <Breadcrumb />
        <div className="mx-5 mb-16 lg:mx-12 lg:mb-22">
          <div className="flex items-center gap-2 mt-6.5 mb-1.5 lg:mt-12 lg:mb-10">
            <Image
              width={24}
              height={24}
              className="lg:hidden"
              src="/img/arrow-right-4.svg"
              alt=""
            />
            <h5 className="font-semibold leading-5 text-black lg:font-bold lg:text-[27px] lg:inline lg:leading-8">
              لباس مجلسی میدی
              <span className="hidden lg:inline mr-2 text-neutral-gray-8 font-bold leading-4.5 text-lg">
                (56 کالا)
              </span>
            </h5>
          </div>
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <p className="text-neutral-gray-8 text-sm leading-5">
              تعداد محصولات : ۵۶ کالا
            </p>
            <div className="flex items-center gap-2">
              <div
                onClick={() => setIsOpenFilterMenu(true)}
                className="p-3 border border-neutral-gray-8 rounded-lg cursor-pointer"
              >
                <Image width={16} height={16} src="/img/filter.svg" alt="" />
              </div>
              <div className="p-3 border border-neutral-gray-8 rounded-lg cursor-pointer">
                <Image width={16} height={16} src="/img/sort.svg" alt="" />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 justify-center lg:hidden">
            <ProductItemOff
              img={"/img/category-page-1.png"}
              offPercent={"۱۵"}
              title={"لباس میدی رکسان"}
              price={"۲,۸۰۰,۰۰۰"}
              finalPrice={"۲,۳۸۰,۰۰۰"}
            />
            <ProductItemOff
              img={"/img/category-page-2.png"}
              title={"لباس میدی مدرن راشا"}
              finalPrice={"۲,۹۵۰,۰۰۰"}
            />
            <ProductItemOff
              img={"/img/category-page-3.png"}
              title={"لباس میدی توری یاس"}
              finalPrice={"۴,۶۵۰,۰۰۰"}
            />
            <ProductItemOff
              img={"/img/category-page-4.png"}
              title={"لباس مدرن پالما"}
              finalPrice={"۲,۶۳۰,۰۰۰"}
            />
            <ProductItemOff
              img={"/img/category-page-5.png"}
              title={"لباس میدی دکلته الی"}
              finalPrice={"۳,۲۰۰,۰۰۰"}
            />
            <ProductItemOff
              img={"/img/category-page-6.png"}
              offPercent={"۱۵"}
              title={"لباس میدی شیوا"}
              price={"۳,۱۰۰,۰۰۰"}
              finalPrice={"۲,۶۳۵,۰۰۰"}
            />
            <ProductItemOff
              img={"/img/category-page-7.png"}
              title={"لباس میدی دیوا"}
              finalPrice={"۵,۶۰۰,۰۰۰"}
            />
            <ProductItemOff
              img={"/img/category-page-8.png"}
              title={"لباس میدی روشا"}
              finalPrice={"۳,۴۰۰,۰۰۰"}
            />
          </div>
          <div className="hidden lg:flex justify-between gap-6">
            <div>
              <h5 className="text-xl font-bold leading-6.5 text-neutral-gray-13 mb-12">
                فیلترها
              </h5>
              <div>
                <FilterMenuMobile />
              </div>
            </div>
            <div>
              <div className="px-4 py-3.75 rounded-lg border border-neutral-gray-4 flex items-center gap-1 w-full">
                <Image
                  width={16}
                  height={16}
                  src="/img/search-normal-2.svg"
                  alt=""
                />
                <input type="text" placeholder="جستجو کنید" />
              </div>
              <div className="flex items-center 2xl:justify-between flex-wrap gap-x-6 gap-y-8 mt-6">
                <ProductItemOff
                  img={"/img/category-page-desktop-1.png"}
                  offPercent={"۱۵"}
                  title={"لباس میدی رکسان"}
                  price={"۲,۸۰۰,۰۰۰"}
                  finalPrice={"۲,۳۸۰,۰۰۰"}
                />
                <ProductItemOff
                  img={"/img/category-page-desktop-2.png"}
                  title={"لباس میدی مدرن راشا"}
                  finalPrice={"۲,۹۵۰,۰۰۰"}
                />
                <ProductItemOff
                  img={"/img/category-page-desktop-3.png"}
                  title={"لباس میدی توری یاس"}
                  finalPrice={"۴,۶۵۰,۰۰۰"}
                />
                <ProductItemOff
                  img={"/img/category-page-desktop-4.png"}
                  title={"لباس مدرن پالما"}
                  finalPrice={"۲,۶۳۰,۰۰۰"}
                />
                <ProductItemOff
                  img={"/img/category-page-desktop-5.png"}
                  title={"لباس میدی دکلته الی"}
                  finalPrice={"۳,۲۰۰,۰۰۰"}
                />
                <ProductItemOff
                  img={"/img/category-page-desktop-6.png"}
                  offPercent={"۱۵"}
                  title={"لباس میدی شیوا"}
                  price={"۳,۱۰۰,۰۰۰"}
                  finalPrice={"۲,۶۳۵,۰۰۰"}
                />
                <ProductItemOff
                  img={"/img/category-page-desktop-7.png"}
                  title={"لباس میدی دیوا"}
                  finalPrice={"۵,۶۰۰,۰۰۰"}
                />
                <ProductItemOff
                  img={"/img/category-page-desktop-8.png"}
                  title={"لباس میدی روشا"}
                  finalPrice={"۳,۴۰۰,۰۰۰"}
                />
                <ProductItemOff
                  img={"/img/category-page-desktop-9.png"}
                  title={"لباس تک شانه ریتا"}
                  finalPrice={"۲,۲۴۰,۰۰۰"}
                />
              </div>
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
