// Dashboard Header Component v1.0
import React from 'react';

const DashboardHeader = ({ zones }) => {
  const getZoneStats = () => {
    const predictions = Object.values(zones).filter(z => z.prediction);
    const high = predictions.filter(z => z.prediction?.risk_level === 'High').length;
    const medium = predictions.filter(z => z.prediction?.risk_level === 'Medium').length;
    const low = predictions.filter(z => z.prediction?.risk_level === 'Low').length;
    const pending = 5 - predictions.length;
    
    return { high, medium, low, pending };
  };

  const stats = getZoneStats();

  return (
    <div className="dashboard-header">
      <div className="header-content">
        <div className="header-title">
          <h1>🏔️ Rockfall Monitoring Dashboard</h1>
          <p>Real-time zone-wise risk assessment for slope stability</p>
        </div>
        
        <div className="stats-summary">
          <div className="stat-item high">
            <span className="stat-value">{stats.high}</span>
            <span className="stat-label">High Risk</span>
          </div>
          <div className="stat-item medium">
            <span className="stat-value">{stats.medium}</span>
            <span className="stat-label">Medium Risk</span>
          </div>
          <div className="stat-item low">
            <span className="stat-value">{stats.low}</span>
            <span className="stat-label">Low Risk</span>
          </div>
          <div className="stat-item pending">
            <span className="stat-value">{stats.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
