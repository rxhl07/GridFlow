import pandas as pd
import numpy as np
import os

# Create data directory if it doesn't exist
os.makedirs('data', exist_ok=True)

print("Generating realistic electricity demand data...")
np.random.seed(42)
days = 365
hours_per_day = 24
total_hours = days * hours_per_day

# Generate base features
hours = np.tile(np.arange(24), days)
temperatures = np.random.normal(loc=25, scale=8, size=total_hours) # Avg 25C, varies
humidities = np.random.normal(loc=60, scale=15, size=total_hours) # Avg 60% humidity
humidities = np.clip(humidities, 20, 100) # Keep within 20-100%
is_holiday = np.random.choice([0, 1], size=total_hours, p=[0.96, 0.04])

# Simulate realistic demand logic (MW)
# 1. Base load
base_demand = 8000 
# 2. Hourly patterns (Peak at 6 PM / Hour 18, lowest at 3 AM)
hourly_multiplier = 1 + 0.3 * np.sin(np.pi * (hours - 9) / 12) 
# 3. Temperature impact (AC turns on heavily above 28C)
temp_impact = np.where(temperatures > 28, (temperatures - 28) * 150, 0)
# 4. Holiday drop (Less industrial usage)
holiday_drop = is_holiday * -1500

# Calculate final demand
demand = (base_demand * hourly_multiplier) + temp_impact + holiday_drop + np.random.normal(0, 200, total_hours)

# Create DataFrame and save
df = pd.DataFrame({
    'temperature': np.round(temperatures, 1),
    'humidity': np.round(humidities, 1),
    'hour': hours,
    'is_holiday': is_holiday,
    'demand': np.round(demand, 0)
})

df.to_csv('data/electricity_demand.csv', index=False)
print("Success! Created backend/data/electricity_demand.csv with", len(df), "rows.")