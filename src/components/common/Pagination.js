"use client";
import React from "react";
import Image from "next/image";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
 let pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || Math.abs(i - currentPage) <= 1) {
      pageNumbers.push(i);
    }

    if (i === currentPage - 2 && !pageNumbers.includes("...")) {
      pageNumbers.push("...");
    }
  }

  const handleClick = (page)=>{
    if (page !== '...') {
      onPageChange(page)
    }
  }
  return (
    <div className="flex justify-center items-center gap-3 mt-12">
      {/* Previous Arrow */}
      {currentPage > 1 && (
        <div
          className="p-3 rounded-sm bg-neutral-gray-2 cursor-pointer"
          onClick={() => onPageChange(currentPage - 1)}
        >
          <Image
            width={16}
            height={16}
            src="/img/arrow-right-pagination.svg"
            alt="prev"
          />
        </div>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((item, index) => (
        <div
          key={index}
          onClick={() => handleClick(item)}
          className={`w-10 h-10 flex justify-center items-center rounded-sm text-sm leading-5 cursor-pointer
            ${
              item === currentPage
                ? "bg-neutral-gray-13 text-white"
                : item === "..."
                ? "text-neutral-gray-9 cursor-default"
                : "bg-neutral-gray-2 text-neutral-gray-9"
            }
          `}
        >
          {item}
        </div>
      ))}

      {/* Next Arrow */}
      {currentPage < totalPages && (
        <div
          className="p-3 rounded-sm bg-neutral-gray-2 cursor-pointer"
          onClick={() => onPageChange(currentPage + 1)}
        >
          <Image
            width={16}
            height={16}
            src="/img/arrow-left-pagination.svg"
            alt="next"
          />
        </div>
      )}
    </div>
  );
}
