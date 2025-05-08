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
//AI
export const ScrollLockContextProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOnlyLock, setMobileOnlyLock] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 1024);
  }, []);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ScrollLockContext.Provider
      value={{ isModalOpen, openModal, closeModal, setMobileOnlyLock }}
    >
      <body
        className={`font-yekan-bakh font-normal ${
          isModalOpen && (!mobileOnlyLock || (mobileOnlyLock && isMobile))
            ? "overflow-y-hidden"
            : ""
        }`}
      >
        {children}
      </body>
    </ScrollLockContext.Provider>
  );
};
