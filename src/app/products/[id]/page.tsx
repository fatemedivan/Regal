"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import Breadcrumb from "@/components/breadCrumb/Breadcrumb";
import ProductCard from "@/components/productCard/ProductCard";
import { useBasketContext } from "@/context/BasketContext";

import "@glidejs/glide/dist/css/glide.core.min.css";
import Glide from "@glidejs/glide";
import { toast, ToastContainer } from "react-toastify";
import { HashLoader } from "react-spinners";
import getToken from "@/utils/getToken";
import { Product, RelatedProduct } from "./types";

export default function Page() {
  const router = useRouter();
  const glideRef = useRef(null);
  const { id } = useParams() as { id?: string };

  const token = getToken();
  const { addToCart } = useBasketContext();
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImgSrc, setCurrentImgSrc] = useState("");
  const [similarProducts, setSimilarProducts] = useState<RelatedProduct[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isExistProduct, setIsExistProduct] = useState(true);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [isLoadingSimilarProducts, setIsLoadingSimilarProducts] =
    useState(true);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    const getProduct = async () => {
      setIsLoadingProduct(true);
      try {
        const res = await fetch(`/api/products/${id}`, { headers });
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
          setCurrentImgSrc(data?.images?.[0] || "");
          setIsExistProduct(true);
          setSimilarProducts(data.relatedProducts ?? []);
          setIsLoadingSimilarProducts(false);
          setIsLiked(data.isLiked || false);
        } else if (res.status === 404 || res.status === 500) {
          setIsExistProduct(false);
        } else {
          toast.error("خطا در دریافت اطلاعات محصول");
          setIsExistProduct(false);
        }
      } catch (error) {
        console.error(error);
        toast.error("خطایی در ارتباط با سرور رخ داد.");
        setIsExistProduct(false);
      } finally {
        setIsLoadingProduct(false);
      }
    };
    getProduct();
  }, [id, token]);

  useEffect(() => {
    if (glideRef.current && similarProducts.length > 0) {
      const glide = new Glide(glideRef.current, {
        type: "carousel",
        perView: 4,
        gap: 12,
        direction: "rtl",
        peek: {
          before: 0,
          after: 0,
        },
        breakpoints: {
          1440: {
            perView: 3,
            gap: 24,
          },
          1240: {
            perView: 3,
            gap: 12,
          },
          1024: {
            perView: 4,
            gap: 12,
          },

          768: {
            perView: 3,
            gap: 12,
            peek: {
              before: 0,
              after: 50,
            },
          },
          590: {
            perView: 2.5,
            gap: 6,
            peek: {
              before: 0,
              after: 40,
            },
          },
          500: {
            perView: 2,
            gap: 4,
            peek: {
              before: 0,
              after: 0,
            },
          },
          380: {
            perView: 1.5,
            gap: 2,
            peek: {
              before: 0,
              after: 0,
            },
          },
        },
      });

      glide.mount();
      glideRef.current.glideInstance = glide;
      return () => glide.destroy();
    }
  }, [similarProducts]);

  const likeProduct = async () => {
    if (!token)
      return toast.warning("برای لایک کردن باید وارد حساب کاربری خود شوید.");
    try {
      const res = await fetch(`/api/products/${product.id}/like`, {
        method: "POST",
        headers,
      });
      if (res.ok) {
        setIsLiked(true);
        toast.success("محصول با موفقیت به علاقه‌مندی‌ها اضافه شد.");
      } else toast.error("عملیات لایک کردن ناموفق بود.");
    } catch (error) {
      console.error(error);
      toast.error("خطایی رخ داد، لطفا دوباره تلاش کنید.");
    }
  };

  const disLikeProduct = async () => {
    if (!token)
      return toast.warning("برای حذف از علاقه‌مندی‌ها باید وارد شوید.");
    try {
      const res = await fetch(`/api/products/${product.id}/like`, {
        method: "POST",
        headers,
      });
      if (res.ok) {
        setIsLiked(false);
        toast.info("محصول از علاقه‌مندی‌ها حذف شد.");
      } else toast.error("عملیات حذف از علاقه‌مندی‌ها ناموفق بود.");
    } catch (error) {
      console.error(error);
      toast.error("خطایی رخ داد، لطفا دوباره تلاش کنید.");
    }
  };

  const addProductToBasket = async () => {
    if (!token)
      return toast.warn(
        "برای اضافه کردن به سبد خرید باید وارد حساب کاربری شوید"
      );
    if (product.colors?.length > 0 && !selectedColor)
      return toast.warn("لطفا رنگ مورد نظر خود را انتخاب کنید.");
    if (product.sizes?.length > 0 && !selectedSize)
      return toast.warn("لطفا سایز مورد نظر خود را انتخاب کنید.");

    try {
      setIsAddingToCart(true);
      const res = await addToCart(product.id, 1, selectedColor, selectedSize);
      if (res) {
        router.push("/cart");
        setIsAddingToCart(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("خطایی رخ داد، دوباره تلاش کنید.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <>
      <ToastContainer autoClose={2000} className="custom-toast-container" />

      {isExistProduct ? (
        <>
          {product?.categoryName && (
            <Breadcrumb
              items={[{ label: product?.categoryName }, { label: product.name }]}
            />
          )}
          <div className="mx-auto px-5 container">
            {isLoadingProduct ? (
              <div className="flex flex-col justify-center items-center h-[60vh]">
                <HashLoader color="#b19276" size={80} />
              </div>
            ) : (
              <div className="lg:flex gap-6 my-12">
                <div className="flex flex-col gap-4 lg:flex-row-reverse lg:gap-6">
                  <div className="mt-6 lg:my-0">
                    {product.images && (
                      <Image
                        quality={100}
                        width={350}
                        height={525}
                        src={currentImgSrc}
                        alt={product.name || "Product Image"}
                        className="lg:max-w-136.5 lg:max-h-131.25"
                      />
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-6 lg:hidden">
                    {product.images?.map((img) => (
                      <Image
                        key={img}
                        width={64}
                        height={64}
                        src={img}
                        quality={100}
                        alt="Product thumbnail"
                        onClick={() => setCurrentImgSrc(img)}
                        className="rounded-lg cursor-pointer"
                      />
                    ))}
                  </div>

                  <div className="hidden lg:flex w-max flex-col gap-6 mb-6">
                    {product.images?.map((img) => (
                      <Image
                        key={img}
                        width={90}
                        height={84}
                        src={img}
                        quality={100}
                        alt="Product thumbnail"
                        onClick={() => setCurrentImgSrc(img)}
                        className="rounded-lg cursor-pointer"
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex w-full justify-between gap-1 items-center mb-1">
                    <h4 className="text-xl font-semibold leading-5.5 text-neutral-gray-13 lg:text-[27px] lg:font-bold lg:leading-8">
                      {product.name}
                    </h4>
                    <div className="flex justify-center items-center gap-2">
                      <div className="p-3 border border-cognac-tint-8 rounded-lg">
                        {isLiked ? (
                          <Image
                            onClick={disLikeProduct}
                            width={16}
                            height={16}
                            className="cursor-pointer"
                            src="/img/Favorite-icon-2.svg"
                            alt="Remove from favorites"
                            quality={100}
                          />
                        ) : (
                          <Image
                            onClick={likeProduct}
                            width={16}
                            height={16}
                            className="cursor-pointer"
                            src="/img/heart-2.svg"
                            alt="Add to favorites"
                            quality={100}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:flex items-center my-7">
                    {product.percentOff && (
                      <p className="line-through font-normal leading-7 text-neutral-gray-9">
                        {product.price?.toLocaleString()}
                      </p>
                    )}
                    <p className="text-xl leading-5.5 font-bold text-neutral-gray-13 mr-2">
                      {product.percentOff
                        ? product.discountedPrice?.toLocaleString()
                        : product.price?.toLocaleString()}{" "}
                      تومان
                    </p>
                  </div>

                  <p className="leading-6 text-sm text-neutral-gray-13 mt-4 mb-2 lg:hidden">
                    {product.description}
                  </p>
                  <p className="text-sm leading-6 text-neutral-gray-13 mt-4 mb-4 hidden lg:block">
                    {product.description}
                  </p>

                  <div className="mb-12">
                    <p className="text-sm leading-6 mb-1 text-black">
                      رنگ بندی:
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      {product.colors?.map((item) => (
                        <label
                          key={item.id}
                          className="relative cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="color"
                            className="hidden peer"
                            value={item.id}
                            onChange={() => setSelectedColor(item.id)}
                            checked={selectedColor === item.id}
                          />
                          <div
                            style={{ backgroundColor: item.hexCode }}
                            className="w-8 h-8 z-20 rounded-sm flex justify-center items-center relative before:content-[''] before:absolute before:w-1.5 before:h-2.5 before:border-r-2 before:border-b-2 before:border-white before:rotate-45 before:opacity-0 peer-checked:before:opacity-100"
                          ></div>
                          <div
                            style={{ borderColor: item.hexCode }}
                            className="absolute top-[-4px] left-[-4px] w-10 h-10 rounded-md border-2 opacity-0 peer-checked:opacity-100"
                          ></div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-12">
                    <p className="text-sm leading-6 mb-1 text-black">
                      سایزبندی:
                    </p>
                    <div className="flex items-center gap-2">
                      {product.sizes?.map((item) => (
                        <label
                          key={item.id}
                          className="relative cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="size"
                            className="hidden peer"
                            value={item.id}
                            onChange={() => setSelectedSize(item.id)}
                            checked={selectedSize === item.id}
                          />
                          <div className="w-8 h-8 text-neutral-gray-11 flex items-center justify-center rounded-sm border border-neutral-gray-4 peer-checked:bg-cognac-shade-4 peer-checked:text-white text-xs leading-4.5 pt-1">
                            {item.name}
                          </div>
                          <div className="absolute top-[-4px] left-[-4px] w-10 h-10 rounded-lg border-3 border-cognac-shade-4 opacity-0 peer-checked:opacity-100 transition-all"></div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={addProductToBasket}
                      disabled={isAddingToCart}
                      className="flex items-center bg-cognac-primery gap-2 rounded-lg h-12.5 w-40 justify-center cursor-pointer"
                    >
                      {!isAddingToCart && (
                        <img
                          className="hidden lg:block"
                          src="/img/shopping-cart-2.svg"
                          alt="Shopping cart icon"
                        />
                      )}

                      <p className="text-5.5 text-white">
                        {isAddingToCart ? (
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[0ms]"></div>
                            <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[150ms]"></div>
                            <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[300ms]"></div>
                          </div>
                        ) : (
                          "افزودن به سبد خرید"
                        )}
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {similarProducts.length !== 0 && (
              <div className="mb-16">
                <div className="mb-6 flex justify-between items-center lg:mb-10">
                  <h5 className="font-semibold leading-5 lg:text-30 lg:bold lg:leading-9.5">
                    محصولات مشابه
                  </h5>
                  <div className="flex items-center gap-2">
                    <div
                      className="p-3 border border-neutral-gray-8 rounded-lg cursor-pointer custom-prev"
                      onClick={() => glideRef.current?.glideInstance?.go("<")}
                    >
                      <Image
                        width={16}
                        height={16}
                        quality={100}
                        src="/img/arrow-right-3.svg"
                        alt="Previous slide"
                      />
                    </div>
                    <div
                      className="p-3 border border-neutral-gray-8 rounded-lg cursor-pointer custom-next"
                      onClick={() => glideRef.current?.glideInstance?.go(">")}
                    >
                      <Image
                        width={16}
                        height={16}
                        quality={100}
                        src="/img/arrow-left-4.svg"
                        alt="Next slide"
                      />
                    </div>
                  </div>
                </div>

                {isLoadingSimilarProducts ? (
                  <div className="flex flex-col justify-center items-center h-[60vh]">
                    <HashLoader color="#b19276" size={80} />
                  </div>
                ) : (
                  <div className="glide" ref={glideRef}>
                    <div className="glide__track" data-glide-el="track">
                      <ul className="glide__slides scroll-smooth">
                        {similarProducts.map((product) => (
                          <li key={product.id} className="glide__slide">
                            <ProductCard
                              img={product.img}
                              title={product.title}
                              finalPrice={product.finalPrice}
                              isMore={false}
                              colors={product.colors}
                              id={product.id}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="mt-35 mb-6 mx-5 lg:mb-33.75 lg:mt-26">
          <div className="flex justify-center items-center mb-55.5 lg:mb-8">
            <div>
              <Image
                width={180}
                height={162}
                className="lg:w-62.5 lg:h-56.5"
                src="/img/error-404.svg"
                alt="Error 404 - Page not found"
              />
              <p className="leading-7 text-neutral-gray-9 mt-6 text-center">
                محصول مورد نظر پیدا نشد!
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={() => router.back()}
              className="text-sm leading-5 bg-cognac-primery rounded-lg py-3.5 px-20 sm:px-30 text-white cursor-pointer lg:text-[1rem] lg:leading-5.5 lg:px-12"
            >
              بازگشت
            </button>
          </div>
        </div>
      )}
    </>
  );
}
