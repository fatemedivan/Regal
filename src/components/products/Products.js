"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import ProductItemOff from "../common/ProductItemOff";
import Image from "next/image";
import Sort from "./Sort";
import { useScrollLockContext } from "@/context/ScrollLockContext";
import FilterMenu from "@/components/products/FilterMenu";
import ProductSceleton from "../common/ProductSceleton";

export default function Products({
  allProducts,
  totalProductsPages,
  totalProducts,
}) {
  const router = useRouter();
  const { openModal, closeModal } = useScrollLockContext();
  const searchParamsHook = useSearchParams();

  const sortOptions = [
    { id: 1, title: "جدیدترین", value: "newest" },
    { id: 2, title: "قدیمی‌ترین", value: "oldest" },
    { id: 3, title: "ارزان‌ترین", value: "cheapest" },
    { id: 4, title: "گران‌ترین", value: "most_expensive" },
  ];

  const currentPage = parseInt(searchParamsHook.get("page")) || 1;

  const [searchValue, setSearchValue] = useState(
    searchParamsHook.get("search") || ""
  );

  const [isOpenFilterMenu, setIsOpenFilterMenu] = useState(false);
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedOption, setSelectedOption] = useState(() => {
    const currentSort = searchParamsHook.get("sort");
    const option = sortOptions.find((opt) => opt.value === currentSort);
    return option || { id: 1, title: "جدیدترین", value: "newest" };
  });
  const [products, setProducts] = useState(allProducts || []);

  useEffect(() => {
    setProducts(allProducts);
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [allProducts, searchParamsHook]);

  useEffect(() => {
    setSearchValue(searchParamsHook.get("search") || "");

    const currentSort = searchParamsHook.get("sort");
    const option = sortOptions.find((opt) => opt.value === currentSort);
    setSelectedOption(option || { id: 1, title: "جدیدترین", value: "newest" });
  }, [searchParamsHook]);

  const totalPages = totalProductsPages || 1;
  const notFound = products.length === 0 && !isLoading;

  const handleSortChange = (option) => {
    const params = new URLSearchParams(searchParamsHook.toString());
    params.set("sort", option.value);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParamsHook.toString());
    params.set("page", page);
    router.push(`?${params.toString()}`);
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParamsHook.toString());
    if (searchValue.trim()) {
      params.set("search", searchValue.trim());
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <div className="container mx-auto">
        {isOpenFilterMenu && (
          <div className="lg:hidden fixed top-0 left-0 right-0 bottom-0 bg-white z-50 overflow-y-auto">
            <FilterMenu
              handleCloseFilter={() => {
                setIsOpenFilterMenu(false);
                closeModal();
              }}
            />
          </div>
        )}
        {isOpenSort && (
          <div className="lg:hidden fixed top-0 left-0 right-0 bottom-0 bg-white z-50 overflow-y-auto">
            <Sort
              setSelectedOption={setSelectedOption}
              selectedOption={selectedOption}
              handleSortChange={handleSortChange}
              handleCloseSort={() => {
                setIsOpenSort(false);
                closeModal();
              }}
              sortOptions={sortOptions}
            />
          </div>
        )}
        <div>
          <div className="mx-5 mb-16 lg:mx-12 lg:mb-22">
            {notFound && (
              <p className="text-center w-full text-red-500 text-xl font-bold mt-10 lg:hidden">
                محصولی یافت نشد
              </p>
            )}

            {/* Mobile View */}
            <div className="flex items-center gap-2 mt-6.5 mb-1.5 lg:mt-12 lg:mb-10">
              <Image
                width={24}
                height={24}
                className="lg:hidden cursor-pointer"
                src="/img/arrow-right-4.svg"
                alt=""
                onClick={() => router.back()}
              />
              <h5 className="font-semibold leading-5 text-black lg:font-bold lg:text-[27px] lg:inline lg:leading-8">
                <span className="hidden lg:inline mr-2 text-neutral-gray-8 font-bold leading-4.5 text-lg">
                  ({totalProducts && totalProducts} کالا)
                </span>
              </h5>
            </div>
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <p className="text-neutral-gray-8 text-sm leading-5">
                تعداد محصولات : {totalProducts && totalProducts} کالا
              </p>
              <div className="flex items-center gap-2">
                <div
                  onClick={() => {
                    setIsOpenFilterMenu(true);
                    openModal(true);
                  }}
                  className="p-3 border border-neutral-gray-8 rounded-lg cursor-pointer"
                >
                  <Image width={16} height={16} src="/img/filter.svg" alt="" />
                </div>
                <div
                  onClick={() => {
                    setIsOpenSort(true);
                    openModal();
                  }}
                  className="p-3 border border-neutral-gray-8 rounded-lg cursor-pointer"
                >
                  <Image width={16} height={16} src="/img/sort.svg" alt="" />
                </div>
              </div>
            </div>

            {!isLoading && products.length > 0 ? (
              <div className="flex flex-wrap gap-4 lg:hidden">
                {products.map((product) => (
                  <ProductItemOff
                    key={product.id}
                    id={product.id}
                    img={product.images[0]?.imageUrl}
                    offPercent={product.offPercent}
                    title={product.name}
                    price={product.price}
                    finalPrice={product.discountedPrice}
                    colors={product.productColors.map((pc) => pc.color.hexCode)}
                    favorites={product.isLiked}
                  />
                ))}
              </div>
            ) : isLoading && products.length > 0 ? (
              <div className="mt-6 flex items-center flex-wrap gap-4 lg:hidden">
                {products.map((product) => (
                  <ProductSceleton key={product.id} />
                ))}
              </div>
            ) : null}

            {/* Desktop View */}
            <div className="hidden lg:flex justify-between gap-6 mt-10">
              <div>
                <h5 className="text-xl font-bold leading-6.5 text-neutral-gray-13 mb-12">
                  فیلترها
                </h5>
                <div>
                  <FilterMenu />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-6 mb-6">
                  <div className="px-4 py-3.75 rounded-lg border border-neutral-gray-4 flex items-center gap-1 w-full">
                    <Image
                      width={16}
                      height={16}
                      src="/img/search-normal-2.svg"
                      alt=""
                    />
                    <input
                      type="text"
                      value={searchValue}
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      className="w-full outline-none placeholder:text-xs placeholder:leading-4.5 placeholder:text-neutral-gray-7"
                      placeholder="جستجو کنید"
                    />
                    <button
                      onClick={handleSearch}
                      className="px-3 py-1 bg-cognac-primary text-white rounded-md text-xs"
                    >
                      جستجو
                    </button>
                  </div>
                  <div className="relative w-80">
                    <button
                      onClick={() => {
                        setIsOpenSort(!isOpenSort);
                      }}
                      className="w-full border border-neutral-gray-4 rounded-lg py-5 pl-8 pr-6 text-right flex justify-between items-center cursor-pointer"
                    >
                      <p className="text-neutral-gray-7 text-xs leading-4.5">
                        {selectedOption.title || "مرتب سازی بر اساس"}
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
                        {sortOptions.map((option) => (
                          <li
                            key={option.id}
                            onClick={() => {
                              handleSortChange(option);
                              setIsOpenSort(false);
                            }}
                            className="px-4 py-2 hover:bg-neutral-gray-2 cursor-pointer text-xs leading-4.5 text-neutral-gray-7"
                          >
                            {option.title}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                {notFound && (
                  <div className="text-center w-full text-red-500 text-3xl font-bold mt-10">
                    محصولی یافت نشد
                  </div>
                )}
                {!isLoading && products.length > 0 ? (
                  <div className="flex items-center flex-wrap gap-x-6 gap-y-8 2xl:justify-between">
                    {products.map((product) => (
                      <ProductItemOff
                        key={product.id}
                        id={product.id}
                        img={product.images[0]?.imageUrl}
                        offPercent={product.offPercent}
                        title={product.name}
                        price={product.price}
                        finalPrice={product.discountedPrice}
                        colors={product.productColors.map(
                          (pc) => pc.color.hexCode
                        )}
                        favorites={product.isLiked}
                      />
                    ))}
                  </div>
                ) : isLoading && products.length > 0 ? (
                  <div className="mt-8 flex items-center flex-wrap gap-6">
                    {products.map((product) => (
                      <ProductSceleton key={product.id} />
                    ))}
                  </div>
                ) : null}

                {!notFound && (
                  <Pagination
                    currentPage={currentPage}
                    latestPage={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
