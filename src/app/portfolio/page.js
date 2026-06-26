import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { portfolioItems } from "@/lib/data/portfolio";
import CTABanner from "@/components/home/CTABanner";

export default function PortfolioPage() {
  return (
    <>
      <section className="bg-navy pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-wider text-orange">
            Our Work
          </span>
          <h1 className="mt-4 text-4xl font-extrabold text-white md:text-5xl">
            Our Work Speaks Volumes
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-400">
            We don't just deliver projects; we forge success stories. Explore a
            selection of our recent work.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.map((item) => (
              <Link
                key={item.id}
                href={`/portfolio/${item.slug}`}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all"
              >
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  <ExternalLink
                    size={48}
                    className="text-gray-400 group-hover:text-blue transition-colors"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-orange uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-navy group-hover:text-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue">
                    View Project
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
