"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

import { useFilterState } from "../../hooks/useFilterState";
import { useFilterActions } from "../../hooks/useFilterActions";
import SelectedFilterTags from "../selectedFilterTag/SelectedFilterTags";
import FilterSection from "../filterSection/FilterSection";
import PriceFilter from "../priceFilter/PriceFilter";
import { FilterMenuProps } from "./types";
import { FilterType } from "../../hooks/types";

export default function FilterMenu({
  handleCloseFilter,
  setIsLoading,
}: FilterMenuProps) {
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
  } = useFilterState(searchParamsHook);

  const {
    handleOptionChange,
    handleClearFilters,
    applyPriceFilter,
    handleRemoveSelected,
    applyAllFilters,
    isPending,
  } = useFilterActions(setIsLoading);

  const handleRemoveFilter = (option: string, type: FilterType) => {
    handleRemoveSelected(
      option,
      type,
      searchParamsHook,
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

  const isNoFiltersSelected =
    selectedFilters.length === 0 &&
    minPrice === defaultMinPrice &&
    maxPrice === defaultMaxPrice;

  return (
    <div className="pb-10">
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

      <SelectedFilterTags
        selectedFilters={selectedFilters}
        onRemoveFilter={handleRemoveFilter}
      />

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
                setSelectedFilters
              )
            }
          />
        ))}

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

      <div className="mt-8 px-5">
        <div className="flex justify-center gap-4">
          <button
            onClick={handleClearAllFilters}
            disabled={isNoFiltersSelected}
            className={`w-40 py-3 border border-neutral-gray-8 text-neutral-gray-11 rounded-lg transition-colors ${
              isNoFiltersSelected
                ? "cursor-default opacity-50"
                : "hover:bg-neutral-gray-2 cursor-pointer"
            }`}
          >
            حذف فیلترها
          </button>
          <button
            onClick={handleApplyAllFilters}
            disabled={isApplying || isPending || isNoFiltersSelected}
            className={` py-3 bg-cognac-primery text-white w-40 rounded-lg flex items-center justify-center gap-2 transition-colors ${
              isApplying || isPending || isNoFiltersSelected
                ? "cursor-default opacity-50"
                : "cursor-pointer opacity-100"
            }`}
          >
            {isApplying || isPending ? (
              <div className="flex items-center py-1 gap-2">
                <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[0ms]"></div>
                <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[150ms]"></div>
                <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[300ms]"></div>
              </div>
            ) : (
              "اعمال فیلتر"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
