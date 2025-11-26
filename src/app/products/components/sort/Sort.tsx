"use client";
import Image from "next/image";
import React from "react";
import { SortProps } from "./types";

export default function Sort({
  handleCloseSort,
  selectedSortOption,
  handleSortChange,
  sortOptions,
  isPending,
}: SortProps) {
  return (
    <div className="p-5 relative">
      {/* Header */}
      <div className="flex gap-2 items-center mb-12">
        <Image
          width={20}
          height={20}
          src="/img/close-icon-filter.svg"
          onClick={handleCloseSort}
          alt="بستن"
          className="cursor-pointer"
        />
        <p>مرتب سازی بر اساس</p>
      </div>

      <ul className={`${isPending ? "opacity-50 pointer-events-none" : ""}`}>
        {sortOptions.map((option) => (
          <label key={option.id} className="flex items-center gap-2 mb-4">
            <input
              type="radio"
              name="sortOption"
              className="hidden peer"
              value={option.value}
              checked={selectedSortOption.value === option.value}
              onChange={() => handleSortChange(option)}
            />
            <div
              className="w-5 h-5 border border-neutral-gray-4 rounded-sm relative flex items-center justify-center
                before:content-[''] before:absolute before:w-1.5 before:h-2.5 before:border-r-2 before:border-b-2 before:border-neutral-gray-10 before:rotate-45 before:opacity-0 peer-checked:before:opacity-100 cursor-pointer"
            ></div>
            <p className="peer-checked:text-black text-sm leading-5">
              {option.title}
            </p>
          </label>
        ))}
      </ul>
    </div>
  );
}
