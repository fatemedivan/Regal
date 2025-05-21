import NextTopLoader from "nextjs-toploader";
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
      <Layout>
         <NextTopLoader
          color="#29D"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #29D, 0 0 5px #29D"
        />
        {children}
        </Layout>
    </html>
  );
}
