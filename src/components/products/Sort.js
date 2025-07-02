"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function Sort({
  handleCloseSort,
  selectedOption,
  handleSortChange,
}) {
  const [sortOption, setSortOption] = useState([
    { id: 1, title: "جدیدترین", value: "earliest" },
    { id: 2, title: "قدیمی‌ترین", value: "latest" },
    { id: 3, title: "ارزان‌ترین", value: "cheapest" },
    { id: 4, title: "گران‌ترین", value: "expensive" },
  ]);

  return (
    <div className="p-5">
      <div className="flex gap-2 items-center mb-12">
        <Image
          width={20}
          height={20}
          src="/img/close-icon-filter.svg"
          onClick={() => handleCloseSort()}
          alt="بستن"
          className="cursor-pointer"
        />
        <p className="">مرتب سازی بر اساس</p>
      </div>
      <ul>
        {sortOption.map((option) => (
          <label key={option.id} className="flex items-center gap-2 mb-4">
            <input
              type="radio"
              name="sortOption"
              className="hidden peer"
              value={option}
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
