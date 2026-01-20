"""
Rockfall Risk Prediction Model Training v1.0 (real dataset)
Uses merged_dataset.csv produced from weather + slope + rock samples.
"""

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os
from pathlib import Path


DATA_PATH = Path(__file__).resolve().parents[1] / "dataset" / "merged_dataset.csv"
META_PATH = Path(__file__).resolve().parents[1] / "python_ml" / "models" / "feature_metadata.pkl"


FEATURE_COLUMNS = [
    "temperature_c",
    "humidity_pct",
    "wind_speed",
    "rain_flag",
    "slope_angle_deg",
    "slope_height_m",
    "pore_water_pressure_ratio",
]


def label_risk(row: pd.Series) -> int:
    """Rule-based labeling to create targets from real features."""
    score = 0.0
    score += (row["slope_angle_deg"] / 90.0) * 0.30
    score += row["rain_flag"] * 0.20
    score += max(0.0, (1.5 - row["factor_of_safety"]) / 1.5) * 0.25
    score += row["pore_water_pressure_ratio"] * 0.15
    score += max(0.0, (row["wind_speed"] - 10.0) / 20.0) * 0.10

    if score < 0.35:
        return 0  # Low
    if score < 0.55:
        return 1  # Medium
    return 2  # High


def load_dataset(path: Path):
    print(f"📂 Loading dataset from: {path}")
    df = pd.read_csv(path)
    df.columns = df.columns.str.strip()  # Remove leading/trailing whitespace from column names

    missing = [c for c in FEATURE_COLUMNS if c not in df.columns]
    if missing:
        raise ValueError(f"Missing required columns in dataset: {missing}")

    df = df.dropna(subset=FEATURE_COLUMNS).copy()
    df["risk"] = df.apply(label_risk, axis=1)

    X = df[FEATURE_COLUMNS]
    y = df["risk"]
    print(f"✅ Loaded {len(df)} rows after dropping NaNs")
    return X, y, df


def generate_synthetic_extremes(n_samples=500):
    """Generate synthetic extreme samples for better edge case handling."""
    print(f"🔧 Generating {n_samples} synthetic extreme samples...")
    
    synthetic_data = []
    
    # HIGH RISK scenarios (dangerous conditions)
    for _ in range(n_samples // 3):
        synthetic_data.append({
            "temperature_c": np.random.uniform(-20, 50),
            "humidity_pct": np.random.uniform(70, 100),
            "wind_speed": np.random.uniform(25, 50),
            "rain_flag": 1,
            "slope_angle_deg": np.random.uniform(60, 90),
            "slope_height_m": np.random.uniform(200, 500),
            "pore_water_pressure_ratio": np.random.uniform(0.6, 1.0),
            "risk": 2  # High
        })
    
    # MEDIUM RISK scenarios
    for _ in range(n_samples // 3):
        synthetic_data.append({
            "temperature_c": np.random.uniform(0, 35),
            "humidity_pct": np.random.uniform(40, 80),
            "wind_speed": np.random.uniform(10, 25),
            "rain_flag": np.random.choice([0, 1]),
            "slope_angle_deg": np.random.uniform(35, 60),
            "slope_height_m": np.random.uniform(50, 200),
            "pore_water_pressure_ratio": np.random.uniform(0.3, 0.6),
            "risk": 1  # Medium
        })
    
    # LOW RISK scenarios (safe conditions)
    for _ in range(n_samples // 3):
        synthetic_data.append({
            "temperature_c": np.random.uniform(10, 30),
            "humidity_pct": np.random.uniform(20, 50),
            "wind_speed": np.random.uniform(0, 10),
            "rain_flag": 0,
            "slope_angle_deg": np.random.uniform(0, 35),
            "slope_height_m": np.random.uniform(0, 50),
            "pore_water_pressure_ratio": np.random.uniform(0, 0.3),
            "risk": 0  # Low
        })
    
    # Add extreme edge cases for HIGH confidence
    extreme_high = [
        {"temperature_c": -20, "humidity_pct": 100, "wind_speed": 50, "rain_flag": 1, 
         "slope_angle_deg": 90, "slope_height_m": 500, "pore_water_pressure_ratio": 1.0, "risk": 2},
        {"temperature_c": 50, "humidity_pct": 95, "wind_speed": 45, "rain_flag": 1, 
         "slope_angle_deg": 85, "slope_height_m": 450, "pore_water_pressure_ratio": 0.9, "risk": 2},
        {"temperature_c": 0, "humidity_pct": 100, "wind_speed": 40, "rain_flag": 1, 
         "slope_angle_deg": 80, "slope_height_m": 400, "pore_water_pressure_ratio": 0.85, "risk": 2},
    ]
    
    # Duplicate extreme cases for stronger learning
    for _ in range(50):
        synthetic_data.extend(extreme_high)
    
    print(f"✅ Generated {len(synthetic_data)} synthetic samples")
    return pd.DataFrame(synthetic_data)


def train_model(data_path: Path = DATA_PATH):
    print("🚀 Starting Rockfall Prediction Model Training...")
    X, y, df = load_dataset(data_path)

    # Add synthetic extreme samples for better edge case handling
    synthetic_df = generate_synthetic_extremes(n_samples=600)
    X_synthetic = synthetic_df[FEATURE_COLUMNS]
    y_synthetic = synthetic_df["risk"]
    
    # Combine real and synthetic data
    X_combined = pd.concat([X, X_synthetic], ignore_index=True)
    y_combined = pd.concat([y, y_synthetic], ignore_index=True)
    print(f"📊 Total training samples: {len(X_combined)} (real: {len(X)}, synthetic: {len(X_synthetic)})")

    X_train, X_test, y_train, y_test = train_test_split(
        X_combined, y_combined, test_size=0.2, random_state=42, stratify=y_combined
    )

    model = RandomForestClassifier(n_estimators=200, random_state=42, max_depth=12)
    model.fit(X_train, y_train)
    print("✅ Model trained successfully")

    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"📊 Model Accuracy: {accuracy:.2%}")
    print("\n📈 Classification Report:")
    print(classification_report(y_test, y_pred, target_names=["Low", "Medium", "High"]))

    os.makedirs("models", exist_ok=True)
    model_path = "models/rockfall_model.pkl"
    joblib.dump(model, model_path)
    print(f"💾 Model saved to {model_path}")

    # Persist feature statistics for inference defaults
    feature_means = X.mean(numeric_only=True).to_dict()
    metadata = {
        "feature_means": feature_means,
        "feature_columns": FEATURE_COLUMNS,
    }
    joblib.dump(metadata, META_PATH)
    print(f"🧭 Feature metadata saved to {META_PATH}")
    return model


if __name__ == "__main__":
    train_model()
    print("\n✨ Training complete! Ready for predictions.")
