import Image from "next/image";
import React from "react";

export default function MobileViewProducts({
  totalProducts,
  setIsOpenFilterMenu,
  setIsOpenSort,
  notFound,
  renderedProducts,
}) {
  return (
    <div>
      {/* Mobile Product Count & Filter/Sort Buttons */}
      <div className="flex justify-between items-center my-5 lg:hidden">
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
            <Image width={16} height={16} src="/img/filter.svg" alt="Filter" />
          </div>
          <div
            onClick={() => {
              setIsOpenSort(true);
              //  openModal();
            }}
            className="p-3 border border-neutral-gray-8 rounded-lg cursor-pointer"
          >
            <Image width={16} height={16} src="/img/sort.svg" alt="Sort" />
          </div>
        </div>
      </div>

      {/* Mobile Product Display Area */}
      {notFound ? (
        <p className="text-center w-full text-red-500 text-xl font-bold mt-10 lg:hidden">
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
