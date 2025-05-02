"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserPannel({ children, isInEdit }) {
  const pathname = usePathname();
  return (
    <div className="container mx-auto pt-8 px-5 pb-66.5 lg:px-12 lg:pt-12 lg:pb-22 lg:flex lg:gap-4">
      <div>
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
                ۰۹۱۶۲۴۳۵۷۳۷
              </p>
            </div>
          </div>
          <Link href={"/user-dashboard/edit-user-pannel"}>
            <div className="flex items-start gap-2 lg:hidden">
              <Image width={16} height={16} src="/img/edit-3.svg" alt="" />
              <p className="text-cognac-primery text-sm leading-5">ویرایش</p>
            </div>
          </Link>
        </div>
        <div className="border border-neutral-gray-4 rounded-xl px-7 py-5 mt-4">
          <div
            className={`flex items-center gap-2 mb-5 pb-5  border-b border-neutral-gray-4 lg:border-t-0 lg:border-b-0 lg:border-l-0 lg:pb-3 lg:mb-0 lg:rounded-lg  lg:p-3 lg:border-neutral-gray-8 transition-all cursor-pointer ${
              pathname.includes("/user-dashboard/edit-user-pannel") &&
              "lg:bg-neutral-gray-1 lg:border-r-4"
            }`}
          >
            {pathname.includes("/user-dashboard/edit-user-pannel") ? <Image width={20} height={20} src="/img/user-bold-3.svg" alt="" /> : <Image width={20} height={20} src="/img/user-3.svg" alt="" />}
            <p className="text-sm leading-6 text-neutral-gray-11">
              حساب کاربری
            </p>
          </div>
          <div className="flex items-center gap-2 mb-5 pb-5 border-b border-neutral-gray-4 lg:border-t-0 lg:border-b-0 lg:border-l-0 lg:pb-3 lg:mb-0  lg:rounded-lg lg:p-3 lg:border-neutral-gray-8 transition-all cursor-pointer">
            <Image width={20} height={20} src="/img/wallet-2.svg" alt="" />
            <p className="text-sm leading-6 text-neutral-gray-11">
              پیگیری سفارشات
            </p>
          </div>
          <div className="flex items-center gap-2 mb-5 pb-5 border-b border-neutral-gray-4 lg:border-t-0 lg:border-b-0 lg:border-l-0 lg:pb-3 lg:mb-0  lg:rounded-lg lg:p-3 lg:border-neutral-gray-8 transition-all cursor-pointer">
            <Image width={20} height={20} src="/img/heart-3.svg" alt="" />
            <p className="text-sm leading-6 text-neutral-gray-11">
              علاقمندی‌ها
            </p>
          </div>
          <div className="flex items-center gap-2 mb-5 pb-5 border-b border-neutral-gray-4 lg:border-t-0 lg:border-b-0 lg:border-l-0 lg:pb-3 lg:mb-0  lg:rounded-lg lg:p-3 lg:border-neutral-gray-8 transition-all cursor-pointer">
            <Image width={20} height={20} src="/img/location-2.svg" alt="" />
            <p className="text-sm leading-6 text-neutral-gray-11">
              آدرس‌های من
            </p>
          </div>
          <div className="flex items-center gap-2 lg:border-t-0 lg:border-b-0 lg:border-l-0 lg:mb-0  lg:rounded-lg lg:p-3 lg:border-neutral-gray-8 transition-all cursor-pointer">
            <Image width={20} height={20} src="/img/logout.svg" alt="" />
            <p className="text-sm leading-6 text-error-primery">خروج</p>
          </div>
        </div>
      </div>
      <div className="hidden lg:block border border-neutral-gray-4 rounded-xl p-6 flex-1">
        <div className="pb-9 mb-6 border-b border-neutral-gray-4 flex justify-between items-center">
          <h6 className="text-neutral-gray-13 text-lg font-bold leading-5.5">
            اطلاعات حساب کاربری
          </h6>

          {!isInEdit && (
            <Link href={"/user-dashboard/edit-user-pannel"}>
              <div className="flex items-center gap-2 px-9 py-3.25">
                <Image width={16} height={16} src="/img/edit-3.svg" alt="" />
                <p className="text-cognac-primery leading-5.5">
                  ویرایش اطلاعات
                </p>
              </div>
            </Link>
          )}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
