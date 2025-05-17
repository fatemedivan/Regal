import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="container mx-auto lg:my-22">
      <div className="flex justify-center items-center mt-45 lg:mt-0">
        <div className="flex flex-col justify-center items-center gap-4">
            <Image width={100} height={100} src="/img/Vector.png" alt="" />
            <p className="text-neutral-gray-12 text-lg leading-7.5 lg:leading-10 lg:text-2xl">پرداخت شما با موفقیت انجام شد!</p>
        </div>
      </div>
      <div className="mt-41 lg:flex lg:flex-row-reverse lg:justify-center lg:items-center lg:gap-6">
        <Link href={'/'}>
        <button className="leading-5.5 bg-cognac-primery text-white w-full py-3.25 mb-4 rounded-lg lg:px-6.5 lg:py-3.75 lg:mb-0 cursor-pointer">بازگشت به صفحه اصلی</button>
        </Link>
        <Link href={'/user/orders'}>
        <button className="leading-5.5 border border-cognac-primery text-cognac-primery bg-white py-3.25 w-full rounded-lg mb-6 lg:py-3.75 lg:px-14 lg:mb-0 cursor-pointer">پیگیری سفارش</button>
        </Link>
      </div>
    </div>
  );
}
