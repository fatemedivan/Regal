"use client";
import AdressCard from "@/components/completeData/AdressCard";
import BasketDetailsCard from "@/components/common/BasketDetailsCard";
import DateModal from "@/components/completeData/DateModal";
import ProgressBar from "@/components/common/ProgressBar";
import TimeModal from "@/components/completeData/TimeModal";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useScrollLockContext } from "@/context/ScrollLockContext";
import { useBasketContext } from "@/context/BasketContext";

export default function Page() {
  const router = useRouter();
  const maxLenght = 200;
  const [text, setText] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("courier");
  const [isShowDateModal, setIsShowDateModal] = useState(false);
  const [isShowTimeModal, setIsShowTimeModal] = useState(false);
  const [isHadAdress, setIsHadAdress] = useState(false);
  const [date, setDate] = useState([
    "شنبه ۲۱ آبان ۱۴۰۳",
    "یکشنبه ۲۲ آبان ۱۴۰۳",
    "دوشنبه ۲۳ آبان ۱۴۰۳",
    "سه شنبه ۲۴ آبان ۱۴۰۳",
  ]);
  const [time, setTime] = useState([
    "ساعت ۹ تا ۱۲",
    "ساعت ۱۲ تا ۱۵",
    "ساعت ۱۵ تا ۱۸",
    "ساعت ۱۸ تا ۲۱",
    "ساعت ۲۱ تا ۲۴",
  ]);
  const [mainDate, setMainDate] = useState("شنبه ۲۱ آبان ۱۴۰۳");
  const [mainTime, setMainTime] = useState("ساعت ۹ تا ۱۲");
  const handleCloseDateModal = () => {
    setIsShowDateModal(false);
    closeModal();
  };
  const handleCloseTimeModal = () => {
    setIsShowTimeModal(false);
    closeModal();
  };

  const { isModalOpen, openModal, closeModal, setMobileOnlyLock } =
    useScrollLockContext();
  const { countOfProduct, totalPric, cart } = useBasketContext();

  return (
    <div className="container mx-auto px-5 pt-6 pb-16 lg:pt-0 lg:px-12 lg:pb-22">
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
          تکمیل اطلاعات
        </p>
        <div></div>
      </div>
      <div className="xl:px-40.5">
        <ProgressBar progress={"completeData"} />
      </div>
      <div className="lg:flex lg:justify-between lg:gap-6">
        <div className="flex-1">
          <div className="mb-9">
            <h5 className="font-semibold leading-5 text-black mb-4 lg:font-bold lg:text-lg lg:leading-5.5">
              روش تحویل سفارش
            </h5>
            <div className="p-4 border border-neutral-gray-4 rounded-xl flex gap-6 items-center lg:p-6 lg:rounded-2xl lg:gap-10 xl:gap-20">
              <label className="flex items-center gap-1 lg:gap-4">
                <input
                  type="radio"
                  className="hidden peer"
                  name="radio"
                  value="courier"
                  onChange={() => setDeliveryOption("courier")}
                  defaultChecked
                />
                <span className="w-4 h-4 rounded-full border border-neutral-gray-5 cursor-pointer group relative">
                  <span className="w-3 h-3 rounded-full bg-cognac-primery opacity-0 group-peer-checked:opacity-100 transition absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
                </span>
                <div>
                  <p className="text-sm leading-6 text-neutral-gray-11">
                    ارسال توسط پیک
                  </p>
                  <p className="hidden lg:block text-xs leading-4.5 text-neutral-gray-9">
                    توسط پیک رگال ارسال شود.
                  </p>
                </div>
              </label>
              <label className="flex items-center gap-1 lg:gap-4">
                <input
                  type="radio"
                  className="hidden peer"
                  name="radio"
                  value="person"
                  onChange={() => setDeliveryOption("person")}
                />
                <span className="w-4 h-4 rounded-full border border-neutral-gray-5 cursor-pointer group relative">
                  <span className="w-3 h-3 rounded-full bg-cognac-primery opacity-0 group-peer-checked:opacity-100 transition absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
                </span>
                <div>
                  <p className="text-sm leading-6 text-neutral-gray-11">
                    تحویل حضوری
                  </p>
                  <p className="hidden lg:block text-xs leading-4.5 text-neutral-gray-9">
                    توسط مشتری در محل فروشگاه دریافت شود.
                  </p>
                </div>
              </label>
            </div>
          </div>
          {deliveryOption === "courier" ? (
            <>
              <div className="mb-9">
                {isHadAdress ? (
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
                    <AdressCard isActive={true} />
                    <AdressCard isAtive={false} />
                  </>
                ) : (
                  <div>
                    <h5 className="font-semibold leading-5 text-black mb-4 lg:font-bold lg:text-lg lg:leading-5.5">
                      لیست آدرس‌ها
                    </h5>
                    <div className="border border-neutral-gray-4 rounded-xl py-12 px-11.5 flex flex-col items-center justify-center gap-6 lg:rounded-2xl lg:gap-8">
                      <p className="text-neutral-gray-9 leading-6 text-sm lg:text-[1rem] lg:leading-7">
                        شما در حال حاضر هیچ آدرسی ثبت نکرده‌اید!
                      </p>
                      <button
                        onClick={() => router.push("/user/addresses")}
                        className="text-white bg-cognac-primery rounded-lg leading-5.5 py-3.25 px-9.5 lg:text-sm lg:leading-5 lg:px-7.25 lg:py-2.5 cursor-pointer"
                      >
                        افزودن آدرس
                      </button>
                    </div>
                  </div>
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
                      setMobileOnlyLock(true);
                      isModalOpen ? closeModal() : openModal();
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
                  <div
                    onClick={() => {
                      setIsShowTimeModal(!isShowTimeModal);
                      setMobileOnlyLock(true);
                      isModalOpen ? closeModal() : openModal();
                    }}
                    className="px-4 py-3.75 border border-neutral-gray-4 rounded-lg flex justify-between items-center relative mt-3 cursor-pointer lg:mt-0 lg:w-1/2 "
                  >
                    <p className="text-xs leading-4.5 text-neutral-gray-13 lg:text-sm lg:leading-5">
                      {mainTime}
                    </p>
                    <Image
                      width={16}
                      height={16}
                      src="/img/arrow-down-2.svg"
                      alt=""
                    />
                    <div className="absolute -top-2.5">
                      <p className="text-neutral-gray-7 text-xs leading-4.5 font-normal bg-white px-1">
                        بازه زمانی
                      </p>
                    </div>
                    {isShowTimeModal && (
                      <ul className="bg-white absolute w-full top-14 right-0 rounded-lg border border-neutral-gray-4 p-4 overflow-y-scroll max-h-48 hidden lg:block custom-scrollbar">
                        {time.map((time, index) => (
                          <li
                            key={index}
                            onClick={() => {
                              setIsShowTimeModal(false);
                              setMainTime(time);
                            }}
                            className="text-xs leading-4.5 text-neutral-gray-11 p-2 rounded-sm hover:bg-neutral-gray-2 cursor-pointer"
                          >
                            {time}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : deliveryOption === "person" ? (
            <div className="mb-9">
              <h5 className="font-semibold leading-5 text-black mb-4 lg:font-bold lg:text-lg lg:leading-5.5">
                آدرس فروشگاه
              </h5>
              <div className="border border-neutral-gray-4 rounded-xl p-4 lg:p-6 lg:rounded-2xl lg:flex lg:gap-4 lg:justify-between">
                <div>
                  <div className="flex gap-1 mb-3">
                    <Image
                      width={16}
                      height={16}
                      src="/img/location2.svg"
                      alt=""
                    />
                    <p className="text-neutral-gray-13 text-sm leading-5 lg:leading-6">
                      تهران،‌ خیابان ولیعصر نرسیده به میدان ونک
                    </p>
                  </div>
                  <div className="flex gap-1 mb-3">
                    <Image
                      width={16}
                      height={16}
                      src="/img/call-2.svg"
                      alt=""
                    />
                    <p className="text-neutral-gray-13 text-sm leading-5 lg:leading-6">
                      ۰۲۱-۱۲۳۴۵۶۷۸ شماره تماس:{" "}
                    </p>
                  </div>
                  <div className="flex gap-1 mb-3">
                    <Image
                      width={16}
                      height={16}
                      src="/img/mobile.svg"
                      alt=""
                    />
                    <p className="text-neutral-gray-13 text-sm leading-5 lg:leading-6">
                      ۰۹۱۲۳۴۵۶۷۸۹ شماره همراه:
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Image
                      width={16}
                      height={16}
                      src="/img/clock-2.svg"
                      alt=""
                    />
                    <p className="text-neutral-gray-13 text-sm leading-5 lg:leading-6">
                      ساعت کاری: شنبه تا چهارشنبه ( ۹ صبح تا ۱۸)
                    </p>
                  </div>
                </div>
                <div className="relative mt-6 lg:mt-0">
                  <Image
                    width={318}
                    height={180}
                    className="lg:hidden"
                    src="/img/map.svg"
                    alt=""
                  />
                  <Image
                    width={332}
                    height={146}
                    className="hidden lg:block"
                    src="/img/map-2.svg"
                    alt=""
                  />
                  <div className="absolute rounded-xl bottom-2 right-2 bg-white border border-cognac-primery p-3.5 cursor-pointer lg:top-12 lg:bottom-0  xl:top-22">
                    <Image width={20} height={20} src="/img/gps.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="mb-9">
            <h5 className="font-semibold leading-5 text-black mb-4 lg:font-bold lg:text-lg lg:leading-5.5">
              توضیحات سفارش (اختیاری)
            </h5>
            <div className="p-4 border border-neutral-gray-4 rounded-lg">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={200}
                placeholder="توضیحات سفارش"
                className="placeholder:text-neutral-gray-7 placeholder:text-sm placeholder:leading-5 w-full h-full outline-none resize-none"
              ></textarea>
              <div className="flex items-center justify-end">
                <p className="text-xs text-neutral-gray-7 leading-4.5 ">
                  {text.length}/{maxLenght}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <BasketDetailsCard
            step={2}
            totalPric={totalPric}
            count={countOfProduct}
            cart={cart}
          />
        </div>
      </div>
      <div className="lg:hidden">
        {isShowDateModal && (
          <DateModal handleCloseModal={handleCloseDateModal} />
        )}
        {isShowTimeModal && (
          <TimeModal handleCloseModal={handleCloseTimeModal} />
        )}
      </div>
    </div>
  );
}
