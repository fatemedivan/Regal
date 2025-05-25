"use client";
import ActionModal from "@/components/admin/ActionModal";
import EditModal from "@/components/admin/EditModal";
import ErrBox from "@/components/admin/Errorbox";
import { useScrollLockContext } from "@/context/ScrollLockContext";
import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";

export default function Page() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [categories, setCategories] = useState([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [mainCategory, setMainCategoryInfo] = useState({});
  const [newSlug, setNewSlug] = useState("");
  const [newParentCategoryId, setNewParentCategoryId] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGetData, setIsLoadingGetData] = useState(false);

  const { openModal, closeModal } = useScrollLockContext();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const deleteModalCancel = () => {
    setIsShowDeleteModal(false);
    closeModal();
  };

  const deleteCategory = async () => {
    try {
      const res = await fetch(
        `${baseUrl}/admin/categories/${mainCategory.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      const result = await res.json();
      console.log(result);

      if (res.ok) {
        toast.success("با موفقیت حذف شد");
        getCategories();
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

  const editCategory = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${baseUrl}/admin/categories/${mainCategory.id}/slug`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            slug: newSlug.toLowerCase(),
            parentId: parseInt(newParentCategoryId),
          }),
        }
      );
      console.log(res);
      const result = await res.json();
      console.log(result);
      if (res.ok) {
        toast.success("با موفقیت ویرایش شد");
        getCategories();
      } else {
        toast.error("ناموفق");
      }
    } catch (error) {
      toast.error("خطایی رخ داد");
    } finally {
      setIsShowEditModal(false);
      closeModal();
      setIsLoading(false);
      setNewParentCategoryId("");
      setNewSlug("");
    }
  };

  const addCategories = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${baseUrl}/admin/categories`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: newSlug,
          parentId: parseInt(newParentCategoryId),
        }),
      });
      console.log(res);
      if (res.ok) {
        const result = res.json();
        console.log(result);
        toast.success("با موفقیت اضافه شد");
        getCategories();
        setNewParentCategoryId("");
        setNewSlug("");
      } else {
        toast.error("ناموفق");
      }
    } catch (error) {
      toast.error("خطایی رخ داد");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      setIsLoadingGetData(true);
      const res = await fetch(`${baseUrl}/categories`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
        console.log(data);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingGetData(false);
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
                value={newParentCategoryId ? newParentCategoryId : ''}
                onChange={(e) => setNewParentCategoryId(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end items-center">
            <button
              type="button"
              onClick={() => addCategories()}
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
      {!isLoadingGetData && (!categories || categories.length === 0) ? (
        <div className="flex justify-center items-center mt-10 mr-50">
          <ErrBox title={"محصولی"} />
        </div>
      ) : (
        <div>
          {isLoadingGetData ? (
            <div className="flex flex-col justify-center items-center h-[60vh]">
              <HashLoader color="#b19276" size={80} />
              <p className="mt-5 text-xl font-extrabold text-cognac-shade-3 animate-pulse">
                ...loading
              </p>
            </div>
          ) : (
            <div>
              <h1 className="text-3xl mb-3 mt-10 mr-50">لیست دسته بندی ها</h1>
              {/* mobile and tablet design */}
              {categories && (
                <div className="space-y-4 lg:hidden mr-50 flex flex-wrap gap-2 justify-center items-center mb-5">
                  {categories.map((category) => (
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
                        دسته بندی :{" "}
                        {category.parent?.slug ? category.parent.slug : "_"}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-4">
                        <button
                          onClick={() => {
                            setIsShowDeleteModal(true);
                            openModal();
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
                            setNewSlug(category.slug);
                            setNewParentCategoryId(category.parentId);
                            setMainCategoryInfo(category);
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
                  {categories && (
                    <div className="rounded-lg p-5 mt-3 bg-white flex justify-center items-center mr-40">
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
                              دسته بندی
                            </th>
                            <th className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                              شماره دسته بندی
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories.map((category) => (
                            <tr key={category.id}>
                              <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                                {category.slug}
                              </td>
                              <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                                {category.id}
                              </td>
                              <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                                {category.parent?.slug
                                  ? category.parent.slug
                                  : "_"}
                              </td>
                              <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                                {category.parent?.id ? category.parent.id : "_"}
                              </td>

                              <td className="px-8">
                                <button
                                  onClick={() => {
                                    setIsShowDeleteModal(true);
                                    openModal();
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
                                    setNewSlug(category.slug);
                                    setNewParentCategoryId(category.parentId);
                                    setMainCategoryInfo(category);
                                  }}
                                  className="bg-cognac-primery rounded-xl p-3 text-white mx-3 cursor-pointer mr-8"
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
                  title={`ایا از حذف "${mainCategory.slug}" اطمینان دارید ؟`}
                  onCancel={deleteModalCancel}
                  onDelete={deleteCategory}
                />
              )}
              {isShowEditModal && (
                <EditModal
                  onSubmit={editCategory}
                  onCancel={() => {
                    setIsShowEditModal(false);
                    closeModal();
                  }}
                  isLoading={isLoading}
                >
                  <div>
                    <label className="pr-2">عنوان جدید</label>
                    <div className="py-3 pl-6 pr-3 rounded-xl mb-3 text-black bg-cognac-tint-4">
                      <input
                        className="outline-none"
                        type="text"
                        placeholder="عنوان جدید را وارد کنید"
                        value={newSlug}
                        onChange={(e) => setNewSlug(e.target.value)}
                      />
                    </div>
                    {newParentCategoryId && (
                      <div>
                        <label className="pr-2">شماره دسته بندی جدید</label>
                        <div className="py-3 pl-6 pr-3 rounded-xl mb-3 text-black bg-cognac-tint-4">
                          <input
                            className="outline-none"
                            type="text"
                            placeholder="شماره دسته بندی جدید را وارد کنید"
                            value={newParentCategoryId}
                            onChange={(e) =>
                              setNewParentCategoryId(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </EditModal>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
