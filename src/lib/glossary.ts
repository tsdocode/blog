// Hover definitions for the Inferentia2 essay and field guide (GlossaryTooltips.astro).
// `match`: exact-case for acronyms; `ci: true` matches case-insensitively (whole words). `link`: a guide entry id.
export interface GlossaryTerm {
  match: string[];
  title: string;
  def: string;
  link?: string;
  ci?: boolean;
}

export const GLOSSARY: GlossaryTerm[] = [
  { match: ['HBM'], title: 'HBM — High-Bandwidth Memory', def: 'The chip’s device memory: 32 GiB shared by both NeuronCores, 820 GB/s on paper (~257 GB/s measured into one core). Weights, KV caches and kernel inputs/outputs live here.', link: 'hardware/hbm' },
  { match: ['DMA'], title: 'DMA — Direct Memory Access', def: 'Hardware engines that copy data between HBM and on-chip SBUF in parallel with compute. 16 per NeuronCore. Their cost depends on how many descriptors (contiguous pieces) a copy needs, not just on bytes.', link: 'hardware/dma' },
  { match: ['SBUF'], title: 'SBUF — State Buffer', def: 'The 24 MiB on-chip scratchpad of a NeuronCore: 128 partitions × 192 KiB. No caches — kernels explicitly copy data in and out.', link: 'hardware/sbuf' },
  { match: ['PSUM'], title: 'PSUM — Partial Sum buffer', def: '2 MiB of fp32 accumulators next to the Tensor Engine, 8 banks of 2 KiB per partition. Every matmul writes its result here.', link: 'hardware/psum' },
  { match: ['NKI'], title: 'NKI — Neuron Kernel Interface', def: 'AWS’s Python-embedded language for writing custom kernels for NeuronCores: you place tiles in SBUF/PSUM and issue engine instructions yourself.', link: 'programming/nki' },
  { match: ['NKI-Lib'], title: 'NKI-Lib', def: 'AWS’s library of prebuilt NKI kernels (attention, MLP, …), mostly targeting Trainium2; several do not compile on Inferentia2.' },
  { match: ['NEFF'], title: 'NEFF — Neuron Executable File Format', def: 'The compiled binary of a graph or kernel that the Neuron runtime loads and runs on a NeuronCore.', link: 'programming/tracing-and-compilation' },
  { match: ['NeuronCore', 'NeuronCores', 'NeuronCore-v2'], title: 'NeuronCore-v2', def: 'One core of the Inferentia2 chip (there are two): four engines — Tensor, Vector, Scalar, GpSimd — running in parallel around SBUF and PSUM.', link: 'hardware/neuroncore-v2' },
  { match: ['Inferentia2', 'Inf2', 'inf2'], title: 'Inferentia2', def: 'AWS’s second-generation inference chip: two NeuronCore-v2, 32 GiB HBM, 190 bf16 TFLOPS. The chip in inf2 instances.', link: 'hardware/inferentia2-chip' },
  { match: ['Tensor Engine', 'TensorE'], title: 'Tensor Engine', def: 'The 128 × 128 systolic array that does matrix multiplies (~92 bf16 TFLOPS per core). One operand stays in the array (stationary), the other streams through (moving).', link: 'hardware/tensor-engine' },
  { match: ['Vector Engine', 'VectorE'], title: 'Vector Engine', def: '128-lane engine for operations that combine several inputs: element-wise between two tiles, reductions, masks.', link: 'hardware/vector-engine' },
  { match: ['Scalar Engine', 'ScalarE'], title: 'Scalar Engine', def: '128-lane engine for one-input element-wise math with hardware exp, silu, rsqrt, sin — computes f(x·scale + bias) per element.', link: 'hardware/scalar-engine' },
  { match: ['GpSimd'], title: 'GpSimd Engine', def: 'Eight programmable 512-bit vector processors on each NeuronCore, for custom ops and work the fixed-function engines cannot do.', link: 'hardware/gpsimd' },
  { match: ['TTFA'], title: 'TTFA — Time To First Audio', def: 'Time from sending a request to receiving its first audio byte — what a user feels as latency in streaming TTS.' },
  { match: ['RTF'], title: 'RTF — Real-Time Factor', def: 'Time to generate audio ÷ duration of that audio. Below 1.0 the stream is generated faster than it plays; above 1.0 playback stalls.' },
  { match: ['TTS'], title: 'TTS — Text To Speech', def: 'Generating spoken audio from text.' },
  { match: ['codec'], ci: true, title: 'Codec (decoder)', def: 'The neural audio decoder that turns each frame’s 16 codebook tokens into 1,920 audio samples (80 ms at 24 kHz).', link: 'kernels/codec-convs' },
  { match: ['talker'], ci: true, title: 'Talker', def: 'Qwen3-TTS’s main 28-layer, 1.4 B-parameter transformer. Each step it predicts the first codebook token of the next audio frame.', link: 'kernels/talker-step' },
  { match: ['code predictor'], ci: true, title: 'Code predictor', def: 'A small 5-layer transformer that runs 16 sequential depth steps per frame to fill in codebooks 1–15 after the talker.', link: 'kernels/cp-frame' },
  { match: ['KV cache', 'KV-cache'], title: 'KV cache', def: 'The stored keys and values of earlier tokens, so each new token’s attention does not recompute them. Here it is paged: 128-token pages per stream.', link: 'kernels/paged-kv-attention' },
  { match: ['prefill'], ci: true, title: 'Prefill', def: 'Processing a new request’s whole prompt in one pass to fill its KV cache, before generating the first token.', link: 'kernels/packed-prefill' },
  { match: ['varlen'], ci: true, title: 'Varlen (variable-length) attention', def: 'Packing sequences of different lengths back to back without padding, with a mask that keeps each sequence’s attention to itself.', link: 'kernels/packed-prefill' },
  { match: ['GIL'], title: 'GIL — Global Interpreter Lock', def: 'CPython’s lock that lets only one thread run Python at a time, so two engines in one process share one core’s worth of Python.' },
  { match: ['HLO'], title: 'HLO — High-Level Operations', def: 'The compiler’s intermediate representation of a graph: scatter, dot, add, … The profiler can attribute HBM traffic to each HLO op.' },
  { match: ['SNR'], title: 'SNR — Signal-to-Noise Ratio', def: 'How close generated audio is to a reference, in dB: 20 log10(‖reference‖ / ‖difference‖). ~50 dB is effectively identical; 25 dB is clearly audible error.' },
  { match: ['TFLOPS'], title: 'TFLOPS', def: 'Trillions of floating-point operations per second. One multiply-accumulate counts as 2 FLOPs.' },
  { match: ['bf16'], title: 'bf16 — bfloat16', def: '16-bit floating point with fp32’s exponent range and 8 bits of mantissa; the standard inference precision on Neuron.' },
  { match: ['fp32'], title: 'fp32', def: '32-bit IEEE floating point — the accuracy reference in this project.' },
  { match: ['FP8', 'fp8'], title: 'FP8', def: '8-bit floating point. On Inferentia2 it halves weight bytes but runs at the same matmul rate as bf16.' },
  { match: ['RoPE'], title: 'RoPE — Rotary Position Embedding', def: 'Encodes token position by rotating pairs of query/key dimensions by a position-dependent angle.', link: 'patterns/qk-norm-rope' },
  { match: ['RMSNorm'], title: 'RMSNorm', def: 'Normalisation that divides by the root-mean-square of the features, then scales by a learned weight.' },
  { match: ['SwiGLU'], title: 'SwiGLU', def: 'The MLP used here: silu(x·W_gate) ⊙ (x·W_up), then a down projection.' },
  { match: ['SnakeBeta'], title: 'SnakeBeta', def: 'The codec’s activation, x + sin²(α·x)/β with learned α and β per channel — applied after every convolution at audio rate.', link: 'patterns/sin-range-reduction' },
  { match: ['L4'], title: 'NVIDIA L4', def: 'A small data-centre GPU (24 GB, 300 GB/s, 121 dense bf16 TFLOPS) — AWS g6 instances.' },
  { match: ['p50', 'p90', 'p95', 'p99'], title: 'Percentiles', def: 'p95 = the value 95% of requests were faster than. p50 is the median; p99 shows the slow tail.' },
  { match: ['vCPU', 'vCPUs'], title: 'vCPU', def: 'A virtual CPU thread of the instance’s host processor. An inf2.xlarge has 4.' },
  { match: ['PE'], title: 'PE — Processing Element', def: 'One multiply-accumulate cell of the Tensor Engine’s 128 × 128 systolic array.' }
];
