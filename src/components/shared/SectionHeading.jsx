"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  subtitle,
  title,
  description,
  centered = true,
  light = false,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-16 ${centered ? "text-center" : ""}`}
    >
      {subtitle && (
        <span
          className={`inline-block text-sm font-semibold uppercase tracking-wider text-brand-orange`}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={`mt-3 text-3xl font-bold md:text-4xl lg:text-5xl ${light ? "text-white" : "text-brand-blue"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 max-w-2xl text-lg leading-relaxed ${centered ? "mx-auto" : ""} ${light ? "text-brand-gray-400" : "text-brand-gray-500"}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
