import Image from "next/image";
import React from "react";

export default function Breadcrumb({items}) {
  return (
    <ul className="bg-neutral-gray-1 py-3 pr-5 lg:pr-12 overflow-x-hidden">
      <div className="container mx-auto flex items-center gap-1">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex justify-center items-center gap-1 lg:gap-3 min-w-max"
          >
            <p className="text-xs leading-4.5 lg:text-sm lg:leading-6 text-nowrap">
              {item.label}
            </p>
            {index < items.length - 1 && (
              <Image
                width={16}
                height={16}
                src="/img/arrow-left-3.svg"
                alt=""
              />
            )}
          </li>
        ))}
      </div>
    </ul>
  );
}
