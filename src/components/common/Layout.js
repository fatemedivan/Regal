'use client'
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ScrollLockContextProvider } from "@/context/ScrollLockContext";

export default function Layout({ children }) {
  return (
    <ScrollLockContextProvider>
      <Navbar />
      {children}
      <Footer />
    </ScrollLockContextProvider>
  );
}