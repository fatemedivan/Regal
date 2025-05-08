import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function CategoriesMenu({
  handleCloseCategory,
  handleCloseMenu,
}) {
  const [data, setData] = useState([
    {
      id: 1,
      title: "پیراهن کوتاه",
      isOpen: false,
      options: ["مجلسی", "مخمل", "ساده", "گیپور"],
    },
    {
      id: 2,
      title: "شلوار",
      isOpen: false,
      options: ["کلاسیک", "جین", " مام استایل", "مجلسی"],
    },
    {
      id: 3,
      title: "کت و جلیقه",
      isOpen: false,
      options: ["جین", " مازراتی", "رسمی"],
    },
    {
      id: 4,
      title: "تاپ و کراپ",
      isOpen: false,
      options: ["جلو زیپ ", " ورزشی", "بند دار", "بدون فنر"],
    },
    {
      id: 5,
      title: "سرهمی",
      isOpen: false,
      options: ["جین", "ابر و بادی", "مجلسی"],
    },
    {
      id: 6,
      title: "شومیز و بلوز",
      isOpen: false,
      options: ["بافت", "کبریتی", "نخی", "ساحلی"],
    },
    {
      id: 7,
      title: "ترنچ کت و پالتو",
      isOpen: false,
      options: ["کلاه‌دار", "بارانی", "کوتاه", "چرم"],
    },
    {
      id: 8,
      title: "دامن",
      isOpen: false,
      options: ["راسته", "کوتاه", "بلند"],
    },
  ]);
  const handleToggle = (id) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-[#1E1E1E] opacity-50 z-40"
        onClick={() => handleCloseCategory()}
      />

      <div className="px-5 py-6 bg-white absolute w-full top-21.25 right-0 left-0 z-50">
        <ul className="text-neutral-gray-13 lg:hidden">
          {data.map((item) => (
            <div key={item.id}>
              <li
                onClick={() => handleToggle(item.id)}
                className="flex justify-between items-center border-b border-neutral-gray-4 mb-4 pb-4 cursor-pointer"
              >
                <p className="text-sm leading-6">{item.title}</p>
                <Image
                  onClick={() => handleToggle(item.id)}
                  className={`${item.isOpen && "hidden pointer-events-none"}`}
                  src="/img/arrow-down-2.svg"
                  alt=""
                  width={16}
                  height={16}
                />
                <Image
                  onClick={() => handleToggle(item.id)}
                  className={`${item.isOpen ? "block" : "hidden"}`}
                  src="/img/arrow-up.svg"
                  alt=""
                  width={16}
                  height={16}
                />
              </li>
              {item.isOpen && (
                <ul className="mb-6 text-neutral-gray-11 transition-all ease-in-out duration-300">
                  <Link href={"/products"}>
                    {item.options.map((option, index) => (
                      <li
                        onClick={() => {
                          handleCloseCategory();
                          handleCloseMenu();
                        }}
                        key={index}
                      >
                        <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                          {option}
                        </p>
                      </li>
                    ))}
                  </Link>
                </ul>
              )}
            </div>
          ))}
        </ul>
        <div className="hidden lg:flex justify-center items-center gap-14">
          <div>
            <div className="flex gap-7 mb-6">
              <ul>
                <Link href={"/products"}>
                  <li onClick={()=> handleCloseCategory()} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-100 bg-cognac-primery"></div>
                    <p className="leading-7 text-neutral-gray-13 text-nowrap cursor-pointer">
                      پیراهن کوتاه
                    </p>
                  </li>
                </Link>
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
                <Link href={"/products"}>
                  <li onClick={()=> handleCloseCategory()} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-100 bg-cognac-primery"></div>
                    <p className="leading-7 text-neutral-gray-13 cursor-pointer">
                      شلوار
                    </p>
                  </li>
                </Link>
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
                <Link href={"/products"}>
                  <li onClick={()=> handleCloseCategory()} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-100 bg-cognac-primery"></div>
                    <p className="leading-7 text-neutral-gray-13 text-nowrap cursor-pointer">
                      کت و جلیقه
                    </p>
                  </li>
                </Link>
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
                <Link href={"/products"}>
                  <li onClick={()=> handleCloseCategory()} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-100 bg-cognac-primery"></div>
                    <p className="leading-7 text-neutral-gray-13 text-nowrap cursor-pointer">
                      تاپ و کراپ
                    </p>
                  </li>
                </Link>
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
                <Link href={"/products"}>
                  <li onClick={()=> handleCloseCategory()} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-100 bg-cognac-primery"></div>
                    <p className="leading-7 text-neutral-gray-13 cursor-pointer">
                      سرهمی
                    </p>
                  </li>
                </Link>
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
                <Link href={"/products"}>
                  <li onClick={()=> handleCloseCategory()} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-100 bg-cognac-primery"></div>
                    <p className="leading-7 text-neutral-gray-13 text-nowrap cursor-pointer">
                      شومیز و بلوز
                    </p>
                  </li>
                </Link>
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
                <Link href={"/products"}>
                  <li onClick={()=> handleCloseCategory()} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-100 bg-cognac-primery"></div>
                    <p className="leading-7 text-neutral-gray-13 text-nowrap cursor-pointer">
                      ترنچ کت و پالتو
                    </p>
                  </li>
                </Link>
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
                <Link href={"/products"}>
                  <li onClick={()=> handleCloseCategory()} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-100 bg-cognac-primery"></div>
                    <p className="leading-7 text-neutral-gray-13 cursor-pointer">
                      دامن
                    </p>
                  </li>
                </Link>
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
              <Link href={"/products"}>
                <div onClick={()=> handleCloseCategory()} className="relative w-65 h-96 cursor-pointer">
                  <Image src="/img/category-desktop-9.png" alt="" fill />
                  <h5 className="absolute bottom-4 right-3.75 text-white font-bold text-[21px] leading-6.5">
                    پیراهن کوتاه
                  </h5>
                </div>
              </Link>
              <div>
                <Link href={"/products"}>
                  <div onClick={()=> handleCloseCategory()} className="relative w-65 h-45 cursor-pointer">
                    <Image src="/img/category-desktop-10.png" alt="" fill />
                    <h5 className="absolute bottom-4 right-3.75 z-20 text-white font-bold text-[21px] leading-6.5">
                      کت و جلیقه
                    </h5>
                  </div>
                </Link>
                <Link href={"/products"}>
                  <div onClick={()=> handleCloseCategory()} className="relative mt-6 w-65 h-45 cursor-pointer">
                    <Image src="/img/category-desktop-11.png" alt="" fill />
                    <h5 className="absolute bottom-4 right-3.75 z-20 text-white font-bold text-[21px] leading-6.5">
                      تاپ و کراپ
                    </h5>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
