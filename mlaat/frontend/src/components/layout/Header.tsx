import React from 'react';
import { Search, Bell, User, Calendar } from 'lucide-react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
           <Calendar size={12} />
           <span>{time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
           <span className="w-1 h-1 bg-gray-300 rounded-full" />
           <span className="text-blue-500">{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500" size={18} />
          <input
            type="text"
            placeholder="Search metrics..."
            className="pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-200 transition-all w-64"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2.5 bg-gray-50 text-gray-500 rounded-xl hover:bg-gray-100 hover:text-gray-700 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full" />
          </button>
          
          <div className="flex items-center gap-3 pl-3 border-l border-gray-100">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900 leading-none">Rahul S.</p>
              <p className="text-[10px] text-gray-400 font-medium mt-1 uppercase tracking-wider">Grid Admin</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 border border-blue-200 overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" alt="User" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
