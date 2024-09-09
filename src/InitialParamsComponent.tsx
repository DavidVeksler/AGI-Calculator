import React from 'react';

export const initialParams = {
  C_AGI: { value: 1e35, name: "AGI compute threshold (FLOP)", description: "Total computation potentially required to train an AGI system, based on median estimates. Significantly higher than previous estimates with a wide range of uncertainty." },
  C_current: { value: 1e23, name: "Current compute capability (FLOP/s)", description: "Estimate for large models like Meta's LLama 3.1. Actual requirements can vary based on model architecture, hardware optimization, and whether it's for inference or training." },
  R_raw: { value: 2.0, name: "Raw compute growth rate", description: "Rate at which AI compute capabilities are expanding. Historically doubling every 3.4 months, recent trends suggest a slight deceleration to 5-6 months." },
  R_efficiency: { value: 0.5, name: "Annual efficiency improvement rate", description: "Efficiency improvements occur across hardware, algorithms, and architectures. Recent advancements show significant gains, but they vary widely depending on the specific area and metrics considered." },
  S_0: { value: 405e9, name: "Initial model size (parameters)", description: "Current size of large language models. Model sizes are growing rapidly, but growth is constrained by hardware limitations and a shifting focus towards efficiency." },
  R_size: { value: 0.5, name: "Annual model size growth rate", description: "Expected annual increase in LLM model size, estimated at 1.5x to 2x per year." },
  Cost_0: { value: 1e-10, name: "Initial cost per FLOP/s ($)", description: "Cost varies based on hardware type, scale, power efficiency, and utilization. High-performance GPUs are estimated at $0.10 to $0.20 per GFLOP/s." },
  R_cost: { value: 0.3, name: "Annual cost reduction rate", description: "Industry estimates and historical trends suggest a 30-50% annual cost reduction rate for compute." },
  R_funding: { value: 0.2, name: "Annual increase in AI research funding", description: "Estimated at 10-20% per year, based on general research funding trends and the strategic importance of AI." },
  R_train_infer: { value: 1000, name: "Ratio of training compute to inference compute", description: "Training generally requires much more compute than inference. The ratio can vary significantly based on model architecture, task, and optimization techniques." },
  lambda: { value: 0.1, name: "Rate parameter for physical limits probability", description: "Represents the probability of compute growth hitting physical limits before AGI. Non-trivial, but uncertain." },
};

const InitialParamsComponent = () => {
  return null; // This component doesn't render anything, it's just for exporting the initialParams
};

export default InitialParamsComponent;