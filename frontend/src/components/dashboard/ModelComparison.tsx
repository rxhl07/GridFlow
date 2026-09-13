import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Target, TrendingDown } from 'lucide-react';

// 1. UPDATE THESE NUMBERS WITH YOUR TRAIN.PY OUTPUT
const performanceData = [
    {
        name: 'Linear Regression',
        MAE: 485.2,  // <-- Replace with your train.py MAE
        RMSE: 612.8, // <-- Replace with your train.py RMSE
    },
    {
        name: 'Random Forest',
        MAE: 124.5,  // <-- Replace with your train.py MAE
        RMSE: 156.3, // <-- Replace with your train.py RMSE
    },
    {
        name: 'XGBoost',
        MAE: 98.2,   // <-- Replace with your train.py MAE
        RMSE: 115.7, // <-- Replace with your train.py RMSE
    },
];

const ModelComparison: React.FC = () => {
    return (
        // Changed h-full to h-[400px] to prevent Recharts from collapsing
        <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col h-[400px] w-full">
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Target className="text-blue-500" size={24} />
                        Algorithm Performance
                    </h2>
                    <p className="text-sm font-medium text-gray-400 mt-1">Comparing error rates (Lower is better)</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                    <TrendingDown size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">XGBoost Wins</span>
                </div>
            </div>

            {/* Ensured the wrapper has an explicit height constraint */}
            <div className="flex-1 w-full h-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={performanceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                        <XAxis
                            dataKey="name"
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
                        />
                        <Tooltip
                            cursor={{ fill: '#F9FAFB' }}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                        />
                        <Legend
                            wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 600, color: '#6B7280' }}
                        />
                        <Bar dataKey="MAE" name="Mean Absolute Error" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={40} />
                        <Bar dataKey="RMSE" name="Root Mean Squared Error" fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ModelComparison;