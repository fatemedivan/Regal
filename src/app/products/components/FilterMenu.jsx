"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

import { useFilterState } from "../hooks/useFilterState";
import { useFilterActions } from "../hooks/useFilterActions";
import SelectedFilterTags from "./SelectedFilterTags";
import FilterSection from "./FilterSection";
import PriceFilter from "./PriceFilter";

export default function FilterMenu({ handleCloseFilter, setIsLoading }) {
  const searchParamsHook = useSearchParams();
  const [isApplying, setIsApplying] = useState(false);

  const {
    filters,
    selectedFilters,
    setSelectedFilters,
    isOpenPriceFilter,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    defaultMinPrice,
    defaultMaxPrice,
    toggleFilter,
    togglePriceFilter,
    CATEGORY_MAP,
  } = useFilterState(searchParamsHook, setIsLoading);

  const {
    handleOptionChange,
    handleClearFilters,
    applyPriceFilter,
    handleRemoveSelected,
    applyAllFilters,
    isPending,
  } = useFilterActions(setIsLoading);

  const handleRemoveFilter = (option, type) => {
    handleRemoveSelected(
      option,
      type,
      searchParamsHook,
      selectedFilters,
      setSelectedFilters,
      setMinPrice,
      setMaxPrice,
      defaultMinPrice,
      defaultMaxPrice
    );
  };

  const handleApplyAllFilters = () => {
    setIsApplying(true);
    applyAllFilters(
      selectedFilters,
      minPrice,
      maxPrice,
      searchParamsHook,
      defaultMinPrice,
      defaultMaxPrice,
      CATEGORY_MAP
    );

    setTimeout(() => {
      setIsApplying(false);
      handleCloseFilter?.();
    }, 1000);
  };

  const handleClearAllFilters = () => {
    handleClearFilters(
      searchParamsHook,
      setSelectedFilters,
      setMinPrice,
      setMaxPrice,
      defaultMinPrice,
      defaultMaxPrice,
      handleCloseFilter
    );
  };

  // بررسی آیا هیچ فیلتری انتخاب نشده
  const isNoFiltersSelected =
    selectedFilters.length === 0 &&
    minPrice === defaultMinPrice &&
    maxPrice === defaultMaxPrice;

  return (
    <div className="pb-10">
      {/* Close Button - فقط برای موبایل */}
      <div className="flex items-center gap-2 py-4 pr-5 mb-6 lg:hidden">
        <Image
          width={20}
          height={20}
          src="/img/close-icon-filter.svg"
          onClick={handleCloseFilter}
          alt="بستن"
          className="cursor-pointer"
        />
        <p className="leading-7 text-neutral-gray-13">فیلترها</p>
      </div>

      {/* Selected Filters */}
      <SelectedFilterTags
        selectedFilters={selectedFilters}
        onRemoveFilter={handleRemoveFilter}
      />

      {/* Filters List */}
      <ul className="mx-5 lg:w-70">
        {filters.map((filter) => (
          <FilterSection
            key={filter.id}
            filter={filter}
            isOpen={filter.isOpen}
            onToggle={toggleFilter}
            selectedFilters={selectedFilters}
            onOptionChange={(option, checked, parentFilter) =>
              handleOptionChange(
                option,
                checked,
                parentFilter,
                searchParamsHook,
                selectedFilters,
                setSelectedFilters,
                CATEGORY_MAP
              )
            }
          />
        ))}

        {/* Price Filter */}
        <PriceFilter
          isOpen={isOpenPriceFilter}
          onToggle={togglePriceFilter}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          onApply={() => {
            setIsApplying(true);
            applyPriceFilter(
              minPrice,
              maxPrice,
              searchParamsHook,
              defaultMinPrice,
              defaultMaxPrice
            );
            setTimeout(() => setIsApplying(false), 1000);
          }}
          defaultMinPrice={defaultMinPrice}
          defaultMaxPrice={defaultMaxPrice}
          isApplying={isApplying}
        />
      </ul>

      {/* فقط یک مجموعه دکمه - برای همه حالات */}
      <div className="mt-8 px-5">
        <div className="flex gap-4 lg:flex-col">
          {/* دکمه اعمال فیلتر */}
          <button
            onClick={handleApplyAllFilters}
            disabled={isApplying || isPending || isNoFiltersSelected}
            className={`px-10 py-3 bg-cognac-primery text-white rounded-lg flex items-center justify-center gap-2 transition-colors ${
              isApplying || isPending || isNoFiltersSelected
                ? "cursor-default opacity-50"
                : "cursor-pointer opacity-100 hover:bg-cognac-shade-5"
            }`}
          >
            {isApplying || isPending ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                در حال اعمال...
              </>
            ) : (
              "اعمال فیلتر"
            )}
          </button>

          {/* دکمه حذف فیلترها */}
          <button
            onClick={handleClearAllFilters}
            disabled={isNoFiltersSelected}
            className={`px-10 py-3 border border-neutral-gray-8 text-neutral-gray-11 rounded-lg transition-colors ${
              isNoFiltersSelected
                ? "cursor-default opacity-50"
                : "hover:bg-neutral-gray-2 cursor-pointer"
            }`}
          >
            حذف فیلترها
          </button>
        </div>
      </div>
    </div>
  );
}
