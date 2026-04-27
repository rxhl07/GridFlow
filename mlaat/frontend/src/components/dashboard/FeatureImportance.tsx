import React from 'react';

const features = [
  { name: 'Temperature', importance: 85, color: 'from-[#3B82F6] to-[#06B6D4]' },
  { name: 'Time of Day', importance: 65, color: 'from-[#EC4899] to-[#8B5CF6]' },
  { name: 'Humidity', importance: 45, color: 'from-[#F59E0B] to-[#EF4444]' },
  { name: 'Day of Week', importance: 30, color: 'from-[#10B981] to-[#3B82F6]' },
  { name: 'Holiday Status', importance: 15, color: 'from-gray-400 to-gray-600' },
];

const FeatureImportance: React.FC = () => {
  return (
    <div className="space-y-6">
      {features.map((feature) => (
        <div key={feature.name} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-700">{feature.name}</span>
            <span className="text-xs font-bold text-gray-400">{feature.importance}% Weight</span>
          </div>
          <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
            <div 
              className={`h-full bg-linear-to-r ${feature.color} rounded-full transition-all duration-1000 ease-out`}
              style={{ width: `${feature.importance}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureImportance;
