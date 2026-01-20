// Prediction Schema v1.0
const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  // Input parameters
  input: {
    temperature_c: { type: Number, required: true },
    humidity_pct: { type: Number, required: true },
    wind_speed: { type: Number, required: true },
    rain_flag: { type: Number, required: true },
    slope_angle_deg: { type: Number, required: true },
    slope_height_m: { type: Number, required: true },
    pore_water_pressure_ratio: { type: Number, required: true }
  },
  // Prediction results
  result: {
    risk_level: { type: String, required: true },
    risk_code: { type: Number, required: true },
    probability: { type: Number },
    message: { type: String }
  },
  // Metadata
  zone: { type: String, default: 'Default Zone' },
  createdAt: { type: Date, default: Date.now },
  userId: { type: String, default: 'anonymous' }
});

// Index for efficient queries
predictionSchema.index({ createdAt: -1 });
predictionSchema.index({ 'result.risk_level': 1 });

module.exports = mongoose.model('Prediction', predictionSchema);
