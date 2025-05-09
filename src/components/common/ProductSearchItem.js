import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ProductSearchItem({
  id,
  img,
  title,
  finalPrice,
  offPercent,
  isMore,
}) {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [token, setToken] = useState(null);
  const [producFavoriteId, setProducFavoriteId] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const addProductToFavorites = async (id) => {
    if (!token) {
      setTimeout(() => {
        router.push("/auth/sign-up");
      }, 2500);
    } else {
      const res = await fetch(`${baseUrl}/products/${id}/favorite`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      setProducFavoriteId(result.productId);
    }
  };

  const removeProductFromFavorites = async (id) => {
    const res = await fetch(`${baseUrl}/products/${id}/favorite`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setProducFavoriteId(null);
    }
  };
  return (
    <div className="min-w-41.75 lg:max-w-51 relative">
      <div
        className={`w-41.75 h-60 lg:w-50.5 lg:h-71 relative object-cover group`}
      >
        <Image
          width={167}
          height={239}
          className="w-full h-full"
          src={img}
          alt=""
          quality={100}
        />
        <div className="absolute w-full top-3 lg:top-4 flex justify-between items-center px-3 lg:px-4">
          {producFavoriteId === id ? (
            <div
              onClick={() => {
                removeProductFromFavorites(id);
                console.log("clicked");
              }}
            >
              <Image
                width={24}
                height={24}
                className="cursor-pointer"
                src="/img/Favorite-icon-2.svg"
                alt=""
                quality={100}
              />
            </div>
          ) : (
            <div
              onClick={() => {
                addProductToFavorites(id);
              }}
            >
              <Image
                width={24}
                height={24}
                className="cursor-pointer"
                src="/img/favorite-icon.svg"
                alt=""
                quality={100}
              />
            </div>
          )}

          {offPercent && (
            <div className="bg-cognac-primery px-2 py-0.5 lg:px-3 lg:py-1 rounded-100 text-white text-xs leading-4.5">
              {offPercent}٪
            </div>
          )}
        </div>
        {/* <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] transition duration-200 ease-in-out rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer">
          <button className="border border-neutral-gray-8 rounded-lg py-2.5 px-4 text-sm leading-5 text-neutral-gray-3 cursor-pointer lg:px-6">
            مشاهده جزئیات
          </button>
        </div> */}
      </div>
      <div
        className={`lg:flex lg:justify-between lg:items-center lg:mt-3 lg:mb-2 lg:max-w-50.5`}
      >
        <p className="text-sm leading-6 my-2.5 lg:text-[1rem] lg:leading-7 lg:my-0">
          {title}
        </p>

        <div className="flex items-center gap-1 mb-2.5 lg:mb-0 lg:hidden">
          {isMore && (
            <div className="hidden lg:block py-0.25 px-0.75 border border-neutral-gray-5 text-neutral-gray-12 rounded-sm leading-4.5 text-xs">
              ۲+
            </div>
          )}
          <div
            className={`w-5 h-5 rounded-sm bg-[#97AAB4] ${isMore && "hidden"}`}
          ></div>
          <div className="w-5 h-5 rounded-sm bg-[#94999F]"></div>
          <div className="w-5 h-5 rounded-sm bg-[#C2B1A5]"></div>
          <div className="w-5 h-5 rounded-sm bg-[#F1AB90]"></div>
        </div>
      </div>

      <p className="text-sm leading-6 lg:text-[1rem] lg:leading-7">
        {" "}
        <span className="ml-1">{finalPrice}</span>تومان
      </p>
    </div>
  );
}
