import { services } from "@/lib/data/services";
import { products } from "@/lib/data/products";
import { portfolioItems } from "@/lib/data/portfolio";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://drichigroup.com";

export async function GET() {
  const staticPages = [
    { url: "", priority: "1.0", changefreq: "weekly" },
    { url: "about", priority: "0.8", changefreq: "monthly" },
    { url: "services", priority: "0.9", changefreq: "weekly" },
    { url: "products", priority: "0.9", changefreq: "weekly" },
    { url: "portfolio", priority: "0.8", changefreq: "weekly" },
    { url: "contact", priority: "0.7", changefreq: "monthly" },
  ];

  const servicePages = services.map((s) => ({
    url: `services/${s.slug}`,
    priority: "0.7",
    changefreq: "monthly",
  }));

  const productPages = products.map((p) => ({
    url: `products/${p.id}`,
    priority: "0.7",
    changefreq: "monthly",
  }));

  const portfolioPages = portfolioItems.map((p) => ({
    url: `portfolio/${p.slug}`,
    priority: "0.6",
    changefreq: "monthly",
  }));

  const allPages = [
    ...staticPages,
    ...servicePages,
    ...productPages,
    ...portfolioPages,
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${BASE_URL}/${page.url}</loc>
    <priority>${page.priority}</priority>
    <changefreq>${page.changefreq}</changefreq>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
