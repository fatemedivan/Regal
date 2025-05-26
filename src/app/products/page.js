import Products from "@/components/products/Products";
import { cookies } from "next/headers";

export default async function Page({ searchParams }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = cookies().get("token")?.value;

  const search = searchParams?.search || "";
  const categoryId = searchParams?.categoryId || "";
  const orderBy = searchParams?.orderBy || "";
  const currentPage = searchParams?.page || 1;

  let products = [];
  let totalPages = null;
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
      console.log('data',data);
      
      products = data.products;
      totalPages = data.latestPage;
    }
  } catch (error) {
    console.error(error);
  }

  return <Products allProducts={products} totalProductsPages={totalPages} />;
}
