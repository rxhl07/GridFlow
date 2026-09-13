import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const usageData = [
  {
    title: 'Commercial',
    percentage: 63,
    rural: 30,
    urban: 33,
    gradient: ['#F97316', '#EF4444'], // Orange to Red
    id: 'gradCommercial'
  },
  {
    title: 'Residential',
    percentage: 72,
    rural: 40,
    urban: 32,
    gradient: ['#3B82F6', '#06B6D4'], // Blue to Cyan
    id: 'gradResidential'
  },
  {
    title: 'Industry',
    percentage: 81,
    rural: 40,
    urban: 41,
    gradient: ['#D946EF', '#8B5CF6'], // Pink to Purple
    id: 'gradIndustry'
  }
];

const UsageDonuts: React.FC = () => {
  return (
    <div className="flex justify-between items-start h-full pt-2">
      {usageData.map((item, index) => (
        <div key={index} className="flex flex-col items-center w-1/3">
          {/* The Donut Chart */}
          <div className="h-[100px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  <linearGradient id={item.id} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={item.gradient[0]} />
                    <stop offset="100%" stopColor={item.gradient[1]} />
                  </linearGradient>
                </defs>
                <Pie
                  data={[
                    { value: item.percentage },
                    { value: 100 - item.percentage } // The empty gray part of the ring
                  ]}
                  innerRadius={30}
                  outerRadius={45}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill={`url(#${item.id})`} />
                  <Cell fill="#F3F4F6" /> {/* Light gray background track */}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Percentage Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-base font-black text-gray-800">{item.percentage}%</span>
            </div>
          </div>

          {/* Labels & Legend */}
          <h3 className="text-xs font-bold text-gray-600 mt-1 mb-2">{item.title}</h3>
          
          <div className="w-full px-1 space-y-0.5">
            <div className="flex justify-between items-center text-[9px] font-bold">
              <div className="flex items-center gap-1 text-gray-500 whitespace-nowrap">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.gradient[0] }}></div>
                Rural
              </div>
              <span className="text-gray-900">{item.rural}%</span>
            </div>
            <div className="flex justify-between items-center text-[9px] font-bold">
              <div className="flex items-center gap-1 text-gray-500 whitespace-nowrap">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.gradient[1] }}></div>
                Urban
              </div>
              <span className="text-gray-900">{item.urban}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsageDonuts;
