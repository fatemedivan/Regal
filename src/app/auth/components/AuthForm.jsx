"use client";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import React, { useState } from "react";

export default function AuthForm({ type, onSubmit }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isBluredPhone, setIsBluredPhone] = useState(false);
  const [isBluredPassword, setIsBluredPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const phoneRegex = /^9\d{9}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,32}$/;

  const isValidPhone = phoneRegex.test(phone);
  const isValidPassword = passwordRegex.test(password);

  const handleClick = async () => {
    setIsLoading(true);
    await onSubmit(phone, password);
    setIsLoading(false);
  };

  return (
    <div className="lg:flex h-screen">
      <div className="container mx-auto pt-16 px-5 pb-6 lg:px-12 lg:pt-12 lg:pb-29.5 lg:w-[55%]">
        <ToastContainer autoClose={2000} className="custom-toast-container" />
        <div className="w-full lg:w-116 lg:mx-auto">
          <div className="flex flex-col items-center justify-center mb-14">
            <Image
              width={167}
              height={73}
              src="/img/Logo.svg"
              className="mb-6"
              alt="Logo"
            />
            <p className="font-semibold lg:font-bold lg:text-2xl">
              به <span className="text-cognac-primery">رگــــال</span> خوش آمدید
            </p>
          </div>
          <div>
            <p className="font-semibold mb-4 lg:text-lg lg:font-bold">
              {type === "login" ? "ورود" : "ثبت‌نام"}
            </p>

            {/* Phone input */}
            <div
              className={`border ${
                isBluredPhone && !isValidPhone
                  ? "border-error-primery"
                  : "border-neutral-gray-4"
              } rounded-lg flex w-full relative`}
            >
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => setIsBluredPhone(true)}
                maxLength={10}
                placeholder="شماره موبایل"
                className="w-full outline-none py-3.75 px-4 placeholder:text-xs"
              />
              <div className="bg-neutral-gray-2 text-neutral-gray-7 p-4 border-r border-neutral-gray-4 rounded-tl-lg rounded-bl-lg max-w-13 text-xs">
                ۹۸+
              </div>
            </div>
            {isBluredPhone && !isValidPhone && (
              <p className="text-xs mt-2 text-error-primery">
                شماره موبایل را بدون ۰ و با اعداد انگلیسی وارد کنید
              </p>
            )}

            {/* Password input */}
            <div
              className={`border rounded-lg mt-4 w-full ${
                isBluredPassword && !isValidPassword
                  ? "border-error-primery"
                  : "border-neutral-gray-4"
              }`}
            >
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setIsBluredPassword(true)}
                maxLength={32}
                placeholder="رمز عبور"
                className="w-full outline-none py-3.75 px-4 placeholder:text-xs"
              />
            </div>
            {isBluredPassword && !isValidPassword && (
              <p className="text-xs mt-2 text-error-primery">
                رمز عبور باید ۸ تا ۳۲ کاراکتر شامل عدد، حروف بزرگ/کوچک و کاراکتر
                باشد
              </p>
            )}

            <div className="mt-56 flex flex-col justify-center items-center lg:items-start lg:mt-7.5">
              <button
                disabled={!(isValidPassword && isValidPhone)}
                onClick={handleClick}
                className={`leading-5.5 rounded-lg py-3.25 px-25 cursor-pointer w-full lg:text-lg lg:leading-6.5 lg:py-3.75 flex items-center justify-center ${
                  isValidPassword && isValidPhone
                    ? "bg-cognac-primery text-white"
                    : "bg-neutral-gray-4 text-neutral-gray-5"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[0ms]"></div>
                    <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[150ms]"></div>
                    <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[300ms]"></div>
                  </div>
                ) : (
                  <p>{type === "login" ? "ورود" : "ثبت‌نام"}</p>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Image
        width={546}
        height={690}
        quality={100}
        src="/img/login.png"
        className="hidden lg:block w-[45%] object-cover"
        alt="auth"
      />
    </div>
  );
}
