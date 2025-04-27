import Image from "next/image";
import React, { useState } from "react";

export default function CategoriesMenu({ handleCloseCategory }) {
  const [isOpenCategoryOne, setIsOpenCategoryOne] = useState(false);
  const [isOpenCategoryTwo, setIsOpenCategoryTwo] = useState(false);
  const [isOpenCategoryThree, setIsOpenCategoryThree] = useState(false);
  const [isOpenCategoryFour, setIsOpenCategoryFour] = useState(false);
  const [isOpenCategoryFive, setIsOpenCategoryFive] = useState(false);
  const [isOpenCategorySix, setIsOpenCategorySix] = useState(false);
  const [isOpenCategorySeven, setIsOpenCategorySeven] = useState(false);
  const [isOpenCategoryEight, setIsOpenCategoryEight] = useState(false);

  return (
    <>
      <div
        className="fixed inset-0 bg-[#1E1E1E] opacity-50 z-40"
        onClick={() => handleCloseCategory()}
      />

      <div className="px-5 py-6 bg-white absolute w-full top-21.25 right-0 left-0 z-50">
        <ul className="text-neutral-gray-13 lg:hidden">
          <li
            onClick={() => setIsOpenCategoryOne(!isOpenCategoryOne)}
            className="flex justify-between items-center border-b border-neutral-gray-4 mb-4 pb-4 cursor-pointer"
          >
            <p className="text-sm leading-6">پیراهن کوتاه</p>
            <Image
              onClick={() => setIsOpenCategoryOne(!isOpenCategoryOne)}
              className={`${isOpenCategoryOne && "hidden pointer-events-none"}`}
              src="/img/arrow-down-2.svg"
              alt=""
              width={16}
              height={16}
            />
            <Image
              onClick={() => setIsOpenCategoryOne(!isOpenCategoryOne)}
              className={`${isOpenCategoryOne ? "block" : "hidden"}`}
              src="/img/arrow-up.svg"
              alt=""
              width={16}
              height={16}
            />
          </li>
          {isOpenCategoryOne && (
            <ul className="mb-6 text-neutral-gray-11 transition-all ease-in-out duration-300">
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  مجلسی
                </p>
              </li>
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  مخمل
                </p>
              </li>
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  ساده
                </p>
              </li>
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  گیپور
                </p>
              </li>
            </ul>
          )}
          <li
            onClick={() => setIsOpenCategoryTwo(!isOpenCategoryTwo)}
            className="flex justify-between items-center border-b border-neutral-gray-4 mb-4 pb-4 cursor-pointer"
          >
            <p className="text-sm leading-6">شلوار</p>
            <Image
              onClick={() => setIsOpenCategoryTwo(!isOpenCategoryTwo)}
              className={`${isOpenCategoryTwo && "hidden pointer-events-none"}`}
              src="/img/arrow-down-2.svg"
              alt=""
              width={16}
              height={16}
            />
            <Image
              onClick={() => setIsOpenCategoryTwo(!isOpenCategoryTwo)}
              className={`${isOpenCategoryTwo ? "block" : "hidden"}`}
              src="/img/arrow-up.svg"
              alt=""
              width={16}
              height={16}
            />
          </li>
          {isOpenCategoryTwo && (
            <ul className="mb-6 text-neutral-gray-11 transition-all ease-in-out duration-300">
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  کلاسیک
                </p>
              </li>
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  جین
                </p>
              </li>
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  مام استایل
                </p>
              </li>
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  مجلسی
                </p>
              </li>
            </ul>
          )}
          <li
            onClick={() => setIsOpenCategoryThree(!isOpenCategoryThree)}
            className="flex justify-between items-center border-b border-neutral-gray-4 mb-4 pb-4 cursor-pointer"
          >
            <p className="text-sm leading-6">کت و جلیقه</p>
            <Image
              onClick={() => setIsOpenCategoryThree(!isOpenCategoryThree)}
              className={`${
                isOpenCategoryThree && "hidden pointer-events-none"
              }`}
              src="/img/arrow-down-2.svg"
              alt=""
              width={16}
              height={16}
            />
            <Image
              onClick={() => setIsOpenCategoryThree(!isOpenCategoryThree)}
              className={`${isOpenCategoryThree ? "block" : "hidden"}`}
              src="/img/arrow-up.svg"
              alt=""
              width={16}
              height={16}
            />
          </li>
          {isOpenCategoryThree && (
            <ul className="mb-6 text-neutral-gray-11 transition-all ease-in-out duration-300">
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  جین
                </p>
              </li>
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  مازراتی
                </p>
              </li>
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  رسمی
                </p>
              </li>
            </ul>
          )}
          <li
            onClick={() => setIsOpenCategoryFour(!isOpenCategoryFour)}
            className="flex justify-between items-center border-b border-neutral-gray-4 mb-4 pb-4 cursor-pointer"
          >
            <p className="text-sm leading-6">تاپ و کراپ</p>
            <Image
              onClick={() => setIsOpenCategoryFour(!isOpenCategoryFour)}
              className={`${
                isOpenCategoryFour && "hidden pointer-events-none"
              }`}
              src="/img/arrow-down-2.svg"
              alt=""
              width={16}
              height={16}
            />
            <Image
              onClick={() => setIsOpenCategoryFour(!isOpenCategoryFour)}
              className={`${isOpenCategoryFour ? "block" : "hidden"}`}
              src="/img/arrow-up.svg"
              alt=""
              width={16}
              height={16}
            />
          </li>
          {isOpenCategoryFour && (
            <ul className="mb-6 text-neutral-gray-11 transition-all ease-in-out duration-300">
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  جلو زیپ
                </p>
              </li>
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  ورزشی
                </p>
              </li>
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  بند دار
                </p>
              </li>
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  بدون فنر
                </p>
              </li>
            </ul>
          )}
          <li
            onClick={() => setIsOpenCategoryFive(!isOpenCategoryFive)}
            className="flex justify-between items-center border-b border-neutral-gray-4 mb-4 pb-4 cursor-pointer"
          >
            <p className="text-sm leading-6">سرهمی</p>
            <Image
              onClick={() => setIsOpenCategoryFive(!isOpenCategoryFive)}
              className={`${
                isOpenCategoryFive && "hidden pointer-events-none"
              }`}
              src="/img/arrow-down-2.svg"
              alt=""
              width={16}
              height={16}
            />
            <Image
              onClick={() => setIsOpenCategoryFive(!isOpenCategoryFive)}
              className={`${isOpenCategoryFive ? "block" : "hidden"}`}
              src="/img/arrow-up.svg"
              alt=""
              width={16}
              height={16}
            />
          </li>
          {isOpenCategoryFive && (
            <ul className="mb-6 text-neutral-gray-11 transition-all ease-in-out duration-300">
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  جین
                </p>
              </li>
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  ابر و بادی
                </p>
              </li>
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  مجلسی
                </p>
              </li>
            </ul>
          )}
          <li
            onClick={() => setIsOpenCategorySix(!isOpenCategorySix)}
            className="flex justify-between items-center border-b border-neutral-gray-4 mb-4 pb-4 cursor-pointer"
          >
            <p className="text-sm leading-6">شومیز و بلوز</p>
            <Image
              onClick={() => setIsOpenCategorySix(!isOpenCategorySix)}
              className={`${isOpenCategorySix && "hidden pointer-events-none"}`}
              src="/img/arrow-down-2.svg"
              alt=""
              width={16}
              height={16}
            />
            <Image
              onClick={() => setIsOpenCategorySix(!isOpenCategorySix)}
              className={`${isOpenCategorySix ? "block" : "hidden"}`}
              src="/img/arrow-up.svg"
              alt=""
              width={16}
              height={16}
            />
          </li>
          {isOpenCategorySix && (
            <ul className="mb-6 text-neutral-gray-11 transition-all ease-in-out duration-300">
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  بافت
                </p>
              </li>
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  کبریتی
                </p>
              </li>
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  نخی
                </p>
              </li>
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  ساحلی
                </p>
              </li>
            </ul>
          )}
          <li
            onClick={() => setIsOpenCategorySeven(!isOpenCategorySeven)}
            className="flex justify-between items-center border-b border-neutral-gray-4 mb-4 pb-4 cursor-pointer"
          >
            <p className="text-sm leading-6">ترنچ کت و پالتو</p>
            <Image
              onClick={() => setIsOpenCategorySeven(!isOpenCategorySeven)}
              className={`${
                isOpenCategorySeven && "hidden pointer-events-none"
              }`}
              src="/img/arrow-down-2.svg"
              alt=""
              width={16}
              height={16}
            />
            <Image
              onClick={() => setIsOpenCategorySeven(!isOpenCategorySeven)}
              className={`${isOpenCategorySeven ? "block" : "hidden"}`}
              src="/img/arrow-up.svg"
              alt=""
              width={16}
              height={16}
            />
          </li>
          {isOpenCategorySeven && (
            <ul className="mb-6 text-neutral-gray-11 transition-all ease-in-out duration-300">
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  کلاه‌دار
                </p>
              </li>
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  بارانی
                </p>
              </li>
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  کوتاه
                </p>
              </li>
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  چرم
                </p>
              </li>
            </ul>
          )}
          <li
            onClick={() => setIsOpenCategoryEight(!isOpenCategoryEight)}
            className="flex justify-between items-center border-b border-neutral-gray-4 pb-4 cursor-pointer"
          >
            <p className="text-sm leading-6">دامن</p>
            <Image
              onClick={() => setIsOpenCategoryEight(!isOpenCategoryEight)}
              className={`${
                isOpenCategoryEight && "hidden pointer-events-none"
              }`}
              src="/img/arrow-down-2.svg"
              alt=""
              width={16}
              height={16}
            />
            <Image
              onClick={() => setIsOpenCategoryEight(!isOpenCategoryEight)}
              className={`${isOpenCategoryEight ? "block" : "hidden"}`}
              src="/img/arrow-up.svg"
              alt=""
              width={16}
              height={16}
            />
          </li>
          {isOpenCategoryEight && (
            <ul className="mb-6 text-neutral-gray-11 transition-all ease-in-out duration-300">
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  راسته
                </p>
              </li>
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  کوتاه
                </p>
              </li>
              <li>
                <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                  بلند
                </p>
              </li>
            </ul>
          )}
        </ul>
        <div className="hidden lg:flex justify-center items-center gap-14">
          <div>
            <div className="flex gap-7 mb-6">
              <ul>
                <li className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-100 bg-cognac-primery"></div>
                  <p className="leading-7 text-neutral-gray-13 text-nowrap cursor-pointer">
                    پیراهن کوتاه
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    مجلسی
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    مخمل
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    ساده
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    گیپور
                  </p>
                </li>
              </ul>
              <ul>
                <li className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-100 bg-cognac-primery"></div>
                  <p className="leading-7 text-neutral-gray-13 cursor-pointer">
                    شلوار
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    کلاسیک
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    جین
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    مام استایل
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    مجلسی
                  </p>
                </li>
              </ul>
              <ul>
                <li className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-100 bg-cognac-primery"></div>
                  <p className="leading-7 text-neutral-gray-13 text-nowrap cursor-pointer">
                    کت و جلیقه
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    جین
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    مازراتی
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    رسمی
                  </p>
                </li>
              </ul>
              <ul>
                <li className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-100 bg-cognac-primery"></div>
                  <p className="leading-7 text-neutral-gray-13 text-nowrap cursor-pointer">
                    تاپ و کراپ
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    جلو زیپ
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    ورزشی
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    بند دار
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    بدون فنر
                  </p>
                </li>
              </ul>
            </div>
            <div className="flex gap-7">
              <ul>
                <li className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-100 bg-cognac-primery"></div>
                  <p className="leading-7 text-neutral-gray-13 cursor-pointer">
                    سرهمی
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    جین
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    ابر و بادی
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    مجلسی
                  </p>
                </li>
              </ul>
              <ul>
                <li className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-100 bg-cognac-primery"></div>
                  <p className="leading-7 text-neutral-gray-13 text-nowrap cursor-pointer">
                    شومیز و بلوز
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    بافت
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    کبریتی
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    نخی
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    ساحلی
                  </p>
                </li>
              </ul>
              <ul>
                <li className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-100 bg-cognac-primery"></div>
                  <p className="leading-7 text-neutral-gray-13 text-nowrap cursor-pointer">
                    ترنچ کت و پالتو
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    کلاه‌دار
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    بارانی
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    کوتاه
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    چرم
                  </p>
                </li>
              </ul>
              <ul>
                <li className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-100 bg-cognac-primery"></div>
                  <p className="leading-7 text-neutral-gray-13 cursor-pointer">
                    دامن
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    راسته
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    بلند
                  </p>
                </li>
                <li className="cursor-pointer">
                  <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                    کوتاه
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <p className="leading-7 text-neutral-gray-13">
              دسته‌بندی‌های پربازدید
            </p>
            <div className="flex gap-6 items-center mt-3 mb-12">
              <div className="relative w-65 h-96">
                <Image src="/img/category-desktop-9.png" alt="" fill />
                <h5 className="absolute bottom-4 right-3.75 text-white font-bold text-[21px] leading-6.5">
                  پیراهن کوتاه
                </h5>
              </div>
              <div>
                <div className="relative w-65 h-45">
                  <Image src="/img/category-desktop-10.png" alt="" fill />
                  <h5 className="absolute bottom-4 right-3.75 z-20 text-white font-bold text-[21px] leading-6.5">
                    کت و جلیقه
                  </h5>
                </div>
                <div className="relative mt-6 w-65 h-45">
                  <Image src="/img/category-desktop-11.png" alt="" fill />
                  <h5 className="absolute bottom-4 right-3.75 z-20 text-white font-bold text-[21px] leading-6.5">
                    تاپ و کراپ
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
