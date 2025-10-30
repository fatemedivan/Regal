"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DetailsModal from "./DetailsModal";
import DeleteModal from "./DeleteModal";

export default function BasketDetails({
  selectedAddressId,
  step,
  count,
  totalPric,
  cart,
  addOrders,
  deleteCart,
  isLoading,
}) {
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleCloseDetailsModal = () => {
    setIsOpenDetailsModal(false);

  };
  const handleCloseDeleteModal = () => {
    deleteCart();
    setIsOpenDeleteModal(false);

  };

  const cleanTotalPrice = parseInt(
    (totalPric || "0").toString().replace(/,/g, "")
  );

  const shippingCost = step === 3 ? 50000 : 0;
  const finalAmount = cleanTotalPrice + shippingCost;

  const handleClick = () => {
    if (step === 2 && !selectedAddressId) {
      setShowError(true);
    }
  };

  return (
    <>
      <div className="mt-8 lg:border lg:border-neutral-gray-4 lg:rounded-2xl lg:p-8 lg:mt-0 mb-auto lg:max-w-108">
        {step === 1 ? (
          <div className="hidden lg:flex justify-between items-center pb-6 mb-6 border-b border-neutral-gray-4">
            <h6 className="text-lg font-bold leading-5.5 text-black">
              سبد خرید
            </h6>
            <Image
              width={24}
              height={24}
              onClick={() => {
                setIsOpenDeleteModal(true);

              }}
              className="cursor-pointer"
              src="/img/trash-2.svg"
              alt=""
            />
          </div>
        ) : (
          <div className="hidden lg:block">
            <h5 className="font-semibold leading-5 text-neutral-gray-13 pb-6.5 mb-6 border-b border-neutral-gray-4">
              سبد خرید
            </h5>
            <div className="pb-6 mb-6 border-b border-neutral-gray-4">
              <table className="w-full text-sm text-neutral-gray-11">
                <tbody>
                  {cart?.items?.map((cartItem) => (
                    <tr key={cartItem.id}>
                      <td className="py-1">
                        {cartItem.product?.name || "نامشخص"}
                      </td>
                      <td className="py-1 text-center">
                        {cartItem.quantity} عدد
                      </td>
                      <td className="py-1 text-left">
                        {cartItem.product?.isDiscounted &&
                          cartItem.product?.discountedPrice !== null
                          ? cartItem.product.discountedPrice
                          : cartItem.product?.price}{" "}
                        تومان
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {step === 1 ? (
          <h5 className="font-semibold leading-5 text-neutral-gray-13 border-b border-neutral-gray-4 pb-4 mb-4 lg:border-none lg:pb-0 lg:font-normal lg:leading-7">
            جزئیات پرداخت
          </h5>
        ) : (
          <>
            <div className="flex justify-between items-center border-b border-neutral-gray-4 pb-4 mb-4 lg:border-none lg:pb-0 ">
              <h5 className="font-semibold leading-5 text-neutral-gray-13 lg:font-normal lg:leading-7">
                جزئیات پرداخت
              </h5>
              <div
                className="flex gap-2 items-center lg:hidden"
                onClick={() => {
                  setIsOpenDetailsModal(true);

                }}
              >
                <p className="text-cognac-primery text-sm leading-5 cursor-pointer">
                  مشاهده اقلام
                </p>
                <Image
                  width={16}
                  height={16}
                  src="/img/arrow-left-5.svg"
                  alt=""
                  className="cursor-pointer"
                />
              </div>
            </div>
          </>
        )}

        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm leading-6 text-neutral-gray-11">تعداد</p>
            <p className="text-sm leading-6 text-neutral-gray-10">
              {" "}
              {count} عدد
            </p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm leading-6 text-neutral-gray-11">
              قیمت کالاها
            </p>
            <p className="text-sm leading-6 text-neutral-gray-10">
              {totalPric} تومان
            </p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm leading-6 text-cognac-primery">تخفیف</p>
            <p className="text-sm leading-6 text-cognac-primery">۰ تومان</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            {step === 1 || step === 2 ? (
              <>
                <p className="text-sm leading-6 text-neutral-gray-11">
                  هزینه ارسال
                </p>
                <p className="text-sm leading-6 text-neutral-gray-10">
                  ۰ تومان
                </p>
              </>
            ) : (
              <>
                <p className="text-sm leading-6 text-neutral-gray-11">
                  هزینه ارسال
                </p>
                <p className="text-sm leading-6 text-neutral-gray-10">
                  {shippingCost} تومان
                </p>
              </>
            )}
          </div>
          {step !== 3 && (
            <div className="flex items-center mb-4 gap-1">
              <Image width={16} height={16} src="/img/warning-2.svg" alt="" />
              <p className="text-xs leading-4.5 text-warning-shade-1">
                هزینه ارسال در ادامه بر اساس آدرس، زمان و نحوه ارسال انتخابی شما
                محاسبه و به این مبلغ اضافه خواهد شد.
              </p>
            </div>
          )}

          <div
            className={`flex justify-between items-center mb-4 ${step === 1 && "border-b pb-4 border-neutral-gray-4"
              }`}
          >
            <p className="text-sm leading-6 text-neutral-gray-11">
              مبلغ قابل پرداخت
            </p>
            <p className="text-sm leading-6 text-neutral-gray-10">
              {finalAmount} تومان
            </p>
          </div>
          {step === 1 && (
            <p className="text-xs leading-4.5 text-neutral-gray-9 mt-4 mb-6 lg:text-sm lg:leading-5">
              کالاهای موجود در سبد شما رزرو و ثبت نشده اند. برای ثبت سفارش مراحل
              بعدی را تکمیل کنید.
            </p>
          )}
          <div className="border border-neutral-gray-4 rounded-2xl p-5 mb-16 lg:mb-0 lg:border-none lg:p-0">
            <div className="flex items-center gap-2 mb-4 lg:hidden">
              <p className="text-neutral-gray-13 text-xs leading-5">
                مبلغ قابل پرداخت:
              </p>
              <h6 className="text-neutral-gray-13 text-sm font-semibold leading-4">
                {finalAmount} تومان
              </h6>
            </div>
            <div className="flex justify-center items-center">
              {showError && (
                <p className="text-xs text-center leading-4.5 mb-4 transition duration-200 ease-in-out text-error-primery">
                  باید روی یک ادرس کلیک کرده و ان را انتخاب کنید
                </p>
              )}
              <Link
                href={
                  step === 1
                    ? "complete-data"
                    : step === 2 && selectedAddressId
                      ? "payment"
                      : "#"
                }
                onClick={(e) => {
                  if (step === 2 && !selectedAddressId) {
                    e.preventDefault();
                    setShowError(true);
                  } else if (step === 3) {

                    e.preventDefault();
                    addOrders();
                  }
                }}
              >
                {
                  (step === 2 && !selectedAddressId) && <p className="text-sm leading-4.5 text-error-primery mx-auto mb-2"> لطفا روی ادرس موردنظر خود کلیک کرده و ان را انتخاب کنید</p>
                }

                <button
                  onClick={step !== 3 ? handleClick : undefined}
                  disabled={isLoading || (step === 2 && !selectedAddressId)}
                  className={`bg-cognac-primery leading-5.5 text-white rounded-lg py-3.25 px-26 lg:px-24 xl:px-36 cursor-pointer transition-opacity duration-300
                             ${isLoading || (step === 2 && !selectedAddressId) ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isLoading && step === 3
                    ? "در حال ثبت سفارش..."
                    : step === 1
                      ? " ثبت سفارش"
                      : step === 2
                        ? "تایید و ادامه"
                        : step === 3
                          ? "پرداخت"
                          : ""}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {isOpenDetailsModal && (
        <DetailsModal handleCloseModal={handleCloseDetailsModal} cart={cart} />
      )}
      {isOpenDeleteModal && (
        <DeleteModal
          subtitle={"آیا از حذف سبد خرید اطمینان دارید؟"}
          actiontitle={"حذف"}
          title={"حذف سبد خرید"}
          handleCloseModal={handleCloseDeleteModal}
          handleAction={handleCloseDeleteModal}
        />
      )}
    </>
  );
}