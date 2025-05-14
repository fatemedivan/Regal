"use client";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ScrollLockContextProvider } from "@/context/ScrollLockContext";
import { AuthContextProvider } from "@/context/AuthContext";
import { BasketContextProvider } from "@/context/BasketContext";

export default function Layout({ children }) {
  return (
    <AuthContextProvider>
      <ScrollLockContextProvider>
        <BasketContextProvider>
          <Navbar />
          {children}
          <Footer />
        </BasketContextProvider>
      </ScrollLockContextProvider>
    </AuthContextProvider>
  );
}
