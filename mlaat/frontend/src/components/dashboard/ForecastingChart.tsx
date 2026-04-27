import React, { useState, useEffect } from 'react';
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart
} from 'recharts';
import { fetch24HourForecast, type ForecastDataPoint } from '../../lib/api';

const ForecastingChart: React.FC = () => {
  const [data, setData] = useState<ForecastDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getForecast = async () => {
      // Fetching the forecast based on current conditions
      const currentHour = new Date().getHours();
      const forecastData = await fetch24HourForecast({
        temperature: 32,
        humidity: 65,
        hour: currentHour,
        is_holiday: 0
      });

      setData(forecastData);
      setIsLoading(false);
    };

    getForecast();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-gray-50 rounded-xl border border-gray-100">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-bold text-gray-400">Loading AI Forecast...</p>
        </div>
      </div>
    );
  }

  // Custom Tooltip for when you hover over the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 text-white p-4 rounded-xl shadow-2xl border border-gray-700">
          <p className="text-xs font-bold text-gray-400 mb-1">{label}</p>
          <p className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            {payload[0].value.toLocaleString()} MW
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[400px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            {/* The nice gradient fill under the line */}
            <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }}
            tickFormatter={(value) => `${value / 1000}k`} // Formats 15000 as 15k
            dx={-10}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#9CA3AF', strokeWidth: 1, strokeDasharray: '4 4' }} />
          <Area
            type="monotone"
            dataKey="demand"
            stroke="#3B82F6"
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#colorDemand)"
            activeDot={{ r: 8, strokeWidth: 0, fill: '#3B82F6', className: "drop-shadow-md" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastingChart;