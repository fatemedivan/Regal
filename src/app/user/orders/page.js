"use client";
import OrderDetailsCard from "@/components/user/OrderDetailsCard";
import OrderDetailsCardDesktop from "@/components/user/OrderDetailsCardDesktop";
import UserPannel from "@/components/user/UserPannel";
import { useScrollLockContext } from "@/context/ScrollLockContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
export default function Page() {
  const router = useRouter();
  const [isHadOrders, setIsHadOrders] = useState(true);
  const [isOpenTypeOrder, setIsOpenTypeOrder] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedOrderType, setSelectedOrderType] = useState("همه");
  const [selectedOrderTypeValue, setSelectedOrderTypeValue] = useState("ALL");
  const [token, setToken] = useState("");
  const orderTypes = [
    { label: "همه", value: "ALL" },
    { label: "جاری", value: "pending" },
    { label: "تحویل شده", value: "delivered" },
    { label: "مرجوع شده", value: "returned" },
  ];
  const { isModalOpen, openModal, closeModal } = useScrollLockContext();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      toast.error("برای مشاهده سفارشات، لطفاً ابتدا وارد حساب کاربری خود شوید.");
      router.push("/auth/login");
    }
  }, [router]);

  useEffect(() => {
    if (!token) return;

    const getOrders = async () => {
      try {
        const res = await fetch(`/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const result = await res.json();
          console.log("Fetched Orders:", result);

          if (result && result.length > 0) {
            setAllOrders(result);
            setOrders(result);
            setIsHadOrders(true);
          } else {
            setIsHadOrders(false);
            setAllOrders([]);
            setOrders([]);
          }
        } else {
          const errorData = await res.json();
          toast.error(errorData.message || "خطا در دریافت سفارشات.");
          if (res.status === 401) {
            router.push("/auth/login");
          }
          setIsHadOrders(false);
          setAllOrders([]);
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("خطا در برقراری ارتباط با سرور برای دریافت سفارشات.");
        setIsHadOrders(false);
        setAllOrders([]);
        setOrders([]);
      }
    };
    getOrders();
  }, [token, router]);

  useEffect(() => {
    if (selectedOrderTypeValue === "ALL") {
      setOrders(allOrders);
    } else {
      const filtered = allOrders.filter(
        (order) => order.status === selectedOrderTypeValue
      );
      setOrders(filtered);
    }
  }, [selectedOrderTypeValue, allOrders]);

  return (
    <>
      <div className="container mx-auto px-5 py-6 lg:hidden">
        <div className="flex justify-between items-center mb-8 lg:hidden">
          <Image
            width={24}
            height={24}
            className="cursor-pointer"
            src="/img/arrow-right-6.svg"
            alt=""
            onClick={() => router.back()}
          />
          <p className="font-semibold text-xl leading-6 text-neutral-gray-13">
            تاریخچه سفارشات
          </p>
          <div></div>
        </div>

        {isHadOrders ? (
          <>
            <div
              onClick={() => {
                setIsOpenTypeOrder(!isOpenTypeOrder);
                isModalOpen ? closeModal() : openModal();
              }}
              className="relative border border-neutral-gray-4 px-4 py-3.75 rounded-lg mb-4 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-1">
                <div className="py-1.75 px-3 flex justify-center items-center gap-2 rounded-100 bg-neutral-gray-2">
                  <p className="text-neutral-gray-11 text-xs leading-4.5">
                    {selectedOrderType}
                  </p>
                  <Image
                    width={16}
                    height={16}
                    src="/img/close-square.svg"
                    alt=""
                  />
                </div>
              </div>
              <label
                className={`absolute right-4 -top-2.5 bg-white px-1 text-xs text-neutral-gray-7 leading-4.5 transition-all`}
              >
                نوع سفارش
              </label>
              <Image
                width={16}
                height={16}
                src="/img/arrow-down-4.svg"
                alt=""
              />
            </div>
            <div>
              {orders && orders.length ? (
                orders.map((order) => (
                  <OrderDetailsCard
                    key={order.id}
                    date={order.orderDate}
                    receivingTime={"اعلام نشده"}
                    address={order.fullAddress}
                    status={order.status}
                    deliveryStatus={"تاریخ تحویل تخمینی"}
                    deliveryType={order.deliveryMethod}
                    orderItems={order.items}
                    amountPaid={order.totalAmount}
                    paymentMethod={order.paymentMethod}

                  />
                ))
              ) : (
                <div className="flex flex-col justify-center items-center gap-6 my-10">
                  <Image
                    width={128}
                    height={116}
                    src="/img/order-not-found.svg"
                    alt=""
                  />
                  <p className="text-sm leading-6 text-neutral-gray-9">
                    هیچ سفارشی با این وضعیت پیدا نشد.
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center gap-6 mt-28">
            <Image
              width={128}
              height={116}
              src="/img/order-not-found.svg"
              alt=""
            />
            <p className="text-sm leading-6 text-neutral-gray-9">
              در حال حاضر هیچ سفارشی ثبت نکرده‌اید.
            </p>
            <div className="mt-60 flex items-center justify-center">
              <Link href={"/products"}>
                <button className="bg-cognac-primery rounded-lg py-3.25 px-28.5 text-white leading-5.5 cursor-pointer">
                  مشاهده محصولات
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {isOpenTypeOrder && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 bg-[#1E1E1E] opacity-50 z-50"
            onClick={() => {
              setIsOpenTypeOrder(false);
              closeModal();
            }}
          />
          <div className="bg-white fixed bottom-0 left-0 right-0 z-60 w-full rounded-tr-3xl rounded-tl-3xl px-5 pt-4 pb-6">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-neutral-gray-4">
              <p className="leading-7 text-neutral-gray-13">نوع سفارش</p>
              <Image
                width={16}
                height={16}
                src="/img/close-icon-filter.svg"
                className="cursor-pointer lg:w-6 lg:h-6"
                alt=""
                onClick={() => {
                  setIsOpenTypeOrder(false);
                  closeModal();
                }}
              />
            </div>
            <div>
              {orderTypes.map((type, index) => (
                <label
                  key={index}
                  className="cursor-pointer flex items-center justify-between mb-6"
                >
                  <input
                    type="radio"
                    name="ordertype"
                    className="hidden peer"
                    onChange={() => {
                      setSelectedOrderType(type.label);
                      setSelectedOrderTypeValue(type.value);
                      setIsOpenTypeOrder(false);
                      closeModal();
                    }}
                    checked={selectedOrderTypeValue === type.value}
                  />
                  <p className="text-neutral-gray-11 text-sm leading-5">
                    {type.label}
                  </p>
                  <div
                    className="w-5 h-5 border border-neutral-gray-10 rounded-sm relative flex items-center justify-center
                    before:content-[''] before:absolute before:w-1.5 before:h-2.5 before:border-r-2 before:border-b-2
                    before:border-neutral-gray-10 before:rotate-45 before:opacity-0 peer-checked:before:opacity-100 pb-1"
                  >

                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Version */}
      <div className="hidden lg:block">
        <UserPannel
          rout={"order"}
          setSelectedOrderType={setSelectedOrderType}
          selectedOrderType={selectedOrderType}
          setSelectedOrderTypeValue={setSelectedOrderTypeValue}
          selectedOrderTypeValue={selectedOrderTypeValue}
          orderTypes={orderTypes}
        >
          {isHadOrders ? (
            <div className="my-6">
              {orders && orders.length ? (
                orders.map((order) => (

                  <OrderDetailsCardDesktop
                    key={order.id}
                    status={order.status}
                    deliveryType={order.deliveryMethod}
                    paymentMethod={order.paymentMethod}
                    address={order.fullAddress}
                    date={order.orderDate}
                    time={order.deliveryTime}
                    orderItems={order.items}

                  />
                ))
              ) : (
                <div className="flex flex-col justify-center items-center gap-6 my-10">
                  <Image
                    width={128}
                    height={116}
                    src="/img/order-not-found.svg"
                    alt=""
                  />
                  <p className="text-sm leading-6 text-neutral-gray-9">
                    هیچ سفارشی پیدا نشد
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-8 my-12.5">
              <Image
                width={128}
                height={116}
                src="/img/order-not-found.svg"
                alt=""
              />
              <p className="leading-7 text-neutral-gray-9">
                در حال حاضر هیچ سفارشی ثبت نکرده‌اید.
              </p>
              <Link href={"/"}>
                <button className="bg-cognac-primery rounded-lg py-3.25 px-12 text-white leading-5.5 cursor-pointer">
                  برو به صفحه اصلی
                </button>
              </Link>
            </div>
          )}
        </UserPannel>
      </div>
    </>
  );
}