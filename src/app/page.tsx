import { LINKS } from "@/lib/constants";
import { LiveResults } from "@/components/live-results";

const demos = [
  {
    emoji: "🐦",
    title: "Flappy Evolution",
    description: "Watch 50 neural networks learn to play Flappy Bird in real-time. GPU evaluates 4,096 birds per dispatch via kernel fusion. Open in multiple tabs to connect via WebRTC and evolve together.",
    results: [
      { number: "4,096", label: "birds per GPU dispatch" },
      { number: "200+", label: "generations/sec" },
      { number: "P2P", label: "WebRTC genome exchange" },
    ],
    href: LINKS.flappyDemo,
    papers: ["Paper 1 (kernel fusion)", "Paper 3 (distributed P2P)"],
  },
  {
    emoji: "📊",
    title: "Rastrigin Benchmark",
    description: "4,096-population evolutionary optimization on a 2,000-dimensional multimodal landscape. Measures raw GPU throughput of the fused evolutionary kernel.",
    results: [
      { number: "170", label: "gen/s (M2 Pro)" },
      { number: "400", label: "gen/s (RTX 3090)" },
      { number: "4,081\u00D7", label: "real-world avg (Apple Silicon)" },
    ],
    href: LINKS.gpuBench,
    papers: ["Paper 1 (kernel fusion)"],
  },
  {
    emoji: "🧬",
    title: "Transformer Decoding",
    description: "Fused attention + FFN + LayerNorm in a single GPU dispatch. Benchmarks unfused, fused, parallel, and f16 variants across model dimensions.",
    results: [
      { number: "458\u00D7", label: "parallel vs unfused" },
      { number: "16K", label: "tokens/sec" },
      { number: "D=256", label: "max tested dimension" },
    ],
    href: LINKS.transformerBench,
    papers: ["Paper 2 (transformer fusion)"],
  },
];

const papers = [
  {
    status: "new",
    title: "Browser-to-Browser Distributed Evolution",
    subtitle: "WebRTC P2P Genome Exchange for Island-Model Optimization",
    results: [
      { number: "+11.5%", label: "fitness improvement (4 islands, p=0.015)" },
      { number: "+14.6%", label: "cross-platform (RTX 3090, N=5)" },
      { number: "0", label: "install required" },
    ],
    description: "Browser tabs form evolutionary islands, exchanging elite genomes directly via WebRTC data channels. A 113-line signaling relay brokers the handshake; all genome data flows peer-to-peer. Private rooms by default. Validated on Rastrigin (N=30), across Apple Metal and NVIDIA Vulkan.",
    links: [
      { label: "Live Demo", href: LINKS.flappyDemo },
      { label: "Code", href: LINKS.p2pRepo },
      { label: "All Demos", href: LINKS.swarmDemo },
    ],
  },
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
      { label: "Benchmarks", href: LINKS.gpuBench },
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
      { label: "Benchmarks", href: LINKS.transformerBench },
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

      {/* Nav */}
      <nav className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-kf-accent" viewBox="0 0 32 32" fill="none">
            <rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="2.5"/>
            <path d="M12 16h8M16 12v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <span className="font-bold text-kf-text">kernelfusion.dev</span>
        </div>
        <div className="flex items-center gap-5 text-sm text-kf-muted">
          <a href="/why" className="hover:text-kf-text transition">Why this matters</a>
          <a href="#demos" className="hover:text-kf-text transition">Demos</a>
          <a href="#research" className="hover:text-kf-text transition">Research</a>
          <a href="#sdk" className="hover:text-kf-text transition">SDK</a>
          <a href={LINKS.gpuBench} className="hover:text-kf-text transition">Benchmarks</a>
          <a href={LINKS.results} className="hover:text-kf-text transition">All Results</a>
        </div>
      </nav>

      {/* Hero */}
      <header className="max-w-4xl mx-auto px-6 pt-12 pb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
          GPU frameworks waste{" "}
          <span className="bg-gradient-to-r from-kf-accent to-orange-300 bg-clip-text text-transparent">92% or more</span>
          {" "}of their time.
          <br />
          <span className="text-kf-muted text-3xl md:text-4xl font-bold">I fixed it.</span>
        </h1>
        <p className="text-lg text-kf-muted max-w-2xl mx-auto mb-8">
          Kernel fusion eliminates per-dispatch overhead by packing entire computations into
          single GPU instructions. 487 real-world devices tested — up to 4,081&times; on Apple
          Silicon, 826&times; on phones. Zero installation. Any browser.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href={LINKS.flappyDemo} className="btn-primary">Flappy Evolution Demo</a>
          <a href="/why" className="btn-secondary">Why this matters</a>
          <a href={LINKS.gpuBench} className="btn-secondary">GPU Benchmarks</a>
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
                <p className="mt-2 text-kf-red">92%+ of time = waiting, not computing</p>
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

      {/* Live Demos */}
      <section id="demos" className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-kf-border" />
          <span className="text-xs text-kf-muted font-medium uppercase tracking-widest">Live Demos</span>
          <div className="flex-1 h-px bg-kf-border" />
        </div>

        <div className="space-y-6">
          {demos.map((demo, idx) => (
            <a
              key={demo.title}
              href={demo.href}
              className={`card block transition hover:border-kf-accent/30 ${idx === 0 ? 'ring-1 ring-kf-accent/20' : ''}`}
            >
              {idx === 0 && (
                <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-kf-cyan/10 text-kf-cyan mb-3 inline-block">
                  Featured
                </span>
              )}
              <div className="flex items-start gap-4">
                <span className="text-3xl">{demo.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold mb-1">{demo.title}</h3>
                  <p className="text-sm text-kf-muted leading-relaxed mb-3">{demo.description}</p>

                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {demo.results.map((r) => (
                      <div key={r.label} className="bg-kf-bg rounded-lg p-2 text-center">
                        <div className="text-lg font-extrabold text-kf-accent">{r.number}</div>
                        <div className="text-[9px] text-kf-muted mt-0.5">{r.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {demo.papers.map((p) => (
                      <span key={p} className="text-[9px] text-kf-muted bg-kf-bg rounded px-2 py-0.5">{p}</span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          ))}
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

      {/* Real World Results */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-kf-border" />
          <span className="text-xs text-kf-muted font-medium uppercase tracking-widest">Real World Results</span>
          <div className="flex-1 h-px bg-kf-border" />
        </div>
        <LiveResults />
      </section>

      {/* SDK */}
      <section id="sdk" className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-kf-border" />
          <span className="text-xs text-kf-muted font-medium uppercase tracking-widest">SDK</span>
          <div className="flex-1 h-px bg-kf-border" />
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-kf-accent/10 text-kf-accent">
              npm package
            </span>
          </div>

          <h3 className="text-xl font-bold mb-1">@wgpu-fusion/core</h3>
          <p className="text-sm text-kf-muted mb-4">
            One import. One dispatch. All tokens, all layers, all operations fused into a single GPU kernel.
          </p>

          <div className="bg-kf-bg rounded-lg p-4 font-mono text-xs text-kf-muted mb-4">
            <p className="text-kf-muted/50">npm install @wgpu-fusion/core</p>
            <p className="mt-3 text-kf-muted/50">{"// 3 lines to benchmark your GPU"}</p>
            <p><span className="text-kf-cyan">import</span> {"{ FusedTransformer }"} <span className="text-kf-cyan">from</span> <span className="text-kf-green">{`'@wgpu-fusion/core'`}</span></p>
            <p><span className="text-kf-cyan">const</span> model = <span className="text-kf-cyan">await</span> FusedTransformer.create({"{ dModel: 128, nHeads: 2, nLayers: 4 }"})</p>
            <p><span className="text-kf-cyan">const</span> stats = <span className="text-kf-cyan">await</span> model.benchmark({"{ runs: 10 }"})</p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-kf-bg rounded-lg p-3 text-center">
              <div className="text-lg font-extrabold text-kf-accent">4,081&times;</div>
              <div className="text-[10px] text-kf-muted mt-1">Apple Silicon avg</div>
            </div>
            <div className="bg-kf-bg rounded-lg p-3 text-center">
              <div className="text-lg font-extrabold text-kf-accent">826&times;</div>
              <div className="text-[10px] text-kf-muted mt-1">Android phones avg</div>
            </div>
            <div className="bg-kf-bg rounded-lg p-3 text-center">
              <div className="text-lg font-extrabold text-kf-accent">0</div>
              <div className="text-[10px] text-kf-muted mt-1">install required</div>
            </div>
          </div>

          <p className="text-xs text-kf-muted leading-relaxed mb-4">
            TypeScript. f32 and f16 precision. Int4 quantization. Single-thread and parallel (64-thread shared memory) modes.
            Works in Chrome, Firefox, Safari — any WebGPU-capable browser.
          </p>

          <div className="flex gap-2">
            <a href={LINKS.sdk} target="_blank" rel="noopener" className="text-xs font-medium px-3 py-1.5 rounded-md bg-kf-accent/10 text-kf-accent hover:bg-kf-accent/20 transition">
              npm
            </a>
            <a href={LINKS.sdkRepo} target="_blank" rel="noopener" className="text-xs font-medium px-3 py-1.5 rounded-md bg-kf-accent/10 text-kf-accent hover:bg-kf-accent/20 transition">
              GitHub
            </a>
          </div>
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
            <a href="https://github.com/abgnydn" target="_blank" rel="noopener" className="btn-secondary text-xs">GitHub</a>
            <a href="https://www.linkedin.com/in/abgnydn/" target="_blank" rel="noopener" className="btn-secondary text-xs">LinkedIn</a>
            <a href={LINKS.gpuBench} className="btn-secondary text-xs">gpubench.dev</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-kf-border/50">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-kf-muted">
          <span className="font-semibold text-kf-text">kernelfusion.dev</span>
          <div className="flex gap-5">
            <a href="/why" className="hover:text-kf-text transition">Why this matters</a>
            <a href={LINKS.transformerBench} className="hover:text-kf-text transition">Transformer Bench</a>
            <a href={LINKS.gpuBench} className="hover:text-kf-text transition">GPU Bench</a>
            <a href={LINKS.results} className="hover:text-kf-text transition">All Results</a>
            <a href={LINKS.siteRepo} className="hover:text-kf-text transition">GitHub</a>
            <span>MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
