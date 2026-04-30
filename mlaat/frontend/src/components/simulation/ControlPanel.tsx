import React, { useState } from 'react';
import { Thermometer, Droplets, Clock, Calendar, Play, Activity } from 'lucide-react';
import { fetchPrediction, type PredictionResult } from '../../lib/api';

interface ControlPanelProps {
  onPredictionUpdate: (load: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onPredictionUpdate }) => {
  // Input States
  const [temperature, setTemperature] = useState<number>(30);
  const [humidity, setHumidity] = useState<number>(60);
  const [hour, setHour] = useState<number>(14);
  const [isHoliday, setIsHoliday] = useState<boolean>(false);

  // Result States (Now holds an object with all 3 models)
  const [predictions, setPredictions] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Trigger the API Call
  const handleRunSimulation = async () => {
    setIsLoading(true);

    const result = await fetchPrediction({
      temperature,
      humidity,
      hour,
      is_holiday: isHoliday ? 1 : 0
    });

    if (result) {
      setPredictions(result);
      // Pass only the XGBoost value up to the map so the heatmap still works!
      onPredictionUpdate(result.xgboost);
    }

    setIsLoading(false);
  };

  return (
    <div className="w-80 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden flex flex-col max-h-[calc(100vh-14rem)]">

      {/* Header & Result Area */}
      <div className="bg-gray-900 pt-6 pb-4 px-5 text-white">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Activity className="text-blue-400" size={20} />
          Simulation Engine
        </h2>

        {/* Dynamic Result Card */}
        {predictions ? (
          <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700 shadow-inner">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">XGBoost (Target)</p>
                <h3 className="text-3xl font-black text-white">
                  {predictions.xgboost.toLocaleString()} <span className="text-sm font-medium text-slate-400">MW</span>
                </h3>
              </div>
              <span className="text-[9px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20">
                BEST FIT
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-3 border-t border-slate-700/50">
              <div className="flex justify-between items-center p-2.5 bg-slate-900/50 rounded-xl">
                <div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase">Random Forest</p>
                  <p className="text-sm font-bold text-slate-200">{predictions.rf.toLocaleString()} MW</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-bold text-slate-500 uppercase">Variance</p>
                  <p className="text-xs font-bold text-amber-400">
                    {(((predictions.xgboost - predictions.rf) / predictions.xgboost) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center p-2.5 bg-slate-900/50 rounded-xl">
                <div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase">Linear Regression</p>
                  <p className="text-sm font-bold text-slate-200">{predictions.linear.toLocaleString()} MW</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-bold text-slate-500 uppercase">Variance</p>
                  <p className="text-xs font-bold text-red-400">
                    {(((predictions.xgboost - predictions.linear) / predictions.xgboost) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Forecasted Load</p>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                ---
              </span>
              <span className="text-lg font-bold text-gray-500 mb-1">MW</span>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Controls */}
      <div className="p-5 space-y-5 overflow-y-auto custom-scrollbar flex-1 border-t border-gray-100">
        {/* Temperature Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <Thermometer size={16} className="text-amber-500" />
              Temperature
            </label>
            <span className="text-sm font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">{temperature}°C</span>
          </div>
          <input
            type="range" min="10" max="45" step="0.5"
            value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>

        {/* Humidity Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <Droplets size={16} className="text-blue-500" />
              Humidity
            </label>
            <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">{humidity}%</span>
          </div>
          <input
            type="range" min="20" max="100" step="1"
            value={humidity} onChange={(e) => setHumidity(parseInt(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>

        {/* Time of Day Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <Clock size={16} className="text-indigo-500" />
              Time of Day
            </label>
            <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">{hour}:00</span>
          </div>
          <input
            type="range" min="0" max="23" step="1"
            value={hour} onChange={(e) => setHour(parseInt(e.target.value))}
            className="w-full accent-indigo-500"
          />
        </div>

        {/* Holiday Toggle */}
        <div className="flex items-center justify-between p-3 bg-gray-50/80 rounded-xl border border-gray-100">
          <div className="flex items-center gap-3">
            <Calendar size={18} className="text-pink-500" />
            <div>
              <p className="text-sm font-bold text-gray-900">Public Holiday</p>
              <p className="text-[10px] text-gray-500 font-medium">Reduces industrial load</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={isHoliday} onChange={(e) => setIsHoliday(e.target.checked)} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
          </label>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-4 bg-gray-50/50 border-t border-gray-100">
        <button
          onClick={handleRunSimulation}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="animate-pulse">Calculating...</span>
          ) : (
            <>
              <Play size={18} fill="currentColor" />
              Run Prediction
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;