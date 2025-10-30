"use client";

import { HashLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-[60vh]">
      <HashLoader color="#b19276" size={80} />
      <p className="mt-5 font-extrabold text-cognac-shade-3 animate-pulse">
        درحال بارگذاری...
      </p>
    </div>
  );
}
