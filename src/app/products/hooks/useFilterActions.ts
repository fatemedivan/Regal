import { useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { FilterOptionType, FilterType, ParentFilter } from "./types";

export const useFilterActions = (setIsLoading: (loading: boolean) => void) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const updateURL = useCallback(
    (params: URLSearchParams, callback?: () => void) => {
      if (setIsLoading) setIsLoading(true);
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
        if (callback) callback();
      });
    },
    [router, pathname, setIsLoading]
  );

  const handleOptionChange = useCallback(
    (
      option: string,
      checked: boolean,
      parentFilter: ParentFilter,
      setSelectedFilters: React.Dispatch<
        React.SetStateAction<FilterOptionType[]>
      >
    ) => {
      setSelectedFilters((prev) => {
        if (checked)
          return [
            ...prev,
            {
              type: parentFilter.type,
              filterTitle: parentFilter.title,
              option,
            },
          ];
        return prev.filter(
          (i) => !(i.type === parentFilter.type && i.option === option)
        );
      });
    },
    []
  );

  const applyAllFilters = useCallback(
    (
      selectedFilters: FilterOptionType[],
      minPrice: number,
      maxPrice: number,
      searchParamsHook: URLSearchParams,
      defaultMinPrice: number,
      defaultMaxPrice: number,
      CATEGORY_MAP: Record<string, string | number>
    ) => {
      const params = new URLSearchParams();
      params.set("page", "1");

      selectedFilters.forEach((item) => {
        if (item.type === "size") params.set("size", item.option as string);
        else if (item.type === "color")
          params.set("color", encodeURIComponent(item.option as string));
        else if (item.type === "clothes")
          params.set(
            "categoryId",
            CATEGORY_MAP[item.option as string].toString()
          );
        else if (item.type === "isDiscounted")
          params.set("isDiscounted", item.option === "دارد" ? "true" : "false");
      });

      if (minPrice !== defaultMinPrice || maxPrice !== defaultMaxPrice) {
        params.set("minPrice", minPrice.toString());
        params.set("maxPrice", maxPrice.toString());
      }

      const sort = searchParamsHook.get("sort");
      const search = searchParamsHook.get("search");
      if (sort) params.set("sort", sort);
      if (search) params.set("search", search);

      updateURL(params);
    },
    [updateURL]
  );

  const handleClearFilters = useCallback(
    (
      searchParamsHook: URLSearchParams,
      setSelectedFilters: React.Dispatch<
        React.SetStateAction<FilterOptionType[]>
      >,
      setMinPrice: React.Dispatch<React.SetStateAction<number>>,
      setMaxPrice: React.Dispatch<React.SetStateAction<number>>,
      defaultMinPrice: number,
      defaultMaxPrice: number,
      handleCloseFilter?: () => void
    ) => {
      const params = new URLSearchParams();
      params.set("page", "1");
      const sort = searchParamsHook.get("sort");
      const search = searchParamsHook.get("search");
      if (sort) params.set("sort", sort);
      if (search) params.set("search", search);

      setMinPrice(defaultMinPrice);
      setMaxPrice(defaultMaxPrice);
      setSelectedFilters([]);

      updateURL(params, () => {
        handleCloseFilter?.();
      });
    },
    [updateURL]
  );

  const applyPriceFilter = useCallback(
    (
      minPrice: number,
      maxPrice: number,
      searchParamsHook: URLSearchParams,
      defaultMinPrice: number,
      defaultMaxPrice: number
    ) => {
      const params = new URLSearchParams(searchParamsHook.toString());
      params.set("page", "1");

      if (minPrice !== defaultMinPrice || maxPrice !== defaultMaxPrice) {
        params.set("minPrice", minPrice.toString());
        params.set("maxPrice", maxPrice.toString());
      } else {
        params.delete("minPrice");
        params.delete("maxPrice");
      }

      updateURL(params);
    },
    [updateURL]
  );

  const handleRemoveSelected = useCallback(
    (
      option: string,
      type: FilterType,
      searchParamsHook: URLSearchParams,
      setSelectedFilters: React.Dispatch<
        React.SetStateAction<FilterOptionType[]>
      >,
      setMinPrice: React.Dispatch<React.SetStateAction<number>>,
      setMaxPrice: React.Dispatch<React.SetStateAction<number>>,
      defaultMinPrice: number,
      defaultMaxPrice: number
    ) => {
      if (type === "price") {
        setMinPrice(defaultMinPrice);
        setMaxPrice(defaultMaxPrice);
      }

      setSelectedFilters((prev) =>
        prev.filter((f) => !(f.type === type && f.option === option))
      );

      const params = new URLSearchParams(searchParamsHook.toString());
      params.set("page", "1");

      if (type === "price") {
        params.delete("minPrice");
        params.delete("maxPrice");
      } else if (type === "color") params.delete("color");
      else if (type === "size") params.delete("size");
      else if (type === "clothes") params.delete("categoryId");
      else if (type === "isDiscounted") params.delete("isDiscounted");

      updateURL(params);
    },
    [updateURL]
  );

  return {
    handleOptionChange,
    handleClearFilters,
    applyPriceFilter,
    handleRemoveSelected,
    applyAllFilters,
    isPending,
  };
};
