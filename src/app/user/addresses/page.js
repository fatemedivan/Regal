"use client";
import AdressCard from "@/app/complete-data/components/AdressCard";
import AddAddressModal from "@/app/user/components/AddAddressModal";
import DetailsModalAddAddress from "@/app/user/components/DetailsModalAddAddress";
import UserPannel from "@/app/user/components/UserPannel";
import { useScrollLockContext } from "@/context/ScrollLockContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [isHadAddress, setIsHadAddress] = useState(true);
  const [isOpenAddAddressModal, setIsOpenAddAddressModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const { openModal, closeModal } = useScrollLockContext();
  const [token, setToken] = useState("");
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    sessionStorage.removeItem("addressId");
  }, []);

  useEffect(() => {
    if (!token) return;
    getAddresses();
  }, [token]);

  const getAddresses = async () => {
    const res = await fetch(`/api/addresses`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("res address", res);
    if (res.ok) {
      const data = await res.json();
      if (data && data.length !== 0) {
        setIsHadAddress(true);
        console.log(isHadAddress);

        setAddresses(data);
      } else {
        setIsHadAddress(false)
      }
      console.log(data);
    }
    if (res.status === 404) {
      setIsHadAddress(false);
    }
  };
  const handleCloseDetailsModal = () => {
    setIsOpenDetailsModal(false);
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
  useEffect(() => {
    if (selectedAddressId) {
      sessionStorage.setItem("addressId", selectedAddressId);
    }
  }, [selectedAddressId]);
  return (
    <>
      <div className="container mx-auto px-5 py-6 lg:hidden">
        <div className="flex justify-between items-center mb-8">
          <Image
            width={24}
            height={24}
            className="cursor-pointer"
            src="/img/arrow-right-6.svg"
            alt=""
            onClick={() => router.back()}
          />
          <p className="font-semibold text-xl leading-6 text-neutral-gray-13">
            لیست آدرس‌ها
          </p>
          <div></div>
        </div>
        {isHadAddress ? (
          <div>
            {addresses.map((address) => (
              <div key={address.id} className="mb-4">
                <AdressCard
                  isActive={false}
                  {...address}
                  getAddresses={getAddresses}
                  id={address.id}
                  setSelectedAddressId={setSelectedAddressId}
                />
              </div>
            ))}
            <div className="flex items-center justify-center w-full mt-50">
              <button
                onClick={() => router.push("/user/add-address")}
                className="w-full flex justify-center items-center gap-2 bg-cognac-primery text-white py-3.25 rounded-lg cursor-pointer"
              >
                <Image
                  width={16}
                  height={16}
                  src="/img/add-circle-2.svg"
                  alt=""
                />
                <p className="leading-5.5">افزودن آدرس جدید</p>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-6 mt-28">
            <Image
              width={128}
              height={116}
              src="/img/order-not-found.svg"
              alt=""
            />
            <p className="text-sm leading-6 text-neutral-gray-9">
              شما در حال حاضر هیچ آدرسی ثبت نکرده‌اید!
            </p>
            <Link href={"/user/add-address"}>
              <div className="mt-60 flex items-center justify-center">
                <button className="bg-cognac-primery rounded-lg py-3.25 px-28.5 text-white leading-5.5 cursor-pointer">
                  افزودن آدرس
                </button>
              </div>
            </Link>
          </div>
        )}
      </div>

      <div className="hidden lg:block">
        <UserPannel rout={"addresses"} isHadAddress={isHadAddress} getAddresses={getAddresses}>
          {isHadAddress ? (
            <div className="mt-4">
              {addresses.map((address) => (
                <div key={address.id} className="mb-4">
                  <AdressCard
                    isActive={false}
                    {...address}
                    getAddresses={getAddresses}
                    id={address.id}
                    setSelectedAddressId={setSelectedAddressId}
                  />
                </div>
              ))}
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
                شما در حال حاضر هیچ آدرسی ثبت نکرده‌اید!
              </p>

              <button
                onClick={() => {
                  setIsOpenAddAddressModal(true);
                  openModal();
                }}
                className="bg-cognac-primery rounded-lg py-3.25 px-12 text-white leading-5.5 cursor-pointer"
              >
                افزودن آدرس
              </button>
              {isOpenAddAddressModal && (
                <AddAddressModal
                  handleCloseModal={handleCloseAddAddressModal}
                  handleOpenDetailsModal={handleOpenDetailsModal}
                />
              )}
              {isOpenDetailsModal && (
                <DetailsModalAddAddress
                  handleCloseModal={handleCloseDetailsModal}
                  onSuccess={getAddresses}
                />

              )}
            </div>
          )}
        </UserPannel>
      </div>
    </>
  );
}
