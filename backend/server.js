// Rockfall Backend Server v1.0
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const connectDB = require('./config/database');
const Prediction = require('./models/Prediction');

const app = express();
const PORT = process.env.PORT || 3000;
const PYTHON_API_URL = process.env.PYTHON_API_URL || 'http://localhost:5000';

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    // Check if Python API is running
    const pythonHealth = await axios.get(`${PYTHON_API_URL}/health`);
    res.json({
      status: 'healthy',
      backend: 'online',
      pythonML: pythonHealth.data
    });
  } catch (error) {
    res.status(503).json({
      status: 'degraded',
      backend: 'online',
      pythonML: 'offline',
      error: 'Python ML service unavailable'
    });
  }
});

// Predict rockfall risk (Bridge to Python API)
app.post('/api/predict', async (req, res) => {
  try {
    const { 
      temperature_c, 
      humidity_pct, 
      wind_speed, 
      rain_flag, 
      slope_angle_deg, 
      slope_height_m, 
      pore_water_pressure_ratio 
    } = req.body;

    // Validate input
    const requiredFields = [
      'temperature_c', 'humidity_pct', 'wind_speed', 'rain_flag',
      'slope_angle_deg', 'slope_height_m', 'pore_water_pressure_ratio'
    ];
    
    for (const field of requiredFields) {
      if (req.body[field] === undefined) {
        return res.status(400).json({
          error: `Missing required field: ${field}`
        });
      }
    }

    // Forward request to Python ML service
    console.log(`📡 Forwarding prediction request to Python API...`);
    const pythonResponse = await axios.post(`${PYTHON_API_URL}/predict`, {
      temperature_c: parseFloat(temperature_c),
      humidity_pct: parseFloat(humidity_pct),
      wind_speed: parseFloat(wind_speed),
      rain_flag: parseInt(rain_flag),
      slope_angle_deg: parseFloat(slope_angle_deg),
      slope_height_m: parseFloat(slope_height_m),
      pore_water_pressure_ratio: parseFloat(pore_water_pressure_ratio)
    });

    // Return prediction results
    console.log(`✅ Prediction received: ${pythonResponse.data.risk_level}`);
    
    // Save prediction to MongoDB
    try {
      const prediction = new Prediction({
        input: {
          temperature_c: parseFloat(temperature_c),
          humidity_pct: parseFloat(humidity_pct),
          wind_speed: parseFloat(wind_speed),
          rain_flag: parseInt(rain_flag),
          slope_angle_deg: parseFloat(slope_angle_deg),
          slope_height_m: parseFloat(slope_height_m),
          pore_water_pressure_ratio: parseFloat(pore_water_pressure_ratio)
        },
        result: pythonResponse.data,
        zone: req.body.zone || 'Default Zone'
      });
      await prediction.save();
      console.log(`💾 Prediction saved to database`);
    } catch (dbError) {
      console.warn('⚠️ Could not save to database:', dbError.message);
    }

    res.json({
      success: true,
      data: pythonResponse.data,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Prediction error:', error.message);
    
    if (error.response) {
      // Python API returned an error
      return res.status(error.response.status).json({
        error: error.response.data.error || 'Prediction failed',
        details: error.response.data
      });
    }
    
    // Python API is not reachable
    res.status(503).json({
      error: 'Python ML service unavailable',
      message: 'Please ensure the Flask API is running on port 5000'
    });
  }
});

// Get prediction history
app.get('/api/history', async (req, res) => {
  try {
    const { limit = 50, risk_level, zone } = req.query;
    
    // Build query filter
    const filter = {};
    if (risk_level) filter['result.risk_level'] = risk_level;
    if (zone) filter.zone = zone;
    
    const predictions = await Prediction.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));
    
    res.json({
      success: true,
      count: predictions.length,
      data: predictions
    });
  } catch (error) {
    console.error('❌ History error:', error.message);
    res.status(500).json({
      error: 'Failed to fetch prediction history',
      message: error.message
    });
  }
});

// Get statistics
app.get('/api/stats', async (req, res) => {
  try {
    const totalPredictions = await Prediction.countDocuments();
    const riskCounts = await Prediction.aggregate([
      { $group: { _id: '$result.risk_level', count: { $sum: 1 } } }
    ]);
    
    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentPredictions = await Prediction.countDocuments({
      createdAt: { $gte: last24h }
    });
    
    res.json({
      success: true,
      data: {
        totalPredictions,
        recentPredictions,
        riskDistribution: riskCounts.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {})
      }
    });
  } catch (error) {
    console.error('❌ Stats error:', error.message);
    res.status(500).json({
      error: 'Failed to fetch statistics',
      message: error.message
    });
  }
});

// Delete a prediction
app.delete('/api/history/:id', async (req, res) => {
  try {
    const prediction = await Prediction.findByIdAndDelete(req.params.id);
    if (!prediction) {
      return res.status(404).json({ error: 'Prediction not found' });
    }
    res.json({ success: true, message: 'Prediction deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete prediction' });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Rockfall Prediction API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      predict: 'POST /api/predict',
      history: 'GET /api/history'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Express backend running on http://localhost:${PORT}`);
  console.log(`📡 Python ML API: ${PYTHON_API_URL}`);
  console.log(`🗄️  MongoDB: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/rockfall_db'}`);
  console.log(`\n📌 API Endpoints:`);
  console.log(`   - Health:  GET  /api/health`);
  console.log(`   - Predict: POST /api/predict`);
  console.log(`   - History: GET  /api/history`);
  console.log(`   - Stats:   GET  /api/stats`);
});
