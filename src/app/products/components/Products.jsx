"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useTransition, useCallback } from "react";
import Sort from "./Sort";
import FilterMenu from "./FilterMenu";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSceleton";
import DesktopViewProducts from "./DesktopViewProducts";
import MobileViewProducts from "./MobileViewProducts";
import { sortOptions } from "@/constants/products";

export default function Products({
  allProducts,
  totalProductsPages,
  totalProducts,
}) {
  const router = useRouter();
  const searchParamsHook = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // کنترل اسکلتون
  const [isLoading, setIsLoading] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [isOpenFilterMenu, setIsOpenFilterMenu] = useState(false);
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});

  const currentPage = parseInt(searchParamsHook.get("page") || "1", 10);
  const notFound = allProducts?.length === 0;

  // Sync search & sort state with URL params
  useEffect(() => {
    setSearchValue(searchParamsHook.get("search") || "");
    const currentSort = searchParamsHook.get("sort");
    const option = sortOptions.find((opt) => opt.value === currentSort);
    setSelectedOption(option || { id: 1, title: "جدیدترین", value: "newest" });
  }, [searchParamsHook]);

  // وقتی داده‌ها تغییر میکنن (بعد از fetch)، loading رو false کن
  useEffect(() => {
    if (isLoading) setIsLoading(false);
  }, [allProducts]);

  const updateURL = useCallback(
    (paramsObj) => {
      const params = new URLSearchParams(searchParamsHook.toString());
      Object.entries(paramsObj).forEach(([key, value]) => {
        if (value === null || value === undefined) params.delete(key);
        else params.set(key, value);
      });
      params.set("page", "1");
      setIsLoading(true);
      startTransition(() => {
        router.push(`?${params.toString()}`);
      });
    },
    [router, searchParamsHook]
  );

  const handleSortChange = (option) => {
    setSelectedOption(option);
    updateURL({ sort: option.value });
    setIsOpenSort(false);
  };

  const handlePageChange = (page) => {
    updateURL({ page });
  };

  const handleSearch = () => {
    updateURL({ search: searchValue.trim() || null });
  };

  const renderedProducts = isLoading
    ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
    : allProducts?.map((product) => (
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
      ));

  return (
    <div className="container mx-auto">
      {isOpenFilterMenu && (
        <div className="lg:hidden fixed top-0 left-0 right-0 bottom-0 bg-white z-50 overflow-y-auto">
          <FilterMenu
            handleCloseFilter={() => setIsOpenFilterMenu(false)}
            setIsLoading={setIsLoading} // مهم برای اسکلتون
          />
        </div>
      )}
      {isOpenSort && (
        <div className="lg:hidden fixed top-0 left-0 right-0 bottom-0 bg-white z-50 overflow-y-auto">
          <Sort
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
            handleSortChange={handleSortChange}
            handleCloseSort={() => setIsOpenSort(false)}
            sortOptions={sortOptions}
          />
        </div>
      )}

      <div className="mx-5 mb-16 lg:mx-12 lg:mb-22">
        <MobileViewProducts
          totalProducts={totalProducts}
          setIsOpenFilterMenu={setIsOpenFilterMenu}
          setIsOpenSort={setIsOpenSort}
          notFound={notFound}
          renderedProducts={renderedProducts}
        />
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
  );
}
