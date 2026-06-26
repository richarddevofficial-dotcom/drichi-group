"use client";

import { motion } from "framer-motion";
import { ArrowRight, Wrench } from "lucide-react";
import Link from "next/link";
import { services } from "@/lib/data/services";
import SectionHeading from "@/components/shared/SectionHeading";

export default function ServicesGrid() {
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          subtitle="What We Do"
          title="End-to-End Digital Services"
          description="From a single landing page to a complex, integrated management system, we build it all with precision and passion."
        />

        {services.length > 0 ? (
          <>
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 6).map((service, index) => {
                const IconComponent = service.iconComponent;
                return (
                  <motion.div
                    key={service.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="hover-lift group rounded-xl sm:rounded-2xl border border-brand-gray-200 bg-white p-5 sm:p-6 lg:p-8 shadow-sm"
                  >
                    <div className="mb-4 sm:mb-6 inline-flex rounded-lg sm:rounded-xl bg-brand-orange/10 p-3 sm:p-4 text-brand-orange transition-all group-hover:bg-brand-orange group-hover:text-white">
                      <IconComponent size={24} className="sm:w-7 sm:h-7" />
                    </div>

                    <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-bold text-brand-gray-600 group-hover:text-brand-orange transition-colors">
                      {service.title}
                    </h3>

                    <p className="mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed text-brand-gray-500">
                      {service.description}
                    </p>

                    <ul className="mb-4 sm:mb-6 space-y-1.5 sm:space-y-2">
                      {service.features.slice(0, 3).map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-xs sm:text-sm text-brand-gray-400"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-orange flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-orange transition-colors hover:text-brand-orange-600"
                    >
                      Learn More
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 sm:mt-12 text-center">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white transition-all hover:bg-brand-blue-50"
              >
                View All Services
                <ArrowRight size={18} />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <Wrench size={64} className="mx-auto text-brand-gray-300 mb-6" />
            <h3 className="text-2xl font-bold text-brand-gray-600 mb-3">
              Services Coming Soon
            </h3>
            <p className="text-brand-gray-400 max-w-md mx-auto">
              We're updating our services list. Contact us to learn more about
              what we offer.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
