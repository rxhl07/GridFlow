// Define the expected input based on your Python FastAPI model
export interface PredictionInput {
    temperature: number;
    humidity: number;
    hour: number;
    is_holiday: number;
}

export const fetchPrediction = async (data: PredictionInput) => {
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
        return result.predicted_demand_mw;
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