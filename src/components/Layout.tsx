"use client";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

import { AuthContextProvider } from "@/context/AuthContext";
import { BasketProvider } from "@/context/BasketContext";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: ReactNode }) {
  const pathName = usePathname();
  const isAdminRout = pathName.startsWith("/admin");
  const isAuthRout = pathName.startsWith("/auth");
  return (
    <AuthContextProvider>
      <BasketProvider>
        {!isAdminRout && !isAuthRout && <Navbar />}
        {children}
        {!isAdminRout && !isAuthRout && <Footer />}
      </BasketProvider>
    </AuthContextProvider>
  );
}
