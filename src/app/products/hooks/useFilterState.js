import { useState, useEffect, useCallback } from 'react';

const CATEGORY_MAP = {
  "پیراهن کوتاه": "9bb293e1-285d-4a28-846f-46e8c1d55ef7",
  "تاپ و کراپ": "87d187eb-2cf5-4875-aab1-fad320fef6fa",
  شومیز: "a7a6e495-32ec-4f61-a8b3-d8e25ce9721c",
  شلوار: "4840fca4-41eb-4aa5-b914-7ebdb5daa21d",
};

export const useFilterState = (searchParamsHook, setIsLoading) => {
  const defaultMinPrice = 1000000;
  const defaultMaxPrice = 2500000;

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
  const [isOpenPriceFilter, setIsOpenPriceFilter] = useState(false);
  const [minPrice, setMinPrice] = useState(defaultMinPrice);
  const [maxPrice, setMaxPrice] = useState(defaultMaxPrice);

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
        option: decodeURIComponent(color),
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

  const toggleFilter = useCallback((id) => {
    setFilters((prev) =>
      prev.map((f) => (f.id === id ? { ...f, isOpen: !f.isOpen } : f))
    );
  }, []);

  const togglePriceFilter = useCallback(() => {
    setIsOpenPriceFilter(prev => !prev);
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
    CATEGORY_MAP
  };
};