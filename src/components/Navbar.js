"use client";
import Image from "next/image";
import React, { useState } from "react";
import Search from "@/components/Search";
import Categories from "./CategoriesMenu";
import Link from "next/link";

export default function Navbar() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const handleCloseSearch = () => {
    setIsSearching(false);
  };
  const handleCloseCategory = () => {
    setIsOpenCategory(false);
  };
  return (
    <>
      <nav className="container relative min-w-full z-50 bg-white flex justify-between items-center p-5 border-b-1 border-neutral-gray-4 lg:py-6.25 lg:px-12 lg:border-none">
        <Link href={'/'}>
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
          <li>
            <p className="text-sm leading-5 cursor-pointer">صفحه اصلی</p>
          </li>
          <li
            onClick={() => setIsOpenCategory(!isOpenCategory)}
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
          <li>
            <p className="text-sm leading-5 cursor-pointer">تخفیف‌دار‌ها</p>
          </li>
          <li>
            <p className="text-sm leading-5 cursor-pointer">درباره ما</p>
          </li>
        </ul>

        <ul className="flex justify-center items-center lg:hidden">
          <li className="p-3.5">
            <Image
              className="cursor-pointer"
              width={16}
              height={16}
              quality={100}
              src="/img/user.svg"
              alt=""
            />
          </li>
          <li className="p-3.5">
            <Image
              className="cursor-pointer"
              width={16}
              height={16}
              src="/img/search-normal.svg"
              alt=""
              quality={100}
              onClick={() => {
                setIsSearching(true);
                setIsOpenCategory(false);
                setIsOpenMenu(false);
              }}
            />
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
          <li className="p-3">
            <Image
              className="cursor-pointer"
              width={16}
              height={16}
              src="/img/search-normal.svg"
              alt=""
              quality={100}
              onClick={(e) => {
                setIsSearching(true);
                setIsOpenCategory(false);
                setIsOpenMenu(false);
              }}
            />
          </li>
          <li className="p-3">
            <Link href={"/shoppingcard"}>
              <Image
                className="cursor-pointer"
                width={16}
                height={16}
                src="/img/shopping-cart.svg"
                alt=""
                quality={100}
              />
            </Link>
          </li>
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
        </ul>
      </nav>
      {isOpenMenu && (
        <>
          <div
            className="fixed inset-0 bg-[#1E1E1E] opacity-50 z-40"
            onClick={() => setIsOpenMenu(false)}
          />
          <div className="absolute top-21.25 left-0 right-0  w-full bg-white px-5 pt-6 pb-10 text-neutral-gray-13 lg:hidden z-50">
            <div className="flex justify-between items-center pb-4 border-b-1 border-neutral-gray-4 cursor-pointer">
              <p className="text-sm leading-5">صفحه اصلی</p>
              <Image
                width={16}
                height={16}
                src="/img/arrow-left-3.svg"
                alt=""
                quality={100}
              />
            </div>
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
            <div className="flex justify-between items-center pb-4 mt-4 border-b-1 border-neutral-gray-4 cursor-pointer">
              <p className="text-sm leading-5">تخفیف‌دارها</p>
              <Image
                width={16}
                height={16}
                src="/img/arrow-left-3.svg"
                alt=""
                quality={100}
              />
            </div>
            <div className="flex justify-between items-center mt-4 cursor-pointer">
              <p className="text-sm leading-5">درباره ما</p>
              <Image
                width={16}
                height={16}
                src="/img/arrow-left-3.svg"
                alt=""
                quality={100}
              />
            </div>
          </div>
        </>
      )}
      {isSearching && <Search handleCloseSearch={handleCloseSearch} />}
      {isOpenCategory && (
        <Categories handleCloseCategory={handleCloseCategory} />
      )}
    </>
  );
}
