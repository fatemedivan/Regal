"use client";
import UserPannel from "@/components/user/UserPannel";
import { useAuthContext } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const {phoneNumber} = useAuthContext()
  useEffect(() => {
    setUserData(prev => ({...prev, phone : phoneNumber}))
  }, [phoneNumber])
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
              {userData.firstName ? userData.firstName : " نام وارد نشده است"}
            </li>
            <li className="text-neutral-gray-11 text-sm leading-6 mb-4">
              {userData.lastName ? userData.lastName : "نام‌خانوادگی وارد نشده است"}
            </li>
            <li className="text-neutral-gray-11 text-sm leading-6 mb-4">
              {userData.phone}
            </li>
            <li className="text-neutral-gray-11 text-sm leading-6">
              {userData.lastName ? userData.email : " آدرس ایمیل وارد نشده است"}
            </li>
          </ul>
        </div>
      </div>
    </UserPannel>
  );
}
