"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState, useTransition } from "react";
import Sort from "./Sort";
// import { useScrollLockContext } from "@/context/ScrollLockContext";
import FilterMenu from "@/app/products/components/FilterMenu";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import { sortOptions } from "@/constants/products";
import ProductSceleton from "@/components/ProductSceleton";
import DesktopViewProducts from "./DesktopViewProducts";
import MobileViewProducts from "./MobileViewProducts";

export default function Products({
  allProducts,
  totalProductsPages,
  totalProducts,
}) {
  const router = useRouter();
  // const { openModal, closeModal } = useScrollLockContext();
  const searchParamsHook = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const notFound = allProducts?.length === 0;

  const currentPage = parseInt(searchParamsHook.get("page") || "1", 10);
  const [searchValue, setSearchValue] = useState(
    searchParamsHook.get("search") || ""
  );
  const [isOpenFilterMenu, setIsOpenFilterMenu] = useState(false);
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [selectedOption, setSelectedOption] = useState(() => {
    const currentSort = searchParamsHook.get("sort");
    // Find the option based on URL or default to "newest"
    const option = sortOptions.find((opt) => opt.value === currentSort);
    return option || { id: 1, title: "جدیدترین", value: "newest" };
  });

  // Effect to sync search and sort states with URL search params
  useEffect(() => {
    setSearchValue(searchParamsHook.get("search") || "");
    const currentSort = searchParamsHook.get("sort");
    const option = sortOptions.find((opt) => opt.value === currentSort);
    setSelectedOption(option || { id: 1, title: "جدیدترین", value: "newest" });
  }, [searchParamsHook]);

  const handleSortChange = useCallback(
    (option) => {
      const params = new URLSearchParams(searchParamsHook.toString());
      params.set("sort", option.value);
      params.set("page", "1");
      startTransition(() => {
        router.push(`?${params.toString()}`);
        setIsOpenSort(false);
        // closeModal();
      });
    },
    [searchParamsHook, router]
  );

  const handlePageChange = useCallback(
    (page) => {
      const params = new URLSearchParams(searchParamsHook.toString());
      params.set("page", page);
      startTransition(() => {
        router.push(`?${params.toString()}`);
      });
    },
    [searchParamsHook, router]
  );

  const handleSearch = useCallback(() => {
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
  }, [searchParamsHook, router]);

  const renderedProducts = allProducts?.map((product) => {
    return isPending ? (
      <ProductSceleton key={product.id} />
    ) : (
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
    );
  });

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
            {/* Mobile View */}
            <MobileViewProducts
              totalProducts={totalProducts}
              setIsOpenFilterMenu={setIsOpenFilterMenu}
              notFound={notFound}
              renderedProducts={renderedProducts}
              setIsOpenSort={setIsOpenSort}
            />
            {/* Desktop View */}
            <DesktopViewProducts
              setSearchValue={setSearchValue}
              handleSearch={handleSearch}
              searchValue={searchValue}
              setIsOpenSort={setIsOpenSort}
              isOpenSort={isOpenSort}
              handleSortChange={handleSortChange}
              totalProducts={totalProducts}
              selectedOption={selectedOption}
              notFound={notFound}
              renderedProducts={renderedProducts}
            />

            {!notFound && (
              <Pagination
                currentPage={currentPage}
                latestPage={totalProductsPages || 1}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}