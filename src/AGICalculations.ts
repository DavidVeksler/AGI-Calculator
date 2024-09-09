export class AGICalculations {
    private params: any;
    private enableNonLinearEfficiency: boolean;
    private enableFundingAcceleration: boolean;
    private enableSynergisticEffects: boolean;
  
    constructor(params: any, enableNonLinearEfficiency: boolean, enableFundingAcceleration: boolean, enableSynergisticEffects: boolean) {
      this.params = params;
      this.enableNonLinearEfficiency = enableNonLinearEfficiency;
      this.enableFundingAcceleration = enableFundingAcceleration;
      this.enableSynergisticEffects = enableSynergisticEffects;
    }
  
    calculateResults() {
      let T_AGI = 0;
      let currentCompute = this.params.C_current;
      let currentFunding = 1; // Starting with a normalized funding of 1
      let cumulativeEfficiency = 1;
  
      while (currentCompute < this.params.C_AGI && T_AGI < 100) { // Cap at 100 years for safety
        T_AGI += 1/12; // Increment by one month
  
        // Non-linear Efficiency Gains
        let efficiencyGain = this.params.R_efficiency;
        if (this.enableNonLinearEfficiency) {
          efficiencyGain *= Math.pow(1 + T_AGI / 10, 2); // Accelerating efficiency gains
        }
        cumulativeEfficiency *= (1 + efficiencyGain);
  
        // Funding Acceleration
        let fundingGrowth = this.params.R_funding;
        if (this.enableFundingAcceleration) {
          fundingGrowth *= Math.pow(currentCompute / this.params.C_AGI, 0.5); // Funding increases as we get closer to AGI
        }
        currentFunding *= (1 + fundingGrowth);
  
        // Compute Growth
        let computeGrowth = Math.pow(1 + this.params.R_raw, 1/12); // Monthly growth rate
        if (this.enableSynergisticEffects) {
          computeGrowth *= Math.pow(cumulativeEfficiency, 0.1); // Efficiency boosts compute growth
        }
        currentCompute *= computeGrowth * cumulativeEfficiency * Math.pow(currentFunding, 0.2);
      }
  
      const R_compute = Math.pow(this.params.C_AGI / this.params.C_current, 1/T_AGI) - 1;
      const S_AGI = this.params.S_0 * Math.pow(1 + this.params.R_size, T_AGI);
      const Cost_AGI = this.params.Cost_0 * Math.pow(1 - this.params.R_cost, T_AGI);
      const I_AGI = this.params.C_AGI * Cost_AGI * currentFunding;
      const P_limits = 1 - Math.exp(-this.params.lambda * T_AGI);
      const Date_AGI = new Date(Date.now() + T_AGI * 365 * 24 * 60 * 60 * 1000);
      const T_PhysicalLimits = -Math.log(0.01) / this.params.lambda;
      const Date_PhysicalLimits = new Date(Date.now() + T_PhysicalLimits * 365 * 24 * 60 * 60 * 1000);
      const T_ASI = T_AGI + Math.log(1e6) / Math.log(1 + R_compute);
      const Date_ASI = new Date(Date.now() + T_ASI * 365 * 24 * 60 * 60 * 1000);
  
      return { R_compute, T_AGI, S_AGI, Cost_AGI, I_AGI, P_limits, Date_AGI, Date_PhysicalLimits, Date_ASI };
    }
  }