# kernelfusion.dev

Research umbrella for GPU kernel fusion — eliminating per-dispatch overhead across evolutionary computation and transformer inference.

**Live:** [kernelfusion.dev](https://kernelfusion.dev)

## Research

### Paper 1: Sequential Fitness Evaluation (Published)
- **159-720×** over PyTorch on the same GPU
- Confirmed across CUDA, WebGPU, JAX/XLA, Triton
- [Preprint](https://doi.org/10.5281/zenodo.19343570) · [Code](https://github.com/abgnydn/webgpu-kernel-fusion) · [Benchmarks](https://gpubench.dev)

### Paper 2: Transformer Decoding (New)
- **6.5-13.7×** fused vs unfused
- 92% of wall-clock time is dispatch overhead
- [Code](https://github.com/abgnydn/webgpu-transformer-fusion)

## Author

Ahmet Baris Gunaydin — Independent Researcher

## License

MIT
