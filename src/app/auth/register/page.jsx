"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AuthForm from "../components/AuthForm";

export default function Page() {
  const router = useRouter();

  const handleRegister = async (phone, password) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ phoneNumber: phone, password }),
        headers: { "Content-Type": "application/json" },
      });
      const result = await res.json();

      if (res.ok) {
        sessionStorage.setItem("signupPhone", phone);
        sessionStorage.setItem("signupPassword", password);
        toast.success(result.message);
        setTimeout(() => router.push("/auth/login"), 1500);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("خطایی رخ داد");
    }
  };

  return <AuthForm type="register" onSubmit={handleRegister} />;
}
