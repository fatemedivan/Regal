"use client";
import { useRouter } from "next/navigation";

export default function EmptyAddressBox() {
  const router = useRouter();
  return (
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
  );
}
