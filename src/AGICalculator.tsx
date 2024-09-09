import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { OverlayTrigger, Tooltip as BSTooltip, Button } from 'react-bootstrap';
import numeral from 'numeral';
import { initialParams } from './InitialParamsComponent';
import DocumentationComponent from './DocumentationComponent';
import ImprovedResults from './ImprovedResults';
import Header from './Header';
import { AGICalculations } from './AGICalculations';

interface Results {
  T_AGI: number;
  R_compute: number;
  Date_AGI?: Date;
  Date_PhysicalLimits?: Date;
  Date_ASI?: Date;
  S_AGI: number;
  Cost_AGI: number;
  I_AGI: number;
  P_limits: number;
}

const formatNumber = (num: number | undefined | null): string => {
  if (num === undefined || num === null) return 'N/A';
  if (isNaN(num)) return 'Error';
  if (num === 0) return '0';

  const absNum = Math.abs(num);
  if (absNum < 1e-9) return numeral(num).format('0.[000000000]e+0');
  if (absNum < 1) return numeral(num).format('0.[000000]');
  if (absNum < 1e15) return numeral(num).format('0,0.[00]a');
  return numeral(num).format('0.[00]e+0');
};

const AGICalculator: React.FC = () => {
  const [params, setParams] = useState(Object.fromEntries(Object.entries(initialParams).map(([k, v]) => [k, v.value])));
  const [results, setResults] = useState<Results>({
    T_AGI: 0,
    R_compute: 0,
    S_AGI: 0,
    Cost_AGI: 0,
    I_AGI: 0,
    P_limits: 0
  });
  const [enableNonLinearEfficiency, setEnableNonLinearEfficiency] = useState(false);
  const [enableFundingAcceleration, setEnableFundingAcceleration] = useState(false);
  const [enableSynergisticEffects, setEnableSynergisticEffects] = useState(false);

  useEffect(() => {
    console.log('Params changed:', params);
    console.log('enableNonLinearEfficiency:', enableNonLinearEfficiency);
    console.log('enableFundingAcceleration:', enableFundingAcceleration);
    console.log('enableSynergisticEffects:', enableSynergisticEffects);
  
    const calculator = new AGICalculations(params, enableNonLinearEfficiency, enableFundingAcceleration, enableSynergisticEffects);
    setResults(calculator.calculateResults());
  }, [params, enableNonLinearEfficiency, enableFundingAcceleration, enableSynergisticEffects]);
  

  const handleParamChange = (name: string, value: number) => {
    setParams(prev => ({ ...prev, [name]: value }));
  };

  const resetParams = () => {
    setParams(Object.fromEntries(Object.entries(initialParams).map(([k, v]) => [k, v.value])));
  };

  const setOptimisticScenario = () => {
    setParams({
      ...params,
      C_AGI: 1e34,
      C_current: 1e24,
      R_raw: 3.0,
      R_efficiency: 1.0,
      R_size: 1.0,
      R_cost: 0.5,
      R_funding: 0.4,
      lambda: 0.03,
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
    const years = Math.min(Math.ceil(results.T_AGI ?? 0), 100);

    const currentYear = new Date().getFullYear();
    for (let i = 0; i <= years; i++) {
      data.push({
        year: currentYear + i,
        compute: params.C_current * Math.pow(1 + (results.R_compute || 0), i),
      });
    }
    return data;
  };

  const parameterGroups = {
    computeCapabilities: {
      title: "Compute Capabilities",
      params: ["C_AGI", "C_current", "R_raw", "R_efficiency"]
    },
    modelCharacteristics: {
      title: "Model Characteristics",
      params: ["S_0", "R_size", "R_train_infer"]
    },
    economicFactors: {
      title: "Economic Factors",
      params: ["Cost_0", "R_cost", "R_funding"]
    },
    limitingFactors: {
      title: "Limiting Factors",
      params: ["lambda"]
    }
  };

  return (
    <div className="container-fluid mt-2">
      <Header />

      <div className="row mb-3">
        <div className="col-md-12">
          <h2 className="h5 mb-2">Scenarios</h2>
          <Button variant="success" onClick={setOptimisticScenario} className="me-2">Optimistic</Button>
          <Button variant="danger" onClick={setPessimisticScenario} className="me-2">Pessimistic</Button>
          <Button variant="secondary" onClick={resetParams}>Reset to Default</Button>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={enableNonLinearEfficiency}
              onChange={(e) => setEnableNonLinearEfficiency(e.target.checked)}
              id="nonLinearEfficiency"
            />
            <label className="form-check-label" htmlFor="nonLinearEfficiency">
              Enable Non-linear Efficiency Gains
            </label>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={enableFundingAcceleration}
              onChange={(e) => setEnableFundingAcceleration(e.target.checked)}
              id="fundingAcceleration"
            />
            <label className="form-check-label" htmlFor="fundingAcceleration">
              Enable Funding Acceleration
            </label>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={enableSynergisticEffects}
              onChange={(e) => setEnableSynergisticEffects(e.target.checked)}
              id="synergisticEffects"
            />
            <label className="form-check-label" htmlFor="synergisticEffects">
              Enable Synergistic Effects
            </label>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <h2 className="h5 mb-2">Input Parameters</h2>
          <div className="border p-2 rounded" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {Object.entries(parameterGroups).map(([groupKey, group]) => (
              <div key={groupKey} className="mb-3">
                <h3 className="h6 mb-2">{group.title}</h3>
                {group.params.map(key => {
                  const { name, value: defaultValue, description } = initialParams[key as keyof typeof initialParams];
                  return (
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
                          style={{ width: '100px' }}
                          value={params[key]}
                          onChange={(e) => handleParamChange(key, parseFloat(e.target.value))}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <ImprovedResults results={results} formatNumber={formatNumber} />
        </div>
      </div>
      <div className="mt-3">
        <h2 className="h5 mb-2">Compute Growth Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={generateGraphData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis scale="log" domain={['auto', 'auto']} tickFormatter={formatNumber} />
            <Tooltip formatter={(value) => formatNumber(Number(value))} />
            <Legend />
            <Line type="monotone" dataKey="compute" stroke="#0d6efd" name="Compute (FLOP/s)" />
            <ReferenceLine y={3e16} stroke="green" label={{ value: 'Human Brain (30 PFLOP/s)', position: 'left' }} />
            {isFinite(results.T_AGI) && results.Date_AGI && (
              <ReferenceLine
                x={results.Date_AGI.getFullYear()}
                stroke="#dc3545"
                label={{ value: 'Estimated AGI', position: 'top' }}
              />
            )}
            {isFinite(results.T_AGI) && results.Date_PhysicalLimits && (
              <ReferenceLine
                x={results.Date_PhysicalLimits.getFullYear()}
                stroke="#ffc107"
                label={{ value: 'Physical Limits', position: 'top' }}
              />
            )}
            {isFinite(results.T_AGI) && results.Date_ASI && (
              <ReferenceLine
                x={results.Date_ASI.getFullYear()}
                stroke="#6f42c1"
                label={{ value: 'Estimated ASI', position: 'top' }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <DocumentationComponent />
    </div>
  );
};

export default AGICalculator;