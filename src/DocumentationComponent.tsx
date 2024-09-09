import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { InfoCircle, FileText, Calculator, GraphUp } from 'react-bootstrap-icons';

const DocumentationComponent = () => {
  return (
    <div className="mt-5">
      <h2 className="h4 mb-3"><InfoCircle className="me-2" />Documentation and Justification</h2>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header><FileText className="me-2" />Model Overview</Accordion.Header>
          <Accordion.Body>
            <p>This AI Progress Calculator is based on a simplified model that combines various factors influencing AI development, including compute growth, efficiency improvements, and cost reductions. The model aims to estimate the timeline to Artificial General Intelligence (AGI) based on adjustable parameters.</p>
            <p>Key assumptions of this model include:</p>
            <ul>
              <li>Continuous exponential growth in compute capabilities</li>
              <li>Steady improvements in AI efficiency</li>
              <li>Ongoing reductions in compute costs</li>
              <li>A definable compute threshold for AGI</li>
            </ul>
            <p>It's important to note that this model is a simplification and does not account for potential paradigm shifts, breakthrough technologies, or other unforeseen factors that could significantly alter the path to AGI.</p>
            <p>For more detailed information on AI progress and forecasting, refer to:</p>
            <ul>
              <li><a href="https://arxiv.org/abs/2301.13300" target="_blank" rel="noopener noreferrer" className="link-primary">From Quantity to Quality: Boosting LLM Performance with Self-Guided Data Selection for Instruction Tuning</a></li>
              <li><a href="https://arxiv.org/abs/2306.08162" target="_blank" rel="noopener noreferrer" className="link-primary">Unicron: Economizing Self-Healing LLM Training at Scale</a></li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header><Calculator className="me-2" />Key Equations</Accordion.Header>
          <Accordion.Body>
            <ol>
              <li>
                <strong>Effective Compute Growth Rate:</strong>
                <pre>R_compute = (1 + R_raw) * (1 + R_efficiency) - 1</pre>
                <p>This equation combines the raw compute growth rate with efficiency improvements to calculate the effective growth rate.</p>
              </li>
              <li>
                <strong>Time to AGI Compute Threshold:</strong>
                <pre>T_AGI = log(C_AGI / C_current) / log(1 + R_compute)</pre>
                <p>This calculates the time needed to reach the AGI compute threshold based on current capabilities and the effective growth rate.</p>
              </li>
              <li>
                <strong>Model Size at AGI:</strong>
                <pre>S_AGI = S_0 * (1 + R_size)^T_AGI</pre>
                <p>This estimates the model size when AGI is achieved, based on initial size and annual growth rate.</p>
              </li>
              <li>
                <strong>Cost per FLOP/s at AGI:</strong>
                <pre>Cost_AGI = Cost_0 * (1 - R_cost)^T_AGI</pre>
                <p>This calculates the expected cost per FLOP/s when AGI is achieved, considering annual cost reductions.</p>
              </li>
              <li>
                <strong>Total Investment to AGI:</strong>
                <pre>I_AGI = C_AGI * Cost_AGI * (1 + R_funding)^T_AGI</pre>
                <p>This estimates the total investment needed to reach AGI, factoring in the AGI compute threshold, cost per FLOP/s at AGI, and increases in research funding.</p>
              </li>
              <li>
                <strong>Probability of Hitting Physical Limits:</strong>
                <pre>P_limits = 1 - exp(-λ * T_AGI)</pre>
                <p>This calculates the probability of hitting physical limits before reaching AGI, based on the time to AGI and a rate parameter.</p>
              </li>
            </ol>
            <p>For more information on AI compute efficiency and scaling laws, see:</p>
            <ul>
              <li><a href="https://arxiv.org/abs/2304.03172" target="_blank" className="link-primary" rel="noopener noreferrer">Flash-LLM: Enabling Low-Cost and Highly-Efficient Large Generative Model Inference With Unstructured Sparsity</a></li>
              <li><a href="https://arxiv.org/abs/2305.10206" target="_blank" className="link-primary" rel="noopener noreferrer">LLM in a flash: Efficient Large Language Model Inference with Limited Memory</a></li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header><GraphUp className="me-2" />Parameter Justifications</Accordion.Header>
          <Accordion.Body>
            <ul>
              <li><strong>AGI compute threshold (C_AGI):</strong> Based on median estimates from AI researchers, with a wide range of uncertainty. Influenced by factors like biological anchors and AI progress.</li>
              <li><strong>Current compute capability (C_current):</strong> Estimated based on requirements for large models like Meta's LLama 3.1. Can vary based on model architecture and purpose (inference vs. training).</li>
              <li><strong>Raw compute growth rate (R_raw):</strong> Historically doubling every 3.4 months, with recent trends suggesting a slight deceleration to 5-6 months.</li>
              <li><strong>Annual efficiency improvement rate (R_efficiency):</strong> Based on advancements in hardware, algorithms, and architectures. Improvements vary widely depending on the specific area.</li>
              <li><strong>Initial model size (S_0) and growth rate (R_size):</strong> Based on current large language models, with growth constrained by hardware limitations and a focus on efficiency.</li>
              <li><strong>Cost per FLOP/s (Cost_0) and reduction rate (R_cost):</strong> Estimates based on current high-performance GPUs and specialized AI hardware, with historical trends suggesting significant annual reductions.</li>
              <li><strong>Annual increase in AI research funding (R_funding):</strong> Estimated based on general research funding trends and the strategic importance of AI.</li>
              <li><strong>Ratio of training compute to inference compute (R_train_infer):</strong> Reflects the significantly higher compute requirements for training compared to inference.</li>
              <li><strong>Rate parameter for physical limits probability (lambda):</strong> Represents the uncertain but non-trivial chance of hitting physical limits before AGI.</li>
            </ul>
            <p>For more detailed information on AI hardware efficiency and costs, refer to:</p>
            <ul>
              <li><a href="https://ieeexplore.ieee.org/document/9892826" target="_blank" className="link-primary" rel="noopener noreferrer">A 1.041-Mb/mm2 27.38-TOPS/W Signed-INT8 Dynamic-Logic-Based ADC-less SRAM Compute-in-Memory Macro in 28nm</a></li>
              <li><a href="https://ieeexplore.ieee.org/document/10172646" target="_blank" className="link-primary" rel="noopener noreferrer">A General-Purpose Compute-in-Memory Processor Combining CPU and Deep Learning with Elevated CPU Efficiency and Enhanced Data Locality</a></li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default DocumentationComponent;