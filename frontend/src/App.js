// Rockfall Dashboard Main App v1.0
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ZoneCard from './components/ZoneCard';
import DashboardHeader from './components/DashboardHeader';
import './App.css';

const API_URL = 'http://localhost:3000/api';

// Zone configuration
const ZONE_CONFIG = {
  A: { name: 'Zone A - Northern Slope', color: '#6366f1' },
  B: { name: 'Zone B - Eastern Ridge', color: '#8b5cf6' },
  C: { name: 'Zone C - Central Valley', color: '#ec4899' },
  D: { name: 'Zone D - Western Face', color: '#f59e0b' },
  E: { name: 'Zone E - Southern Peak', color: '#10b981' }
};

// Initial form data template
const getInitialFormData = () => ({
  temperature_c: '',
  humidity_pct: '',
  wind_speed: '',
  rain_flag: '0',
  slope_angle_deg: '',
  slope_height_m: '',
  pore_water_pressure_ratio: ''
});

// Initialize all zones
const initializeZones = () => {
  const zones = {};
  Object.keys(ZONE_CONFIG).forEach(zoneId => {
    zones[zoneId] = {
      expanded: zoneId === 'A', // Only first zone expanded by default
      formData: getInitialFormData(),
      prediction: null,
      loading: false,
      error: null
    };
  });
  return zones;
};

function App() {
  // Zone-wise state structure
  const [zones, setZones] = useState(initializeZones());
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load history from MongoDB on mount and restore zone predictions
  useEffect(() => {
    loadHistory();
    loadZonePredictions();
  }, []);

  // Load last prediction for each zone from database
  const loadZonePredictions = async () => {
    try {
      const response = await axios.get(`${API_URL}/history?limit=50`);
      if (response.data.success) {
        const historyData = response.data.data;
        
        // Group by zone and get the latest prediction for each
        const zoneLatest = {};
        historyData.forEach(item => {
          const zoneName = item.zone || 'Default Zone';
          // Find matching zone ID
          Object.keys(ZONE_CONFIG).forEach(zoneId => {
            if (ZONE_CONFIG[zoneId].name === zoneName && !zoneLatest[zoneId]) {
              zoneLatest[zoneId] = item;
            }
          });
        });

        // Update zones with their last predictions
        setZones(prev => {
          const newZones = { ...prev };
          Object.keys(zoneLatest).forEach(zoneId => {
            const item = zoneLatest[zoneId];
            newZones[zoneId] = {
              ...newZones[zoneId],
              formData: {
                temperature_c: item.input.temperature_c?.toString() || '',
                humidity_pct: item.input.humidity_pct?.toString() || '',
                wind_speed: item.input.wind_speed?.toString() || '',
                rain_flag: item.input.rain_flag?.toString() || '0',
                slope_angle_deg: item.input.slope_angle_deg?.toString() || '',
                slope_height_m: item.input.slope_height_m?.toString() || '',
                pore_water_pressure_ratio: item.input.pore_water_pressure_ratio?.toString() || ''
              },
              prediction: {
                risk_level: item.result.risk_level,
                confidence: item.result.probability || item.result.confidence || 0,
                probabilities: item.result.probabilities || null,
                message: item.result.message
              }
            };
          });
          return newZones;
        });
        console.log('✅ Restored predictions for zones:', Object.keys(zoneLatest));
      }
    } catch (err) {
      console.error('Failed to load zone predictions:', err);
    }
  };

  const loadHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/history?limit=20`);
      if (response.data.success) {
        setHistory(response.data.data);
      }
    } catch (err) {
      console.error('Failed to load history:', err);
    }
  };

  // Toggle zone expansion (collapse others)
  const handleToggleZone = (zoneId) => {
    setZones(prev => {
      const newZones = { ...prev };
      // Toggle clicked zone, collapse others
      Object.keys(newZones).forEach(id => {
        newZones[id] = {
          ...newZones[id],
          expanded: id === zoneId ? !newZones[id].expanded : false
        };
      });
      return newZones;
    });
  };

  // Handle input change for specific zone
  const handleInputChange = (zoneId, e) => {
    const { name, value } = e.target;
    setZones(prev => ({
      ...prev,
      [zoneId]: {
        ...prev[zoneId],
        formData: {
          ...prev[zoneId].formData,
          [name]: value
        },
        error: null
      }
    }));
  };

  // Handle prediction for specific zone
  const handlePredict = async (zoneId) => {
    const zone = zones[zoneId];
    
    // Set loading state for this zone only
    setZones(prev => ({
      ...prev,
      [zoneId]: { ...prev[zoneId], loading: true, error: null }
    }));

    try {
      const response = await axios.post(`${API_URL}/predict`, {
        temperature_c: parseFloat(zone.formData.temperature_c),
        humidity_pct: parseFloat(zone.formData.humidity_pct),
        wind_speed: parseFloat(zone.formData.wind_speed),
        rain_flag: parseInt(zone.formData.rain_flag),
        slope_angle_deg: parseFloat(zone.formData.slope_angle_deg),
        slope_height_m: parseFloat(zone.formData.slope_height_m),
        pore_water_pressure_ratio: parseFloat(zone.formData.pore_water_pressure_ratio),
        zone: ZONE_CONFIG[zoneId].name
      });

      // Update only this zone's prediction
      setZones(prev => ({
        ...prev,
        [zoneId]: {
          ...prev[zoneId],
          prediction: response.data.data,
          loading: false,
          error: null
        }
      }));

      // Reload history after new prediction
      loadHistory();
    } catch (err) {
      setZones(prev => ({
        ...prev,
        [zoneId]: {
          ...prev[zoneId],
          loading: false,
          error: err.response?.data?.error || 'Prediction failed. Check if backend is running.'
        }
      }));
    }
  };

  const getRiskColor = (level) => {
    switch(level) {
      case 'Low': return '#10b981';
      case 'Medium': return '#f59e0b';
      case 'High': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="dashboard-app">
      <DashboardHeader zones={zones} />
      
      <div className="dashboard-container">
        {/* History Toggle Button */}
        <div className="history-toggle">
          <button 
            className="history-btn"
            onClick={() => setShowHistory(!showHistory)}
          >
            📊 {showHistory ? 'Hide History' : 'Show History'} ({history.length})
          </button>
        </div>

        {/* History Panel */}
        {showHistory && history.length > 0 && (
          <div className="history-panel">
            <h3>📜 Recent Predictions (from MongoDB)</h3>
            <div className="history-list">
              {history.map((item, index) => (
                <div key={item._id || index} className="history-item">
                  <div className="history-risk" style={{ backgroundColor: getRiskColor(item.result?.risk_level) }}>
                    {item.result?.risk_level || 'N/A'}
                  </div>
                  <div className="history-details">
                    <span className="history-zone">{item.zone || 'Unknown Zone'}</span>
                    <span className="history-time">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="history-confidence">
                    {item.result?.confidence?.toFixed(1)}% confident
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="zones-grid">
          {Object.entries(ZONE_CONFIG).map(([zoneId, config]) => (
            <ZoneCard
              key={zoneId}
              zoneId={zoneId}
              zoneName={config.name}
              expanded={zones[zoneId].expanded}
              formData={zones[zoneId].formData}
              prediction={zones[zoneId].prediction}
              loading={zones[zoneId].loading}
              error={zones[zoneId].error}
              onToggle={() => handleToggleZone(zoneId)}
              onInputChange={handleInputChange}
              onPredict={() => handlePredict(zoneId)}
            />
          ))}
        </div>

        {/* Global Error Display */}
        {Object.entries(zones).some(([_, z]) => z.error) && (
          <div className="global-errors">
            {Object.entries(zones).map(([id, z]) => 
              z.error && (
                <div key={id} className="error-toast">
                  ❌ {ZONE_CONFIG[id].name}: {z.error}
                </div>
              )
            )}
          </div>
        )}
      </div>

      <footer className="dashboard-footer">
        <p>🔬 Powered by Python ML + Node.js + React + MongoDB | Hackathon 2026</p>
      </footer>
    </div>
  );
}

export default App;
