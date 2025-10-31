"use client";
import UserPannel from "@/app/user/components/UserPannel";
import { useAuthContext } from "@/context/AuthContext";

export default function Page() {
  const { phoneNumber, name, family, email } = useAuthContext();

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
              {name ? name : " نام وارد نشده است"}
            </li>
            <li className="text-neutral-gray-11 text-sm leading-6 mb-4">
              {family
                ? family
                : "نام‌خانوادگی وارد نشده است"}
            </li>
            <li className="text-neutral-gray-11 text-sm leading-6 mb-4">
              {phoneNumber ? phoneNumber : "شماره هنوز وارد نشده است"}
            </li>
            <li className="text-neutral-gray-11 text-sm leading-6">
              {email ? email : " آدرس ایمیل وارد نشده است"}
            </li>
          </ul>
        </div>
      </div>
    </UserPannel>
  );
}
