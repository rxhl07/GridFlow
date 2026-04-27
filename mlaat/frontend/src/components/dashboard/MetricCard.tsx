import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: {
    value: number;
    isUp: boolean;
  };
  icon: LucideIcon;
  colorClass?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, unit, trend, icon: Icon, colorClass }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className={cn("p-3 rounded-xl", colorClass || "bg-blue-50 text-blue-600")}>
          <Icon size={20} />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
            trend.isUp ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
          )}>
            {trend.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend.value}%
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          {unit && <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{unit}</span>}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
