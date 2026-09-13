import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, History, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Map, label: 'Simulation', path: '/simulation' },
  { icon: History, label: 'Performance', path: '/history' },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#3B82F6] to-[#06B6D4] flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <Zap size={24} fill="white" />
        </div>
        <span className="font-bold text-xl tracking-tight text-gray-800">GridFlow</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  size={20}
                  className={cn(
                    "transition-colors",
                    isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                  )}
                />
                <span>{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-6 bg-blue-600 rounded-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-6 mt-auto">
        <div className="bg-linear-to-br from-blue-500 to-cyan-400 rounded-2xl p-4 text-white shadow-xl shadow-blue-500/20">
          <p className="text-xs font-medium opacity-80 mb-1">System Status</p>
          <p className="text-sm font-bold mb-3">Model: XGBoost v2.4</p>
          <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
            <div className="bg-white h-full w-[92%]" />
          </div>
          <p className="text-[10px] mt-2 opacity-80 text-center">Confidence: 92.4%</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;