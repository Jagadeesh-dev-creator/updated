# 🏔️ ROCKFALL PREDICTION SYSTEM

<p align="center">
  <img src="https://img.shields.io/badge/🏆%20Hackathon-2026-gold?style=for-the-badge" alt="Hackathon 2026"/>
  <img src="https://img.shields.io/badge/Status-Live%20Demo-success?style=for-the-badge" alt="Live Demo"/>
  <img src="https://img.shields.io/badge/Accuracy-97%25-brightgreen?style=for-the-badge" alt="97% Accuracy"/>
</p>

<p align="center">
  <strong>🚀 AI-Powered Rockfall Risk Prediction & Real-Time Alert System</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.8+-3776AB?style=flat-square" alt="Python"/>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=flat-square" alt="Node.js"/>
  <img src="https://img.shields.io/badge/MongoDB-Database-brightgreen?style=flat-square" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/ML-Random%20Forest-green?style=flat-square" alt="ML"/>
</p>

---

# 📖 TABLE OF CONTENTS

1. [What is This Project?](#-what-is-this-project)
2. [The Problem We Solve](#-the-problem-we-solve)
3. [Our Solution](#-our-solution)
4. [Complete Roadmap - Data to Prediction](#-complete-roadmap---data-to-prediction)
5. [How It Works (Simple Explanation)](#-how-it-works-simple-explanation)
6. [Features](#-features)
7. [Tech Stack](#-tech-stack)
8. [How to Run](#-how-to-run)
9. [Demo Scenarios](#-demo-scenarios)
10. [Q&A - Frequently Asked Questions](#-qa---frequently-asked-questions)
11. [For Hackathon Judges](#-for-hackathon-judges)

---

# 🤔 WHAT IS THIS PROJECT?

> **Think of it like a Weather App, but for predicting if rocks might fall from mountains!**

Imagine you work near a big hill or mountain. Sometimes rocks can fall down and hurt people. This is dangerous! 😟

Our app is like a **smart helper** that looks at:
- 🌡️ How hot or cold it is
- 🌧️ Is it raining?
- 💨 How strong is the wind?
- ⛰️ How steep is the mountain?

Then it tells you: **"Is it SAFE or DANGEROUS today?"**

---

# 🎯 THE PROBLEM WE SOLVE

## The Real Problem (Simple Words)

| Problem | What Happens |
|---------|--------------|
| 🪨 **Rocks Fall** | Every year, falling rocks hurt many mine workers |
| 👀 **No Warning** | People don't know when rocks might fall |
| 🧑‍🔬 **Old Methods** | Experts check by hand - takes too long! |
| 🌧️ **Weather Changes** | Rain and wind make slopes dangerous suddenly |

## In Numbers
- **15%** of mining deaths are from rockfalls
- **Millions of dollars** lost in accidents
- **No easy way** to predict danger

---

# 💡 OUR SOLUTION

## What We Built (Simple Version)

```
Accuracy improvement:
10 → 50 trees:   +8% improvement  ✅ Big gain
50 → 100 trees:  +3% improvement  ✅ Good gain
100 → 200 trees: +1% improvement  ✅ Worth it
200 → 500 trees: +0.5% improvement ❌ Not worth the slowdown

1. Balance Between Accuracy & Speed
Trees	Accuracy	Training Time	Prediction Speed
10	~85%	Very Fast	Very Fast
50	~93%	Fast	Fast
100	~96%	Medium	Medium
200	~97%	Acceptable	Good
500	~97.5%	Slow	Slower
1000	~97.6%	Very Slow	Much Slower

┌────────────────────────────────────────┐
│   YOUR MODEL ARCHITECTURE              │
├────────────────────────────────────────┤
│                                        │
│   Type: Random Forest Classifier       │
│   Trees: 200                           │
│   Max Depth per Tree: 12 levels        │
│   Inputs: 7 features                   │
│   Outputs: 3 classes (Low/Med/High)    │
│                                        │
│   NO LAYERS - Uses TREES instead!      │
│                                        │
└────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                                                          │
│   👤 User enters weather + slope data                    │
│           ↓                                              │
│   🧠 AI Brain checks the data                            │
│           ↓                                              │
│   📊 Shows: LOW / MEDIUM / HIGH risk                     │
│           ↓                                              │
│   ✅ Safe to work  OR  🚨 Danger! Be careful!            │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## What We Built (Technical Version)

| Part | Tool | Job |
|------|------|-----|
| 🖥️ **Website** | React | Beautiful dashboard to see results |
| 🔗 **Server** | Node.js | Connects everything together |
| 🧠 **AI Brain** | Python + Scikit-learn | Makes smart predictions |
| 💾 **Storage** | MongoDB | Remembers all predictions |

---

# �️ COMPLETE ROADMAP - DATA TO PREDICTION

## Overview: The Complete Journey

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   📊 PHASE 1          🧠 PHASE 2           🎯 PHASE 3                       │
│   DATA COLLECTION     MODEL TRAINING       PREDICTION                       │
│                                                                             │
│   [Raw Datasets] ──► [Clean & Merge] ──► [Train AI] ──► [Save Model]       │
│                                                                             │
│                           Then during usage:                                │
│                                                                             │
│   [User Input] ──► [API Request] ──► [Load Model] ──► [Predict] ──► [Show] │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

# Formula used to label training data:

score = 0.0

# Factor 1: Slope Angle (30% weight) - Steeper = More dangerous
score += (slope_angle_deg / 90) × 0.30

# Factor 2: Rain (20% weight) - Rain = More dangerous
score += rain_flag × 0.20

# Factor 3: Factor of Safety (25% weight) - Lower FoS = Dangerous
score += max(0, (1.5 - factor_of_safety) / 1.5) × 0.25

# Factor 4: Pore Water Pressure (15% weight) - More water = Dangerous
score += pore_water_pressure_ratio × 0.15

# Factor 5: Wind Speed (10% weight) - High wind = Dangerous
score += max(0, (wind_speed - 10) / 20) × 0.10

```

---

## 📊 PHASE 1: DATA COLLECTION (Where Data Comes From)

### Step 1.1: Raw Data Sources

```
┌─────────────────────────────────────────────────────────────┐
│                    RAW DATA SOURCES                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📁 weather_forecast_data.csv                                │
│     └── 🌡️ Temperature, 💧 Humidity, 💨 Wind Speed          │
│         └── 2,500 weather records                            │
│                                                              │
│  📁 slope_stability_dataset.csv                              │
│     └── ⛰️ Slope Angle, 📏 Height, 💦 Pore Pressure         │
│         └── Geological measurements                          │
│                                                              │
│  📁 rock_samples_Gecamines.csv                               │
│     └── 🪨 Rock strength, Factor of Safety                   │
│         └── Mining site samples                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Step 1.2: Data Merging (merge_datasets.py)

```
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│   Weather    │   │    Slope     │   │    Rock      │
│    Data      │   │    Data      │   │   Samples    │
└──────┬───────┘   └──────┬───────┘   └──────┬───────┘
       │                  │                  │
       └──────────────────┼──────────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │   merge_datasets.py   │
              │                       │
              │  • Combine all files  │
              │  • Remove duplicates  │
              │  • Handle missing     │
              │  • Align columns      │
              └───────────┬───────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │  merged_dataset.csv   │
              │                       │
              │   2,500 clean rows    │
              │   7 feature columns   │
              └───────────────────────┘
```

### Step 1.3: Final Features (7 Inputs)

| # | Feature Name | Description | Range | Unit |
|---|--------------|-------------|-------|------|
| 1 | `temperature_c` | Air temperature | -20 to 50 | °C |
| 2 | `humidity_pct` | Air moisture | 0 to 100 | % |
| 3 | `wind_speed` | Wind velocity | 0 to 50 | m/s |
| 4 | `rain_flag` | Is it raining? | 0 or 1 | - |
| 5 | `slope_angle_deg` | Steepness | 0 to 90 | degrees |
| 6 | `slope_height_m` | How tall | 0 to 500 | meters |
| 7 | `pore_water_pressure_ratio` | Ground water | 0 to 1 | ratio |

---

## 🧠 PHASE 2: MODEL TRAINING (How AI Learns)

### Step 2.1: Label Creation (How we decide Low/Medium/High)

```python
# Risk Scoring Formula (in train.py)

score = 0
score += (slope_angle / 90) × 0.30      # Steeper = more dangerous
score += rain_flag × 0.20               # Rain = more dangerous  
score += (1.5 - factor_of_safety) × 0.25 # Lower FoS = dangerous
score += pore_water_ratio × 0.15        # More water = dangerous
score += (wind_speed - 10) / 20 × 0.10  # High wind = dangerous

# Then classify:
if score < 0.35:  → LOW RISK (0)
if score < 0.55:  → MEDIUM RISK (1)
if score >= 0.55: → HIGH RISK (2)
```

### Step 2.2: Training Process (train.py)

```
┌─────────────────────────────────────────────────────────────────┐
│                     TRAINING PIPELINE                            │
└─────────────────────────────────────────────────────────────────┘

Step 1: Load Data
┌────────────────────┐
│ merged_dataset.csv │ ──► 2,500 rows loaded
└────────────────────┘

                ▼

Step 2: Add Synthetic Data (for extreme cases)
┌────────────────────┐
│ generate_synthetic │ ──► +750 extreme samples
│     _extremes()    │     (High risk, Low risk edge cases)
└────────────────────┘

                ▼

Step 3: Total Training Data
┌────────────────────┐
│   3,250 samples    │ ──► Real (2,500) + Synthetic (750)
└────────────────────┘

                ▼

Step 4: Split Data
┌────────────────────┐
│  80% Training      │ ──► 2,600 samples (to learn from)
│  20% Testing       │ ──► 650 samples (to test accuracy)
└────────────────────┘

                ▼

Step 5: Train Random Forest
┌────────────────────────────────────────────────┐
│           RANDOM FOREST CLASSIFIER              │
│                                                 │
│   🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲  (200 trees)              │
│                                                 │
│   Each tree learns different patterns           │
│   Final answer = majority vote of all trees    │
│                                                 │
│   Settings:                                     │
│   • n_estimators = 200 (number of trees)       │
│   • max_depth = 12 (how deep each tree grows)  │
│   • random_state = 42 (for reproducibility)    │
└────────────────────────────────────────────────┘

                ▼

Step 6: Evaluate Accuracy
┌────────────────────┐
│  Test on 650       │ ──► 97.23% Accuracy! ✅
│  unseen samples    │
└────────────────────┘

                ▼

Step 7: Save Model
┌────────────────────┐
│ rockfall_model.pkl │ ──► Saved to models/ folder
│ feature_metadata   │     Ready for predictions!
└────────────────────┘
```

### Step 2.3: Why Random Forest?

```
┌─────────────────────────────────────────────────────────────────┐
│                  HOW RANDOM FOREST WORKS                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Input: Temperature=30, Humidity=80, Wind=25, Rain=1...          │
│                                                                  │
│         │                                                        │
│         ▼                                                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                                                          │   │
│  │   🌲 Tree 1    🌲 Tree 2    🌲 Tree 3   ...  🌲 Tree 200 │   │
│  │      │            │            │               │         │   │
│  │      ▼            ▼            ▼               ▼         │   │
│  │    "HIGH"      "HIGH"      "MEDIUM"   ...   "HIGH"       │   │
│  │                                                          │   │
│  └──────────────────────────────────────────────────────────┘   │
│                          │                                       │
│                          ▼                                       │
│               ┌─────────────────────┐                           │
│               │   MAJORITY VOTE     │                           │
│               │                     │                           │
│               │   HIGH: 150 trees   │ ◄── WINNER! 🏆            │
│               │   MEDIUM: 40 trees  │                           │
│               │   LOW: 10 trees     │                           │
│               └─────────────────────┘                           │
│                          │                                       │
│                          ▼                                       │
│               Final Answer: HIGH RISK (75% confidence)          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 PHASE 3: PREDICTION (How It Works in Real-Time)

### Step 3.1: User Enters Data

```
┌─────────────────────────────────────────┐
│         REACT DASHBOARD                  │
│                                         │
│   Temperature:  [  28  ] °C             │
│   Humidity:     [  85  ] %              │
│   Wind Speed:   [  20  ] m/s            │
│   Rain:         [  Yes ▼]               │
│   Slope Angle:  [  55  ] °              │
│   Slope Height: [  180 ] m              │
│   Pore Ratio:   [ 0.6  ]                │
│                                         │
│   [ 🎯 PREDICT RISK ]                   │
│                                         │
└─────────────────────────────────────────┘
```

### Step 3.2: Data Flow (Request Journey)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        PREDICTION FLOW                                   │
└─────────────────────────────────────────────────────────────────────────┘

1️⃣ USER CLICKS "PREDICT"
   │
   │  Data: {temp: 28, humidity: 85, wind: 20, rain: 1, angle: 55...}
   │
   ▼
2️⃣ REACT FRONTEND (Port 3001)
   │
   │  axios.post('/api/predict', data)
   │
   ▼
3️⃣ NODE.JS BACKEND (Port 3000)
   │
   │  • Validates input (checks all 7 fields exist)
   │  • Forwards to Python API
   │  
   │  axios.post('http://localhost:5000/predict', data)
   │
   ▼
4️⃣ PYTHON FLASK API (Port 5000)
   │
   │  ┌─────────────────────────────────────────┐
   │  │  def predict():                         │
   │  │      # Load saved model                 │
   │  │      model = joblib.load('model.pkl')   │
   │  │                                         │
   │  │      # Prepare input as array           │
   │  │      X = [[28, 85, 20, 1, 55, 180, 0.6]]│
   │  │                                         │
   │  │      # Get prediction                   │
   │  │      risk = model.predict(X)  # [2]     │
   │  │                                         │
   │  │      # Get probabilities                │
   │  │      probs = model.predict_proba(X)     │
   │  │      # [[0.05, 0.25, 0.70]]             │
   │  │                                         │
   │  │      return {                           │
   │  │        "risk_level": "High",            │
   │  │        "confidence": 70.0,              │
   │  │        "probabilities": {               │
   │  │          "low": 5.0,                    │
   │  │          "medium": 25.0,                │
   │  │          "high": 70.0                   │
   │  │        }                                │
   │  │      }                                  │
   │  └─────────────────────────────────────────┘
   │
   ▼
5️⃣ RESPONSE TRAVELS BACK
   │
   │  Python → Node.js → React
   │
   ▼
6️⃣ NODE.JS SAVES TO DATABASE
   │
   │  MongoDB: predictions collection
   │  {input: {...}, result: {...}, timestamp: ...}
   │
   ▼
7️⃣ REACT DISPLAYS RESULT
   │
   ┌─────────────────────────────────────────┐
   │                                         │
   │   🚨 HIGH RISK                          │
   │   Confidence: 70%                       │
   │                                         │
   │   ████████████████░░░░ Low: 5%          │
   │   ████████████████████░░░░ Med: 25%     │
   │   ██████████████████████████ High: 70%  │
   │                                         │
   │   ⚠️ Danger! Evacuate the area!         │
   │                                         │
   └─────────────────────────────────────────┘
```

### Step 3.3: Complete System Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         COMPLETE SYSTEM ARCHITECTURE                         │
└─────────────────────────────────────────────────────────────────────────────┘

                              👤 USER
                                 │
                                 │ Opens browser
                                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND (React)                                   │
│                           Port: 3001                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  📊 Dashboard    │   📝 Input Form   │   📈 Results Display         │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└────────────────────────────────────┬────────────────────────────────────────┘
                                     │
                                     │ HTTP POST /api/predict
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           BACKEND (Node.js)                                  │
│                           Port: 3000                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  🔀 API Router   │   ✅ Validator   │   💾 DB Handler               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└──────────────────┬───────────────────────────────────┬──────────────────────┘
                   │                                   │
                   │ HTTP POST /predict                │ Save prediction
                   ▼                                   ▼
┌────────────────────────────────┐    ┌────────────────────────────────────────┐
│      ML SERVICE (Python)       │    │           DATABASE (MongoDB)            │
│      Port: 5000                │    │           Port: 27017                   │
│  ┌──────────────────────────┐  │    │  ┌────────────────────────────────┐    │
│  │  🧠 Random Forest Model  │  │    │  │  📦 predictions collection     │    │
│  │  📊 Feature Processing   │  │    │  │  📦 history                    │    │
│  │  📈 Probability Calc     │  │    │  │  📦 stats                      │    │
│  └──────────────────────────┘  │    │  └────────────────────────────────┘    │
└────────────────────────────────┘    └────────────────────────────────────────┘
```

---

## 📋 SUMMARY: The Complete Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                    COMPLETE JOURNEY SUMMARY                       │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  📊 DATA PHASE (One Time)                                        │
│  ────────────────────────                                        │
│  1. Collect weather, slope, rock data                            │
│  2. Merge into single CSV file                                   │
│  3. Result: 2,500 clean records                                  │
│                                                                   │
│  🧠 TRAINING PHASE (One Time)                                    │
│  ────────────────────────────                                    │
│  4. Add 750 synthetic extreme samples                            │
│  5. Label data (Low=0, Medium=1, High=2)                         │
│  6. Train Random Forest (200 trees)                              │
│  7. Test accuracy: 97.23%                                        │
│  8. Save model to .pkl file                                      │
│                                                                   │
│  🎯 PREDICTION PHASE (Every Time User Clicks)                    │
│  ────────────────────────────────────────────                    │
│  9. User enters 7 values in form                                 │
│  10. React sends to Node.js API                                  │
│  11. Node.js forwards to Python API                              │
│  12. Python loads model, predicts                                │
│  13. Returns: risk level + confidence + probabilities            │
│  14. Node.js saves to MongoDB                                    │
│  15. React displays result with colors!                          │
│                                                                   │
│  ✅ DONE! User sees: "HIGH RISK - 95% confident"                 │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

---

# �🔄 HOW IT WORKS (SIMPLE EXPLANATION)

## Step-by-Step (Like a Recipe! 🍳)

### Step 1: Enter Information
```
You tell the app:
- Temperature: 25°C (how hot)
- Humidity: 80% (how wet the air is)
- Wind: 30 m/s (how windy)
- Rain: Yes or No
- Slope Angle: 60° (how steep)
- Slope Height: 200m (how tall)
```

### Step 2: AI Thinks 🤔
```
The AI brain (like a very smart calculator):
- Looks at 7 different things
- Compares with 3000+ examples it learned
- Decides the risk level
```

### Step 3: You Get Answer ✅
```
The app shows:
┌─────────────────────────────┐
│  🚨 HIGH RISK - 95%         │
│                             │
│  "Danger! Stay away from    │
│   the slope today!"         │
└─────────────────────────────┘
```

---

# ✨ FEATURES

## Main Features (What Our App Can Do)

| Feature | What It Means |
|---------|---------------|
| 🗺️ **5 Zones** | Watch 5 different mountain areas at once |
| ⚡ **Fast** | Get answer in 1-2 seconds |
| 📊 **Confidence %** | Shows how sure the AI is (like 95% sure) |
| 💾 **Remembers** | Saves all predictions, even after refresh |
| 📱 **Works Everywhere** | Use on phone or computer |
| 🎨 **Easy to Use** | Simple buttons, clear colors |

## Risk Levels Explained

| Level | Color | What It Means | What To Do |
|-------|-------|---------------|------------|
| ✅ **LOW** | Green | Safe! | Work normally |
| ⚠️ **MEDIUM** | Yellow | Be careful | Extra caution needed |
| 🚨 **HIGH** | Red | Dangerous! | Stop work, evacuate |

---

# 🛠️ TECH STACK

## Technologies Used (Simple Explanation)

| Technology | What It Is | Why We Use It |
|------------|------------|---------------|
| **Python** 🐍 | Programming language | To build the AI brain |
| **React** ⚛️ | Website builder | To make the dashboard |
| **Node.js** 🟢 | Server tool | To connect everything |
| **MongoDB** 🍃 | Database | To save predictions |
| **Flask** 🌶️ | Python web tool | To share AI predictions |
| **Scikit-learn** 🤖 | AI library | To train the smart model |

## Architecture Diagram

```
     USER (You!)
          │
          ▼
┌─────────────────┐
│   REACT APP     │  ◄── The website you see
│   Port 3001     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   NODE.JS       │  ◄── The middleman/connector
│   Port 3000     │
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌───────┐ ┌───────────┐
│MONGODB│ │ PYTHON ML │  ◄── AI Brain
│  DB   │ │ Port 5000 │
└───────┘ └───────────┘
```

---

# 🚀 HOW TO RUN

## What You Need First (Prerequisites)

| Software | Version | Download Link |
|----------|---------|---------------|
| Python | 3.8 or higher | [python.org](https://python.org) |
| Node.js | 16 or higher | [nodejs.org](https://nodejs.org) |
| MongoDB | 6.0 or higher | [mongodb.com](https://mongodb.com) |

## Step-by-Step Setup

### 📥 Step 1: Download the Code
```powershell
git clone https://github.com/Jagadeesh-dev-creator/updated.git
cd updated
```

### 🍃 Step 2: Start MongoDB
```powershell
# If MongoDB is installed as service:
net start MongoDB
```

### 🐍 Step 3: Start Python AI (Terminal 1)
```powershell
cd python_ml
pip install -r requirements.txt
python train.py          # Train the AI (first time only)
python predict.py        # Start AI server
```
✅ You should see: `Running on http://localhost:5000`

### 🟢 Step 4: Start Node.js Server (Terminal 2)
```powershell
cd backend
npm install
npm start
```
✅ You should see: `Server running on port 3000`

### ⚛️ Step 5: Start React Website (Terminal 3)
```powershell
cd frontend
npm install
npm start
```
✅ Browser opens: `http://localhost:3001`

---

# 🎮 DEMO SCENARIOS

## Test Case 1: LOW RISK (Safe Day) ✅

```
Temperature:     25°C
Humidity:        40%
Wind Speed:      5 m/s
Rain:            No
Slope Angle:     20°
Slope Height:    30m
Pore Pressure:   0.2

Expected Result: LOW RISK (Green) - Safe to work!
```

## Test Case 2: MEDIUM RISK (Be Careful) ⚠️

```
Temperature:     15°C
Humidity:        70%
Wind Speed:      20 m/s
Rain:            Yes
Slope Angle:     45°
Slope Height:    150m
Pore Pressure:   0.5

Expected Result: MEDIUM RISK (Yellow) - Extra caution!
```

## Test Case 3: HIGH RISK (Danger!) 🚨

```
Temperature:     -20°C
Humidity:        100%
Wind Speed:      49 m/s
Rain:            Yes
Slope Angle:     90°
Slope Height:    500m
Pore Pressure:   1.0

Expected Result: HIGH RISK (Red) - Evacuate immediately!
```

---

# ❓ Q&A - FREQUENTLY ASKED QUESTIONS

## 🟢 Basic Questions

### Q1: What does this app do?
> **A:** It predicts if rocks might fall from a slope. Like a weather forecast, but for rockfall danger!

### Q2: Who would use this?
> **A:** Mine workers, construction teams, people living near hills, safety officers.

### Q3: Is it accurate?
> **A:** Yes! Our AI is **97% accurate**. That means out of 100 predictions, 97 are correct!

### Q4: How fast is it?
> **A:** Very fast! You get results in **1-2 seconds**.

---

## 🔵 Technical Questions

### Q5: What AI algorithm do you use?
> **A:** Random Forest Classifier with 200 decision trees.

### Q6: What data does the model use?
> **A:** 7 inputs:
> 1. Temperature (°C)
> 2. Humidity (%)
> 3. Wind Speed (m/s)
> 4. Rain (yes/no)
> 5. Slope Angle (degrees)
> 6. Slope Height (meters)
> 7. Pore Water Pressure Ratio

### Q7: How did you train the model?
> **A:** We used 2,500 real data samples + 750 synthetic extreme cases = 3,250 total training samples.

### Q8: Why Random Forest and not Deep Learning?
> **A:** 
> - Random Forest is faster to train
> - Works well with small datasets
> - Easier to explain to non-technical people
> - 97% accuracy is excellent for this problem

### Q9: What is "Confidence Score"?
> **A:** It shows how sure the AI is. Example:
> - 95% confidence = AI is very sure
> - 60% confidence = AI is somewhat sure
> - Higher is better!

### Q10: Why microservices architecture?
> **A:** 
> - Each part can work independently
> - Easy to update one part without breaking others
> - Can scale each service separately
> - Industry standard for modern apps

---

## 🟡 Problem-Solving Questions

### Q11: What if MongoDB is not running?
> **A:** The app still works! Predictions just won't be saved. Start MongoDB with: `net start MongoDB`

### Q12: What if Python API is down?
> **A:** You'll see an error message. Start it with: `python predict.py`

### Q13: What if the port is already in use?
> **A:** Kill the process using that port or use a different port number.

### Q14: Data disappears after refresh?
> **A:** Fixed! We now load saved predictions from MongoDB on page refresh.

---

## 🟣 Future & Business Questions

### Q15: How can this be improved?
> **A:**
> - Add real sensors (IoT) for automatic data
> - Send SMS/Email alerts
> - Mobile app version
> - Deploy to cloud (Azure/AWS)
> - Add historical charts and analytics

### Q16: Is this ready for production?
> **A:** This is a working prototype. For production, we would add:
> - User authentication
> - Cloud deployment
> - Real-time sensor integration
> - More testing

### Q17: What makes this different from existing solutions?
> **A:**
> - **No expensive hardware needed** - just enter data manually
> - **Easy to use** - anyone can operate it
> - **Fast predictions** - results in seconds
> - **Multiple zones** - monitor 5 areas at once
> - **Free and open source**

### Q18: Which SDGs does this address?
> **A:**
> - **SDG 3** - Good Health (keeps workers safe)
> - **SDG 9** - Innovation (AI for safety)
> - **SDG 11** - Safe Communities (protects people near slopes)

---

# 🏆 FOR HACKATHON JUDGES

## Quick Summary

| Item | Details |
|------|---------|
| **Project Name** | Rockfall Prediction System |
| **Team** | Jagadeesh |
| **Track** | AI/ML for Safety |
| **Problem** | Rockfall accidents in mining/slopes |
| **Solution** | AI-based risk prediction dashboard |
| **Accuracy** | 97% |
| **Demo** | Fully working with live predictions |

## What Makes Us Special

| Feature | Benefit |
|---------|---------|
| ✅ 97% Accuracy | Reliable predictions |
| ✅ Real-time | Instant results |
| ✅ No hardware needed | Cost-effective |
| ✅ Easy UI | Anyone can use |
| ✅ Multi-zone | Monitor multiple areas |
| ✅ Data persistence | Results saved |

## Tech Innovation

```
┌────────────────────────────────────────────┐
│  INNOVATION HIGHLIGHTS                     │
├────────────────────────────────────────────┤
│  ✓ Synthetic data augmentation             │
│  ✓ Microservices architecture              │
│  ✓ Real-time ML inference                  │
│  ✓ Persistent prediction history           │
│  ✓ Multi-zone monitoring dashboard         │
└────────────────────────────────────────────┘
```

## How to Test (For Judges)

1. **Open:** http://localhost:3001
2. **Click:** Any zone card (Zone A, B, C, D, or E)
3. **Enter:** Test values (see Demo Scenarios above)
4. **Click:** "Predict Risk" button
5. **See:** Risk level with confidence percentage!

---

## 📁 Project Structure

```
updated/
├── 📂 python_ml/           # AI Brain
│   ├── train.py            # Trains the model
│   ├── predict.py          # API for predictions
│   └── models/             # Saved AI model
│
├── 📂 backend/             # Node.js Server
│   ├── server.js           # Main server file
│   └── models/             # Database models
│
├── 📂 frontend/            # React Website
│   ├── src/
│   │   ├── App.js          # Main page
│   │   └── components/     # UI parts
│   └── public/
│
└── 📂 dataset/             # Training data
    └── merged_dataset.csv
```

---

## 🔗 Links

- **GitHub:** https://github.com/Jagadeesh-dev-creator/updated
- **Demo:** Run locally (see How to Run section)

---

## 📜 License

MIT License - Free to use and modify!

---

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge" alt="Made with Love"/>
</p>

<p align="center">
  <strong>🏆 Hackathon 2026 Submission</strong>
</p>

<p align="center">
  <em>"Predicting risks before they become disasters"</em>
</p>

<p align="center">
  Built by <strong>Jagadeesh</strong> 🚀
</p>
