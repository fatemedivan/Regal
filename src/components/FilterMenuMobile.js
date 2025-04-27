"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function FilterMenuMobile({ handleCloseFilter }) {
  const [isOpenFilterOne, setIsOpenFilterOne] = useState(false);
  const [isOpenFilterTwo, setIsOpenFilterTwo] = useState(false);
  const [isOpenFilterThree, setIsOpenFilterThree] = useState(false);
  const [isOpenFilterFour, setIsOpenFilterFour] = useState(false);
  const [isOpenFilterFive, setIsOpenFilterFive] = useState(false);
  const [isOpenFilterSix, setIsOpenFilterSix] = useState(false);
  const typesOfFilterOne = [
    "لباس مجلسی",
    "پیراهن کوتاه",
    "کت و شلوار",
    "شومیز",
    "شلوار",
  ];
  const typesOfFilterFoure = ["پنبه", "ساتن", "مخمل", "لینن", "گیپور"];
  const typesOfFilterFive = [
    " ساعت شنی",
    " گلابی",
    " سیب",
    " مستطیل",
    " مثلث وارونه",
  ];
  const typesOfFilterSix = [
    " ساده",
    " گل‌دار",
    "راه‌راه",
    "طرح‌دار",
    "براق",
    "مات",
  ];
  const typesOfFilterTwo = [
    "#E6E6E6",
    "#94999F",
    "#C2B1A5",
    "#F1AB90",
    "#997979",
    "#6A6A6A",
    "#7E1F6D",
    "#33562F",
    "#CB927C",
    "#69101C",
    "#DAA37F",
    "#C0916F",
    "#988FAB",
    "#E67B79",
    "#5AAAB8",
    "rgba(138,33,32,0.46)",
  ];
  const typesOfFilterThree = ["XS", "S", "M", "L", "XL", "2XL"];
  return (
    <div>
      <div className="flex items-center gap-2 py-4 pr-5 mb-6 cursor-pointer lg:hidden">
        <Image
          width={20}
          height={20}
          src="/img/close-icon-filter.svg"
          onClick={() => handleCloseFilter()}
          alt=""
        />
        <p className="leading-7 text-neutral-gray-13">فیلترها</p>
      </div>

      <ul className="mx-5 lg:w-80">
        <li
          onClick={() => setIsOpenFilterOne(!isOpenFilterOne)}
          className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-gray-4 cursor-pointer"
        >
          <p className="text-sm font-semibold leading-4 w-full lg:text-[1rem] lg:leading-7">نوع لباس</p>
          {isOpenFilterOne ? (
            <Image width={16} height={16} src="/img/arrow-up.svg" alt="" />
          ) : (
            <Image width={16} height={16} src="/img/arrow-down-3.svg" alt="" />
          )}
        </li>
        {isOpenFilterOne && (
          <div className="flex flex-col gap-4 mb-6">
            {typesOfFilterOne.map((types, index) => (
              <label
                key={index}
                className="flex items-center cursor-pointer gap-2 text-neutral-gray-10 "
              >
                <input type="checkbox" className="peer hidden" />
                <div
                  className="w-5 h-5 flex items-center justify-center border border-neutral-gray-4 rounded-sm relative
                  before:content-[''] before:absolute before:top-0.5 before:w-1.5 before:h-2.5 before:border-r-2 before:border-b-2 
                  before:border-neutral-gray-10 before:rotate-45 before:opacity-0 peer-checked:before:opacity-100"
                ></div>
                <p className="peer-checked:text-black text-sm leading-5">
                  {types}
                </p>
              </label>
            ))}
          </div>
        )}
        <li
          onClick={() => setIsOpenFilterTwo(!isOpenFilterTwo)}
          className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-gray-4 cursor-pointer"
        >
          <p className="text-sm font-semibold leading-4 w-full lg:text-[1rem] lg:leading-7">رنگ‌بندی</p>
          {isOpenFilterTwo ? (
            <Image width={16} height={16} src="/img/arrow-up.svg" alt="" />
          ) : (
            <Image width={16} height={16} src="/img/arrow-down-3.svg" alt="" />
          )}
        </li>
        {isOpenFilterTwo && (
          <div className="flex flex-wrap gap-3 mb-6">
            {typesOfFilterTwo.map((color, index) => (
              <label key={index} className="cursor-pointer relative">
                <input type="checkbox" className="peer hidden" />
                <div
                  className={`relative w-8 h-8 rounded-sm bg-[${color}] flex justify-center items-center before:content-[''] before:absolute before:mb-0.5 before:w-1.5 before:h-2.5 before:border-r-1 before:border-b-1
                  before:border-white before:rotate-45 before:opacity-0 peer-checked:before:opacity-100`}
                ></div>
                <div
                  className={`absolute top-[-4px] left-[-4px] w-10 h-10 rounded-md border-2 border-[${color}] opacity-0 peer-checked:opacity-100 transition-all`}
                ></div>
              </label>
            ))}
          </div>
        )}
        <li
          onClick={() => setIsOpenFilterThree(!isOpenFilterThree)}
          className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-gray-4 cursor-pointer"
        >
          <p className="text-sm font-semibold leading-4 w-full lg:text-[1rem] lg:leading-7">سایزبندی</p>
          {isOpenFilterThree ? (
            <Image width={16} height={16} src="/img/arrow-up.svg" alt="" />
          ) : (
            <Image width={16} height={16} src="/img/arrow-down-3.svg" alt="" />
          )}
        </li>
        {isOpenFilterThree && (
          <div className="flex flex-wrap gap-3 mb-6">
            {typesOfFilterThree.map((size, index) => (
              <label key={index} className="relative cursor-pointer">
                <input type="checkbox" className="peer hidden" />
                <div className="w-8 h-8 text-neutral-gray-11 flex items-center justify-center rounded-sm border border-neutral-gray-4 peer-checked:bg-cognac-shade-4 peer-checked:text-white text-xs leading-4.5 pt-1">
                  {" "}
                  {size}
                </div>
                <div
                  className={`absolute top-[-4px] left-[-4px] w-10 h-10 rounded-lg border-3 border-cognac-shade-4 opacity-0 peer-checked:opacity-100 transition-all`}
                ></div>
              </label>
            ))}
          </div>
        )}
        <li
          onClick={() => setIsOpenFilterFour(!isOpenFilterFour)}
          className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-gray-4 cursor-pointer"
        >
          <p className="text-sm font-semibold leading-4 w-full lg:text-[1rem] lg:leading-7">جنس پارچه</p>
          {isOpenFilterFour ? (
            <Image width={16} height={16} src="/img/arrow-up.svg" alt="" />
          ) : (
            <Image width={16} height={16} src="/img/arrow-down-3.svg" alt="" />
          )}
        </li>
        {isOpenFilterFour && (
          <div className="flex flex-col gap-4 mb-6">
            {typesOfFilterFoure.map((types, index) => (
              <label
                key={index}
                className="flex items-center cursor-pointer gap-2 text-neutral-gray-10 "
              >
                <input type="checkbox" className="peer hidden" />
                <div
                  className="w-5 h-5 flex items-center justify-center border border-neutral-gray-4 rounded-sm relative
                  before:content-[''] before:absolute before:top-0.5 before:w-1.5 before:h-2.5 before:border-r-2 before:border-b-2 
                  before:border-neutral-gray-10 before:rotate-45 before:opacity-0 peer-checked:before:opacity-100"
                ></div>
                <p className="peer-checked:text-black text-sm leading-5">
                  {types}
                </p>
              </label>
            ))}
          </div>
        )}
        <li
          onClick={() => setIsOpenFilterFive(!isOpenFilterFive)}
          className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-gray-4 cursor-pointer"
        >
          <p className="text-sm font-semibold leading-4 w-full lg:text-[1rem] lg:leading-7">فرم بدن</p>
          {isOpenFilterFive ? (
            <Image width={16} height={16} src="/img/arrow-up.svg" alt="" />
          ) : (
            <Image width={16} height={16} src="/img/arrow-down-3.svg" alt="" />
          )}
        </li>
        {isOpenFilterFive && (
          <div className="flex flex-col gap-4 mb-6">
            {typesOfFilterFive.map((types, index) => (
              <label
                key={index}
                className="flex items-center cursor-pointer gap-2 text-neutral-gray-10 "
              >
                <input type="checkbox" className="peer hidden" />
                <div
                  className="w-5 h-5 flex items-center justify-center border border-neutral-gray-4 rounded-sm relative
                  before:content-[''] before:absolute before:top-0.5 before:w-1.5 before:h-2.5 before:border-r-2 before:border-b-2 
                  before:border-neutral-gray-10 before:rotate-45 before:opacity-0 peer-checked:before:opacity-100"
                ></div>
                <p className="peer-checked:text-black text-sm leading-5">
                  {types}
                </p>
              </label>
            ))}
          </div>
        )}
        <li
          onClick={() => setIsOpenFilterSix(!isOpenFilterSix)}
          className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-gray-4 cursor-pointer"
        >
          <p className="text-sm font-semibold leading-4 w-full lg:text-[1rem] lg:leading-7">طرح لباس</p>
          {isOpenFilterSix ? (
            <Image width={16} height={16} src="/img/arrow-up.svg" alt="" />
          ) : (
            <Image width={16} height={16} src="/img/arrow-down-3.svg" alt="" />
          )}
        </li>
        {isOpenFilterSix && (
          <div className="flex flex-col gap-4 mb-6">
            {typesOfFilterSix.map((types, index) => (
              <label
                key={index}
                className="flex items-center cursor-pointer gap-2 text-neutral-gray-10 "
              >
                <input type="checkbox" className="peer hidden" />
                <div
                  className="w-5 h-5 flex items-center justify-center border border-neutral-gray-4 rounded-sm relative
                  before:content-[''] before:absolute before:top-0.5 before:w-1.5 before:h-2.5 before:border-r-2 before:border-b-2 
                  before:border-neutral-gray-10 before:rotate-45 before:opacity-0 peer-checked:before:opacity-100"
                ></div>
                <p className="peer-checked:text-black text-sm leading-5">
                  {types}
                </p>
              </label>
            ))}
          </div>
        )}
      </ul>
      <div className="mb-4 flex justify-center items-center gap-4 mt-69.5 px-5 lg:hidden">
        <button className="px-10 py-3.25 border border-neutral-gray-4 text-neutral-gray-4 rounded-lg">
          حذف فیلترها
        </button>
        <button className="px-11.75 py-3.25 bg-cognac-tint-2 text-cognac-tint-4 rounded-lg">
          اعمال کنید
        </button>
      </div>
    </div>
  );
}
