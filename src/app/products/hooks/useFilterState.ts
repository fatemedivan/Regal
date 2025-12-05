import { useState, useEffect, useCallback } from "react";
import { FilterItem, FilterOptionType } from "./types";

const CATEGORY_MAP = {
  "پیراهن کوتاه": "2b962459-3cde-4b4a-b3d3-57a5c8f96ac4",
  "تاپ و کراپ": "c8c15ac8-20c9-4c69-81d6-12c7b3b38296",
  شومیز: "cbe0ec0e-3c2d-47bd-8722-47cf69f22d61",
  شلوار: "dad35d92-a50c-4b86-9956-72e3516b2f9a",
};

export const useFilterState = (searchParamsHook: URLSearchParams) => {
  const defaultMinPrice = 1000000;
  const defaultMaxPrice = 2500000;

  const [filters, setFilters] = useState<FilterItem[]>([
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
  ]);

  const [selectedFilters, setSelectedFilters] = useState<FilterOptionType[]>(
    []
  );
  const [minPrice, setMinPrice] = useState(defaultMinPrice);
  const [maxPrice, setMaxPrice] = useState(defaultMaxPrice);
  const [isOpenPriceFilter, setIsOpenPriceFilter] = useState(false);

  useEffect(() => {
    const currentSelected = [];
    const urlMinPrice = parseFloat(searchParamsHook.get("minPrice"));
    const urlMaxPrice = parseFloat(searchParamsHook.get("maxPrice"));

    if (
      !isNaN(urlMinPrice) &&
      !isNaN(urlMaxPrice) &&
      (urlMinPrice !== defaultMinPrice || urlMaxPrice !== defaultMaxPrice)
    ) {
      currentSelected.push({
        type: "price",
        filterTitle: "قیمت",
        option: { min: urlMinPrice, max: urlMaxPrice },
      });
      setMinPrice(urlMinPrice);
      setMaxPrice(urlMaxPrice);
    }

    const color = searchParamsHook.get("color");
    if (color)
      currentSelected.push({
        type: "color",
        filterTitle: "رنگ‌بندی",
        option: color.toLowerCase(),
      });

    const size = searchParamsHook.get("size");
    if (size)
      currentSelected.push({
        type: "size",
        filterTitle: "سایزبندی",
        option: size,
      });

    const catId = searchParamsHook.get("categoryId");
    if (catId) {
      const catName = Object.entries(CATEGORY_MAP).find(
        ([name, id]) => id === catId
      )?.[0];
      if (catName)
        currentSelected.push({
          type: "clothes",
          filterTitle: "نوع لباس",
          option: catName,
        });
    }

    const isDiscounted = searchParamsHook.get("isDiscounted");
    if (isDiscounted)
      currentSelected.push({
        type: "isDiscounted",
        filterTitle: "محصولات تخفیف‌دار",
        option: isDiscounted === "true" ? "دارد" : "ندارد",
      });

    setSelectedFilters(currentSelected);
  }, [searchParamsHook]);

  const toggleFilter = useCallback((id: number) => {
    setFilters((prev) =>
      prev.map((f) => (f.id === id ? { ...f, isOpen: !f.isOpen } : f))
    );
  }, []);

  const togglePriceFilter = useCallback(() => {
    setIsOpenPriceFilter((prev) => !prev);
  }, []);

  return {
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
  };
};
