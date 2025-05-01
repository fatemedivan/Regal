"use client";

import BasketDetailsCard from "@/components/common/BasketDetailsCard";
import ProgressBar from "@/components/common/ProgressBar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DeleteModal from "@/components/common/DeleteModal";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter()
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [basketItems, setBasketItems] = useState([
    {
      id: 1,
      title: "لباس میدی رکسان",
      img: "/img/itemCard-1.svg",
      size: "M",
      color: "#1C1B19",
      percentOff: "۱۵٪",
      price: "۲,۸۰۰,۰۰۰",
      finalPrice: "۲,۳۸۰,۰۰۰",
    },
    {
      id: 2,
      title: "لباس میدی راشا",
      img: "/img/itemCard-2.svg",
      size: "M",
      color: "#E2E2E0",
      finalPrice: "۲,۰۹۸,۰۰۰",
    },
    {
      id: 3,
      title: "پیراهن ساحلی",
      img: "/img/itemCard-3.svg",
      size: "M",
      color: "#DBD6C5",
      percentOff: "۱۰٪",
      price: "۲,۵۰۰,۰۰۰",
      finalPrice: "۲,۲۵۰,۰۰۰",
    },
  ]);
  const handleCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };
  const handleDeleteBasket = () => {
    setBasketItems([]);
    setIsOpenDeleteModal(false);
  };
  //AI
  useEffect(() => {
    if (isOpenDeleteModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpenDeleteModal]);

  return (
    <div className="container mx-auto px-5 lg:px-12">
      <div className="mt-6 flex justify-between items-center lg:hidden">
        <Image
          width={24}
          height={24}
          className="cursor-pointer"
          src="/img/arrow-right-6.svg"
          alt=""
          onClick={()=> router.back()}
        />
        <h3 className="text-[20px] font-semibold leading-6 text-neutral-gray-13">
          سبد خرید
        </h3>
        <Image
          width={24}
          height={24}
          className="cursor-pointer"
          src="/img/trash-2.svg"
          alt=""
          onClick={() => setIsOpenDeleteModal(true)}
        />
      </div>
      <div className="xl:px-40.5">
        <ProgressBar progress={"basket"} />
      </div>

      <div className="lg:hidden">
        {basketItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-2 border-b border-neutral-gray-4 pb-4 mb-4"
          >
            <Image width={88} height={116} src={item.img} alt="" />
            <div className="w-full">
              <p className="text-sm leading-5 text-neutral-gray-11">
                {item.title}
              </p>
              <div className="flex items-center gap-4 my-3.75">
                <p className="text-xs leading-4.5 text-neutral-gray-9">
                  سایز: {item.size}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-xs leading-4.5 text-neutral-gray-9">
                    رنگ:
                  </p>
                  <div
                    style={{ backgroundColor: item.color }}
                    className="w-5 h-5 rounded-sm"
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  {item.percentOff && (
                    <div className="flex items-center gap-1">
                      <p className="text-sm leading-4.5 text-neutral-gray-7 line-through">
                        {item.price}
                      </p>
                      <div className="px-2 py-0.5 bg-cognac-primery rounded-100 text-white text-sm leading-5">
                        {item.percentOff}
                      </div>
                    </div>
                  )}
                  <p className="text-neutral-gray-11 text-sm leading-5 mt-1">
                    {item.finalPrice} تومان
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <button className="p-3 rounded-lg border border-neutral-gray-8 cursor-pointer">
                    <Image width={16} height={16} src="/img/add.svg" alt="" />
                  </button>
                  <span>1</span>
                  <button className="p-3 rounded-lg  border border-neutral-gray-8 cursor-pointer">
                    <Image width={16} height={16} src="/img/trash.svg" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:flex lg:gap-6">
        <div className="hidden lg:block rounded-2xl border border-neutral-gray-4 p-8 max-w-222 max-h-max lg:mb-22">
          <div className="space-y-6">
            <div className="grid grid-cols-4 text-neutral-gray-12 font-bold text-lg leading-5.5">
              <div className="text-right">محصولات</div>
              <div className="text-center">قیمت</div>
              <div className="text-center">تعداد</div>
              <div className="text-left">جمع کل</div>
            </div>

            {basketItems.map((item, index) => (
              <div key={item.id} className="space-y-3">
                <div
                  className={`grid grid-cols-4 items-center ${
                    index !== basketItems.length - 1
                      ? "border-b border-gray-200 pb-6"
                      : ""
                  }`}
                >
                  <div className="flex gap-4">
                    <Image
                      className="object-cover max-w-21 max-h-21 rounded-lg"
                      width={84}
                      height={84}
                      src={item.img}
                      alt=""
                    />
                    <div>
                      <p className="leading-7 text-neutral-gray-10 xl:text-nowrap">
                        {item.title}
                      </p>
                      <p className="text-sm leading-6 text-neutral-gray-10">
                        سایز: {item.size}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm leading-6 text-neutral-gray-10">
                          رنگ:
                        </p>
                        <div
                          style={{ backgroundColor: item.color }}
                          className="w-5 h-5 rounded-sm"
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center items-center">
                    <div>
                      {item.percentOff && (
                        <div className="flex items-center gap-1">
                          <p className="text-sm leading-6 text-neutral-gray-7 line-through">
                            {item.price}
                          </p>
                          <div className="px-3 py-1 bg-cognac-primery rounded-100 text-white text-sm leading-5">
                            {item.percentOff}
                          </div>
                        </div>
                      )}
                      <p className="text-neutral-gray-10 text-sm leading-6">
                        {item.finalPrice} تومان
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center items-center">
                    <div className="flex items-center gap-4">
                      <button className="p-3 rounded-lg border border-neutral-gray-8 cursor-pointer">
                        <Image
                          width={16}
                          height={16}
                          src="/img/add.svg"
                          alt=""
                        />
                      </button>
                      <span>1</span>
                      <button className="p-3 rounded-lg border border-neutral-gray-8 cursor-pointer">
                        <Image
                          width={16}
                          height={16}
                          src="/img/trash.svg"
                          alt=""
                        />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end items-center">
                    <p className="text-sm leading-6 text-neutral-gray-10">
                      {item.finalPrice} تومان
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <BasketDetailsCard step={1} />
      </div>
      {isOpenDeleteModal && (
        <DeleteModal
          handleCloseModal={handleCloseDeleteModal}
          handleDeleteBasket={handleDeleteBasket}
        />
      )}
    </div>
  );
}
