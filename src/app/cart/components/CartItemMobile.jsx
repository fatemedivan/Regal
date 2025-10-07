'use client'
import Image from "next/image";
import React from "react";

export default function CartItemMobile({ item, onIncrease, onDecrease, onDelete }) {
  return (
    <div className="flex items-center gap-2 border-b border-neutral-gray-4 pb-4 mb-4">
      <Image
        width={88}
        height={116}
        src={item.product.images[0].imageUrl}
        alt={item.product.name}
      />
      <div className="w-full">
        <p className="text-sm leading-5 text-neutral-gray-11">
          {item.product.name}
        </p>
        <div className="flex items-center gap-4 my-3.75">
          {item.productSize && (
            <p className="text-xs leading-4.5 text-neutral-gray-9">
              سایز: {item.productSize.size.name}
            </p>
          )}
          {item.productColor && (
            <div className="flex items-center gap-2">
              <p className="text-xs leading-4.5 text-neutral-gray-9">رنگ:</p>
              <div
                style={{
                  backgroundColor: item.productColor.color.hexCode,
                }}
                className="w-5 h-5 rounded-sm"
              ></div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            {item.product.isDiscounted ? (
              <div className="flex items-center gap-1">
                <p className="text-sm leading-4.5 text-neutral-gray-7 line-through">
                  {item.product.price.toLocaleString()}
                </p>
                <div className="px-2 py-0.5 bg-cognac-primery rounded-100 text-white text-sm leading-5">
                  {(
                    ((item.product.price - item.product.discountedPrice) /
                      item.product.price) *
                    100
                  ).toFixed(0) + "%"}
                </div>
              </div>
            ) : null}
            <p className="text-neutral-gray-11 text-sm leading-5 mt-1">
              {item.product.isDiscounted
                ? item.product.discountedPrice.toLocaleString()
                : item.product.price.toLocaleString()}{" "}
              تومان
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onIncrease(item.id, item.quantity)}
              className="p-3 rounded-lg border border-neutral-gray-8 cursor-pointer"
            >
              <Image width={16} height={16} src="/img/add.svg" alt="Add" />
            </button>
            <span>{item.quantity}</span>
            <button className="p-3 rounded-lg border border-neutral-gray-8">
              {item.quantity === 1 ? (
                <Image
                  onClick={async () => {
                    await onDelete(item.id);
                  }}
                  width={16}
                  height={16}
                  src="/img/trash.svg"
                  className="cursor-pointer"
                  alt="Remove"
                />
              ) : (
                <Image
                  onClick={() => {
                    onDecrease(item.id, item.quantity);
                  }}
                  width={16}
                  height={16}
                  src="/img/minus.svg"
                  className="cursor-pointer"
                  alt="Minus"
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
