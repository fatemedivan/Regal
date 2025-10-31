"use client";

import getToken from "@/utils/getToken";

const { createContext, useContext, useEffect, useState } = require("react");

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext باید داخل AuthContextProvider استفاده شود");
  }
  return context;
};

export const AuthContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    phoneNumber: '',
    name: '',
    family: '',
    email: ''
  })
  const token = getToken()

  const getUser = async () => {
    if (!token) return
    const response = await fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await response.json();

    if (response.ok) {
      setUserInfo({
        phoneNumber: result.phoneNumber,
        name: result.firstName,
        family: result.lastName,
        email: result.email,
      });
    }
  };

  useEffect(() => {
    getUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ ...userInfo, setUserInfo, refreshUser:getUser }}>
      {children}
    </AuthContext.Provider>
  );
};
