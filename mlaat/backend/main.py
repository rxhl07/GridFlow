from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import xgboost as xgb
import pandas as pd
import numpy as np

# Initialize App
app = FastAPI()

# Allow React (running on port 5173 usually) to talk to FastAPI (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained model into memory
model = xgb.XGBRegressor()
model.load_model('models/xgboost_forecaster.json')

# Define the expected input from the React frontend
class PredictionInput(BaseModel):
    temperature: float
    humidity: float
    hour: int
    is_holiday: int

@app.post("/api/predict")
def predict_demand(data: PredictionInput):
    # Convert incoming JSON into a DataFrame for XGBoost
    input_df = pd.DataFrame([{
        'temperature': data.temperature,
        'humidity': data.humidity,
        'hour': data.hour,
        'is_holiday': data.is_holiday
    }])
    
    # 1. Run the primary XGBoost prediction
    xgb_pred = float(model.predict(input_df)[0])
    
    # 2. Simulate the Variance for the other models
    # (If you have saved .pkl files for RF and Linear, you can load them at the top of the file and use model.predict() here instead!)
    
    # Linear Regression: Struggles with extremes (like high heat)
    if data.temperature > 35:
        linear_pred = xgb_pred * 0.86  # Underpredicts severe heatwaves
    else:
        linear_pred = xgb_pred * 1.05  # Slightly overpredicts normal days
        
    # Random Forest: Better than Linear, but 'averages' out the extreme peaks
    if data.temperature > 35:
        rf_pred = xgb_pred * 0.94
    else:
        rf_pred = xgb_pred * 1.02
    
    # Return all three to React
    return {
        "xgboost": round(xgb_pred, 0),
        "rf": round(rf_pred, 0),
        "linear": round(linear_pred, 0),
        "status": "success"
    }

@app.post("/api/forecast")
def get_24h_forecast(data: PredictionInput):
    forecast_results = []
    base_temp = data.temperature
    current_hour = data.hour

    # Create a list of the next 24 hours
    input_list = []
    for i in range(24):
        future_hour = (current_hour + i) % 24
        temp_modifier = np.sin(np.pi * (future_hour - 9) / 12) * 5 
        simulated_temp = base_temp + temp_modifier

        input_list.append({
            'temperature': simulated_temp,
            'humidity': data.humidity,
            'hour': future_hour,
            'is_holiday': data.is_holiday
        })
    
    input_df = pd.DataFrame(input_list)
    predictions = model.predict(input_df)

    for i in range(24):
        future_hour = (current_hour + i) % 24
        time_label = f"{future_hour:02d}:00" 
        
        forecast_results.append({
            "time": time_label,
            "demand": round(float(predictions[i]), 0)
        })

    return {
        "forecast": forecast_results,
        "status": "success"
    }