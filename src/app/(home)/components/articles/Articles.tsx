"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import { articlesList } from "@/constants/articles";

export default function Articles() {
  const glideRef = useRef(null);

  useEffect(() => {
    if (glideRef.current) {
      const glide = new Glide(glideRef.current, {
        type: "carousel",
        perView: 3,
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
          1024: {
            perView: 2,
            gap: 24,
            peek: {
              before: 0,
              after: 50,
            },
          },
          640: {
            perView: 2,
            gap: 12,
            peek: {
              before: 0,
              after: 50,
            },
          },
          480: {
            perView: 1.5,
            gap: 12,
          },
        },
      });

      glide.mount();
    }
  }, []);

  return (
    <section className="bg-neutral-gray-1 py-8 pr-5 lg:px-12 lg:py-16">
      <div className="container mx-auto">
        <div className="flex justify-between items-center pl-5">
          <h5 className="font-semibold leading-5 text-black lg:text-30 lg:leading-9.5 lg:font-bold">
            مقالات مد و استایل زنانه
          </h5>
        </div>
        <div className="glide mt-6 lg:mt-8" ref={glideRef}>
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {articlesList.map((article) => (
                <li key={article.id} className="glide__slide">
                  <Link href={`/blog/${article.id}`}>
                    <Image
                      src={article.image}
                      width={432}
                      height={220}
                      className="rounded-tr-2xl rounded-tl-2xl"
                      alt={article.title}
                      quality={100}
                    />
                    <div className="mr-2 lg:mr-4">
                      <h6 className="text-sm font-semibold leading-4 text-neutral-gray-13 mt-3 mb-1 lg:text-lg lg:font-bold lg:leading-5.5 lg:mt-5 lg:mb-2">
                        {article.title}
                      </h6>
                      <p className="text-xs leading-4.5 text-neutral-gray-10 mb-1 max-w-60.5 line-clamp-2 lg:leading-6 lg:text-sm lg:max-w-100">
                        {article.description}
                      </p>
                      <p className="text-xs leading-4.5 text-neutral-gray-7 mb-2 lg:text-sm lg:leading-5">
                        {article.date}
                        <span className="mx-2">|</span>
                        {article.time}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {article.tags.map((tag, idx) => (
                          <div
                            key={idx}
                            className="bg-cognac-tint-1 text-cognac-shade-1 rounded-100 px-2 py-0.5 lg:px-3 lg:py-1"
                          >
                            <p className="text-xs leading-4.5">{tag}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
