import Image from "next/image";
import React from "react";

export default function DetailsModal({ handleCloseModal, cart }) {
  return (
    <>
      <div
        className="fixed inset-0 bg-[#1E1E1E] opacity-50 z-50"
        onClick={() => handleCloseModal()}
      />
      <div className="bg-white fixed bottom-0 left-0 right-0 z-60 w-full rounded-tr-3xl rounded-tl-3xl px-5 pt-4 pb-6">
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-neutral-gray-4">
          <p className="leading-7 text-neutral-gray-13">اقلام سفارش</p>
          <Image
            width={16}
            height={16}
            src="/img/close-icon-filter.svg"
            className="cursor-pointer lg:w-6 lg:h-6"
            alt=""
            onClick={() => handleCloseModal()}
          />
        </div>
        <div>
          {cart.map((cartItem) => (
            <div
              key={cartItem.id}
              className="flex justify-between items-center mb-2"
            >
              <p className="text-sm leading-6 text-neutral-gray-11">
                لباس میدی رکسان
              </p>
              <p className="text-sm leading-6 text-neutral-gray-11">
                {cartItem.quantity} عدد
              </p>
              <p className="text-sm leading-6 text-neutral-gray-10">
                {Math.round(cartItem.Entity.price)} تومان
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
