import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { portfolioItems } from "@/lib/data/portfolio";
import CTABanner from "@/components/home/CTABanner";

export function generateStaticParams() {
  return portfolioItems.map((item) => ({
    slug: item.slug,
  }));
}

export default function PortfolioDetailPage({ params }) {
  const project = portfolioItems.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <section className="bg-brand-blue pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Link
            href="/portfolio"
            className="mb-6 inline-flex items-center gap-2 text-sm text-brand-gray-400 hover:text-brand-orange transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
          <span className="inline-block rounded-full bg-brand-orange/20 px-4 py-1 text-sm font-medium text-brand-orange mb-4">
            {project.category}
          </span>
          <h1 className="text-4xl font-extrabold text-white md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-2 text-lg text-brand-gray-400">
            Client: {project.client}
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 aspect-video rounded-2xl bg-brand-gray-100 flex items-center justify-center">
            <ExternalLink size={64} className="text-brand-gray-400" />
          </div>

          <p className="text-lg leading-relaxed text-brand-gray-500 mb-8">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-brand-orange/10 px-3 py-1 text-sm font-medium text-brand-orange"
              >
                {tag}
              </span>
            ))}
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-6 py-3 font-semibold text-white hover:bg-brand-orange-600 transition-all"
          >
            Want a Similar Project?
          </Link>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
