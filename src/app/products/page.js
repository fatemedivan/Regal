"use client";
import Breadcrumb from "@/components/common/Breadcrumb";
import FilterMenu from "@/components/products/FilterMenu";
import Pagination from "@/components/common/Pagination";
import ProductItemOff from "@/components/common/ProductItemOff";
import Sort from "@/components/products/Sort";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useScrollLockContext } from "@/context/ScrollLockContext";

export default function Page() {
  const [isOpenFilterMenu, setIsOpenFilterMenu] = useState(false);
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});
  const [token, setToken] = useState(null);
  const [products, setProducts] = useState([]);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const sortOptions = [
   {id:1, title: "جدیدترین", value: "earliest"} ,
   {id:2, title: "قدیمی‌ترین", value: "latest" } ,
   {id:3, title:  "ارزان‌ترین", value: "cheapest"},
   {id:4, title: "گران‌ترین", value: "expensive"}
     
  ];
  const handleCloseFilter = () => {
    setIsOpenFilterMenu(false);
    closeModal();
  };
  const handleCloseSort = () => {
    setIsOpenSort(false);
    closeModal();
  };
  const { openModal, closeModal } = useScrollLockContext();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    const getProducts = async () => {
      try {
        const res = await fetch(`${baseUrl}/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res);
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [token]);

  const getProductsByOrder = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${baseUrl}/products?orderBy=${selectedOption.value}`,{
        headers : {Authorization : `Bearer ${token}`}
      });
      if (res.ok) {
        const data = await res.json()
        setProducts(data.products)
        console.log(data);  
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
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
            <Sort setSelectedOption={setSelectedOption} selectedOption={selectedOption} handleCloseSort={handleCloseSort} getProductsByOrder={getProductsByOrder} />
          </div>
        )}
        <div>
          <div className="mx-5 mb-16 lg:mx-12 lg:mb-22">
            <div className="flex items-center gap-2 mt-6.5 mb-1.5 lg:mt-12 lg:mb-10">
              <Image
                width={24}
                height={24}
                className="lg:hidden"
                src="/img/arrow-right-4.svg"
                alt=""
              />
              <h5 className="font-semibold leading-5 text-black lg:font-bold lg:text-[27px] lg:inline lg:leading-8">
                لباس مجلسی میدی
                <span className="hidden lg:inline mr-2 text-neutral-gray-8 font-bold leading-4.5 text-lg">
                  (56 کالا)
                </span>
              </h5>
            </div>
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <p className="text-neutral-gray-8 text-sm leading-5">
                تعداد محصولات : ۵۶ کالا
              </p>
              <div className="flex items-center gap-2">
                <div
                  onClick={() => {
                    setIsOpenFilterMenu(true);
                    openModal(true);
                  }}
                  className="p-3 border border-neutral-gray-8 rounded-lg cursor-pointer"
                >
                  <Image width={16} height={16} src="/img/filter.svg" alt="" />
                </div>
                <div
                  onClick={() => {
                    setIsOpenSort(true);
                    openModal();
                  }}
                  className="p-3 border border-neutral-gray-8 rounded-lg cursor-pointer"
                >
                  <Image width={16} height={16} src="/img/sort.svg" alt="" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4  lg:hidden">
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
                              setSelectedOption(option);
                              getProductsByOrder()
                              setIsOpenSort(false)
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
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
