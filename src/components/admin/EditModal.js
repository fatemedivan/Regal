import React from "react";

export default function EditModal({onCancel ,onSubmit, children, isLoading }) {
  return (
    <>
      <div
        className="fixed inset-0 bg-[#1E1E1E] opacity-50 z-50"
        onClick={() => onCancel()}
      />
      <div className="bg-white fixed  z-60 w-108 p-4 top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 bottom-auto rounded-3xl">
        <div className="flex flex-col justify-between items-center mb-2">
          <h1 className="text-xl text-center mb-5">
            اطلاعات جدید را وارد کنید
          </h1>
          {children}

          <button
            onClick={() => onSubmit()}
            className="bg-cognac-primery rounded-xl px-6 py-3 text-white mx-3 mt-3 cursor-pointer"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[0ms]"></div>
                <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[150ms]"></div>
                <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[300ms]"></div>
              </div>
            ) : (
              " ثبت اطلاعات جدید"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
