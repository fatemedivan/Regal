"use client";

import BasketDetailsCard from "@/components/common/BasketDetailsCard";
import ProgressBar from "@/components/common/ProgressBar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DeleteModal from "@/components/common/DeleteModal";
import { useRouter } from "next/navigation";
import { useBasketContext } from "@/context/BasketContext";
import { toast, ToastContainer } from "react-toastify";
import { useScrollLockContext } from "@/context/ScrollLockContext";

export default function Page() {
  const router = useRouter();
  const {
    cart,
    countOfProduct,
    totalPric,
    isEmptyCart,
    updateCartItemQuantity,
    removeCartItem,
    clearEntireCart,
  } = useBasketContext();

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const handleIncreaseQuantity = async (cartItemId, currentQuantity) => {

    try {
      await updateCartItemQuantity(cartItemId, currentQuantity + 1);

    } catch (error) {
      console.error("Error increasing quantity in handler:", error);

      toast.error("خطایی در افزایش تعداد رخ داد.");
    }
  };

  const handleDecreaseQuantity = async (cartItemId, currentQuantity) => {
    try {
      if (currentQuantity === 1) {
        await removeCartItem(cartItemId);

      } else {
        await updateCartItemQuantity(cartItemId, currentQuantity - 1);

      }
    } catch (error) {
      console.error("Error decreasing quantity in handler:", error);
      toast.error("خطایی در کاهش تعداد رخ داد.");
    }
  };

  const handleDeleteEntireBasket = async () => {
    try {
      await clearEntireCart();
      setIsOpenDeleteModal(false);
      closeModal();
    } catch (error) {
      console.error("Error deleting entire cart:", error);
      toast.error("خطایی در حذف سبد خرید رخ داد.");
    }
  };

  const { openModal, closeModal } = useScrollLockContext();
  const handleCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
    closeModal();
  };

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
                alt="Empty Cart"
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
              alt="Back"
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
              alt="Clear Cart"
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
              cart.items &&
              cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 border-b border-neutral-gray-4 pb-4 mb-4"
                >
                  <Image
                    width={88}
                    height={116}
                    src={item.product.images[0].imageUrl}
                    alt={item.product.name}
                  />
                  <div className="w-full">
                    <p className="text-sm leading-5 text-neutral-gray-11">
                      {item.product.name}
                    </p>
                    <div className="flex items-center gap-4 my-3.75">
                      {item.productSize && (
                        <p className="text-xs leading-4.5 text-neutral-gray-9">
                          سایز: {item.productSize.size.name}
                        </p>
                      )}
                      {item.productColor && (
                        <div className="flex items-center gap-2">
                          <p className="text-xs leading-4.5 text-neutral-gray-9">
                            رنگ:
                          </p>
                          <div
                            style={{
                              backgroundColor: item.productColor.color.hexCode,
                            }}
                            className="w-5 h-5 rounded-sm"
                          ></div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div>
                        {item.product.isDiscounted ? (
                          <div className="flex items-center gap-1">
                            <p className="text-sm leading-4.5 text-neutral-gray-7 line-through">
                              {item.product.price.toLocaleString()}
                            </p>
                            <div className="px-2 py-0.5 bg-cognac-primery rounded-100 text-white text-sm leading-5">
                              {(
                                ((item.product.price -
                                  item.product.discountedPrice) /
                                  item.product.price) *
                                100
                              ).toFixed(0) + "%"}
                            </div>
                          </div>
                        ) : null}
                        <p className="text-neutral-gray-11 text-sm leading-5 mt-1">
                          {item.product.isDiscounted
                            ? item.product.discountedPrice.toLocaleString()
                            : item.product.price.toLocaleString()}{" "}
                          تومان
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() =>
                            handleIncreaseQuantity(item.id, item.quantity)
                          }
                          className="p-3 rounded-lg border border-neutral-gray-8 cursor-pointer"
                        >
                          <Image
                            width={16}
                            height={16}
                            src="/img/add.svg"
                            alt="Add"
                          />
                        </button>
                        <span>{item.quantity}</span>
                        <button className="p-3 rounded-lg border border-neutral-gray-8">
                          {item.quantity === 1 ? (
                            <Image
                              onClick={async () => {
                                await removeCartItem(item.id);

                              }}
                              width={16}
                              height={16}
                              src="/img/trash.svg"
                              className="cursor-pointer"
                              alt="Remove"
                            />
                          ) : (
                            <Image
                              onClick={() => {
                                handleDecreaseQuantity(item.id, item.quantity);
                              }}
                              width={16}
                              height={16}
                              src="/img/minus.svg"
                              className="cursor-pointer"
                              alt="Minus"
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

                {cart &&
                  cart.items &&
                  cart.items.map((item, index) => (
                    <div key={item.id} className="space-y-3">
                      <div
                        className={`grid grid-cols-4 items-center ${index !== cart.items.length - 1
                          ? "border-b border-gray-200 pb-6"
                          : ""
                          }`}
                      >
                        <div className="flex gap-4">
                          <Image
                            className="object-cover max-w-21 max-h-21 rounded-lg"
                            width={84}
                            height={84}
                            src={item.product.images[0].imageUrl}
                            alt={item.product.name}
                          />
                          <div>
                            <p className="leading-7 text-neutral-gray-10 xl:text-nowrap">
                              {item.product.name}
                            </p>
                            {item.productSize && (
                              <p className="text-sm leading-6 text-neutral-gray-10">
                                سایز: {item.productSize.size.name}
                              </p>
                            )}
                            {item.productColor && (
                              <div className="flex items-center gap-2">
                                <p className="text-sm leading-6 text-neutral-gray-10">
                                  رنگ:
                                </p>
                                <div
                                  style={{
                                    backgroundColor:
                                      item.productColor.color.hexCode,
                                  }}
                                  className="w-5 h-5 rounded-sm"
                                ></div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-center items-center">
                          <div>
                            {item.product.isDiscounted ? (
                              <div className="flex items-center gap-1">
                                <p className="text-sm leading-6 text-neutral-gray-7 line-through">
                                  {item.product.price.toLocaleString()}
                                </p>
                                <div className="px-3 py-1 bg-cognac-primery rounded-100 text-white text-sm leading-5">
                                  {(
                                    ((item.product.price -
                                      item.product.discountedPrice) /
                                      item.product.price) *
                                    100
                                  ).toFixed(0) + "%"}
                                </div>
                              </div>
                            ) : null}
                            <p className="text-neutral-gray-10 text-sm leading-6">
                              {item.product.isDiscounted
                                ? item.product.discountedPrice.toLocaleString()
                                : item.product.price.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-center items-center">
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() =>
                                handleIncreaseQuantity(item.id, item.quantity)
                              }
                              className="p-3 rounded-lg border border-neutral-gray-8 cursor-pointer"
                            >
                              <Image
                                width={16}
                                height={16}
                                src="/img/add.svg"
                                alt="Add"
                              />
                            </button>
                            <span>{item.quantity}</span>
                            <button className="p-3 rounded-lg border border-neutral-gray-8">
                              {item.quantity === 1 ? (
                                <Image
                                  onClick={async () => {
                                    await removeCartItem(item.id);

                                  }}
                                  width={16}
                                  height={16}
                                  src="/img/trash.svg"
                                  className="cursor-pointer"
                                  alt="Remove"
                                />
                              ) : (
                                <Image
                                  onClick={() => {
                                    handleDecreaseQuantity(
                                      item.id,
                                      item.quantity
                                    );
                                  }}
                                  width={16}
                                  height={16}
                                  src="/img/minus.svg"
                                  className="cursor-pointer"
                                  alt="Minus"
                                />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-end items-center">
                          <p className="text-sm leading-6 text-neutral-gray-10">
                            {(
                              (item.product.isDiscounted
                                ? item.product.discountedPrice
                                : item.product.price) * item.quantity
                            ).toLocaleString()}{" "}
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
              deleteCart={() => {
                setIsOpenDeleteModal(true);
                openModal();
              }}
            />
          </div>
          {isOpenDeleteModal && (
            <DeleteModal
              handleCloseModal={handleCloseDeleteModal}
              handleAction={handleDeleteEntireBasket}
              title={"حذف سبد خرید"}
              subtitle={"آیا از حذف کل سبد خرید اطمینان دارید؟"}
              actiontitle={"حذف"}
            />
          )}
        </>
      )}
    </div>
  );
}