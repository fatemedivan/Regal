import { useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

export const useFilterActions = (setIsLoading) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const updateURL = useCallback((params, callback) => {
        if (setIsLoading) setIsLoading(true);
        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`);
            if (callback) callback();
        });
    }, [router, pathname, setIsLoading]);

    const handleOptionChange = useCallback((option, checked, parentFilter, searchParamsHook, selectedFilters, setSelectedFilters, CATEGORY_MAP) => {
        // فقط آپدیت UI - نه URL (برای اعمال دستی با دکمه)
        setSelectedFilters((prev) => {
            if (checked)
                return [
                    ...prev,
                    { type: parentFilter.type, filterTitle: parentFilter.title, option },
                ];
            return prev.filter(
                (i) => !(i.type === parentFilter.type && i.option === option)
            );
        });
    }, []);

    const applyAllFilters = useCallback((selectedFilters, minPrice, maxPrice, searchParamsHook, defaultMinPrice, defaultMaxPrice, CATEGORY_MAP) => {
        const params = new URLSearchParams();
        params.set("page", "1");

        // اضافه کردن فیلترهای انتخاب شده به URL
        selectedFilters.forEach(item => {
            if (item.type === "size") params.set("size", item.option);
            else if (item.type === "color") params.set("color", encodeURIComponent(item.option));
            else if (item.type === "clothes") params.set("categoryId", CATEGORY_MAP[item.option]);
            else if (item.type === "isDiscounted") params.set("isDiscounted", item.option === "دارد" ? "true" : "false");
        });

        // اضافه کردن فیلتر قیمت
        if (minPrice !== defaultMinPrice || maxPrice !== defaultMaxPrice) {
            params.set("minPrice", minPrice.toString());
            params.set("maxPrice", maxPrice.toString());
        }

        // حفظ فیلترهای مرتب سازی و جستجو
        const sort = searchParamsHook.get("sort");
        const search = searchParamsHook.get("search");
        if (sort) params.set("sort", sort);
        if (search) params.set("search", search);

        updateURL(params);
    }, [updateURL]);

    const handleClearFilters = useCallback((searchParamsHook, setSelectedFilters, setMinPrice, setMaxPrice, defaultMinPrice, defaultMaxPrice, handleCloseFilter) => {
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
    }, [updateURL]);

    const applyPriceFilter = useCallback((minPrice, maxPrice, searchParamsHook, defaultMinPrice, defaultMaxPrice) => {
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
    }, [updateURL]);

    const handleRemoveSelected = useCallback((option, type, searchParamsHook, selectedFilters, setSelectedFilters, setMinPrice, setMaxPrice, defaultMinPrice, defaultMaxPrice) => {
        // ابتدا state رو آپدیت کن
        if (type === "price") {
            setMinPrice(defaultMinPrice);
            setMaxPrice(defaultMaxPrice);
        }

        setSelectedFilters((prev) =>
            prev.filter((f) => !(f.type === type && f.option === option))
        );

        // سپس URL رو آپدیت کن (حذف مستقیم)
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
    }, [updateURL]);

    return {
        handleOptionChange,
        handleClearFilters,
        applyPriceFilter,
        handleRemoveSelected,
        applyAllFilters,
        isPending
    };
};