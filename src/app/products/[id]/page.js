"use client";
import Breadcrumb from "@/components/common/Breadcrumb";
import ProductItemOff from "@/components/common/ProductItemOff";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import { useParams } from "next/navigation";

export default function Page() {
  const sizes = ["XS", "S", "M", "L", "XL", "2XL"];
  const glideRef = useRef(null);
  const prevbtnRef = useRef(null);
  const nextbtnRef = useRef(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [currentImgSrc, setCurrentImgSrc] = useState("");
  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(`${baseUrl}/products/${id}`);
      console.log(res);
      const data = await res.json();
      setProduct(data);
      setCurrentImgSrc(data?.images?.[0]?.src);
      console.log(data);
    };
    getProduct();
  }, []);

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
      //AI
      glideRef.current.glideInstance = glide;

      return () => {
        glide.destroy();
      };
    }
  }, []);

  return (
    <>
      {product.category?.name && (
        <Breadcrumb
          items={[
            { label: "صفحه اصلی" },
            { label: "دسته‌بندی محصولات" },
            { label: product.category.name },
            { label: product.title }, // یا عنوان محصول
          ]}
        />
      )}
      <div className="mx-auto px-5 container">
        <div className="lg:flex gap-6 my-12">
          <div className="flex flex-col gap-4 lg:flex-row-reverse lg:gap-6">
            <div className="relative mt-6 lg:my-0">
              {product?.images?.[0]?.src && (
                <Image
                  quality={100}
                  width={350}
                  height={353}
                  src={currentImgSrc}
                  alt=""
                  className="lg:min-w-136.5 lg:min-h-138"
                />
              )}
              <div className="absolute top-4 lg:top-6 lg:right-6 right-4 z-20 p-2 lg:p-2.5 rounded-lg flex justify-center items-center bg-[rgba(247,247,248,0.3)] cursor-pointer">
                <Image
                  width={16}
                  height={16}
                  src="/img/search-zoom-in.svg"
                  alt=""
                />
              </div>
            </div>
            <div className="flex items-center gap-2 mb-6 lg:hidden">
              {product?.images?.map((img) => (
                <Image
                  onClick={() => setCurrentImgSrc(img?.src)}
                  key={img.id}
                  width={64}
                  height={64}
                  src={img?.src}
                  alt=""
                  className="rounded-lg cursor-pointer"
                />
              ))}
            </div>
            <div className="hidden lg:flex w-max flex-col gap-6 mb-6">
              {product?.images?.map((img) => (
                <Image
                  onClick={() => setCurrentImgSrc(img?.src)}
                  key={img.id}
                  width={90}
                  height={84}
                  src={img?.src}
                  alt=""
                  className="rounded-lg cursor-pointer"
                />
              ))}
            </div>
          </div>
          <div>
            <div className="flex justify-between gap-1 items-center mb-1">
              <h4 className="text-xl font-semibold leading-5.5 text-neutral-gray-13 lg:text-[27px] lg:font-bold lg:leading-8">
                {product.title}
              </h4>
              <div className="flex justify-center items-center gap-2">
                <div className="p-3 border border-cognac-tint-8 rounded-lg cursor-pointer">
                  <Image width={16} height={16} src="/img/share.svg" alt="" />
                </div>
                <div className="p-3 border border-cognac-tint-8 rounded-lg cursor-pointer">
                  <Image width={16} height={16} src="/img/heart-2.svg" alt="" />
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
              <p className="text-sm leading-5 text-neutral-gray-11 lg:text-[1rem] lg:leading-7">
                ({product._count?.View} بازدید)
              </p>
            </div>
            <div className="hidden lg:flex items-center my-7">
              <p className="line-through font-normal leading-7 text-neutral-gray-9">
                {product.latestPrice &&
                  Math.round(
                    product.latestPrice / (1 - product.discount / 100)
                  )}
              </p>

              <p className="text-xl leading-5.5 font-bold text-neutral-gray-13 mr-2">
                {product.latestPrice} تومان
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
                <Image width={20} height={20} src="/img/SealCheck.svg" alt="" />
                <p className="text-xs leading-4.5 text-neutral-gray-11">
                  جنس پارچه: با کیفیت بالا و ضد چروک
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Image width={20} height={20} src="/img/DropSlash.svg" alt="" />
                <p className="text-xs leading-4.5 text-neutral-gray-11">
                  مقاومت در برابر آب
                </p>
              </div>
            </div>
            <div className="mb-4 lg:mb-6">
              <p className="text-sm leading-6 mb-1 text-black">رنگ بندی:</p>
              <div className="flex items-center gap-2">
                {product.ProductColor &&
                  product.ProductColor.map((item) => (
                    <label key={item.id} className="relative cursor-pointer">
                      <input
                        type="radio"
                        name="color"
                        className="hidden peer"
                        defaultChecked
                      />
                      <div
                        style={{ backgroundColor: item.color }}
                        className="w-8 h-8 z-20 rounded-sm  flex justify-center items-center relative before:content-[''] before:absolute before:w-1.5 before:h-2.5 before:border-r-2 before:border-b-2 before:border-white before:rotate-45 before:opacity-0 peer-checked:before:opacity-100"
                      ></div>
                      <div
                        style={{ borderColor: item.color }}
                        className="absolute top-[-4px] left-[-4px] w-10 h-10 rounded-md border-2 opacity-0 peer-checked:opacity-100"
                      ></div>
                    </label>
                  ))}
              </div>
            </div>
            <div className="mb-12">
              <p className="text-sm leading-6 mb-1 text-black">سایزبندی:</p>
              <div className="flex items-center gap-2">
                {sizes.map((size, index) => (
                  <label key={index} className="relative cursor-pointer">
                    <input type="radio" name="size" className="hidden peer" />
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
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 border border-cognac-primery rounded-lg px-4 py-3.25 xl:px-6 cursor-pointer">
                <img className="hidden lg:block" src="/img/check.svg" alt="" />
                <p className="text-5.5 text-cognac-primery">مقایسه محصول</p>
              </button>
              <button className="flex items-center bg-cognac-primery gap-2 rounded-lg px-4 py-3.25 lg:px-10 xl:px-37 cursor-pointer">
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

        <div className="mb-16">
          <div className="mb-6 flex justify-between items-center lg:mb-10">
            <h5 className="font-semibold leading-5 lg:text-30 lg:bold lg:leading-9.5">
              محصولات مشابه
            </h5>
            <div className="flex items-center gap-2">
              <div
                className="p-3 border border-neutral-gray-8 rounded-lg cursor-pointer custom-prev"
                ref={prevbtnRef}
                //AI
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
                //AI
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

          <div className="glide" ref={glideRef}>
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides scroll-smooth">
                <li className="glide__slide">
                  <ProductItemOff
                    img={"/img/product-off-1.png"}
                    title={"لباس میدی رایا"}
                    finalPrice={"۳,۵۰۲,۰۰۰"}
                    isMore={false}
                    colors={["#97AAB4", "#94999F", "#C2B1A5", "#F1AB90"]}
                    id={1}
                  />
                </li>
                <li className="glide__slide">
                  <ProductItemOff
                    img={"/img/product-off-2.png"}
                    title={"لباس میدی فیال"}
                    finalPrice={"۵,۰۲۲,۰۰۰"}
                    isMore={false}
                    colors={["#97AAB4", "#94999F", "#C2B1A5", "#F1AB90"]}
                    id={2}
                  />
                </li>
                <li className="glide__slide">
                  <ProductItemOff
                    img={"/img/product-off-3.png"}
                    title={"لباس میدی مدرن مارال"}
                    finalPrice={"۳,۸۶۴,۰۰۰"}
                    isMore={false}
                    colors={["#97AAB4", "#94999F", "#C2B1A5", "#F1AB90"]}
                    id={3}
                  />
                </li>
                <li className="glide__slide">
                  <ProductItemOff
                    img={"/img/product-off-4.png"}
                    title={"لباس میدی تک شانه نولا"}
                    finalPrice={"۳,۲۳۰,۰۰۰"}
                    isMore={false}
                    colors={["#97AAB4", "#94999F", "#C2B1A5", "#F1AB90"]}
                    id={4}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
