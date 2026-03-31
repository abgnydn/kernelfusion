import { LINKS } from "@/lib/constants";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,158,11,0.03)_0%,_transparent_50%)]" />
      </div>

      <div className="max-w-2xl mx-auto px-6 py-20">
        <a href="/" className="inline-flex items-center gap-1.5 text-sm text-kf-muted hover:text-kf-accent transition mb-12 group">
          <svg className="w-4 h-4 transition group-hover:-translate-x-0.5" viewBox="0 0 16 16" fill="none">
            <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </a>

        <h1 className="text-3xl font-bold tracking-tight mb-3">Privacy Policy</h1>
        <p className="text-kf-muted mb-12">
          Short version: we collect anonymous GPU benchmark stats. Nothing personal.
        </p>

        <div className="space-y-10">
          <section className="card">
            <h2 className="text-base font-semibold mb-3">What we collect</h2>
            <p className="text-sm text-kf-muted mb-3">When you run benchmarks, we save:</p>
            <ul className="space-y-2 text-sm text-kf-muted">
              {[
                "GPU adapter name, vendor, and architecture",
                "WebGPU device limits (buffer size, workgroup size)",
                "Benchmark throughput results and timing statistics",
                "Browser and OS (from user agent)",
                "Screen dimensions and device pixel ratio",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-kf-accent mt-0.5">&bull;</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="card border-kf-green/20">
            <h2 className="text-base font-semibold mb-3">What we do NOT collect</h2>
            <ul className="space-y-2 text-sm text-kf-muted">
              {[
                "Names, emails, or any personal identifiers",
                "IP addresses (not logged)",
                "Cookies or tracking pixels",
                "Location data",
                "Browsing history or data from other tabs",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-kf-green mt-0.5">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="card">
            <h2 className="text-base font-semibold mb-3">How we use the data</h2>
            <p className="text-sm text-kf-muted leading-relaxed">
              Collected data builds an aggregate picture of WebGPU compute and transformer inference
              performance across real-world hardware. We may publish aggregate statistics in research
              preprints or public reports. Individual submissions are never published or shared.
            </p>
          </section>

          <section className="card">
            <h2 className="text-base font-semibold mb-3">All computation is local</h2>
            <p className="text-sm text-kf-muted leading-relaxed">
              All benchmark shaders run entirely on your GPU inside your browser. No computation
              is offloaded to our servers. Only the final results are transmitted after benchmarks complete.
            </p>
          </section>

          <section className="card">
            <h2 className="text-base font-semibold mb-3">Data retention</h2>
            <p className="text-sm text-kf-muted leading-relaxed">
              Benchmark results are stored indefinitely as anonymous records. Because no personal
              information is attached, individual records cannot be identified or deleted.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-kf-border/50 flex items-center justify-between">
          <p className="text-xs text-kf-muted/50">Last updated: March 2026</p>
          <a href={LINKS.siteRepo} className="text-xs text-kf-accent/60 hover:text-kf-accent transition">
            Questions? GitHub &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
