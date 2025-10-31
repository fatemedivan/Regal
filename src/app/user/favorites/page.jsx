"use client";
import UserPannel from "@/app/user/components/UserPannel";
import FavouriteProduct from "@/app/user/favorites/components/FavouriteProduct";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import ProductSceleton from "@/components/ProductSceleton";
import getToken from "@/utils/getToken";

export default function Page() {
  const [isHadFavourite, setIsHadFavourite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const token = getToken();
  const [favoriteProductes, setFavoriteProductes] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      setIsHadFavourite(false);
      toast.info("برای مشاهده علاقه‌مندی‌ها، ابتدا وارد شوید.");
    }
  }, [token]);

  const getFavoriteProducts = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/user/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        toast.error("احراز هویت شما منقضی شده است. لطفا دوباره وارد شوید.");
        localStorage.removeItem("token");
        setFavoriteProductes([]);
        setIsHadFavourite(false);
        return;
      }

      if (res.ok) {
        const data = await res.json();
        setFavoriteProductes(data);
        setIsHadFavourite(data.length > 0);
      } else {
        toast.error("خطا در دریافت لیست علاقه‌مندی‌ها.");
        setFavoriteProductes([]);
        setIsHadFavourite(false);
      }
    } catch (error) {
      console.error("خطا در getFavoriteProducts:", error);
      toast.error("خطایی در ارتباط با سرور رخ داد.");
      setFavoriteProductes([]);
      setIsHadFavourite(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getFavoriteProducts();
    }
  }, [token]);

  const disLikeProduct = async (id) => {
    if (!token) {
      toast.error("برای انجام این عملیات، ابتدا وارد شوید.");
      return;
    }

    try {
      const res = await fetch(`/api/products/${id}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || "عملیات ناموفق بود.");
      } else {
        const successData = await res.json();
        toast.success(successData.message || "عملیات با موفقیت انجام شد.");
        getFavoriteProducts();
      }
    } catch (error) {
      console.error("خطا در disLikeProduct:", error);
      toast.error("خطایی رخ داد.");
    }
  };

  return (
    <>
      <ToastContainer autoClose={2000} className={"custom-toast-container"} />
      <div className="container mx-auto px-5 py-6 lg:hidden">
        <div className="flex justify-between items-center mb-8">
          <Image
            width={24}
            height={24}
            className="cursor-pointer"
            src="/img/arrow-right-6.svg"
            alt=""
            onClick={() => router.back()}
          />
          <p className="font-semibold text-xl leading-6 text-neutral-gray-13">
            لیست علاقه‌مندی‌ها
          </p>
          <div></div>
        </div>

        {isLoading ? (
          <div className="mt-4 flex items-center flex-wrap gap-4 lg:hidden">
            {[...Array(6)].map((_, index) => (
              <ProductSceleton key={index} />
            ))}
          </div>
        ) : isHadFavourite ? (
          <div className="flex flex-wrap gap-4">
            {favoriteProductes.map((product) => (
              <FavouriteProduct
                key={product.id}
                id={product.id}
                img={product.imageUrl || "/img/product-off-1.png"}
                title={product.name}
                finalPrice={product.discountedPrice || product.price}
                isMore={false}
                colors={
                  product.ProductColor && product.ProductColor.length > 0
                    ? product.ProductColor.map((item) => item.color)
                    : []
                }
                disLikeProduct={disLikeProduct}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-6 mt-28">
            <Image
              width={128}
              height={116}
              src="/img/order-not-found.svg"
              alt=""
            />
            <p className="text-sm leading-6 text-neutral-gray-9">
              شما در حال حاضر هیچ محصولی را به علاقه‌مندی‌ها اضافه نکرده‌اید!
            </p>
            <div className="mt-60 flex items-center justify-center">
              <Link href={"/products"}>
                <button className="bg-cognac-primery rounded-lg py-3.25 px-28.5 text-white leading-5.5 cursor-pointer">
                  مشاهده محصولات
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="hidden lg:block">
        <UserPannel rout={"favorites"}>
          {isLoading ? (
            <div className="mt-6 flex items-center flex-wrap gap-6">
              {[...Array(6)].map((_, index) => (
                <ProductSceleton key={index} />
              ))}
            </div>
          ) : isHadFavourite ? (
            <div className="w-full flex flex-wrap gap-4 my-6">
              {favoriteProductes.map((product) => (
                <FavouriteProduct
                  key={product.id}
                  id={product.id}
                  img={product.imageUrl || "/img/product-off-1.png"}
                  title={product.name}
                  finalPrice={product.discountedPrice || product.price}
                  isMore={false}
                  colors={
                    product.ProductColor && product.ProductColor.length > 0
                      ? product.ProductColor.map((item) => item.color)
                      : []
                  }
                  disLikeProduct={disLikeProduct}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-8 my-12.5">
              <Image
                width={128}
                height={116}
                src="/img/order-not-found.svg"
                alt=""
              />
              <p className="leading-7 text-neutral-gray-9">
                شما در حال حاضر هیچ محصولی را به علاقه‌مندی‌ها اضافه نکرده‌اید!
              </p>
              <Link href={"/products"}>
                <button className="bg-cognac-primery rounded-lg py-3.25 px-12 text-white leading-5.5 cursor-pointer">
                  مشاهده محصولات
                </button>
              </Link>
            </div>
          )}
        </UserPannel>
      </div>
    </>
  );
}
