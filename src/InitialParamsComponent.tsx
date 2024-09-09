import React from 'react';

export const initialParams = {
  C_AGI: { value: 1e35, name: "AGI compute threshold (FLOP)", description: "Based on Ajeya Cotra's report for Open Philanthropy, median estimate for transformative AI" },
  C_current: { value: 1e23, name: "Current compute capability (FLOP/s)", description: "Estimate for large models like Meta's LLama 3.1" },
  R_raw: { value: 1.7, name: "Raw compute growth rate", description: "Doubling approximately every 3.4 months, with recent trends suggesting slight deceleration to 5-6 months" },
  R_efficiency: { value: 0.35, name: "Annual efficiency improvement rate", description: "Efficiency improvements across hardware, algorithms, and architectures" },
  S_0: { value: 405e9, name: "Initial model size (parameters)", description: "Current size of large language models" },
  R_size: { value: 0.35, name: "Annual model size growth rate", description: "Expected to grow 1.5x to 2x per year" },
  Cost_0: { value: 1e-10, name: "Initial cost per FLOP/s ($)", description: "Estimated at $0.10 to $0.20 per GFLOP/s for high-performance GPUs" },
  R_cost: { value: 0.22, name: "Annual cost reduction rate", description: "Industry estimates suggest a 20-25% annual cost reduction rate for compute" },
  R_funding: { value: 0.12, name: "Annual increase in AI research funding", description: "Estimated at 10-15% per year based on general research funding trends" },
  R_train_infer: { value: 1000, name: "Ratio of training compute to inference compute", description: "Training generally requires much more compute than inference" },
  lambda: { value: 0.07, name: "Rate parameter for physical limits probability", description: "Represents the probability of compute growth hitting physical limits before AGI" },
};

export const scenarios = {
  default: {
    C_AGI: 1e35,
    C_current: 1e23,
    R_raw: 1.7,
    R_efficiency: 0.35,
    R_size: 0.35,
    R_cost: 0.22,
    R_funding: 0.12,
    lambda: 0.07,
  },
  optimistic: {
    C_AGI: 1e34,
    C_current: 1e24,
    R_raw: 1.85,
    R_efficiency: 0.45,
    R_size: 0.45,
    R_cost: 0.28,
    R_funding: 0.15,
    lambda: 0.05,
  },
  pessimistic: {
    C_AGI: 5e35,
    C_current: 5e22,
    R_raw: 1.55,
    R_efficiency: 0.25,
    R_size: 0.25,
    R_cost: 0.18,
    R_funding: 0.10,
    lambda: 0.09,
  },
};

const InitialParamsComponent = () => {
  return null;
};

export default InitialParamsComponent;