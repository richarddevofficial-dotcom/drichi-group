"use client";

import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import AdminShortcut from "@/components/layout/AdminShortcut";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <head>
        <title>Drichi Group - Transforming Ideas into Digital Solutions</title>
        <meta
          name="description"
          content="We Design, Develop, and Deliver Powerful Digital Solutions for Businesses, Schools, Pharmacies, Hospitals, and Organizations."
        />
      </head>
      <body
        className={
          isAdminRoute ? "bg-brand-gray-50" : "flex min-h-screen flex-col"
        }
      >
        {!isAdminRoute && <Navbar />}
        <main className={!isAdminRoute ? "flex-1" : ""}>{children}</main>
        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <ScrollToTop />}
        {!isAdminRoute && <AdminShortcut />}
      </body>
    </html>
  );
}
