import { ArrowRight, FolderOpen } from "lucide-react";
import Link from "next/link";
import CTABanner from "@/components/home/CTABanner";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Portfolio - Drichi Group | Our Work & Projects",
  description: "Explore our portfolio of successful projects.",
  keywords: "portfolio, projects, software, South Sudan",
};

async function getPortfolio() {
  try {
    const res = await fetch("https://drichigroup.com/api/portfolio", {
      cache: "no-store",
    });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    return [];
  }
}

export default async function PortfolioPage() {
  const portfolioItems = await getPortfolio();

  return (
    <>
      <section className="bg-brand-blue pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-orange">
            Our Work
          </span>
          <h1 className="mt-4 text-4xl font-extrabold text-white md:text-5xl">
            Our Work Speaks Volumes
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-brand-gray-400">
            We don't just deliver projects; we forge success stories.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl">
          {portfolioItems.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {portfolioItems.map((item) => (
                <div
                  key={item.id}
                  className="group overflow-hidden rounded-2xl border border-brand-gray-200 bg-white shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="aspect-video bg-brand-gray-100 flex items-center justify-center">
                    <FolderOpen
                      size={48}
                      className="text-brand-gray-400 group-hover:text-brand-orange transition-colors"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold text-brand-orange uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-brand-gray-600">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-gray-500 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-brand-gray-100 px-2 py-1 text-xs font-medium text-brand-gray-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {item.url && item.url !== "#" && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-orange hover:text-brand-orange-600"
                      >
                        View Project
                        <ArrowRight size={16} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FolderOpen
                size={64}
                className="mx-auto text-brand-gray-300 mb-6"
              />
              <h3 className="text-2xl font-bold text-brand-gray-600 mb-3">
                Portfolio Coming Soon
              </h3>
              <p className="text-brand-gray-400 max-w-md mx-auto mb-8">
                We're working on showcasing our amazing projects.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-6 py-3 font-semibold text-white hover:bg-brand-orange-600 transition-all"
              >
                Contact Us
                <ArrowRight size={18} />
              </Link>
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
