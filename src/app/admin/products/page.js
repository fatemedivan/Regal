"use client";
import ProductsTable from "@/components/admin/ProductsTable";
import React, { useEffect, useState } from "react";

export default function Page() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [products, setProducts] = useState();
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${baseUrl}/admin/products?page=1`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("products response", res);

      if (res.ok) {
        const data = await res.json();
        console.log(data);

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
  }, [token]);
  return (
    <div>
      <ProductsTable
        products={products}
        getProducts={getProducts}
        loading={isLoading}
      />
    </div>
  );
}
