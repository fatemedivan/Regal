import { cookies } from "next/headers";

import Header from "./components/header/Header";
import Categories from "@/app/(home)/components/categories/Categories";
import { dynamicWithLoading } from "@/utils/dynamicWithLoading";
import {
  CustomizationSkeleton,
  DiscountedProductsSkeleton,
  KeyFeaturesSkeleton,
  ArticlesSkeleton,
} from "./components/HomeSkeleton";

const Customization = dynamicWithLoading(
  () => import("./components/Customization"),
  CustomizationSkeleton,
);
const DiscountedProducts = dynamicWithLoading(
  () => import("./components/discountedProducts/DiscountedProducts"),
  DiscountedProductsSkeleton,
);
const KeyFeatures = dynamicWithLoading(
  () => import("./components/KeyFeatures"),
  KeyFeaturesSkeleton,
);
const Articles = dynamicWithLoading(
  () => import("./components/articles/Articles"),
  ArticlesSkeleton,
);

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
