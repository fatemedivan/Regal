
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";



export const metadata = {
  title: "Regal",
  icons:{
    icon: "/img/logo-footer.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body className="font-yekan-bakh">
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
