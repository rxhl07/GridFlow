import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const categories = [
  { name: 'Commercial', value: 35, color: '#3B82F6', gradient: ['#3B82F6', '#60A5FA'] },
  { name: 'Residential', value: 45, color: '#EC4899', gradient: ['#EC4899', '#F472B6'] },
  { name: 'Industry', value: 20, color: '#8B5CF6', gradient: ['#8B5CF6', '#A78BFA'] },
];

const UsageDonuts: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 grid grid-cols-1 gap-6">
        {categories.map((cat) => (
          <div key={cat.name} className="flex items-center gap-6 p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
            <div className="w-20 h-20 shrink-0 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { value: cat.value },
                      { value: 100 - cat.value },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={35}
                    paddingAngle={0}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    <Cell fill={cat.color} stroke="none" />
                    <Cell fill="#E2E8F0" stroke="none" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-xs font-bold text-gray-700">{cat.value}%</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">{cat.name}</p>
              <div className="flex items-center gap-4 mt-2">
                 <div className="flex flex-col">
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Rural</span>
                   <span className="text-xs font-bold text-gray-600">30%</span>
                 </div>
                 <div className="flex flex-col border-l border-gray-200 pl-4">
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Urban</span>
                   <span className="text-xs font-bold text-gray-600">70%</span>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-6 w-full py-3 px-4 rounded-xl border border-blue-100 text-blue-600 font-bold text-sm hover:bg-blue-50 transition-colors">
        View All Categories
      </button>
    </div>
  );
};

export default UsageDonuts;
