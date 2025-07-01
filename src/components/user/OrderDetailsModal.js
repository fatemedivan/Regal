import Image from "next/image";
import React from "react";

export default function OrderDetailsModal({
  handleCloseModal,
  orderItems,
}) {
 
  const formatPrice = (price) => {
    const numericPrice = Number(price);
    if (isNaN(numericPrice)) {
      return "";
    }
    return new Intl.NumberFormat('fa-IR').format(numericPrice);
  };

  const shippingCost = 80000;


  const calculateTotalDiscount = () => {
    let totalDiscountAmount = 0;
    if (orderItems && orderItems.length > 0) {
      orderItems.forEach((item) => {
        const originalPrice = Number(item.product.price);
        const priceAtOrder = Number(item.priceAtOrder);
        const quantity = Number(item.quantity);

        if (!isNaN(originalPrice) && !isNaN(priceAtOrder) && !isNaN(quantity)) {
          if (originalPrice > priceAtOrder) {
            totalDiscountAmount += (originalPrice - priceAtOrder) * quantity;
          }
        }
      });
    }
    return totalDiscountAmount;
  };

  const calculatedDiscount = calculateTotalDiscount();

  const calculatedProductsTotal = orderItems.reduce((sum, item) => {
    const priceAtOrder = Number(item.priceAtOrder);
    const quantity = Number(item.quantity);
    if (!isNaN(priceAtOrder) && !isNaN(quantity)) {
      return sum + (priceAtOrder * quantity);
    }
    return sum; 
  }, 0);


  const totalNumberOfProducts = orderItems.reduce((sum, item) => {
    const quantity = Number(item.quantity);
    return sum + (isNaN(quantity) ? 0 : quantity);
  }, 0);


  const finalAmountToPay = calculatedProductsTotal + shippingCost;


  return (
    <div>
      <div
        className="fixed inset-0 bg-[#1E1E1E] opacity-50 z-50"
        onClick={handleCloseModal}
      />
      <div className="bg-white fixed bottom-0 left-0 right-0 z-60 w-full rounded-tr-3xl rounded-tl-3xl px-5 pt-4 pb-6">
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-neutral-gray-4">
          <p className="leading-7 text-neutral-gray-13">اقلام سفارش</p>
          <Image
            width={16}
            height={16}
            src="/img/close-icon-filter.svg"
            className="cursor-pointer lg:w-6 lg:h-6"
            alt="بستن"
            onClick={handleCloseModal}
          />
        </div>
        <div className="pb-4 mb-4 border-b border-b-neutral-gray-4">
          {orderItems && orderItems.length > 0 ? (
            orderItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-2"
              >
                <p className="text-sm leading-6 text-neutral-gray-11">
                  {item.product.name} (x{item.quantity})
                </p>
                <p className="text-sm leading-6 text-neutral-gray-10">
                  {formatPrice(item.priceAtOrder)} تومان
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm leading-6 text-neutral-gray-9">هیچ آیتمی در این سفارش موجود نیست.</p>
          )}
        </div>
        <div className="pb-4 mb-4 border-b border-b-neutral-gray-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm leading-6 text-neutral-gray-11">
              تعداد کل محصولات
            </p>
            <p className="text-sm leading-6 text-neutral-gray-10">
              {totalNumberOfProducts} عدد
            </p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm leading-6 text-cognac-primery">تخفیف</p>
            <p className="text-sm leading-6 text-cognac-primery">
              {formatPrice(calculatedDiscount)} تومان
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm leading-6 text-neutral-gray-11">
              هزینه ارسال
            </p>
            <p className="text-sm leading-6 text-neutral-gray-10">
              {formatPrice(shippingCost)} تومان
            </p>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <p className="text-sm leading-6 text-neutral-gray-11">
              مبلغ پرداخت شده
            </p>
            <p className="text-sm leading-6 text-neutral-gray-10">
              {formatPrice(finalAmountToPay)} تومان
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}