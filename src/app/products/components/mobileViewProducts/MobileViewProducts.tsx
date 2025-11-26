import Image from "next/image";
import React, { useEffect, useState } from "react";
import FilterMenu from "../filterMenu/FilterMenu";
import Sort from "../sort/Sort";
import { MobileViewProductsPros } from "./types";

export default function MobileViewProducts({
  totalProducts,
  notFound,
  renderedProducts,
  handleSortChange,
  selectedSortOption,
  sortOptions,
  isPending,
}: MobileViewProductsPros) {
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
            selectedSortOption={
              selectedSortOption || { id: 1, title: "جدیدترین", value: "newest" }
            }
            handleSortChange={(option) => {
              if (typeof handleSortChange === "function") {
                handleSortChange(option);
              }
              setIsOpenSort(false);
            }}
            handleCloseSort={() => setIsOpenSort(false)}
            sortOptions={sortOptions}
            isPending={isPending}
          />
        </div>
      )}

      {/* Products */}
      {notFound ? (
        <div className="flex lg:hidden flex-col justify-center items-center gap-6 mt-28">
          <Image
            width={128}
            height={116}
            src="/img/order-not-found.svg"
            alt=""
          />
          <p className="text-sm leading-6 text-neutral-gray-9">
            هیچ محصولی یافت نشد
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 lg:hidden">
          {renderedProducts}
        </div>
      )}
    </div>
  );
}
