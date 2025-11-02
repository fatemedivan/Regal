"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HashLoader } from "react-spinners";
import "@glidejs/glide/dist/css/glide.core.min.css";
import Glide from "@glidejs/glide";
import ProductCard from "@/components/ProductCard";

export default function DiscountedProducts({ discountedProducts }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const glideRef = useRef(null);
  const prevbtnRef = useRef(null);
  const nextbtnRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    if (discountedProducts.length) {
      setProducts(discountedProducts);
      setIsLoading(false);
    }
  }, [discountedProducts]);

  useEffect(() => {
    if (glideRef.current) {
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

      return () => {
        glide.destroy();
      };
    }
  }, [products]);

  return (
    <section className="container mx-auto mt-17 mb-16 lg:mt-22">
      <div className="mx-5 mb-6 flex justify-between items-center lg:mx-12 lg:mb-10">
        <div className="flex items-center gap-2">
          <Image
            width={16}
            height={16}
            className="lg:w-8 lg:h-8"
            src="/img/discount-shape.svg"
            alt=""
            quality={100}
          />
          <h5 className="font-semibold leading-5 lg:text-30 lg:leading-9.5">
            محصولات تخفیف‌دار
          </h5>
        </div>
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
        <>
          <div className="flex flex-col justify-center items-center h-[60vh]">
            <HashLoader color="#b19276" size={80} />
            <p className="mt-5 text-xl font-extrabold text-cognac-shade-3 animate-pulse">
              ...Loading
            </p>
          </div>
        </>
      ) : (
        <div className="glide pr-5 lg:pr-12" ref={glideRef}>
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {products &&
                products.map((product, index) => (
                  <li key={product.id} className="glide__slide">
                    <ProductCard
                      id={product.id}
                      img={product.img}
                      title={product.title}
                      finalPrice={product.finalPrice}
                      price={product.price}
                      offPercent={product.offPercent}
                      isMore={false}
                      colors={product.colors}
                      favorites={product.isLiked}
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
