// ═══════════════════════════════════════════════════════════
// Project-specific links for kernelfusion.dev
//
// Cross-site data (other domains, taglines, stats, crosslinks)
// lives in ./sites.ts — synced from ~/sites-shared/sites.ts.
// DO NOT duplicate SITES URLs here.
// ═══════════════════════════════════════════════════════════

import { SITES } from "./sites";

export { SITES, CROSSLINKS, AUTHOR, SAME_AS } from "./sites";
export type { SiteKey, SiteInfo } from "./sites";

export const LINKS = {
  // Papers — concept DOIs that auto-resolve to the latest version on Zenodo
  // (currently v6 / v2 as of 2026-05-04). Concept DOIs are stable across
  // future bumps; do not change to version-specific DOIs.
  ecPaper: "https://doi.org/10.5281/zenodo.19331833",
  transformerPaper: "https://doi.org/10.5281/zenodo.19344276",

  // Repos
  ecRepo: "https://github.com/abgnydn/webgpu-kernel-fusion",
  transformerRepo: "https://github.com/abgnydn/webgpu-transformer-fusion",
  p2pRepo: "https://github.com/abgnydn/webgpu-p2p-evolution",
  benchRepo: "https://github.com/abgnydn/gpubench",
  siteRepo: "https://github.com/abgnydn/kernelfusion",

  // Benchmarks (nested pages under gpubench.dev)
  gpuBench: SITES.gpubench.url,
  transformerBench: `${SITES.gpubench.url}/transformer`,
  results: `${SITES.gpubench.url}/results`,

  // Demos
  flappyDemo: `${SITES.gpubench.url}/demos/flappy.html`,
  swarmDemo: `${SITES.gpubench.url}/swarm`,

  // SDK
  sdk: "https://www.npmjs.com/package/@webgpu-fusion/core",
  sdkRepo: "https://github.com/abgnydn/webgpu-fusion-sdk",

  // Sibling sites — keep for legacy call-sites, but prefer SITES.<key>.url
  site: SITES.kernelfusion.url,
  webgpuDna: SITES.webgpudna.url,
  zerotvm: SITES.zerotvm.url,
  neuropulse: SITES.neuropulse.url,
} as const;
