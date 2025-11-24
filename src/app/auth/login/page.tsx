"use client";
import AuthForm from "../components/AuthForm";
import { useLoginUser } from "@/app/auth/hook/useLoginUser";

export default function Page() {
  const { loginUser } = useLoginUser();

  return <AuthForm type="login" onSubmit={loginUser} />;
}
