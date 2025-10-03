import { cookies } from "next/headers";
import { dynamicWithLoading } from "@/utils/dynamicWithLoading";
import Header from "./components/Header";
import Categories from "@/app/(home)/components/Categories";

const Customization = dynamicWithLoading(() => import("./components/Customization"));
const DiscountedProducts = dynamicWithLoading(() => import("./components/DiscountedProducts"));
const KeyFeatures = dynamicWithLoading(() => import("./components/KeyFeatures"));
const Articles = dynamicWithLoading(() => import("./components/Articles"));

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let discountedProducts = [];
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};

  try {
    const res = await fetch(`${baseUrl}/api/products/discounted`, {
      headers: headers,
      cache: "no-store",
    });

    discountedProducts = await res.json();
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <Header />
      <Categories />
      <Customization />
      <DiscountedProducts discountedProducts={discountedProducts} />
      <KeyFeatures />
      <Articles />
    </>
  );
}
