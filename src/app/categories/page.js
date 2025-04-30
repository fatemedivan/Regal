"use client";
import Breadcrumb from "@/components/common/Breadcrumb";
import FilterMenu from "@/components/categories/FilterMenu";
import Pagination from "@/components/common/Pagination";
import ProductItemOff from "@/components/common/ProductItemOff";
import Sort from "@/components/categories/Sort";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [isOpenFilterMenu, setIsOpenFilterMenu] = useState(false);
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleCloseFilter = () => {
    setIsOpenFilterMenu(false);
  };
  const handleCloseSort = () => {
    setIsOpenSort(false);
  };
  useEffect(() => {
    if (isOpenFilterMenu || isOpenSort) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpenFilterMenu, isOpenSort]);

  return (
    <div className="container mx-auto">
      {isOpenFilterMenu && (
        <div className="lg:hidden absolute top-0 left-0 right-0 bg-white z-50">
          <FilterMenu handleCloseFilter={handleCloseFilter} />
        </div>
      )}
      {isOpenSort && (
        <div className="lg:hidden absolute top-0 left-0 right-0 bg-white z-50">
          <Sort handleCloseSort={handleCloseSort} />
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
              <div
                onClick={() => setIsOpenSort(true)}
                className="p-3 border border-neutral-gray-8 rounded-lg cursor-pointer"
              >
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
              colors={["#94999F", "#F1AB90"]}
            />
            <ProductItemOff
              img={"/img/category-page-2.png"}
              title={"لباس میدی مدرن راشا"}
              finalPrice={"۲,۹۵۰,۰۰۰"}
              colors={["#94999F", "#F1AB90"]}
            />
            <ProductItemOff
              img={"/img/category-page-3.png"}
              title={"لباس میدی توری یاس"}
              finalPrice={"۴,۶۵۰,۰۰۰"}
              colors={["#94999F", "#F1AB90"]}
            />
            <ProductItemOff
              img={"/img/category-page-4.png"}
              title={"لباس مدرن پالما"}
              finalPrice={"۲,۶۳۰,۰۰۰"}
              colors={["#94999F", "#F1AB90"]}
            />
            <ProductItemOff
              img={"/img/category-page-5.png"}
              title={"لباس میدی دکلته الی"}
              finalPrice={"۳,۲۰۰,۰۰۰"}
              colors={["#94999F", "#F1AB90"]}
            />
            <ProductItemOff
              img={"/img/category-page-6.png"}
              offPercent={"۱۵"}
              title={"لباس میدی شیوا"}
              price={"۳,۱۰۰,۰۰۰"}
              finalPrice={"۲,۶۳۵,۰۰۰"}
              colors={["#94999F", "#F1AB90"]}
            />
            <ProductItemOff
              img={"/img/category-page-7.png"}
              title={"لباس میدی دیوا"}
              finalPrice={"۵,۶۰۰,۰۰۰"}
              colors={["#94999F", "#F1AB90"]}
            />
            <ProductItemOff
              img={"/img/category-page-8.png"}
              title={"لباس میدی روشا"}
              finalPrice={"۳,۴۰۰,۰۰۰"}
              colors={["#94999F", "#F1AB90"]}
            />
          </div>
          <div className="hidden lg:flex justify-between gap-6">
            <div>
              <h5 className="text-xl font-bold leading-6.5 text-neutral-gray-13 mb-12">
                فیلترها
              </h5>
              <div>
                <FilterMenu />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-6">
                <div className="px-4 py-3.75 rounded-lg border border-neutral-gray-4 flex items-center gap-1 w-full">
                  <Image
                    width={16}
                    height={16}
                    src="/img/search-normal-2.svg"
                    alt=""
                  />
                  <input
                    type="text"
                    className="w-full outline-none"
                    placeholder="جستجو کنید"
                  />
                </div>
                <div className="relative w-80">
                  <button
                    onClick={() => setIsOpenSort(!isOpenSort)}
                    className="w-full border border-neutral-gray-4 rounded-lg py-5 pl-8 pr-6 text-right flex justify-between items-center cursor-pointer"
                  >
                    <p className="text-neutral-gray-7 text-xs leading-4.5">
                      {selectedOption || "مرتب سازی بر اساس"}
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
                      {[
                        "جدیدترین",
                        "قدیمی‌ترین",
                        "ارزان‌ترین",
                        "گران‌ترین",
                      ].map((option) => (
                        <li
                          key={option}
                          onClick={() => {
                            setSelectedOption(option);
                            setIsOpenSort(false);
                          }}
                          className="px-4 py-2 hover:bg-neutral-gray-2 cursor-pointer text-xs leading-4.5 text-neutral-gray-7"
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="flex items-center 2xl:justify-between flex-wrap gap-x-6 gap-y-8 mt-6">
                <ProductItemOff
                  img={"/img/category-page-desktop-1.png"}
                  offPercent={"۱۵"}
                  title={"لباس میدی رکسان"}
                  price={"۲,۸۰۰,۰۰۰"}
                  finalPrice={"۲,۳۸۰,۰۰۰"}
                  colors={["#97AAB4", "#C2B1A5", "#F1AB90"]}
                />
                <ProductItemOff
                  img={"/img/category-page-desktop-2.png"}
                  title={"لباس میدی مدرن راشا"}
                  finalPrice={"۲,۹۵۰,۰۰۰"}
                  colors={["#97AAB4", "#94999F", "#C2B1A5", "#F1AB90"]}
                />
                <ProductItemOff
                  img={"/img/category-page-desktop-3.png"}
                  title={"لباس میدی توری یاس"}
                  finalPrice={"۴,۶۵۰,۰۰۰"}
                  colors={["#97AAB4", "#C2B1A5", "#F1AB90"]}
                />
                <ProductItemOff
                  img={"/img/category-page-desktop-4.png"}
                  title={"لباس مدرن پالما"}
                  finalPrice={"۲,۶۳۰,۰۰۰"}
                  colors={["#97AAB4", "#94999F", "#C2B1A5", "#F1AB90"]}
                />
                <ProductItemOff
                  img={"/img/category-page-desktop-5.png"}
                  title={"لباس میدی دکلته الی"}
                  finalPrice={"۳,۲۰۰,۰۰۰"}
                  colors={["#97AAB4", "#94999F", "#C2B1A5", "#F1AB90"]}
                />
                <ProductItemOff
                  img={"/img/category-page-desktop-6.png"}
                  offPercent={"۱۵"}
                  title={"لباس میدی شیوا"}
                  price={"۳,۱۰۰,۰۰۰"}
                  finalPrice={"۲,۶۳۵,۰۰۰"}
                  colors={["#97AAB4", "#C2B1A5", "#F1AB90"]}
                />
                <ProductItemOff
                  img={"/img/category-page-desktop-7.png"}
                  title={"لباس میدی دیوا"}
                  finalPrice={"۵,۶۰۰,۰۰۰"}
                  colors={["#97AAB4", "#C2B1A5", "#F1AB90"]}
                />
                <ProductItemOff
                  img={"/img/category-page-desktop-8.png"}
                  title={"لباس میدی روشا"}
                  finalPrice={"۳,۴۰۰,۰۰۰"}
                  colors={["#97AAB4", "#C2B1A5", "#F1AB90"]}
                />
                <ProductItemOff
                  img={"/img/category-page-desktop-9.png"}
                  title={"لباس تک شانه ریتا"}
                  finalPrice={"۲,۲۴۰,۰۰۰"}
                  colors={["#97AAB4", "#C2B1A5", "#F1AB90"]}
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
