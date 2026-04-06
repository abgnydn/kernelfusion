import type { Metadata } from "next";
import { LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Why Kernel Fusion Matters — kernelfusion.dev",
  description: "GPU frameworks waste 92% or more of their time on dispatch overhead. I eliminated it. 487 devices tested. Here's what that means for everyone.",
};

const beforeAfter = [
  { before: "ChatGPT in your browser types 5 words per second. You assume your laptop isn't powerful enough.", after: "Your GPU was idle 92%+ of the time. The waiting is eliminated. Same GPU, 55-4,081\u00D7 faster." },
  { before: "Running AI locally means installing Python, CUDA, PyTorch, downloading model weights, debugging driver conflicts.", after: "Open a browser tab. That's it. The AI runs on the GPU you already have, at near-native speed." },
  { before: "Every AI feature costs $2-4/hour in cloud GPU. 100K users = $50K/month in servers.", after: "The user's GPU does the work. Server cost: $0. The browser IS the infrastructure." },
  { before: "A student in rural India can't afford a GPU cluster or cloud API credits to learn AI.", after: "A $300 phone with Chrome can run transformer inference locally. No internet needed after model download." },
];

const personas = [
  { icon: "\u{1F4AC}", title: "Anyone who uses AI chatbots", desc: "Browser-based AI assistants could respond 55-4,081\u00D7 faster. Not by buying better hardware \u2014 by fixing how the software talks to your GPU." },
  { icon: "\u{1F3EB}", title: "Teachers and students", desc: "Run AI models live in the classroom. Every student's laptop becomes an AI workstation. No lab, no cloud account, no IT department." },
  { icon: "\u{1F52C}", title: "AI researchers", desc: "Ship a live demo of your model as a URL. Reviewers run it in their browser instead of fighting with your Docker container." },
  { icon: "\u{1F680}", title: "Startups building AI products", desc: "Add AI features to your web app without GPU servers. Your users' devices do the compute. Scale to millions at zero marginal cost." },
  { icon: "\u{1F512}", title: "Privacy-sensitive industries", desc: "Healthcare, legal, finance \u2014 the AI runs on the device. Data never leaves the laptop. Compliance by architecture." },
  { icon: "\u{1F30D}", title: "The developing world", desc: "3 billion people have a WebGPU-capable device. Browser-native AI makes intelligence a capability your device already has, not a service you rent." },
];

const steps = [
  { title: "The problem: 92%+ overhead", desc: "GPU frameworks (PyTorch, JAX, WebLLM) send one small task to the GPU, wait for it to finish, send the next one. For a 64-token generation with 4 layers, that's 1,024 separate round-trips. Each round-trip takes longer than the actual math." },
  { title: "The fix: one dispatch", desc: "Pack the entire computation \u2014 all tokens, all layers, all operations \u2014 into a single GPU instruction. The GPU loops internally. No round-trips. No waiting. Same math, same result." },
  { title: "The proof: 487 devices", desc: "Two preprints, then 487 people ran it on their own hardware. Apple Silicon averages 4,081\u00D7. Android phones average 826\u00D7. NVIDIA desktops average 70\u00D7. Tested across Chrome, Firefox, Safari on macOS, Windows, Linux, Android, and iOS." },
  { title: "The result: AI on a phone", desc: "213,000 tokens per second peak on a phone. 15,000 average across all mobile devices. No Python, no CUDA, no cloud. A browser tab outperforms PyTorch on the same hardware." },
];

export default function WhyPage() {
  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,158,11,0.05)_0%,_transparent_50%)]" />
      </div>

      <div className="max-w-3xl mx-auto px-6">
        {/* Nav */}
        <nav className="flex items-center justify-between py-6">
          <a href="/" className="text-sm font-semibold text-kf-text">kernelfusion.dev</a>
          <a href={LINKS.transformerBench} className="text-sm text-kf-accent hover:underline">Run the benchmark &rarr;</a>
        </nav>

        {/* Hero */}
        <header className="text-center pt-16 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-kf-accent/10 border border-kf-accent/20 text-kf-accent text-xs font-medium mb-8">
            Two research preprints
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Your GPU is{" "}
            <span className="bg-gradient-to-r from-kf-accent to-orange-300 bg-clip-text text-transparent">fast enough.</span>
            <br />
            The software isn&apos;t.
          </h1>
          <p className="text-lg text-kf-muted max-w-lg mx-auto">
            GPU frameworks waste 92% or more of their time on overhead &mdash; sending tasks one by one
            instead of all at once. I proved it, fixed it, and 487 people confirmed it on their own devices.
          </p>
        </header>

        {/* Stats */}
        <section className="py-16 border-t border-kf-border/50">
          <div className="grid grid-cols-3 gap-4">
            {[
              { number: "4,081\u00D7", label: "Apple Silicon average\n487 real-world runs" },
              { number: "826\u00D7", label: "Android phones average\nQualcomm Adreno" },
              { number: "0", label: "things to install\njust open Chrome" },
            ].map((s) => (
              <div key={s.number} className="card text-center py-8">
                <div className="text-3xl md:text-4xl font-extrabold text-kf-accent mb-2">{s.number}</div>
                <div className="text-xs text-kf-muted whitespace-pre-line">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 border-t border-kf-border/50">
          <h2 className="text-2xl font-bold mb-3">How it works (simply)</h2>
          <p className="text-kf-muted mb-8 max-w-lg">No jargon. Here&apos;s the intuition.</p>
          <div className="space-y-8">
            {steps.map((s, i) => (
              <div key={s.title} className="flex gap-5 items-start">
                <div className="w-10 h-10 rounded-lg bg-kf-accent/10 border border-kf-accent/20 flex items-center justify-center text-kf-accent font-bold text-sm flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{s.title}</h3>
                  <p className="text-sm text-kf-muted leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Before/After */}
        <section className="py-16 border-t border-kf-border/50">
          <h2 className="text-2xl font-bold mb-3">What actually changes</h2>
          <p className="text-kf-muted mb-8 max-w-lg">Not theoretical. Here&apos;s what&apos;s different tomorrow.</p>
          <div className="space-y-4">
            {beforeAfter.map((ba, i) => (
              <div key={i} className="card grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-start">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-kf-muted/50 mb-2">Before</div>
                  <p className="text-sm text-kf-muted leading-relaxed">{ba.before}</p>
                </div>
                <div className="text-kf-accent text-xl pt-4 hidden sm:block">&rarr;</div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-kf-accent mb-2">After</div>
                  <p className="text-sm text-kf-text leading-relaxed font-medium">{ba.after}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Who it's for */}
        <section className="py-16 border-t border-kf-border/50">
          <h2 className="text-2xl font-bold mb-3">Who this is for</h2>
          <div className="space-y-5">
            {personas.map((p) => (
              <div key={p.title} className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-kf-surface border border-kf-border flex items-center justify-center text-xl flex-shrink-0">
                  {p.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{p.title}</h3>
                  <p className="text-sm text-kf-muted leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why are the real-world numbers bigger? */}
        <section className="py-16 border-t border-kf-border/50">
          <h2 className="text-2xl font-bold mb-3">Why are the real-world numbers bigger than the paper?</h2>
          <p className="text-kf-muted mb-6 max-w-lg">
            The papers measured on 2 machines. The real world has hundreds of different GPUs. Here&apos;s why that matters.
          </p>
          <div className="space-y-4">
            <div className="card">
              <h3 className="font-semibold mb-2">The paper tested on 2 devices</h3>
              <p className="text-sm text-kf-muted leading-relaxed">
                An Apple M2 Pro laptop and a Tesla T4 server. Both are fast desktop/server GPUs with efficient command dispatching. The paper measured 159&ndash;720&times; speedup on those machines.
              </p>
            </div>
            <div className="card">
              <h3 className="font-semibold mb-2">487 people ran it on everything else</h3>
              <p className="text-sm text-kf-muted leading-relaxed">
                Phones, tablets, Chromebooks, gaming rigs, office laptops. Devices with GPUs that were never designed for compute workloads. These GPUs have much worse dispatch overhead than the ones in the paper.
              </p>
            </div>
            <div className="card">
              <h3 className="font-semibold mb-2">Worse overhead = bigger gain from fusion</h3>
              <p className="text-sm text-kf-muted leading-relaxed">
                Kernel fusion eliminates dispatch overhead. So the worse a device is at dispatching, the more it benefits.
                NVIDIA desktop GPUs (good dispatching) see ~70&times;.
                Apple Silicon laptops see ~4,081&times;.
                Android phones (Qualcomm Adreno) see ~826&times;.
                This is not a bug &mdash; it&apos;s the point. The devices that need fusion most, benefit from it most.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">See it for yourself</h2>
          <p className="text-kf-muted mb-8">Run the benchmarks on your hardware, right now.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={LINKS.transformerBench} className="btn-primary">Transformer Benchmark</a>
            <a href={LINKS.gpuBench} className="btn-secondary">GPU Compute Benchmarks</a>
            <a href={LINKS.results} className="btn-secondary">All Results (Open Data)</a>
          </div>
          <p className="text-xs text-kf-muted/50 mt-4">
            Every result from every device is public. No cherry-picking. Verify any claim yourself.
          </p>
        </section>
      </div>

      <footer className="border-t border-kf-border/50">
        <div className="max-w-3xl mx-auto px-6 py-8 text-center">
          <p className="text-xs text-kf-muted/50">
            Built by Ahmet Baris Gunaydin &middot; Independent Researcher &middot; All computation runs locally on your GPU
          </p>
        </div>
      </footer>
    </div>
  );
}
