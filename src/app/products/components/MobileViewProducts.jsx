import Image from "next/image";
import React, { useEffect, useState } from "react";
import FilterMenu from "./FilterMenu";
import Sort from "./Sort";
import { sortOptions } from "@/constants/products";

export default function MobileViewProducts({
  totalProducts,
  notFound,
  renderedProducts,
}) {
  const [isOpenFilterMenu, setIsOpenFilterMenu] = useState(false);
  const [isOpenSort, setIsOpenSort] = useState(false);

  useEffect(() => {
    document.body.style.overflow =
      isOpenFilterMenu || isOpenSort ? "hidden" : "";
  }, [isOpenFilterMenu, isOpenSort]);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center my-5 lg:hidden">
        <p className="text-neutral-gray-8 text-sm leading-5">
          تعداد محصولات : {totalProducts && totalProducts} کالا
        </p>
        <div className="flex items-center gap-2">
          <div
            onClick={() => setIsOpenFilterMenu(true)}
            className="p-3 border border-neutral-gray-8 rounded-lg cursor-pointer"
          >
            <Image width={16} height={16} src="/img/filter.svg" alt="Filter" />
          </div>
          <div
            onClick={() => setIsOpenSort(true)}
            className="p-3 border border-neutral-gray-8 rounded-lg cursor-pointer"
          >
            <Image width={16} height={16} src="/img/sort.svg" alt="Sort" />
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      {isOpenFilterMenu && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 overflow-y-auto">
          <FilterMenu handleCloseFilter={() => setIsOpenFilterMenu(false)} />
        </div>
      )}

      {/* Sort Modal */}
      {isOpenSort && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 overflow-y-auto">
          <Sort
            selectedOption={{ id: 1, title: "جدیدترین", value: "newest" }}
            handleSortChange={() => setIsOpenSort(false)}
            handleCloseSort={() => setIsOpenSort(false)}
            sortOptions={sortOptions}
          />
        </div>
      )}

      {/* Products */}
      {notFound ? (
        <p className="text-center w-full text-cognac-primery  text-xl font-bold mt-10 lg:hidden">
          محصولی یافت نشد
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 lg:hidden">
          {renderedProducts}
        </div>
      )}
    </div>
  );
}
