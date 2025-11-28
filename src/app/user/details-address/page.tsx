"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import getToken from "@/utils/getToken";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { iranProvinces } from "@/constants/provinces";
import { useAuthContext } from "@/context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { HashLoader } from "react-spinners";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressFormSchema, AddressFormValues } from "./addressForm.schema";


export default function Page() {
  const token = getToken();
  const router = useRouter();
  const { phoneNumber } = useAuthContext();
  const [addressId, setAddressId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenProvince, setIsOpenProvince] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    setValue,
    watch,
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    mode: "onChange",
  });

  const [isFocused, setIsFocused] = useState({
    city: false,
    province: false,
    details: false,
    postalCode: false,
    phone: false,
  });

  const floatLabel = (value: string | undefined, focus: boolean) =>
    value || focus ? "-top-2.5" : "top-4.5";

  const city = watch("city");
  const province = watch("province");
  const details = watch("details");
  const postalCode = watch("postalCode");

  useEffect(() => {
    setAddressId(sessionStorage.getItem("addressId"));
  }, []);

  useEffect(() => {
    const storedFullAddress = sessionStorage.getItem("full address");
    if (storedFullAddress) setValue("fullAddress", storedFullAddress);
  }, []);

  const onSubmit = async (data: AddressFormValues) => {
    try {
      if (!token) {
        toast.error("توکن احراز هویت موجود نیست. لطفا وارد شوید.");
        return;
      }
      const url = addressId ? `/api/addresses/${addressId}` : `/api/addresses`;
      const method = addressId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("آدرس با موفقیت اضافه/ویرایش شد.");
        sessionStorage.removeItem("addressId");
        setTimeout(() => {
          router.push("/user/addresses");
        }, 500);
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "عملیات ناموفق بود.");
      }
    } catch (error) {
      toast.error("خطایی رخ داد.");
    }
  };

  useEffect(() => {
    if (!token || !addressId) return;
    const getAddress = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/addresses/${addressId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok) {
          reset({
            city: data.city ?? "",
            province: data.province ?? "",
            details: data.details ?? "",
            postalCode: data.postalCode ?? "",
            fullAddress: data.fullAddress ?? "",
          });
        } else {
          toast.error(data.message || "خطا در دریافت آدرس.");
        }
      } catch (error) {
        toast.error("خطا در دریافت آدرس.");
      } finally {
        setIsLoading(false);
      }
    };
    getAddress();
  }, [token, addressId]);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-[60vh]">
          <HashLoader color="#b19276" size={80} />
        </div>
      ) : (
        <div className="container mx-auto px-5 py-6">
          <ToastContainer
            autoClose={2000}
            className={"custom-toast-container"}
          />
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
              {...register("fullAddress")}
              maxLength={255}
              className="text-neutral-gray-11 text-sm leading-5 w-full resize-none outline-none"
            />
            <p className="absolute right-4 -top-2 bg-white px-1 text-neutral-gray-7 text-xs leading-4.5">
              آدرس کامل
            </p>
          </div>
          {errors.fullAddress && (
            <p className="text-xs leading-4.5 my-3 transition duration-200 ease-in-out text-error-primery">
              {errors.fullAddress?.message}
            </p>
          )}

          <div className="mt-6.5">
            <div className="relative border border-neutral-gray-4 px-4 py-3.75 rounded-lg mb-4">
              <input
                type="text"
                id="city"
                placeholder=" "
                maxLength={24}
                {...register("city")}
                onFocus={() =>
                  setIsFocused((prev) => ({ ...prev, city: true }))
                }
                onBlur={() =>
                  setIsFocused((prev) => ({ ...prev, city: false }))
                }
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
            {errors.city && (
              <p className="text-xs leading-4.5 my-3 transition duration-200 ease-in-out text-error-primery">
                {errors.city.message}
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
                        setValue("province", option);
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
                maxLength={38}
                {...register("details")}
                onFocus={() =>
                  setIsFocused((prev) => ({ ...prev, details: true }))
                }
                onBlur={() =>
                  setIsFocused((prev) => ({ ...prev, details: false }))
                }
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
            {errors.details && (
              <p className="text-xs leading-4.5 my-3 transition duration-200 ease-in-out text-error-primery">
                {errors.details.message}
              </p>
            )}
            <div className="relative border border-neutral-gray-4 px-4 py-3.75 rounded-lg mb-4">
              <input
                type="text"
                id="postalcode"
                placeholder=" "
                {...register("postalCode")}
                onFocus={() =>
                  setIsFocused((prev) => ({ ...prev, postalcode: true }))
                }
                onBlur={() =>
                  setIsFocused((prev) => ({ ...prev, postalcode: false }))
                }
                className="w-full outline-none text-neutral-gray-7 placeholder:text-transparent"
              />
              <label
                htmlFor="postalcode"
                className={`absolute right-4 bg-white px-1 text-xs text-neutral-gray-7 transition-all ${floatLabel(
                  postalCode,
                  isFocused.postalCode
                )}`}
              >
                کد پستی
              </label>
            </div>
            {errors.postalCode && (
              <p className="text-xs leading-4.5 my-3 transition duration-200 ease-in-out text-error-primery">
                {errors.postalCode?.message}
              </p>
            )}
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
                onClick={handleSubmit(onSubmit)}
                disabled={!isValid || isSubmitting}
                className={`leading-5.5 rounded-lg py-3.25 w-full cursor-pointer flex justify-center items-center ${
                  isValid && !isSubmitting
                    ? "bg-cognac-primery text-white"
                    : "bg-cognac-tint-2 text-cognac-tint-4"
                }`}
              >
                {isSubmitting ? (
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
      )}
    </>
  );
}
