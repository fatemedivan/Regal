"use client";
import ActionModal from "@/components/admin/ActionModal";
import DetailsModal from "@/components/admin/DetailsModal";
import EditModal from "@/components/admin/EditModal";
import ErrBox from "@/components/admin/Errorbox";
import { useScrollLockContext } from "@/context/ScrollLockContext";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Page() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [categories, setCategories] = useState([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [mainCategory, setMainCategoryInfo] = useState({});
  const [newSlug, setNewSlug] = useState("");
  const [newSubCategory, setNewSubCategory] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");

  const { openModal, closeModal } = useScrollLockContext();

  const deleteModalCancel = () => {
    setIsShowDeleteModal(false);
    closeModal();
  };

  const closeDeailsModal = () => {
    setIsShowDetailsModal(false);
    closeModal();
  };

  const addCategories = async () => {
    try {
      const res = await fetch(`${baseUrl}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: newSlug,
          parentId: parseInt(newCategoryId),
        }),
      });
      console.log(res);
      if (res.ok) {
        toast.success("با موفقیت اضافه شد");
        getCategories();
      } else {
        toast.error("ناموفق");
      }
    } catch (error) {
      toast.error("خطایی رخ داد");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const res = await fetch(`${baseUrl}/categories`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
      console.log(res);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="mt-10 mr-50 ml-10">
        <ToastContainer autoClose={2000} className={"custom-toast-container"} />
        <h1 className="text-3xl mb-3">افزودن زیر دسته بندی جدید</h1>
        <form className="bg-cognac-tint-2 rounded-lg p-5 flex flex-col ">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 text-black">
            <div className="w-full bg-cognac-tint-4 p-3 rounded-xl">
              <input
                className="outline-none w-full "
                type="text"
                maxLength={64}
                placeholder="اسم زیر دسته بندی را بنویسید"
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
              />
            </div>

            <div className="w-full bg-cognac-tint-4 p-3 rounded-xl">
              <input
                className="outline-none w-full"
                type="text"
                placeholder="شماره زیردسته بندی محصول را بنویسید"
                value={newCategoryId}
                onChange={(e) => setNewCategoryId(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end items-center">
            <button
              type="button"
              onClick={() => addCategories()}
              className="bg-cognac-primery rounded-xl py-2 px-5 text-white mt-3 cursor-pointer"
            >
              ثبت
            </button>
          </div>
        </form>
      </div>

      <div>
        <h1 className="text-3xl mb-3 mt-10 mr-50">لیست دسته بندی ها</h1>
        {/* mobile and tablet design */}
        {categories && categories.length ? (
          <div className="space-y-4 lg:hidden mr-50 flex flex-wrap gap-2 justify-center items-center mb-5">
            {categories
              .filter((category) => category.parentId === null)
              .map((category) => (
                <div
                  key={category.id}
                  className="p-4 rounded-lg bg-white shadow m-0"
                >
                  <p className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                    {category.slug}
                  </p>
                  <p className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                    شماره :{category.id}
                  </p>
                  <p className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                    تعداد زیردسته بندی ها: {category.subcategories.length}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <button
                      onClick={() => {
                        setIsShowDeleteModal(true);
                        openModal();
                        setCategoryId(category.id);
                        setMainCategoryInfo(category);
                      }}
                      className="bg-cognac-primery rounded-xl p-3 text-white mx-1 cursor-pointer"
                    >
                      حذف
                    </button>
                    <button
                      onClick={() => {
                        setIsShowEditModal(true);
                        openModal();
                        setCategoryId(category.id);
                        setNewSlug(category.slug);
                        setNewSubCategory(category.subCategory);
                      }}
                      className="bg-cognac-primery rounded-xl p-3 text-white mx-1 cursor-pointer"
                    >
                      ویرایش
                    </button>
                    <button
                      onClick={() => {
                        setIsShowDetailsModal(true);
                        openModal();
                        setMainCategoryInfo(category);
                      }}
                      className="bg-cognac-primery rounded-xl p-3 text-white mx-1 cursor-pointer"
                    >
                      مشاهده بیشتر
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex justify-center items-center mt-10 mr-50">
            <ErrBox title={"محصولی"} />
          </div>
        )}
        {/* desktop design */}
        <div className="hidden lg:block">
          <div className="lg:flex lg:items-center lg:justify-center">
            {categories && categories.length ? (
              <div className="rounded-lg p-5 mt-3 bg-white flex justify-center items-center mr-50">
                <table className="table-auto border-separate border-spacing-y-4">
                  <thead>
                    <tr>
                      <th className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                        اسم
                      </th>
                      <th className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                        شماره
                      </th>
                      <th className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                        تعداد زیردسته بندی ها
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories
                      .filter((category) => category.parentId === null)
                      .map((category) => (
                        <tr key={category.id}>
                          <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                            {category.slug}
                          </td>
                          <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                            {category.id}
                          </td>
                          <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                            {category.subcategories.length}
                          </td>

                          <td>
                            <button
                              onClick={() => {
                                setIsShowDeleteModal(true);
                                openModal();
                                setCategoryId(category.id);
                                setMainCategoryInfo(category);
                              }}
                              className="bg-cognac-primery rounded-xl p-3 text-white mx-3 cursor-pointer"
                            >
                              حذف
                            </button>
                            <button
                              onClick={() => {
                                setIsShowEditModal(true);
                                openModal();
                                setCategoryId(category.id);
                                setNewSlug(category.slug);
                                setNewSubCategory(category.subCategory);
                              }}
                              className="bg-cognac-primery rounded-xl p-3 text-white mx-3 cursor-pointer"
                            >
                              ویرایش
                            </button>

                            <button
                              onClick={() => {
                                setIsShowDetailsModal(true);
                                openModal();
                                setMainCategoryInfo(category);
                              }}
                              className="bg-cognac-primery rounded-xl p-3 text-white mx-3 cursor-pointer"
                            >
                              مشاهده بیشتر
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="lg:hidden flex justify-center items-center mt-10 mr-50">
                <ErrBox title={"دسته بندی ای"} />
              </div>
            )}
          </div>
        </div>
        {isShowDeleteModal && (
          <ActionModal
            title={`ایا از حذف "${mainCategory.slug}" اطمینان دارید ؟`}
            onCancel={deleteModalCancel}
          />
        )}
        {isShowDetailsModal && (
          <DetailsModal onClose={closeDeailsModal}>
            <div className="flex flex-col flex-wrap items-center gap-4">
              {categories
                .filter((category) => category.parentId === mainCategory.id)
                .map((category) => (
                  <div key={category.id} className="px-5">
                    {category.slug}
                  </div>
                ))}
            </div>
          </DetailsModal>
        )}
        {isShowEditModal && (
          <EditModal
            onSubmit={() => {
              setIsShowEditModal(false);
              closeModal();
            }}
          >
            <div>
              <div className="py-3 pl-6 pr-3 rounded-xl mb-3 text-black bg-cognac-tint-4">
                <input
                  className="outline-none"
                  type="text"
                  placeholder="عنوان جدید را وارد کنید"
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value)}
                />
              </div>
              <div className="py-3 pl-6 pr-3 rounded-xl mb-3 text-black bg-cognac-tint-4">
                <input
                  className="outline-none"
                  type="text"
                  placeholder="زیر دسته بندی جدید را وارد کنید"
                  value={newSubCategory}
                  onChange={(e) => setNewSubCategory(e.target.value)}
                />
              </div>
            </div>
          </EditModal>
        )}
      </div>
    </>
  );
}
