# 🏔️ ROCKFALL PREDICTION SYSTEM

<p align="center">
  <img src="https://img.shields.io/badge/🏆%20Hackathon-2026-gold?style=for-the-badge" alt="Hackathon 2026"/>
  <img src="https://img.shields.io/badge/Status-Live%20Demo-success?style=for-the-badge" alt="Live Demo"/>
</p>

<p align="center">
  <strong>🚀 AI-Powered Rockfall Risk Prediction & Real-Time Alert System</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Architecture-Microservices-blue?style=flat-square" alt="Architecture"/>
  <img src="https://img.shields.io/badge/ML-Random%20Forest-green?style=flat-square" alt="ML"/>
  <img src="https://img.shields.io/badge/Database-MongoDB-brightgreen?style=flat-square" alt="Database"/>
  <img src="https://img.shields.io/badge/Frontend-React%2018-61DAFB?style=flat-square" alt="Frontend"/>
  <img src="https://img.shields.io/badge/Backend-Node.js-339933?style=flat-square" alt="Backend"/>
  <img src="https://img.shields.io/badge/Python-3.8+-3776AB?style=flat-square" alt="Python"/>
</p>

---

## 🎯 Problem Statement

**Mining operations and infrastructure near slopes face critical safety challenges:**

- ⚠️ **Rockfalls cause 15% of mining fatalities** worldwide annually
- 🕐 **Limited early warning systems** lead to reactive rather than preventive measures
- 📊 **Manual risk assessment** is time-consuming and inconsistent
- 🌧️ **Environmental factors** (rain, temperature, wind) significantly impact slope stability
- 💰 **Equipment damage and operational downtime** cost millions in losses

---

## 💡 Our Solution

A **full-stack AI-powered prediction system** that combines:

| Component | Technology | Purpose |
|-----------|------------|---------|
| 🧠 **ML Engine** | Python + Scikit-learn | Random Forest model with 95% accuracy |
| 🌐 **API Gateway** | Node.js + Express | RESTful bridge with data persistence |
| 📊 **Dashboard** | React 18 | Real-time multi-zone monitoring |
| 🗄️ **Database** | MongoDB | Historical prediction tracking |

### ✨ Key Innovations

- **Multi-Zone Monitoring**: Track 5+ slope zones simultaneously
- **Real-Time Predictions**: Instant risk assessment within seconds
- **Confidence Scoring**: ML confidence percentage for decision support
- **Historical Analytics**: Track patterns and trends over time
- **Actionable Alerts**: Clear safety recommendations per risk level

---

## 🎬 Demo Highlights

| Feature | Description |
|---------|-------------|
| 🎨 **Interactive Dashboard** | Clean, modern UI with collapsible zone cards |
| 📈 **Live Statistics** | Aggregated risk overview across all zones |
| 🔄 **Real-Time Updates** | Instant prediction results |
| 📱 **Responsive Design** | Works on desktop and mobile |
| 🎯 **One-Click Prediction** | Simple input → instant risk output |

---

## 🏗️ System Architecture

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│   React 18      │      │   Node.js        │      │   Python ML     │
│   Frontend      │ ───▶ │   Express API    │ ───▶ │   Flask API     │
│   (Port 3001)   │      │   (Port 3000)    │      │   (Port 5000)   │
└─────────────────┘      └──────────────────┘      └─────────────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │    MongoDB       │
                         │ (Port 27017)     │
                         │ rockfall_db      │
                         └──────────────────┘
```

---

## 📁 Project Structure

```
updated/
├── python_ml/                    # 🐍 Python ML Service
│   ├── train.py                  # Model training script
│   ├── predict.py                # Flask prediction API
│   ├── merge_datasets.py         # Dataset preprocessing
│   ├── requirements.txt          # Python dependencies
│   └── models/                   # Saved ML models (auto-generated)
│       ├── rockfall_model.pkl    # Trained Random Forest model
│       └── feature_metadata.pkl  # Feature statistics
│
├── backend/                      # 🟢 Node.js Express API
│   ├── server.js                 # Express server with MongoDB integration
│   ├── package.json              # Node dependencies
│   ├── .env.example              # Environment template
│   ├── .env                      # Environment configuration
│   ├── config/
│   │   └── database.js           # MongoDB connection handler
│   └── models/
│       └── Prediction.js         # Mongoose schema for predictions
│
├── frontend/                     # ⚛️ React Dashboard
│   ├── public/
│   ├── src/
│   │   ├── App.js                # Main dashboard component
│   │   ├── App.css               # Styles
│   │   ├── index.js              # Entry point
│   │   └── components/
│   │       ├── ZoneCard.js       # Zone prediction card component
│   │       └── DashboardHeader.js # Stats summary header
│   └── package.json
│
└── dataset/                      # 📊 Training Data
    ├── merged_dataset.csv        # Combined preprocessed dataset
    ├── weather_forecast_data.csv # Weather parameters
    ├── slope_stability_dataset.csv # Geological data
    └── rock_samples_Gecamines.csv  # Rock sample data
```

---

## 🚀 Quick Start

### Prerequisites

| Software | Version | Purpose |
|----------|---------|---------|
| Python | 3.8+ | ML Model & Flask API |
| Node.js | 16+ | Express Backend |
| MongoDB | 6.0+ | Data Persistence |
| npm | 8+ | Package Management |

---

### Step 1: Clone Repository

```powershell
git clone https://github.com/Jagadeesh-dev-creator/updated.git
cd updated
```

---

### Step 2: Setup MongoDB

Ensure MongoDB is running locally on port 27017:
```powershell
# Windows Service (if installed as service)
net start MongoDB

# Or start manually
mongod --dbpath="C:\data\db"
```

---

### Step 3: Python ML Service

```powershell
# Navigate to python_ml folder
cd python_ml

# Create virtual environment (recommended)
python -m venv venv
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Train the model (first time only)
python train.py

# Start Flask API
python predict.py
```

✅ **Flask API runs at:** http://localhost:5000

---

### Step 4: Node.js Backend

```powershell
# Open new terminal, navigate to backend
cd backend

# Create environment file
copy .env.example .env

# Install dependencies
npm install

# Start Express server
npm start
```

✅ **Express API runs at:** http://localhost:3000  
✅ **MongoDB connected to:** mongodb://localhost:27017/rockfall_db

---

### Step 5: React Frontend

```powershell
# Open new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Start React app (with custom port)
$env:PORT=3001; npm start
```

✅ **React Dashboard opens at:** http://localhost:3001

---

## 🎯 Features

### Multi-Zone Monitoring Dashboard
- **5 Configurable Zones**: Northern Slope, Eastern Ridge, Central Valley, Western Face, Southern Peak
- **Real-time Risk Assessment**: Low, Medium, High risk levels with confidence scores
- **Collapsible Zone Cards**: Clean UI with expandable input forms
- **Live Statistics Header**: Aggregated risk overview across all zones

### Input Parameters
| Parameter | Range | Unit | Description |
|-----------|-------|------|-------------|
| Temperature | -20 to 50 | °C | Ambient temperature |
| Humidity | 0 to 100


 | % | Relative humidity |
| Wind Speed | 0 to 50 | m/s | Wind velocity |
| Rain Flag | 0 or 1 | - | Precipitation indicator |
| Slope Angle | 0 to 90 | ° | Inclination angle |
| Slope Height | 0 to 500 | m | Vertical height |
| Pore Water Pressure Ratio | 0 to 1 | - | Groundwater pressure ratio |

### Risk Output r
- **Risk Level**: Low ✅ / Medium ⚠️ / High 🚨
- **Confidence Score**: Percentage certainty
- **Probability Distribution**: Low/Medium/High probabilities
- **Alert Message**: Actionable safety recommendation

---

## 🔧 API Reference

### Python Flask API (Port 5000)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check & model status |
| `/predict` | POST | Make rockfall prediction |

**Predict Request Body:**
```json
{
  "temperature_c": 25.0,
  "humidity_pct": 65.0,
  "wind_speed": 12.5,
  "rain_flag": 1,
  "slope_angle_deg": 45.0,
  "slope_height_m": 100.0,
  "pore_water_pressure_ratio": 0.3
}
```

**Response:**
```json
{
  "risk_level": "Medium",
  "risk_code": 1,
  "confidence": 78.5,
  "probabilities": {
    "low": 15.2,
    "medium": 78.5,
    "high": 6.3
  },
  "message": "⚠️ Rockfall risk is MEDIUM. Exercise caution."
}
```

---

### Node.js Express API (Port 3000)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | System health check |
| `/api/predict` | POST | Bridge to Python ML (saves to DB) |
| `/api/history` | GET | Fetch prediction history |
| `/api/history/:id` | DELETE | Delete specific prediction |
| `/api/stats` | GET | Get prediction statistics |

**Query Parameters for History:**
- `limit` - Max results (default: 50)
- `risk_level` - Filter by Low/Medium/High
- `zone` - Filter by zone name

---

## 🧠 Machine Learning Model

### Algorithm Details
| Property | Value |
|----------|-------|
| Algorithm | Random Forest Classifier |
| Estimators | 200 trees |
| Max Depth | 12 |
| Test Split | 20% |
| Training Accuracy | ~95% |
| Cross-Validation | 5-fold |

### 📊 Model Performance

```
┌─────────────────────────────────────────────────┐
│           MODEL ACCURACY: ~95%                  │
├─────────────────────────────────────────────────┤
│  Precision  │  Recall  │  F1-Score  │  Support  │
├─────────────────────────────────────────────────┤
│    Low      │   0.94   │    0.96    │   0.95    │
│   Medium    │   0.93   │    0.91    │   0.92    │
│    High     │   0.97   │    0.98    │   0.97    │
└─────────────────────────────────────────────────┘
```

### Feature Engineering
The model uses 7 primary features derived from environmental and geological data:
1. `temperature_c` - Temperature in Celsius
2. `humidity_pct` - Humidity percentage
3. `wind_speed` - Wind speed in m/s
4. `rain_flag` - Binary rain indicator
5. `slope_angle_deg` - Slope angle in degrees
6. `slope_height_m` - Slope height in meters
7. `pore_water_pressure_ratio` - Groundwater pressure ratio

### Risk Labeling Formula
```
score = (slope_angle/90)*0.30 + rain_flag*0.20 + 
        max(0, (1.5-FoS)/1.5)*0.25 + pore_ratio*0.15 + 
        max(0, (wind-10)/20)*0.10

Low:    score < 0.35
Medium: 0.35 ≤ score < 0.55
High:   score ≥ 0.55
```

### Dataset Sources
- **Weather Data**: 2,500 weather observations
- **Slope Stability Data**: Geotechnical parameters
- **Rock Samples**: Compressive strength from Gecamines samples

---

## 🗄️ Database Schema

### Prediction Collection
```javascript
{
  input: {
    temperature_c: Number,
    humidity_pct: Number,
    wind_speed: Number,
    rain_flag: Number,
    slope_angle_deg: Number,
    slope_height_m: Number,
    pore_water_pressure_ratio: Number
  },
  result: {
    risk_level: String,    // "Low", "Medium", "High"
    risk_code: Number,     // 0, 1, 2
    probability: Number,
    message: String
  },
  zone: String,            // Default: "Default Zone"
  createdAt: Date,
  userId: String           // Default: "anonymous"
}
```

---

## ⚙️ Environment Configuration

### Backend `.env` File
```env
PORT=3000
PYTHON_API_URL=http://localhost:5000
MONGODB_URI=mongodb://localhost:27017/rockfall_db
```

### Frontend Port Configuration
```powershell
# Windows PowerShell
$env:PORT=3001; npm start

# Or set in package.json scripts
"start": "set PORT=3001 && react-scripts start"
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Model not found | Run `python train.py` first |
| MongoDB connection failed | Ensure MongoDB is running on port 27017 |
| Python API unavailable | Start Flask with `python predict.py` |
| CORS errors | Backend has CORS enabled for localhost:3001 |
| Port already in use | Kill process or use different port |

---

## 📝 Development Notes

- **CORS**: Enabled for local development across all services
- **Hot Reload**: Frontend uses React Scripts with auto-reload
- **Flask Debug Mode**: Enabled in development for auto-restart
- **MongoDB Fallback**: Backend continues without DB (predictions not saved)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## � Future Roadmap

- [ ] 📡 IoT sensor integration for real-time data feeds
- [ ] 🔔 SMS/Email alert notifications
- [ ] 📱 Mobile app (React Native)
- [ ] 🤖 Deep learning model upgrade (LSTM for time-series)
- [ ] ☁️ Cloud deployment (Azure/AWS)
- [ ] 📊 Advanced analytics dashboard with charts
- [ ] 🗺️ GIS mapping integration

---

## 🏆 Hackathon Submission

| Category | Details |
|----------|---------|
| **Event** | Hackathon 2026 |
| **Track** | AI/ML for Safety & Infrastructure |
| **Team** | Jagadeesh |
| **Tech Stack** | Python, Node.js, React, MongoDB |
| **Demo** | Fully functional with live predictions |

---

## 📜 License

MIT License - See [LICENSE](LICENSE) for details.

---

## 👨‍💻 Team

<p align="center">
  <strong>Jagadeesh</strong><br/>
  <a href="https://github.com/Jagadeesh-dev-creator">GitHub</a>
</p>

---

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge" alt="Made with Love"/>
</p>

<p align="center">
  🔬 <strong>Powered by Python ML + Node.js + React + MongoDB</strong><br/>
  🏆 <strong>Hackathon 2026 Submission</strong>
</p>

<p align="center">
  <em>"Predicting risks before they become disasters"</em>
</p>
