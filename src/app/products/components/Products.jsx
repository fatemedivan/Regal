"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import Sort from "./Sort";
// import { useScrollLockContext } from "@/context/ScrollLockContext";
import FilterMenu from "@/app/products/components/FilterMenu";
import Pagination from "@/components/Pagination";
import ProductSceleton from "@/components/ProductSceleton";
import ProductCard from "@/components/ProductCard";

export default function Products({
  allProducts,
  totalProductsPages,
  totalProducts,
}) {
  const router = useRouter();
  // const { openModal, closeModal } = useScrollLockContext();
  const searchParamsHook = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const sortOptions = [
    { id: 1, title: "جدیدترین", value: "newest" },
    { id: 2, title: "قدیمی‌ترین", value: "oldest" },
    { id: 3, title: "ارزان‌ترین", value: "cheapest" },
    { id: 4, title: "گران‌ترین", value: "most_expensive" },
  ];

  const currentPage = parseInt(searchParamsHook.get("page") || "1", 10);

  const [searchValue, setSearchValue] = useState(
    searchParamsHook.get("search") || ""
  );

  const [isOpenFilterMenu, setIsOpenFilterMenu] = useState(false);
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(() => {
    const currentSort = searchParamsHook.get("sort");
    // Find the option based on URL or default to "newest"
    const option = sortOptions.find((opt) => opt.value === currentSort);
    return option || { id: 1, title: "جدیدترین", value: "newest" };
  });

  const [products, setProducts] = useState(allProducts || []);

  // Effect to update products and manage loading state when `allProducts` (from server) changes
  useEffect(() => {
    setProducts(allProducts);
    setIsLoading(false);
  }, [allProducts]);

  // Effect to sync search and sort states with URL search params
  useEffect(() => {
    setSearchValue(searchParamsHook.get("search") || "");

    const currentSort = searchParamsHook.get("sort");
    const option = sortOptions.find((opt) => opt.value === currentSort);
    setSelectedOption(option || { id: 1, title: "جدیدترین", value: "newest" });
  }, [searchParamsHook]);

  const totalPages = totalProductsPages || 1;

  const notFound = !isLoading && products.length === 0;

  const handleSortChange = (option) => {
    const params = new URLSearchParams(searchParamsHook.toString());
    params.set("sort", option.value);
    params.set("page", "1");
    startTransition(() => {
      router.push(`?${params.toString()}`);
      setIsOpenSort(false);
     // closeModal();
    });
  };

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParamsHook.toString());
    params.set("page", page);
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParamsHook.toString());
    if (searchValue.trim()) {
      params.set("search", searchValue.trim());
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div>
      <div className="container mx-auto">
        {/* Mobile Filter Menu Modal */}
        {isOpenFilterMenu && (
          <div className="lg:hidden fixed top-0 left-0 right-0 bottom-0 bg-white z-50 overflow-y-auto">
            <FilterMenu
              handleCloseFilter={() => {
                setIsOpenFilterMenu(false);
             //   closeModal();
              }}
            />
          </div>
        )}

        {/* Mobile Sort Menu Modal */}
        {isOpenSort && (
          <div className="lg:hidden fixed top-0 left-0 right-0 bottom-0 bg-white z-50 overflow-y-auto">
            <Sort
              setSelectedOption={setSelectedOption}
              selectedOption={selectedOption}
              handleSortChange={handleSortChange}
              handleCloseSort={() => {
              //  closeModal();
                setIsOpenSort(false);
              }}
              sortOptions={sortOptions}
            />
          </div>
        )}

        <div>
          <div className="mx-5 mb-16 lg:mx-12 lg:mb-22">
            {/* Mobile Header */}
            <div className="flex items-center gap-2 mt-6.5 mb-1.5 lg:mt-12 lg:mb-10">
              <Image
                width={24}
                height={24}
                className="lg:hidden cursor-pointer"
                src="/img/arrow-right-4.svg"
                alt="Back"
                onClick={() => router.back()}
              />
              <h5 className="font-semibold leading-5 text-black lg:font-bold lg:text-[27px] lg:inline lg:leading-8">
                {/* Desktop product count */}
                <span className="hidden lg:inline mr-2 text-neutral-gray-8 font-bold leading-4.5 text-lg">
                  ({totalProducts && totalProducts} کالا)
                </span>
              </h5>
            </div>

            {/* Mobile Product Count & Filter/Sort Buttons */}
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <p className="text-neutral-gray-8 text-sm leading-5">
                تعداد محصولات : {totalProducts && totalProducts} کالا
              </p>
              <div className="flex items-center gap-2">
                <div
                  onClick={() => {
                    setIsOpenFilterMenu(true);
                   // openModal(true);
                  }}
                  className="p-3 border border-neutral-gray-8 rounded-lg cursor-pointer"
                >
                  <Image
                    width={16}
                    height={16}
                    src="/img/filter.svg"
                    alt="Filter"
                  />
                </div>
                <div
                  onClick={() => {
                    setIsOpenSort(true);
                  //  openModal();
                  }}
                  className="p-3 border border-neutral-gray-8 rounded-lg cursor-pointer"
                >
                  <Image
                    width={16}
                    height={16}
                    src="/img/sort.svg"
                    alt="Sort"
                  />
                </div>
              </div>
            </div>

            {/* Mobile Product Display Area */}
            {isLoading ? (
              <div className="mt-6 flex items-center flex-wrap gap-4 lg:hidden">
                {Array.from({ length: 6 }).map((_, index) => (
                  <ProductSceleton key={index} />
                ))}
              </div>
            ) : notFound ? (
              <p className="text-center w-full text-red-500 text-xl font-bold mt-10 lg:hidden">
                محصولی یافت نشد
              </p>
            ) : (
              <div className="flex flex-wrap justify-center gap-4 lg:hidden">
                {products.map((product) => (
                  <ProductCard
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
            )}

            {/* Desktop View */}
            <div className="hidden lg:flex justify-between gap-6 mt-10">
              {/* Desktop Filter Menu */}
              <div>
                <h5 className="text-xl font-bold leading-6.5 text-neutral-gray-13 mb-12">
                  فیلترها
                </h5>
                <div>
                  <FilterMenu />
                </div>
              </div>

              {/* Desktop Product Display Area */}
              <div className="flex-1">
                <div className="flex items-center gap-6 mb-6">
                  {/* Desktop Search Input */}
                  <div className="px-4 py-3.75 rounded-lg border border-neutral-gray-4 flex items-center gap-1 w-full">
                    <Image
                      width={16}
                      height={16}
                      src="/img/search-normal-2.svg"
                      alt="Search Icon"
                    />
                    <input
                      type="text"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
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

                  {/* Desktop Sort Dropdown */}
                  <div className="relative w-80">
                    <button
                      onClick={() => setIsOpenSort(!isOpenSort)}
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
                        className={`absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none transition ${isOpenSort ? "rotate-180" : ""
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

                {isLoading ? (
                  <div className="mt-8 flex items-center flex-wrap gap-6">
                    {Array.from({ length: 9 }).map((_, index) => (
                      <ProductSceleton key={index} />
                    ))}
                  </div>
                ) : notFound ? (
                  <div className="text-center w-full text-red-500 text-3xl font-bold mt-10">
                    محصولی یافت نشد
                  </div>
                ) : (
                  <div className="flex items-center flex-wrap gap-x-6 gap-y-8">
                    {products.map((product) => (
                      <ProductCard
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
                )}
              </div>
            </div>

            {/* Common Pagination for both Mobile and Desktop */}
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
  );
}