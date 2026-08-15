import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://kernelfusion.dev"),
  alternates: { canonical: "/" },
  title: "Kernel Fusion — sequential GPU dispatch chains collapsed into one dispatch",
  description: "Single-kernel fusion for WebGPU: a whole sequential dispatch chain — transformer decode, evolutionary fitness loops — collapsed into one compute-shader dispatch. Two DOI-archived preprints and an npm SDK. Zero install, runs in any browser.",
  keywords: [
    "kernel fusion", "WebGPU", "GPU computing", "transformer inference",
    "compute shaders", "WGSL", "browser AI", "LLM inference",
  ],
  openGraph: {
    title: "Kernel Fusion — single-dispatch fusion for WebGPU",
    description: "Sequential GPU dispatch chains collapsed into one dispatch. Two DOI-archived preprints, one npm SDK. Zero install.",
    type: "website",
    url: "https://kernelfusion.dev",
    siteName: "Kernel Fusion",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Kernel Fusion — single-dispatch fusion for WebGPU" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kernel Fusion — single-dispatch fusion for WebGPU",
    description: "Sequential GPU dispatch chains collapsed into one dispatch. Two DOI-archived preprints, one npm SDK. Zero install.",
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
      "description": "Single-dispatch kernel fusion for WebGPU. A whole sequential dispatch chain — transformer decode, evolutionary fitness loops — collapsed into one compute-shader dispatch, with two DOI-archived preprints and an npm SDK.",
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
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
