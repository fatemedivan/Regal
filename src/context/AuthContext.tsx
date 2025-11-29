"use client";

import getToken from "@/utils/getToken";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, AuthProviderProps, UserInfo } from "./types";

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext باید داخل AuthContextProvider استفاده شود");
  }
  return context;
};

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const token = getToken();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    phoneNumber: "",
    name: "",
    family: "",
    email: "",
  });

  const getUser = async (): Promise<void> => {
    if (!token) return;
    const response = await fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await response.json();

    if (response.ok) {
      const data = {
        phoneNumber: result.phoneNumber ?? "",
        name: result.firstName ?? "",
        family: result.lastName ?? "",
        email: result.email ?? "",
      };
      setUserInfo(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
    }
  };
  useEffect(() => {
    const chachedUserInfo = localStorage.getItem("userInfo");
    if (chachedUserInfo) {
      setUserInfo(JSON.parse(chachedUserInfo));
      return;
    }
    if (token) getUser();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    sessionStorage.removeItem("full address");
    sessionStorage.removeItem("address");
    document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    setUserInfo({ phoneNumber: "", name: "", family: "", email: "" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...userInfo,
        setUserInfo,
        refreshUser: () => getUser(),
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
