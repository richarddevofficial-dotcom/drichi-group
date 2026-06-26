"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data/testimonials";
import SectionHeading from "@/components/shared/SectionHeading";

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );

  const testimonial = testimonials[current];

  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-3xl lg:max-w-4xl px-4">
        <SectionHeading
          subtitle="Testimonials"
          title="Trusted by Leaders"
          description="Hear from the businesses and organizations we've helped transform."
        />

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl sm:rounded-2xl bg-brand-gray-50 p-6 sm:p-8 lg:p-12"
            >
              <Quote className="mb-3 sm:mb-4 h-8 w-8 sm:h-10 sm:w-10 text-brand-orange/30" />

              <p className="mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg leading-relaxed text-brand-gray-600">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-3 sm:gap-4">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange font-bold text-base sm:text-lg flex-shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-brand-blue text-sm sm:text-base">
                    {testimonial.name}
                  </p>
                  <p className="text-xs sm:text-sm text-brand-gray-400 truncate">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
                <div className="flex gap-0.5 sm:gap-1 flex-shrink-0">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-brand-orange text-brand-orange sm:w-4 sm:h-4"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 sm:mt-6 flex justify-center gap-3 sm:gap-4">
            <button
              onClick={prev}
              className="rounded-full border border-brand-gray-200 p-1.5 sm:p-2 text-brand-gray-500 hover:bg-brand-gray-100 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="rounded-full border border-brand-gray-200 p-1.5 sm:p-2 text-brand-gray-500 hover:bg-brand-gray-100 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="mt-3 sm:mt-4 flex justify-center gap-1.5 sm:gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-1.5 sm:h-2 rounded-full transition-all ${
                  index === current
                    ? "bg-brand-orange w-5 sm:w-6"
                    : "bg-brand-gray-200 w-1.5 sm:w-2"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
