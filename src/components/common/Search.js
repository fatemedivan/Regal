"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import ProductSearchItem from "./ProductSearchItem";
import { useRouter } from "next/navigation";
import { useScrollLockContext } from "@/context/ScrollLockContext";
import { HashLoader } from "react-spinners";

export default function Search({ handleCloseSearch }) {
  const router = useRouter();
  const glideRef = useRef(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [token, setToken] = useState(null);
  const [searchProducts, setSearchProducts] = useState([]);
  const [isEmptySearch, setIsEmptySearch] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { closeModal } = useScrollLockContext();
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};

  const getProductsBySearch = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/products?search=${searchText}`, {
        headers: headers,
      });
      console.log(res);
      if (res.ok) {
        const data = await res.json();
        if (data.products.length) {
          setSearchProducts(data.products);
          console.log(data);
          setIsNotFound(false);
        }
      }
      if (res.status === 404) {
        setSearchProducts([]);
        setIsNotFound(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div
        className="fixed inset-0 bg-[#1E1E1E] opacity-50 z-40"
        onClick={() => handleCloseSearch()}
      />

      <div className="py-6 absolute top-21 left-0 right-0 z-50 w-full bg-white">
        <div className="container mx-auto">
          <div
            className={`relative mx-5 mb-6 px-4 py-3.75 flex items-center gap-1 rounded-lg border lg:mx-40.5 ${
              isSearching ? "border-neutral-gray-11" : "border-neutral-gray-4"
            }`}
          >
            <div
              className={`absolute -top-0.5 right-3 px-1 bg-white ${
                isSearching ? "block" : "hidden"
              } -translate-y-1/2`}
            >
              <span className="text-xs leading-5 text-neutral-gray-10">
                جستجو
              </span>
            </div>

            <Image
              width={16}
              height={16}
              src="/img/search-normal-2.svg"
              alt=""
            />
            <input
              type="text"
              placeholder="محصول مورد نظر خود را جستجو کنید..."
              className="placeholder:text-neutral-gray-7 w-full outline-none"
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              onKeyDown={(e) => {
                e.key === "Enter" && getProductsBySearch();
                setIsSearching(true);

                e.target.value
                  ? setIsEmptySearch(false)
                  : setIsEmptySearch(true);
              }}
              onFocus={() => setIsSearching(true)}
              value={searchText}
            />
            {isSearching && searchText !== "" && (
              <Image
                onClick={() => {
                  setIsSearching(false);
                  setSearchText("");
                  setIsEmptySearch(true);
                }}
                width={16}
                height={16}
                className="hidden lg:block cursor-pointer"
                src="/img/close-search.svg"
                alt=""
              />
            )}
          </div>

          {isSearching && searchText && searchProducts.length !== 0  && !isNotFound ? (
            <div className="mr-5 border-b border-b-neutral-gray-4 pb-6 lg:hidden">
              <p className="text-neutral-gray-13 mb-2 text-sm leading-6 lg:text-[1rem] lg:leading-7 lg:mb-5.5">
                پیشنهادات
              </p>
              <ul>
                {searchProducts.slice(0, 4).map((product) => (
                  <li key={product.id} className="mb-2 text-xs leading-4.5">
                    {product.name}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <p className="text-neutral-gray-13 text-sm leading-6 mb-4 mr-5 lg:mr-40.5 lg:text-[1rem] lg:leading-7">
                جستجوهای پرطرفدار
              </p>
              <div className="flex items-center flex-wrap gap-2 border-b border-b-neutral-gray-4 pb-7.5 lg:pb-6 mx-5 lg:mx-40.5">
                <div className="px-2 py-1 bg-neutral-gray-2 rounded-100 flex items-center justify-center gap-2 lg:px-3 lg:py-2">
                  <p className="text-neutral-gray-11 text-xs leading-5">
                    دخترانه
                  </p>
                  <Image
                    width={12}
                    height={12}
                    src="/img/arrow-left-3.svg"
                    alt=""
                  />
                </div>
                <div className="px-2 py-1 bg-neutral-gray-2 rounded-100 flex items-center justify-center gap-2 lg:px-3 lg:py-2">
                  <p className="text-neutral-gray-11 text-xs leading-5">
                    لباس شب
                  </p>
                  <Image
                    width={12}
                    height={12}
                    src="/img/arrow-left-3.svg"
                    alt=""
                  />
                </div>
                <div className="px-2 py-1 bg-neutral-gray-2 rounded-100 flex items-center justify-center gap-2 lg:px-3 lg:py-2">
                  <p className="text-neutral-gray-11 text-xs leading-5">
                    لباس مجلسی
                  </p>
                  <Image
                    width={12}
                    height={12}
                    src="/img/arrow-left-3.svg"
                    alt=""
                  />
                </div>
                <div className="px-2 py-1 bg-neutral-gray-2 rounded-100 flex items-center justify-center gap-2 lg:px-3 lg:py-2">
                  <p className="text-neutral-gray-11 text-xs leading-5">دامن</p>
                  <Image
                    width={12}
                    height={12}
                    src="/img/arrow-left-3.svg"
                    alt=""
                  />
                </div>
                <div className="px-2 py-1 bg-neutral-gray-2 rounded-100 flex items-center justify-center gap-2 lg:px-3 lg:py-2">
                  <p className="text-neutral-gray-11 text-xs leading-5">
                    سرهمی
                  </p>
                  <Image
                    width={12}
                    height={12}
                    src="/img/arrow-left-3.svg"
                    alt=""
                  />
                </div>
                <div className="px-2 py-1 bg-neutral-gray-2 rounded-100 flex items-center justify-center gap-2 lg:px-3 lg:py-2">
                  <p className="text-neutral-gray-11 text-xs leading-5">
                    کت و شلوار
                  </p>
                  <Image
                    width={12}
                    height={12}
                    src="/img/arrow-left-3.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          )}
          <div
            className={`${
              searchText && "flex justify-between"
            } pr-5 lg:px-40.5`}
          >
            {isSearching && searchText&& searchProducts.length !== 0 && !isNotFound && (
              <div className="hidden lg:block min-w-38.5 lg:ml-18.5 mt-6">
                <p className="text-neutral-gray-13 mb-2 text-sm leading-6 lg:text-[1rem] lg:leading-7 lg:mb-5.5">
                  پیشنهادات
                </p>
                <ul>
                  {searchProducts.slice(0, 4).map((product) => (
                    <li key={product.id} className="mb-2 text-xs leading-4.5">
                      {product.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div
              className={`${
                searchText && "lg:max-w-120 xl:max-w-180 2xl:max-w-222"
              } max-w-full`}
            >
              {!isNotFound && (
                <div className="mt-6 mb-4 flex justify-between items-center">
                  {isSearching && searchText && searchProducts.length !== 0 && (
                    <p className="text-neutral-gray-13 text-sm leading-6">
                      نمایش از {searchProducts.length} نتیجه
                    </p>
                  )}
                  {searchProducts.length !== 0 && searchText && (
                    <div
                      onClick={() => {
                        if (searchText) {
                          router.push(`/products?search=${searchText}&page=1`);
                        } else {
                          router.push("/products");
                        }
                        handleCloseSearch();
                        closeModal();
                      }}
                      className="text-neutral-gray-11 text-sm leading-5 flex items-center gap-2 px-4 cursor-pointer"
                    >
                      <p>مشاهده همه</p>
                      <Image
                        className="hidden lg:block cursor-pointer"
                        width={16}
                        height={16}
                        src="/img/arrow-left-4.svg"
                        alt=""
                      />
                    </div>
                  )}
                </div>
              )}

              {isNotFound && searchText && (
                <p className="text-neutral-gray-13 text-sm leading-6 mt-2">
                  محصولی یافت نشد
                </p>
              )}

              {isSearching && searchText && (
                <div className="flex items-center flex-wrap gap-3">
                  {searchProducts.slice(0, 4).map((product) => (
                    <div key={product.id}>
                      <ProductSearchItem
                        handleCloseSearch={handleCloseSearch}
                        isMore={false}
                        id={product.id}
                        img={product.images[0]?.imageUrl}
                        offPercent={product.offPercent}
                        title={product.name}
                        price={product.price}
                        finalPrice={product.discountedPrice}
                        colors={product.productColors.map(
                          (pc) => pc.color.hexCode
                        )}
                        favorites={product.isLiked}
                      />
                    </div>
                  ))}
                </div>
              )}
              {isLoading ? (
                <div>
                  <div className="flex flex-col justify-center items-center h-[60vh]">
                    <HashLoader color="#b19276" size={80} />
                    <p className="mt-5 text-xl font-extrabold text-cognac-shade-3 animate-pulse">
                      ...loading
                    </p>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
