
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TopBar from './components/TopBar';
import Copilot from './components/Copilot';
import Workbench from './components/Workbench';
import DesignSim from './components/Modules/DesignSim';
import DataFoundation from './components/Modules/DataFoundation';
import EngineeringMfg from './components/Modules/EngineeringMfg';
import QualityService from './components/Modules/QualityService';
import Collaboration from './components/Modules/Collaboration';
import DevOps from './components/Modules/DevOps';
import SystemIntro from './components/Modules/SystemIntro';
import { AppLayer, UserPersona } from './types';
import { Database, Wrench, ShieldCheck, Users, TerminalSquare } from 'lucide-react';

const PlaceholderModule: React.FC<{ title: string; icon: React.ReactNode; desc: string }> = ({ title, icon, desc }) => (
  <div className="flex flex-col items-center justify-center h-full text-center p-12 opacity-50">
    <div className="p-6 bg-slate-800 rounded-full mb-6 text-slate-400">
      {icon}
    </div>
    <h2 className="text-2xl font-bold text-slate-200 mb-2">{title}</h2>
    <p className="text-slate-400 max-w-md">{desc}</p>
  </div>
);

const App: React.FC = () => {
  const [currentLayer, setLayer] = useState<AppLayer>(AppLayer.SYSTEM_INTRO);
  const [currentPersona, setPersona] = useState<UserPersona>(UserPersona.ENGINEER);

  const renderContent = () => {
    switch (currentLayer) {
      case AppLayer.SYSTEM_INTRO:
        return <SystemIntro setLayer={setLayer} />;
      case AppLayer.HOME:
        return <Workbench persona={currentPersona} />;
      case AppLayer.DESIGN_SIMULATION:
        return <DesignSim />;
      case AppLayer.DATA_FOUNDATION:
        return <DataFoundation />;
      case AppLayer.ENGINEERING_MFG:
        return <EngineeringMfg />;
      case AppLayer.QUALITY_SERVICE:
        return <QualityService />;
      case AppLayer.COLLABORATION:
        return <Collaboration />;
      case AppLayer.DEVOPS:
        return <DevOps />;
      default:
        return <div className="p-6">未找到模块</div>;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans selection:bg-blue-500/30">
      <Navbar currentLayer={currentLayer} setLayer={setLayer} />
      
      <div className="flex-1 flex flex-col min-w-0 relative">
        <TopBar currentPersona={currentPersona} setPersona={setPersona} />
        
        <main className="flex-1 overflow-y-auto relative z-10">
          {renderContent()}
        </main>
        
        {/* Floating Copilot Layer */}
        <Copilot currentPersona={currentPersona} currentLayer={currentLayer} />
      </div>
    </div>
  );
};

export default App;
