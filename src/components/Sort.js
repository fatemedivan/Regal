"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function Sort({ handleCloseSort }) {
  const [sortOption, setSortOption] = useState([
    "جدیدترین",
    "قدیمی‌ترین",
    "ارزان‌ترین",
    "گران‌ترین",
  ]);
  const [selectedSort, setSelectedSort] = useState("");
  return (
    <div className="p-5">
      <div className="flex gap-2 items-center mb-12">
        <Image
          width={20}
          height={20}
          src="/img/close-icon-filter.svg"
          onClick={handleCloseSort}
          alt="بستن"
          className="cursor-pointer"
        />
        <p className="">مرتب سازی بر اساس</p>
      </div>
      <ul>
        {sortOption.map((option) => (
          <label key={option} className="flex items-center gap-2 mb-4">
            <input
              type="radio"
              name="sortOption"
              className="hidden peer"
              value={option}
              onChange={() => setSelectedSort(option)}
            />
            <div
              className="w-5 h-5 border border-neutral-gray-4 rounded-sm relative flex items-center justify-center
                          before:content-[''] before:absolute before:w-1.5 before:h-2.5 before:border-r-2 before:border-b-2 before:border-neutral-gray-10 before:rotate-45 before:opacity-0 peer-checked:before:opacity-100 cursor-pointer"
            ></div>
            <p className="peer-checked:text-black text-sm leading-5">
              {option}
            </p>
          </label>
        ))}
        <button
          disabled={!selectedSort}
          onClick={handleCloseSort}
          className={`px-11.75 py-3.25 ${
            selectedSort.length !== 0
              ? "bg-[#B19276] text-white"
              : "bg-cognac-tint-2 text-cognac-tint-4"
          } rounded-lg cursor-pointer`}
        >
          اعمال کنید
        </button>
      </ul>
    </div>
  );
}
