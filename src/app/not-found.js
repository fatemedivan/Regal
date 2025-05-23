"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="mt-35 mb-6 mx-5 lg:mb-33.75 lg:mt-26">
      <div className="flex justify-center items-center mb-55.5 lg:mb-8">
        <div>
          <Image
            width={180}
            height={162}
            className="lg:w-62.5 lg:h-56.5"
            src="/img/error-404.svg"
            alt=""
          />
          <p className="leading-7 text-neutral-gray-9 mt-6 text-center">
            صفحه مورد نظر پیدا نشد!
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={() => router.back()}
          className="text-sm leading-5 bg-cognac-primery rounded-lg py-3.5 px-20 sm:px-30 text-white cursor-pointer lg:text-[1rem] lg:leading-5.5 lg:px-12"
        >
          بازگشت
        </button>
      </div>
    </div>
  );
}
