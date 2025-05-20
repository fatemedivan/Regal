"use client";
import ActionModal from "@/components/admin/ActionModal";
import DetailsModal from "@/components/admin/DetailsModal";
import ErrBox from "@/components/admin/Errorbox";
import { useScrollLockContext } from "@/context/ScrollLockContext";
import moment from "jalali-moment";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function Page() {
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState("");
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [mainOrderInfo, setMainOrderInfo] = useState({});
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { openModal, closeModal } = useScrollLockContext();

  const formatJalaliDateTime = (isoString) => {
    return moment(isoString).locale("fa").format("dddd D MMMM YYYY ،HH:mm");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const getOrders = async () => {
    const res = await fetch(`${baseUrl}/admin/orders?page=1`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
    const data = await res.json();
    console.log(data);
    setOrders(data.orders);
  };

  useEffect(() => {
    if (!token) return;
    getOrders();
  }, [token]);

  return (
    <>
      <div>
        <ToastContainer autoClose={2000} className={"custom-toast-container"} />
        <h1 className="text-3xl mb-3 mt-10 mr-50">لیست سفارش ها</h1>
        {/* mobile and tablet design */}
        {orders && orders.length ? (
          <div className="space-y-4 lg:hidden mr-50 flex flex-wrap gap-2 justify-center items-center mb-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-lg bg-white shadow m-0"
              >
                <p className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                  {order.OrderItem[0]?.productTitle}
                </p>
                <p className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                  تاریخ : {formatJalaliDateTime(order.createdAt).split("،")[0]}
                </p>
                <p className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                  مبلغ پرداخت شده : {order.amountPaid}
                </p>
                <p className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                  قیمت : {order.OrderItem[0].price}
                </p>

                <div className="flex flex-wrap gap-1 mt-4">
                  <button
                    onClick={() => {
                      setIsShowEditModal(true);
                      openModal();
                      setMainOrderInfo(order);
                    }}
                    className="bg-cognac-primery rounded-xl p-3 text-white mx-1 cursor-pointer"
                  >
                    ویرایش
                  </button>
                  <button
                    onClick={() => {
                      setIsShowDetailsModal(true);
                      openModal();
                      setMainOrderInfo(order);
                    }}
                    className="bg-cognac-primery rounded-xl p-3 text-white mx-1 cursor-pointer"
                  >
                    مشاهده بیشتر
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center mt-10 mr-50">
            <ErrBox title={"سفارشی"} />
          </div>
        )}
        {/* desktop design */}
        <div className="hidden lg:block">
          <div className="lg:flex lg:items-center lg:justify-center">
            {orders && orders.length ? (
              <div className="rounded-lg p-5 mt-3 bg-white flex justify-center items-center mr-40">
                <table className="table-auto border-separate border-spacing-y-4">
                  <thead>
                    <tr>
                      <th className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                        محصول
                      </th>
                      <th className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-3">
                        مبلغ پرداخت شده
                      </th>
                      <th className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-3">
                        قیمت
                      </th>
                      <th className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-4">
                        تاریخ
                      </th>
                      <th className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-2">
                        وضعیت
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                          {order.OrderItem[0].productTitle}
                        </td>
                        <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-3">
                          {order.amountPaid}
                        </td>
                        <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-3">
                          {order.OrderItem[0].price}
                        </td>
                        <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-4">
                          {formatJalaliDateTime(order.createdAt).split("،")[0]}
                        </td>

                        <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-2">
                          {order.status === "CURRENT" && "جاری"}
                        </td>

                        <td>
                          <button
                            onClick={() => {
                              setIsShowEditModal(true);
                              setMainOrderInfo(order);
                              openModal();
                            }}
                            className="bg-cognac-primery rounded-xl p-3 text-white mx-3 cursor-pointer mr-8"
                          >
                            ویرایش
                          </button>
                          <button
                            onClick={() => {
                              setIsShowDetailsModal(true);
                              setMainOrderInfo(order);
                              openModal();
                            }}
                            className="bg-cognac-primery rounded-xl p-3 text-white mx-3 cursor-pointer mr-8"
                          >
                            مشاهده بیشتر
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="lg:hidden flex justify-center items-center mt-10 mr-50">
                <ErrBox title={"سفارشی"} />
              </div>
            )}
          </div>
        </div>

        {isShowDetailsModal && (
          <DetailsModal
            onClose={() => {
              setIsShowDetailsModal(false);
              closeModal();
            }}
          >
            <div className="flex justify-center items-center">
              <table>
                <thead>
                  <tr>
                    <th className="p-3">مبلغ تخفیف</th>
                    <th className="p-3">نوع ارسال</th>
                    <th className="p-3">تعداد</th>
                    <th className="p-3">ادرس</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-3">{mainOrderInfo.amountDiscount}</td>
                    <td className="px-3">
                      {mainOrderInfo.deliveryMethod === "COURIER"
                        ? "پیک"
                        : "حضوری"}
                    </td>
                    <td className="px-3">
                      {mainOrderInfo.OrderItem[0]?.number}
                    </td>
                    
                    <td className="px-3">{mainOrderInfo.fullAddress.slice(0,50)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </DetailsModal>
        )}
        {isShowEditModal && (
          <EditModal
            onSubmit={editCategory}
            onCancel={() => {
              setIsShowEditModal(false);
              closeModal();
            }}
            isLoading={isLoading}
          ></EditModal>
        )}
      </div>
    </>
  );
}
