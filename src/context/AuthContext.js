"use client";

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
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    const getUser = async () => {
      const response = await fetch(`${baseUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();
      console.log(result);
      if (response.ok) {
        setPhoneNumber(result.phoneNumber);
        setName(result.name);
        setFamily(result.family);
        setEmail(result.email);
      }
    };
    getUser();
  }, [token, phoneNumber, name, family, email]);

  return (
    <AuthContext.Provider value={{ phoneNumber, name, family, email }}>
      {children}
    </AuthContext.Provider>
  );
};
