"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Page() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [newColor, setNewColor] = useState("");
  const [productId, setProductId] = useState("");
  const router = useRouter()

  useEffect(() => {
    const storedProductId = sessionStorage.getItem("productId");
    if (storedProductId) {
      setProductId(storedProductId);
    }
  }, []);

  const addColor = async () => {
    try {
      const res = await fetch(`${baseUrl}/products-color`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          color: newColor,
          productId: parseInt(productId),
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
            router.push('/admin/products')
        }, 2500);
        sessionStorage.removeItem('productId')
      }
    } catch (error) {
      toast.error("خطایی رخ داد");
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
              placeholder="رنگ محصول را بنویسید"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
            />
          </div>
          <div className="w-full bg-cognac-tint-4 p-3 rounded-xl ">
            <input
              className="outline-none w-full"
              type="text"
              placeholder="ایدی محصول را بنویسید"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end items-center">
          <button
            type="button"
            onClick={() => addColor()}
            className="bg-cognac-primery rounded-xl p-3 text-white mt-3 cursor-pointer"
          >
            ثبت محصول
          </button>
        </div>
      </form>
    </div>
  );
}
