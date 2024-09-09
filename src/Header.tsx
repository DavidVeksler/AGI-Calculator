import React from 'react';

const Header: React.FC = () => {
  return (
    <header>
      <div className="ai-progress-calculator-intro bg-gradient bg-primary text-white p-4 rounded-lg shadow-lg mb-5">
        <div className="container">
          <h1 className="display-4 mb-4 text-center">
            <span className="fa-stack fa-lg me-3">
              <i className="fas fa-circle fa-stack-2x text-warning"></i>
              <i className="fas fa-robot fa-stack-1x text-primary"></i>
            </span>
            AI Progress Calculator
          </h1>
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card bg-white text-dark p-4 shadow">
                <h2 className="h4 mb-3 text-primary">Explore the Future of AI</h2>
                <p className="lead">
                Using a simplified model based on current AI trends, compute growth, and various economic factors, this calculator estimates when we might achieve these significant milestones in AI development. Are you ready to peek into the future of artificial intelligence?
                </p>
                
                <div className="text-center mt-4">
                  <button className="btn btn-outline-primary btn-lg">
                    <i className="fas fa-calculator me-2"></i>
                    Start Calculating
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;