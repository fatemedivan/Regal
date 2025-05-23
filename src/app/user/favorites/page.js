"use client";
import UserPannel from "@/components/user/UserPannel";
import FavouriteProduct from "@/components/user/FavouriteProduct";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import ProductSceleton from "@/components/common/ProductSceleton";

export default function Page() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [isHadFavourite, setIsHadFavourite] = useState(true);
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOptionSort, setSelectedOptionSort] = useState("");
  const [token, setToken] = useState("");
  const [favoriteProductes, setFavoriteProductes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const getFavoriteProducts = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${baseUrl}/user/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 404) {
        setFavoriteProductes([]);
        setIsHadFavourite(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        if (data.length > 0) {
          setFavoriteProductes(data);
          setIsHadFavourite(true);
        } else {
          setIsHadFavourite(false);
        }
        console.log(data);
      }
    } catch (error) {
      toast.error("خطایی رخ داد");
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
    try {
      const res = await fetch(`${baseUrl}/products/${id}/favorite`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        toast.error("ناموفق");
      } else {
        getFavoriteProducts();
      }
    } catch (error) {
      console.log(error);
      toast.error("خطایی رخ داد");
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
        <div className="relative w-full mb-6">
          <button
            onClick={() => setIsOpenSort(!isOpenSort)}
            className="w-full border border-neutral-gray-4 rounded-lg py-5 pl-8 pr-6 text-right flex justify-between items-center cursor-pointer"
          >
            <p className="text-neutral-gray-7 text-xs leading-4.5">
              {selectedOptionSort || "مرتب سازی بر اساس"}
            </p>
            <Image
              src="/img/drop-down.svg"
              width={16}
              height={16}
              alt="dropdown icon"
              className={`absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none transition ${
                isOpenSort && "rotate-180"
              }`}
            />
          </button>

          {isOpenSort && (
            <ul className="absolute w-full z-20 bg-white border border-neutral-gray-4 mt-1 rounded-lg shadow-lg text-sm">
              {["جدیدترین", "قدیمی‌ترین", "ارزان‌ترین", "گران‌ترین"].map(
                (option) => (
                  <li
                    key={option}
                    onClick={() => {
                      setSelectedOptionSort(option);
                      setIsOpenSort(false);
                    }}
                    className="px-4 py-2 hover:bg-neutral-gray-2 cursor-pointer text-xs leading-4.5 text-neutral-gray-7"
                  >
                    {option}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
        {isHadFavourite ? (
          <div>
            {isLoading ? (
              <div className="mt-4 flex items-center flex-wrap gap-4 lg:hidden">
                {favoriteProductes.map((product) => (
                  <ProductSceleton key={product.id} />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-4">
                {favoriteProductes &&
                  favoriteProductes.map((product) => (
                    <FavouriteProduct
                      key={product.id}
                      id={product.id}
                      img={"/img/product-off-1.png"}
                      title={product.title}
                      finalPrice={product.latestPrice}
                      isMore={false}
                      colors={product.ProductColor.map((item) => item.color)}
                      disLikeProduct={disLikeProduct}
                    />
                  ))}
              </div>
            )}
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
              <Link href={"/"}>
                <button className="bg-cognac-primery rounded-lg py-3.25 px-28.5 text-white leading-5.5 cursor-pointer">
                  برو به صفحه اصلی
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="hidden lg:block">
        <UserPannel rout={"favorites"}>
          {isHadFavourite ? (
            <div>
              {isLoading ? (
                <div className="mt-6 flex items-center flex-wrap gap-6">
                  {favoriteProductes.map((product) => (
                    <ProductSceleton key={product.id} />
                  ))}
                </div>
              ) : (
                <div className="w-full flex flex-wrap gap-4 my-6">
                  {favoriteProductes &&
                    favoriteProductes.map((product) => (
                      <FavouriteProduct
                        key={product.id}
                        id={product.id}
                        img={"/img/product-off-1.png"}
                        title={product.title}
                        finalPrice={product.lastPrice}
                        isMore={false}
                        colors={product.ProductColor.map((item) => item.color)}
                        disLikeProduct={disLikeProduct}
                      />
                    ))}
                </div>
              )}
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
              <Link href={"/"}>
                <button className="bg-cognac-primery rounded-lg py-3.25 px-12 text-white leading-5.5 cursor-pointer">
                  برو به صفحه اصلی
                </button>
              </Link>
            </div>
          )}
        </UserPannel>
      </div>
    </>
  );
}
