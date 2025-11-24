"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useLoginUser() {
  const router = useRouter();

  const loginUser = async (phone: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ phoneNumber: phone, password }),
        headers: { "Content-Type": "application/json" },
      });
      const result: { token?: string; message?: string } = await res.json();

      if (result.token) {
        document.cookie = `token=${result.token}; path=/; max-age=${
          60 * 60 * 24 * 30
        }`;
        localStorage.setItem("token", result.token);

        toast.success("عملیات با موفقیت انجام شد");
        setTimeout(() => router.back(), 1000);
      } else {
        toast.error(result.message);
        setTimeout(() => router.push("/auth/register"), 1500);
      }
    } catch {
      toast.error("خطایی رخ داد");
    }
  };

  return { loginUser };
}
