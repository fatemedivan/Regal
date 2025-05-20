"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Page() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [newSize, setNewSize] = useState("");
  const [newStockQuantity, setNewStockQuantity] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newProductColorId, setNewProductColorId] = useState("");
  const [token, setToken] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const addsize = async () => {
    try {
      setIsLoading(true)
      const res = await fetch(`${baseUrl}/admin/products-size`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          size: newSize,
          stockQuantity: parseInt(newStockQuantity),
          price: parseInt(newPrice),
          productColorId: parseInt(newProductColorId),
        }),
      });
      console.log(res);
      if (!res.ok) {
        const result = await res.json();
        console.log(result);
        toast.error(result.message[0]);
      } else {
        toast.success("با موفقیت اضافه شد");
        setTimeout(() => {
          router.push("/admin/add-color");
        }, 2500);
      }
    } catch (error) {
      toast.error("خطایی رخ داد");
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="mt-10 mr-50 ml-10">
      <ToastContainer autoClose={2000} className={"custom-toast-container"} />
      <h1 className="text-3xl mb-3">افزودن محصول جدید</h1>
      <form className="bg-cognac-tint-2 rounded-lg p-5 flex flex-col ">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 text-black">
          <div className="w-full bg-cognac-tint-4 p-3 rounded-xl">
            <input
              className="outline-none w-full"
              type="text"
              placeholder="سایز محصول را بنویسید"
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
            />
          </div>
          <div className="w-full bg-cognac-tint-4 p-3 rounded-xl ">
            <input
              className="outline-none w-full"
              type="text"
              placeholder="قیمت محصول را بنویسید"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </div>

          <div className="w-full bg-cognac-tint-4 p-3 rounded-xl">
            <input
              className="outline-none w-full"
              type="text"
              placeholder="موجودی محصول را بنویسید"
              value={newStockQuantity}
              onChange={(e) => setNewStockQuantity(e.target.value)}
            />
          </div>
          <div className="w-full bg-cognac-tint-4 p-3 rounded-xl">
            <input
              className="outline-none w-full"
              type="text"
              placeholder="ایدی رنگ محصول را بنویسید"
              value={newProductColorId}
              onChange={(e) => setNewProductColorId(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end items-center">
          <button
            type="button"
            onClick={() => addsize()}
            className="bg-cognac-primery rounded-xl py-2 px-5 text-white mt-3 cursor-pointer"
          >
           {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[0ms]"></div>
                <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[150ms]"></div>
                <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[300ms]"></div>
              </div>
            ) : (
              "ثبت"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
