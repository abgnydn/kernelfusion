import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://kernelfusion.dev"),
  alternates: { canonical: "/" },
  title: "Kernel Fusion — GPU frameworks waste 92% or more of their time. I fixed it.",
  description: "Real-world kernel fusion (medians): 71× on Apple Silicon, 56× on NVIDIA, 20× on phones. 92 unique devices, 7 GPU vendors. Two published preprints. Zero install — runs in any browser.",
  keywords: [
    "kernel fusion", "WebGPU", "GPU computing", "transformer inference",
    "compute shaders", "WGSL", "browser AI", "LLM inference",
  ],
  openGraph: {
    title: "Kernel Fusion — GPU frameworks waste 92% or more of their time. I fixed it.",
    description: "71× median Apple Silicon, 56× NVIDIA, 20× phones. 92 unique devices. Two preprints. Zero install.",
    type: "website",
    url: "https://kernelfusion.dev",
    siteName: "Kernel Fusion",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Kernel Fusion — 71× median Apple Silicon, 56× NVIDIA, 20× phones, 92 devices" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kernel Fusion — GPU frameworks waste 92% or more of their time",
    description: "71× median Apple Silicon, 56× NVIDIA, 20× phones. 92 unique devices. Zero install.",
    images: ["/og.png"],
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
      "description": "Single-kernel fusion for GPU workloads. 71× median on Apple Silicon, 56× on NVIDIA, 20× on phones. 92 unique devices across 7 GPU vendors.",
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
        "https://barisgunaydin.com",
        "https://kernelfusion.dev",
        "https://gpubench.dev",
        "https://zerotvm.com",
        "https://webgpudna.com",
        "https://neuropulse.live",
        "https://markview.ai",
        "https://safenpm.dev",
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
      <body className={`${inter.className} min-h-screen`}>{children}</body>
    </html>
  );
}
