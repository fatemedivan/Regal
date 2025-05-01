import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <div className="lg:flex">
      <div className="container mx-auto pt-16 px-5 pb-6 lg:px-12 lg:pt-12 lg:pb-29.5 lg:w-[55%]">
        <div className="w-full lg:w-116 lg:mx-auto">
          <div className="flex flex-col items-center justify-center mb-14">
            <Image
              width={167}
              height={73}
              src="/img/Logo.svg"
              className="mb-6"
              alt=""
            />
            <p className="font-semibold leading-5 text-neutral-gray-11 lg:font-bold lg:leading-7 lg:text-2xl">
              به <span className="text-cognac-primery">رگــــال</span> خوش آمدید
            </p>
          </div>
          <div>
            <p className="font-semibold leading-5 text-neutral-gray-13 mb-4 lg:text-lg lg:leading-5.5 lg:font-bold">
              عضویت یا ورود
            </p>
            <div className="border border-neutral-gray-4 rounded-lg flex w-full">
              <input
                type="text"
                placeholder="شماره موبایل"
                className="placeholder:text-xs placeholder:leading-4.5 placeholder:text-neutral-gray-7 w-full outline-none py-3.75 pr-4 lg:text-sm lg:leading-5"
              />
              <div className="bg-neutral-gray-2 text-neutral-gray-7 p-4 border-r border-neutral-gray-4 rounded-tl-lg rounded-bl-lg max-w-13 text-xs leading-4.5">
                ۹۸+
              </div>
            </div>
            <div className="border border-neutral-gray-4 rounded-lg mt-4 w-full">
              <input
                type="password"
                placeholder="رمز عبور"
                className="placeholder:text-xs placeholder:leading-4.5 placeholder:text-neutral-gray-7 w-full outline-none py-3.75 pr-4 lg:text-sm lg:leading-5"
              />
            </div>
            <div className="flex gap-2 mt-5">
              <label className="relative">
                <input type="checkbox" className="peer hidden" defaultChecked />
                <div className='w-6 h-6 rounded-sm border border-neutral-gray-5 relative flex items-center justify-center cursor-pointer before:content-[""] before:absolute before:w-1.5 before:h-2.5 before:border-r-2 before:border-b-2 before:border-neutral-gray-10 before:rotate-45 before:opacity-0 peer-checked:before:opacity-100'></div>
              </label>
              <p className="text-neutral-gray-9 text-xs leading-4.5 lg:text-sm lg:leading-5">
                با ورود و ثبت‌نام در سایت، با{" "}
                <a href="#" className="text-info-primery">
                  قوانین رگال
                </a>{" "}
                موافقت می‌کنم.
              </p>
            </div>
            <div className="mt-56 flex flex-col justify-center items-center lg:items-start lg:mt-7.5">
              <button className="leading-5.5 bg-neutral-gray-4 text-neutral-gray-5 rounded-lg py-3.25 px-25 cursor-pointer w-full lg:text-lg lg:leading-6.5 lg:py-3.75">
                تایید و ادامه
              </button>
              <div className="border-t border-neutral-gray-4 relative mt-6 w-full">
                <span className="bg-white px-2 text-sm leading-6 text-neutral-gray-7 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:text-[1rem] lg:leading-7">
                  یا
                </span>
              </div>
              <button className="flex items-center justify-center border border-cognac-primery gap-2 rounded-lg py-3.25 px-20 mt-6 cursor-pointer w-full lg:py-3.75">
                <Image width={16} height={16} src="/img/Google-logo.svg" alt="" />
                <p className="text-cognac-primery leading-5.5 lg:text-lg lg:leading-6.5 cursor-pointer">
                  ورود با گوگل
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Image width={546} height={690} src="/img/login.png" className="hidden lg:block w-[45%] object-cover" alt="" />
    </div>
  );
}
