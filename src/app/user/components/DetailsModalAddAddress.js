import { useAuthContext } from "@/context/AuthContext";
import getToken from "@/utils/getToken";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function DetailsModalAddAddress({ handleCloseModal, onSuccess }) {
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [details, setDetails] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [addressId, setAddressId] = useState("");
 // const [token, setToken] = useState("");
 const token = getToken()
  const [isOpenProvince, setIsOpenProvince] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isBluredCity, setIsBluredCity] = useState(false);
  const [isBluredPostalCode, setIsBluredPostalCode] = useState(false);
  const [isBluredDetail, setIsBluredDetail] = useState(false);

  const isValidProvince = province.length >= 2 && province.length <= 32;
  const isValidCity = city.length >= 2 && city.length <= 32;
  const isValidPostalCode = /^[0-9]{6,10}$/.test(postalCode);
  const isValidDetail = details.length >= 4 && details.length <= 32;
  const isValidFullAddress =
    fullAddress.length >= 32 && fullAddress.length <= 255;
  const isValidAll =
    isValidCity &&
    isValidProvince &&
    isValidPostalCode &&
    isValidDetail &&
    isValidFullAddress;

  const [isFocused, setIsFocused] = useState({
    city: false,
    province: false,
    details: false,
    postalcode: false,
    firstname: false,
    lastname: false,
    phone: false,
  });

  const floatLabel = (value, focus) =>
    value || focus ? "-top-2.5" : "top-4.5";

  const { phoneNumber } = useAuthContext();

  // useEffect(() => {
  //   const storedToken = localStorage.getItem("token");
  //   if (storedToken) {
  //     setToken(storedToken);
  //   }
  // }, []);

  useEffect(() => {
    const storedFullAddress = sessionStorage.getItem("full address");
    if (storedFullAddress) {
      setFullAddress(storedFullAddress);
    }
  }, []);

  useEffect(() => {
    setAddressId(sessionStorage.getItem("addressId"));
  }, []);

  const addAdress = async () => {
    try {
      if (!token) {
        toast.error("توکن احراز هویت یا شناسه آدرس موجود نیست.");
        return;
      }
      setIsLoading(true);

      const url = addressId
        ? `/api/addresses/${addressId}`
        : `/api/addresses`;

      const method = addressId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          province: province,
          city: city,
          postalCode: postalCode,
          fullAddress: fullAddress.slice(0, 254),
          details: details,
        }),
      });

      setIsLoading(false);

      if (res.ok) {
        toast.success("آدرس با موفقیت اضافه/ویرایش شد.");
        sessionStorage.removeItem("addressId");
        setTimeout(() => {
          handleCloseModal();
          onSuccess()
       
        }, 500); 
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "عملیات ناموفق بود.");
      }
    } catch (error) {
      console.error("خطا در افزودن/ویرایش آدرس:", error);
      toast.error("خطایی رخ داد.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token || !addressId) return;

    getAddress();
  }, [token, addressId]);

  const getAddress = async () => {
    try {
      const res = await fetch(`/api/addresses/${addressId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok) {
        setProvince(data.province || "");
        setCity(data.city || "");
        setDetails(data.details || "");
        setPostalCode(data.postalCode || "");
        setFullAddress(data.fullAddress || "");
      } else {
        console.error("خطا در دریافت جزئیات آدرس:", data.message);
        toast.error(data.message || "خطا در دریافت آدرس.");
      }
    } catch (error) {
      console.error("خطا در شبکه هنگام دریافت آدرس:", error);
      toast.error("خطا در دریافت آدرس.");
    }
  };
  const iranProvinces = [
    "آذربایجان شرقی",
    "آذربایجان غربی",
    "اردبیل",
    "اصفهان",
    "البرز",
    "ایلام",
    "بوشهر",
    "تهران",
    "چهارمحال و بختیاری",
    "خراسان جنوبی",
    "خراسان رضوی",
    "خراسان شمالی",
    "خوزستان",
    "زنجان",
    "سمنان",
    "سیستان و بلوچستان",
    "فارس",
    "قزوین",
    "قم",
    "کردستان",
    "کرمان",
    "کرمانشاه",
    "کهگیلویه و بویراحمد",
    "گلستان",
    "گیلان",
    "لرستان",
    "مازندران",
    "مرکزی",
    "هرمزگان",
    "همدان",
    "یزد",
  ];

  return (
    <>
      <ToastContainer autoClose={2000} className={"custom-toast-container"} />
      <div
        className="fixed inset-0 bg-[#1E1E1E] opacity-50 z-50"
        onClick={() => handleCloseModal()}
      />
      <div className="bg-white fixed left-0 z-60 w-165 max-h-max p-6 top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 bottom-auto rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <p className=" text-black text-lg font-bold leading-5.5">
              جزئیات آدرس
            </p>
          </div>
          <Image
            width={24}
            height={24}
            src="/img/close-icon-filter.svg"
            className="cursor-pointer "
            alt=""
            onClick={() => handleCloseModal()}
          />
        </div>
        <div className="mt-8">
          <div className="px-4 pt-4 pb-9.5 border border-neutral-gray-4 rounded-lg relative">
            <textarea
              onChange={(e) => setFullAddress(e.target.value)}
              maxLength={255}
              className="text-neutral-gray-11 text-sm leading-5 w-full resize-none outline-none"
              defaultValue={fullAddress}
            />
            <p className="absolute right-4 -top-2 bg-white px-1 text-neutral-gray-7 text-xs leading-4.5">
              آدرس کامل
            </p>
          </div>
          {!isValidFullAddress && fullAddress && (
            <p className="text-xs leading-4.5 my-3 transition duration-200 ease-in-out text-error-primery">
              آدرس کامل باید حداقل ۳۲ و حداکثر۲۵۵ حرف باشد.
            </p>
          )}

          <div className="flex items-center gap-4 mt-4">
            <div className="w-1/2 relative ">
              <div className="border border-neutral-gray-4 px-4 py-3.75 rounded-lg">
                <input
                  type="text"
                  id="city"
                  placeholder=" "
                  value={city}
                  onFocus={() =>
                    setIsFocused((prev) => ({ ...prev, city: true }))
                  }
                  onBlur={() => {
                    setIsFocused((prev) => ({ ...prev, city: false }));
                    setIsBluredCity(true);
                  }}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  className="w-full outline-none text-neutral-gray-7 placeholder:text-transparent"
                />
                <label
                  htmlFor="city"
                  className={`absolute right-4 bg-white px-1 text-xs text-neutral-gray-7 transition-all ${floatLabel(
                    city,
                    isFocused.city
                  )}`}
                >
                  شهر
                </label>
              </div>
              {isBluredCity && !isValidCity && (
                <p className="text-xs leading-4.5 my-3 transition duration-200 ease-in-out text-error-primery">
                  شهر باید حداقل ۲ و حداکثر ۳۲ حرف باشد.
                </p>
              )}
            </div>
            <div
              onClick={() => setIsOpenProvince(!isOpenProvince)}
              className="w-1/2 relative flex justify-between items-center border border-neutral-gray-4 px-4 py-3.75 rounded-lg cursor-pointer"
            >
              <div className="cursor-pointer">
                {province ? (
                  <p className="text-xs leading-4.5 text-neutral-gray-7">
                    {province}
                  </p>
                ) : (
                  <p
                    className={`text-xs leading-4.5 text-neutral-gray-7 absolute -top-3 bg-white px-1 ${isOpenProvince ? "-top-3" : "top-4"
                      } `}
                  >
                    استان
                  </p>
                )}
              </div>

              <img
                src="/img/arrow-down-3.svg"
                className={`${isOpenProvince ? "rotate-180" : "rotate-0"
                  } transition`}
                onClick={() => setIsOpenProvince(!isOpenProvince)}
                alt=""
              />
              {isOpenProvince && (
                <ul className="absolute w-full top-14 right-0 z-20 bg-white border border-neutral-gray-4 mt-1 rounded-lg shadow-lg text-sm max-h-50 overflow-y-scroll custom-scrollbar">
                  {iranProvinces.map((option) => (
                    <li
                      key={option}
                      onClick={() => {
                        setIsOpenProvince(false);
                        setProvince(option);
                      }}
                      className="px-4 py-2 hover:bg-neutral-gray-2 cursor-pointer text-xs leading-4.5 text-neutral-gray-7"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div className="w-1/2 relative">
              <div className="border border-neutral-gray-4 px-4 py-3.75 rounded-lg">
                <input
                  type="text"
                  id="details"
                  placeholder=" "
                  value={details}
                  onFocus={() =>
                    setIsFocused((prev) => ({ ...prev, details: true }))
                  }
                  onBlur={() => {
                    setIsFocused((prev) => ({ ...prev, details: false }));
                    setIsBluredDetail(true);
                  }}
                  onChange={(e) => {
                    setDetails(e.target.value);
                  }}
                  className="w-full outline-none text-neutral-gray-7 placeholder:text-transparent"
                />
                <label
                  htmlFor="details"
                  className={`absolute right-4 bg-white px-1 text-xs text-neutral-gray-7 transition-all ${floatLabel(
                    details,
                    isFocused.details
                  )}`}
                >
                  جزئیات آدرس (پلاک، طبقه و ...)
                </label>
              </div>
              {isBluredDetail && !isValidDetail && (
                <p className="text-xs leading-4.5 my-3 transition duration-200 ease-in-out text-error-primery">
                  جزئیات باید حداقل ۴ و حداکثر ۳۲ حرف باشد.
                </p>
              )}
            </div>
            <div className="w-1/2 relative">
              <div className="border border-neutral-gray-4 px-4 py-3.75 rounded-lg">
                <input
                  type="text"
                  id="postalcode"
                  placeholder=" "
                  value={postalCode}
                  onFocus={() =>
                    setIsFocused((prev) => ({ ...prev, postalcode: true }))
                  }
                  onBlur={() => {
                    setIsFocused((prev) => ({ ...prev, postalcode: false }));
                    setIsBluredPostalCode(true);
                  }}
                  onChange={(e) => {
                    setPostalCode(e.target.value);
                  }}
                  className="w-full outline-none text-neutral-gray-7 placeholder:text-transparent"
                />
                <label
                  htmlFor="postalcode"
                  className={`absolute right-4 bg-white px-1 text-xs text-neutral-gray-7 transition-all ${floatLabel(
                    postalCode,
                    isFocused.postalcode
                  )}`}
                >
                  کد پستی
                </label>
              </div>
              {isBluredPostalCode && !isValidPostalCode && (
                <p className="text-xs leading-4.5 my-3 transition duration-200 ease-in-out text-error-primery">
                  کد پستی باید شامل ۶ تا ۱۰ عدد باشد.
                </p>
              )}
            </div>
          </div>
          <div className="w-75 relative border border-neutral-gray-4 rounded-lg flex mb-4 mt-5">
            <div className="w-full outline-none py-3.75 px-4 bg-neutral-gray-2 text-neutral-gray-7 text-left">
              {phoneNumber}
            </div>
            <label
              htmlFor="phone"
              className="absolute right-4 bg-transparent px-1 text-xs text-neutral-gray-7 transition-all z-10 -top-2.5"
            >
              شماره موبایل
            </label>
            <div className="bg-neutral-gray-2 text-neutral-gray-7 p-4 border-r border-neutral-gray-4 rounded-tl-lg rounded-bl-lg max-w-13 text-xs leading-4.5">
              ۹۸+
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              onClick={addAdress}
              disabled={!isValidAll || isLoading}
              className={`leading-5.5 rounded-lg py-3.25 w-full flex justify-center items-center cursor-pointer ${isValidAll && !isLoading
                ? "bg-cognac-primery text-white"
                : "bg-cognac-tint-2 text-cognac-tint-4"
                }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[0ms]"></div>
                  <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[150ms]"></div>
                  <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[300ms]"></div>
                </div>
              ) : (
                "ثبت آدرس"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}