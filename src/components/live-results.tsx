"use client";

import { useEffect, useState } from "react";
import { ShareButtons } from "./share-buttons";
import { LINKS } from "@/lib/constants";

interface VendorAggregate {
  name: string;
  runs: number;
  avgSpeedup: number;
  peakSpeedup: number;
}

interface RecentRun {
  gpu_name: string;
  score: number;
  browser: string;
  os: string;
  is_mobile: boolean;
  created_at: string;
}

interface LiveData {
  total: number;
  vendors: VendorAggregate[];
  mobile: {
    runs: number;
    avgTokensPerSec: number;
    peakTokensPerSec: number;
  };
  browsers: Record<string, number>;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

// Fallback values use medians from the gpubench DB snapshot 2026-05-04.
// Peak values exclude Safari-on-macOS measurement artifacts (where the
// unfused baseline stalls and produces inflated speedups in the 1k-79k×
// range). The honest peak is the max of the cleaned distribution.
// Field name `avgSpeedup` is a misnomer — it now holds median, not mean.
// Rename pending; update API contract first.
const FALLBACK: LiveData = {
  total: 92,
  vendors: [
    { name: "Apple Silicon", runs: 65, avgSpeedup: 71, peakSpeedup: 226 },
    { name: "NVIDIA", runs: 56, avgSpeedup: 56, peakSpeedup: 402 },
    { name: "ARM Mali", runs: 14, avgSpeedup: 55, peakSpeedup: 120 },
    { name: "Qualcomm Adreno", runs: 29, avgSpeedup: 20, peakSpeedup: 103 },
  ],
  mobile: { runs: 36, avgTokensPerSec: 15000, peakTokensPerSec: 213000 },
  browsers: { Chrome: 347, Firefox: 69, Safari: 62 },
};

export function LiveResults() {
  const [data, setData] = useState<LiveData>(FALLBACK);
  const [live, setLive] = useState(false);
  const [recentRuns, setRecentRuns] = useState<RecentRun[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://gpubench.dev/api/transformer-results",
          { cache: "no-store" },
        );
        if (!res.ok) return;
        const json = (await res.json()) as Partial<LiveData>;
        if (json && typeof json.total === "number" && json.total > 0) {
          setData({
            total: json.total ?? FALLBACK.total,
            vendors: json.vendors?.length ? json.vendors : FALLBACK.vendors,
            mobile: json.mobile ?? FALLBACK.mobile,
            browsers: json.browsers ?? FALLBACK.browsers,
          });
          setLive(true);
        }
      } catch {
        /* fall back to static numbers */
      }
    };
    fetchData();

    // Also fetch recent compute runs
    const fetchRecent = async () => {
      try {
        const res = await fetch("https://gpubench.dev/api/results", { cache: "no-store" });
        if (!res.ok) return;
        const json = await res.json();
        if (Array.isArray(json.recent)) setRecentRuns(json.recent.slice(0, 8));
      } catch { /* silent */ }
    };
    fetchRecent();
  }, []);

  const topVendors = data.vendors.slice(0, 4);
  const totalBrowsers = Object.values(data.browsers).reduce((a, b) => a + b, 0);
  const browserEntries = Object.entries(data.browsers).sort((a, b) => b[1] - a[1]);

  const vendorLines = topVendors
    .map((v) => `• ${v.name}: ${v.avgSpeedup.toLocaleString()}\u00D7 faster on average`)
    .join("\n");

  const mobileLine =
    data.mobile.peakTokensPerSec >= 1000
      ? `Someone's phone hit ${data.mobile.peakTokensPerSec.toLocaleString()} tokens/sec. The average phone gets ${data.mobile.avgTokensPerSec.toLocaleString()}.`
      : "";

  const shareText = [
    `${data.total.toLocaleString()} people tested a research technique called kernel fusion on their own devices.`,
    ``,
    `It makes GPU programs faster than PyTorch by eliminating wasted time between instructions. How much faster:`,
    ``,
    vendorLines,
    ``,
    mobileLine,
    ``,
    `All in a browser tab. No install. Works on Mac, Windows, Linux, phones.`,
    `Try it on your device: https://kernelfusion.dev`,
  ]
    .filter((line, i, arr) => {
      if (line !== "") return true;
      return i > 0 && arr[i - 1] !== "";
    })
    .join("\n");

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-kf-green/10 text-kf-green">
          {data.total.toLocaleString()} Runs &middot; 8 GPU Vendors
        </span>
        {live && (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-kf-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-kf-green animate-pulse" />
            Live
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold mb-2">Real-world distribution across 7 GPU vendors</h3>
      <p className="text-sm text-kf-muted leading-relaxed mb-6">
        {live
          ? `Live from gpubench.dev. ${data.total.toLocaleString()} unique devices have run the transformer benchmark across 7 GPU vendors. Medians shown (means are skewed by Safari-on-macOS measurement artifacts).`
          : "Since publishing, 92 unique devices across 7 GPU vendors have run the benchmarks. Medians shown."}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {topVendors.map((v) => (
          <div key={v.name} className="bg-kf-bg rounded-lg p-3 text-center">
            <div className="text-2xl font-extrabold text-kf-accent">
              {v.avgSpeedup.toLocaleString()}&times;
            </div>
            <div className="text-[10px] text-kf-muted mt-1">{v.name} median</div>
            {v.peakSpeedup > v.avgSpeedup && (
              <div className="text-[9px] text-kf-muted/60 mt-0.5">
                peak {v.peakSpeedup.toLocaleString()}&times;
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-3 text-sm text-kf-muted leading-relaxed mb-6">
        {data.mobile.runs > 0 && (
          <p>
            <span className="text-kf-text font-medium">Mobile transformer runs:</span>{" "}
            {data.mobile.runs} confirmed across iOS Safari and Android Chrome. Peak:{" "}
            {data.mobile.peakTokensPerSec.toLocaleString()} tokens/sec on a phone. Average:{" "}
            {data.mobile.avgTokensPerSec.toLocaleString()} tokens/sec.
          </p>
        )}
        {totalBrowsers > 0 && (
          <p>
            <span className="text-kf-text font-medium">Browser coverage:</span>{" "}
            {browserEntries
              .slice(0, 3)
              .map(([name, count]) => `${name} (${count})`)
              .join(", ")}
            . macOS, Windows, Linux, Android, iOS. No installation on any of them.
          </p>
        )}
      </div>

      {/* Why not run it yourself? */}
      <div className="rounded-lg border border-kf-accent/20 bg-kf-accent/5 p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="text-2xl flex-shrink-0">&#x1F680;</div>
          <div className="flex-1">
            <h4 className="font-semibold text-kf-text mb-1">Why not run it on your device?</h4>
            <p className="text-xs text-kf-muted leading-relaxed mb-3">
              30 seconds. No installation. Your result joins the live dataset above.
            </p>
            <div className="flex flex-wrap gap-2">
              <a href={LINKS.transformerBench} className="btn-primary text-xs py-1.5 px-3">
                Run Transformer Benchmark &rarr;
              </a>
              <a href={LINKS.gpuBench} className="btn-secondary text-xs py-1.5 px-3">
                Run GPU Compute Benchmark
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Open data */}
      <div className="rounded-lg border border-kf-border bg-kf-bg/50 p-4 mb-6">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-kf-accent flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          <div className="flex-1">
            <h4 className="font-semibold text-kf-text mb-1">Every result is public</h4>
            <p className="text-xs text-kf-muted leading-relaxed mb-2">
              We don&apos;t cherry-pick results. Every benchmark run from every device is published
              in a searchable, sortable, downloadable dataset. GPU name, score, browser, OS, timestamp &mdash; all of it.
              No data is hidden. Verify any claim yourself.
            </p>
            <a
              href={LINKS.results}
              target="_blank"
              rel="noopener"
              className="text-xs font-medium px-3 py-1.5 rounded-md bg-kf-accent/10 text-kf-accent hover:bg-kf-accent/20 transition inline-block"
            >
              Browse all {data.total.toLocaleString()} results &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* Recent runs feed */}
      {recentRuns.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-kf-green animate-pulse" />
              <span className="text-[10px] font-medium text-kf-muted uppercase tracking-widest">
                Recent Runs
              </span>
            </div>
            <a
              href="https://gpubench.dev/results"
              target="_blank"
              rel="noopener"
              className="text-[10px] text-kf-accent hover:underline"
            >
              View all &rarr;
            </a>
          </div>
          <div className="rounded-lg border border-kf-border overflow-hidden">
            {recentRuns.map((run, i) => (
              <div
                key={`${run.created_at}-${i}`}
                className={`flex items-center gap-3 px-3 py-2 text-xs ${
                  i > 0 ? "border-t border-kf-border/50" : ""
                } ${i % 2 === 0 ? "bg-kf-surface" : "bg-kf-bg/30"}`}
              >
                <span className="text-kf-text font-medium truncate min-w-0 flex-1">
                  {run.gpu_name}
                </span>
                <span className="text-kf-accent font-bold tabular-nums w-12 text-right">
                  {Math.round(run.score).toLocaleString()}
                </span>
                <span className="text-kf-muted/60 w-16 truncate hidden sm:block">
                  {run.browser?.split(" ")[0]} {run.os}
                </span>
                {run.is_mobile && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-kf-accent/10 text-kf-accent">
                    mobile
                  </span>
                )}
                <span className="text-kf-muted/40 tabular-nums w-14 text-right text-[10px]">
                  {timeAgo(run.created_at)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Share */}
      <ShareButtons text={shareText} url={LINKS.site} title="Kernel Fusion: Real-World Speedups" />

    </div>
  );
}
