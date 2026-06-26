"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Package } from "lucide-react";
import Link from "next/link";
import { products } from "@/lib/data/products";
import SectionHeading from "@/components/shared/SectionHeading";

export default function ProductsShowcase() {
  return (
    <section className="section-padding bg-brand-gray-50">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          subtitle="Our Products"
          title="Ready-to-Deploy Management Systems"
          description="Accelerate your digital journey with our suite of pre-built, battle-tested software products."
        />

        {products.length > 0 ? (
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="hover-lift flex flex-col rounded-xl sm:rounded-2xl bg-white p-5 sm:p-6 lg:p-8 shadow-sm"
              >
                <span className="mb-3 sm:mb-4 inline-block w-fit rounded-full bg-brand-orange/10 px-2.5 sm:px-3 py-0.5 sm:py-1 text-xs font-semibold text-brand-orange">
                  {product.category}
                </span>

                <h3 className="mb-2 text-lg sm:text-xl font-bold text-brand-gray-600">
                  {product.name}
                </h3>

                <p className="mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed text-brand-gray-500">
                  {product.description}
                </p>

                <div className="mb-4 sm:mb-6 rounded-lg bg-green-50 p-3 sm:p-4 border border-green-100">
                  <p className="text-xs sm:text-sm font-semibold text-green-700">
                    ⚡ {product.benefit}
                  </p>
                </div>

                <ul className="mb-4 sm:mb-6 flex-1 space-y-1.5 sm:space-y-2">
                  {product.features.slice(0, 4).map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-xs sm:text-sm text-brand-gray-500"
                    >
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0 text-green-500"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/products/${product.id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-orange px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white transition-all hover:bg-brand-orange-600"
                >
                  Learn More
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Package size={64} className="mx-auto text-brand-gray-300 mb-6" />
            <h3 className="text-2xl font-bold text-brand-gray-600 mb-3">
              Products Coming Soon
            </h3>
            <p className="text-brand-gray-400 max-w-md mx-auto">
              Our ready-to-deploy management systems will be listed here soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
