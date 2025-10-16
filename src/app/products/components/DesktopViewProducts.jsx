import Image from "next/image";
import React from "react";
import FilterMenu from "./FilterMenu";
import { sortOptions } from "@/constants/products";

export default function DesktopViewProducts({
  setSearchValue,
  handleSearch,
  searchValue,
  setIsOpenSort,
  isOpenSort,
  handleSortChange,
  totalProducts,
  selectedOption,
  notFound,
  renderedProducts
}) {
  return (
    <div className="hidden lg:flex justify-between gap-6 mt-10">
      <div>
        <div className="flex gap-1 items-end">
          <h5 className="text-xl font-bold leading-6.5 text-neutral-gray-13">
            فیلترها
          </h5>
          <h4 className="font-semibold leading-5 text-black lg:font-bold lg:text-[27px] lg:inline lg:leading-8">
            <span className="hidden lg:inline mr-2 text-neutral-gray-8 font-bold leading-4.5 text-lg">
              ({totalProducts && totalProducts} کالا)
            </span>
          </h4>
        </div>
        <FilterMenu />
      </div>

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
                className={`absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none transition ${
                  isOpenSort ? "rotate-180" : ""
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

        {notFound ? (
          <div className="text-center w-full text-red-500 text-3xl font-bold mt-10">
            محصولی یافت نشد
          </div>
        ) : (
          <div className="flex items-center flex-wrap gap-x-6 gap-y-8">
            {renderedProducts}
          </div>
        )}
      </div>
    </div>
  );
}
