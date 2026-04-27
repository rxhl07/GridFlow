import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';

const data = [
  { time: '00:00', actual: 400, forecast: 420 },
  { time: '04:00', actual: 300, forecast: 310 },
  { time: '08:00', actual: 600, forecast: 580 },
  { time: '12:00', actual: 800, forecast: 850 },
  { time: '16:00', actual: 700, forecast: 720 },
  { time: '20:00', actual: 900, forecast: 880 },
  { time: '23:59', actual: 500, forecast: 520 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/20">
        <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">{label}</p>
        <div className="space-y-1">
          <p className="text-sm font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
            <span className="text-gray-600">Actual:</span>
            <span className="text-gray-900">{payload[0].value} MW</span>
          </p>
          <p className="text-sm font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EC4899]" />
            <span className="text-gray-600">Forecast:</span>
            <span className="text-gray-900">{payload[1].value} MW</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const ForecastingChart: React.FC = () => {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EC4899" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 500 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 500 }}
            dx={-10}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="actual" 
            stroke="#3B82F6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorActual)" 
            animationDuration={2000}
          />
          <Area 
            type="monotone" 
            dataKey="forecast" 
            stroke="#EC4899" 
            strokeWidth={3}
            strokeDasharray="5 5"
            fillOpacity={1} 
            fill="url(#colorForecast)" 
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastingChart;
