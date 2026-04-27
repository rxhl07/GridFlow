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
    allow_origins=["*"], # In production, change to your frontend URL
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
    
    # Run the prediction
    prediction = model.predict(input_df)
    
    # Return the result to React
    return {
        "predicted_demand_mw": float(prediction[0]),
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
        
        # Simulate a natural temperature curve (colder at night, warmer in afternoon)
        # This makes the 24-hour chart look highly realistic!
        temp_modifier = np.sin(np.pi * (future_hour - 9) / 12) * 5 
        simulated_temp = base_temp + temp_modifier

        input_list.append({
            'temperature': simulated_temp,
            'humidity': data.humidity,
            'hour': future_hour,
            'is_holiday': data.is_holiday
        })
    
    # Run all 24 hours through XGBoost at once
    input_df = pd.DataFrame(input_list)
    predictions = model.predict(input_df)

    # Format the output for Recharts
    for i in range(24):
        future_hour = (current_hour + i) % 24
        # Create a label like "14:00" or "03:00"
        time_label = f"{future_hour:02d}:00" 
        
        forecast_results.append({
            "time": time_label,
            "demand": round(float(predictions[i]), 0)
        })

    return {
        "forecast": forecast_results,
        "status": "success"
    }