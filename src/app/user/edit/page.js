"use client";
import UserPannel from "@/components/user/UserPannel";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
  const [firstName, setFirstName] = useState("ارزو");
  const [lastName, setLastName] = useState("علیزاده");
  const [phone, setPhone] = useState("۹۱۲۱۲۳۴۵۶۷");
  const [email, setEmail] = useState("اrwish1377@gmail.com");
  const [isEdited, setIsEdited] = useState(false);
  const router = useRouter();
  //AI
  const [isFocused, setIsFocused] = useState({
    firstName: false,
    lastName: false,
    email: false,
  });
  const floatLabel = (value, focus) =>
    value || focus ? "-top-2.5" : "top-4.5";

  return (
    <>
      <div className="container mx-auto px-5 py-6 lg:hidden">
        <div className="flex justify-between items-center mb-8 lg:hidden">
          <Image
            width={24}
            height={24}
            className="cursor-pointer"
            src="/img/arrow-right-6.svg"
            alt=""
            onClick={() => router.back()}
          />
          <p className="font-semibold text-xl leading-6 text-neutral-gray-13">
            اطلاعات حساب کاربری
          </p>
          <div></div>
        </div>
        <div>
          <div className="relative border border-neutral-gray-4 px-4 py-3.75 rounded-lg mb-4">
            <input
              type="text"
              id="firstName"
              placeholder=" "
              value={firstName}
              //AI
              onFocus={() =>
                setIsFocused((prev) => ({ ...prev, firstName: true }))
              }
              onBlur={() =>
                setIsFocused((prev) => ({ ...prev, firstName: false }))
              }
              onChange={(e) => {
                setFirstName(e.target.value);
                setIsEdited(true);
              }}
              className="w-full outline-none text-neutral-gray-7 placeholder:text-transparent"
            />
            {/* AI */}
            <label
              htmlFor="firstName"
              className={`absolute right-4 bg-white px-1 text-xs text-neutral-gray-7 transition-all ${floatLabel(
                firstName,
                isFocused.firstName
              )}`}
            >
              نام
            </label>
          </div>

          <div className="relative border border-neutral-gray-4 px-4 py-3.75 rounded-lg mb-4">
            <input
              type="text"
              id="lastName"
              placeholder=" "
              value={lastName}
              onFocus={() =>
                setIsFocused((prev) => ({ ...prev, lastName: true }))
              }
              onBlur={() =>
                setIsFocused((prev) => ({ ...prev, lastName: false }))
              }
              onChange={(e) => {
                setLastName(e.target.value);
                setIsEdited(true);
              }}
              className="w-full outline-none text-neutral-gray-7 placeholder:text-transparent"
            />
            <label
              htmlFor="lastName"
              className={`absolute right-4 bg-white px-1 text-xs text-neutral-gray-7 transition-all ${floatLabel(
                lastName,
                isFocused.lastName
              )}`}
            >
              نام خانوادگی
            </label>
          </div>

          <div className="relative border border-neutral-gray-4 bg-neutral-gray-2 rounded-lg flex mb-4">
            <div className="w-full outline-none py-3.75 px-4 text-neutral-gray-7 text-left">
              {phone}
            </div>
            <label
              htmlFor="phone"
              className="absolute right-4 bg-transparent px-1 text-xs text-neutral-gray-7 transition-all z-10 -top-2.5"
            >
              شماره موبایل
            </label>
            <div className="bg-neutral-gray-2 text-neutral-gray-7 p-4 border-r border-neutral-gray-4 rounded-tl-lg rounded-bl-lg max-w-13 text-xs leading-4.5">
              ۹۸+
            </div>
          </div>

          <div className="relative border border-neutral-gray-4 px-4 py-3.75 rounded-lg mb-4">
            <input
              type="text"
              id="email"
              dir="ltr"
              placeholder=" "
              value={email}
              onFocus={() => setIsFocused((prev) => ({ ...prev, email: true }))}
              onBlur={() => setIsFocused((prev) => ({ ...prev, email: false }))}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsEdited(true);
              }}
              className="placeholder:text-transparent w-full outline-none text-neutral-gray-7"
            />
            <label
              htmlFor="email"
              className={`absolute right-4 bg-white px-1 text-xs text-neutral-gray-7 transition-all ${floatLabel(
                email,
                isFocused.email
              )}`}
            >
              آدرس ایمیل (اختیاری)
            </label>
          </div>
        </div>

        <div className="w-full mt-66.5">
          <button className="bg-cognac-tint-2 text-cognac-tint-4 py-3.25 px-31.5 rounded-lg w-full mb-4 cursor-pointer">
            ذخیره تغییرات
          </button>
          <button className="bg-white text-cognac-tint-7 border border-cognac-tint-7 py-3.25 px-37.5 rounded-lg w-full cursor-pointer">
            انصراف
          </button>
        </div>
      </div>

      <div className="hidden lg:block">
        <UserPannel rout={"edit"}>
          <div>
            <div className="flex items-center gap-6.25 mt-6">
              <div className="relative w-1/2 border border-neutral-gray-4 px-4 py-3.75 rounded-lg mb-4">
                <input
                  type="text"
                  id="firstName-desktop"
                  placeholder=" "
                  value={firstName}
                  onFocus={() =>
                    setIsFocused((prev) => ({ ...prev, firstName: true }))
                  }
                  onBlur={() =>
                    setIsFocused((prev) => ({ ...prev, firstName: false }))
                  }
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setIsEdited(true);
                  }}
                  className="w-full outline-none text-neutral-gray-7 placeholder:text-transparent"
                />
                <label
                  htmlFor="firstName-desktop"
                  className={`absolute right-4 bg-white px-1 text-xs text-neutral-gray-7 transition-all ${floatLabel(
                    firstName,
                    isFocused.firstName
                  )}`}
                >
                  نام
                </label>
              </div>

              <div className="relative w-1/2 border border-neutral-gray-4 px-4 py-3.75 rounded-lg mb-4">
                <input
                  type="text"
                  id="lastName-desktop"
                  placeholder=" "
                  value={lastName}
                  onFocus={() =>
                    setIsFocused((prev) => ({ ...prev, lastName: true }))
                  }
                  onBlur={() =>
                    setIsFocused((prev) => ({ ...prev, lastName: false }))
                  }
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setIsEdited(true);
                  }}
                  className="w-full outline-none text-neutral-gray-7 placeholder:text-transparent"
                />
                <label
                  htmlFor="lastName-desktop"
                  className={`absolute right-4 bg-white px-1 text-xs text-neutral-gray-7 transition-all ${floatLabel(
                    lastName,
                    isFocused.lastName
                  )}`}
                >
                  نام خانوادگی
                </label>
              </div>
            </div>

            <div className="flex items-center gap-6.25 mt-4">
              <div className="relative w-1/2 border border-neutral-gray-4 bg-neutral-gray-2 rounded-lg flex mb-4">
                <div className="w-full outline-none py-3.75 px-4 text-neutral-gray-7 text-left">
                  {phone}
                </div>
                <label
                  htmlFor="phone-desktop"
                  className="absolute right-4 bg-transparent px-1 text-xs text-neutral-gray-7 transition-all z-10 -top-2.5"
                >
                  شماره موبایل
                </label>
                <div className="bg-neutral-gray-2 text-neutral-gray-7 p-4 border-r border-neutral-gray-4 rounded-tl-lg rounded-bl-lg max-w-13 text-xs leading-4.5">
                  ۹۸+
                </div>
              </div>

              <div className="relative w-1/2 border border-neutral-gray-4 px-4 py-3.75 rounded-lg mb-4">
                <input
                  type="text"
                  id="email-desktop"
                  dir="ltr"
                  placeholder=" "
                  value={email}
                  onFocus={() =>
                    setIsFocused((prev) => ({ ...prev, email: true }))
                  }
                  onBlur={() =>
                    setIsFocused((prev) => ({ ...prev, email: false }))
                  }
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsEdited(true);
                  }}
                  className="placeholder:text-transparent w-full outline-none text-neutral-gray-7"
                />
                <label
                  htmlFor="email-desktop"
                  className={`absolute right-4 bg-white px-1 text-xs text-neutral-gray-7 transition-all ${floatLabel(
                    email,
                    isFocused.email
                  )}`}
                >
                  آدرس ایمیل (اختیاری)
                </label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 mt-38 mb-6">
            <button className="bg-white text-cognac-tint-7 border border-cognac-tint-7 py-3.25 px-22 rounded-lg cursor-pointer">
              انصراف
            </button>
            <button
              className={`${
                isEdited
                  ? "bg-cognac-primery text-white"
                  : "bg-cognac-tint-2 text-cognac-tint-4"
              } py-3.25 px-16 rounded-lg cursor-pointer`}
            >
              ذخیره تغییرات
            </button>
          </div>
        </UserPannel>
      </div>
    </>
  );
}
