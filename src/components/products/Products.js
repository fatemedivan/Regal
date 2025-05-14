"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import ProductItemOff from "../common/ProductItemOff";
import Image from "next/image";
import Sort from "./Sort";
import Breadcrumb from "../common/Breadcrumb";
import { useScrollLockContext } from "@/context/ScrollLockContext";
import FilterMenu from "@/components/products/FilterMenu";

export default function Products({ search, orderBy, categoryId }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const { openModal, closeModal } = useScrollLockContext();
  const searchParamsHook = useSearchParams();

  const pageParam = parseInt(searchParamsHook.get("page") || "1");

  const [isOpenFilterMenu, setIsOpenFilterMenu] = useState(false);
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [token, setToken] = useState(null);
  const [selectedOption, setSelectedOption] = useState({});
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [searchValue, setSearchValue] = useState("");

  const sortOptions = [
    { id: 1, title: "جدیدترین", value: "earliest" },
    { id: 2, title: "قدیمی‌ترین", value: "latest" },
    { id: 3, title: "ارزان‌ترین", value: "cheapest" },
    { id: 4, title: "گران‌ترین", value: "expensive" },
  ];

  const handleCloseFilter = () => {
    setIsOpenFilterMenu(false);
    closeModal();
  };

  const handleCloseSort = () => {
    setIsOpenSort(false);
    closeModal();
  };

  //AI
  //handle changing sort
  const handleSortChange = (option) => {
    setSelectedOption(option);
    const params = new URLSearchParams(searchParamsHook.toString());
    params.set("orderBy", option.value);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  //AI
  //handle changing page
  const handlePageChange = (page) => {
    setCurrentPage(page);
    const params = new URLSearchParams(searchParamsHook.toString());
    params.set("page", page);
    router.push(`?${params.toString()}`);
  };

  //AI
  //set currentpage from url
  useEffect(() => {
    setCurrentPage(parseInt(searchParamsHook.get("page") || "1"));
  }, [searchParamsHook]);

  //get token
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  //handle search
  useEffect(() => {
    if (search) {
      const getProductsBySearch = async () => {
        try {
          const res = await fetch(
            `${baseUrl}/products?search=${search}&page=${currentPage}`
          );
          if (res.ok) {
            const data = await res.json();
            if (data.products.length === 0) {
              setNotFound(true);
            } else {
              setProducts(data.products);
              setNotFound(false);
            }
          }
          if (res.status === 404) {
            setNotFound(true);
            setProducts([]);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getProductsBySearch();
    }
  }, [search, currentPage]);

  // handle category id
  useEffect(() => {
    if (categoryId) {
      const getProductsByCategoryId = async () => {
        try {
          const res = await fetch(
            `${baseUrl}/products?categoryId=${categoryId}&page=${currentPage}`
          );
          if (res.ok) {
            const data = await res.json();
            if (data.products.length === 0) {
              setNotFound(true);
            } else {
              setProducts(data.products);
              setTotalPages(data.latestPage);
              setNotFound(false);
              console.log(data);
            }
          }
          if (res.status === 404) {
            setNotFound(true);
            setProducts([]);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getProductsByCategoryId();
    }
  }, [categoryId, currentPage]);

  //get all products
  useEffect(() => {
    if (!token || search || categoryId) return;
    const getProducts = async () => {
      try {
        const res = await fetch(`${baseUrl}/products?page=${currentPage}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res);
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products);
          setTotalPages(data.latestPage);
          setNotFound(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [token, search, categoryId, currentPage]);

  //handle order
  const getProductsByOrder = async () => {
    if (!token || !orderBy) return;
    try {
      const res = await fetch(
        `${baseUrl}/products?orderBy=${orderBy}&page=${currentPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products);
        setNotFound(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //handle search in products
  useEffect(() => {
    if (searchValue.trim() === "") return;
    const params = new URLSearchParams(searchParamsHook.toString());
    params.set("search", searchValue);
    params.set("page", currentPage);
    router.push(`?${params.toString()}`);

    const getSearchedProducts = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/products?search=${searchValue}&page=${currentPage}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.ok) {
          const data = await res.json();
          if (data.products.length === 0) {
            setNotFound(true);
          } else {
            setProducts(data.products);
            setTotalPages(data.latestPage);
            setNotFound(false);
            console.log(data);
          }
        }
        if (res.status === 404) {
          setNotFound(true);
          setProducts([]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getSearchedProducts();
  }, [searchValue, token, currentPage, searchParamsHook]);

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "صفحه اصلی" },
          { label: "دسته‌بندی محصولات" },
          { label: "لباس مجلسی" },
          { label: "لباس مجلسی میدی" },
        ]}
      />
      <div className="container mx-auto">
        {isOpenFilterMenu && (
          <div className="lg:hidden absolute top-0 left-0 right-0 bg-white z-50">
            <FilterMenu handleCloseFilter={handleCloseFilter} />
          </div>
        )}
        {isOpenSort && (
          <div className="lg:hidden absolute top-0 left-0 right-0 bg-white z-50">
            <Sort
              setSelectedOption={setSelectedOption}
              selectedOption={selectedOption}
              handleSortChange={handleSortChange}
              handleCloseSort={handleCloseSort}
              getProductsByOrder={getProductsByOrder}
            />
          </div>
        )}
        <div>
          <div className="mx-5 mb-16 lg:mx-12 lg:mb-22">
            {notFound ? (
              <p className="text-center w-full text-red-500 text-xl font-bold mt-10 lg:hidden">
                محصولی یافت نشد
              </p>
            ) : (
              <>
                <div className="flex items-center gap-2 mt-6.5 mb-1.5 lg:mt-12 lg:mb-10">
                  <Image
                    width={24}
                    height={24}
                    className="lg:hidden cursor-pointer"
                    src="/img/arrow-right-4.svg"
                    alt=""
                    onClick={() => router.back()}
                  />
                  <h5 className="font-semibold leading-5 text-black lg:font-bold lg:text-[27px] lg:inline lg:leading-8">
                    <span className="hidden lg:inline mr-2 text-neutral-gray-8 font-bold leading-4.5 text-lg">
                      ({products.length} کالا)
                    </span>
                  </h5>
                </div>
                <div className="flex justify-between items-center mb-6 lg:hidden">
                  <p className="text-neutral-gray-8 text-sm leading-5">
                    تعداد محصولات : {products.length} کالا
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      onClick={() => {
                        setIsOpenFilterMenu(true);
                        openModal(true);
                      }}
                      className="p-3 border border-neutral-gray-8 rounded-lg cursor-pointer"
                    >
                      <Image
                        width={16}
                        height={16}
                        src="/img/filter.svg"
                        alt=""
                      />
                    </div>
                    <div
                      onClick={() => {
                        setIsOpenSort(true);
                        openModal();
                      }}
                      className="p-3 border border-neutral-gray-8 rounded-lg cursor-pointer"
                    >
                      <Image
                        width={16}
                        height={16}
                        src="/img/sort.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-wrap gap-4 lg:hidden">
              {products.length > 0 &&
                products.map((product) => (
                  <ProductItemOff
                    id={product.id}
                    key={product.id}
                    img={"/img/category-page-2.png"}
                    offPercent={product.discount}
                    title={product.title}
                    price={Math.round(
                      product.latestPrice / (1 - product.discount / 100)
                    )}
                    finalPrice={product.latestPrice}
                    colors={product.ProductColor.map((item) => item.color)}
                    favorites={product.Favorite}
                  />
                ))}
            </div>
            <div className="hidden lg:flex justify-between gap-6">
              <div>
                <h5 className="text-xl font-bold leading-6.5 text-neutral-gray-13 mb-12">
                  فیلترها
                </h5>
                <div>
                  <FilterMenu />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-6">
                  <div className="px-4 py-3.75 rounded-lg border border-neutral-gray-4 flex items-center gap-1 w-full">
                    <Image
                      width={16}
                      height={16}
                      src="/img/search-normal-2.svg"
                      alt=""
                    />
                    <input
                      type="text"
                      value={searchValue}
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                      }}
                      className="w-full outline-none placeholder:text-xs placeholder:leading-4.5 placeholder:text-neutral-gray-7"
                      placeholder="جستجو کنید"
                    />
                  </div>
                  <div className="relative w-80">
                    <button
                      onClick={() => {
                        setIsOpenSort(!isOpenSort);
                      }}
                      className="w-full border border-neutral-gray-4 rounded-lg py-5 pl-8 pr-6 text-right flex justify-between items-center cursor-pointer"
                    >
                      <p className="text-neutral-gray-7 text-xs leading-4.5">
                        {selectedOption.title || "مرتب سازی بر اساس"}
                      </p>
                      <Image
                        src="/img/drop-down.svg"
                        width={16}
                        height={16}
                        alt="dropdown icon"
                        className={`absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none transition ${
                          isOpenSort && "rotate-180"
                        }`}
                      />
                    </button>

                    {isOpenSort && (
                      <ul className="absolute w-full z-20 bg-white border border-neutral-gray-4 mt-1 rounded-lg shadow-lg text-sm">
                        {sortOptions.map((option) => (
                          <li
                            key={option.id}
                            onClick={() => {
                              handleSortChange(option);
                              getProductsByOrder();
                              setIsOpenSort(false);
                              closeModal();
                            }}
                            className="px-4 py-2 hover:bg-neutral-gray-2 cursor-pointer text-xs leading-4.5 text-neutral-gray-7"
                          >
                            {option.title}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                {notFound && (
                  <div className="text-center w-full text-red-500 text-3xl font-bold mt-10">
                    محصولی یافت نشد
                  </div>
                )}
                <div className="flex items-center 2xl:justify-between flex-wrap gap-x-6 gap-y-8 mt-6">
                  {products.length > 0 &&
                    products.map((product) => (
                      <ProductItemOff
                        id={product.id}
                        key={product.id}
                        img={"/img/category-page-2.png"}
                        offPercent={product.discount}
                        title={product.title}
                        price={Math.round(
                          product.latestPrice / (1 - product.discount / 100)
                        )}
                        finalPrice={product.latestPrice}
                        colors={product.ProductColor.map((item) => item.color)}
                        favorites={product.Favorite}
                      />
                    ))}
                </div>
                {!notFound && (
                  <Pagination
                    currentPage={currentPage}
                    products={products}
                    latestPage={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
