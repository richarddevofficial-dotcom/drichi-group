import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { services } from "@/lib/data/services";
import CTABanner from "@/components/home/CTABanner";

export const metadata = {
  title: "Our Services - Drichi Group | Software & Digital Solutions",
  description:
    "End-to-end digital services including website development, mobile apps, pharmacy management, school management, e-commerce, hospital systems, and IT consultancy.",
  keywords:
    "website development, mobile app development, pharmacy management system, school management system, e-commerce solutions, hospital management, IT consultancy Uganda",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-brand-blue pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-orange">
            Our Services
          </span>
          <h1 className="mt-4 text-4xl font-extrabold text-white md:text-5xl">
            End-to-End Digital Services
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-brand-gray-400">
            From a single landing page to a complex, integrated management
            system, we build it all with precision and passion.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-16">
            {services.map((service, index) => {
              const IconComponent = service.iconComponent;
              return (
                <div
                  key={service.slug}
                  className={`grid gap-8 items-center lg:grid-cols-2 ${
                    index % 2 === 1 ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                    <div className="mb-4 inline-flex rounded-xl bg-brand-orange/10 p-4 text-brand-orange">
                      <IconComponent size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-brand-gray-600">
                      {service.title}
                    </h2>
                    <p className="mt-4 leading-relaxed text-brand-gray-500">
                      {service.description}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-3 text-brand-gray-500"
                        >
                          <span className="h-2 w-2 rounded-full bg-brand-orange" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-orange px-5 py-2.5 font-semibold text-white hover:bg-brand-orange-600 transition-all"
                    >
                      Learn More
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                  <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                    <div className="rounded-2xl bg-brand-gray-100 aspect-video flex items-center justify-center">
                      <IconComponent
                        size={64}
                        className="text-brand-gray-400"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
