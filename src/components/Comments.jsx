"use client";
import React, { useEffect, useRef } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import CommentBox from "./CommentBox";

export default function Comments() {
  const glideRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  useEffect(() => {
    if (glideRef.current) {
      const glide = new Glide(glideRef.current, {
        type: "slider",
        perView: 1.2,
        gap: 16,
        direction: "rtl",
        peek: {
          before: 0,
          after: 50,
        },
        breakpoints: {
          768: {
            perView: 1,
          },
          1024: {
            perView: 2,
            gap: 24,
          },
          1440: {
            perView: 3,
            gap: 32,
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
    <section className="container max-w-full pr-5 py-16 lg:pr-38 lg:py-16 xl:pl-3 relative">
      <div className="mx-5 flex justify-between items-center gap-4 mb-6 lg:mb-10 lg:mr-0 lg:ml-12">
        <h5 className="font-semibold leading-5 text-black lg:text-30 lg:leading-9.5 lg:font-bold">
          رضایت شما
          <br />
          ارزشمندترین دارایی ماست
        </h5>
        <div className="flex items-center gap-2">
          <div
            className="p-3 border border-neutral-gray-4 rounded-lg cursor-pointer"
            ref={prevRef}
          >
            <img src="/img/arrow-right-2.svg" alt="" />
          </div>
          <div
            className="p-3 border border-neutral-gray-8 rounded-lg cursor-pointer"
            ref={nextRef}
          >
            <img src="/img/arrow-left-4.svg" alt="" />
          </div>
        </div>
      </div>

      <div className="glide" ref={glideRef}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            <li className="glide__slide lg:max-w-125">
              <CommentBox
                img={"/img/comment-1.svg"}
                name={"زهرا محمدی"}
                city={"تهران"}
                title={"سفارش راحت و بی‌دردسر"}
                desc={
                  "همه‌چیز دقیقاً همون‌طوری بود که تصور می‌کردم! از انتخاب پارچه گرفته تا جزئیات مدل، می‌شد همه چیز رو طبق سلیقه شخصی تنظیم کنم، خرید راحت و بدون استرسی بود."
                }
                rating={5}
              />
            </li>
            <li className="glide__slide lg:max-w-125">
              <CommentBox
                img={"/img/comment-2.svg"}
                name={"سیما پاشا"}
                city={"کرج"}
                title={"کیفیت، فراتر از انتظار"}
                desc={
                  "واقعاً از کیفیت لباس‌هایی که سفارش دادم جا خوردم! پارچه‌ها همون‌قدر که گفته بودن باکیفیت بود، دوختشون هم خیلی خوب بود. حس خوبیه که یه فروشگاه اینقدر به کیفیت اهمیت می‌ده."
                }
                rating={4}
              />
            </li>
            <li className="glide__slide lg:max-w-125">
              <CommentBox
                img={"/img/comment-3.svg"}
                name={"رها احمدی"}
                city={"کاشان"}
                title={"تحویل سریع"}
                desc={
                  "خرید کردم و خیلی سریع به دستم رسید! بسته‌بندی خوب و مرتب بود و لباس‌ها سالم و تمیز بودن. این سرعت تو تحویل خیلی بهم حس اطمینان می‌ده."
                }
                rating={5}
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
