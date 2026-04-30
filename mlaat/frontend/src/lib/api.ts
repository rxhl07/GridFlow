// Define the expected input based on your Python FastAPI model
export interface PredictionInput {
    temperature: number;
    humidity: number;
    hour: number;
    is_holiday: number;
}

// NEW: Define the structure for the 3-model response
export interface PredictionResult {
    xgboost: number;
    rf: number;
    linear: number;
}

export const fetchPrediction = async (data: PredictionInput): Promise<PredictionResult | null> => {
    try {
        const response = await fetch('http://localhost:8000/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        // Return the whole object containing all 3 models
        return {
            xgboost: result.xgboost,
            rf: result.rf,
            linear: result.linear
        };
    } catch (error) {
        console.error("Failed to fetch prediction:", error);
        return null;
    }
};

export interface ForecastDataPoint {
    time: string;
    demand: number;
}

export const fetch24HourForecast = async (data: PredictionInput): Promise<ForecastDataPoint[]> => {
    try {
        const response = await fetch('http://localhost:8000/api/forecast', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        return result.forecast;
    } catch (error) {
        console.error("Failed to fetch forecast:", error);
        return [];
    }
};