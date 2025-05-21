"use client";
import ProductsTable from "@/components/admin/ProductsTable";
import Pagination from "@/components/common/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const searchParamsHook = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState();
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [latestPage, setLatestPage] = useState(null);
  const pageParam = searchParamsHook.get("page") || 1;
  const [currentPage, setCurrentPage] = useState(pageParam);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleChangePage = (page) => {
    setCurrentPage(page);
    const params = new URLSearchParams(searchParamsHook.toString());
    params.set("page", page);
    router.push(`?${params.toString()}`);
  };

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${baseUrl}/admin/products?page=${currentPage}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("products response", res);

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setLatestPage(data.latestPage);
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;
    getProducts();
  }, [token, currentPage]);

  return (
    <div>
      <ProductsTable
        products={products}
        getProducts={getProducts}
        loading={isLoading}
      />
      {!isLoading && products && products.length && (
        <div className="flex justify-center items-center mr-50 mb-20">
          <Pagination
            currentPage={currentPage}
            latestPage={latestPage}
            products={products}
            onPageChange={handleChangePage}
          />
        </div>
      )}
    </div>
  );
}
