"use client";
import UserPannel from "@/components/user/UserPannel";
import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoaading] = useState(false);
  const [isBluredFirstName, setIsBluredFirstName] = useState(false);
  const [isBluredLastName, setIsBluredLastName] = useState(false);
  const [isBluredEmail, setIsBluredEmail] = useState(false);
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const emailRegex = /^(?=.{1,64}$)[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);
  const isValidFirstName = firstName.length >= 3 && firstName.length <= 32;
  const isValidLastName = lastName.length >= 3 && lastName.length <= 32;
  //AI
  const [isFocused, setIsFocused] = useState({
    firstName: false,
    lastName: false,
    email: false,
  });
  const floatLabel = (value, focus) =>
    value || focus ? "-top-2.5" : "top-4.5";

  const { phoneNumber } = useAuthContext();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const editUser = async () => {
    setIsLoaading(true);
    try {
      const res = await fetch(`${baseUrl}/user`, {
        method: "PATCH",
        body: JSON.stringify({
          "name": firstName,
          "family": lastName,
          "email": email,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("response : ", res);
      if (!res.ok) {
        toast.error(res.message);
      }else{
        toast.success('با موفقیت ذخیره شد')
      }
      setIsLoaading(false);
    } catch (error) {
      console.log(error);
      toast.error("خطایی رخ داد");
      setIsLoaading(false);
    }
  };
  const resetStates = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
  };
  return (
    <>
      <ToastContainer autoClose={2000} className={"custom-toast-container"} />
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
          <div
            className={`relative border border-neutral-gray-4 px-4 py-3.75 rounded-lg ${
              isBluredFirstName && !isValidFirstName ? "mb-0" : "mb-4"
            }`}
          >
            <input
              type="text"
              maxLength={12}
              id="firstName"
              placeholder=" "
              value={firstName}
              //AI
              onFocus={() =>
                setIsFocused((prev) => ({ ...prev, firstName: true }))
              }
              onBlur={() => {
                setIsFocused((prev) => ({ ...prev, firstName: false }));
                setIsBluredFirstName(true);
              }}
              onChange={(e) => {
                setFirstName(e.target.value);
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
          {isBluredFirstName && !isValidFirstName && (
            <p className="text-xs leading-4.5 mt-4 transition duration-200 ease-in-out text-error-primery mb-4 lg:hidden">
              اسم باید حداقل ۳ و حداکثر ۱۲ کاراکتر باشد
            </p>
          )}

          <div
            className={`relative border border-neutral-gray-4 px-4 py-3.75 rounded-lg mb-4 ${
              isBluredLastName && !isValidLastName ? "mb-0" : "mb-4"
            }`}
          >
            <input
              type="text"
              maxLength={20}
              id="lastName"
              placeholder=" "
              value={lastName}
              onFocus={() =>
                setIsFocused((prev) => ({ ...prev, lastName: true }))
              }
              onBlur={() => {
                setIsFocused((prev) => ({ ...prev, lastName: false }));
                setIsBluredLastName(true);
              }}
              onChange={(e) => {
                setLastName(e.target.value);
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
          {isBluredLastName && !isValidLastName && (
            <p className="text-xs leading-4.5 mt-4 transition duration-200 ease-in-out text-error-primery mb-4 lg:hidden">
              نام خانوادگی باید حداقل ۳ و حداکثر ۱۲ کاراکتر باشد
            </p>
          )}
          <div className="relative border border-neutral-gray-4 bg-neutral-gray-2 rounded-lg flex mb-4">
            <div className="w-full outline-none py-3.75 px-4 text-neutral-gray-7 text-left">
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

          <div
            className={`relative border border-neutral-gray-4 px-4 py-3.75 rounded-lg ${
              isBluredEmail && !isValidEmail ? "mb-0" : "mb-4"
            }`}
          >
            <input
              type="text"
              id="email"
              dir="ltr"
              placeholder=" "
              value={email}
              onFocus={() => setIsFocused((prev) => ({ ...prev, email: true }))}
              onBlur={() => {
                setIsFocused((prev) => ({ ...prev, email: false }));
                setIsBluredEmail(true);
              }}
              onChange={(e) => {
                setEmail(e.target.value);
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
              آدرس ایمیل
            </label>
          </div>
        </div>
        {isBluredEmail && !isValidEmail && (
          <p className="text-xs leading-4.5 mt-4 transition duration-200 ease-in-out text-error-primery mb-4 lg:hidden">
            ایمیل را با فرمت abc@gmail.com وارد کنید
          </p>
        )}
        <div className="w-full mt-66.5">
          <button
            onClick={() => editUser()}
            disabled={!(isValidFirstName && isValidLastName && isValidEmail)}
            className={`${
              isValidFirstName && isValidLastName && isValidEmail
                ? "bg-cognac-primery text-white"
                : "bg-cognac-tint-2 text-cognac-tint-4"
            } py-3.25 px-31.5 rounded-lg w-full mb-4 cursor-pointer`}
          >
            {isLoading ? (
              <div className="flex justify-center items-center gap-2  py-1.5">
                <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[0ms]"></div>
                <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[150ms]"></div>
                <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[300ms]"></div>
              </div>
            ) : (
              "ذخیره تغییرات"
            )}
          </button>
          <button
            onClick={() => resetStates()}
            className="bg-white text-cognac-tint-7 border border-cognac-tint-7 py-3.25 px-37.5 rounded-lg w-full cursor-pointer"
          >
            انصراف
          </button>
        </div>
      </div>

      <div className="hidden lg:block">
        <UserPannel rout={"edit"}>
          <div>
            <div className="flex items-center gap-6.25 mt-6">
              <div className="w-1/2">
                <div className="relative border border-neutral-gray-4 px-4 py-3.75 rounded-lg mb-4">
                  <input
                    type="text"
                    id="firstName-desktop"
                    maxLength={12}
                    placeholder=" "
                    value={firstName}
                    onFocus={() =>
                      setIsFocused((prev) => ({ ...prev, firstName: true }))
                    }
                    onBlur={() => {
                      setIsFocused((prev) => ({ ...prev, firstName: false }));
                      setIsBluredFirstName(true);
                    }}
                    onChange={(e) => {
                      setFirstName(e.target.value);
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
                {isBluredFirstName && !isValidFirstName && (
                  <p className="text-xs leading-4.5 mt-4 transition duration-200 ease-in-out text-error-primery">
                    اسم باید حداقل ۳ و حداکثر ۱۲ کاراکتر باشد
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <div className="relative border border-neutral-gray-4 px-4 py-3.75 rounded-lg mb-4">
                  <input
                    type="text"
                    id="lastName-desktop"
                    maxLength={20}
                    placeholder=" "
                    value={lastName}
                    onFocus={() =>
                      setIsFocused((prev) => ({ ...prev, lastName: true }))
                    }
                    onBlur={() => {
                      setIsFocused((prev) => ({ ...prev, lastName: false }));
                      setIsBluredLastName(true);
                    }}
                    onChange={(e) => {
                      setLastName(e.target.value);
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
                {isBluredLastName && !isValidLastName && (
                  <p className="text-xs leading-4.5 mt-4 transition duration-200 ease-in-out text-error-primery">
                    نام خانوادگی باید حداقل ۳ و حداکثر ۱۲ کاراکتر باشد
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-6.25 mt-4">
              <div className="relative w-1/2 border border-neutral-gray-4 bg-neutral-gray-2 rounded-lg flex mb-4">
                <div className="w-full outline-none py-3.75 px-4 text-neutral-gray-7 text-left">
                  {phoneNumber}
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

              <div className="w-1/2">
                <div className="relative border border-neutral-gray-4 px-4 py-3.75 rounded-lg mb-4">
                  <input
                    type="text"
                    id="email-desktop"
                    dir="ltr"
                    placeholder=" "
                    value={email}
                    onFocus={() =>
                      setIsFocused((prev) => ({ ...prev, email: true }))
                    }
                    onBlur={() => {
                      setIsFocused((prev) => ({ ...prev, email: false }));
                      setIsBluredEmail(true);
                    }}
                    onChange={(e) => {
                      setEmail(e.target.value);
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
                    آدرس ایمیل
                  </label>
                </div>
                {isBluredEmail && !isValidEmail && (
                  <p className="text-xs leading-4.5 mt-4 transition duration-200 ease-in-out text-error-primery">
                    ایمیل را با فرمت abc@gmail.com وارد کنید
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 mt-38 mb-6">
            <button
              onClick={() => resetStates()}
              className="bg-white text-cognac-tint-7 border border-cognac-tint-7 py-3.25 px-22 rounded-lg cursor-pointer"
            >
              انصراف
            </button>
            <button
              disabled={!(isValidFirstName && isValidLastName && isValidEmail)}
              onClick={() => editUser()}
              className={`${
                isValidFirstName && isValidLastName && isValidEmail
                  ? "bg-cognac-primery text-white"
                  : "bg-cognac-tint-2 text-cognac-tint-4"
              } py-3.25 px-16 rounded-lg cursor-pointer`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2 py-1.5">
                  <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[0ms]"></div>
                  <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[150ms]"></div>
                  <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[300ms]"></div>
                </div>
              ) : (
                "ذخیره تغییرات"
              )}
            </button>
          </div>
        </UserPannel>
      </div>
    </>
  );
}
