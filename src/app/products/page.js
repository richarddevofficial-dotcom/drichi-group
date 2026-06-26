import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { products } from "@/lib/data/products";
import CTABanner from "@/components/home/CTABanner";

export default function ProductsPage() {
  return (
    <>
      <section className="bg-navy pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-wider text-orange">
            Our Products
          </span>
          <h1 className="mt-4 text-4xl font-extrabold text-white md:text-5xl">
            Ready-to-Deploy Systems
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-400">
            Accelerate your digital journey with our pre-built, battle-tested
            software products. Each designed for deep functionality and ready to
            configure.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col rounded-2xl bg-white p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <span className="mb-4 inline-block w-fit rounded-full bg-blue/10 px-3 py-1 text-xs font-semibold text-blue">
                  {product.category}
                </span>
                <h3 className="text-xl font-bold text-navy mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {product.description}
                </p>

                <div className="mb-6 rounded-lg bg-green-50 p-4 border border-green-100">
                  <p className="text-sm font-semibold text-green-700">
                    ⚡ {product.benefit}
                  </p>
                </div>

                <ul className="mb-6 flex-1 space-y-2">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0 text-green-500"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/products/${product.id}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-all"
                >
                  View Details
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
