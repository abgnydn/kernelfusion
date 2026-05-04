import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages (no API routes, no ISR, no SSR).
  output: "export",
  // CF Pages doesn't run Next's image optimizer — serve images as-is.
  images: { unoptimized: true },
  // Emit trailing-slash URLs (/why/ instead of /why.html) so CF Pages
  // serves them cleanly without rewrites.
  trailingSlash: true,
};

export default nextConfig;
