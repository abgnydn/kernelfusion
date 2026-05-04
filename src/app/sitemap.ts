import type { MetadataRoute } from "next";

// Required by Next.js when `output: 'export'` is set — forces the sitemap
// to be emitted at build time rather than treated as a dynamic route.
export const dynamic = "force-static";

const BASE = "https://kernelfusion.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/why`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
