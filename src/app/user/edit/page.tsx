"use client";
import UserPannel from "@/app/user/components/UserPannel";
import { useAuthContext } from "@/context/AuthContext";
import getToken from "@/utils/getToken";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editFormSchema, FormEditValues } from "./editForm.schema";

export default function Page() {
  const token = getToken();
  const router = useRouter();

  const {
    phoneNumber,
    name,
    family,
    email: userEmail,
    refreshUser,
  } = useAuthContext();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm<FormEditValues>({
    resolver: zodResolver(editFormSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (name || family || userEmail) {
      reset({
        firstName: name ?? "",
        lastName: family ?? "",
        email: userEmail ?? "",
      });
    }
  }, [name, family, userEmail, reset]);

  const [isFocused, setIsFocused] = useState({
    firstName: false,
    lastName: false,
    email: false,
  });

  const floatLabel = (value: string | undefined, focus: boolean) =>
    value || focus ? "-top-2.5" : "top-4.5";

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const email = watch("email");

  const onSubmit = async (data: FormEditValues) => {
    try {
      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        toast.success("با موفقیت ذخیره شد");
        await refreshUser();
      } else {
        const result = await res.json();
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("خطایی رخ داد");
    }
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
            className={`relative border border-neutral-gray-4 px-4 py-3.75 rounded-lg `}
          >
            <input
              type="text"
              maxLength={12}
              id="firstName"
              placeholder=" "
              {...register("firstName")}
              onFocus={() => setIsFocused((p) => ({ ...p, firstName: true }))}
              onBlur={() => setIsFocused((p) => ({ ...p, firstName: false }))}
              className="w-full outline-none text-neutral-gray-7 placeholder:text-transparent"
            />
            <label
              htmlFor="firstName"
              className={`absolute right-4 bg-white px-1 text-xs text-neutral-gray-7 transition-all  ${floatLabel(
                firstName,
                isFocused.firstName
              )}`}
            >
              نام
            </label>
          </div>
          {errors.firstName && (
            <p className="text-xs leading-4.5 mt-4 transition duration-200 ease-in-out text-error-primery mb-4 lg:hidden">
              {errors.firstName?.message}
            </p>
          )}

          <div
            className={`relative border border-neutral-gray-4 px-4 py-3.75 rounded-lg mb-4`}
          >
            <input
              type="text"
              maxLength={20}
              id="lastName"
              placeholder=" "
              {...register("lastName")}
              onFocus={() => setIsFocused((p) => ({ ...p, lastName: true }))}
              onBlur={() => setIsFocused((p) => ({ ...p, lastName: false }))}
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
          {errors.lastName && (
            <p className="text-xs leading-4.5 mt-4 transition duration-200 ease-in-out text-error-primery mb-4 lg:hidden">
              {errors.lastName?.message}
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
            className={`relative border border-neutral-gray-4 px-4 py-3.75 rounded-lg`}
          >
            <input
              type="text"
              id="email"
              dir="ltr"
              placeholder=" "
              {...register("email")}
              onFocus={() => setIsFocused((p) => ({ ...p, email: true }))}
              onBlur={() => setIsFocused((p) => ({ ...p, email: false }))}
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
        {errors.email && (
          <p className="text-xs leading-4.5 mt-4 transition duration-200 ease-in-out text-error-primery mb-4 lg:hidden">
            {errors.email?.message}
          </p>
        )}
        <div className="w-full mt-40">
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={!isDirty || !isValid || isSubmitting}
            className={`${
              isValid && isDirty
                ? "bg-cognac-primery text-white"
                : "bg-cognac-tint-2 text-cognac-tint-4"
            } py-3.25 rounded-lg w-full mb-4 cursor-pointer`}
          >
            {isSubmitting ? (
              <div className="flex justify-center items-center gap-2 py-1.5">
                <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[0ms]"></div>
                <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[150ms]"></div>
                <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[300ms]"></div>
              </div>
            ) : (
              "ذخیره تغییرات"
            )}
          </button>
          <button
            disabled={!isDirty}
            onClick={() => reset()}
            className="bg-white text-cognac-tint-7 border border-cognac-tint-7 py-3.25 rounded-lg w-full cursor-pointer"
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
                    {...register("firstName")}
                    onFocus={() =>
                      setIsFocused((p) => ({ ...p, firstName: true }))
                    }
                    onBlur={() =>
                      setIsFocused((p) => ({ ...p, firstName: false }))
                    }
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
                {errors.firstName && (
                  <p className="text-xs leading-4.5 mt-4 transition duration-200 ease-in-out text-error-primery">
                    {errors.firstName?.message}
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
                    {...register("lastName")}
                    onFocus={() =>
                      setIsFocused((p) => ({ ...p, lastName: true }))
                    }
                    onBlur={() =>
                      setIsFocused((p) => ({ ...p, lastName: false }))
                    }
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
                {errors.lastName && (
                  <p className="text-xs leading-4.5 mt-4 transition duration-200 ease-in-out text-error-primery">
                    {errors.lastName?.message}
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
                    {...register("email")}
                    onFocus={() => setIsFocused((p) => ({ ...p, email: true }))}
                    onBlur={() => setIsFocused((p) => ({ ...p, email: false }))}
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
                {errors.email && (
                  <p className="text-xs leading-4.5 mt-4 transition duration-200 ease-in-out text-error-primery">
                    {errors.email?.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 mt-38 mb-6">
            <button
              disabled={!isDirty}
              onClick={() => reset()}
              className="bg-white text-cognac-tint-7 border border-cognac-tint-7 py-3.25 px-22 rounded-lg cursor-pointer"
            >
              انصراف
            </button>
            <button
              disabled={!isDirty || !isValid || isSubmitting}
              onClick={handleSubmit(onSubmit)}
              className={`${
                isValid && isDirty
                  ? "bg-cognac-primery text-white"
                  : "bg-cognac-tint-2 text-cognac-tint-4"
              } py-3.25 w-52 flex justify-center items-center rounded-lg cursor-pointer`}
            >
              {isSubmitting ? (
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
