import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import ControlPanel from '../components/simulation/ControlPanel';
import SimulationMap from '../components/simulation/SimulationMap';
import { History, Maximize2, Search } from 'lucide-react';

const Simulation: React.FC = () => {
  const [isLogsOpen, setIsLogsOpen] = useState(false);

  // NEW: Lifted state to manage the global load between sibling components
  const [currentLoad, setCurrentLoad] = useState<number>(12000);

  return (
    <Layout title="ML Simulation & Control" noPadding>
      <div className="relative h-[calc(100vh-5rem)] w-full">
        {/* Map Layer */}
        <div className="absolute inset-0 z-0">
          {/* NEW: Pass currentLoad down as a prop */}
          <SimulationMap currentLoad={currentLoad} />
        </div>

        {/* Floating UI Layers */}
        <div className="absolute inset-0 z-10 pointer-events-none flex justify-between items-start p-6">
          <div className="pointer-events-auto">
            {/* NEW: Pass the setter function down so the control panel can update it */}
            <ControlPanel onPredictionUpdate={setCurrentLoad} />
          </div>

          <div className="flex flex-col gap-4 pointer-events-auto items-end">
            <div className="bg-white rounded-2xl shadow-xl p-2 flex gap-2">
              <button className="p-2.5 hover:bg-gray-50 rounded-xl transition-colors text-gray-400 hover:text-blue-500">
                <Search size={20} />
              </button>
              <button className="p-2.5 hover:bg-gray-50 rounded-xl transition-colors text-gray-400 hover:text-blue-500">
                <Maximize2 size={20} />
              </button>
              <button
                onClick={() => setIsLogsOpen(!isLogsOpen)}
                className="p-2.5 bg-blue-50 text-blue-600 rounded-xl transition-colors flex items-center gap-2 px-4"
              >
                <History size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">Logs</span>
              </button>
            </div>
          </div>
        </div>

        {/* Historical Logs Drawer */}
        <div className={`absolute bottom-0 right-0 top-0 w-96 bg-white shadow-2xl z-20 transition-transform duration-500 ease-in-out border-l border-gray-100 ${isLogsOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900">Simulation History</h2>
              <button onClick={() => setIsLogsOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-4 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors group">
                  <div className="flex justify-between items-start mb-3">
                    <p className="text-xs font-bold text-blue-600">PREDICTION #{2045 + i}</p>
                    <span className="text-[10px] font-bold text-gray-400">2 mins ago</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Temp</p>
                      <p className="text-sm font-bold text-gray-900">34°C</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Forecast</p>
                      <p className="text-sm font-bold text-gray-900">15.2 GW</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-50 hidden group-hover:block transition-all">
                    <button className="text-[10px] font-bold text-blue-500 uppercase tracking-widest hover:underline">Download Report</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Simulation;