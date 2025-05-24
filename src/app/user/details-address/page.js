"use client";
import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Page() {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [details, setDetails] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [token, setToken] = useState("");
  const [addressId, setAddressId] = useState(null);
  const [isOpenProvince, setIsOpenProvince] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const [isBluredCity, setIsBluredCity] = useState(false);
  const [isBluredPostalCode, setIsBluredPostalCode] = useState(false);
  const [isBluredDetail, setIsBluredDetail] = useState(false);

  const isValidProvince = province.length >= 2 && province.length <= 32;
  const isValidCity = city.length >= 2 && city.length <= 32;
  const isValidPostalCode = /^[0-9]{6,10}$/.test(postalCode);
  const isValidDetail = details.length >= 4 && details.length <= 32;
  const isValidFullAddress =
    fullAddress.length >= 32 && fullAddress.length <= 255;
  const isValidAll =
    isValidCity &&
    isValidProvince &&
    isValidPostalCode &&
    isValidDetail &&
    isValidFullAddress;
    
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

  const { phoneNumber } = useAuthContext();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const storedFullAddress = sessionStorage.getItem("full address");
    if (storedFullAddress) {
      setFullAddress(storedFullAddress);
    }
  }, []);

  useEffect(() => {
    setAddressId(sessionStorage.getItem("addressId"));
  }, []);

  const addAdress = async () => {
    try {
      if (!token && !addressId) return;
      setIsLoading(true);
      const url = addressId
        ? `${baseUrl}/user/addresses/${addressId}`
        : `${baseUrl}/user/addresses`;

      const method = addressId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          province: province,
          city: city,
          postalCode: postalCode,
          fullAddress: fullAddress.slice(0, 254),
          detail: details,
        }),
      });
      setIsLoading(false);

      if (res.ok) {
        toast.success("ادرس با موفقیت اضافه شد");
        sessionStorage.removeItem("addressId");
        setTimeout(() => {
          router.push("/user/addresses");
        }, 2500);
      } else {
        toast.error("ناموفق");
      }
    } catch (error) {
      toast.error("خطایی رخ داد");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token && !addressId) return;
    const getAddress = async () => {
      const res = await fetch(`${baseUrl}/user/addresses/${addressId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
      const data = await res.json();
      if (data) {
        setProvince(data.province || "");
        setCity(data.city || "");
        setDetails(data.detail || "");
        setPostalCode(data.postalCode || "");
      }
    };
    getAddress();
  }, [token]);

  const iranProvinces = [
    "آذربایجان شرقی",
    "آذربایجان غربی",
    "اردبیل",
    "اصفهان",
    "البرز",
    "ایلام",
    "بوشهر",
    "تهران",
    "چهارمحال و بختیاری",
    "خراسان جنوبی",
    "خراسان رضوی",
    "خراسان شمالی",
    "خوزستان",
    "زنجان",
    "سمنان",
    "سیستان و بلوچستان",
    "فارس",
    "قزوین",
    "قم",
    "کردستان",
    "کرمان",
    "کرمانشاه",
    "کهگیلویه و بویراحمد",
    "گلستان",
    "گیلان",
    "لرستان",
    "مازندران",
    "مرکزی",
    "هرمزگان",
    "همدان",
    "یزد",
  ];

  return (
    <div className="container mx-auto px-5 py-6">
      <ToastContainer autoClose={2000} className={"custom-toast-container"} />
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
        <textarea
          onChange={(e) => setFullAddress(e.target.value)}
          maxLength={255}
          className="text-neutral-gray-11 text-sm leading-5 w-full resize-none outline-non"
          defaultValue={fullAddress && fullAddress.slice(0.254)}
        />
        <p className="absolute right-4 -top-2 bg-white px-1 text-neutral-gray-7 text-xs leading-4.5">
          آدرس کامل
        </p>
      </div>
      {!isValidFullAddress && (
        <p className="text-xs leading-4.5 my-3 transition duration-200 ease-in-out text-error-primery">
          ادرس کامل باید حداقل ۳۲ و حداکثر۲۵۵ حرف باشد
        </p>
      )}

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
            onBlur={() => {
              setIsFocused((prev) => ({ ...prev, city: false }));
              setIsBluredCity(true);
            }}
            onChange={(e) => {
              setCity(e.target.value);
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
        {isBluredCity && !isValidCity && (
          <p className="text-xs leading-4.5 my-3 transition duration-200 ease-in-out text-error-primery">
            شهر باید حداقل ۲ و حداکثر ۳۲ حرف باشد
          </p>
        )}
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
            <ul className="absolute w-full top-14 right-0 z-20 bg-white border border-neutral-gray-4 mt-1 rounded-lg shadow-lg text-sm max-h-50 overflow-y-scroll custom-scrollbar">
              {iranProvinces.map((option) => (
                <li
                  key={option}
                  onClick={() => {
                    setIsOpenProvince(false);
                    setProvince(option);
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
            onBlur={() => {
              setIsFocused((prev) => ({ ...prev, details: false }));
              setIsBluredDetail(true);
            }}
            onChange={(e) => {
              setDetails(e.target.value);
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
        {isBluredDetail && !isValidDetail && (
          <p className="text-xs leading-4.5 my-3 transition duration-200 ease-in-out text-error-primery">
            جزئیات باید حداقل ۴ و حداکثر ۳۲ حرف باشد
          </p>
        )}
        <div className="relative border border-neutral-gray-4 px-4 py-3.75 rounded-lg mb-4">
          <input
            type="text"
            id="postalcode"
            placeholder=" "
            value={postalCode}
            onFocus={() =>
              setIsFocused((prev) => ({ ...prev, postalcode: true }))
            }
            onBlur={() => {
              setIsFocused((prev) => ({ ...prev, postalcode: false }));
              setIsBluredPostalCode(true);
            }}
            onChange={(e) => {
              setPostalCode(e.target.value);
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
        {isBluredPostalCode && !isValidPostalCode && (
          <p className="text-xs leading-4.5 my-3 transition duration-200 ease-in-out text-error-primery">
            کد پستی باید حداقل ۶ و حداکثر ۱۰ حرف انگلیسی باشد
          </p>
        )}
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
          <div className="w-full outline-none py-3.75 px-4 bg-neutral-gray-2 text-neutral-gray-7 text-left">
            {phoneNumber}
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
        <div className="flex items-center justify-center">
          <button
            disabled={!isValidAll}
            onClick={() => addAdress()}
            className={`leading-5.5 rounded-lg py-3.25 w-full cursor-pointer flex justify-center items-center ${
              isValidAll
                ? "bg-cognac-primery text-white"
                : "bg-cognac-tint-2 text-cognac-tint-4"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[0ms]"></div>
                <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[150ms]"></div>
                <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[300ms]"></div>
              </div>
            ) : (
              "ثبت آدرس"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
