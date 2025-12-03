
import React, { useState, useEffect } from 'react';
import { AppLayer } from '../types';
import { 
  LayoutDashboard, 
  Database, 
  PenTool, 
  Wrench, 
  ShieldCheck, 
  Users, 
  TerminalSquare,
  Globe,
  ChevronDown,
  ChevronRight,
  FileCheck,
  Stethoscope,
  MessageSquare,
  Activity,
  BookOpen,
  GitMerge,
  Shuffle,
  Split,
  Cpu,
  Box,
  ImagePlus,
  ListTree,
  Factory,
  GitPullRequest,
  Server,
  Share2,
  Code2,
  TestTube,
  Diff
} from 'lucide-react';

interface NavbarProps {
  currentLayer: AppLayer;
  setLayer: (layer: AppLayer) => void;
}

interface NavItem {
  id?: AppLayer;
  label: string;
  icon: React.ReactNode;
  children?: NavItem[];
  groupKey?: string; // Unique key for parent items that are not directly navigable layers
}

const Navbar: React.FC<NavbarProps> = ({ currentLayer, setLayer }) => {
  // State to track expanded groups - expand Data and Design by default as well
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['DESIGN_GROUP', 'QUALITY_GROUP']));

  const navItems: NavItem[] = [
    { id: AppLayer.SYSTEM_INTRO, label: '平台概览', icon: <Globe size={20} /> },
    { id: AppLayer.HOME, label: '工作台', icon: <LayoutDashboard size={20} /> },
    
    { 
      groupKey: 'DATA_GROUP',
      label: '数据基础层', 
      icon: <Database size={20} />,
      children: [
        { id: AppLayer.DATA_LAKE, label: '数据湖与治理', icon: <Server size={16} /> },
        { id: AppLayer.DATA_MODELS, label: 'AI 模型工厂', icon: <Cpu size={16} /> },
        { id: AppLayer.DATA_GRAPH, label: 'PLM 知识图谱', icon: <Share2 size={16} /> },
      ]
    },
    { 
      groupKey: 'DESIGN_GROUP',
      label: '设计与仿真', 
      icon: <PenTool size={20} />,
      children: [
        { id: AppLayer.DESIGN_REQUIREMENTS, label: '智能需求工程', icon: <Split size={16} /> },
        { id: AppLayer.DESIGN_SIMULATION_CORE, label: '设计与仿真', icon: <Activity size={16} /> },
        { id: AppLayer.DESIGN_BLENDER, label: 'Blender Studio', icon: <Box size={16} /> },
        { id: AppLayer.DESIGN_IMG23D, label: '图生 3D', icon: <ImagePlus size={16} /> },
        { id: AppLayer.DESIGN_COMPARE, label: '图纸比对', icon: <Diff size={16} /> },
      ]
    },
    { 
      groupKey: 'ENG_GROUP',
      label: '工程与制造', 
      icon: <Wrench size={20} />,
      children: [
        { id: AppLayer.ENGINEERING_BOM, label: '智能 BOM 管理', icon: <ListTree size={16} /> },
        { id: AppLayer.ENGINEERING_PROCESS, label: '智能工艺规划', icon: <Factory size={16} /> },
        { id: AppLayer.ENGINEERING_CHANGE, label: '变更管理 (ECN)', icon: <GitPullRequest size={16} /> },
      ]
    },
    { 
      groupKey: 'QUALITY_GROUP',
      label: '质量与服务', 
      icon: <ShieldCheck size={20} />,
      children: [
        { id: AppLayer.QUALITY_DIAGNOSIS, label: '智能诊断 (RAG)', icon: <Stethoscope size={16} /> },
        { id: AppLayer.QUALITY_VOC, label: '客户声音 (VoC)', icon: <MessageSquare size={16} /> },
        { id: AppLayer.QUALITY_FORMAT, label: '格式合规卫士', icon: <FileCheck size={16} /> },
        { id: AppLayer.QUALITY_PREDICTIVE, label: '预测性质量', icon: <Activity size={16} /> },
        { id: AppLayer.QUALITY_DOCS, label: '文档中心 (QMS)', icon: <BookOpen size={16} /> },
      ]
    },
    { 
      groupKey: 'COLLAB_GROUP',
      label: '协同与决策', 
      icon: <Users size={20} />,
      children: [
        { id: AppLayer.COLLABORATION_PROJECT, label: '智能项目协同', icon: <GitMerge size={16} /> },
        { id: AppLayer.COLLABORATION_BI, label: '企业数字孪生 (BI)', icon: <LayoutDashboard size={16} /> },
        { id: AppLayer.COLLABORATION_SIMULATION, label: '决策沙盘 (What-If)', icon: <Shuffle size={16} /> },
      ]
    },
    { 
      groupKey: 'DEVOPS_GROUP',
      label: 'DevOps 中心', 
      icon: <TerminalSquare size={20} />,
      children: [
        { id: AppLayer.DEVOPS_CODEGEN, label: '代码生成器', icon: <Code2 size={16} /> },
        { id: AppLayer.DEVOPS_TESTING, label: '自动化测试', icon: <TestTube size={16} /> },
        { id: AppLayer.DEVOPS_MIGRATION, label: '数据迁移助手', icon: <Database size={16} /> },
      ]
    },
  ];

  // Auto-expand group if current layer is inside it
  useEffect(() => {
    navItems.forEach(item => {
      if (item.children) {
        const hasActiveChild = item.children.some(child => child.id === currentLayer);
        if (hasActiveChild) {
          setExpandedGroups(prev => new Set(prev).add(item.groupKey!));
        }
      }
    });
  }, [currentLayer]);

  const toggleGroup = (key: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <div className="w-20 lg:w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen transition-all duration-300 flex-shrink-0">
      <div className="p-4 flex items-center justify-center lg:justify-start gap-3 border-b border-slate-800 h-16">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
          N
        </div>
        <span className="hidden lg:block font-bold text-lg tracking-tight text-white">
          PLM Nexus AI
        </span>
      </div>

      <nav className="flex-1 py-6 space-y-1 overflow-y-auto px-2">
        {navItems.map((item, index) => {
          if (item.children && item.groupKey) {
            const isExpanded = expandedGroups.has(item.groupKey);
            const isActiveParent = item.children.some(child => child.id === currentLayer);
            
            return (
              <div key={item.groupKey} className="mb-1">
                <button
                  onClick={() => toggleGroup(item.groupKey!)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors rounded-lg
                    ${isActiveParent ? 'text-blue-400 bg-slate-800/30' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/30'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span className="hidden lg:block truncate">{item.label}</span>
                  </div>
                  <span className="hidden lg:block">
                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </span>
                </button>
                
                {/* Sub-menu */}
                {isExpanded && (
                  <div className="mt-1 space-y-1 bg-slate-950/30 rounded-lg overflow-hidden hidden lg:block">
                    {item.children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => child.id && setLayer(child.id)}
                        className={`w-full flex items-center gap-3 pl-12 pr-4 py-2.5 text-xs font-medium transition-colors relative
                          ${currentLayer === child.id 
                            ? 'text-white bg-blue-600/10 border-r-2 border-blue-500' 
                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
                          }`}
                      >
                         <span className="flex-shrink-0">{child.icon}</span>
                         <span className="truncate">{child.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => item.id && setLayer(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors relative rounded-lg mb-1
                ${currentLayer === item.id 
                  ? 'text-blue-400 bg-slate-800/50' 
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/30'
                }`}
            >
              {currentLayer === item.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-blue-500 rounded-r-full" />
              )}
              <span className="flex-shrink-0">{item.icon}</span>
              <span className="hidden lg:block truncate">{item.label}</span>
            </button>
          );
        })}
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
