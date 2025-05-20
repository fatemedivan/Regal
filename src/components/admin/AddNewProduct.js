"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function AddNewProduct() {
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDiscount, setNewDiscount] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");
  const [newImg, setNewImg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const addProduct = async () => {
    if (!newImg || newImg.length < 2 || newImg.length > 5) {
      toast.warning("تعداد فایل‌ها باید بین ۲ تا ۵ عدد باشد.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newTitle);
    formData.append("discount", newDiscount);
    formData.append("description", newDesc);
    formData.append("categoryId", newCategoryId);

    newImg.forEach((file) => {
      formData.append("files", file);
    });

    try {
      setIsLoading(true);
      const res = await fetch(`${baseUrl}/admin/products`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const result = await res.json();
      console.log(res);
      console.log(result);

      if (!res.ok) {
        toast.error("ناموفق");
      } else {
        toast.success("محصول با موفقیت اضافه شد");
        sessionStorage.setItem("productId", result.id);
        setTimeout(() => {
          router.push("/admin/add-size");
        }, 2500);
      }
      if (res.status === 413) {
        toast.error("حجم فایل ها زیاد است");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("خطا در ارسال اطلاعات");
    } finally {
      setIsLoading(false);
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
              className="outline-none w-full "
              type="text"
              maxLength={64}
              placeholder="اسم محصول را بنویسید"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>

          <div className="w-full bg-cognac-tint-4 p-3 rounded-xl">
            <input
              className="outline-none w-full"
              type="text"
              placeholder="تخفیف محصول را بنویسید"
              value={newDiscount}
              onChange={(e) => setNewDiscount(e.target.value)}
            />
          </div>

          <div className="w-full bg-cognac-tint-4 p-3 rounded-xl">
            <input
              className="outline-none w-full"
              type="text"
              placeholder=" شماره دسته بندی محصول را بنویسید"
              value={newCategoryId}
              onChange={(e) => setNewCategoryId(e.target.value)}
            />
          </div>
          <div className="w-full bg-cognac-tint-4 p-3 rounded-xl">
            <input
              className="outline-none w-full"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setNewImg([...e.target.files])}
            />
          </div>
          <div className="w-full bg-cognac-tint-4 p-3 rounded-xl">
            <textarea
              className="outline-none w-full resize-none"
              placeholder="توضیحات محصول را بنویسید"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end items-center">
          <button
            type="button"
            onClick={() => addProduct()}
            className="bg-cognac-primery rounded-xl p-3 text-white mt-3 cursor-pointer"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[0ms]"></div>
                <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[150ms]"></div>
                <div className="w-3 h-3 rounded-full bg-white animate-pulse delay-[300ms]"></div>
              </div>
            ) : (
              "ثبت محصول"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
