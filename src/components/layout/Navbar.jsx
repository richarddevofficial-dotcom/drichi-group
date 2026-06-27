"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import Logo from "@/components/layout/Logo";

const overlayVariants = {
  closed: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  open: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const menuVariants = {
  closed: {
    x: "100%",
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
  open: {
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  closed: { opacity: 0, x: 40, transition: { duration: 0.2 } },
  open: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: "Home", href: "/", icon: "🏠" },
    { label: "About", href: "/about", icon: "ℹ️" },
    { label: "Services", href: "/services", icon: "⚡" },
    { label: "Products", href: "/products", icon: "📦" },
    { label: "Portfolio", href: "/portfolio", icon: "💼" },
    { label: "Contact", href: "/contact", icon: "💬" },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "bg-brand-blue/95 backdrop-blur-xl shadow-2xl py-2"
          : "bg-white/80 backdrop-blur-xl py-4 shadow-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-8">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-semibold transition-colors hover:text-brand-orange whitespace-nowrap group ${
                isScrolled ? "text-gray-300" : "text-brand-gray-600"
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-brand-orange transition-all group-hover:w-full" />
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-xl bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-orange-600 shadow-lg shadow-brand-orange/25 hover:shadow-xl hover:shadow-brand-orange/30 active:scale-95"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden relative z-50 p-2.5 rounded-xl transition-all ${
            isMobileMenuOpen
              ? "text-white bg-brand-blue"
              : isScrolled
                ? "text-white hover:bg-white/10"
                : "text-brand-gray-600 hover:bg-brand-gray-100"
          }`}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <Menu size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Pro Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Animated Background */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute inset-0 bg-gradient-to-br from-brand-orange via-orange-500 to-brand-orange-600"
            >
              {/* Floating orbs */}
              <motion.div
                animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-32 -right-20 h-80 w-80 rounded-full bg-white/5 blur-3xl"
              />
              <motion.div
                animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-brand-blue/10 blur-3xl"
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full px-6 pt-28 pb-8">
                {/* Top Label */}
                <motion.p
                  variants={itemVariants}
                  className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-8"
                >
                  Menu
                </motion.p>

                {/* Navigation Cards */}
                <div className="flex-1 flex flex-col gap-3">
                  {navItems.map((link) => (
                    <motion.div key={link.href} variants={itemVariants}>
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="group flex items-center gap-5 rounded-2xl bg-brand-blue/30 backdrop-blur-md border border-white/10 px-6 py-5 text-lg font-semibold text-white transition-all duration-300 hover:bg-brand-blue/50 hover:border-brand-orange/40 hover:shadow-2xl hover:-translate-x-1"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lg group-hover:bg-brand-orange group-hover:scale-110 transition-all duration-300">
                          {link.icon}
                        </span>
                        <span className="flex-1">{link.label}</span>
                        <ArrowRight
                          size={18}
                          className="text-white/30 group-hover:text-brand-orange group-hover:translate-x-1 transition-all duration-300"
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Section */}
                <motion.div variants={itemVariants} className="space-y-4 mt-6">
                  {/* Contact Button */}
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-base font-semibold text-brand-orange shadow-2xl hover:bg-gray-100 transition-all active:scale-95"
                  >
                    Get in Touch
                    <ArrowRight size={18} />
                  </Link>

                  {/* Location Badge */}
                  <div className="flex items-center justify-center gap-2 text-white/40 text-xs">
                    <MapPin size={12} />
                    <span>South Sudan</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
