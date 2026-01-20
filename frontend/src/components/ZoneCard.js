import React from 'react';

const ZoneCard = ({ 
  zoneId, 
  zoneName, 
  expanded, 
  formData, 
  prediction, 
  loading, 
  onToggle, 
  onInputChange, 
  onPredict 
}) => {
  const getRiskColor = (level) => {
    switch(level) {
      case 'Low': return '#10b981';
      case 'Medium': return '#f59e0b';
      case 'High': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getRiskIcon = (level) => {
    switch(level) {
      case 'Low': return '✅';
      case 'Medium': return '⚠️';
      case 'High': return '🚨';
      default: return '❓';
    }
  };

  return (
    <div className={`zone-card ${expanded ? 'expanded' : ''}`}>
      {/* Zone Header - Always Visible */}
      <div className="zone-header" onClick={onToggle}>
        <div className="zone-title">
          <span className="zone-icon">📍</span>
          <h3>{zoneName}</h3>
          <span className={`expand-icon ${expanded ? 'rotated' : ''}`}>▼</span>
        </div>
        
        {/* Mini Risk Badge - Visible when collapsed */}
        {prediction && (
          <div 
            className="mini-risk-badge"
            style={{ backgroundColor: getRiskColor(prediction.risk_level) }}
          >
            {getRiskIcon(prediction.risk_level)} {prediction.risk_level} Risk
            <span className="confidence-mini">({prediction.confidence}%)</span>
          </div>
        )}
        {!prediction && (
          <div className="mini-risk-badge pending">
            ⏳ No Prediction
          </div>
        )}
      </div>

      {/* Collapsible Content */}
      <div className={`zone-content ${expanded ? 'show' : ''}`}>
        <form className="zone-form" onSubmit={(e) => { e.preventDefault(); onPredict(); }}>
          <div className="form-grid">
            <div className="input-group">
              <label>Temperature (°C)</label>
              <input
                type="number"
                name="temperature_c"
                value={formData.temperature_c}
                onChange={(e) => onInputChange(zoneId, e)}
                placeholder="-20 to 50"
                min="-20"
                max="50"
                step="0.1"
                required
              />
            </div>

            <div className="input-group">
              <label>Humidity (%)</label>
              <input
                type="number"
                name="humidity_pct"
                value={formData.humidity_pct}
                onChange={(e) => onInputChange(zoneId, e)}
                placeholder="0 - 100"
                min="0"
                max="100"
                step="0.1"
                required
              />
            </div>

            <div className="input-group">
              <label>Wind Speed (m/s)</label>
              <input
                type="number"
                name="wind_speed"
                value={formData.wind_speed}
                onChange={(e) => onInputChange(zoneId, e)}
                placeholder="0 - 50"
                min="0"
                max="50"
                step="0.1"
                required
              />
            </div>

            <div className="input-group">
              <label>Rain Condition</label>
              <select
                name="rain_flag"
                value={formData.rain_flag}
                onChange={(e) => onInputChange(zoneId, e)}
                required
              >
                <option value="0">No Rain</option>
                <option value="1">Raining</option>
              </select>
            </div>

            <div className="input-group">
              <label>Slope Angle (°)</label>
              <input
                type="number"
                name="slope_angle_deg"
                value={formData.slope_angle_deg}
                onChange={(e) => onInputChange(zoneId, e)}
                placeholder="0 - 90"
                min="0"
                max="90"
                step="0.1"
                required
              />
            </div>

            <div className="input-group">
              <label>Slope Height (m)</label>
              <input
                type="number"
                name="slope_height_m"
                value={formData.slope_height_m}
                onChange={(e) => onInputChange(zoneId, e)}
                placeholder="0 - 500"
                min="0"
                max="500"
                step="0.1"
                required
              />
            </div>

            <div className="input-group full-width">
              <label>Pore Water Pressure Ratio</label>
              <input
                type="number"
                name="pore_water_pressure_ratio"
                value={formData.pore_water_pressure_ratio}
                onChange={(e) => onInputChange(zoneId, e)}
                placeholder="0 - 1"
                min="0"
                max="1"
                step="0.01"
                required
              />
            </div>
          </div>

          <button type="submit" className="predict-btn" disabled={loading}>
            {loading ? '🔄 Analyzing...' : '🔍 Predict Risk'}
          </button>
        </form>

        {/* Detailed Prediction Result */}
        {prediction && (
          <div className="prediction-result">
            <div 
              className="risk-badge-large"
              style={{ backgroundColor: getRiskColor(prediction.risk_level) }}
            >
              {getRiskIcon(prediction.risk_level)} {prediction.risk_level} Risk
            </div>
            
            <p className="risk-message">{prediction.message}</p>
            
            <div className="probability-bars">
              <div className="prob-item">
                <span className="prob-label">Low</span>
                <div className="prob-bar">
                  <div 
                    className="prob-fill low" 
                    style={{ width: `${prediction.probabilities.low}%` }}
                  ></div>
                </div>
                <span className="prob-value">{prediction.probabilities.low}%</span>
              </div>
              <div className="prob-item">
                <span className="prob-label">Medium</span>
                <div className="prob-bar">
                  <div 
                    className="prob-fill medium" 
                    style={{ width: `${prediction.probabilities.medium}%` }}
                  ></div>
                </div>
                <span className="prob-value">{prediction.probabilities.medium}%</span>
              </div>
              <div className="prob-item">
                <span className="prob-label">High</span>
                <div className="prob-bar">
                  <div 
                    className="prob-fill high" 
                    style={{ width: `${prediction.probabilities.high}%` }}
                  ></div>
                </div>
                <span className="prob-value">{prediction.probabilities.high}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZoneCard;
