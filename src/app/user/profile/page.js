"use client";
import UserPannel from "@/components/user/UserPannel";
import React, { useState } from "react";

export default function Page() {
  const [userData, setUserData] = useState({
    firstName: "ارزو",
    lastName: "علیزاده",
    phone: "۹۱۲۱۲۳۴۵۶۷",
    email: "rwish1377@gmail.com",
  });
  return (
    <UserPannel rout={"profile"}>
      <div className="flex items-center gap-32 mt-6">
        <div>
          <ul>
            <li className="text-neutral-gray-13 leading-7 mb-4">نام</li>
            <li className="text-neutral-gray-13 leading-7 mb-4">
              نام‌خانوادگی
            </li>
            <li className="text-neutral-gray-13 leading-7 mb-4">
              شماره تلفن همراه
            </li>
            <li className="text-neutral-gray-13 leading-7">آدرس ایمیل</li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="text-neutral-gray-11 text-sm leading-6 mb-4">
              {userData ? userData.firstName : " نام وارد نشده است"}
            </li>
            <li className="text-neutral-gray-11 text-sm leading-6 mb-4">
              {userData ? userData.lastName : "نام‌خانوادگی وارد نشده است"}
            </li>
            <li className="text-neutral-gray-11 text-sm leading-6 mb-4">
              {userData.phone}
            </li>
            <li className="text-neutral-gray-11 text-sm leading-6">
              {userData ? userData.email : " آدرس ایمیل وارد نشده است"}
            </li>
          </ul>
        </div>
      </div>
    </UserPannel>
  );
}
