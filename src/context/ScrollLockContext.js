"use client";

const { createContext, useState, useContext, useEffect } = require("react");

const ScrollLockContext = createContext();

export const useScrollLockContext = () => {
  const context = useContext(ScrollLockContext);
  if (!context) {
    throw new Error(
      "useScrollLockContext باید داخل ScrollLockContextProvider استفاده شود"
    );
  }
  return context;
};

export const ScrollLockContextProvider = ({ children }) => {
  const [isLockScroll, setIsLockScroll] = useState(false);
  const [mobileOnlyLock, setMobileOnlyLock] = useState(false);
  useEffect(() => {
    const isMobile = window.innerWidth <= 1024;

    if (isLockScroll && (!mobileOnlyLock || (mobileOnlyLock && isMobile))) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLockScroll]);

  return (
    <ScrollLockContext.Provider value={{ isLockScroll, setIsLockScroll, mobileOnlyLock, setMobileOnlyLock }}>
      {children}
    </ScrollLockContext.Provider>
  );
};
