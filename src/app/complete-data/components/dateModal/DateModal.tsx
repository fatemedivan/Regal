import Image from "next/image";
import React, { useEffect, useState } from "react";
import { DateModalProps } from "./types";

export default function DateModal({
  handleCloseModal,
  setMainDate,
}: DateModalProps) {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const weekdays = [
      "یکشنبه",
      "دوشنبه",
      "سه‌شنبه",
      "چهارشنبه",
      "پنج‌شنبه",
      "جمعه",
      "شنبه",
    ];
    const futureDates = [];

    for (let i = 0; i < 3; i++) {
      const today = new Date();
      today.setDate(today.getDate() + i);

      const formatter = new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const dateStr = formatter.format(today);
      const weekday = weekdays[today.getDay()];

      futureDates.push({ date: today, formatted: `${weekday} ${dateStr}` });
    }

    setDates(futureDates);
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 bg-[#1E1E1E] opacity-50 z-50"
        onClick={() => handleCloseModal()}
      />
      <div className="bg-white fixed bottom-0 left-0 right-0 z-60 w-full rounded-tr-3xl rounded-tl-3xl pt-4 px-5 pb-6">
        <div className="flex justify-between items-center pb-4 border-b border-neutral-gray-4 mb-4">
          <p className="leading-7 text-black">تاریخ</p>
          <Image
            width={16}
            height={16}
            src="/img/close-icon-filter.svg"
            className="cursor-pointer"
            alt="close"
            onClick={() => handleCloseModal()}
          />
        </div>
        <div>
          {dates.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedDate(item)}
              className={`flex items-center justify-between border-b border-neutral-gray-4 pb-4 mb-4 cursor-pointer ${
                selectedDate?.date.getTime() === item.date.getTime()
                  ? "text-cognac-primery font-bold"
                  : "text-neutral-gray-6"
              }`}
            >
              <p className="text-sm leading-5">{item.formatted}</p>
            </div>
          ))}

          <div className="flex items-center justify-center">
            <button
              onClick={() => {
                if (selectedDate) {
                  setMainDate(selectedDate.formatted);
                }

                handleCloseModal();
              }}
              className="text-white rounded-lg bg-cognac-primery py-3.25 px-30 cursor-pointer"
            >
              تایید
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
