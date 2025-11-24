"use client";
import { toast } from "react-toastify";
import AuthForm from "../components/AuthForm";
import { useLoginUser } from "@/app/auth/hook/useLoginUser";

export default function Page() {
  const { loginUser } = useLoginUser();
  const handleRegister = async (phone: string, password: string) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ phoneNumber: phone, password }),
        headers: { "Content-Type": "application/json" },
      });
      const result: { token?: string; message?: string } = await res.json();

      if (res.ok) {
        await loginUser(phone, password);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("خطایی رخ داد");
    }
  };

  return <AuthForm type="register" onSubmit={handleRegister} />;
}
