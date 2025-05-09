"use client";
import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [details, setDetails] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [isOpenProvince, setIsOpenProvince] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  //AI
  const [isFocused, setIsFocused] = useState({
    city: false,
    province: false,
    details: false,
    postalcode: false,
    firstname: false,
    lastname: false,
    phone: false,
  });
  const floatLabel = (value, focus) =>
    value || focus ? "-top-2.5" : "top-4.5";

   const {phoneNumber} = useAuthContext()
    useEffect(() => {
     setPhone(phoneNumber)
    }, [phoneNumber])
  return (
    <div className="container mx-auto px-5 py-6">
      <div className="flex justify-between items-center mb-9">
        <Image
          width={24}
          height={24}
          className="cursor-pointer"
          src="/img/arrow-right-6.svg"
          alt=""
          onClick={() => router.back()}
        />
        <p className="font-semibold text-xl leading-6 text-neutral-gray-13">
          جزئیات آدرس
        </p>
        <div></div>
      </div>
      <div className="px-4 pt-4 pb-9.5 border border-neutral-gray-4 rounded-lg relative">
        <p className="text-neutral-gray-11 text-sm leading-5">
          تهران، نیاوران، تنگستان چهارم، مجتمع حیات سبز، طبقه چهارم، واحد ۱۳۲
        </p>
        <p className="absolute right-4 -top-2 bg-white px-1 text-neutral-gray-7 text-xs leading-4.5">
          آدرس کامل
        </p>
      </div>
      <Link href={"/user/add-address"}>
        <div className="flex gap-2 items-center mt-4.5 cursor-pointer">
          <p className="text-cognac-primery text-sm leading-5">
            اصلاح آدرس روی نقشه
          </p>
          <Image
            width={16}
            height={16}
            src="/img/arrow-left-primery.svg"
            alt=""
          />
        </div>
      </Link>
      <div className="mt-6.5">
        <div className="relative border border-neutral-gray-4 px-4 py-3.75 rounded-lg mb-4">
          <input
            type="text"
            id="city"
            placeholder=" "
            value={city}
            onFocus={() => setIsFocused((prev) => ({ ...prev, city: true }))}
            onBlur={() => setIsFocused((prev) => ({ ...prev, city: false }))}
            onChange={(e) => {
              setCity(e.target.value);
              setIsEdited(true);
            }}
            className="w-full outline-none text-neutral-gray-7 placeholder:text-transparent"
          />
          <label
            htmlFor="city"
            className={`absolute right-4 bg-white px-1 text-xs text-neutral-gray-7 transition-all ${floatLabel(
              city,
              isFocused.city
            )}`}
          >
            شهر
          </label>
        </div>
        <div
          onClick={() => setIsOpenProvince(!isOpenProvince)}
          className="relative flex justify-between items-center border border-neutral-gray-4 px-4 py-3.75 rounded-lg mb-4 cursor-pointer"
        >
          <div className="cursor-pointer">
            {province ? (
              <p className="text-xs leading-4.5 text-neutral-gray-7">
                {province}
              </p>
            ) : (
              <p
                className={`text-xs leading-4.5 text-neutral-gray-7 absolute -top-3 bg-white px-1 ${
                  isOpenProvince ? "-top-3" : "top-4"
                } `}
              >
                استان
              </p>
            )}
          </div>

          <img
            src="/img/arrow-down-3.svg"
            className={`${
              isOpenProvince ? "rotate-180" : "rotate-0"
            } transition`}
            onClick={() => setIsOpenProvince(!isOpenProvince)}
            alt=""
          />
          {isOpenProvince && (
            <ul className="absolute w-full top-14 right-0 z-20 bg-white border border-neutral-gray-4 mt-1 rounded-lg shadow-lg text-sm">
              {["تهران", "اصفهان", "شیراز", "مشهد"].map((option) => (
                <li
                  key={option}
                  onClick={() => {
                    setIsOpenProvince(false);
                    setProvince(option);
                    setIsEdited(true);
                  }}
                  className="px-4 py-2 hover:bg-neutral-gray-2 cursor-pointer text-xs leading-4.5 text-neutral-gray-7"
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="relative border border-neutral-gray-4 px-4 py-3.75 rounded-lg mb-4">
          <input
            type="text"
            id="details"
            placeholder=" "
            value={details}
            onFocus={() => setIsFocused((prev) => ({ ...prev, details: true }))}
            onBlur={() => setIsFocused((prev) => ({ ...prev, details: false }))}
            onChange={(e) => {
              setDetails(e.target.value);
              setIsEdited(true);
            }}
            className="w-full outline-none text-neutral-gray-7 placeholder:text-transparent"
          />
          <label
            htmlFor="details"
            className={`absolute right-4 bg-white px-1 text-xs text-neutral-gray-7 transition-all ${floatLabel(
              details,
              isFocused.details
            )}`}
          >
            جزئیات آدرس (پلاک، طبقه و ...)
          </label>
        </div>
        <div className="relative border border-neutral-gray-4 px-4 py-3.75 rounded-lg mb-4">
          <input
            type="text"
            id="postalcode"
            placeholder=" "
            value={postalCode}
            onFocus={() =>
              setIsFocused((prev) => ({ ...prev, postalcode: true }))
            }
            onBlur={() =>
              setIsFocused((prev) => ({ ...prev, postalcode: false }))
            }
            onChange={(e) => {
              setPostalCode(e.target.value);
              setIsEdited(true);
            }}
            className="w-full outline-none text-neutral-gray-7 placeholder:text-transparent"
          />
          <label
            htmlFor="postalcode"
            className={`absolute right-4 bg-white px-1 text-xs text-neutral-gray-7 transition-all ${floatLabel(
              postalCode,
              isFocused.postalcode
            )}`}
          >
            کد پستی
          </label>
        </div>
        <div className="flex items-center gap-2 mt-6 mb-4">
          <label className="relative">
            <input type="checkbox" className="peer hidden" />
            <div className='w-5 h-5 rounded-sm border border-neutral-gray-5 relative flex items-center justify-center cursor-pointer before:content-[""] before:absolute before:w-1.5 before:h-2.5 before:border-r-2 before:border-b-2 before:border-neutral-gray-10 before:rotate-45 before:opacity-0 peer-checked:before:opacity-100'></div>
          </label>
          <p className="text-neutral-gray-13 text-sm leading-6">
            گیرنده سفارش خودم هستم
          </p>
        </div>
        <div className="relative border border-neutral-gray-4 rounded-lg mb-4">
          <input
            type="text"
            id="firstName-desktop"
            placeholder=" "
            value={firstName}
            onFocus={() =>
              setIsFocused((prev) => ({ ...prev, firstname: true }))
            }
            onBlur={() =>
              setIsFocused((prev) => ({ ...prev, firstname: false }))
            }
            onChange={(e) => {
              setFirstName(e.target.value);
              setIsEdited(true);
            }}
            className="w-full outline-none text-neutral-gray-7 placeholder:text-transparent px-4 py-3.25 focus:bg-neutral-gray-2"
          />
          <label
            htmlFor="firstName-desktop"
            className={`absolute right-4 bg-transparent px-1 text-xs text-neutral-gray-7 transition-all ${floatLabel(
              firstName,
              isFocused.firstname
            )}`}
          >
            نام گیرنده
          </label>
        </div>
        <div className="relative border border-neutral-gray-4 rounded-lg mb-4">
          <input
            type="text"
            id="lastName-desktop"
            placeholder=" "
            value={lastName}
            onFocus={() =>
              setIsFocused((prev) => ({ ...prev, lastname: true }))
            }
            onBlur={() =>
              setIsFocused((prev) => ({ ...prev, lastname: false }))
            }
            onChange={(e) => {
              setLastName(e.target.value);
              setIsEdited(true);
            }}
            className="w-full outline-none text-neutral-gray-7 placeholder:text-transparent px-4 py-3.25 focus:bg-neutral-gray-2"
          />
          <label
            htmlFor="lastName-desktop"
            className={`absolute right-4 bg-transparent px-1 text-xs text-neutral-gray-7 transition-all ${floatLabel(
              lastName,
              isFocused.lastname
            )}`}
          >
            نام خانوادگی گیرنده
          </label>
        </div>
        <div className="relative border border-neutral-gray-4 rounded-lg flex mb-4">
          <input
            type="text"
            id="phone-desktop"
            dir="ltr"
            placeholder=" "
            value={phone}
            onFocus={() => setIsFocused((prev) => ({ ...prev, phone: true }))}
            onBlur={() => setIsFocused((prev) => ({ ...prev, phone: false }))}
            onChange={(e) => {
              setPhone(e.target.value);
              setIsEdited(true);
            }}
            className="placeholder:text-transparent w-full outline-none py-3.75 px-4 text-neutral-gray-7 bg-neutral-gray-2"
          />
          <label
            htmlFor="phone-desktop"
            className={`absolute right-4 bg-transparent px-1 text-xs text-neutral-gray-7 transition-all z-10 ${floatLabel(
              phone,
              isFocused.phone
            )}`}
          >
            شماره موبایل
          </label>
          <div className="bg-neutral-gray-2 text-neutral-gray-7 p-4 border-r border-neutral-gray-4 rounded-tl-lg rounded-bl-lg max-w-13 text-xs leading-4.5">
            ۹۸+
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            className={`leading-5.5 rounded-lg py-3.25 w-full cursor-pointer ${
              isEdited
                ? "bg-cognac-primery text-white"
                : "bg-cognac-tint-2 text-cognac-tint-4"
            }`}
          >
            ثبت آدرس
          </button>
        </div>
      </div>
    </div>
  );
}
