"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Categories from "@/components/CategoriesMenu";
import getToken from "@/utils/getToken";

export default function Navbar() {
  const token = getToken();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  useEffect(() => {
    if (isOpenMenu || isOpenCategory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpenMenu, isOpenCategory]);

  return (
    <>
      <nav className="relative z-50 bg-white p-5 border-b-1 border-neutral-gray-4 lg:py-6.25 lg:px-12 lg:border-none">
        <div className="container mx-auto flex justify-between items-center ">
          <Link href={"/"}>
            <Image
              width={94}
              height={40}
              quality={100}
              src="/img/Logo.svg"
              className="cursor-pointer"
              alt=""
            />
          </Link>
          <ul className="hidden lg:flex justify-between items-center gap-12 px-10 py-2.5 text-neutral-gray-11 bg-neutral-gray-1 border-1 border-neutral-gray-3 rounded-100">
            <Link href={"/"}>
              <li>
                <p className="text-sm leading-5 cursor-pointer">صفحه اصلی</p>
              </li>
            </Link>

            <li
              onClick={() => {
                setIsOpenCategory(!isOpenCategory);
              }}
              className="flex justify-center items-center gap-2"
            >
              <p className="text-sm leading-5 cursor-pointer">دسته‌بندی‌ها</p>
              <Image
                className={`cursor-pointer ${
                  isOpenCategory ? "hidden" : "block"
                }`}
                width={16}
                height={16}
                quality={100}
                src="/img/arrow-down.svg"
                alt=""
              />
              <Image
                className={`cursor-pointer ${
                  isOpenCategory ? "block" : "hidden"
                }`}
                width={16}
                height={16}
                quality={100}
                src="/img/arrow-up-3.svg"
                alt=""
              />
            </li>
            <Link href={"/products"}>
              <li>
                <p className="text-sm leading-5 cursor-pointer">تخفیف‌دار‌ها</p>
              </li>
            </Link>
            <Link href={"/about"}>
              <li>
                <p className="text-sm leading-5 cursor-pointer">درباره ما</p>
              </li>
            </Link>
          </ul>

          <ul className="flex justify-center items-center lg:hidden">
            <li className="p-3.5">
              <Link href={"/user/profile"}>
                <Image
                  className="cursor-pointer"
                  width={16}
                  height={16}
                  quality={100}
                  src="/img/user.svg"
                  alt=""
                />
              </Link>
            </li>

            {isOpenMenu ? (
              <li
                className="p-3.5"
                onClick={(e) => {
                  setIsOpenMenu(false);

                  setIsOpenCategory(false);
                }}
              >
                <Image
                  className="cursor-pointer"
                  width={16}
                  height={16}
                  quality={100}
                  src="/img/Close Icon.svg"
                  alt=""
                />
              </li>
            ) : (
              <li
                className="p-3.5"
                onClick={() => {
                  setIsOpenMenu(true);
                }}
              >
                <Image
                  className="cursor-pointer"
                  width={16}
                  height={16}
                  quality={100}
                  src="/img/menu.svg"
                  alt=""
                />
              </li>
            )}
          </ul>
          <ul className="hidden lg:flex justify-center items-center gap-1">
            <Link href={"/cart"}>
              <li className="p-3">
                <Image
                  className="cursor-pointer"
                  width={16}
                  height={16}
                  src="/img/shopping-cart.svg"
                  alt=""
                  quality={100}
                />
              </li>
            </Link>
            <Link href={"/user/favorites"}>
              <li className="p-3">
                <Image
                  className="cursor-pointer"
                  width={16}
                  height={16}
                  quality={100}
                  src="/img/heart.svg"
                  alt=""
                />
              </li>
            </Link>

            <Link href={token ? "/user/profile" : "/auth/register"}>
              <li className="p-3">
                <Image
                  className="cursor-pointer"
                  width={16}
                  height={16}
                  quality={100}
                  src="/img/user.svg"
                  alt=""
                />
              </li>
            </Link>
          </ul>
        </div>
      </nav>
      {isOpenMenu && (
        <div>
          <div
            className="fixed inset-0 bg-[#1E1E1E] opacity-50 z-40"
            onClick={() => {
              setIsOpenMenu(false);
            }}
          />
          <div className="fixed top-21.25 left-0 right-0  w-full bg-white px-5 pt-6 pb-10 text-neutral-gray-13 lg:hidden z-50">
            <Link href={"/"}>
              <div
                onClick={() => {
                  setIsOpenMenu(false);
                }}
                className="flex justify-between items-center pb-4 border-b-1 border-neutral-gray-4 cursor-pointer"
              >
                <p className="text-sm leading-5">صفحه اصلی</p>
                <Image
                  width={16}
                  height={16}
                  src="/img/arrow-left-3.svg"
                  alt=""
                  quality={100}
                />
              </div>
            </Link>
            <div
              onClick={() => {
                setIsOpenCategory(true);
              }}
              className="flex justify-between items-center pb-4 mt-4 border-b-1 border-neutral-gray-4 cursor-pointer"
            >
              <p className="text-sm leading-5">دسته‌بندی‌ها</p>
              <Image
                width={16}
                height={16}
                src="/img/arrow-left-3.svg"
                alt=""
                quality={100}
              />
            </div>
            <Link href={"/cart"}>
              <div
                onClick={() => {
                  setIsOpenMenu(false);
                }}
                className="flex justify-between items-center border-b-1 border-neutral-gray-4 pb-4 mt-4 cursor-pointer"
              >
                <p className="text-sm leading-5">سبد خرید</p>
                <Image
                  width={16}
                  height={16}
                  src="/img/arrow-left-3.svg"
                  alt=""
                  quality={100}
                />
              </div>
            </Link>
            <Link href={"/about"}>
              <div
                onClick={() => {
                  setIsOpenMenu(false);
                }}
                className="flex justify-between items-center pb-4 mt-4 cursor-pointer"
              >
                <p className="text-sm leading-5">درباره ما</p>
                <Image
                  width={16}
                  height={16}
                  src="/img/arrow-left-3.svg"
                  alt=""
                  quality={100}
                />
              </div>
            </Link>
          </div>
        </div>
      )}

      {isOpenCategory && (
        <Categories
          handleCloseCategory={() => setIsOpenCategory(false)}
          handleCloseMenu={() => setIsOpenMenu(false)}
        />
      )}
    </>
  );
}
