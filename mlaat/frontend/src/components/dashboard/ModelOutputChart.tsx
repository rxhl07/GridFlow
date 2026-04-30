import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

const ModelOutputChart: React.FC = () => {
    const [outputData, setOutputData] = useState<any[]>([]);

    useEffect(() => {
        // 1. Define our X-axis time slots and a standard baseline day
        const times = ['00:00', '04:00', '08:00', '12:00', '15:00', '18:00', '20:00', '23:00'];
        const baseHistorical = [10800, 9800, 12500, 14500, 15000, 15500, 13800, 11500];

        // 2. Generate a random "Heatwave Multiplier" for this specific page reload (between 1.1x and 1.35x)
        const peakMultiplier = 1.1 + (Math.random() * 0.25);

        const generatedData = times.map((time, index) => {
            const hist = baseHistorical[index];

            // 3. Calculate Actual Demand
            let actual = hist;
            // If it's midday/afternoon (12:00, 15:00, 18:00), apply the heatwave spike!
            if (index >= 3 && index <= 5) {
                actual = Math.round(hist * peakMultiplier * (1 + (Math.random() * 0.04 - 0.02)));
            } else {
                // Nighttime stays relatively normal
                actual = Math.round(hist * (1 + (Math.random() * 0.04 - 0.02)));
            }

            // 4. Simulate the Algorithm Behaviors
            // XGBoost: Highly accurate, stays within 1-2% of actual demand
            const xgboost = Math.round(actual * (1 + (Math.random() * 0.03 - 0.015)));

            // Random Forest: Averages things out. It catches some of the spike, but misses the absolute peak.
            const rf = Math.round((actual * 0.75) + (hist * 0.25));

            // Linear Regression: Terrible at non-linear heatwaves. Mostly just guesses the historical norm.
            const linear = Math.round((hist * 0.85) + (actual * 0.15));

            return {
                time,
                historicalAverage: hist,
                actual,
                linear,
                rf,
                xgboost
            };
        });

        setOutputData(generatedData);
    }, []);

    return (
        <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col h-[450px] w-full">
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Activity className="text-pink-500" size={24} />
                        Prediction Trajectory vs. Norm
                    </h2>
                    <p className="text-sm font-medium text-gray-400 mt-1">Comparing model forecasts against today's actual load and historical averages</p>
                </div>
            </div>

            <div className="flex-1 w-full h-full min-h-0">
                {outputData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={outputData}
                            margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                            <XAxis
                                dataKey="time"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6B7280', fontSize: 13, fontWeight: 600 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }}
                                dx={-10}
                                tickFormatter={(value) => `${value / 1000}k`}
                            />
                            <Tooltip
                                cursor={{ stroke: '#E5E7EB', strokeWidth: 2, strokeDasharray: '4 4' }}
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                            />
                            <Legend
                                wrapperStyle={{ paddingTop: '20px', fontSize: '13px', fontWeight: 600 }}
                                iconType="circle"
                            />

                            {/* 1. Historical Baseline */}
                            <Line type="monotone" dataKey="historicalAverage" name="Historical Norm" stroke="#D1D5DB" strokeWidth={2} strokeDasharray="4 4" dot={false} />

                            {/* 2. Actual Demand */}
                            <Line type="monotone" dataKey="actual" name="Actual Demand" stroke="#10B981" strokeWidth={4} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 8 }} />

                            {/* 3. Linear Regression */}
                            <Line type="monotone" dataKey="linear" name="Linear Regression" stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" dot={false} />

                            {/* 4. Random Forest */}
                            <Line type="monotone" dataKey="rf" name="Random Forest" stroke="#8B5CF6" strokeWidth={2} dot={false} />

                            {/* 5. XGBoost */}
                            <Line type="monotone" dataKey="xgboost" name="XGBoost" stroke="#3B82F6" strokeWidth={3} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="animate-pulse flex flex-col items-center gap-3">
                            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModelOutputChart;