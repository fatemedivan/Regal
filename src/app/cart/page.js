"use client";

import BasketDetailsCard from "@/components/common/BasketDetailsCard";
import ProgressBar from "@/components/common/ProgressBar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DeleteModal from "@/components/common/DeleteModal";
import { useRouter } from "next/navigation";
import { useScrollLockContext } from "@/context/ScrollLockContext";
import { useBasketContext } from "@/context/BasketContext";
import { toast, ToastContainer } from "react-toastify";

export default function Page() {
  const router = useRouter();
  const {
    removeFromCart,
    getCart,
    cart,
    countOfProduct,
    totalPric,
    isEmptyCart,
  } = useBasketContext();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [token, setToken] = useState("");
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const increaseQuantity = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/cart/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
      if (res.ok) {
        toast.success("با موفقیت افزایش یافت");
        await getCart();
      } else {
        toast.error("ناموفق");
      }
    } catch (error) {
      console.log(error);
      toast.error("خطایی رخ داد");
    }
  };

  const decreaseQuantity = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/cart/${id}/stockQuantity`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
      if (res.ok) {
        toast.success("با موفقیت کاهش یافت");
        await getCart();
      } else {
        toast.error("ناموفق");
      }
    } catch (error) {
      console.log(error);
      toast.error("خطایی رخ داد");
    }
  };

  const deleteCart = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${baseUrl}/cart`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);

      if (res.ok) {
        getCart();
        toast.success("با موفقیت حذف شد");
      } else {
        toast.error("ناموفق");
      }
    } catch (error) {
      toast.error("خطایی رخ داد");
    }
  };

  const handleCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
    closeModal();
  };
  const handleDeleteBasket = () => {
    deleteCart();
    console.log("deleted");
    closeModal();
    setIsOpenDeleteModal(false);
  };
  const { openModal, closeModal } = useScrollLockContext();

  return (
    <div className="container mx-auto px-5 mb-22 lg:px-12">
      <ToastContainer autoClose={2000} className={"custom-toast-container"} />
      {isEmptyCart ? (
        <div className="mt-35 mb-6 mx-5 lg:mb-33.75 lg:mt-26">
          <div className="flex justify-center items-center mb-55.5 lg:mb-8">
            <div>
              <Image
                width={180}
                height={162}
                className="lg:w-62.5 lg:h-56.5"
                src="/img/error-404.svg"
                alt=""
              />
              <p className="leading-7 text-neutral-gray-9 mt-6 text-center">
                سبد خرید شما خالی است
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={() => router.push("/products")}
              className="text-sm leading-5 bg-cognac-primery rounded-lg py-3.5 px-20 sm:px-30 text-white cursor-pointer lg:text-[1rem] lg:leading-5.5 lg:px-12"
            >
              مشاهده محصولات
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-6 flex justify-between items-center lg:hidden">
            <Image
              width={24}
              height={24}
              className="cursor-pointer"
              src="/img/arrow-right-6.svg"
              alt=""
              onClick={() => router.back()}
            />
            <h3 className="text-xl font-semibold leading-6 text-neutral-gray-13">
              سبد خرید
            </h3>
            <Image
              width={24}
              height={24}
              className="cursor-pointer"
              src="/img/trash-2.svg"
              alt=""
              onClick={() => {
                setIsOpenDeleteModal(true);
                openModal();
              }}
            />
          </div>
          <div className="xl:px-40.5">
            <ProgressBar progress={"basket"} />
          </div>

          <div className="lg:hidden">
            {cart &&
              cart.map((item) => (
                <div
                  key={`${item.id}-${item.Entity.size}-${item.Entity.productColor.color}`}
                  className="flex items-center gap-2 border-b border-neutral-gray-4 pb-4 mb-4"
                >
                  <Image
                    width={88}
                    height={116}
                    src="/img/itemCard-1.svg"
                    alt=""
                  />
                  <div className="w-full">
                    <p className="text-sm leading-5 text-neutral-gray-11">
                      {item.Entity.title}
                    </p>
                    <div className="flex items-center gap-4 my-3.75">
                      <p className="text-xs leading-4.5 text-neutral-gray-9">
                        سایز: {item.Entity.size}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs leading-4.5 text-neutral-gray-9">
                          رنگ:
                        </p>
                        <div
                          style={{
                            backgroundColor: item.Entity.productColor.color,
                          }}
                          className="w-5 h-5 rounded-sm"
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div>
                        {item.percentOff && (
                          <div className="flex items-center gap-1">
                            <p className="text-sm leading-4.5 text-neutral-gray-7 line-through">
                              {item.Entity.price.toLocaleString()}
                            </p>
                            <div className="px-2 py-0.5 bg-cognac-primery rounded-100 text-white text-sm leading-5">
                              {item.percentOff}
                            </div>
                          </div>
                        )}
                        <p className="text-neutral-gray-11 text-sm leading-5 mt-1">
                          {item.Entity.price.toLocaleString()} تومان
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => increaseQuantity(item.entityId)}
                          className="p-3 rounded-lg border border-neutral-gray-8 cursor-pointer"
                        >
                          <Image
                            width={16}
                            height={16}
                            src="/img/add.svg"
                            alt=""
                          />
                        </button>
                        <span>{item.quantity}</span>
                        <button className="p-3 rounded-lg  border border-neutral-gray-8">
                          {item.quantity === 1 ? (
                            <Image
                              onClick={async () => {
                                await removeFromCart(item.entityId);
                              }}
                              width={16}
                              height={16}
                              src="/img/trash.svg"
                              className="cursor-pointer"
                              alt=""
                            />
                          ) : (
                            <Image
                              onClick={() => {
                                decreaseQuantity(item.entityId);
                              }}
                              width={16}
                              height={16}
                              src="/img/minus.svg"
                              className="cursor-pointer"
                              alt=""
                            />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="lg:flex lg:justify-evenly lg:gap-6">
            <div className="hidden lg:block rounded-2xl border border-neutral-gray-4 p-8 max-w-222 max-h-max lg:mb-22">
              <div className="space-y-6">
                <div className="grid grid-cols-4 text-neutral-gray-12 font-bold text-lg leading-5.5">
                  <div className="text-right">محصولات</div>
                  <div className="text-center">قیمت</div>
                  <div className="text-center">تعداد</div>
                  <div className="text-left">جمع کل</div>
                </div>

                {cart.map((item, index) => (
                  <div key={item.id} className="space-y-3">
                    <div
                      className={`grid grid-cols-4 items-center ${
                        index !== cart.length - 1
                          ? "border-b border-gray-200 pb-6"
                          : ""
                      }`}
                    >
                      <div className="flex gap-4">
                        <Image
                          className="object-cover max-w-21 max-h-21 rounded-lg"
                          width={84}
                          height={84}
                          src="/img/itemCard-1.svg"
                          alt=""
                        />
                        <div>
                          <p className="leading-7 text-neutral-gray-10 xl:text-nowrap">
                            {item.title}
                          </p>
                          <p className="text-sm leading-6 text-neutral-gray-10">
                            سایز: {item.Entity.size}
                          </p>
                          <div className="flex items-center gap-2">
                            <p className="text-sm leading-6 text-neutral-gray-10">
                              رنگ:
                            </p>
                            <div
                              style={{
                                backgroundColor: item.Entity.productColor.color,
                              }}
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
                                {item.Entity.price.toLocaleString()}
                              </p>
                              <div className="px-3 py-1 bg-cognac-primery rounded-100 text-white text-sm leading-5">
                                {item.percentOff}
                              </div>
                            </div>
                          )}
                          <p className="text-neutral-gray-10 text-sm leading-6">
                            {item.Entity.price.toLocaleString()} تومان
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-center items-center">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => increaseQuantity(item.entityId)}
                            className="p-3 rounded-lg border border-neutral-gray-8 cursor-pointer"
                          >
                            <Image
                              width={16}
                              height={16}
                              src="/img/add.svg"
                              alt=""
                            />
                          </button>
                          <span>{item.quantity}</span>
                          <button className="p-3 rounded-lg border border-neutral-gray-8">
                            {item.quantity === 1 ? (
                              <Image
                                onClick={async () => {
                                  await removeFromCart(item.entityId);
                                }}
                                width={16}
                                height={16}
                                src="/img/trash.svg"
                                className="cursor-pointer"
                                alt=""
                              />
                            ) : (
                              <Image
                                onClick={() => {
                                  decreaseQuantity(item.entityId);
                                }}
                                width={16}
                                height={16}
                                src="/img/minus.svg"
                                className="cursor-pointer"
                                alt=""
                              />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-end items-center">
                        <p className="text-sm leading-6 text-neutral-gray-10">
                          {(item.Entity.price * item.quantity).toLocaleString()}{" "}
                          تومان
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <BasketDetailsCard
              step={1}
              count={countOfProduct}
              totalPric={totalPric}
              cart={cart}
              deleteCart={deleteCart}
            />
          </div>
          {isOpenDeleteModal && (
            <DeleteModal
              handleCloseModal={handleCloseDeleteModal}
              handleAction={handleDeleteBasket}
              title={"حذف سبد خرید"}
              subtitle={"آیا از حذف سبد خرید اطمینان دارید؟"}
              actiontitle={"حذف"}
            />
          )}
        </>
      )}
    </div>
  );
}
