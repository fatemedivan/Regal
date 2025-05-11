import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function CategoriesMenu({
  handleCloseCategory,
  handleCloseMenu,
}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
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
      const res = await fetch(`${baseUrl}/categories`);
      const data = await res.json();
      console.log(data);
      //AI
      const updatedData = data.map((item) => ({
        ...item,
        isOpen: false,
      }));
      setCategoriesData(updatedData);
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
            categoriesData.slice(0, 8).map((category) => (
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
                    <Link href={"/products"}>
                      {category.subcategories &&
                        category.subcategories.map((subcategory) => (
                          <li
                            onClick={() => {
                              handleCloseCategory();
                              handleCloseMenu();
                            }}
                            key={subcategory.id}
                          >
                            <p className="px-4 py-2.5 text-sm leading-5 cursor-pointer">
                              {subcategory.name}
                            </p>
                          </li>
                        ))}
                    </Link>
                  </ul>
                )}
              </div>
            ))}
        </ul>
        <div className="hidden lg:flex justify-center gap-14">
          <div>
            <div className="flex gap-7 mb-6">
              {categoriesData &&
                categoriesData.slice(0, 4).map((category) => (
                  <ul key={category.id}>
                    <Link href={"/products"}>
                      <li
                        onClick={() => handleCloseCategory()}
                        className="flex items-center gap-2.5"
                      >
                        <div className="w-1.5 h-1.5 rounded-100 bg-cognac-primery"></div>
                        <p className="leading-7 text-neutral-gray-13 text-nowrap cursor-pointer">
                          {category.name}
                        </p>
                      </li>
                    </Link>
                    {category.subcategories.map((subCategory) => (
                      <li key={subCategory.id} className="cursor-pointer">
                        <p className="leading-5 text-sm text-neutral-gray-11 px-4 py-2.5">
                          {subCategory.name}
                        </p>
                      </li>
                    ))}
                  </ul>
                ))}
            </div>
            <div className="flex gap-7">
              {categoriesData &&
                categoriesData.slice(5, 9).map((category) => (
                  <ul key={category.id}>
                    <Link href={"/products"}>
                      <li
                        onClick={() => handleCloseCategory()}
                        className="flex items-center gap-2.5"
                      >
                        <div className="w-1.5 h-1.5 rounded-100 bg-cognac-primery"></div>
                        <p className="leading-7 text-neutral-gray-13 text-nowrap cursor-pointer">
                          {category.name}
                        </p>
                      </li>
                    </Link>
                    {category.subcategories.map((subCategory) => (
                      <li key={subCategory.id} className="cursor-pointer">
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
              <Link href={"/products"}>
                <div
                  onClick={() => handleCloseCategory()}
                  className="relative w-65 h-96 cursor-pointer"
                >
                  <Image src="/img/category-desktop-9.png" alt="" fill />
                  <h5 className="absolute bottom-4 right-3.75 text-white font-bold text-[21px] leading-6.5">
                    پیراهن کوتاه
                  </h5>
                </div>
              </Link>
              <div>
                <Link href={"/products"}>
                  <div
                    onClick={() => handleCloseCategory()}
                    className="relative w-65 h-45 cursor-pointer"
                  >
                    <Image src="/img/category-desktop-10.png" alt="" fill />
                    <h5 className="absolute bottom-4 right-3.75 z-20 text-white font-bold text-[21px] leading-6.5">
                      کت و جلیقه
                    </h5>
                  </div>
                </Link>
                <Link href={"/products"}>
                  <div
                    onClick={() => handleCloseCategory()}
                    className="relative mt-6 w-65 h-45 cursor-pointer"
                  >
                    <Image src="/img/category-desktop-11.png" alt="" fill />
                    <h5 className="absolute bottom-4 right-3.75 z-20 text-white font-bold text-[21px] leading-6.5">
                      تاپ و کراپ
                    </h5>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
