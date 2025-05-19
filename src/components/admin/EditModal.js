import React from "react";

export default function EditModal({ onSubmit, children }) {
  return (
    <>
      <div
        className="fixed inset-0 bg-[#1E1E1E] opacity-50 z-50"
        onClick={() => onSubmit()}
      />
      <div className="bg-white fixed  z-60 w-108 p-4 top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 bottom-auto rounded-3xl">
        <div className="flex flex-col justify-between items-center mb-4">
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

