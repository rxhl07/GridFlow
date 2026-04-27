from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import xgboost as xgb
import pandas as pd

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