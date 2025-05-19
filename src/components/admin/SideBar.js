"use client";
import React from "react";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
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
    { href: "/admin/categories", label: "دسته بندی ها", icon: <MdOutlineCategory /> },
    { href: "/admin/users", label: "کاربران", icon: <FiUsers /> },
    {
      href: "/admin/orders",
      label: "سفارشات",
      icon: <MdProductionQuantityLimits />,
    },
  ];

  return (
    <div>
      <div
        className={`h-full right-0 top-0 fixed bg-cognac-primery text-white w-[180px] md:translate-x-0 md:fixed ${"translate-x-0"}`}
      >
        <div className="flex items-center justify-between p-2 border-b-1 border-white-50">
          <h1>به داشبورد خوش امدید</h1>
        </div>
        <ul className="pt-6">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link href={item.href} key={item.href}>
                <li
                  className={`flex gap-2 items-center text-xl p-3 w-full cursor-pointer transition-colors ${
                    isActive && "bg-cognac-tint-6"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
