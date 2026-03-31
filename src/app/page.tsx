import { LINKS } from "@/lib/constants";

const papers = [
  {
    status: "published",
    title: "Single-Kernel Fusion for Sequential Fitness Evaluation",
    subtitle: "via WebGPU Compute Shaders",
    results: [
      { number: "720\u00D7", label: "CUDA over PyTorch (same T4)" },
      { number: "159\u00D7", label: "WebGPU over PyTorch (same M2)" },
      { number: "4", label: "GPU APIs confirmed" },
    ],
    description: "Fusing sequential fitness evaluations into single GPU dispatches eliminates per-step kernel launch overhead. Proven across CUDA, WebGPU, JAX/XLA, and Triton on two hardware platforms.",
    links: [
      { label: "Preprint", href: LINKS.ecPaper },
      { label: "Code", href: LINKS.ecRepo },
      { label: "Benchmarks", href: LINKS.bench },
    ],
  },
  {
    status: "published",
    title: "Single-Kernel Fusion for Autoregressive Transformer Decoding",
    subtitle: "via WebGPU Compute Shaders",
    results: [
      { number: "458\u00D7", label: "parallel kernel vs unfused (D=256)" },
      { number: "161\u00D7", label: "over PyTorch MPS (D=32)" },
      { number: "16K", label: "tokens/sec in the browser" },
    ],
    description: "Browser LLM engines dispatch 1,024 separate GPU kernels per generation. We fuse everything into one dispatch. Single-threaded: 6.6-13.5\u00D7. Parallel kernel (64 threads + shared memory): 66-458\u00D7. Beats PyTorch MPS by 7.5-161\u00D7 at all tested sizes up to D=256. 16,410 tok/s at D=32.",
    links: [
      { label: "Preprint", href: LINKS.transformerPaper },
      { label: "Code", href: LINKS.transformerRepo },
      { label: "Benchmarks", href: LINKS.bench },
    ],
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,158,11,0.05)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(34,211,238,0.03)_0%,_transparent_50%)]" />
      </div>

      {/* Header */}
      <header className="max-w-4xl mx-auto px-6 pt-20 pb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
          GPU frameworks waste{" "}
          <span className="bg-gradient-to-r from-kf-accent to-orange-300 bg-clip-text text-transparent">92%</span>
          {" "}of their time.
          <br />
          <span className="text-kf-muted text-3xl md:text-4xl font-bold">We fixed it.</span>
        </h1>
        <p className="text-lg text-kf-muted max-w-2xl mx-auto mb-8">
          Kernel fusion eliminates per-dispatch overhead by packing entire computations into
          single GPU instructions. We proved it across evolutionary algorithms and transformer
          inference — with up to 720&times; speedup. Zero installation. Any browser.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href={LINKS.bench} className="btn-primary">Test your GPU</a>
          <a href="#research" className="btn-secondary">See the research</a>
        </div>
      </header>

      {/* The core insight */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">The insight</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-kf-muted mb-3 font-medium uppercase tracking-wider">How frameworks work</p>
              <div className="bg-kf-bg rounded-lg p-4 font-mono text-xs text-kf-muted leading-relaxed">
                <p className="text-kf-red">dispatch</p> step 1 → <span className="text-kf-muted/50">wait</span> → <span className="text-kf-red">dispatch</span> step 2 → <span className="text-kf-muted/50">wait</span>
                <p className="mt-1">... &times; 1,500 steps = 22,500 round-trips</p>
                <p className="mt-2 text-kf-red">92% of time = waiting, not computing</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-kf-muted mb-3 font-medium uppercase tracking-wider">Kernel fusion</p>
              <div className="bg-kf-bg rounded-lg p-4 font-mono text-xs text-kf-muted leading-relaxed">
                <p className="text-kf-green">dispatch once</p> → GPU loops internally
                <p className="mt-1">1,500 steps in 1 round-trip</p>
                <p className="mt-2 text-kf-green">100% of time = computing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research papers */}
      <section id="research" className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-kf-border" />
          <span className="text-xs text-kf-muted font-medium uppercase tracking-widest">Research</span>
          <div className="flex-1 h-px bg-kf-border" />
        </div>

        <div className="space-y-8">
          {papers.map((paper) => (
            <div key={paper.title} className="card">
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  paper.status === "published"
                    ? "bg-kf-green/10 text-kf-green"
                    : "bg-kf-accent/10 text-kf-accent"
                }`}>
                  {paper.status === "published" ? "Published" : "New"}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-1">{paper.title}</h3>
              <p className="text-sm text-kf-muted mb-4">{paper.subtitle}</p>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {paper.results.map((r) => (
                  <div key={r.label} className="bg-kf-bg rounded-lg p-3 text-center">
                    <div className="text-2xl font-extrabold text-kf-accent">{r.number}</div>
                    <div className="text-[10px] text-kf-muted mt-1">{r.label}</div>
                  </div>
                ))}
              </div>

              <p className="text-sm text-kf-muted leading-relaxed mb-4">{paper.description}</p>

              <div className="flex gap-2">
                {paper.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href || "#"}
                    className={`text-xs font-medium px-3 py-1.5 rounded-md transition ${
                      link.href
                        ? "bg-kf-accent/10 text-kf-accent hover:bg-kf-accent/20"
                        : "bg-kf-border/50 text-kf-muted cursor-not-allowed"
                    }`}
                  >
                    {link.label} {!link.href && "(soon)"}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who is behind this */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="card text-center">
          <h2 className="text-xl font-bold mb-3">Ahmet Baris Gunaydin</h2>
          <p className="text-sm text-kf-muted leading-relaxed max-w-lg mx-auto">
            Independent Researcher
          </p>
          <div className="flex gap-3 justify-center mt-4">
            <a href="https://github.com/abgnydn" className="btn-secondary text-xs">GitHub</a>
            <a href={LINKS.bench} className="btn-secondary text-xs">gpubench.dev</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-kf-border/50">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-kf-muted">
          <span className="font-semibold text-kf-text">kernelfusion.dev</span>
          <div className="flex gap-5">
            <a href={LINKS.bench} className="hover:text-kf-text transition">Benchmarks</a>
            <a href={LINKS.siteRepo} className="hover:text-kf-text transition">GitHub</a>
            <span>MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
