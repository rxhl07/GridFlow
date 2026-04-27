import React from 'react';
import Layout from '../components/layout/Layout';
import { CheckCircle2, AlertTriangle, ArrowDownRight, ArrowUpRight, Download } from 'lucide-react';
import { cn } from '../lib/utils';

// Mock historical data comparing XGBoost predictions to actual grid usage
const historyData = [
  { id: 'PRD-8901', date: '2026-04-26 14:00', temp: '38°C', predicted: 15420, actual: 15450, error: 0.19, status: 'Accurate' },
  { id: 'PRD-8900', date: '2026-04-26 13:00', temp: '36°C', predicted: 14800, actual: 14920, error: 0.81, status: 'Accurate' },
  { id: 'PRD-8899', date: '2026-04-26 12:00', temp: '33°C', predicted: 13500, actual: 13900, error: 2.96, status: 'Warning' },
  { id: 'PRD-8898', date: '2026-04-26 11:00', temp: '31°C', predicted: 12100, actual: 12150, error: 0.41, status: 'Accurate' },
  { id: 'PRD-8897', date: '2026-04-25 20:00', temp: '26°C', predicted: 10500, actual: 10400, error: 0.95, status: 'Accurate' },
  { id: 'PRD-8896', date: '2026-04-25 15:00', temp: '41°C', predicted: 16800, actual: 16200, error: 3.70, status: 'Deviation' },
  { id: 'PRD-8895', date: '2026-04-25 14:00', temp: '39°C', predicted: 15900, actual: 15850, error: 0.31, status: 'Accurate' },
];

const History: React.FC = () => {
  return (
    <Layout title="Prediction History & Audit Logs">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* Top Row: Model Health Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-50 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400">7-Day Accuracy Rate</p>
              <h3 className="text-2xl font-black text-gray-900">98.4%</h3>
            </div>
          </div>
          
          <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-50 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <ArrowDownRight size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400">Average Error Margin</p>
              <h3 className="text-2xl font-black text-gray-900">1.2% <span className="text-sm text-emerald-500 font-bold ml-2">↓ 0.3%</span></h3>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-50 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400">Anomalies Detected</p>
              <h3 className="text-2xl font-black text-gray-900">2 <span className="text-sm text-gray-400 font-medium ml-1">this week</span></h3>
            </div>
          </div>
        </div>

        {/* Main Table Section */}
        <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-50">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Model Audit Log</h2>
              <p className="text-sm font-medium text-gray-400 mt-1">Comparing XGBoost predictions against actual grid load</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 text-gray-600 text-sm font-bold hover:bg-gray-100 transition-all border border-gray-200">
              <Download size={16} />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Log ID</th>
                  <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date & Time</th>
                  <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Conditions</th>
                  <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Predicted (MW)</th>
                  <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Actual (MW)</th>
                  <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Error %</th>
                  <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {historyData.map((row) => (
                  <tr key={row.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 text-sm font-bold text-blue-600">{row.id}</td>
                    <td className="py-4 text-sm font-bold text-gray-600">{row.date}</td>
                    <td className="py-4 text-sm font-bold text-gray-900">{row.temp}</td>
                    <td className="py-4 text-sm font-bold text-gray-900">{row.predicted.toLocaleString()}</td>
                    <td className="py-4 text-sm font-bold text-gray-900">{row.actual.toLocaleString()}</td>
                    <td className="py-4 text-sm font-bold text-gray-900 flex items-center gap-1">
                      {row.error}%
                      {row.predicted > row.actual ? <ArrowUpRight size={14} className="text-amber-500"/> : <ArrowDownRight size={14} className="text-emerald-500"/>}
                    </td>
                    <td className="py-4">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        row.status === 'Accurate' ? "bg-emerald-50 text-emerald-600" : 
                        row.status === 'Warning' ? "bg-amber-50 text-amber-600" : 
                        "bg-red-50 text-red-600"
                      )}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button className="text-sm font-bold text-blue-600 hover:underline">Load More Records</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default History;
