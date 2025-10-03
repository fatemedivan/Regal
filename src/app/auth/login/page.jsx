"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AuthForm from "../components/AuthForm";


export default function Page() {
  const router = useRouter();

  const handleLogin = async (phone, password) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ phoneNumber: phone, password }),
        headers: { "Content-Type": "application/json" },
      });
      const result = await res.json();

      if (result.token) {
        document.cookie = `token=${result.token}; path=/; max-age=${60 * 60 * 24 * 30
          }`;
        localStorage.setItem("token", result.token);

        toast.success("با موفقیت وارد شدید");
        setTimeout(() => router.push("/"), 1000);

        sessionStorage.removeItem("signupPhone");
        sessionStorage.removeItem("signupPassword");
      } else {
        toast.error(result.message);
        setTimeout(() => router.push("/auth/register"), 1500);
      }
    } catch {
      toast.error("خطایی رخ داد");
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
}
