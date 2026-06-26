"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Heart,
  Zap,
  Code,
  Users,
  Settings,
  CheckCircle,
} from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const reasons = [
  {
    icon: Users,
    title: "Experienced & Agile Team",
    description:
      "Seasoned engineers with the fresh perspective of an agile startup.",
  },
  {
    icon: Heart,
    title: "Affordable Excellence",
    description:
      "High-quality solutions priced fairly without bloated corporate overhead.",
  },
  {
    icon: Shield,
    title: "Security-First Architecture",
    description:
      "Your data's integrity is non-negotiable. Security ingrained, not bolted on.",
  },
  {
    icon: Zap,
    title: "Truly Responsive Design",
    description:
      "Flawless functionality on phone, tablet, or desktop, everywhere.",
  },
  {
    icon: Settings,
    title: "Partnership-Driven Support",
    description:
      "Our relationship doesn't end at launch. Ongoing support and improvements.",
  },
  {
    icon: Code,
    title: "Custom-Made Solutions",
    description:
      "Solutions uniquely yours, exactly fitting your workflow and needs.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-brand-gray-50">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          subtitle="Why Choose Us"
          title="The Drichi Group Advantage"
          description="We don't just deliver projects; we forge long-term partnerships built on trust and excellence."
        />

        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl bg-white p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-brand-gray-100 hover:border-brand-orange/30"
              >
                {/* Orange accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-brand-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon */}
                <div className="mb-5 inline-flex rounded-xl bg-brand-orange/10 p-3.5 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                  <IconComponent size={24} />
                </div>

                {/* Title */}
                <h3 className="mb-3 text-lg sm:text-xl font-bold text-brand-gray-600 group-hover:text-brand-orange transition-colors">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-brand-gray-400">
                  {reason.description}
                </p>

                {/* Check indicator */}
                <div className="mt-5 flex items-center gap-2 text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <CheckCircle size={16} />
                  <span className="text-xs font-semibold">Learn More</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
