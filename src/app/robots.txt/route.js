const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://drichigroup.com";

export async function GET() {
  const robots = `# Drichi Group Robots.txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: ${BASE_URL}/sitemap.xml`;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
