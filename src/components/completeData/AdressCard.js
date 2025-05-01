import Image from "next/image";
import React from "react";

export default function AdressCard({ isActive }) {
  return (
    <div
      className={`border ${
        isActive ? "border-cognac-primery" : "border-neutral-gray-4"
      }  rounded-lg p-6 mb-2 lg:mb-3`}
    >
      <div className="flex items-start justify-between gap-3 mb-4 lg:mb-3">
        <div className="flex items-start gap-1">
          <Image width={16} height={16} src="/img/location2.svg" alt="" />
          <p className="text-neutral-gray-13 text-xs leading-4.5 lg:text-sm lg:leading-5">
            تهران، نیاوران، تنگستان چهارم، مجتمع حیات سبز، طبقه چهارم، واحد ۱۳۲
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Image
            width={16}
            height={16}
            className="cursor-pointer lg:w-6 lg:h-6"
            src="/img/trash-3.svg"
            alt=""
          />
          <Image
            width={16}
            height={16}
            className="cursor-pointer lg:w-6 lg:h-6"
            src="/img/edit-2.svg"
            alt=""
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Image width={16} height={16} className="lg:w-5 lg:h-5" src="/img/user-2.svg" alt="" />
          <p className="text-neutral-gray-13 text-xs leading-4.5 lg:text-sm lg:leading-5 lg:ml-2">
            آرزو محمدعلیزاده
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-100 bg-neutral-gray-7"></div>
          <div className="flex items-center gap-1">
            <Image width={16} height={16} className="lg:w-5 lg:h-5" src="/img/call-2.svg" alt="" />
            <p className="text-neutral-gray-13 text-xs leading-4.5 lg:text-sm lg:leading-5">
              ۹۸۹۱۲۱۲۳۴۵۶۷+
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
