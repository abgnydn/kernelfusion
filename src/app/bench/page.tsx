"use client";

import { useState, useCallback } from "react";

interface BenchResult {
  label: string;
  layers: number;
  dispatches: number;
  unfused: { mean_ms: number; std_ms: number; tokens_per_sec: number };
  fused: { mean_ms: number; std_ms: number; tokens_per_sec: number };
  parallel?: { mean_ms: number; std_ms: number; tokens_per_sec: number };
  speedup: number;
  parSpeedup?: number;
  error?: string;
}

type Status = "idle" | "running" | "done";

export default function BenchPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [log, setLog] = useState<string[]>([]);
  const [results, setResults] = useState<BenchResult[]>([]);
  const [gpuName, setGpuName] = useState("");

  const addLog = useCallback((msg: string) => {
    setLog((prev) => [...prev, msg]);
  }, []);

  const runBenchmark = useCallback(async () => {
    if (status === "running") return;
    setStatus("running");
    setLog([]);
    setResults([]);

    try {
      const mod = await import("@/lib/transformer-bench");
      const result = await mod.runSweep(
        (msg: string) => addLog(msg),
        (row: BenchResult) => setResults((prev) => [...prev, row])
      );
      setGpuName(result.gpuName || "Unknown");
    } catch (err) {
      addLog(`ERROR: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setStatus("done");
    }
  }, [status, addLog]);

  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,158,11,0.05)_0%,_transparent_50%)]" />
      </div>

      {/* Nav */}
      <nav className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
        <a href="/" className="text-sm font-semibold text-kf-text hover:text-kf-accent transition">
          kernelfusion.dev
        </a>
        <a href="/" className="text-sm text-kf-muted hover:text-kf-text transition">
          &larr; Back to research
        </a>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pb-20">
        {/* Header */}
        <header className="text-center pt-8 pb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            Transformer Fusion{" "}
            <span className="bg-gradient-to-r from-kf-accent to-orange-300 bg-clip-text text-transparent">
              Benchmark
            </span>
          </h1>
          <p className="text-kf-muted max-w-xl mx-auto">
            Fused vs unfused autoregressive decoding. Single-threaded and parallel (64 threads).
            Runs all 9 configs (D=32/64/128, L=1/2/4) plus sequence scaling on your GPU.
          </p>
        </header>

        {/* GPU Info */}
        {gpuName && (
          <div className="card mb-6 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-kf-green" />
            <span className="text-sm font-medium">{gpuName}</span>
          </div>
        )}

        {/* Run Button */}
        <button
          className="btn-primary w-full text-base py-4 mb-6"
          disabled={status === "running"}
          onClick={runBenchmark}
        >
          {status === "running" ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                <path d="M14.5 8a6.5 6.5 0 00-6.5-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Running sweep (this takes a few minutes)...
            </span>
          ) : status === "done" ? "Run Again" : "Run Full Sweep"}
        </button>

        <p className="text-[11px] text-kf-muted/60 text-center mb-8">
          Runs unfused, single-threaded fused, and parallel fused kernels across 9 configurations + sequence scaling.
          All computation runs locally on your GPU.
        </p>

        {/* Results Table */}
        {results.length > 0 && (
          <div className="card mb-6 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4">Results</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-kf-border text-kf-muted text-xs">
                  <th className="text-left py-2 pr-4">Config</th>
                  <th className="text-right py-2 px-2">Dispatches</th>
                  <th className="text-right py-2 px-2">Unfused (ms)</th>
                  <th className="text-right py-2 px-2">Fused 1T (ms)</th>
                  <th className="text-right py-2 px-2">Parallel (ms)</th>
                  <th className="text-right py-2 px-2">1T Speedup</th>
                  <th className="text-right py-2 pl-2">Parallel Speedup</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i} className="border-b border-kf-border/30">
                    {r.error ? (
                      <td colSpan={7} className="py-2 text-kf-red text-xs">
                        {r.label}: {r.error}
                      </td>
                    ) : (
                      <>
                        <td className="py-2 pr-4 font-medium">{r.label}</td>
                        <td className="py-2 px-2 text-right text-kf-muted">{r.dispatches}</td>
                        <td className="py-2 px-2 text-right text-kf-muted">
                          {r.unfused.mean_ms.toFixed(1)}
                        </td>
                        <td className="py-2 px-2 text-right">
                          {r.fused.mean_ms.toFixed(1)}
                        </td>
                        <td className="py-2 px-2 text-right text-kf-cyan">
                          {r.parallel ? r.parallel.mean_ms.toFixed(1) : "—"}
                        </td>
                        <td className="py-2 px-2 text-right font-semibold text-kf-accent">
                          {r.speedup.toFixed(1)}×
                        </td>
                        <td className="py-2 pl-2 text-right font-bold text-kf-cyan">
                          {r.parSpeedup ? `${r.parSpeedup.toFixed(0)}×` : "—"}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Live Log */}
        {log.length > 0 && (
          <div className="card">
            <h2 className="text-sm font-semibold mb-3 text-kf-muted">Live Log</h2>
            <pre className="text-xs text-kf-muted/70 font-mono max-h-80 overflow-y-auto whitespace-pre-wrap leading-relaxed">
              {log.join("\n")}
            </pre>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-kf-border/50">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center text-xs text-kf-muted/50">
          All computation runs locally on your GPU. Nothing is sent to any server.
        </div>
      </footer>
    </div>
  );
}
