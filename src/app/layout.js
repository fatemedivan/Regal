import "./globals.css";
import Layout from "@/components/common/Layout";

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
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
