import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import MetricCard from '../components/dashboard/MetricCard';
import ForecastingChart from '../components/dashboard/ForecastingChart';
import UsageDonuts from '../components/dashboard/UsageDonuts';
import FeatureImportance from '../components/dashboard/FeatureImportance';
import { Zap, Activity, CloudSun, ShieldCheck, Download, Filter } from 'lucide-react';
import { cn } from '../lib/utils';
import { fetchPrediction } from '../lib/api';

const Dashboard: React.FC = () => {
  // State to hold the live prediction from the FastAPI backend
  const [predictedDemand, setPredictedDemand] = useState<string>("Loading...");

  // Fetch data when the component mounts
  useEffect(() => {
    const getInitialPrediction = async () => {
      // Sending current baseline weather data to get a prediction
      const demand = await fetchPrediction({
        temperature: 32,
        humidity: 65,
        hour: new Date().getHours(), // Current hour
        is_holiday: 0
      });

      if (demand) {
        // Format the number with commas (e.g., 14,250)
        setPredictedDemand(demand.toLocaleString('en-US', { maximumFractionDigits: 0 }));
      } else {
        setPredictedDemand("Error");
      }
    };

    getInitialPrediction();
  }, []);

  return (
    <Layout title="Greater Grid Forecasting">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Top Row: Hero Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            label="Current Power Supply"
            value="14,280"
            unit="MW"
            trend={{ value: 2.4, isUp: true }}
            icon={Zap}
            colorClass="bg-blue-50 text-blue-600"
          />
          <MetricCard
            label="Predicted Peak Demand"
            value={predictedDemand} // Now using live state instead of hardcoded value
            unit="MW"
            trend={{ value: 0.8, isUp: false }}
            icon={Activity}
            colorClass="bg-pink-50 text-pink-600"
          />
          <MetricCard
            label="Current Temperature"
            value="32"
            unit="°C"
            trend={{ value: 1.2, isUp: true }}
            icon={CloudSun}
            colorClass="bg-amber-50 text-amber-600"
          />

          <MetricCard
            label="ML Model Confidence"
            value="98.2"
            unit="%"
            icon={ShieldCheck}
            colorClass="bg-emerald-50 text-emerald-600"
          />
        </div>

        {/* Middle Row: Primary Chart & Usage */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Power Distribution Forecast</h2>
                <p className="text-sm font-medium text-gray-400 mt-1">Real-time XGBoost predictions vs Historical data</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100 text-gray-500">
                  <Filter size={18} />
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200">
                  <Download size={16} />
                  <span>Export</span>
                </button>
              </div>
            </div>
            <div className="flex-1">
              <ForecastingChart />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-50">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900">Usage by Category</h2>
              <p className="text-sm font-medium text-gray-400 mt-1">Global consumption breakdown</p>
            </div>
            <UsageDonuts />
          </div>
        </div>

        {/* Bottom Row: Feature Importance & Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-50">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900">Feature Importance</h2>
              <p className="text-sm font-medium text-gray-400 mt-1">Model decision drivers</p>
            </div>
            <FeatureImportance />
          </div>

          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-50 overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Recent Model Hits</h2>
                <p className="text-sm font-medium text-gray-400 mt-1">Comparison of last 5 predictions</p>
              </div>
              <button className="text-sm font-bold text-blue-600 hover:underline">View History</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Timestamp</th>
                    <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Actual (MW)</th>
                    <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Predicted (MW)</th>
                    <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Error Rate</th>
                    <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { time: '10:00 AM', actual: '14,250', pred: '14,280', error: '0.21%', status: 'Stable' },
                    { time: '09:00 AM', actual: '13,100', pred: '13,050', error: '0.38%', status: 'Stable' },
                    { time: '08:00 AM', actual: '11,400', pred: '11,520', error: '1.05%', status: 'Warning' },
                    { time: '07:00 AM', actual: '9,800', pred: '9,790', error: '0.10%', status: 'Stable' },
                  ].map((row, i) => (
                    <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 text-sm font-bold text-gray-600">{row.time}</td>
                      <td className="py-4 text-sm font-bold text-gray-900">{row.actual}</td>
                      <td className="py-4 text-sm font-bold text-gray-900">{row.pred}</td>
                      <td className="py-4 text-sm font-bold text-emerald-600">{row.error}</td>
                      <td className="py-4">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          row.status === 'Stable' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                        )}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;