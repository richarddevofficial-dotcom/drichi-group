import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="bg-brand-orange py-16">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Ready to Transform Your Business?
        </h2>
        <p className="mt-4 text-lg text-white/80">
          Let's discuss your project and build something great together.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-brand-orange transition-all hover:bg-brand-gray-50"
          >
            Get Started Today
            <ArrowRight size={20} />
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10"
          >
            View Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}
