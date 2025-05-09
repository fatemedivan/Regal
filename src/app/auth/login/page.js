"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL; 
  const router = useRouter();
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

  const handleSubmit = async () => {
    const lastSignupPhone = sessionStorage.getItem("signupPhone");
    const lastSignupPassword = sessionStorage.getItem("signupPassword");
    if (
      lastSignupPhone &&
      lastSignupPassword &&
      (phone !== lastSignupPhone || password !== lastSignupPassword)
    ) {
      toast.error("اطلاعات وارد شده با اطلاعات ثبت‌نام اخیر مطابقت ندارد");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify({ "phoneNumber": phone, "password": password }),
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      console.log(result);
      
      if (result.token) {
        document.cookie = `token=${result.token}; path=/; max-age=${60 * 60 * 24 * 30}`
        localStorage.setItem('token', result.token)
        toast.success("با موفقیت وارد شدید");
        setTimeout(() => {
          router.push("/");
        }, 2500);
        sessionStorage.removeItem("signupPhone");
        sessionStorage.removeItem("signupPassword");
      } else {
        toast.error(result.message);
        setTimeout(() => {
          router.push("/auth/sign-up");
        }, 2500);
      }
      setIsLoading(false);
    } catch (err) {
      console.log("error", err);
      setIsLoading(false);
      toast.error("خطایی رخ داد");
    }
  };
 

  return (
    <div className="lg:flex">
      <div className="container mx-auto pt-16 px-5 pb-6 lg:px-12 lg:pt-12 lg:pb-29.5 lg:w-[55%]">
        <ToastContainer autoClose={2000} className={"custom-toast-container"} />
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
             ورود
            </p>
            <div
              className={`border ${
                isBluredPhone && !isValidPhone
                  ? "border-error-primery"
                  : "border-neutral-gray-4"
              } rounded-lg flex w-full transition duration-200 ease-in-out relative`}
            >
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => setIsBluredPhone(true)}
                dir="ltr"
                maxLength={10}
                placeholder="شماره موبایل"
                className={`placeholder:text-right placeholder:text-xs placeholder:leading-4.5 placeholder:text-neutral-gray-7 w-full outline-none py-3.75 px-4 lg:text-sm lg:leading-5`}
              />
              <div
                className={`absolute -top-2 right-3 bg-white px-1 text-neutral-gray-10 text-xs leading-4.5 transition duration-200 ease-in-out ${
                  phone.length ? "block" : "hidden"
                }`}
              >
                شماره موبایل
              </div>
              <div className="bg-neutral-gray-2 text-neutral-gray-7 p-4 border-r border-neutral-gray-4 rounded-tl-lg rounded-bl-lg max-w-13 text-xs leading-4.5">
                ۹۸+
              </div>
            </div>
            {isBluredPhone && !isValidPhone && (
              <p className="text-xs leading-4.5 mt-4 transition duration-200 ease-in-out text-error-primery">
               شماره موبایل را بدون ۰ و با اعداد انگلیسی وارد کنید
              </p>
            )}

            <div
              className={`border rounded-lg mt-4 w-full ${
                isBluredPassword && !isValidPassword
                  ? "border-error-primery"
                  : "border-neutral-gray-4"
              } relative `}
            >
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setIsBluredPassword(true)}
                maxLength={32}
                dir="ltr"
                placeholder="رمز عبور"
                className="placeholder:text-right placeholder:text-xs placeholder:leading-4.5 placeholder:text-neutral-gray-7 w-full outline-none py-3.75 px-4 lg:text-sm lg:leading-5"
              />
              <div
                className={`absolute -top-2 right-3 bg-white px-1 text-neutral-gray-10 text-xs leading-4.5 transition duration-200 ease-in-out ${
                  password.length ? "block" : "hidden"
                }`}
              >
                رمز عبور
              </div>
            </div>
            {isBluredPassword && !isValidPassword && (
              <p className="text-xs leading-4.5 mt-4 transition duration-200 ease-in-out text-error-primery">
                رمز عبور باید حداقل ۸ و حداکثر ۳۲ کاراکتر باشد و شامل حروف بزرگ
                و کوچک انگلیسی و عدد و کاراکتر باشد
              </p>
            )}

            
            <div className="mt-56 flex flex-col justify-center items-center lg:items-start lg:mt-7.5">
              <button
                disabled={!(isValidPassword && isValidPhone)}
                onClick={() => handleSubmit()}
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
                  "تایید"
                )}
              </button>
              <div className="border-t border-neutral-gray-4 relative mt-6 w-full">
                <span className="bg-white px-2 text-sm leading-6 text-neutral-gray-7 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:text-[1rem] lg:leading-7">
                  یا
                </span>
              </div>
              <button className="flex items-center justify-center border border-cognac-primery gap-2 rounded-lg py-3.25 px-20 mt-6 cursor-pointer w-full lg:py-3.75">
                <Image
                  width={16}
                  height={16}
                  src="/img/Google-logo.svg"
                  alt=""
                />
                <p className="text-cognac-primery leading-5.5 lg:text-lg lg:leading-6.5 cursor-pointer">
                  ورود با گوگل
                </p>
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
        alt=""
      />
    </div>
  );
}
