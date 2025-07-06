import Image from "next/image";
import React from "react";

export default function TimeModal({ handleCloseModal, mainTime, setMainTime }) {
  return (
    <>
      <div
        className="fixed inset-0 bg-[#1E1E1E] opacity-50 z-50"
        onClick={() => handleCloseModal()}
      />
      <div className="bg-white fixed bottom-0 left-0 right-0 z-60 w-full rounded-tr-3xl rounded-tl-3xl pt-4 px-5 pb-6">
        <div className="flex justify-between items-center pb-4 border-b border-neutral-gray-4 mb-4">
          <p className="leading-7 text-black">
            بازه زمانی
          </p>
          <Image
            width={16}
            height={16}
            src="/img/close-icon-filter.svg"
            className="cursor-pointer"
            alt=""
            onClick={() => handleCloseModal()}
          />
        </div>
        <div>
          <div className="flex flex-col gap-4">
            <input className={`border-b border-neutral-gray-4 pb-4 ${mainTime === 'ساعت ۹ تا ۱۲' ? "text-cognac-primery font-bold" : ''} outline-none cursor-pointer`} readOnly value={'ساعت ۹ تا ۱۲'} onClick={(e) => {
              setMainTime(e.target.value)
              handleCloseModal()
            }} />
            <input className={`border-b border-neutral-gray-4 pb-4 ${mainTime === 'ساعت ۱۲ تا ۱۵' ? "text-cognac-primery font-bold" : ''} outline-none cursor-pointer`} readOnly value={'ساعت ۱۲ تا ۱۵'} onClick={(e) => {
              setMainTime(e.target.value)
              handleCloseModal()
            }} />
            <input className={`pb-4 ${mainTime === 'ساعت ۱۵ تا ۱۸' ? "text-cognac-primery font-bold" : ''} outline-none cursor-pointer`} readOnly value={'ساعت ۱۵ تا ۱۸'} onClick={(e) => {
              setMainTime(e.target.value)
              handleCloseModal()
            }} />
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => handleCloseModal()}
              className="bg-white rounded-lg border border-cognac-primery text-cognac-primery py-3.25 px-30 cursor-pointer"
            >
              تایید
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
