"use client";
import React, { useEffect, useRef } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import ProductItemOff from "./ProductItemOff";
import Image from "next/image";

export default function OffProducts() {
  const glideRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    if (glideRef.current) {
      const glide = new Glide(glideRef.current, {
        type: "carousel",
        perView: 4,
        gap: 12,
        direction: "rtl",
        breakpoints: {
          1440: {
            perView: 4,
            gap: 24,
          },
          1024: {
            perView: 4,
            gap: 24,
          },
          768: {
            perView: 4,
            gap: 12,
          },
        },
      });

      glide.mount();

      if (prevRef.current && nextRef.current) {
        prevRef.current.addEventListener("click", () => glide.go("<"));
        nextRef.current.addEventListener("click", () => glide.go(">"));
      }

      return () => {
        if (prevRef.current && nextRef.current) {
          prevRef.current.removeEventListener("click", () => glide.go("<"));
          nextRef.current.removeEventListener("click", () => glide.go(">"));
        }
      };
    }
  }, []);

  return (
    <section className="container max-w-full mt-17 mb-16 lg:mt-22">
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
            ref={prevRef}
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
            ref={nextRef}
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

      <div className="glide pr-5 lg:pr-12" ref={glideRef}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            <li className="glide__slide min-w-41.75 lg:min-w-79.5">
              <ProductItemOff
                img={"/img/product-off-1.png"}
                title={"لباس میدی رایا"}
                finalPrice={"۳,۵۰۲,۰۰۰"}
                price={"۴,۱۲۰,۰۰۰"}
                offPercent={"۱۵"}
                isMore={false}
                colors={['#97AAB4','#94999F','#C2B1A5','#F1AB90']}
              />
            </li>
            <li className="glide__slide min-w-41.75 lg:min-w-79.5">
              <ProductItemOff
                img={"/img/product-off-2.png"}
                title={"لباس میدی فیال"}
                finalPrice={"۵,۰۲۲,۰۰۰"}
                price={"۵,۴۰۰,۰۰۰"}
                offPercent={"۷"}
                isMore={true}
                colors={['#94999F','#C2B1A5','#F1AB90']}
              />
            </li>
            <li className="glide__slide min-w-41.75 lg:min-w-79.5">
              <ProductItemOff
                img={"/img/product-off-3.png"}
                title={"لباس میدی مدرن مارال"}
                finalPrice={"۳,۸۶۴,۰۰۰"}
                price={"۴,۲۰۰,۰۰۰"}
                offPercent={"۸"}
                isMore={true}
                colors={['#94999F','#C2B1A5','#F1AB90']}
              />
            </li>
            <li className="glide__slide min-w-41.75 lg:min-w-79.5">
              <ProductItemOff
                img={"/img/product-off-4.png"}
                title={"لباس میدی تک شانه نولا"}
                finalPrice={"۳,۲۳۰,۰۰۰"}
                price={"۳,۸۰۰,۰۰۰"}
                offPercent={"۱۵"}
                isMore={false}
                colors={['#97AAB4','#94999F','#C2B1A5','#F1AB90']}
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
