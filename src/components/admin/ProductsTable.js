"use client";
import React, { useEffect, useState } from "react";
import ErrBox from "./Errorbox";
import ActionModal from "./ActionModal";
import EditModal from "./EditModal";
import { useScrollLockContext } from "@/context/ScrollLockContext";
import { toast, ToastContainer } from "react-toastify";
import { HashLoader } from "react-spinners";

export default function ProductsTable({ products, getProducts, loading }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [productId, setProductId] = useState(null);
  const [mainProductInfo, setMainProductInfo] = useState({});
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDiscount, setNewDiscount] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");
  const [newImg, setNewImg] = useState([]);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { openModal, closeModal } = useScrollLockContext();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const deletProduct = async () => {
    console.log("id", productId);

    try {
      const res = await fetch(`${baseUrl}/admin/products/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success("با موفقیت حذف شد");
        getProducts();
      } else {
        toast.error("ناموفق");
      }
    } catch (error) {
      toast.error("خطایی رخ داد");
    } finally {
      setIsShowDeleteModal(false);
      closeModal();
    }
  };

  const editProduct = async () => {
    const payload = {
      title: newTitle,
      discount: newDiscount,
      description: newDesc,
      categoryId: newCategoryId.toString(),
      files: newImg,
    };

    try {
      setIsLoading(true);
      const res = await fetch(`${baseUrl}/admin/products/${productId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log(result);
      if (res.ok) {
        toast.success("با موفقیت ویرایش شد");
        getProducts();
      } else {
        toast.error("ناموفق");
      }
    } catch (error) {
      toast.error("خطایی رخ داد");
    } finally {
      setIsShowEditModal(false);
      closeModal();
      setIsLoading(false);
    }
  };

  return (
    <div>
      {!loading && (!products || products.length === 0) && (
        <div className="flex justify-center items-center mt-10 mr-50">
          <ErrBox title={"محصولی"} />
        </div>
      )}

      {loading ? (
        <div className="flex flex-col justify-center items-center h-[60vh]">
          <HashLoader color="#b19276" size={80} />
          <p className="mt-5 text-xl font-extrabold text-cognac-shade-3 animate-pulse">
            ...loading
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-3xl mb-3 mt-10 mr-50">لیست محصولات</h1>
          <ToastContainer
            autoClose={2000}
            className={"custom-toast-container"}
          />
          {/* mobile and tablet design */}
          {products && (
            <div className="space-y-4 lg:hidden mr-50 flex flex-wrap gap-2 justify-center items-center mb-5">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="p-4 rounded-lg bg-white shadow m-0"
                >
                  <p className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                    <img
                      className="w-20 h-20 rounded-lg bg-cover"
                      src={product.img}
                      alt=""
                    />
                  </p>
                  <p className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                    اسم : {product.title}
                  </p>
                  <p className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                    قیمت : {product.latestPrice}
                  </p>
                  <p className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                    تخفیف : {product.discount}%
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <button
                      onClick={() => {
                        setIsShowDeleteModal(true);
                        openModal();
                        setProductId(product.id);
                        setMainProductInfo(product);
                      }}
                      className="bg-cognac-primery rounded-xl p-3 text-white mx-1 cursor-pointer"
                    >
                      حذف
                    </button>
                    <button
                      onClick={() => {
                        setIsShowEditModal(true);
                        openModal();
                        setProductId(product.id);
                        setMainProductInfo(product);
                        setNewTitle(product.title);
                        setNewPrice(product.latestPrice);
                        setNewDiscount(product.discount);
                        setNewCategoryId(product.categoryId);
                        setNewImg(product.img);
                        setNewDesc(product.desc);
                      }}
                      className="bg-cognac-primery rounded-xl p-3 text-white mx-1 cursor-pointer"
                    >
                      ویرایش
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* desktop design */}
          <div className="hidden lg:block">
            <div className="lg:flex lg:items-center lg:justify-center">
              {products && (
                <div className="rounded-lg p-5 mt-3 bg-white flex justify-center items-center mr-40">
                  <table>
                    <thead>
                      <tr>
                        <th className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                          عکس
                        </th>
                        <th className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                          اسم
                        </th>
                        <th className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                          قیمت
                        </th>
                        <th className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                          تخفیف
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                            <img
                              className="w-20 h-20 rounded-lg bg-cover"
                              src={product.img}
                              alt=""
                            />
                          </td>
                          <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                            {product.title}
                          </td>
                          <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                            {product.latestPrice}
                          </td>
                          <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                            {product.discount}%
                          </td>

                          <td>
                            <button
                              onClick={() => {
                                setIsShowDeleteModal(true);
                                openModal();
                                setProductId(product.id);
                                setMainProductInfo(product);
                              }}
                              className="bg-cognac-primery rounded-xl p-3 text-white mx-3 cursor-pointer"
                            >
                              حذف
                            </button>
                            <button
                              onClick={() => {
                                setIsShowEditModal(true);
                                openModal();
                                setProductId(product.id);
                                setMainProductInfo(product);
                                setNewTitle(product.title);
                                setNewDiscount(product.discount);
                                setNewPrice(product.latestPrice);
                                setNewCategoryId(product.categoryId);
                                setNewImg(product.img);
                                setNewDesc(product.desc);
                              }}
                              className="bg-cognac-primery rounded-xl p-3 text-white mx-3 cursor-pointer"
                            >
                              ویرایش
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          {isShowDeleteModal && (
            <ActionModal
              title={`ایا از حذف "${mainProductInfo.title}" اطمینان دارید ؟`}
              onCancel={() => {
                setIsShowDeleteModal(false);
                closeModal();
              }}
              onDelete={deletProduct}
            />
          )}

          {isShowEditModal && (
            <EditModal
              onSubmit={() => {
                editProduct();
              }}
              onCancel={() => {
                setIsShowEditModal(false);
                closeModal();
              }}
              isLoading={isLoading}
            >
              <div>
                <label className="pr-2">عنوان</label>
                <div className="py-3 pl-6 pr-3 rounded-xl mb-3 text-black bg-cognac-tint-4">
                  <input
                    className="outline-none"
                    type="text"
                    placeholder="عنوان جدید را وارد کنید"
                    value={newTitle || ""}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
                <label className="pr-2">قیمت</label>
                <div className="py-3 pl-6 pr-3 rounded-xl mb-3 text-black bg-cognac-tint-4">
                  <input
                    className="outline-none"
                    type="text"
                    placeholder="قیمت جدید را وارد کنید"
                    value={newPrice || ""}
                    onChange={(e) => setNewPrice(e.target.value)}
                  />
                </div>
                <label className="pr-2">تخفیف</label>
                <div className="py-3 pl-6 pr-3 rounded-xl mb-3 text-black bg-cognac-tint-4">
                  <input
                    className="outline-none"
                    type="text"
                    placeholder="تخفیف جدید را وارد کنید"
                    value={newDiscount || ""}
                    onChange={(e) => setNewDiscount(e.target.value)}
                  />
                </div>
                <label className="pr-2">شماره دسته بندی </label>
                <div className="py-3 pl-6 pr-3 rounded-xl mb-3 text-black bg-cognac-tint-4">
                  <input
                    className="outline-none w-full"
                    type="text"
                    placeholder=" شماره دسته بندی جدید را بنویسید"
                    value={newCategoryId || ""}
                    onChange={(e) => setNewCategoryId(e.target.value)}
                  />
                </div>
                <label className="pr-2">عکس</label>
                <div className="py-3 pl-6 pr-3 rounded-xl mb-3 text-black bg-cognac-tint-4">
                  <input
                    className="outline-none w-full"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setNewImg(e.target.files)}
                  />
                </div>

                <label className="pr-2">توضیحات</label>
                <div className="py-3 pl-6 pr-3 rounded-xl mb-3  text-black bg-cognac-tint-4">
                  <textarea
                    className="outline-none w-full resize-none"
                    placeholder="توضیحات جدید را بنویسید"
                    value={newDesc || ""}
                    onChange={(e) => setNewDesc(e.target.value)}
                  />
                </div>
              </div>
            </EditModal>
          )}
        </>
      )}
    </div>
  );
}
