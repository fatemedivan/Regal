"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Categories() {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const categoriesRes = await fetch("/api/category");
        if (categoriesRes.ok) {
          const categoryDate = await categoriesRes.json();
          setData(categoryDate);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, []);

  return (
    <section className="container mx-auto px-5 mb-16">
      <h5 className="font-semibold leading-5 text-black mt-16 mb-6">
        دسته بندی محصولات
      </h5>
      <div className="flex flex-wrap gap-4 lg:hidden">
        <div className="flex flex-col gap-4">
          <Link href={"/products?categoryId=1&page=1"}>
            <div className="h-71 relative w-41.75">
              <Image
                className="relative w-full h-auto z-20"
                src="/img/Category-1.png"
                alt=""
                width={167}
                height={284}
                quality={100}
              />
              <div className="absolute z-30 bottom-1 px-2">
                <h5 className="leading-5 font-semibold text-white">
                  {data[4]?.name}
                </h5>
                <div className="flex items-center gap-1 mt-1 mb-2 text-white">
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">دخترانه</p>
                  </div>
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">مناسب مهمانی</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"/products?categoryId=2&page=1"}>
            <div className="h-35 relative w-41.75">
              <Image
                className="relative w-full h-auto z-20"
                src="/img/Category-3.png"
                alt=""
                width={167}
                height={140}
                quality={100}
              />
              <div className="absolute z-30 bottom-1 px-2">
                <h5 className="leading-5 font-semibold text-white">
                  {data[1]?.name}
                </h5>
                <div className="flex items-center gap-1 mt-1 mb-2 text-white">
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">روزمره</p>
                  </div>
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">کالکشن جدید</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"/products?categoryId=3&page=1"}>
            <div className="h-50 relative w-41.75">
              <Image
                className="relative w-full h-auto z-20"
                src="/img/Category-6.png"
                alt=""
                width={167}
                height={200}
                quality={100}
              />
              <div className="absolute z-30 bottom-1 px-2">
                <h5 className="leading-5 font-semibold text-white">
                  {data[3]?.name}
                </h5>
                <div className="flex items-center gap-1 mt-1 mb-2 text-white">
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">تمام فصول</p>
                  </div>
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5"> کژوال</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"/products?categoryId=4&page=1"}>
            <div className="h-51.5 relative w-41.75">
              <Image
                className="relative w-full h-auto z-20"
                src="/img/Category-8.png"
                alt=""
                width={167}
                height={206}
                quality={100}
              />
              <div className="absolute z-30 bottom-1 px-2">
                <h5 className="leading-5 font-semibold text-white">
                  {data[7]?.name}
                </h5>
                <div className="flex items-center gap-1 mt-1 mb-2 text-white">
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">مجلسی</p>
                  </div>
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">روزمره</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <Link href={"/products?categoryId=5&page=1"}>
            <div className="h-50 relative w-41.75">
              <Image
                className="relative w-full h-auto z-20"
                src="/img/Category-2.png"
                alt=""
                width={167}
                height={200}
                quality={100}
              />
              <div className="absolute bottom-1 z-30 px-2">
                <h5 className="leading-5 font-semibold text-white">
                  {data[2]?.name}
                </h5>
                <div className="flex items-center gap-1 mt-1 mb-2 text-white">
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">استایل روزمره</p>
                  </div>
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">رسمی</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"/products?categoryId=6&page=1"}>
            <div className="h-37.5 relative w-41.75">
              <Image
                className="relative w-full h-auto z-20"
                src="/img/Category-4.png"
                alt=""
                width={167}
                height={150}
                quality={100}
              />
              <div className="absolute bottom-1 z-30 px-2">
                <h5 className="leading-5 font-semibold text-white">
                  {data[6]?.name}
                </h5>
                <div className="flex items-center gap-1 mt-1 mb-2 text-white">
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">کلاسیک</p>
                  </div>
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">مینیمال</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"/products?categoryId=7&page=1"}>
            <div className="h-49 relative w-41.75">
              <Image
                className="relative w-full h-auto z-20"
                src="/img/Category-5.png"
                alt=""
                width={167}
                height={196}
                quality={100}
              />
              <div className="absolute bottom-1 z-30 px-2">
                <h5 className="leading-5 font-semibold text-white">
                  {data[0]?.name}
                </h5>
                <div className="flex items-center gap-1 mt-1 mb-2 text-white">
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">تابستانه</p>
                  </div>
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">پاییزه</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"/products?categoryId=8&page=1"}>
            <div className="h-71 relative w-41.75">
              <Image
                className="relative w-full h-auto z-20"
                src="/img/Category-7.png"
                alt=""
                width={167}
                height={284}
                quality={100}
              />
              <div className="absolute bottom-1 z-30 px-2">
                <h5 className="leading-5 font-semibold text-white">
                  {data[5]?.name}
                </h5>
                <div className="flex items-center gap-1 mt-1 mb-2 text-white">
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">گرم و سبک</p>
                  </div>
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">مدرن</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="hidden lg:grid grid-cols-4 grid-rows-6 gap-5">
        <div
          onClick={() => router.push("/products?categoryId=1&page=1")}
          className="col-span-1 row-span-6 relative rounded-xl overflow-hidden cursor-pointer"
        >
          <Image
            src="/img/Category-desktop-1.png"
            alt="دسته‌بندی 1"
            className="w-full h-full object-cover"
            width={318}
            height={532}
            quality={100}
          />
          <div className="absolute bottom-4 mr-4 text-white">
            <h5 className="text-lg font-bold">{data[4]?.name}</h5>
            <div className="flex gap-2 mt-2">
              <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                دخترانه
              </span>
              <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                مناسب مهمانی
              </span>
            </div>
          </div>
        </div>
        <div
          onClick={() => router.push("/products?categoryId=2&page=1")}
          className="col-start-2 row-span-3 relative rounded-xl overflow-hidden cursor-pointer"
        >
          <Image
            src="/img/Category-desktop-2.png"
            alt="دسته‌بندی 2"
            className="w-full h-full object-cover"
            width={318}
            height={256}
            quality={100}
          />
          <div className="absolute bottom-4 mr-4 text-white">
            <h5 className="text-lg font-bold">{data[2]?.name}</h5>
            <div className="flex gap-2 mt-2">
              <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                استایل روزمره
              </span>
              <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                رسمی
              </span>
            </div>
          </div>
        </div>
        <div
          onClick={() => router.push("/products?categoryId=3&page=1")}
          className="col-start-2 row-start-4 row-span-3 relative rounded-xl overflow-hidden cursor-pointer"
        >
          <Image
            src="/img/Category-desktop-3.png"
            alt="دسته‌بندی 3"
            className="w-full h-full object-cover"
            width={318}
            height={256}
            quality={100}
          />
          <div className="absolute bottom-4 mr-4 text-white">
            <h5 className="text-lg font-bold">{data[1]?.name}</h5>
            <div className="flex gap-2 mt-2">
              <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                روزمره
              </span>
              <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                کالکشن‌ جدید
              </span>
            </div>
          </div>
        </div>
        <div
          onClick={() => router.push("/products?categoryId=4&page=1")}
          className="col-start-3 row-span-2 relative rounded-xl overflow-hidden cursor-pointer"
        >
          <Image
            src="/img/Category-desktop-4.png"
            alt="دسته‌بندی 4"
            className="w-full h-full object-cover"
            width={318}
            height={164}
            quality={100}
          />
          <div className="absolute bottom-4 mr-4 text-white">
            <h5 className="text-lg font-bold">{data[6]?.name}</h5>
            <div className="flex gap-2 mt-2">
              <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                کلاسیک
              </span>
              <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                مینیمال
              </span>
            </div>
          </div>
        </div>
        <div
          onClick={() => router.push("/products?categoryId=5&page=1")}
          className="col-start-3 row-start-3 row-span-2 relative rounded-xl overflow-hidden cursor-pointer"
        >
          <Image
            src="/img/Category-desktop-5.png"
            alt="دسته‌بندی 5"
            className="w-full h-full object-cover"
            width={318}
            height={164}
            quality={100}
          />
          <div className="absolute bottom-4 mr-4 text-white">
            <h5 className="text-lg font-bold">{data[0]?.name}</h5>
            <div className="flex gap-2 mt-2">
              <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                تابستانه
              </span>
              <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                پاییزه
              </span>
            </div>
          </div>
        </div>
        <div
          onClick={() => router.push("/products?categoryId=6&page=1")}
          className="col-start-3 row-start-5 row-span-2 relative rounded-xl overflow-hidden cursor-pointer"
        >
          <Image
            src="/img/Category-desktop-6.png"
            alt="دسته‌بندی 6"
            className="w-full h-full object-cover"
            width={318}
            height={164}
            quality={100}
          />
          <div className="absolute bottom-4 mr-4 text-white">
            <h5 className="text-lg font-bold">{data[3]?.name}</h5>
            <div className="flex gap-2 mt-2">
              <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                تمام فصول
              </span>
              <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                کژوال
              </span>
            </div>
          </div>
        </div>
        <div
          onClick={() => router.push("/products?categoryId=7&page=1")}
          className="col-start-4 row-span-2 relative rounded-xl overflow-hidden cursor-pointer"
        >
          <Image
            src="/img/Category-desktop-7.png"
            alt="دسته‌بندی 7"
            className="w-full h-full object-cover"
            width={318}
            height={164}
            quality={100}
          />
          <div className="absolute bottom-4 mr-4 text-white">
            <h5 className="text-lg font-bold">{data[7]?.name}</h5>
            <div className="flex gap-2 mt-2">
              <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                مجلسی
              </span>
              <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                روزمره
              </span>
            </div>
          </div>
        </div>
        <div
          onClick={() => router.push("/products?categoryId=8&page=1")}
          className="col-start-4 row-start-3 row-span-4 relative rounded-xl overflow-hidden cursor-pointer"
        >
          <Image
            src="/img/Category-desktop-8.png"
            alt="دسته‌بندی 8"
            className="w-full h-full object-cover"
            width={318}
            height={348}
            quality={100}
          />
          <div className="absolute bottom-4 mr-4 text-white">
            <h5 className="text-lg font-bold">{data[5]?.name}</h5>
            <div className="flex gap-2 mt-2">
              <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                گرم و سبگ
              </span>
              <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                مدر ن
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
