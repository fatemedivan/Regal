import Image from "next/image";

export default function Modal({
  handleCloseModal,
  handleAction,
  title,
  subtitle,
  actiontitle,
  isDeleting,
}) {
  return (
    <>
      <div
        className="fixed inset-0 bg-[#1E1E1E] opacity-50 z-50"
        onClick={(e) => {
          e.stopPropagation();
          handleCloseModal();
        }}
      />
      <div className="bg-white fixed bottom-0 left-0 right-0 z-60 w-full rounded-tr-3xl rounded-tl-3xl pt-4 px-5 pb-6 lg:w-108 lg:p-6 lg:top-1/2 lg:right-1/2 lg:transform lg:translate-x-1/2 lg:-translate-y-1/2 lg:bottom-auto lg:rounded-3xl">
        <div className="flex justify-between items-center pb-4 border-b border-neutral-gray-4 mb-4 lg:mb-8 lg:border-none">
          <p className="leading-7 text-black lg:text-lg lg:font-bold lg:leading-5.5">
            {title}
          </p>
          <Image
            width={16}
            height={16}
            src="/img/close-icon-filter.svg"
            className="cursor-pointer lg:w-6 lg:h-6"
            alt=""
            onClick={(e) => {
              e.stopPropagation();
              handleCloseModal();
            }}
          />
        </div>
        <p className="text-sm leading-7 text-neutral-gray-11 mb-8 lg:mb-10 lg:leading-6">
          {subtitle}
        </p>
        <div className="flex items-center gap-4 justify-center flex-wrap">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCloseModal();
            }}
            className="leading-5.5 py-3.25 px-14.75 border border-neutral-gray-8 rounded-lg cursor-pointer lg:px-17"
          >
            انصراف
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAction();
            }}
            className={`leading-5.5 max-w-40 h-12.5 flex justify-center items-center bg-error-primery text-white py-3.25 px-16.5 rounded-lg cursor-pointer lg:px-18.75 `}
          >
            {isDeleting ? (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[0ms]"></div>
                <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[150ms]"></div>
                <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[300ms]"></div>
              </div>
            ) : (
              <p>{actiontitle}</p>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
