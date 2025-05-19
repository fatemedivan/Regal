"use client";
import React from "react";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathname = usePathname();
  const menuItems = [
    {
      href: "/admin/products",
      label: "محصولات",
      icon: <MdProductionQuantityLimits />,
    },
    {
      href: "/admin/add-product",
      label: "افزودن محصول",
      icon: <IoMdAddCircleOutline />,
    },
    {
      href: "/admin/add-size",
      label: "افزودن سایز",
      icon: <IoMdAddCircleOutline />,
    },
    {
      href: "/admin/add-color",
      label: "افزودن رنگ",
      icon: <IoMdAddCircleOutline />,
    },
    {
      href: "/admin/categories",
      label: "دسته بندی ها",
      icon: <MdOutlineCategory />,
    },
    { href: "/admin/users", label: "کاربران", icon: <FiUsers /> },
    {
      href: "/admin/orders",
      label: "سفارشات",
      icon: <MdProductionQuantityLimits />,
    },
  ];

  return (
    <div>
      <div className="h-full right-0 top-0 fixed bg-cognac-primery text-white w-45">
        <div className="flex items-center justify-between p-2 border-b-1 border-white-50">
          <h1>به داشبورد خوش آمدید</h1>
        </div>
        <ul className="pt-6">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;

            return (
              <li key={`menu-${index}`} className="w-full">
                <Link href={item.href} className="block w-full">
                  <div
                    className={`flex gap-2 items-center text-xl p-3 w-full cursor-pointer transition-colors ${
                      isActive ? "bg-cognac-tint-6" : ""
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
