"use client";
import UserPannel from "@/components/profile/UserPannel";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [isOpenAddAddressModal, setIsOPenAddAddressModal] = useState(false);
  const handleCloseAddressModal = () => {
    setIsOPenAddAddressModal(false);
  };
  return (
    <>
      <div className="container mx-auto px-5 py-6 lg:hidden">
        <div className="flex justify-between items-center mb-8">
          <Image
            width={24}
            height={24}
            className="cursor-pointer"
            src="/img/arrow-right-6.svg"
            alt=""
            onClick={() => router.back()}
          />
          <p className="font-semibold text-xl leading-6 text-neutral-gray-13">
            لیست آدرس‌ها
          </p>
          <div></div>
        </div>
        <div className="flex flex-col justify-center items-center gap-6 mt-28">
          <Image
            width={128}
            height={116}
            src="/img/order-not-found.svg"
            alt=""
          />
          <p className="text-sm leading-6 text-neutral-gray-9">
            شما در حال حاضر هیچ آدرسی ثبت نکرده‌اید!
          </p>
          <Link href={'/user-dashboard/addresses/add-address'}>
          <div className="mt-60 flex items-center justify-center">
            <button
              onClick={() => setIsOPenAddAddressModal(true)}
              className="bg-cognac-primery rounded-lg py-3.25 px-28.5 text-white leading-5.5 cursor-pointer"
            >
              افزودن آدرس
            </button>
          </div>
          </Link>
        </div>
      </div>

      <div className="hidden lg:block">
        <UserPannel rout={"addresses"}>
          <div className="flex flex-col justify-center items-center gap-8 my-12.5">
            <Image
              width={128}
              height={116}
              src="/img/order-not-found.svg"
              alt=""
            />
            <p className="leading-7 text-neutral-gray-9">
              شما در حال حاضر هیچ آدرسی ثبت نکرده‌اید!
            </p>

            <button
              onClick={() => setIsOPenAddAddressModal(true)}
              className="bg-cognac-primery rounded-lg py-3.25 px-12 text-white leading-5.5 cursor-pointer"
            >
              افزودن آدرس
            </button>
          </div>
        </UserPannel>
      </div>
    </>
  );
}
