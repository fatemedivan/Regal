"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DeleteModal from "@/components/common/DeleteModal";
import AddAddressModal from "../user/AddAddressModal";
import DetailsModalAddAddress from "../user/DetailsModalAddAddress";
import { useScrollLockContext } from "@/context/ScrollLockContext";
import { useAuthContext } from "@/context/AuthContext";
import { toast, ToastContainer } from "react-toastify";

export default function AdressCard({
  selectedAddressId,
  setSelectedAddressId,
  fullAddress,
  id,
  getAddresses,
}) {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenAddAddressModal, setIsOpenAddAddressModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [token, setToken] = useState("");
  const { phoneNumber, name ,family } = useAuthContext();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const handleCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
    closeModal();
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const deleteAddress = async () => {
    try {
      const res = await fetch(`/api/addresses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        getAddresses();
        toast.success("با موفقیت حذف شد");
      } else {
        toast.error("ناموفق");
      }
    } catch (error) {
      toast.error("خطایی رخ داد");
    }
  };
  const handleDeleteAddress = () => {
    deleteAddress();
    setIsOpenDeleteModal(false);
    closeModal();
  };

  const handleCloseAddAddressModal = () => {
    setIsOpenAddAddressModal(false);
    closeModal();
  };
  const handleOpenDetailsModal = () => {
    setIsOpenDetailsModal(true);
    openModal();
  };
  const handleCloseDetailsModal = () => {
    setIsOpenDetailsModal(false);
    closeModal();
  };
  const { openModal, closeModal } = useScrollLockContext();

  useEffect(() => {
    if (fullAddress) {
      sessionStorage.setItem("full address", fullAddress);
    }
  }, []);
  return (
    <div
      onClick={() => setSelectedAddressId(id)}
      className={`border ${
        selectedAddressId === id ? "border-cognac-primery" : "border-neutral-gray-4"
      }  rounded-lg p-6 mb-2 lg:mb-4 cursor-pointer`}
    >
      <ToastContainer autoClose={2000} className={"custom-toast-container"} />
      <div className="flex items-start justify-between gap-3 mb-4 lg:mb-3">
        <div className="flex items-start gap-1">
          <Image width={16} height={16} src="/img/location2.svg" alt="" />
          <p className="text-neutral-gray-13 text-xs leading-4.5 lg:text-sm lg:leading-5">
            {fullAddress}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Image
            width={16}
            height={16}
            onClick={() => {
              setIsOpenDeleteModal(true);
              openModal();
            }}
            className="cursor-pointer lg:w-6 lg:h-6"
            src="/img/trash-3.svg"
            alt=""
          />

          <Image
            onClick={() => {
              setIsOpenDetailsModal(true);
              setSelectedAddressId(id)
              openModal();
            }}
            width={24}
            height={24}
            className="cursor-pointer hidden lg:block"
            src="/img/edit-2.svg"
            alt=""
          />
          <Link href={"/user/details-address"}>
            <Image
              width={16}
              height={16}
              className="cursor-pointer min-w-4 min-h-4 lg:hidden"
              src="/img/edit-2.svg"
              alt=""
            />
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Image
            width={16}
            height={16}
            className="lg:w-5 lg:h-5"
            src="/img/user-2.svg"
            alt=""
          />
          <p className="text-neutral-gray-13 text-xs leading-4.5 lg:text-sm lg:leading-5 lg:ml-2">
            {name && name} {family && family}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-100 bg-neutral-gray-7"></div>
          <div className="flex items-center gap-1">
            <Image
              width={16}
              height={16}
              className="lg:w-5 lg:h-5"
              src="/img/call-2.svg"
              alt=""
            />
            <p className="text-neutral-gray-13 text-xs leading-4.5 lg:text-sm lg:leading-5">
              {phoneNumber}
            </p>
          </div>
        </div>
      </div>
      {isOpenDeleteModal && (
        <DeleteModal
          handleCloseModal={handleCloseDeleteModal}
          handleAction={handleDeleteAddress}
          title={"حذف آدرس"}
          subtitle={"آیا از حذف این آدرس از لیست آدرس‌ها اطمینان دارید؟"}
          actiontitle={"حذف"}
        />
      )}
      {isOpenAddAddressModal && (
        <AddAddressModal
          handleCloseModal={handleCloseAddAddressModal}
          handleOpenDetailsModal={handleOpenDetailsModal}
        />
      )}
      {isOpenDetailsModal && (
        <DetailsModalAddAddress handleCloseModal={handleCloseDetailsModal} />
      )}
    </div>
  );
}
