"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import dayjs from "dayjs";
import jalali from "jalali-dayjs";
import "dayjs/locale/fa";

import { useBasketContext } from "@/context/BasketContext";
import AdressCard from "../../components/adressCard/AdressCard";
import BasketDetailsCard from "@/components/basketDetailsCard/BasketDetailsCard";
import DateModal from "@/app/complete-data/components/DateModal";
import PageHeader from "@/components/pageHeader/PageHeader";
import getToken from "@/utils/getToken";
import EmptyAddressBox from "./components/EmptyAddressBox";

export default function Page() {
  const router = useRouter();
  const token = getToken();
  const { countOfProduct, totalPric, cart } = useBasketContext();

  //handel date
  const [isShowDateModal, setIsShowDateModal] = useState(false);
  const [mainDate, setMainDate] = useState("");
  const [date, setDate] = useState([]);
  dayjs.extend(jalali);
  dayjs.locale("fa");
  const getNextNDays = (n = 4) => {
    const days = [];
    const weekdays = [
      "یکشنبه",
      "دوشنبه",
      "سه‌شنبه",
      "چهارشنبه",
      "پنج‌شنبه",
      "جمعه",
      "شنبه",
    ];

    for (let i = 0; i < n; i++) {
      const date = dayjs().add(i, "day");
      const weekday = weekdays[date.day()];
      const fullDate = `${weekday} ${date.format("D MMMM YYYY")}`;
      days.push(fullDate);
    }

    return days;
  };

  useEffect(() => {
    setDate(getNextNDays(4));
  }, []);

  useEffect(() => {
    if (date.length > 0) {
      setMainDate(date[0]);
    }
  }, [date]);

  //handle addresses
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isHadAddress, setIsHadAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    if (!token) return;
    getAddresses();
  }, [token]);

  const getAddresses = async () => {
    const res = await fetch(`/api/addresses`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.length > 0) {
        setIsHadAddress(true);
        setAddresses(data);
      }
    }
    if (res.status === 404) {
      setIsHadAddress(false);
    }
  };

  useEffect(() => {
    if (selectedAddressId) {
      sessionStorage.setItem("selectedAddressId", selectedAddressId);
    }
  }, []);

  return (
    <div className="container mx-auto px-5 pt-6 pb-16 lg:pt-0 lg:px-12 lg:pb-22">
      <PageHeader title={"تکمیل اطلاعات"} steper={"completeData"} />
      <div className="lg:flex lg:justify-between lg:gap-6">
        <div className="flex-1">
          <div className="mb-9">
            {isHadAddress ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-semibold leading-5 text-black lg:font-bold lg:text-lg lg:leading-5.5">
                    لیست آدرس‌ها
                  </h5>
                  <div
                    onClick={() => router.push("/user/addresses")}
                    className="flex items-center gap-2 lg:p-4"
                  >
                    <Image
                      width={16}
                      height={16}
                      src="/img/add-circle.svg"
                      className="cursor-pointer"
                      alt=""
                    />
                    <p className="text-cognac-primery text-sm leading-5">
                      افزودن آدرس جدید
                    </p>
                  </div>
                </div>
                {addresses &&
                  addresses.map((address) => (
                    <AdressCard
                      key={address.id}
                      {...address}
                      selectedAddressId={selectedAddressId}
                      setSelectedAddressId={setSelectedAddressId}
                      id={address.id}
                      getAddresses={getAddresses}
                    />
                  ))}
              </>
            ) : (
              <EmptyAddressBox />
            )}
          </div>
          <div className="mb-9">
            <h5 className="font-semibold leading-5 text-black mb-4 lg:font-bold lg:text-lg lg:leading-5.5 lg:mb-6">
              انتخاب زمان ارسال
            </h5>
            <div className="lg:flex lg:gap-6">
              <div
                onClick={() => {
                  setIsShowDateModal(!isShowDateModal);
                }}
                className="px-4 py-3.75 border border-neutral-gray-4 rounded-lg flex justify-between items-center relative cursor-pointer lg:w-1/2"
              >
                <p className="text-xs leading-4.5 text-neutral-gray-13 lg:text-sm lg:leading-5">
                  {mainDate}
                </p>
                <Image
                  width={16}
                  height={16}
                  src="/img/arrow-down-2.svg"
                  alt=""
                />
                <div className="absolute -top-2.5">
                  <p className="text-neutral-gray-7 text-xs leading-4.5 font-normal bg-white px-1">
                    تاریخ
                  </p>
                </div>
                {isShowDateModal && (
                  <ul className="bg-white absolute w-full top-14 right-0 rounded-lg  border border-neutral-gray-4 p-4 overflow-y-scroll max-h-48 hidden lg:block custom-scrollbar">
                    {date.map((date, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setIsShowDateModal(false);
                          setMainDate(date);
                        }}
                        className="text-xs leading-4.5 text-neutral-gray-11 p-2 rounded-sm hover:bg-neutral-gray-2 cursor-pointer"
                      >
                        {date}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="mb-9">
            <h5 className="font-semibold leading-5 text-black mb-4 lg:font-bold lg:text-lg lg:leading-5.5">
              توضیحات سفارش (اختیاری)
            </h5>
            <div className="p-4 border border-neutral-gray-4 rounded-lg">
              <textarea
                maxLength={200}
                placeholder="توضیحات سفارش"
                className="placeholder:text-neutral-gray-7 placeholder:text-sm placeholder:leading-5 w-full h-full outline-none resize-none"
              ></textarea>
            </div>
          </div>
        </div>
        <div>
          <BasketDetailsCard
            step={2}
            totalPric={totalPric}
            count={countOfProduct}
            cart={cart}
            selectedAddressId={selectedAddressId}
          />
        </div>
      </div>
      <div className="lg:hidden">
        {isShowDateModal && (
          <DateModal
            handleCloseModal={() => setIsShowDateModal(false)}
            mainDate={mainDate}
            setMainDate={setMainDate}
          />
        )}
      </div>
    </div>
  );
}
