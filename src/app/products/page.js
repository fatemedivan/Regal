import Products from "@/components/products/Products";
import { cookies } from "next/headers";

export default async function Page({ searchParams }) {
  console.log("Server Component: Page Rendered with searchParams:", searchParams);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const cookieStore = await cookies(); 
  const token = cookieStore.get("token")?.value;

  const params = await searchParams || {};
  const page = params.page || 1;
  const sort = params.sort || "";
  const categoryId = params.categoryId || "";
  const minPrice = params.minPrice || "";
  const maxPrice = params.maxPrice || "";
  const color = params.color || ""; 
  const size = params.size || "";
  const isDiscounted = params.isDiscounted || "";
  const search = params.search || "";

  let url = `${baseUrl}/api/products?page=${page}`;

  if (sort) url += `&sort=${sort}`;
  if (categoryId) url += `&categoryId=${categoryId}`;
  if (minPrice) url += `&minPrice=${minPrice}`;
  if (maxPrice) url += `&maxPrice=${maxPrice}`;
  if (color) url += `&color=${color}`; 
  if (size) url += `&size=${size}`;
  if (isDiscounted) url += `&isDiscounted=${isDiscounted}`;
  if (search) url += `&search=${search}`;

  console.log("Server Component: Fetching URL:", url);
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  let products = [];
  let totalPages = 1;
  let totalProducts = 0;

  try {
    const res = await fetch(url, {
      headers,
      cache: "no-store", 
    });

    if (res.ok) {
      const data = await res.json();
      products = data.products;
      totalPages = data.totalPages;
      totalProducts = data.totalProducts;
      console.log("Server Component: Data fetched successfully. Total pages:", totalPages, "Current page from API:", data.currentPage);
    } else {
      console.error("Server Component: Fetch failed with status", res.status, await res.text());
    }
  } catch (err) {
    console.error("Server Component: Fetch error", err);
  }

  return (
    <Products
      
      key={JSON.stringify(params)}
      allProducts={products}
      totalProducts={totalProducts}
      totalProductsPages={totalPages}
    />
  );
}