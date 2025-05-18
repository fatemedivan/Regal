import React from "react";

export default function EditModal({ onSubmit, children }) {
  return (
    <>
      <div
        className="fixed inset-0 bg-[#1E1E1E] opacity-50 z-50"
        onClick={() => onSubmit()}
      />
      <div className="bg-white fixed bottom-0 left-0 right-0 z-60 w-full rounded-tr-3xl rounded-tl-3xl pt-4 px-5 pb-6 lg:w-108 lg:p-6 lg:top-1/2 lg:right-1/2 lg:transform lg:translate-x-1/2 lg:-translate-y-1/2 lg:bottom-auto lg:rounded-3xl">
        <div className="flex flex-col justify-between items-center border-b border-neutral-gray-4 mb-4 lg:mb-8 lg:border-none">
          <h1 className="text-xl text-center mb-5">
            اطلاعات جدید را وارد کنید
          </h1>
          {children}
          <div className="flex justify-end">
            <button
              onClick={() => onSubmit()}
              className="bg-cognac-primery rounded-xl px-6 py-3 text-white mx-3 mt-8 cursor-pointer"
            >
              ثبت اطلاعات جدید
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

