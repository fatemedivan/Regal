"use client";
import Image from "next/image";
import React, { useState } from "react";
import Search from "@/components/Search";
import Categories from "@/components/CategoriesMenu";
import Link from "next/link";
import { useScrollLockContext } from "@/context/ScrollLockContext";
import { useAuthContext } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const handleCloseSearch = () => {
    setIsSearching(false);
  };
  const handleCloseCategory = () => {
    setIsOpenCategory(false);
    closeModal();
  };
  const handleCloseMenu = () => {
    setIsOpenMenu(false);
    closeModal();
  };

  const { isModalOpen, openModal, closeModal } = useScrollLockContext();
  const { role } = useAuthContext();

  return (
    <div>
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
                isModalOpen ? closeModal() : openModal();
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
            <li>
              <p className="text-sm leading-5 cursor-pointer">درباره ما</p>
            </li>
          </ul>

          <ul className="flex justify-center items-center lg:hidden">
            <li className="p-3.5">
              <Link
                href={role === "ADMIN" ? "/admin/products" : "/user/profile"}
              >
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
                  openModal();
                  setIsOpenCategory(false);
                }}
              />
            </li>
            {isOpenMenu || isSearching ? (
              <li
                className="p-3.5"
                onClick={(e) => {
                  setIsOpenMenu(false);
                  setIsSearching(false);
                  setIsOpenCategory(false);
                  closeModal();
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
                  openModal();
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
              {isSearching ? (
                <Image
                  className="cursor-pointer"
                  width={16}
                  height={16}
                  src="/img/Close Icon.svg"
                  alt=""
                  quality={100}
                  onClick={(e) => {
                    setIsSearching(false);
                  }}
                />
              ) : (
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
              )}
            </li>

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

            <Link href={role === "ADMIN" ? "/admin/products" : "/user/profile"}>
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
              closeModal();
            }}
          />
          <div className="fixed top-21.25 left-0 right-0  w-full bg-white px-5 pt-6 pb-10 text-neutral-gray-13 lg:hidden z-50">
            <Link href={"/"}>
              <div
                onClick={() => {
                  setIsOpenMenu(false);
                  closeModal;
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
                openModal();
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
                  closeModal();
                }}
                className="flex justify-between items-center pb-4 mt-4 border-b-1 border-neutral-gray-4 cursor-pointer"
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
            {role === "USER" && (
              <Link href={"/cart"}>
                <div
                  onClick={() => {
                    setIsOpenMenu(false);
                    closeModal();
                  }}
                  className="flex justify-between items-center mt-4 cursor-pointer"
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
            )}
          </div>
        </div>
      )}
      {isSearching && <Search handleCloseSearch={handleCloseSearch} />}
      {isOpenCategory && (
        <Categories
          handleCloseCategory={handleCloseCategory}
          handleCloseMenu={handleCloseMenu}
        />
      )}
    </div>
  );
}
