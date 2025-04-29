import Image from "next/image";
import React from "react";

export default function ProgressBar({ progress }) {
  return (
    <div className="relative w-full mx-auto my-8 lg:my-12">
      <div className="absolute top-1/2 left-0 w-full flex z-0">
        <div
          className={`${progress === "basket" && "w-1/4"} ${
            progress === "payment" && "w-4/4"
          } ${
            progress === "compeleteData" && "w-3/4"
          } border-t-2 border-dashed border-cognac-primery`}
        ></div>
        <div
          className={`${progress === "basket" && "w-3/4"} ${
            progress === "payment" && "hidden"
          }  ${
            progress === "compeleteData" && "w-1/4"
          } border-t-2 border-dashed border-neutral-gray-6`}
        ></div>
      </div>

      <div className="relative flex items-center justify-between w-full py-2">
        <div className="bg-white pl-1.5 relative z-20 flex items-center gap-2">
          <Image
            className="lg:w-5 lg:h-5"
            width={24}
            height={24}
            src="/img/bag-2.svg"
            alt=""
          />
          <p
            className={`text-cognac-primery hidden lg:block ${
              progress === "basket" && "text-xl font-bold leading-5.5"
            }`}
          >
            سبد خرید
          </p>
        </div>
        <div className="bg-white p-1.5 relative z-20 flex items-center gap-2">
          <Image
            className={`lg:w-5 lg:h-5 ${
              (progress === "payment" || progress === "compeleteData") &&
              "hidden"
            }`}
            width={24}
            height={24}
            src="/img/pen-add.svg"
            alt=""
          />
          <Image
            className={`${
              progress === "payment" || progress === "compeleteData"
                ? "block"
                : "hidden"
            } lg:w-5 lg:h-5`}
            width={24}
            height={24}
            src="/img/pen-add-2.svg"
            alt=""
          />
          <p
            className={`leading-7 hidden lg:block ${
              progress === "compeleteData" || progress === "payment"
                ? "text-cognac-primery "
                : "text-neutral-gray-6"
            } ${
              progress === "compeleteData" && "text-xl font-bold leading-5.5"
            }`}
          >
            تکمیل اطلاعات
          </p>
        </div>
        <div className="bg-white pr-1.5 relative z-20 flex items-center gap-2">
          <Image
            className={`lg:w-5 lg:h-5 ${progress === "payment" && "hidden"}`}
            width={24}
            height={24}
            src="/img/card-pos.svg"
            alt=""
          />
          <Image
            className={`lg:w-5 lg:h-5 ${
              progress === "payment" ? "block" : "hidden"
            }`}
            width={24}
            height={24}
            src="/img/card-pos-2.svg"
            alt=""
          />
          <p
            className={`leading-7  hidden lg:block ${
              progress === "payment"
                ? "text-cognac-primery"
                : "text-neutral-gray-6"
            } ${progress === "payment" && "text-xl font-bold leading-5.5"}`}
          >
            پرداخت
          </p>
        </div>
      </div>
    </div>
  );
}
