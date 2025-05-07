import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { ScrollLockContextProvider } from "@/context/ScrollLockContext";

export const metadata = {
  title: "Regal",
  icons: {
    icon: "/img/logo-footer.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body className="font-yekan-bakh font-normal">
        <ScrollLockContextProvider>
          <Navbar />
          {children}
          <Footer />
        </ScrollLockContextProvider>
      </body>
    </html>
  );
}
