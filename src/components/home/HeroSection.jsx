"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

// Variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.35,
      delayChildren: 0.4,
    },
  },
};

const stepVariants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12,
    },
  },
};

const textVariants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const badgeVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3,
      duration: 0.5,
    },
  },
};

export default function HeroSection() {
  const highlights = [
    { value: "8", label: "Services Offered" },
    { value: "6", label: "Ready Products" },
    { value: "24/7", label: "Support" },
  ];

  const steps = [
    {
      step: "01",
      title: "Plan",
      desc: "Requirements & Strategy",
      color: "bg-brand-orange",
    },
    {
      step: "02",
      title: "Design",
      desc: "UI/UX & Prototyping",
      color: "bg-orange-400",
    },
    {
      step: "03",
      title: "Build",
      desc: "Development & Testing",
      color: "bg-brand-blue",
    },
    {
      step: "04",
      title: "Launch",
      desc: "Deploy & Support",
      color: "bg-green-500",
    },
  ];

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-white">
      {/* Animated Background Blobs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-brand-orange/10 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-brand-blue/5 blur-3xl"
      />

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

          {/* Right - Animated Development Process */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="rounded-2xl border border-brand-gray-200 bg-white p-6 sm:p-8 shadow-xl relative">
              {/* Animated Vertical Line */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                style={{ originY: 0 }}
                className="absolute left-[44px] top-[80px] bottom-[30px] w-0.5 bg-brand-gray-200"
              />

              <h3 className="text-sm font-semibold text-brand-gray-500 mb-6 text-center uppercase tracking-wider">
                Our Development Process
              </h3>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {steps.map((item) => (
                  <motion.div
                    key={item.step}
                    variants={stepVariants}
                    whileHover={{
                      x: 8,
                      scale: 1.03,
                      boxShadow: "0 15px 40px rgba(0,0,0,.08)",
                    }}
                    className="flex items-center gap-4 relative z-10 rounded-lg transition-shadow"
                  >
                    {/* Animated Circle */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 250,
                        damping: 14,
                      }}
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        y: {
                          duration: 2 + Math.random(),
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }}
                      className={`h-10 w-10 rounded-full ${item.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg`}
                    >
                      {item.step}
                    </motion.div>

                    {/* Text Box */}
                    <motion.div
                      variants={textVariants}
                      className="bg-brand-gray-50 rounded-lg px-4 py-2 flex-1"
                    >
                      <p className="font-semibold text-brand-gray-600 text-sm">
                        {item.title}
                      </p>
                      <p className="text-xs text-brand-gray-400">{item.desc}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Animated Badge */}
              <motion.div
                variants={badgeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-6 text-center"
              >
                <span className="inline-block rounded-full bg-brand-orange/10 px-4 py-1.5 text-xs font-semibold text-brand-orange">
                  From Idea to Launch in 4 Steps
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
