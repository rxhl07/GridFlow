import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
import os

# 1. Load the Data
print("Loading dataset from data/electricity_demand.csv...")
df = pd.read_csv('data/electricity_demand.csv')

# 2. Define Features (X) and Target (y)
X = df[['temperature', 'humidity', 'hour', 'is_holiday']]
y = df['demand']

# 3. Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Initialize and Train XGBoost
print("Training XGBoost model...")
model = xgb.XGBRegressor(objective='reg:squarederror', n_estimators=100, learning_rate=0.1)
model.fit(X_train, y_train)

# 5. Save the Model
os.makedirs('models', exist_ok=True)
model.save_model('models/xgboost_forecaster.json')
print("Model saved successfully to models/xgboost_forecaster.json!")