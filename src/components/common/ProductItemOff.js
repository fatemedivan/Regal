"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

export default function ProductItemOff({
  id,
  img,
  title,
  price,
  finalPrice,
  offPercent,
  isMore,
  colors,
  favorites,
}) {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [token, setToken] = useState(null);
  const [productsFavoriteId, setProductsFavoriteId] = useState([]);

  //get token
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    setProductsFavoriteId(favorites || []);
  }, [favorites]);

  //add favorite product
  const addProductToFavorites = async (id) => {
    try {
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
        console.log("in prodct off", result);
        console.log("in prodct off", res);
        if (res.ok) {
          setProductsFavoriteId((prev) => [...prev, id]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(productsFavoriteId);

  //remove favorite product
  const removeProductFromFavorites = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/products/${id}/favorite`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setProductsFavoriteId((prev) =>
          prev.filter((productId) => productId !== id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-w-41.75 lg:min-w-79.5 relative">
        <div
          className={`w-41.75 h-60 lg:w-79.5 lg:h-119 relative object-cover group`}
        >
          <Image
            fill
            className="cursor-pointer"
            src={img}
            alt=""
            quality={100}
            sizes="(min-width: 1024px) 318px, 167px"
          />
          <div className="absolute w-full top-3 lg:top-4 flex justify-between items-center px-3 lg:px-4">
            {productsFavoriteId.includes(id) ? (
              <Image
                width={24}
                height={24}
                className="cursor-pointer"
                src="/img/Favorite-icon-2.svg"
                alt=""
                quality={100}
                onClick={() => removeProductFromFavorites(id)}
              />
            ) : (
              <Image
                onClick={() => addProductToFavorites(id)}
                width={24}
                height={24}
                className="cursor-pointer"
                src="/img/favorite-icon.svg"
                alt=""
                quality={100}
              />
            )}

            {offPercent && (
              <div className="bg-cognac-primery px-2 py-0.5 lg:px-3 lg:py-1 rounded-100 text-white text-xs leading-4.5">
                {offPercent}٪
              </div>
            )}
          </div>
          {/* <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] transition duration-200 ease-in-out rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer">
            <button className="border border-neutral-gray-8 rounded-lg py-2.5 px-4 text-sm leading-5 text-neutral-gray-3 cursor-pointer lg:px-14">
              مشاهده جزئیات
            </button>
          </div> */}
        </div>
        <div
          className={`lg:flex lg:justify-between lg:items-center lg:mt-3 lg:mb-2 lg:max-w-79.5`}
        >
          <p className="text-sm leading-6 my-2.5 lg:text-[1rem] lg:leading-7 lg:my-0">
            {title}
          </p>

          <div className="flex items-center gap-1 mb-2.5 lg:mb-0">
            {isMore && (
              <div className="hidden lg:block py-0.25 px-0.75 border border-neutral-gray-5 text-neutral-gray-12 rounded-sm leading-4.5 text-xs">
                ۲+
              </div>
            )}
            {colors.map((color) => (
              <div
                style={{ backgroundColor: color }}
                key={color}
                className={`w-5 h-5 rounded-sm`}
              ></div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 text-black lg:justify-start">
          <p className="text-neutral-gray-8 text-xs leading-4.5 lg:text-sm lg:leading-4.5 lg:line-through">
            {price}
          </p>
          <p className="text-sm leading-6 lg:text-[1rem] lg:leading-7">
            {" "}
            <span className="ml-1">{finalPrice}</span>تومان
          </p>
        </div>
      </div>
    </>
  );
}
