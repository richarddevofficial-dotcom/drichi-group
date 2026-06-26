"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";

const technologies = [
  {
    category: "Frontend",
    tools: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React.js",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  { category: "Backend", tools: ["Node.js", "Express", "Python", "Django"] },
  {
    category: "Databases",
    tools: ["PostgreSQL", "MySQL", "MongoDB", "Firebase"],
  },
  { category: "Mobile", tools: ["Android", "React Native", "Flutter"] },
  { category: "DevOps", tools: ["Docker", "Jenkins", "Git", "GitHub"] },
];

export default function TechStack() {
  return (
    <section className="section-padding bg-brand-gray-50">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          subtitle="Technologies"
          title="Powered by a Modern Stack"
          description="We use cutting-edge technologies to build fast, secure, and scalable solutions."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <h3 className="mb-4 text-lg font-bold text-brand-blue">
                {tech.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tech.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-md bg-brand-orange/10 px-3 py-1 text-sm font-medium text-brand-orange"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
