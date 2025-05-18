import React from "react";

export default function DetailsModal({ onClose, children }) {
  return (
    <>
      <div
        className="fixed inset-0 bg-[#1E1E1E] opacity-50 z-50"
        onClick={() => onClose()}
      />
      <div className="bg-white fixed bottom-0 left-0 right-0 z-60 w-full rounded-tr-3xl rounded-tl-3xl pt-4 px-5 pb-6 lg:w-108 lg:p-6 lg:top-1/2 lg:right-1/2 lg:transform lg:translate-x-1/2 lg:-translate-y-1/2 lg:bottom-auto lg:rounded-3xl">
        <div className="flex flex-col justify-between items-center border-b border-neutral-gray-4 mb-4 lg:mb-8 lg:border-none"></div>
        {children}
        <div className="flex justify-end">
          <button
            onClick={() => onClose()}
            className="bg-primary rounded-xl px-3 py-2 text-white mx-3 mt-8 cursor-pointer"
          >
            بستن
          </button>
        </div>
      </div>
    </>
  );
}
