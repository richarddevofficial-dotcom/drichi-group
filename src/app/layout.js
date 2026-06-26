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
          content="We Design, Develop, and Deliver Powerful Digital Solutions for Businesses, Schools, Pharmacies, Hospitals, and Organizations across Africa."
        />
        <meta
          name="keywords"
          content="software development, web development, pharmacy management system, school management system, e-commerce solutions, mobile app development, Uganda, Africa, Drichi Group"
        />
        <meta name="author" content="Drichi Group" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Social Media */}
        <meta
          property="og:title"
          content="Drichi Group - Transforming Ideas into Digital Solutions"
        />
        <meta
          property="og:description"
          content="We Design, Develop, and Deliver Powerful Digital Solutions for Businesses, Schools, Pharmacies, Hospitals, and Organizations."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://drichigroup.com" />
        <meta property="og:site_name" content="Drichi Group" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Drichi Group - Transforming Ideas into Digital Solutions"
        />
        <meta
          name="twitter:description"
          content="We Design, Develop, and Deliver Powerful Digital Solutions for Businesses, Schools, Pharmacies, Hospitals, and Organizations."
        />

        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://drichigroup.com" />
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
