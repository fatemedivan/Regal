"use client";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ScrollLockContextProvider } from "@/context/ScrollLockContext";
import { AuthContextProvider } from "@/context/AuthContext";
import { BasketContextProvider } from "@/context/BasketContext";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const pathName = usePathname()
  const isAdminRout = pathName.startsWith('/admin')
  const isAuthRout = pathName.startsWith('/auth')
  return (
    <AuthContextProvider>
      <ScrollLockContextProvider>
        <BasketContextProvider>
          {!isAdminRout && !isAuthRout && <Navbar />}
          {children}
          {!isAdminRout && !isAuthRout && <Footer />}
        </BasketContextProvider>
      </ScrollLockContextProvider>
    </AuthContextProvider>
  );
}
