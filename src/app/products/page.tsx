import Products from "./components/products/Products";
import { cookies } from "next/headers";

export default async function Page({ searchParams }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(await searchParams)) {
    if (value) params.set(key, value as string);
  }
  let url = `${baseUrl}/api/products?${params.toString()}`;

  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  let products = [];
  let totalPages = 1;
  let totalProducts = 0;

  try {
    const res = await fetch(url, {
      headers
    });

    if (res.ok) {
      const data = await res.json();
      products = data.products;
      totalPages = data.totalPages;
      totalProducts = data.totalProducts;
    }
  } catch (err) {}

  return (
    <Products
      key={params.toString()}
      allProducts={products}
      totalProducts={totalProducts}
      totalProductsPages={totalPages}
    />
  );
}
