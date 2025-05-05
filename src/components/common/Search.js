import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import ProductSearchItem from "./ProductSearchItem";

export default function Search({ handleCloseSearch }) {
  const glideRef = useRef(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (glideRef.current) {
      const glide = new Glide(glideRef.current, {
        type: "carousel",
        perView: 5,
        gap: 12,
        direction: "rtl",
        peek: {
          before: 0,
          after: 50,
        },
        breakpoints: {
          1440: {
            perView: 6,
            gap: 24,
          },
          1280: {
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
    }
  }, []);
  return (
    <>
      <div
        className="fixed inset-0 bg-[#1E1E1E] opacity-50 z-40"
        onClick={() => handleCloseSearch()}
      />

      <div className="py-6 absolute top-0 left-0 right-0 z-50 w-full bg-white">
        <div
          className={`ralative mx-5 mb-6 px-4 py-3.75 flex items-center gap-1 rounded-lg border lg:mx-40.5 ${
            isSearching ? "border-neutral-gray-11" : "border-neutral-gray-4"
          }`}
        >
          <div
            className={`absolute top-6 right-[5%] lg:right-45 px-1 bg-white ${
              isSearching ? "block" : "hidden"
            } -translate-y-1/2`}
          >
            <span className="text-xs leading-5 text-neutral-gray-10">
              جستجو
            </span>
          </div>

          <Image width={16} height={16} src="/img/search-normal-2.svg" alt="" />
          <input
            type="text"
            placeholder="محصول مورد نظر خود را جستجو کنید..."
            className="placeholder:text-neutral-gray-7 w-full outline-none"
            onChange={(e) => {
              setIsSearching(true);
              setSearchText(e.target.value);
            }}
            onFocus={() => setIsSearching(true)}
            onBlur={() => setIsSearching(false)}
            value={searchText}
          />
          {isSearching && searchText !== "" && (
            <Image
              onClick={(e) => {
                setIsSearching(false);
                setSearchText("");
              }}
              width={16}
              height={16}
              className="hidden lg:block cursor-pointer"
              src="/img/close-search.svg"
              alt=""
            />
          )}
        </div>

        {isSearching && searchText ? (
          <div className="mr-5 border-b border-b-neutral-gray-4 pb-6 lg:hidden">
            <p className="text-neutral-gray-13 mb-2 text-sm leading-6 lg:text-[1rem] lg:leading-7 lg:mb-5.5">
              پیشنهادات
            </p>
            <ul>
              <li className="mb-2 text-xs leading-4.5">لباس میدی مدرن راشا</li>
              <li className="mb-2 text-xs leading-4.5">لباس میدی توری یاس</li>
              <li className="mb-2 text-xs leading-4.5">لباس میدی مدرن پالما</li>
              <li className="mb-2 text-xs leading-4.5">لباس میدی دکلته الی</li>
              <li className="mb-2 text-xs leading-4.5">لباس میدی شیوا</li>
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
                <p className="text-neutral-gray-11 text-xs leading-5">سرهمی</p>
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
          className={`${searchText && "flex justify-between"} pr-5 lg:px-40.5`}
        >
          {isSearching && searchText && (
            <div className="hidden lg:block min-w-38.5 lg:ml-18.5 mt-6">
              <p className="text-neutral-gray-13 mb-2 text-sm leading-6 lg:text-[1rem] lg:leading-7 lg:mb-5.5">
                پیشنهادات
              </p>
              <ul>
                <li className="mb-2 text-sm leading-6">لباس میدی مدرن راشا</li>
                <li className="mb-2 text-sm leading-6">لباس میدی توری یاس</li>
                <li className="mb-2 text-sm leading-6">لباس میدی مدرن پالما</li>
                <li className="mb-2 text-sm leading-6">لباس میدی دکلته الی</li>
                <li className="mb-2 text-sm leading-6">لباس میدی شیوا</li>
              </ul>
            </div>
          )}
          <div
            className={`${
              searchText && "lg:max-w-120 xl:max-w-180 2xl:max-w-222"
            } max-w-full`}
          >
            <div className="mt-6 mb-4 flex justify-between items-center">
              {isSearching && searchText ? (
                <p className="text-neutral-gray-13 text-sm leading-6">
                  نمایش ۴ نتیجه از ۲۴ نتیجه
                </p>
              ) : (
                <p className="text-neutral-gray-13 text-sm leading-6">
                  محبوب‌ترین‌ها
                </p>
              )}

              <div className="text-neutral-gray-11 text-sm leading-5 flex items-center gap-2 px-4">
                <a href="">مشاهده همه</a>
                <Image
                  className="hidden lg:block cursor-pointer"
                  width={16}
                  height={16}
                  src="/img/arrow-left-4.svg"
                  alt=""
                />
              </div>
            </div>
            <div className="glide max-w-full" ref={glideRef}>
              <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides">
                  <li className="glide__slide min-w-41.75 lg:min-w-51">
                    <ProductSearchItem
                      img={"/img/product-off-1.png"}
                      title={"لباس میدی رایا"}
                      finalPrice={"۳,۵۰۲,۰۰۰"}
                      isMore={false}
                      colors={["#97AAB4", "#94999F", "#C2B1A5", "#F1AB90"]}
                    />
                  </li>
                  <li className="glide__slide min-w-41.75 lg:min-w-51">
                    <ProductSearchItem
                      img={"/img/product-off-2.png"}
                      title={"لباس میدی فیال"}
                      finalPrice={"۵,۰۲۲,۰۰۰"}
                      isMore={true}
                      colors={["#94999F", "#C2B1A5", "#F1AB90"]}
                    />
                  </li>
                  <li className="glide__slide min-w-41.75 lg:min-w-51">
                    <ProductSearchItem
                      img={"/img/product-off-3.png"}
                      title={"لباس میدی مدرن مارال"}
                      finalPrice={"۳,۸۶۴,۰۰۰"}
                      isMore={true}
                      colors={["#94999F", "#C2B1A5", "#F1AB90"]}
                    />
                  </li>
                  <li className="glide__slide min-w-41.75 lg:min-w-51">
                    <ProductSearchItem
                      img={"/img/product-off-4.png"}
                      title={"لباس میدی تک شانه نولا"}
                      finalPrice={"۳,۲۳۰,۰۰۰"}
                      isMore={false}
                      colors={["#94999F", "#C2B1A5", "#F1AB90"]}
                    />
                  </li>
                  <li className="glide__slide min-w-41.75 lg:min-w-51">
                    <ProductSearchItem
                      img={"/img/search-img-5.png"}
                      title={"لباس شب مدرن کاژین"}
                      finalPrice={"۳,۲۳۰,۰۰۰"}
                      isMore={false}
                      colors={["#97AAB4", "#94999F", "#C2B1A5", "#F1AB90"]}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
