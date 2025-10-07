"use client";

import { useState } from "react";
import { useScrollLockContext } from "@/context/ScrollLockContext";
import { useBasketContext } from "@/context/BasketContext";
import { toast, ToastContainer } from "react-toastify";
import BasketDetailsCard from "@/components/BasketDetailsCard";
import ProgressBar from "@/components/ProgressBar";
import DeleteModal from "@/components/DeleteModal";
import Empty from "./components/Empty";
import PageHeader from "./components/PageHeader";
import CartItemDesktop from "./components/CartItemDesktop";
import CartItemMobile from "./components/CartItemMobile";

export default function Page() {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { openModal, closeModal } = useScrollLockContext();
  const {
    cart,
    countOfProduct,
    totalPric,
    isEmptyCart,
    updateCartItemQuantity,
    removeCartItem,
    clearEntireCart,
  } = useBasketContext();

  const handleIncreaseQuantity = async (cartItemId, currentQuantity) => {
    try {
      await updateCartItemQuantity(cartItemId, currentQuantity + 1);
    } catch (error) {
      console.error("Error increasing quantity in handler:", error);
      toast.error("خطایی در افزایش تعداد رخ داد.");
    }
  };

  const handleDecreaseQuantity = async (cartItemId, currentQuantity) => {
    try {
      if (currentQuantity === 1) {
        await removeCartItem(cartItemId);
      } else {
        await updateCartItemQuantity(cartItemId, currentQuantity - 1);
      }
    } catch (error) {
      console.error("Error decreasing quantity in handler:", error);
      toast.error("خطایی در کاهش تعداد رخ داد.");
    }
  };

  const handleDeleteEntireBasket = async () => {
    try {
      await clearEntireCart();
      setIsOpenDeleteModal(false);
      closeModal();
    } catch (error) {
      console.error("Error deleting entire cart:", error);
      toast.error("خطایی در حذف سبد خرید رخ داد.");
    }
  };

  return (
    <div className="container mx-auto px-5 mb-22 lg:px-12">
      <ToastContainer autoClose={2000} className={"custom-toast-container"} />
      {isEmptyCart ? (
        <Empty />
      ) : (
        <>
          <PageHeader
            deleteBasket={() => {
              setIsOpenDeleteModal(true);
              openModal();
            }}
          />
          <div className="xl:px-40.5">
            <ProgressBar progress={"basket"} />
          </div>

          <div className="lg:hidden">
            {cart &&
              cart.items &&
              cart.items.map((item) => (
                <CartItemMobile
                  key={item.id}
                  item={item}
                  onIncrease={handleIncreaseQuantity}
                  onDecrease={handleDecreaseQuantity}
                  onDelete={removeCartItem}
                />
              ))}
          </div>

          <div className="lg:flex lg:justify-evenly lg:gap-6">
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
                      onIncrease={handleIncreaseQuantity}
                      onDecrease={handleDecreaseQuantity}
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
                openModal();
              }}
            />
          </div>
          {isOpenDeleteModal && (
            <DeleteModal
              handleCloseModal={() => {
                setIsOpenDeleteModal(false);
                closeModal();
              }}
              handleAction={handleDeleteEntireBasket}
              title={"حذف سبد خرید"}
              subtitle={"آیا از حذف کل سبد خرید اطمینان دارید؟"}
              actiontitle={"حذف"}
            />
          )}
        </>
      )}
    </div>
  );
}
