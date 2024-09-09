import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { 
  ClockFill, 
  Github,
  CashStack, 
  GraphUp, 
  ExclamationTriangleFill,
  CalendarCheckFill,
  RocketTakeoffFill,
  GlobeAmericas
} from 'react-bootstrap-icons';

interface ResultCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, value, icon: Icon, color }) => (
  <Card className="h-100 shadow-sm">
    <Card.Body className="d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0 text-muted">{title}</h6>
        <Icon size={24} color={color} />
      </div>
      <div className="mt-auto">
        <h4 className="mb-0 fw-bold">{value}</h4>
      </div>
    </Card.Body>
  </Card>
);

interface Results {
  R_compute?: number;
  T_AGI: number;
  S_AGI: number;
  Cost_AGI: number;
  I_AGI: number;
  P_limits: number;
  Date_AGI?: Date;
  Date_ASI?: Date;
  Date_PhysicalLimits?: Date;
}

interface ImprovedResultsProps {
  results: Results;
  formatNumber: (num: number) => string;
}

const ImprovedResults: React.FC<ImprovedResultsProps> = ({ results, formatNumber }) => (
  <div className="improved-results">
    <h2 className="h4 mb-3">Results</h2>
    <Row xs={1} md={2} lg={4} className="g-4">
      <Col>
        <ResultCard
          title="Effective Compute Growth Rate"
          value={`${results.R_compute?.toFixed(2) || 'N/A'}`}
          icon={GraphUp}
          color="#0d6efd"
        />
      </Col>
      <Col>
        <ResultCard
          title="Time to AGI Compute Threshold"
          value={isFinite(results.T_AGI) ? `${results.T_AGI.toFixed(2)} years` : 'Never'}
          icon={ClockFill}
          color="#6610f2"
        />
      </Col>
      <Col>
        <ResultCard
          title="Model Size at AGI"
          value={`${formatNumber(results.S_AGI)} parameters`}
          icon={Github}
          color="#6f42c1"
        />
      </Col>
      <Col>
        <ResultCard
          title="Cost per FLOP/s at AGI"
          value={`$${formatNumber(results.Cost_AGI)}`}
          icon={CashStack}
          color="#198754"
        />
      </Col>
      <Col>
        <ResultCard
          title="Total Investment to AGI"
          value={`$${formatNumber(results.I_AGI)}`}
          icon={CashStack}
          color="#20c997"
        />
      </Col>
      <Col>
        <ResultCard
          title="Probability of Hitting Physical Limits"
          value={isFinite(results.P_limits) ? `${(results.P_limits * 100).toFixed(2)}%` : 'N/A'}
          icon={ExclamationTriangleFill}
          color="#ffc107"
        />
      </Col>
      <Col>
        <ResultCard
          title="Estimated AGI Date"
          value={results.Date_AGI?.toLocaleDateString() === '1/1/275760' ? 'Never' : results.Date_AGI?.toLocaleDateString() || 'N/A'}
          icon={CalendarCheckFill}
          color="#0dcaf0"
        />
      </Col>
      <Col>
        <ResultCard
          title="Estimated ASI Date"
          value={results.Date_ASI?.toLocaleDateString() === '1/1/275760' ? 'Never' : results.Date_ASI?.toLocaleDateString() || 'N/A'}
          icon={RocketTakeoffFill}
          color="#d63384"
        />
      </Col>
      <Col>
        <ResultCard
          title="Estimated Date of Physical Limits"
          value={results.Date_PhysicalLimits?.toLocaleDateString() === '1/1/275760' ? 'Never' : results.Date_PhysicalLimits?.toLocaleDateString() || 'N/A'}
          icon={GlobeAmericas}
          color="#fd7e14"
        />
      </Col>
    </Row>
  </div>
);

export default ImprovedResults;