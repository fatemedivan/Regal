"use client";
import Breadcrumb from "@/components/common/Breadcrumb";
import ProductItemOff from "@/components/common/ProductItemOff";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import { useParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { useBasketContext } from "@/context/BasketContext";
import { HashLoader } from "react-spinners";

export default function Page() {
  const router = useRouter();
  const glideRef = useRef(null);
  const prevbtnRef = useRef(null);
  const nextbtnRef = useRef(null);
  const { id } = useParams();

  const [token, setToken] = useState(null);
  const [product, setProduct] = useState({});
  const [currentImgSrc, setCurrentImgSrc] = useState("");
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isExistProduct, setIsExistProduct] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useBasketContext();
  //get token
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

  //get product
  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(`/api/products/${id}`, {
        headers: headers,
        cache: "no-store",
      });
      console.log(res);

      if (res.ok) {
        const data = await res.json();
        console.log(data);

        setProduct(data);
        setCurrentImgSrc(data?.images[1]);
        setIsExistProduct(true);
        setSimilarProducts(data.relatedProducts);
        if (data.isLiked) {
          setIsLiked(true);
        }
      }
      if (res.status === 404 || res.status === 500) {
        setIsExistProduct(false);
      }
    };
    getProduct();
  }, [token]);

  //handle sliders
  useEffect(() => {
    if (glideRef.current) {
      const glide = new Glide(glideRef.current, {
        type: "carousel",
        perView: 4,
        gap: 12,
        direction: "rtl",
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
            perView: 3,
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
          680: {
            perView: 2,
            gap: 12,
            peek: {
              before: 0,
              after: 50,
            },
          },
          440: {
            perView: 1.5,
            gap: 12,
          },
        },
      });

      glide.mount();

      glideRef.current.glideInstance = glide;

      return () => {
        glide.destroy();
      };
    }
  }, [similarProducts]);

  const likeProduct = async (id) => {
    console.log("token:", token);

    if (!token) {
      toast.warning("باید ابتدا ثبت نام کنید");
      return;
    } else {
      try {
        const res = await fetch(`/api/products/${id}/like`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          setIsLiked(true);
        } else {
          toast.error("ناموفق");
        }
      } catch (error) {
        console.log(error);
        toast.error("خطایی رخ داد");
      }
    }
  };

  const disLikeProduct = async (id) => {
    try {
      const res = await fetch(`/api/products/${id}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setIsLiked(false);
      } else {
        toast.error("ناموفق");
      }
    } catch (error) {
      console.log(error);
      toast.error("خطایی رخ داد");
    }
  };

  return (
    <>
      {isExistProduct ? (
        <>
          <ToastContainer
            autoClose={2000}
            className={"custom-toast-container"}
          />
          {product.categoryName && (
            <Breadcrumb
              items={[{ label: product.categoryName }, { label: product.name }]}
            />
          )}

          <div className="mx-auto px-5 container">
            <div className="lg:flex gap-6 my-12">
              <div className="flex flex-col gap-4 lg:flex-row-reverse lg:gap-6">
                <div className="mt-6 lg:my-0">
                  {product?.images && (
                    <Image
                      quality={100}
                      width={350}
                      height={353}
                      src={currentImgSrc}
                      alt=""
                      className="lg:min-w-136.5 lg:min-h-138"
                    />
                  )}
                </div>
                <div className="flex items-center gap-2 mb-6 lg:hidden">
                  {product?.images?.map((img) => (
                    <Image
                      onClick={() => setCurrentImgSrc(img)}
                      key={img}
                      width={64}
                      height={64}
                      src={img}
                      alt=""
                      className="rounded-lg cursor-pointer"
                    />
                  ))}
                </div>
                <div className="hidden lg:flex w-max flex-col gap-6 mb-6">
                  {product?.images?.map((img) => (
                    <Image
                      onClick={() => setCurrentImgSrc(img)}
                      key={img}
                      width={90}
                      height={84}
                      src={img}
                      alt=""
                      className="rounded-lg cursor-pointer"
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="flex justify-between gap-1 items-center mb-1">
                  <h4 className="text-xl font-semibold leading-5.5 text-neutral-gray-13 lg:text-[27px] lg:font-bold lg:leading-8">
                    {product.name}
                  </h4>
                  <div className="flex justify-center items-center gap-2">
                    <div className="p-3 border border-cognac-tint-8 rounded-lg">
                      {isLiked ? (
                        <Image
                          onClick={() => disLikeProduct(product.id)}
                          width={16}
                          height={16}
                          className="cursor-pointer"
                          src="/img/Favorite-icon-2.svg"
                          alt=""
                          quality={100}
                        />
                      ) : (
                        <Image
                          onClick={() => likeProduct(product.id)}
                          width={16}
                          height={16}
                          className="cursor-pointer"
                          src="/img/heart-2.svg"
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Image
                      width={16}
                      height={16}
                      src="/img/star-outline.svg"
                      alt=""
                      className="lg:w-5 lg:h-5"
                    />
                    <Image
                      width={16}
                      height={16}
                      className="lg:w-5 lg:h-5"
                      src="/img/star-fill.svg"
                      alt=""
                    />
                    <Image
                      width={16}
                      height={16}
                      className="lg:w-5 lg:h-5"
                      src="/img/star-fill.svg"
                      alt=""
                    />
                    <Image
                      width={16}
                      height={16}
                      className="lg:w-5 lg:h-5"
                      src="/img/star-fill.svg"
                      alt=""
                    />
                    <Image
                      width={16}
                      height={16}
                      className="lg:w-5 lg:h-5"
                      src="/img/star-fill.svg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="hidden lg:flex items-center my-7">
                  <p className="line-through font-normal leading-7 text-neutral-gray-9">
                    {product.percentOff}
                  </p>

                  <p className="text-xl leading-5.5 font-bold text-neutral-gray-13 mr-2">
                    {product.percentOff
                      ? product.discountedPrice
                      : product.price}{" "}
                    تومان
                  </p>
                </div>
                <p className="leading-6 text-sm text-neutral-gray-13 mt-4 mb-2 lg:hidden">
                  {product.description}
                </p>
                <p className="text-sm leading-6 text-neutral-gray-13 mt-4 mb-4 hidden lg:block">
                  {product.description}
                </p>
                <div className="mb-4 lg:mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Image
                      width={20}
                      height={20}
                      src="/img/WashingMachine.svg"
                      alt=""
                    />
                    <p className="text-xs leading-4.5 text-neutral-gray-11">
                      قابلیت شستشو: با ماشین لباسشویی یا دست
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <Image
                      width={20}
                      height={20}
                      src="/img/SealCheck.svg"
                      alt=""
                    />
                    <p className="text-xs leading-4.5 text-neutral-gray-11">
                      جنس پارچه: با کیفیت بالا و ضد چروک
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      width={20}
                      height={20}
                      src="/img/DropSlash.svg"
                      alt=""
                    />
                    <p className="text-xs leading-4.5 text-neutral-gray-11">
                      مقاومت در برابر آب
                    </p>
                  </div>
                </div>
                <div className="mb-4 lg:mb-6">
                  <p className="text-sm leading-6 mb-1 text-black">رنگ بندی:</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {product.colors &&
                      product.colors.map((item) => (
                        <label
                          key={item.name}
                          className="relative cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="color"
                            className="hidden peer"
                            defaultChecked
                          />
                          <div
                            style={{ backgroundColor: item.hexCode }}
                            className="w-8 h-8 z-20 rounded-sm  flex justify-center items-center relative before:content-[''] before:absolute before:w-1.5 before:h-2.5 before:border-r-2 before:border-b-2 before:border-white before:rotate-45 before:opacity-0 peer-checked:before:opacity-100"
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
                  <p className="text-sm leading-6 mb-1 text-black">سایزبندی:</p>
                  <div className="flex items-center gap-2">
                    {product.sizes &&
                      product.sizes.map((size, index) => (
                        <label key={index} className="relative cursor-pointer">
                          <input
                            type="radio"
                            name="size"
                            className="hidden peer"
                          />
                          <div className="w-8 h-8 text-neutral-gray-11 flex items-center justify-center rounded-sm border border-neutral-gray-4 peer-checked:bg-cognac-shade-4 peer-checked:text-white text-xs leading-4.5 pt-1">
                            {size}
                          </div>
                          <div
                            className={`absolute top-[-4px] left-[-4px] w-10 h-10 rounded-lg border-3 border-cognac-shade-4 opacity-0 peer-checked:opacity-100 transition-all`}
                          ></div>
                        </label>
                      ))}
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="flex items-center bg-cognac-primery gap-2 rounded-lg px-4 py-3.25 lg:px-10 xl:px-37 cursor-pointer"
                  >
                    <img
                      className="hidden lg:block"
                      src="/img/shopping-cart-2.svg"
                      alt=""
                    />
                    <p className="text-5.5 text-white">افزودن به سبد خرید</p>
                  </button>
                </div>
              </div>
            </div>
            {similarProducts.length !== 0 && (
              <div className="mb-16">
                <div className="mb-6 flex justify-between items-center lg:mb-10">
                  <h5 className="font-semibold leading-5 lg:text-30 lg:bold lg:leading-9.5">
                    محصولات مشابه
                  </h5>
                  <div className="flex items-center gap-2">
                    <div
                      className="p-3 border border-neutral-gray-8 rounded-lg cursor-pointer custom-prev"
                      ref={prevbtnRef}
                      onClick={() => glideRef.current?.glideInstance?.go("<")}
                    >
                      <Image
                        width={16}
                        height={16}
                        quality={100}
                        src="/img/arrow-right-3.svg"
                        alt=""
                      />
                    </div>
                    <div
                      className="p-3 border border-neutral-gray-8 rounded-lg cursor-pointer custom-next"
                      ref={nextbtnRef}
                      onClick={() => glideRef.current?.glideInstance?.go(">")}
                    >
                      <Image
                        width={16}
                        height={16}
                        quality={100}
                        src="/img/arrow-left-4.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                {isLoading ? (
                  <div className="flex flex-col justify-center items-center h-[60vh]">
                    <HashLoader color="#b19276" size={80} />
                    <p className="mt-5 text-xl font-extrabold text-cognac-shade-3 animate-pulse">
                      ...loading
                    </p>
                  </div>
                ) : (
                  <div className="glide" ref={glideRef}>
                    <div className="glide__track" data-glide-el="track">
                      <ul className="glide__slides scroll-smooth">
                        {similarProducts &&
                          similarProducts.map((product) => (
                            <li key={product.id} className="glide__slide">
                              <ProductItemOff
                                img={product.img}
                                title={product.name}
                                finalPrice={product.finalPrice}
                                isMore={false}
                                colors={product.color}
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
                alt=""
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
