"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import { sortOptions } from "@/constants/products";
import ProductSceleton from "@/components/ProductSceleton";
import DesktopViewProducts from "./DesktopViewProducts";
import MobileViewProducts from "./MobileViewProducts";

export default function Products({
  allProducts,
  totalProductsPages,
  totalProducts,
}) {
  const router = useRouter();
  const searchParamsHook = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(sortOptions[0]);

  const notFound = allProducts?.length === 0;
  const currentPage = parseInt(searchParamsHook.get("page") || "1", 10);

  useEffect(() => {
    const search = searchParamsHook.get("search") || "";
    const sort = searchParamsHook.get("sort") || "newest";
    setSearchValue(search);
    const option = sortOptions.find((opt) => opt.value === sort);
    setSelectedOption(option || sortOptions[0]);
  }, [searchParamsHook.get("search"), searchParamsHook.get("sort")]);
  
    useEffect(() => {
      const delay = setTimeout(() => {
        const currentSearch = searchParamsHook.get("search") || "";
        if (searchValue.trim() !== currentSearch.trim()) {
          const params = new URLSearchParams(searchParamsHook.toString());
          if (searchValue.trim()) params.set("search", searchValue.trim());
          else params.delete("search");
          params.set("page", "1");
          startTransition(() => {
            router.push(`?${params.toString()}`);
          });
        }
      }, 600);
      return () => clearTimeout(delay);
    }, [searchValue]);

  const handleSortChange = useCallback(
    (option) => {
      const params = new URLSearchParams(searchParamsHook.toString());
      params.set("sort", option.value);
      params.set("page", "1");
      startTransition(() => {
        router.push(`?${params.toString()}`);
      });
    },
    [searchParamsHook, router]
  );

  const handlePageChange = useCallback(
    (page) => {
      const params = new URLSearchParams(searchParamsHook.toString());
      params.set("page", page);
      startTransition(() => {
        router.push(`?${params.toString()}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    },
    [searchParamsHook, router]
  );

  const renderedProducts = useMemo(() => {
    if (isPending) {
      return Array.from({ length: 8 }).map((_, i) => (
        <ProductSceleton key={i} />
      ));
    }

    return allProducts?.map((product) => (
      <ProductCard
        key={product.id}
        id={product.id}
        img={product.images[0]?.imageUrl}
        offPercent={product.offPercent}
        title={product.name}
        price={product.price}
        finalPrice={product.discountedPrice}
        colors={product.productColors.map((pc) => pc.color.hexCode)}
        favorites={product.isLiked}
      />
    ));
  }, [isPending, allProducts]);

  return (
    <div>
      <div className="container mx-auto">
        <div className="mx-5 mb-16 lg:mx-12 lg:mb-22">
          {/* Mobile View */}
          <MobileViewProducts
            totalProducts={totalProducts}
            notFound={notFound}
            renderedProducts={renderedProducts}
          />

          {/* Desktop View */}
          <DesktopViewProducts
            setSearchValue={setSearchValue}
            searchValue={searchValue}
            handleSortChange={handleSortChange}
            totalProducts={totalProducts}
            selectedOption={selectedOption}
            notFound={notFound}
            renderedProducts={renderedProducts}
          />

          {!notFound && (
            <Pagination
              currentPage={currentPage}
              latestPage={totalProductsPages || 1}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}
