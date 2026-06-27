"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import Logo from "@/components/layout/Logo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-brand-blue/95 backdrop-blur-md shadow-lg py-2"
          : "bg-white/80 backdrop-blur-md py-4 shadow-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-brand-orange whitespace-nowrap ${
                isScrolled ? "text-gray-300" : "text-brand-gray-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-orange-600 whitespace-nowrap"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu Button - Dark when at top, white when scrolled */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            isScrolled
              ? "text-white hover:bg-white/10"
              : "text-brand-gray-600 hover:bg-brand-gray-100"
          }`}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay - Always dark background */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[56px] z-40 bg-brand-blue/98 backdrop-blur-md lg:hidden">
          <div className="flex flex-col space-y-1 px-4 pt-4 pb-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-4 py-3 text-base text-white transition-colors hover:bg-white/10 hover:text-brand-orange"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 block rounded-lg bg-brand-orange px-4 py-3 text-center text-base font-semibold text-white hover:bg-brand-orange-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
