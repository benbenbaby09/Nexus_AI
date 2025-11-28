import React from 'react';
import { AppLayer } from '../types';
import { 
  LayoutDashboard, 
  Database, 
  PenTool, 
  Wrench, 
  ShieldCheck, 
  Users, 
  TerminalSquare 
} from 'lucide-react';

interface NavbarProps {
  currentLayer: AppLayer;
  setLayer: (layer: AppLayer) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentLayer, setLayer }) => {
  const navItems = [
    { id: AppLayer.HOME, label: '工作台', icon: <LayoutDashboard size={20} /> },
    { id: AppLayer.DATA_FOUNDATION, label: '数据基础层', icon: <Database size={20} /> },
    { id: AppLayer.DESIGN_SIMULATION, label: '设计与仿真', icon: <PenTool size={20} /> },
    { id: AppLayer.ENGINEERING_MFG, label: '工程与制造', icon: <Wrench size={20} /> },
    { id: AppLayer.QUALITY_SERVICE, label: '质量与服务', icon: <ShieldCheck size={20} /> },
    { id: AppLayer.COLLABORATION, label: '协同合作', icon: <Users size={20} /> },
    { id: AppLayer.DEVOPS, label: 'DevOps 中心', icon: <TerminalSquare size={20} /> },
  ];

  return (
    <div className="w-20 lg:w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen transition-all duration-300 flex-shrink-0">
      <div className="p-4 flex items-center justify-center lg:justify-start gap-3 border-b border-slate-800 h-16">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
          N
        </div>
        <span className="hidden lg:block font-bold text-lg tracking-tight text-white">
          Nexus AI
        </span>
      </div>

      <nav className="flex-1 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setLayer(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors relative
              ${currentLayer === item.id 
                ? 'text-blue-400 bg-slate-800/50' 
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/30'
              }`}
          >
            {currentLayer === item.id && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full" />
            )}
            <span className="flex-shrink-0">{item.icon}</span>
            <span className="hidden lg:block truncate">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
            JD
          </div>
          <div className="hidden lg:block">
            <div className="text-sm font-medium text-slate-200">John Doe</div>
            <div className="text-xs text-slate-500">高级工程师</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;