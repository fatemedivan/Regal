import React from "react";
import Products from "@/components/products/Products";

export default async function Page({ searchParams }) {
  const search = searchParams.search;
  const categoryId = searchParams.categoryId;
  const orderBy = searchParams.orderBy;

  return (
    <>
      <Products search={search} categoryId={categoryId} orderBy={orderBy} />
    </>
  );
}
