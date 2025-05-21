"use client";

import ActionModal from "@/components/admin/ActionModal";
import ErrBox from "@/components/admin/Errorbox";
import Pagination from "@/components/common/Pagination";
import { useScrollLockContext } from "@/context/ScrollLockContext";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";

export default function page() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const searchParamsHook = useSearchParams();
  const router = useRouter();
  const pageParam = searchParamsHook.get("page") || 1;
  const [token, setToken] = useState("");
  const [mainUserInfo, setMainUserInfo] = useState({});
  const [users, setUsers] = useState([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [latestPage, setLatestPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(pageParam);
  const { openModal, closeModal } = useScrollLockContext();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleChangePage = (page) => {
    setCurrentPage(page);
    const params = new URLSearchParams(searchParamsHook.toString());
    params.set("page", page);
    router.push(`?${params.toString()}`);
  };
  useEffect(() => {
      setCurrentPage(parseInt(searchParamsHook.get("page") || "1"));
    }, [searchParamsHook]);

  const editUser = async () => {
    try {
      const res = await fetch(
        `${baseUrl}/admin/users/${mainUserInfo.id}/role`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        toast.success("با موفقیت ویرایش شد");
        getUsers();
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

  useEffect(() => {
    if (!token) return;
    getUsers();
  }, [token]);

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${baseUrl}/admin/users?page=${currentPage}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setUsers(data.users);
        setLatestPage(data.latestPage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      {!isLoading && (!users || users.length === 0) ? (
        <div className="flex justify-center items-center mt-10 mr-50">
          <ErrBox title={"کاربری"} />
        </div>
      ) : (
        <div>
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-[60vh]">
              <HashLoader color="#b19276" size={80} />
              <p className="mt-5 text-xl font-extrabold text-cognac-shade-3 animate-pulse">
                ...loading
              </p>
            </div>
          ) : (
            <>
              <ToastContainer
                autoClose={2000}
                className={"custom-toast-container"}
              />
              <h1 className="text-3xl mb-3 mt-10 mr-50">لیست کاربر ها</h1>
              {/* mobile and tablet design */}
              {users && (
                <div className="space-y-4 lg:hidden mr-50 flex flex-wrap gap-2 justify-center items-center mb-5">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="p-4 rounded-lg bg-white shadow m-0"
                    >
                      <p className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                        {user.name ? user.name : "نام وارد نشده"}
                      </p>
                      <p className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                        {user.family ? user.family : "نام خانوادگی وارد نشده"}
                      </p>
                      <p className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                        شماره : {user.phoneNumber}
                      </p>
                      <p className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                        ایمیل : {user.email ? user.email : "ایمیل وارد نشده"}
                      </p>
                      <p className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                        نقش :{user.role}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-4">
                        <button
                          onClick={() => {
                            setIsShowDeleteModal(true);
                            openModal();
                            setMainUserInfo(user);
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
                  {users && (
                    <div className="rounded-lg p-5 mt-3 bg-white flex justify-center items-center mr-40">
                      <table className="table-auto border-separate border-spacing-y-4">
                        <thead>
                          <tr>
                            <th className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                              نام
                            </th>
                            <th className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                              نام خانوادگی
                            </th>
                            <th className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                              شماره
                            </th>
                            <th className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                              ایمیل
                            </th>
                            <th className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                              نقش
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user.id}>
                              <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                                {user.name ? user.name : "نام وارد نشده"}
                              </td>
                              <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                                {user.family
                                  ? user.family
                                  : "نام خانوادگی وارد نشده"}
                              </td>
                              <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                                {user.phoneNumber}
                              </td>
                              <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                                {user.email ? user.email : "ایمیل وارد نشده"}
                              </td>
                              <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-5">
                                {user.role}
                              </td>

                              <td className="px-8">
                                <button
                                  onClick={() => {
                                    setIsShowDeleteModal(true);
                                    openModal();
                                    setMainUserInfo(user);
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
                  title={`ایا از  تغییر نفش "${
                    mainUserInfo.name
                      ? mainUserInfo.name
                      : mainUserInfo.phoneNumber
                  }" اطمینان دارید ؟`}
                  onCancel={() => {
                    setIsShowDeleteModal(false);
                    closeModal();
                  }}
                  onDelete={editUser}
                />
              )}
            </>
          )}
        </div>
      )}
      {!isLoading && users && users.length && (
        <div className="flex justify-center items-center mr-50 mb-20">
          <Pagination
            currentPage={currentPage}
            latestPage={latestPage}
            products={users}
            onPageChange={handleChangePage}
          />
        </div>
      )}
    </div>
  );
}
