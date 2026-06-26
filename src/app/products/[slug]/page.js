import { notFound } from "next/navigation";
import { Check, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { products } from "@/lib/data/products";
import CTABanner from "@/components/home/CTABanner";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.id,
  }));
}

export default function ProductDetailPage({ params }) {
  const product = products.find((p) => p.id === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <section className="bg-navy pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Link
            href="/products"
            className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-orange transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Products
          </Link>
          <span className="inline-block rounded-full bg-orange/20 px-4 py-1 text-sm font-medium text-orange mb-4">
            {product.category}
          </span>
          <h1 className="text-4xl font-extrabold text-white md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-400">
            {product.description}
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-8 rounded-2xl bg-green-50 p-6 border border-green-100">
                <p className="text-lg font-semibold text-green-700">
                  ⚡ {product.benefit}
                </p>
              </div>

              <h2 className="text-2xl font-bold text-navy mb-6">Features</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {product.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-lg bg-gray-50 p-4"
                  >
                    <Check className="h-5 w-5 shrink-0 text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl bg-navy p-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  Get This Product
                </h3>
                <p className="text-gray-400 mb-6">
                  Ready to deploy this solution? Let's discuss customization for
                  your needs.
                </p>
                <Link
                  href="/contact"
                  className="block w-full rounded-lg bg-orange px-5 py-3 text-center font-semibold text-white hover:bg-orange-600 transition-all"
                >
                  Request Demo
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
