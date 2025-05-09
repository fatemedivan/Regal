"use client";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ScrollLockContextProvider } from "@/context/ScrollLockContext";
import { AuthContextProvider } from "@/context/AuthContext";

export default function Layout({ children }) {
  return (
    <AuthContextProvider>
      <ScrollLockContextProvider>
        <Navbar />
        {children}
        <Footer />
      </ScrollLockContextProvider>
    </AuthContextProvider>
  );
}
