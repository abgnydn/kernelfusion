# kernelfusion.dev

Research umbrella for GPU kernel fusion — eliminating per-dispatch overhead across evolutionary computation and transformer inference.

**Live:** [kernelfusion.dev](https://kernelfusion.dev)

## Research

### Paper 1: Sequential Fitness Evaluation (v7, 2026-07-28)
- Single-dispatch fusion of a sequential fitness loop — the per-step kernel launch overhead goes away
- Reproduced across CUDA, WebGPU, JAX/XLA and Triton, on an M2 Pro and a Tesla T4
- Cross-vendor validation through the public benchmark fleet at [gpubench.dev](https://gpubench.dev)
- Speedup ratios are versioned in the record rather than restated here; the v7 erratum re-measured them
- [Preprint](https://doi.org/10.5281/zenodo.19331833) · [Code](https://github.com/abgnydn/webgpu-kernel-fusion)

### Paper 2: Transformer Decoding (v3, 2026-07-28)
- The whole autoregressive decoding loop — attention, FFN, LayerNorm — in one WebGPU dispatch
- Single-threaded and parallel shared-memory variants, cross-checked for numerical equivalence before timing
- Speedup ratios are versioned in the record rather than restated here; the v3 erratum revised them
- [Preprint](https://doi.org/10.5281/zenodo.19344276) · [Code](https://github.com/abgnydn/webgpu-transformer-fusion)

## Author

Ahmet Baris Gunaydin — Independent Researcher

## License

MIT
