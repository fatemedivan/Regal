"use client";
import { useEffect, useRef } from "react";
import "@glidejs/glide/dist/css/glide.core.min.css";
import Image from "next/image";
import Glide from "@glidejs/glide";

export default function Articles() {
  const glideRef = useRef(null);

  useEffect(() => {
    if (glideRef.current) {
      new Glide(glideRef.current, {
        type: "carousel",
        startAt: 0,
        perView: 2,
        gap: 12,
        direction: "rtl",
        peek: {
          before: 0,
          after: 50,
        },
        breakpoints: {
          680: {
            perView: 2,
            gap: 12,
          },
          1024: {
            perView: 3,
            gap: 24,
          },
          1440: {
            perView: 3,
            gap: 24,
          },
        },
        touchRatio: 1,
        dragRatio: 1,
      }).mount();
    }
  }, []);

  return (
    <section className="container max-w-full py-8 mt-16 lg:py-16 lg:mt-22">
      <div className="mx-5 flex justify-between items-center lg:mx-12">
        <h5 className="font-semibold leading-5 text-black lg:text-30 lg:leading-9.5 lg:font-bold">
          مقالات مد و استایل زنانه
        </h5>
        <div className="flex justify-center items-center gap-2">
          <a href="" className="text-sm leading-5 text-neutral-gray-11">
            مشاهده همه
          </a>
          <Image
            className="hidden lg:block cursor-pointer"
            src="/img/arrow-left-4.svg"
            alt=""
            width={16}
            height={16}
          />
        </div>
      </div>
      <div className="glide mt-6 pr-4 lg:mt-8 lg:px-12" ref={glideRef}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            <li className="glide__slide lg:max-w-108 lg:min-w-108">
              <Image
                src={"/img/article-1.svg"}
                width={432}
                height={220}
                className="rounded-tr-2xl rounded-tl-2xl"
                layout="responsive"
                alt="article"
              />
              <div className="mr-2 lg:mr-4">
                <h6 className="text-sm font-semibold leading-4 text-neutral-gray-13 mt-3 mb-1 lg:text-lg lg:font-bold lg:leading-5.5 lg:mt-5 lg:mb-2">
                  انتخاب لباس‌های زنانه در هر فصل
                </h6>
                <p className="text-xs leading-4.5 text-neutral-gray-10 mb-1 max-w-60.5 line-clamp-2 lg:leading-6 lg:text-sm lg:max-w-100">
                  در تابستان از پارچه‌های نخی و سبک استفاده کنید که نفس‌گیر
                  هستند و در زمستان از پارچه‌های گرم مانند پشم و مخمل که گرمای
                  بدن را حفظ می‌کنند.
                </p>
                <p className="text-xs leading-4.5 text-neutral-gray-7 mb-2 lg:text-sm lg:leading-5">
                  ۱۴ شهریور<span className="mx-2">|</span>۱۰ دقیقه
                </p>
                <div className="flex items-center gap-2">
                  <div className="bg-cognac-tint-1 text-cognac-shade-1 rounded-100 px-2 py-0.5">
                    <p className="text-xs leading-4.5 lg:px-3 lg:py-1">
                      استایل
                    </p>
                  </div>
                  <div className="bg-cognac-tint-1 text-cognac-shade-1 rounded-100 px-2 py-0.5 lg:px-3 lg:py-1">
                    <p className="text-xs leading-4.5 lg:px-3 lg:py-1">
                      انتخاب پارچه
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="glide__slide lg:max-w-108 lg:min-w-108">
              <Image
                src={"/img/article-2.svg"}
                width={432}
                height={220}
                className="rounded-tr-2xl rounded-tl-2xl"
                layout="responsive"
                alt="article"
              />
              <div className="mr-2 lg:mr-4">
                <h6 className="text-sm font-semibold leading-4 text-neutral-gray-13 mt-3 mb-1 lg:text-lg lg:font-bold lg:leading-5.5 lg:mt-5 lg:mb-2">
                  جدیدترین ترندهای دنیای مد
                </h6>
                <p className="text-xs leading-4.5 text-neutral-gray-10 mb-1 max-w-60.5 line-clamp-2 lg:leading-6 lg:text-sm lg:max-w-100">
                  سال جدید، سبک‌های جدیدی به همراه دارد. در این مقاله، نگاهی به
                  ترندهای برتر دنیای مد در سال 2024 انداخته و نحوه تطبیق آن‌ها
                  با استایل شخصی خود را بررسی کنید.
                </p>
                <p className="text-xs leading-4.5 text-neutral-gray-7 mb-2 lg:text-sm lg:leading-5">
                  ۱۴ شهریور<span className="mx-2">|</span>۱۰ دقیقه
                </p>
                <div className="flex items-center gap-2">
                  <div className="bg-cognac-tint-1 text-cognac-shade-1 rounded-100 px-2 py-0.5">
                    <p className="text-xs leading-4.5 lg:px-3 lg:py-1">
                      ترندهای طراحی
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="glide__slide lg:max-w-108 lg:min-w-108">
              <Image
                src={"/img/article-3.svg"}
                width={432}
                height={220}
                className="rounded-tr-2xl rounded-tl-2xl w-932 h-720"
                layout="responsive"
                alt="article"
              />
              <div className="mr-2 lg:mr-4">
                <h6 className="text-sm font-semibold leading-4 text-neutral-gray-13 mt-3 mb-1 lg:text-lg lg:font-bold lg:leading-5.5 lg:mt-5 lg:mb-2">
                  تأثیر رنگ‌ها در استایل
                </h6>
                <p className="text-xs leading-4.5 text-neutral-gray-10 mb-1 max-w-60.5 line-clamp-2 lg:leading-6 lg:text-sm lg:max-w-100">
                  رنگ‌ها نقش مهمی در استایل شما ایفا می‌کنند. در این مقاله یاد
                  می‌گیرید که چگونه رنگ‌هایی را انتخاب کنید که نه تنها شما را
                  زیباتر نشان دهند، بلکه با شخصیتتان همخوانی داشته باشند.
                </p>
                <p className="text-xs leading-4.5 text-neutral-gray-7 mb-2 lg:text-sm lg:leading-5">
                  ۱۴ شهریور<span className="mx-2">|</span>۱۰ دقیقه
                </p>
                <div className="flex items-center gap-2">
                  <div className="bg-cognac-tint-1 text-cognac-shade-1 rounded-100 px-2 py-0.5">
                    <p className="text-xs leading-4.5 lg:px-3 lg:py-1">
                      رنگ بندی
                    </p>
                  </div>
                  <div className="bg-cognac-tint-1 text-cognac-shade-1 rounded-100 px-2 py-0.5">
                    <p className="text-xs leading-4.5 lg:px-3 lg:py-1">
                      فرم بدن
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
