import React from 'react';
import { CloudSun, Wind, Thermometer, Zap, Play, RotateCcw } from 'lucide-react';
import { cn } from '../../lib/utils';

const ControlPanel: React.FC = () => {
  const [temp, setTemp] = React.useState(32);
  const [humidity, setHumidity] = React.useState(65);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleRun = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="w-80 bg-white/90 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl shadow-blue-500/10 p-6 flex flex-col gap-8 h-[calc(100vh-12rem)] overflow-y-auto custom-scrollbar">
      {/* Top Gauges */}
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase">Live Supply vs Demand</span>
            <span className="text-xs font-bold text-emerald-600">Stable</span>
          </div>
          <div className="relative h-24 flex items-end justify-center overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-32 h-32 rounded-full border-[10px] border-gray-100 border-b-transparent rotate-[-45deg]" />
               <div className="w-32 h-32 rounded-full border-[10px] border-blue-500 border-b-transparent rotate-[-45deg] absolute" style={{ clipPath: 'inset(0 0 50% 0)' }} />
             </div>
             <div className="text-center z-10">
               <p className="text-2xl font-black text-gray-900">84%</p>
               <p className="text-[10px] font-bold text-gray-400">LOAD FACTOR</p>
             </div>
          </div>
        </div>
      </div>

      {/* Weather Snapshot */}
      <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-blue-900">Weather Integration</h3>
          <CloudSun className="text-blue-500" size={18} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Thermometer size={16} className="text-orange-500" />
            <div>
              <p className="text-xs font-bold text-gray-900">{temp}°C</p>
              <p className="text-[8px] font-bold text-gray-400 uppercase">Temp</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind size={16} className="text-blue-400" />
            <div>
              <p className="text-xs font-bold text-gray-900">12 km/h</p>
              <p className="text-[8px] font-bold text-gray-400 uppercase">Wind</p>
            </div>
          </div>
        </div>
      </div>

      {/* What-If Sliders */}
      <div className="space-y-6">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <Zap size={16} className="text-blue-500" />
          Simulation Inputs
        </h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Simulate Temperature</label>
              <span className="text-xs font-bold text-blue-600">{temp}°C</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="50" 
              value={temp}
              onChange={(e) => setTemp(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Simulate Humidity</label>
              <span className="text-xs font-bold text-blue-600">{humidity}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={humidity}
              onChange={(e) => setHumidity(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>

        <div className="space-y-3">
          {[
            { label: 'Holiday Mode', active: false },
            { label: 'Maintenance Mode', active: true },
            { label: 'High Alert', active: false },
          ].map((mode) => (
            <div key={mode.label} className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700">{mode.label}</span>
              <button className={cn(
                "w-10 h-5 rounded-full transition-colors relative",
                mode.active ? "bg-blue-500" : "bg-gray-200"
              )}>
                <div className={cn(
                  "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                  mode.active ? "left-6" : "left-1"
                )} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-auto pt-6 space-y-3">
        <button 
          onClick={handleRun}
          disabled={isLoading}
          className="w-full py-4 px-6 bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {isLoading ? (
            <RotateCcw className="animate-spin" size={18} />
          ) : (
            <Play size={18} fill="white" />
          )}
          {isLoading ? 'Processing...' : 'Run Prediction'}
        </button>
        <p className="text-[10px] text-center font-bold text-gray-400">Estimated API latency: 120ms</p>
      </div>
    </div>
  );
};

export default ControlPanel;
