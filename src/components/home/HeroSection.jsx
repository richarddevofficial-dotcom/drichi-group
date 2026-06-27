"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Play } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export default function HeroSection() {
  const highlights = [
    { value: "4", label: "Services Offered" },
    { value: "2", label: "Ready Products" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-white">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-gray-50 via-white to-brand-orange/5" />
      <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-brand-orange/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-brand-blue/5 blur-3xl sm:h-80 sm:w-80" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:py-28 lg:py-32 lg:px-8">
        <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center rounded-full bg-brand-orange/10 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-brand-orange">
              <span className="mr-2 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-500 animate-pulse" />
              Available for Projects
            </span>

            <h1 className="mt-4 sm:mt-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight text-brand-gray-600">
              We Design, Develop, and Deliver{" "}
              <span className="text-brand-orange">
                Powerful Digital Solutions
              </span>
            </h1>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-brand-gray-400">
              {SITE_CONFIG.description}
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-orange px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white transition-all hover:bg-brand-orange-600 shadow-lg shadow-brand-orange/25"
              >
                Request a Quote
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-brand-gray-200 px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-brand-gray-600 transition-all hover:bg-brand-gray-50 hover:border-brand-orange hover:text-brand-orange"
              >
                <Briefcase size={18} />
                View Portfolio
              </Link>
            </div>

            {/* Highlights */}
            <div className="mt-8 sm:mt-12 flex gap-4 sm:gap-8 border-t border-brand-gray-200 pt-6 sm:pt-8">
              {highlights.map((item) => (
                <div key={item.label}>
                  <div className="text-xl sm:text-2xl font-bold text-brand-gray-600">
                    {item.value}
                  </div>
                  <div className="text-xs sm:text-sm text-brand-gray-400">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Visual (hidden on mobile) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="rounded-2xl border border-brand-gray-200 bg-white p-4 sm:p-6 shadow-xl">
              <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-gradient-to-br from-brand-orange/10 to-brand-blue/5">
                <Play className="h-12 w-12 sm:h-16 sm:w-16 text-brand-orange/40" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
