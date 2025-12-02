import Image from "next/image";
import { ClipLoader } from "react-spinners";
import { useCartActions } from "../../hook/useCart";
import { Formatter } from "@/utils/moneyFormatter";
import { CartItemDesktopProps } from "./types";

export default function CartItemDesktop({
  item,
  index,
  totalCount,
  onUpdate,
  onDelete,
}: CartItemDesktopProps) {
  const { loading, handleIncrease, handleDecrease, handleDelete } =
    useCartActions(onUpdate, onDelete);

  return (
    <div className="space-y-3">
      <div
        className={`grid grid-cols-4 items-center ${
          index !== totalCount - 1 ? "border-b border-gray-200 pb-6" : ""
        }`}
      >
        <div className="flex gap-4">
          <Image
            className="object-cover max-w-21 max-h-21 rounded-lg"
            width={84}
            height={84}
            src={item.product.images[0].imageUrl}
            alt={item.product.name}
          />
          <div>
            <p className="leading-7 text-neutral-gray-10 xl:text-nowrap">
              {item.product.name}
            </p>
            {item.productSize && (
              <p className="text-sm leading-6 text-neutral-gray-10">
                سایز: {item.productSize.name}
              </p>
            )}
            {item.productColor && (
              <div className="flex items-center gap-2">
                <p className="text-sm leading-6 text-neutral-gray-10">رنگ:</p>
                <div
                  style={{
                    backgroundColor: item.productColor.hexCode,
                  }}
                  className="w-5 h-5 rounded-sm"
                ></div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div>
            {item.product.isDiscounted ? (
              <div className="flex items-center gap-1">
                <p className="text-sm leading-6 text-neutral-gray-7 line-through">
                  {Formatter(item.product.price)}
                </p>
                <div className="px-3 py-1 bg-cognac-primery rounded-100 text-white text-sm leading-5">
                  {(
                    ((item.product.price - item.product.discountedPrice) /
                      item.product.price) *
                    100
                  ).toFixed(0) + "%"}
                </div>
              </div>
            ) : null}
            <p className="text-neutral-gray-10 text-sm leading-6">
              {item.product.isDiscounted
                ? Formatter(item.product.discountedPrice)
                : Formatter(item.product.price)}
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleIncrease(item)}
              className="p-3 max-w-10 max-h-10 rounded-lg border border-neutral-gray-8 cursor-pointer"
            >
              {loading.increase ? (
                <ClipLoader size={16} className="w-4 h-4" color="#888" />
              ) : (
                <Image width={16} height={16} src="/img/add.svg" alt="Add" />
              )}
            </button>
            <span>{item.quantity}</span>
            <button className="p-3 max-w-10 max-h-10 rounded-lg border border-neutral-gray-8">
              {item.quantity === 1 ? (
                loading.delete ? (
                  <ClipLoader size={16} className="w-4 h-4" color="#888" />
                ) : (
                  <Image
                    onClick={async () => {
                      await handleDelete(item);
                    }}
                    width={16}
                    height={16}
                    src="/img/trash.svg"
                    className="cursor-pointer"
                    alt="Remove"
                  />
                )
              ) : loading.decrease ? (
                <ClipLoader size={16} className="w-4 h-4" color="#888" />
              ) : (
                <Image
                  onClick={() => {
                    handleDecrease(item);
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

        <div className="flex justify-end items-center">
          <p className="text-sm leading-6 text-neutral-gray-10">
            {Formatter(
              (item.product.isDiscounted
                ? item.product.discountedPrice
                : item.product.price) * item.quantity
            )}{" "}
            تومان
          </p>
        </div>
      </div>
    </div>
  );
}
