import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { OverlayTrigger, Tooltip as BSTooltip, Button } from 'react-bootstrap';
import numeral from 'numeral';

const initialParams = {
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

const formatNumber = (num) => {
  if (num === undefined || num === null) return 'N/A';
  if (isNaN(num)) return 'Error';
  if (num === 0) return '0';
  
  const absNum = Math.abs(num);
  if (absNum < 1e-9) return numeral(num).format('0.[000000000]e+0');
  if (absNum < 1) return numeral(num).format('0.[000000]');
  if (absNum < 1e15) return numeral(num).format('0,0.[00]a');
  return numeral(num).format('0.[00]e+0');
};

const AGICalculator = () => {
  const [params, setParams] = useState(Object.fromEntries(Object.entries(initialParams).map(([k, v]) => [k, v.value])));
  const [results, setResults] = useState({});

  const calculateResults = () => {
    const R_compute = (1 + params.R_raw) * (1 + params.R_efficiency) - 1;
    
    let T_AGI, S_AGI, Cost_AGI, I_AGI, P_limits, Date_AGI;

    if (R_compute <= 0 || params.C_AGI <= params.C_current) {
      T_AGI = Infinity;
    } else {
      T_AGI = Math.log(params.C_AGI / params.C_current) / Math.log(1 + R_compute);
    }

    if (isFinite(T_AGI)) {
      S_AGI = params.S_0 * Math.pow(1 + params.R_size, T_AGI);
      Cost_AGI = params.Cost_0 * Math.pow(1 - params.R_cost, T_AGI);
      I_AGI = params.C_AGI * Cost_AGI * Math.pow(1 + params.R_funding, T_AGI);
      P_limits = 1 - Math.exp(-params.lambda * T_AGI);
      Date_AGI = new Date(Date.now() + T_AGI * 365 * 24 * 60 * 60 * 1000);
    } else {
      S_AGI = Cost_AGI = I_AGI = P_limits = Infinity;
      Date_AGI = new Date(8640000000000000);
    }

    setResults({ R_compute, T_AGI, S_AGI, Cost_AGI, I_AGI, P_limits, Date_AGI });
  };

  useEffect(calculateResults, [params]);

  const handleParamChange = (name, value) => {
    setParams(prev => ({ ...prev, [name]: value }));
  };

  const resetParams = () => {
    setParams(Object.fromEntries(Object.entries(initialParams).map(([k, v]) => [k, v.value])));
  };

  const setOptimisticScenario = () => {
    setParams({
      ...params,
      C_AGI: 1e34, // Lowered AGI threshold
      C_current: 1e24, // Increased current capability
      R_raw: 3.0, // Higher raw growth rate
      R_efficiency: 1.0, // Higher efficiency improvement
      R_size: 1.0, // Faster model size growth
      R_cost: 0.5, // Faster cost reduction
      R_funding: 0.4, // Higher funding increase
      lambda: 0.03, // Lower probability of hitting limits
    });
  };

  const setPessimisticScenario = () => {
    setParams({
      ...params,
      C_AGI: 5e35,
      C_current: 5e22,
      R_raw: 1.5,
      R_efficiency: 0.3,
      R_size: 0.3,
      R_cost: 0.2,
      R_funding: 0.1,
      lambda: 0.15,
    });
  };

  const generateGraphData = () => {
    const data = [];
    const years = Math.min(Math.ceil(results.T_AGI) || 0, 100);
    for (let i = 0; i <= years; i++) {
      data.push({
        year: new Date().getFullYear() + i,
        compute: params.C_current * Math.pow(1 + (results.R_compute || 0), i),
      });
    }
    return data;
  };

  return (
    <div className="container-fluid mt-2">
      <h1 className="h3 mb-3">AI Progress Calculator</h1>
      <div className="row mb-3">
        <div className="col-md-12">
          <h2 className="h5 mb-2">Scenarios</h2>
          <Button variant="success" onClick={setOptimisticScenario} className="me-2">Optimistic</Button>
          <Button variant="danger" onClick={setPessimisticScenario} className="me-2">Pessimistic</Button>
          <Button variant="secondary" onClick={resetParams}>Reset to Default</Button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h2 className="h5 mb-2">Input Parameters</h2>
          <div className="border p-2 rounded" style={{maxHeight: '400px', overflowY: 'auto'}}>
            {Object.entries(initialParams).map(([key, { name, value: defaultValue, description }]) => (
              <div key={key} className="mb-1">
                <OverlayTrigger
                  placement="right"
                  overlay={<BSTooltip id={`tooltip-${key}`}>{description}</BSTooltip>}
                >
                  <label className="form-label mb-0 small">
                    {name} <span className="text-muted">(Default: {formatNumber(defaultValue)})</span>
                  </label>
                </OverlayTrigger>
                <div className="input-group input-group-sm">
                  <input
                    type="range"
                    className="form-range"
                    min={0}
                    max={key === 'C_AGI' || key === 'C_current' ? 1e40 : key === 'Cost_0' ? 1 : 10}
                    step={key === 'Cost_0' ? 1e-12 : 0.01}
                    value={params[key]}
                    onChange={(e) => handleParamChange(key, parseFloat(e.target.value))}
                  />
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    style={{width: '100px'}}
                    value={params[key]}
                    onChange={(e) => handleParamChange(key, parseFloat(e.target.value))}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <h2 className="h5 mb-2">Results</h2>
          <ul className="list-group">
            <li className="list-group-item py-1 d-flex justify-content-between align-items-center">
              <span className="small">Effective Compute Growth Rate</span>
              <span className="badge bg-primary rounded-pill">{results.R_compute?.toFixed(2) || 'N/A'}</span>
            </li>
            <li className="list-group-item py-1 d-flex justify-content-between align-items-center">
              <span className="small">Time to AGI Compute Threshold</span>
              <span className="badge bg-primary rounded-pill">{isFinite(results.T_AGI) ? `${results.T_AGI.toFixed(2)} years` : 'Never'}</span>
            </li>
            <li className="list-group-item py-1 d-flex justify-content-between align-items-center">
              <span className="small">Model Size at AGI</span>
              <span className="badge bg-primary rounded-pill">{formatNumber(results.S_AGI)} parameters</span>
            </li>
            <li className="list-group-item py-1 d-flex justify-content-between align-items-center">
              <span className="small">Cost per FLOP/s at AGI</span>
              <span className="badge bg-primary rounded-pill">${formatNumber(results.Cost_AGI)}</span>
            </li>
            <li className="list-group-item py-1 d-flex justify-content-between align-items-center">
              <span className="small">Total Investment to AGI</span>
              <span className="badge bg-primary rounded-pill">${formatNumber(results.I_AGI)}</span>
            </li>
            <li className="list-group-item py-1 d-flex justify-content-between align-items-center">
              <span className="small">Probability of Hitting Physical Limits</span>
              <span className="badge bg-primary rounded-pill">{isFinite(results.P_limits) ? `${(results.P_limits * 100).toFixed(2)}%` : 'N/A'}</span>
            </li>
            <li className="list-group-item py-1 d-flex justify-content-between align-items-center">
              <span className="small">Estimated AGI Date</span>
              <span className="badge bg-primary rounded-pill">{results.Date_AGI?.toLocaleDateString() === '1/1/275760' ? 'Never' : results.Date_AGI?.toLocaleDateString() || 'N/A'}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-3">
        <h2 className="h5 mb-2">Compute Growth Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={generateGraphData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis scale="log" domain={['auto', 'auto']} tickFormatter={formatNumber} />
            <Tooltip formatter={(value) => formatNumber(value)} />
            <Legend />
            <Line type="monotone" dataKey="compute" stroke="#0d6efd" name="Compute (FLOP/s)" />
            {isFinite(results.T_AGI) && results.Date_AGI && (
              <ReferenceLine
                x={results.Date_AGI.getFullYear()}
                stroke="#dc3545"
                label={{ value: 'Estimated AGI', position: 'top' }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AGICalculator;