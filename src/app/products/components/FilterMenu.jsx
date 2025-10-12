"use client";
import Image from "next/image";
import React, { useEffect, useState, useCallback, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation"; 
// import { useScrollLockContext } from "@/context/ScrollLockContext";

export default function FilterMenu({ handleCloseFilter }) {
  const router = useRouter();
  const searchParamsHook = useSearchParams();
  const pathname = usePathname(); 
  // const { closeModal } = useScrollLockContext();

  const [isPending, startTransition] = useTransition(); 

  const defaultMinPrice = 1000000;
  const defaultMaxPrice = 2500000;

  useEffect(() => {
    const urlMinPrice = parseFloat(searchParamsHook.get("minPrice"));
    const urlMaxPrice = parseFloat(searchParamsHook.get("maxPrice"));

    setMinPrice(isNaN(urlMinPrice) ? defaultMinPrice : urlMinPrice);
    setMaxPrice(isNaN(urlMaxPrice) ? defaultMaxPrice : urlMaxPrice);
  }, [searchParamsHook, defaultMinPrice, defaultMaxPrice]);


  const [isOpenPriceFilter, setIsOpenPriceFilter] = useState(false);
  const [minPrice, setMinPrice] = useState(defaultMinPrice); 
  const [maxPrice, setMaxPrice] = useState(defaultMaxPrice); 

  const [filters, setFilters] = useState([
    {
      id: 1,
      title: "نوع لباس",
      options: ["پیراهن کوتاه", "تاپ و کراپ", "شومیز", "شلوار"],
      isOpen: false,
      type: "clothes",
    },
    {
      id: 2,
      title: "رنگ‌بندی",
      options: [
        "#8B0000",
        "#006400",
        "#808080",
        "#C0C0C0",
        "#000000",
        "#ADD8E6",
        "#0000FF",
        "#F5F5DC",
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
      title: "محصولات تخفیف‌دار",
      options: ["دارد", "ندارد"],
      isOpen: false,
      type: "isDiscounted",
    },
  ]);

  const [selectedFilters, setSelectedFilters] = useState([]);

  // Initialize selected filters from URL search params on mount or param change
  useEffect(() => {
    const currentSelected = [];
    const urlMinPrice = parseFloat(searchParamsHook.get("minPrice"));
    const urlMaxPrice = parseFloat(searchParamsHook.get("maxPrice"));
    const currentColor = searchParamsHook.get("color");
    const currentSize = searchParamsHook.get("size");
    const currentCategoryId = searchParamsHook.get("categoryId");
    const currentIsDiscounted = searchParamsHook.get("isDiscounted");

    if (!isNaN(urlMinPrice) && !isNaN(urlMaxPrice) && (urlMinPrice !== defaultMinPrice || urlMaxPrice !== defaultMaxPrice)) {
      currentSelected.push({
        type: "price",
        filterTitle: "قیمت",
        option: { min: urlMinPrice, max: urlMaxPrice },
      });
    }

    if (currentColor) {
      try {
        currentSelected.push({
          type: "color",
          filterTitle: "رنگ‌بندی",
          option: decodeURIComponent(currentColor),
        });
      } catch (e) {
        console.error("Error decoding color URL parameter:", e);
      }
    }
    if (currentSize) {
      currentSelected.push({
        type: "size",
        filterTitle: "سایزبندی",
        option: currentSize,
      });
    }
    if (currentCategoryId) {
      let categoryName = "";
      if (currentCategoryId === "9bb293e1-285d-4a28-846f-46e8c1d55ef7")
        categoryName = "پیراهن کوتاه";
      else if (currentCategoryId === "87d187eb-2cf5-4875-aab1-fad320fef6fa")
        categoryName = "تاپ و کراپ";
      else if (currentCategoryId === "a7a6e495-32ec-4f61-a8b3-d8e25ce9721c")
        categoryName = "شومیز";
      else if (currentCategoryId === "4840fca4-41eb-4aa5-b914-7ebdb5daa21d")
        categoryName = "شلوار";
      if (categoryName) {
        currentSelected.push({
          type: "clothes",
          filterTitle: "نوع لباس",
          option: categoryName,
        });
      }
    }
    if (currentIsDiscounted) {
      currentSelected.push({
        type: "isDiscounted",
        filterTitle: "محصولات تخفیف‌دار",
        option: currentIsDiscounted === "true" ? "دارد" : "ندارد",
      });
    }

    setSelectedFilters(currentSelected);
  }, [searchParamsHook, defaultMinPrice, defaultMaxPrice]); 

  const toggleFilter = (id) => {
    setFilters((prev) =>
      prev.map((filter) =>
        filter.id === id ? { ...filter, isOpen: !filter.isOpen } : filter
      )
    );
  };

  const handleOptionChange = (option, checked, parentFilter) => {
    const params = new URLSearchParams(searchParamsHook.toString());
    params.set("page", "1");

    if (checked) {
      if (parentFilter.type === "size") {
        params.set("size", option);
      } else if (parentFilter.type === "color") {
        params.set("color", encodeURIComponent(option));
      } else if (parentFilter.type === "clothes") {
        if (option === "پیراهن کوتاه")
          params.set("categoryId", "9bb293e1-285d-4a28-846f-46e8c1d55ef7");
        else if (option === "تاپ و کراپ")
          params.set("categoryId", "87d187eb-2cf5-4875-aab1-fad320fef6fa");
        else if (option === "شومیز")
          params.set("categoryId", "a7a6e495-32ec-4f61-a8b3-d8e25ce9721c");
        else if (option === "شلوار")
          params.set("categoryId", "4840fca4-41eb-4aa5-b914-7ebdb5daa21d");
      } else if (parentFilter.type === "isDiscounted") {
        params.set("isDiscounted", option === "دارد" ? "true" : "false");
      }
    } else {
      if (parentFilter.type === "size") {
        params.delete("size");
      } else if (parentFilter.type === "color") {
        params.delete("color");
      } else if (parentFilter.type === "clothes") {
        params.delete("categoryId");
      } else if (parentFilter.type === "isDiscounted") {
        params.delete("isDiscounted");
      }
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    //  closeModal()
    });
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams();
    params.set("page", "1");
    const currentSort = searchParamsHook.get("sort");
    const currentSearch = searchParamsHook.get("search");
    if (currentSort) params.set("sort", currentSort);
    if (currentSearch) params.set("search", currentSearch);

    startTransition(() => { 
      router.push(`${pathname}?${params.toString()}`);
    });
    setMinPrice(defaultMinPrice);
    setMaxPrice(defaultMaxPrice);
    if (handleCloseFilter) {
      handleCloseFilter();
      //closeModal();
    }
  };


  const applyPriceFilter = useCallback(() => {
    const params = new URLSearchParams(searchParamsHook.toString());
    params.set("page", "1"); 

    const isPriceChangedFromDefault =
      minPrice !== defaultMinPrice || maxPrice !== defaultMaxPrice;

    if (isPriceChangedFromDefault) {
      params.set("minPrice", minPrice.toString());
      params.set("maxPrice", maxPrice.toString());
    } else {
      params.delete("minPrice");
      params.delete("maxPrice");
    }

    
    const newUrl = `${pathname}?${params.toString()}`;
    if (router.asPath !== newUrl) { 
      startTransition(() => { 
        router.push(newUrl);
      });
    }
   // closeModal();
  }, [minPrice, maxPrice, router, pathname, searchParamsHook, defaultMinPrice, defaultMaxPrice]);

  // Function to remove individual selected filter chips
  const handleRemoveSelected = (optionToRemove, type) => {
    const params = new URLSearchParams(searchParamsHook.toString());
    params.set("page", "1");
    if (type === "price") {
      params.delete("minPrice");
      params.delete("maxPrice");
      setMinPrice(defaultMinPrice);
      setMaxPrice(defaultMaxPrice);
    } else if (type === "color") {
      params.delete("color");
    } else if (type === "size") {
      params.delete("size");
    } else if (type === "clothes") {
      params.delete("categoryId");
    } else if (type === "isDiscounted") {
      params.delete("isDiscounted");
    }

    startTransition(() => { 
      router.push(`${pathname}?${params.toString()}`);
    //  closeModal()
    });
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
          className={`hidden lg:${selectedFilters.length ? "flex" : "hidden"
            } w-full justify-between items-center gap-4 border-b border-neutral-gray-4 pb-4.5 mb-4`}
        >
          <p className="leading-4.5">فیلترهای اعمال شده</p>
          <div className="flex items-center gap-2 px-4 py-3">
            <p className="text-cognac-primery text-sm leading-5">حذف همه</p>
            <Image
              width={16}
              height={16}
              src="/img/close-filter.svg"
              onClick={handleClearFilters}
              className="cursor-pointer"
              alt=""
            />
          </div>
        </div>
        {selectedFilters.length !== 0 &&
          selectedFilters.map((item, index) => (
            <div
              key={item.type + (item.option?.min || item.option) || index} 
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
              ) : item.type === "price" ? (
                <p className="text-neutral-gray-13 text-sm leading-5">
                  قیمت: {item.option.min.toLocaleString()} تا
                  {item.option.max.toLocaleString()}
                </p>
              ) : (
                <p className="text-neutral-gray-13 text-sm leading-5">
                  {item.filterTitle === "سایزبندی" ? "سایز" : item.filterTitle}:
                  {item.option}
                </p>
              )}
              <Image
                onClick={() => handleRemoveSelected(item.option, item.type)}
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
                className={`flex ${filter.type === "color" || filter.type === "size"
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
                        (item) =>
                          item.option === option && item.type === filter.type
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
                          className="absolute -top-1 -left-1 w-10 h-10 rounded-md border-2 opacity-0 peer-checked:opacity-100"
                        ></div>
                      </>
                    )}
                    {filter.type === "size" && (
                      <>
                        <div className="w-8 h-8 text-neutral-gray-11 flex items-center justify-center rounded-sm border border-neutral-gray-4 peer-checked:bg-cognac-shade-4 peer-checked:text-white text-xs leading-4.5 pt-1">
                          {option}
                        </div>
                        <div
                          className={`absolute -top-1 -left-1 w-10 h-10 rounded-lg border-3 border-cognac-shade-4 opacity-0 peer-checked:opacity-100 transition-all`}
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
        <li>
          <div
            onClick={() => setIsOpenPriceFilter(!isOpenPriceFilter)}
            className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-gray-4 cursor-pointer"
          >
            <p className="text-sm font-semibold leading-4 w-full lg:text-[1rem] lg:leading-7">
              قیمت
            </p>
            <Image
              width={16}
              height={16}
              src={
                isOpenPriceFilter
                  ? "/img/arrow-up.svg"
                  : "/img/arrow-down-3.svg"
              }
              alt=""
            />
          </div>
          {isOpenPriceFilter && (
            <div>
              <div className="relative w-full">
                {/* Range inputs for price filter */}
                <input
                  type="range"
                  min={defaultMinPrice}
                  max={defaultMaxPrice}
                  step={10000}
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="absolute bottom-2.5 w-full h-0.5 bg-transparent appearance-none"
                />

                <input
                  type="range"
                  min={defaultMinPrice}
                  max={defaultMaxPrice}
                  step={10000}
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value));
                  }}
                  className="w-full h-0.5 bg-neutral-gray-5 rounded-lg appearance-none"
                />
              </div>

              <div className="flex items-center gap-2.5 text-neutral-gray-7 w-full mt-4 lg:mt-5">
                <button className="border border-neutral-gray-5 rounded-lg py-2.75 px-9 text-xs leading-4.5 lg:px-5">
                  {minPrice.toLocaleString()}{" "}
                  <span className="mr-1">تومان</span>
                </button>
                <span className="leading-5 text-sm">تا</span>
                <button className="border border-gray-500 rounded-lg py-2.75 px-9 text-xs leading-4.5 lg:px-5">
                  {maxPrice.toLocaleString()}{" "}
                  <span className="mr-1">تومان</span>
                </button>
              </div>
              {/* Add an "Apply" button for price filter */}
              <div className="mt-4 text-center">
                <button
                  onClick={applyPriceFilter} 
                  className="px-6 py-2 bg-cognac-primary text-white rounded-lg text-sm"
                >
                  اعمال قیمت
                </button>
              </div>
            </div>
          )}
        </li>
      </ul>
      {/* Action Buttons */}
      <div className="mb-4 flex justify-center items-center gap-4 mt-10 px-5 lg:hidden">
        <button
          onClick={handleClearFilters}
          disabled={
            selectedFilters.length === 0 &&
            minPrice === defaultMinPrice &&
            maxPrice === defaultMaxPrice
          }
          className={`px-10 py-3.25 border ${selectedFilters.length > 0 ||
              minPrice !== defaultMinPrice ||
              maxPrice !== defaultMaxPrice
              ? "border-neutral-gray-8 text-neutral-gray-11"
              : "border-neutral-gray-4 text-neutral-gray-4"
            } rounded-lg cursor-pointer`}
        >
          حذف فیلترها
        </button>
      </div>
    </div>
  );
}