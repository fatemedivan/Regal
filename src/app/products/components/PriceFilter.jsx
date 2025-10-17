import React from "react";
import Image from "next/image";

const PriceFilter = React.memo(
  ({
    isOpen,
    onToggle,
    minPrice,
    maxPrice,
    onMinPriceChange,
    onMaxPriceChange,
    onApply,
    defaultMinPrice,
    defaultMaxPrice,
    isApplying = false,
  }) => {
    return (
      <li>
        <div
          onClick={onToggle}
          className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-gray-4 cursor-pointer"
        >
          <p className="text-sm font-semibold leading-4 w-full lg:text-[1rem] lg:leading-7">
            قیمت
          </p>
          <Image
            width={16}
            height={16}
            src={isOpen ? "/img/arrow-up.svg" : "/img/arrow-down-3.svg"}
            alt=""
          />
        </div>
        {isOpen && (
          <div>
            <div className="relative w-full">
              <input
                type="range"
                min={defaultMinPrice}
                max={defaultMaxPrice}
                step={10000}
                value={minPrice}
                onChange={(e) => onMinPriceChange(Number(e.target.value))}
                className="absolute bottom-2.5 w-full h-0.5 bg-transparent appearance-none"
              />
              <input
                type="range"
                min={defaultMinPrice}
                max={defaultMaxPrice}
                step={10000}
                value={maxPrice}
                onChange={(e) => onMaxPriceChange(Number(e.target.value))}
                className="w-full h-0.5 bg-neutral-gray-5 rounded-lg appearance-none"
              />
            </div>
            <div className="flex items-center gap-2.5 text-neutral-gray-7 w-full mt-4 lg:mt-5">
              <button className="border border-neutral-gray-5 rounded-lg py-2.75 px-9 text-xs leading-4.5 lg:px-5">
                {minPrice.toLocaleString()} <span className="mr-1">تومان</span>
              </button>
              <span className="leading-5 text-sm">تا</span>
              <button className="border border-gray-500 rounded-lg py-2.75 px-9 text-xs leading-4.5 lg:px-5">
                {maxPrice.toLocaleString()} <span className="mr-1">تومان</span>
              </button>
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={onApply}
                disabled={isApplying}
                className="px-6 py-2 bg-cognac-primary text-white rounded-lg text-sm flex items-center justify-center gap-2 mx-auto"
              >
                {isApplying ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    در حال اعمال...
                  </>
                ) : (
                  "اعمال قیمت"
                )}
              </button>
            </div>
          </div>
        )}
      </li>
    );
  }
);

export default PriceFilter;
