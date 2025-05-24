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
  useEffect(()=>{
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
    }
  },[])
  useEffect(() => {
    if (!token) return
    const getUser = async () => {
      const response = await fetch(`${baseUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (response.ok) {
        setPhoneNumber(result.phoneNumber);
        setName(result.name);
        setFamily(result.family);
        setEmail(result.email);
      }
    };
    getUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ phoneNumber, name, family, email }}>
      {children}
    </AuthContext.Provider>
  );
};
