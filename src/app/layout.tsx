import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://kernelfusion.dev"),
  title: "Kernel Fusion — GPU frameworks waste 92% of their time. I fixed it.",
  description: "Hand-fused GPU kernels achieve 720× on sequential compute and 458× on transformer inference over framework dispatch. Two published preprints. Zero install — runs in any browser.",
  keywords: [
    "kernel fusion", "WebGPU", "GPU computing", "transformer inference",
    "compute shaders", "WGSL", "browser AI", "LLM inference",
  ],
  openGraph: {
    title: "Kernel Fusion — GPU frameworks waste 92% of their time. I fixed it.",
    description: "720× on sequential compute. 458× on transformer inference. Two preprints. Zero install.",
    type: "website",
    url: "https://kernelfusion.dev",
    siteName: "Kernel Fusion",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Kernel Fusion — 720× sequential, 458× transformer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kernel Fusion — GPU frameworks waste 92% of their time",
    description: "720× sequential compute. 458× transformer inference. Zero install.",
    images: ["/og.svg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.className} min-h-screen`}>{children}</body>
    </html>
  );
}
