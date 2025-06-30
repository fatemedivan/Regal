import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CategoriesMenu({
  handleCloseCategory,
  handleCloseMenu,
}) {
  const router = useRouter();
  const [categoriesData, setCategoriesData] = useState([]);
  const handleToggle = (id) => {
    setCategoriesData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  useEffect(() => {
    const getCategoriesItems = async () => {
      try {
        const res = await fetch("/api/category");
        const data = await res.json();

        const updatedData = data.map((item) => ({
          ...item,
          isOpen: false,
        }));
        setCategoriesData(updatedData);
        
      } catch (error) {
        console.log(error);
      }
    };
    getCategoriesItems();
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 bg-[#1E1E1E] opacity-50 z-40"
        onClick={() => handleCloseCategory()}
      />

      <div className="px-5 py-6 bg-white absolute w-full top-21.25 right-0 left-0 z-50">
        <ul className="text-neutral-gray-13 lg:hidden">
          {categoriesData &&
            categoriesData.slice(1, 9).map((category) => (
              <div key={category.id}>
                <li
                  onClick={() => handleToggle(category.id)}
                  className="flex justify-between items-center border-b border-neutral-gray-4 mb-4 pb-4 cursor-pointer"
                >
                  <p className="text-sm leading-6">{category.name}</p>
                  <Image
                    onClick={() => handleToggle(category.id)}
                    className={`${
                      category.isOpen && "hidden pointer-events-none"
                    }`}
                    src="/img/arrow-down-2.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                  <Image
                    onClick={() => handleToggle(category.id)}
                    className={`${category.isOpen ? "block" : "hidden"}`}
                    src="/img/arrow-up.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </li>
                {category.isOpen && (
                  <ul className="mb-6 text-neutral-gray-11 transition-all ease-in-out duration-300">
                    {category.subcategories &&
                      category.subcategories.map((subcategory) => (
                        <li
                          key={subcategory.id}
                          onClick={() => {
                            router.push(
                              `/products?categoryId=${subcategory.parentId}&page=1`
                            );
                            handleCloseCategory();
                            handleCloseMenu();
                          }}
                        >
                          <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                            {subcategory.name}
                          </p>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
        </ul>
        <div className="hidden lg:flex justify-center gap-5">
          <div className="flex flex-col justify-center">
            <div className="flex gap-7 mb-6 justify-between">
              {categoriesData &&
                categoriesData.slice(1, 5).map((category) => (
                  <ul key={category.id}>
                    <li
                      onClick={() => {
                        router.push(
                          `/products?categoryId=${category.id}&page=1`
                        );
                        handleCloseCategory();
                      }}
                      className="flex items-center gap-2.5"
                    >
                      <div className="w-1.5 h-1.5 rounded-100 bg-cognac-primery"></div>
                      <p className="leading-7 text-neutral-gray-13 text-nowrap cursor-pointer">
                        {category.name}
                      </p>
                    </li>

                    {category.subcategories.map((subCategory) => (
                      <li
                        key={subCategory.id}
                        onClick={() => {
                          router.push(
                            `/products?categoryId=${category.parentId}&page=1`
                          );
                          handleCloseCategory();
                        }}
                        className="cursor-pointer"
                      >
                        <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                          {subCategory.name}
                        </p>
                      </li>
                    ))}
                  </ul>
                ))}
            </div>
            <div className="flex gap-7 mb-6 justify-between">
              {categoriesData &&
                categoriesData.slice(6, 10).map((category) => (
                  <ul key={category.id}>
                    <li
                      onClick={() => {
                        router.push(
                          `/products?categoryId=${category.id}&page=1`
                        );
                        handleCloseCategory();
                      }}
                      className="flex items-center gap-2.5"
                    >
                      <div className="w-1.5 h-1.5 rounded-100 bg-cognac-primery"></div>
                      <p className="leading-7 text-neutral-gray-13 text-nowrap cursor-pointer">
                        {category.name}
                      </p>
                    </li>

                    {category.subcategories.map((subCategory) => (
                      <li
                        key={subCategory.id}
                        onClick={() => {
                          router.push(
                            `/products?categoryId=${category.parentId}&page=1`
                          );
                          handleCloseCategory();
                        }}
                        className="cursor-pointer"
                      >
                        <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                          {subCategory.name}
                        </p>
                      </li>
                    ))}
                  </ul>
                ))}
            </div>
          </div>
          <div>
            <p className="leading-7 text-neutral-gray-13">
              دسته‌بندی‌های پربازدید
            </p>
            <div className="flex gap-6 items-center mt-3 mb-12">
              <div
                onClick={() => {
                  router.push("/products?categoryId=1&page=1");
                  handleCloseCategory();
                }}
                className="relative w-65 h-96 cursor-pointer"
              >
                <Image src="/img/category-desktop-9.png" alt="" fill />
                <h5 className="absolute bottom-4 right-3.75 text-white font-bold text-[21px] leading-6.5">
                  پیراهن کوتاه
                </h5>
              </div>

              <div>
                <div
                  onClick={() => {
                    router.push("/products?categoryId=2&page=1");
                    handleCloseCategory();
                  }}
                  className="relative w-65 h-45 cursor-pointer"
                >
                  <Image src="/img/category-desktop-10.png" alt="" fill />
                  <h5 className="absolute bottom-4 right-3.75 z-20 text-white font-bold text-[21px] leading-6.5">
                    کت و جلیقه
                  </h5>
                </div>

                <div
                  onClick={() => {
                    router.push("/products?categoryId=3&page=1");
                    handleCloseCategory();
                  }}
                  className="relative mt-6 w-65 h-45 cursor-pointer"
                >
                  <Image src="/img/category-desktop-11.png" alt="" fill />
                  <h5 className="absolute bottom-4 right-3.75 z-20 text-white font-bold text-[21px] leading-6.5">
                    تاپ و کراپ
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
