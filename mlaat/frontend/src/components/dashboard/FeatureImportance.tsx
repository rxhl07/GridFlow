import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Typical XGBoost feature weights for this specific problem
const data = [
  { name: 'Temperature', impact: 65, color: '#3B82F6' }, // Blue
  { name: 'Time of Day', impact: 20, color: '#8B5CF6' }, // Purple
  { name: 'Humidity', impact: 10, color: '#06B6D4' },    // Cyan
  { name: 'Holiday Status', impact: 5, color: '#EC4899' },// Pink
];

const FeatureImportance: React.FC = () => {
  return (
    <div className="w-full h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#F3F4F6" />
          <XAxis type="number" hide domain={[0, 100]} />
          <YAxis 
            dataKey="name" 
            type="category" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }}
            width={90}
          />
          <Tooltip 
            cursor={{ fill: '#F9FAFB' }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
            formatter={(value: number) => [`${value}%`, 'Impact Weight']}
          />
          <Bar dataKey="impact" radius={[0, 8, 8, 0]} barSize={24}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeatureImportance;
