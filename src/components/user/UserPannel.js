"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import DeleteModal from "@/components/common/DeleteModal";
import AddAddressModal from "./AddAddressModal";
import DetailsModalAddAddress from "./DetailsModalAddAddress";
import { useScrollLockContext } from "@/context/ScrollLockContext";
import { useAuthContext } from "@/context/AuthContext";

export default function UserPannel({
  children,
  rout,
  isHadAddress,
  setSelectedOrderType,
  selectedOrderType,
  setSelectedOrderTypeValue,
  selectedOrderTypeValue,
  orderTypes
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isShownOrderTypes, setIsShownOrderTypes] = useState(false);

  const [isOpenSort, setIsOpenSort] = useState(false);
  const [selectedOptionSort, setSelectedOptionSort] = useState("");
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState(false);
  const [isOpenAddAddressModal, setIsOpenAddAddressModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);

  const handleCloseAddAddressModal = () => {
    setIsOpenAddAddressModal(false);
    openModal();
  };
  const handleOpenDetailsModal = () => {
    setIsOpenDetailsModal(true);
    openModal();
  };
  const handleCloseDetailsModal = () => {
    setIsOpenDetailsModal(false);
    closeModal();
  };

  const handleCloseLogoutModal = () => {
    setIsOpenLogoutModal(false);
    closeModal();
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("full address");
    sessionStorage.removeItem("address");
    document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    router.refresh()
    router.push("/auth/login");
    setIsOpenLogoutModal(false);
    closeModal();
  };
  const { openModal, closeModal } = useScrollLockContext();
  const { phoneNumber } = useAuthContext();

  return (
    <div className="container mx-auto pt-8 px-5 pb-66.5 lg:px-12 lg:pt-12 lg:pb-22 lg:flex lg:gap-4">
      <div className="xl:min-w-79.5">
        <div className="flex justify-between border border-neutral-gray-4 rounded-xl p-4">
          <div className="flex items-center gap-4">
            <Image
              width={56}
              height={56}
              quality={100}
              src="/img/Ellipse-18.svg"
              alt=""
            />
            <div>
              <p className="leading-7 text-neutral-gray-13">کاربر رگال</p>
              <p className="text-neutral-gray-11 leading-6 text-sm mt-1">
                {phoneNumber}
              </p>
            </div>
          </div>
          <Link href={"/user/edit"}>
            <div className="flex items-start gap-2 lg:hidden">
              <Image width={16} height={16} src="/img/edit-3.svg" alt="" />
              <p className="text-cognac-primery text-sm leading-5">ویرایش</p>
            </div>
          </Link>
        </div>
        <div className="border border-neutral-gray-4 rounded-xl px-7 py-5 mt-4">
          <Link href={"/user/profile"}>
            <div
              className={`flex items-center gap-2 mb-5 pb-5  border-b border-neutral-gray-4 lg:border-t-0 lg:border-b-0 lg:border-l-0 lg:pb-3 lg:mb-0 lg:rounded-lg  lg:p-3 lg:border-neutral-gray-8 transition-all cursor-pointer ${
                (pathname.includes("/user/profile") ||
                  pathname.includes("/user/edit")) &&
                "lg:bg-neutral-gray-1 lg:border-r-4"
              }`}
            >
              {pathname.includes("/user/profile") ||
              pathname.includes("/user/edit") ? (
                <Image
                  width={20}
                  height={20}
                  src="/img/user-bold-3.svg"
                  alt=""
                />
              ) : (
                <Image width={20} height={20} src="/img/user-3.svg" alt="" />
              )}
              <p className="text-sm leading-6 text-neutral-gray-11">
                حساب کاربری
              </p>
            </div>
          </Link>
          <Link href={"/user/orders"}>
            <div
              className={`flex items-center gap-2 mb-5 pb-5 border-b border-neutral-gray-4 lg:border-t-0 lg:border-b-0 lg:border-l-0 lg:pb-3 lg:mb-0  lg:rounded-lg lg:p-3 lg:border-neutral-gray-8 transition-all cursor-pointer ${
                pathname.includes("/user/orders") &&
                "lg:bg-neutral-gray-1 lg:border-r-4"
              }`}
            >
              {pathname.includes("/user/orders") ? (
                <Image
                  width={20}
                  height={20}
                  src="/img/wallet-bold-2.svg"
                  alt=""
                />
              ) : (
                <Image width={20} height={20} src="/img/wallet-2.svg" alt="" />
              )}
              <p className="text-sm leading-6 text-neutral-gray-11">
                پیگیری سفارشات
              </p>
            </div>
          </Link>
          <Link href={"/user/favorites"}>
            <div
              className={`flex items-center gap-2 mb-5 pb-5 border-b border-neutral-gray-4 lg:border-t-0 lg:border-b-0 lg:border-l-0 lg:pb-3 lg:mb-0  lg:rounded-lg lg:p-3 lg:border-neutral-gray-8 transition-all cursor-pointer ${
                pathname.includes("/user/favorites") &&
                "lg:bg-neutral-gray-1 lg:border-r-4"
              }`}
            >
              {pathname.includes("/user/favorites") ? (
                <Image
                  width={20}
                  height={20}
                  src="/img/heart-bold.svg"
                  alt=""
                />
              ) : (
                <Image width={20} height={20} src="/img/heart.svg" alt="" />
              )}
              <p className="text-sm leading-6 text-neutral-gray-11">
                علاقمندی‌ها
              </p>
            </div>
          </Link>
          <Link href={"/user/addresses"}>
            <div
              className={`flex items-center gap-2 mb-5 pb-5 border-b border-neutral-gray-4 lg:border-t-0 lg:border-b-0 lg:border-l-0 lg:pb-3 lg:mb-0  lg:rounded-lg lg:p-3 lg:border-neutral-gray-8 transition-all cursor-pointer ${
                pathname.includes("/user/addresses") &&
                "lg:bg-neutral-gray-1 lg:border-r-4"
              }`}
            >
              {pathname.includes("/user/addresses") ? (
                <Image
                  width={20}
                  height={20}
                  src="/img/location-bold.svg"
                  alt=""
                />
              ) : (
                <Image
                  width={20}
                  height={20}
                  src="/img/location-2.svg"
                  alt=""
                />
              )}

              <p className="text-sm leading-6 text-neutral-gray-11">
                آدرس‌های من
              </p>
            </div>
          </Link>
          <div
            onClick={() => {
              setIsOpenLogoutModal(true);
              openModal();
            }}
            className="flex items-center gap-2 lg:border-t-0 lg:border-b-0 lg:border-l-0 lg:mb-0  lg:rounded-lg lg:p-3 lg:border-neutral-gray-8 transition-all cursor-pointer"
          >
            <Image width={20} height={20} src="/img/logout.svg" alt="" />
            <p className="text-sm leading-6 text-error-primery">خروج</p>
          </div>
        </div>
      </div>
      <div className="hidden lg:block border border-neutral-gray-4 rounded-xl pt-6 px-6 flex-1">
        <div className="pb-6 border-b border-neutral-gray-4 flex justify-between items-center">
          <h6 className="text-neutral-gray-13 text-lg font-bold leading-5.5 py-3">
            {rout === "edit" || rout === "profile"
              ? " اطلاعات حساب کاربری"
              : rout === "order"
              ? " تاریخچه سفارشات"
              : rout === "favorites"
              ? " لیست علاقه‌مندی‌ها"
              : rout === "addresses"
              ? "لیست آدرس‌ها"
              : ""}
          </h6>

          {rout === "profile" ? (
            <Link href={"/user/edit"}>
              <div className="flex items-center gap-2 px-9 py-3.25">
                <Image width={16} height={16} src="/img/edit-3.svg" alt="" />
                <p className="text-cognac-primery leading-5.5">
                  ویرایش اطلاعات
                </p>
              </div>
            </Link>
          ) : rout === "order" ? (
            <div className="relative ">
              <div
                onClick={() => setIsShownOrderTypes(!isShownOrderTypes)}
                className="border border-neutral-gray-4 px-4 py-3.75 rounded-lg flex items-center justify-between cursor-pointer min-w-64"
              >
                <div className="py-1.75 px-3 flex justify-center items-center gap-2 rounded-100 bg-neutral-gray-2">
                  <p className="text-neutral-gray-11 text-xs leading-4.5">
                    {selectedOrderType}
                  </p>
                  <Image
                    width={16}
                    height={16}
                    src="/img/close-square.svg"
                    alt=""
                  />
                </div>
                <label
                  className={`absolute right-4 -top-2.5 bg-white px-1 text-xs text-neutral-gray-7 leading-4.5 transition-all`}
                >
                  نوع سفارش
                </label>
                <Image
                  width={16}
                  height={16}
                  src="/img/arrow-down-4.svg"
                  className={`transition duration-200 ease-in-out ${
                    isShownOrderTypes ? "rotate-180" : "rotate-0"
                  }`}
                  alt=""
                />
              </div>
              {isShownOrderTypes && (
                <div className="w-full absolute top-18 right-0 p-4 rounded-lg border border-neutral-gray-4 bg-white transition duration-200 ease-in-out">
                  {orderTypes.map((type, index) => (
                    <label
                      key={index}
                      className="cursor-pointer flex items-center justify-between mb-6"
                    >
                      <input
                        type="radio"
                        name="ordertype"
                        className="hidden peer"
                        onChange={() => {
                          setSelectedOrderType(type.label);
                          setSelectedOrderTypeValue(type.value);
                        }}
                        checked={selectedOrderTypeValue === type.value}
                      />
                      <p className="text-neutral-gray-11 text-sm leading-5">
                        {type.label}
                      </p>
                      <div
                        className="w-5 h-5 border border-neutral-gray-10 rounded-sm relative flex items-center justify-center
                                   before:content-[''] before:absolute before:w-1.5 before:h-2.5 before:border-r-2 before:border-b-2 
                                   before:border-neutral-gray-10 before:rotate-45 before:opacity-0 peer-checked:before:opacity-100 pb-1"
                      >
                        {type.value === "ALL" && selectedOrderType !== "همه"
                          ? "ـــ"
                          : ""}
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ) : rout === "favorites" ? (
            <div className="relative min-w-64">
              <button
                onClick={() => setIsOpenSort(!isOpenSort)}
                className="w-full border border-neutral-gray-4 rounded-lg py-5 pl-8 pr-6 text-right flex justify-between items-center cursor-pointer"
              >
                <p className="text-neutral-gray-7 text-xs leading-4.5">
                  {selectedOptionSort || "مرتب سازی بر اساس"}
                </p>
                <Image
                  src="/img/drop-down.svg"
                  width={16}
                  height={16}
                  alt="dropdown icon"
                  className={`absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none transition ${
                    isOpenSort && "rotate-180"
                  }`}
                />
              </button>

              {isOpenSort && (
                <ul className="absolute w-full z-20 bg-white border border-neutral-gray-4 mt-1 rounded-lg shadow-lg text-sm">
                  {["جدیدترین", "قدیمی‌ترین", "ارزان‌ترین", "گران‌ترین"].map(
                    (option) => (
                      <li
                        key={option}
                        onClick={() => {
                          setSelectedOptionSort(option);
                          setIsOpenSort(false);
                        }}
                        className="px-4 py-2 hover:bg-neutral-gray-2 cursor-pointer text-xs leading-4.5 text-neutral-gray-7"
                      >
                        {option}
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          ) : rout === "addresses" ? (
            <div>
              {isHadAddress && (
                <div
                  onClick={() => {
                    setIsOpenAddAddressModal(true);
                    openModal();
                  }}
                  className="flex items-center gap-2 px-6 py-3.25 cursor-pointer"
                >
                  <Image
                    width={20}
                    height={20}
                    src="/img/add-circle.svg"
                    alt=""
                  />
                  <p className="text-cognac-primery leading-5.5">
                    افزودن آدرس جدید
                  </p>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div>{children}</div>
      </div>
      {isOpenLogoutModal && (
        <DeleteModal
          handleCloseModal={handleCloseLogoutModal}
          handleAction={handleLogout}
          title={"خروج از حساب کاربری"}
          subtitle={"آیا میخواهید از حساب کاربری خود خارج شوید؟"}
          actiontitle={"خروج"}
        />
      )}
      {isOpenAddAddressModal && (
        <AddAddressModal
          handleCloseModal={handleCloseAddAddressModal}
          handleOpenDetailsModal={handleOpenDetailsModal}
        />
      )}
      {isOpenDetailsModal && (
        <DetailsModalAddAddress handleCloseModal={handleCloseDetailsModal} />
      )}
    </div>
  );
}
