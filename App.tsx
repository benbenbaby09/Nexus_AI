
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

const App: React.FC = () => {
  const [currentLayer, setLayer] = useState<AppLayer>(AppLayer.SYSTEM_INTRO);
  const [currentPersona, setPersona] = useState<UserPersona>(UserPersona.ENGINEER);

  const renderContent = () => {
    switch (currentLayer) {
      case AppLayer.SYSTEM_INTRO:
        return <SystemIntro setLayer={setLayer} />;
      case AppLayer.HOME:
        return <Workbench persona={currentPersona} />;
      
      // Data Foundation Sub-modules
      case AppLayer.DATA_LAKE:
        return <DataFoundation viewMode="LAKE" />;
      case AppLayer.DATA_MODELS:
        return <DataFoundation viewMode="MODELS" />;
      case AppLayer.DATA_GRAPH:
        return <DataFoundation viewMode="GRAPH" />;
      case AppLayer.DATA_FOUNDATION: // Fallback
        return <DataFoundation viewMode="LAKE" />;

      // Design & Simulation Sub-modules
      case AppLayer.DESIGN_REQUIREMENTS:
        return <DesignSim viewMode="REQUIREMENTS" />;
      case AppLayer.DESIGN_SIMULATION_CORE:
        return <DesignSim viewMode="SIMULATION" />;
      case AppLayer.DESIGN_BLENDER:
        return <DesignSim viewMode="BLENDER" />;
      case AppLayer.DESIGN_IMG23D:
        return <DesignSim viewMode="IMG_TO_3D" />;
      case AppLayer.DESIGN_COMPARE:
        return <DesignSim viewMode="COMPARE" />;
      case AppLayer.DESIGN_SIMULATION: // Fallback
        return <DesignSim viewMode="SIMULATION" />;

      // Engineering & Mfg Sub-modules
      case AppLayer.ENGINEERING_BOM:
        return <EngineeringMfg viewMode="BOM" />;
      case AppLayer.ENGINEERING_PROCESS:
        return <EngineeringMfg viewMode="PROCESS" />;
      case AppLayer.ENGINEERING_CHANGE:
        return <EngineeringMfg viewMode="CHANGE" />;
      case AppLayer.ENGINEERING_MFG: // Fallback
        return <EngineeringMfg viewMode="BOM" />;
      
      // Quality Sub-modules
      case AppLayer.QUALITY_PREDICTIVE:
        return <QualityService viewMode="PREDICTIVE" />;
      case AppLayer.QUALITY_DIAGNOSIS:
        return <QualityService viewMode="DIAGNOSIS" />;
      case AppLayer.QUALITY_VOC:
        return <QualityService viewMode="VOC" />;
      case AppLayer.QUALITY_FORMAT:
        return <QualityService viewMode="FORMAT" />;
      case AppLayer.QUALITY_DOCS:
        return <QualityService viewMode="DOCS" />;

      // Collaboration Sub-modules
      case AppLayer.COLLABORATION_PROJECT:
        return <Collaboration viewMode="PROJECT" />;
      case AppLayer.COLLABORATION_BI:
        return <Collaboration viewMode="BI" />;
      case AppLayer.COLLABORATION_SIMULATION:
        return <Collaboration viewMode="SIMULATION" />;
      case AppLayer.COLLABORATION: // Fallback
        return <Collaboration viewMode="PROJECT" />;

      // DevOps Sub-modules
      case AppLayer.DEVOPS_CODEGEN:
        return <DevOps viewMode="CODEGEN" />;
      case AppLayer.DEVOPS_TESTING:
        return <DevOps viewMode="TESTING" />;
      case AppLayer.DEVOPS_MIGRATION:
        return <DevOps viewMode="MIGRATION" />;
      case AppLayer.DEVOPS: // Fallback
        return <DevOps viewMode="CODEGEN" />;

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
