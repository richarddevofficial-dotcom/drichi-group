import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import Link from "next/link";
import { services } from "@/lib/data/services";
import CTABanner from "@/components/home/CTABanner";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServiceDetailPage({ params }) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const IconComponent = service.iconComponent;

  return (
    <>
      <section className="bg-brand-blue pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Link
            href="/services"
            className="mb-6 inline-flex items-center gap-2 text-sm text-brand-gray-400 hover:text-brand-orange transition-colors"
          >
            ← Back to Services
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="rounded-xl bg-brand-orange/20 p-4 text-brand-orange">
              <IconComponent size={40} />
            </div>
            <h1 className="text-4xl font-extrabold text-white md:text-5xl">
              {service.title}
            </h1>
          </div>
          <p className="max-w-3xl text-lg leading-relaxed text-brand-gray-400">
            {service.description}
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-brand-gray-600 mb-6">
                Service Overview
              </h2>
              <p className="leading-relaxed text-brand-gray-500 mb-8">
                {service.description}
              </p>

              <h3 className="text-xl font-bold text-brand-gray-600 mb-4">
                Key Features
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                {service.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-lg bg-brand-gray-50 p-4"
                  >
                    <Check className="h-5 w-5 shrink-0 text-green-500" />
                    <span className="text-brand-gray-500">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl bg-brand-blue p-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  Interested?
                </h3>
                <p className="text-brand-gray-400 mb-6">
                  Let's discuss how we can implement this solution for your
                  organization.
                </p>
                <Link
                  href="/contact"
                  className="block w-full rounded-lg bg-brand-orange px-5 py-3 text-center font-semibold text-white hover:bg-brand-orange-600 transition-all"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
