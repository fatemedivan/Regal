"use client";
import React from "react";
import Image from "next/image";

export default function Pagination({
  currentPage,
  latestPage,
  onPageChange,
}) {
  // اگر تعداد کل صفحات 1 یا کمتر باشد، Pagination را نمایش نده
  if (latestPage <= 1) {
    return null;
  }

  let pageNumbers = [];
  const maxPagesToShow = 5; // حداکثر تعداد دکمه‌های صفحه که می‌خواهیم نمایش دهیم (به اضافه دات‌دات)

  // منطق جدید برای تولید شماره صفحات
  if (latestPage <= maxPagesToShow) {
    // اگر تعداد کل صفحات کم باشد، همه را نمایش بده
    for (let i = 1; i <= latestPage; i++) {
      pageNumbers.push(i);
    }
  } else {
    // اگر تعداد صفحات زیاد باشد، از منطق دات‌دات استفاده کن
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(latestPage, currentPage + Math.floor(maxPagesToShow / 2));

    let pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // اضافه کردن 1 و ... اگر نیاز باشد
    if (pages[0] > 1) {
      if (pages[0] > 2) {
        pageNumbers.push(1, "...");
      } else {
        pageNumbers.push(1);
      }
    }

    // اضافه کردن صفحات میانی
    pageNumbers = pageNumbers.concat(pages);

    // اضافه کردن ... و latestPage اگر نیاز باشد
    if (pages[pages.length - 1] < latestPage) {
      if (pages[pages.length - 1] < latestPage - 1) {
        pageNumbers.push("...", latestPage);
      } else {
        pageNumbers.push(latestPage);
      }
    }
  }

  const handleClick = (page) => {
    if (page !== "...") {
      onPageChange(page);
    }
  };

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
          className={`w-10 h-10 flex justify-center items-center rounded-sm text-sm leading-5
            ${
              item === "..."
                ? "text-neutral-gray-9 cursor-default"
                : item === currentPage
                ? "bg-neutral-gray-13 text-white cursor-default"
                : "bg-neutral-gray-2 text-neutral-gray-9 cursor-pointer"
            }
          `}
        >
          {item}
        </div>
      ))}

      {/* Next Arrow */}
      {currentPage < latestPage && (
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