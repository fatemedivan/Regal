import SideBar from "@/components/admin/SideBar";
import React from "react";

export default function layout({ children }) {
  return (
    <div>
      <SideBar />
      {children}
    </div>
  );
}
