"use client";
import React, { useEffect, useRef } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import ProductItemOff from "@/components/common/ProductItemOff";
import Image from "next/image";

export default function OffProducts() {
  const glideRef = useRef(null);
  const prevbtnRef = useRef(null);
  const nextbtnRef = useRef(null);

  useEffect(() => {
    if (glideRef.current) {
      const glide = new Glide(glideRef.current, {
        type: "carousel",
        perView: 4,
        gap: 12,
        direction: "rtl",
        peek:{
          before: 0,
          after: 0
        },
        breakpoints: {
          1440: {
            perView: 3,
            gap: 24,
            peek:{
              before:0,
              after:50
            }

          },
          1240: {
            perView: 2.5,
            gap: 12,
            peek:{
              before:0,
              after:50
            }
          },
          1024:{
            perView: 4,
            gap: 12,
            peek:{
              before:0,
              after:50
            }
          },
          
          768: {
            perView: 3,
            gap: 12,
            peek:{
              before:0,
              after:50
            }
          },
          580:{
            perView: 2,
            gap:6,
            peek: {
              before: 0,
              after: 40
            }
          },
          440:{
            perView: 1.5,
            gap:12,
            peek: {
              before: 0,
              after: 0
            }
          }
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
    <section className="mt-17 mb-16 lg:mt-22">
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

      <div className="glide pr-5 lg:pr-12" ref={glideRef}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            <li className="glide__slide">
              <ProductItemOff
                img={"/img/product-off-1.png"}
                title={"لباس میدی رایا"}
                finalPrice={"۳,۵۰۲,۰۰۰"}
                price={"۴,۱۲۰,۰۰۰"}
                offPercent={"۱۵"}
                isMore={false}
                colors={["#97AAB4", "#94999F", "#C2B1A5", "#F1AB90"]}
              />
            </li>
            <li className="glide__slide">
              <ProductItemOff
                img={"/img/product-off-2.png"}
                title={"لباس میدی فیال"}
                finalPrice={"۵,۰۲۲,۰۰۰"}
                price={"۵,۴۰۰,۰۰۰"}
                offPercent={"۷"}
                isMore={true}
                colors={["#94999F", "#C2B1A5", "#F1AB90"]}
              />
            </li>
            <li className="glide__slide">
              <ProductItemOff
                img={"/img/product-off-3.png"}
                title={"لباس میدی مدرن مارال"}
                finalPrice={"۳,۸۶۴,۰۰۰"}
                price={"۴,۲۰۰,۰۰۰"}
                offPercent={"۸"}
                isMore={true}
                colors={["#94999F", "#C2B1A5", "#F1AB90"]}
              />
            </li>
            <li className="glide__slide">
              <ProductItemOff
                img={"/img/product-off-4.png"}
                title={"لباس میدی تک شانه نولا"}
                finalPrice={"۳,۲۳۰,۰۰۰"}
                price={"۳,۸۰۰,۰۰۰"}
                offPercent={"۱۵"}
                isMore={false}
                colors={["#97AAB4", "#94999F", "#C2B1A5", "#F1AB90"]}
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
