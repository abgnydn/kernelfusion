import type { MetadataRoute } from "next";

// Required by Next.js when `output: 'export'` is set.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://kernelfusion.dev/sitemap.xml",
    host: "https://kernelfusion.dev",
  };
}
