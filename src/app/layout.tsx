import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://kernelfusion.dev"),
  title: "Kernel Fusion — GPU frameworks waste 92% of their time. We fixed it.",
  description: "Hand-fused GPU kernels achieve 159-720x over PyTorch on sequential workloads. 6-14x on transformer inference. Zero install — runs in any browser.",
  openGraph: {
    title: "Kernel Fusion — GPU frameworks waste 92% of their time. We fixed it.",
    description: "159-720x over PyTorch. 6-14x on transformer inference. Proven across CUDA, WebGPU, JAX, and Triton.",
    type: "website",
    url: "https://kernelfusion.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kernel Fusion — GPU frameworks waste 92% of their time",
    description: "159-720x over PyTorch. 6-14x on transformers. Zero install.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>{children}</body>
    </html>
  );
}
