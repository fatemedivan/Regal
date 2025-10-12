"use client";

import { useState } from "react";
// import { useScrollLockContext } from "@/context/ScrollLockContext";
import { useBasketContext } from "@/context/BasketContext";
import { toast, ToastContainer } from "react-toastify";
import BasketDetailsCard from "@/components/BasketDetailsCard";
import ProgressBar from "@/components/ProgressBar";
import DeleteModal from "@/components/DeleteModal";
import Empty from "./components/Empty";

import CartItemDesktop from "./components/CartItemDesktop";
import CartItemMobile from "./components/CartItemMobile";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";

export default function Page() {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  // const { openModal, closeModal } = useScrollLockContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    cart,
    countOfProduct,
    totalPric,
    isEmptyCart,
    updateCartItemQuantity,
    removeCartItem,
    clearEntireCart,
  } = useBasketContext();

  const handleCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
  //  closeModal();
  };

  const handleDeleteEntireBasket = async () => {
    try {
      setIsDeleting(true);
      await clearEntireCart();
      setIsOpenDeleteModal(false);
    //  closeModal();
    } catch (error) {
      toast.error("خطایی در حذف سبد خرید رخ داد.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto px-5 mb-22 lg:px-12">
      <ToastContainer autoClose={2000} className={"custom-toast-container"} />
      {isEmptyCart ? (
        <Empty />
      ) : (
        <>
          {/* header */}
          <div className="mt-5">
            <PageHeader title={"سبد خرید"} steper={"basket"}>
              <Image
                width={24}
                height={24}
                className="cursor-pointer"
                src="/img/trash-2.svg"
                alt="Clear Cart"
                onClick={() => {
                  setIsOpenDeleteModal(true);
                 // openModal();
                }}
              />
            </PageHeader>
          </div>

          {/* cart items for mobile */}
          <div className="lg:hidden">
            {cart &&
              cart.items &&
              cart.items.map((item) => (
                <CartItemMobile
                  key={item.id}
                  item={item}
                  onUpdate={updateCartItemQuantity}
                  onDelete={removeCartItem}
                />
              ))}
          </div>

          <div className="lg:flex lg:justify-evenly lg:gap-6">
            {/* cart items for desktop */}
            <div className="hidden lg:block rounded-2xl border border-neutral-gray-4 p-8 max-w-222 max-h-max lg:mb-22">
              <div className="space-y-6">
                <div className="grid grid-cols-4 text-neutral-gray-12 font-bold text-lg leading-5.5">
                  <div className="text-right">محصولات</div>
                  <div className="text-center">قیمت</div>
                  <div className="text-center">تعداد</div>
                  <div className="text-left">جمع کل</div>
                </div>

                {cart &&
                  cart.items &&
                  cart.items.map((item, index) => (
                    <CartItemDesktop
                      key={item.id}
                      totalCount={cart.items.length}
                      item={item}
                      index={index}
                      onUpdate={updateCartItemQuantity}
                      onDelete={removeCartItem}
                    />
                  ))}
              </div>
            </div>

            <BasketDetailsCard
              step={1}
              count={countOfProduct}
              totalPric={totalPric}
              cart={cart}
              deleteCart={() => {
                setIsOpenDeleteModal(true);
               // openModal();
              }}
            />
          </div>
          {isOpenDeleteModal && (
            <DeleteModal
              handleCloseModal={handleCloseDeleteModal}
              handleAction={handleDeleteEntireBasket}
              title={"حذف سبد خرید"}
              subtitle={"آیا از حذف کل سبد خرید اطمینان دارید؟"}
              actiontitle={"حذف"}
              isDeleting={isDeleting}
            />
          )}
        </>
      )}
    </div>
  );
}
