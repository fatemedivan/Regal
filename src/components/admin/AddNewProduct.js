import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function AddNewProduct() {
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDiscount, setNewDiscount] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");
  const [newImg, setNewImg] = useState([]);
  const [newSize, setNewSize] = useState("");
  const [newColors, setNewColors] = useState("");
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

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
      const res = await fetch(`${baseUrl}/admin/products`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("Error response:", result);
        toast.error("ناموفق");
      } else {
        toast.success("محصول با موفقیت اضافه شد!");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("خطا در ارسال اطلاعات");
    }
  };

  // const addsize = async () => {
  //   const res = await fetch(`${baseUrl}/products-size`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       size: "XS",
  //       stockQuantity: 1,
  //       price: 100000,
  //       productColorId: 1,
  //     }),
  //   });
  //   console.log(res);
  // };

  // const addColor = async () => {
  //   const res = await fetch(`${baseUrl}/products-color`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       color: newColors,
  //       productId: 1,
  //     }),
  //   });
  //   console.log(res);
  // };

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
            <input
              className="outline-none w-full"
              type="text"
              placeholder="سایز یندی محصول را وارد کنید"
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
            />
          </div>
          <div className="w-full bg-cognac-tint-4 p-3 rounded-xl">
            <input
              className="outline-none w-full"
              type="text"
              placeholder="رنگ بندی محصول را وارد کنید"
              value={newColors}
              onChange={(e) => setNewColors(e.target.value)}
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
            ثبت محصول
          </button>
        </div>
      </form>
    </div>
  );
}
