import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://kernelfusion.dev"),
  title: "Kernel Fusion — GPU frameworks waste 92% or more of their time. I fixed it.",
  description: "Real-world kernel fusion: 4,081× on Apple Silicon, 826× on phones, 70× on NVIDIA. 487 devices tested. Two published preprints. Zero install — runs in any browser.",
  keywords: [
    "kernel fusion", "WebGPU", "GPU computing", "transformer inference",
    "compute shaders", "WGSL", "browser AI", "LLM inference",
  ],
  openGraph: {
    title: "Kernel Fusion — GPU frameworks waste 92% or more of their time. I fixed it.",
    description: "4,081× on Apple Silicon, 826× on phones. 487 devices tested. Two preprints. Zero install.",
    type: "website",
    url: "https://kernelfusion.dev",
    siteName: "Kernel Fusion",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Kernel Fusion — 4,081× Apple Silicon, 826× phones, 487 devices" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kernel Fusion — GPU frameworks waste 92% or more of their time",
    description: "4,081× Apple Silicon, 826× phones. 487 devices tested. Zero install.",
    images: ["/og.svg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://kernelfusion.dev#app",
      "name": "Kernel Fusion",
      "url": "https://kernelfusion.dev",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Any (WebGPU browser)",
      "description": "Single-kernel fusion for GPU workloads. 4,081× on Apple Silicon, 826× on phones. 487 devices tested.",
      "author": { "@id": "https://kernelfusion.dev#author" },
      "isPartOf": {
        "@type": "CreativeWork",
        "name": "Kernel-fusion research line",
        "url": "https://kernelfusion.dev"
      }
    },
    {
      "@type": "Person",
      "@id": "https://kernelfusion.dev#author",
      "name": "Ahmet Baris Gunaydin",
      "url": "https://kernelfusion.dev",
      "sameAs": [
        "https://kernelfusion.dev",
        "https://gpubench.dev",
        "https://zerotvm.com",
        "https://webgpu-dna.vercel.app",
        "https://github.com/abgnydn",
        "https://www.linkedin.com/in/abgnydn/"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://kernelfusion.dev#site",
      "url": "https://kernelfusion.dev",
      "name": "kernelfusion.dev",
      "publisher": { "@id": "https://kernelfusion.dev#author" }
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} min-h-screen`}>{children}<Analytics /></body>
    </html>
  );
}
