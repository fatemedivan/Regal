import Products from "@/components/products/Products";
import { cookies } from "next/headers";

export default async function Page({ searchParams }) {
  const baseUrl = process.NEXT_PUBLIC_API_BASE_URL;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const params = await searchParams;
  const search = params?.search || "";
  const categoryId = params?.categoryId || "";
  const orderBy = params?.orderBy || "";
  const currentPage = params?.page || 1;

  let products = [];
  let totalPages = null;
  let totalProducts = null
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};

  try {
    let url = `${baseUrl}/products?page=${currentPage}`;
    if (search) url += `&search=${search}`;
    if (categoryId) url += `&categoryId=${categoryId}`;
    if (orderBy) url += `&orderBy=${orderBy}`;

    const res = await fetch(url, {
      headers: headers,
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      console.log("data", data);

      products = data.products;
      totalPages = data.totalPages;
      totalProducts = data.totalProducts;
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <Products
      allProducts={products}
      totalProducts={totalProducts}
      totalProductsPages={totalPages}
    />
  );
}
