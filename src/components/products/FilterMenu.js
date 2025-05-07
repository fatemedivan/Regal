"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function FilterMenuMobile({ handleCloseFilter }) {
  const [filters, setFilters] = useState([
    {
      id: 1,
      title: "نوع لباس",
      options: ["لباس مجلسی", "پیراهن کوتاه", "کت و شلوار", "شومیز", "شلوار"],
      isOpen: false,
      type: "clothes",
    },
    {
      id: 2,
      title: "رنگ‌بندی",
      options: [
        "#E6E6E6",
        "#94999F",
        "#C2B1A5",
        "#F1AB90",
        "#997979",
        "#6A6A6A",
        "#7E1F6D",
        "#33562F",
        "#CB927C",
        "#69101C",
        "#DAA37F",
        "#C0916F",
        "#988FAB",
        "#E67B79",
        "#5AAAB8",
        "rgba(138,33,32,0.46)",
      ],
      isOpen: false,
      type: "color",
    },
    {
      id: 3,
      title: "سایزبندی",
      options: ["XS", "S", "M", "L", "XL", "2XL"],
      isOpen: false,
      type: "size",
    },
    {
      id: 4,
      title: "جنس پارچه",
      options: ["پنبه", "ساتن", "مخمل", "لینن", "گیپور"],
      isOpen: false,
      type: "fabric",
    },
    {
      id: 5,
      title: "فرم بدن",
      options: ["ساعت شنی", "گلابی", "سیب", "مستطیل", "مثلث وارونه"],
      isOpen: false,
      type: "shape",
    },
    {
      id: 6,
      title: "طرح لباس",
      options: ["ساده", "گل‌دار", "راه‌راه", "طرح‌دار", "براق", "مات"],
      isOpen: false,
      type: "design",
    },
  ]);

  const [selectedFilters, setSelectedFilters] = useState([]);

  const toggleFilter = (id) => {
    setFilters((prev) =>
      prev.map((filter) =>
        filter.id === id ? { ...filter, isOpen: !filter.isOpen } : filter
      )
    );
  };

  const handleOptionChange = (option, checked, parentFilter) => {
    setSelectedFilters((prev) => {
      const filteredPrev = prev.filter(
        (item) => item.type !== parentFilter.type
      );
      return checked
        ? [
            ...filteredPrev,
            {
              option,
              filterTitle: parentFilter.title,
              type: parentFilter.type,
            },
          ]
        : filteredPrev;
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters([]);
  };

  const handleApplyFilters = () => {
    handleCloseFilter();
  };
  const handleRemoveSelected = (option) => {
    setSelectedFilters((prev) =>
      prev.filter((itemfilter) => itemfilter.option !== option)
    );
  };

  return (
    <div className="pb-10">
      {/* Close Button */}
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
      <div className="flex items-center flex-wrap gap-1 mt-7 mx-5 mb-6">
        <div
          className={`hidden lg:${
            selectedFilters.length && "flex"
          } w-full justify-between items-center gap-12 border-b border-neutral-gray-4 pb-4.5 mb-4`}
        >
          <p className="leading-4.5">فیلترهای اعمال شده</p>
          <div className=" flex items-center gap-2 px-4 py-3">
            <p className="text-cognac-primery text-sm leading-5">حذف همه</p>
            <Image
              width={16}
              height={16}
              src="/img/close-filter.svg"
              onClick={() => handleClearFilters()}
              className="cursor-pointer"
              alt=""
            />
          </div>
        </div>
        {selectedFilters.length !== 0 &&
          selectedFilters.map((item, index) => (
            <div
              key={index}
              className="px-3 py-2 max-w-max rounded-100 border border-neutral-gray-4 bg-neutral-gray-1 flex items-center gap-2"
            >
              {item.type === "color" ? (
                <div className="flex items-center gap-2">
                  <p className="text-neutral-gray-13 text-sm leading-5">رنگ:</p>
                  <div
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: item.option }}
                  ></div>
                </div>
              ) : (
                <p className="text-neutral-gray-13 text-sm leading-5">
                  {item.filterTitle === "سایزبندی" ? "سایز" : item.filterTitle}:{" "}
                  {item.option}
                </p>
              )}
              <Image
                onClick={() => handleRemoveSelected(item.option)}
                width={12}
                height={12}
                src="/img/close-icon-filter.svg"
                alt=""
                className="cursor-pointer"
              />
            </div>
          ))}
      </div>
      {/* Filters List */}
      <ul className="mx-5 lg:w-80">
        {filters.map((filter) => (
          <li key={filter.id}>
            <div
              onClick={() => toggleFilter(filter.id)}
              className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-gray-4 cursor-pointer"
            >
              <p className="text-sm font-semibold leading-4 w-full lg:text-[1rem] lg:leading-7">
                {filter.title}
              </p>
              <Image
                width={16}
                height={16}
                src={
                  filter.isOpen ? "/img/arrow-up.svg" : "/img/arrow-down-3.svg"
                }
                alt=""
              />
            </div>

            {filter.isOpen && (
              <div
                className={`flex ${
                  filter.type === "color" || filter.type === "size"
                    ? "flex-wrap gap-3"
                    : "flex-col gap-4"
                } mb-6`}
              >
                {filter.options.map((option, index) => (
                  <label
                    key={index}
                    className="relative cursor-pointer flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      className="peer hidden"
                      checked={selectedFilters.some(
                        (item) => item.option === option
                      )}
                      onChange={(e) =>
                        handleOptionChange(option, e.target.checked, filter)
                      }
                    />
                    {filter.type === "color" && (
                      <>
                        <div
                          style={{ backgroundColor: option }}
                          className="w-8 h-8 rounded-sm flex justify-center items-center relative before:content-[''] before:absolute before:w-1.5 before:h-2.5 before:border-r-2 before:border-b-2 before:border-white before:rotate-45 before:opacity-0 peer-checked:before:opacity-100"
                        ></div>
                        <div
                          style={{ borderColor: option }}
                          className="absolute top-[-4px] left-[-4px] w-10 h-10 rounded-md border-2 opacity-0 peer-checked:opacity-100"
                        ></div>
                      </>
                    )}
                    {filter.type === "size" && (
                      <>
                        <div className="w-8 h-8 text-neutral-gray-11 flex items-center justify-center rounded-sm border border-neutral-gray-4 peer-checked:bg-cognac-shade-4 peer-checked:text-white text-xs leading-4.5 pt-1">
                          {option}
                        </div>
                        <div
                          className={`absolute top-[-4px] left-[-4px] w-10 h-10 rounded-lg border-3 border-cognac-shade-4 opacity-0 peer-checked:opacity-100 transition-all`}
                        ></div>
                      </>
                    )}
                    {filter.type !== "size" && filter.type !== "color" && (
                      <>
                        <div
                          className="w-5 h-5 border border-neutral-gray-4 rounded-sm relative flex items-center justify-center
                          before:content-[''] before:absolute before:w-1.5 before:h-2.5 before:border-r-2 before:border-b-2 before:border-neutral-gray-10 before:rotate-45 before:opacity-0 peer-checked:before:opacity-100"
                        ></div>
                        <p className="peer-checked:text-black text-sm leading-5">
                          {option}
                        </p>
                      </>
                    )}
                  </label>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Action Buttons */}
      <div className="mb-4 flex justify-center items-center gap-4 mt-10 px-5 lg:hidden">
        <button
          onClick={handleClearFilters}
          disabled={selectedFilters.length === 0 ? true : false}
          className={`px-10 py-3.25 border  ${
            selectedFilters.length
              ? "border-neutral-gray-8 text-neutral-gray-11"
              : "border-neutral-gray-4 text-neutral-gray-4"
          } rounded-lg cursor-pointer`}
        >
          حذف فیلترها
        </button>
        <button
          disabled={selectedFilters.length === 0 ? true : false}
          onClick={handleApplyFilters}
          className={`px-11.75 py-3.25 ${
            selectedFilters.length
              ? "bg-[#B19276] text-white"
              : "bg-cognac-tint-2 text-cognac-tint-4"
          } rounded-lg cursor-pointer`}
        >
          اعمال کنید
        </button>
      </div>
    </div>
  );
}
