import React, { useState } from 'react';
import { 
  Database, Server, Network, GitBranch, RefreshCcw, ShieldAlert, 
  CheckCircle2, Play, Cpu, BrainCircuit, Activity, Link as LinkIcon,
  Filter, Search, Layers, AlertTriangle, FileJson, Zap, Share2
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, Cell
} from 'recharts';

type Tab = 'LAKE' | 'MODELS' | 'GRAPH';

// --- Sub-Components ---

const DataLakeView = () => {
  const sources = [
    { name: 'Windchill PLM', type: 'API/Adapter', status: 'Connected', latency: '45ms', records: '2.4M' },
    { name: 'NX / Catia CAD', type: 'File Parser', status: 'Syncing', latency: '120ms', records: '850k' },
    { name: 'SAP ERP', type: 'ODBC', status: 'Connected', latency: '80ms', records: '1.2M' },
    { name: 'IoT Sensors (MES)', type: 'MQTT', status: 'Active', latency: '15ms', records: '500/sec' },
  ];

  const qualityIssues = [
    { id: 'Q-101', type: 'Duplicate', desc: '检测到 3 个高度相似的螺栓几何体', severity: 'Medium', action: '合并建议' },
    { id: 'Q-102', type: 'Missing Attr', desc: '150 个新导入零件缺失 "材质" 属性', severity: 'High', action: '自动填充' },
    { id: 'Q-103', type: 'Standard', desc: '图号格式不符合 GB-2024 规范', severity: 'Low', action: '规则修复' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
      {/* Connections Panel */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
           <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
             <Network className="text-blue-500" size={20}/> 数据源连接与 ETL 管道
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sources.map((src, i) => (
                <div key={i} className="bg-slate-950 border border-slate-800 p-4 rounded-lg flex items-center justify-between group hover:border-blue-500/50 transition-colors">
                   <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${src.status === 'Syncing' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                      <div>
                         <div className="font-medium text-slate-200">{src.name}</div>
                         <div className="text-xs text-slate-500">{src.type} • {src.records}</div>
                      </div>
                   </div>
                   <div className="text-right">
                      <div className="text-xs text-emerald-400 font-mono">{src.latency}</div>
                      <div className="text-[10px] text-slate-600 uppercase mt-1">{src.status}</div>
                   </div>
                </div>
              ))}
           </div>
           
           {/* Visual ETL Flow Mockup */}
           <div className="mt-6 pt-6 border-t border-slate-800 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 px-2 text-xs text-slate-500">实时流水线</div>
              <div className="flex justify-between items-center text-xs text-slate-400 mt-2">
                 <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto"><Database size={20}/></div>
                    <span>原始数据</span>
                 </div>
                 <div className="flex-1 h-0.5 bg-slate-800 mx-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-500/50 w-1/3 animate-loading-bar"></div>
                 </div>
                 <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-lg bg-indigo-900/30 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400"><RefreshCcw size={20}/></div>
                    <span>清洗与标准化</span>
                 </div>
                 <div className="flex-1 h-0.5 bg-slate-800 mx-4"></div>
                 <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto"><FileJson size={20}/></div>
                    <span>向量化嵌入</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Data Lineage Preview */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
           <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
             <GitBranch className="text-purple-500" size={20}/> 数据血缘追踪
           </h3>
           <div className="h-40 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center text-slate-500 text-sm">
              [交互式血缘图谱占位符: 零件 A -> 工艺卡 B -> 仿真报告 C]
           </div>
        </div>
      </div>

      {/* Governance Panel */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 flex flex-col">
         <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
           <ShieldAlert className="text-amber-500" size={20}/> 数据治理 Agent
         </h3>
         
         <div className="mb-6">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
               <span>整体健康度</span>
               <span className="text-emerald-400 font-bold">88%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
               <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 w-[88%]"></div>
            </div>
         </div>

         <div className="flex-1 space-y-4 overflow-y-auto">
            {qualityIssues.map((issue, i) => (
               <div key={i} className="bg-slate-950 border border-slate-800 p-3 rounded-lg hover:border-amber-500/30 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                     <span className={`text-[10px] px-1.5 py-0.5 rounded border uppercase ${
                        issue.severity === 'High' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                        issue.severity === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                     }`}>{issue.type}</span>
                     <span className="text-xs text-slate-500 font-mono">{issue.id}</span>
                  </div>
                  <p className="text-sm text-slate-300 mb-3">{issue.desc}</p>
                  <button className="w-full py-1.5 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded text-xs text-slate-300 transition-colors">
                     <Zap size={12} className="text-yellow-400" /> AI {issue.action}
                  </button>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

const ModelFactoryView = () => {
  const models = [
    { name: 'Struct-Sim-Proxy-v4', type: 'Surrogate (FEA)', status: 'Training', progress: 65, accuracy: '98.2%' },
    { name: 'Windchill-CodeLlama-7B', type: 'LLM (Fine-tune)', status: 'Deployed', progress: 100, accuracy: 'N/A' },
    { name: 'Blade-Geo-Generator', type: 'Diffusion', status: 'Eval', progress: 90, accuracy: '94.5%' },
  ];

  const trainingData = [
    { step: 0, loss: 2.5 }, { step: 10, loss: 1.8 }, { step: 20, loss: 1.2 }, 
    { step: 30, loss: 0.8 }, { step: 40, loss: 0.5 }, { step: 50, loss: 0.45 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
       <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                   <BrainCircuit className="text-indigo-500" size={20}/> 活跃训练流水线
                </h3>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-2">
                   <Play size={14} /> 新建任务
                </button>
             </div>

             <div className="space-y-6">
                {models.map((model, i) => (
                   <div key={i} className="bg-slate-950 border border-slate-800 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                         <div className="flex items-center gap-3">
                            <Cpu className={model.status === 'Training' ? 'text-blue-400 animate-pulse' : 'text-slate-500'} size={20} />
                            <div>
                               <div className="font-medium text-slate-200">{model.name}</div>
                               <div className="text-xs text-slate-500">{model.type}</div>
                            </div>
                         </div>
                         <div className="text-right">
                             <span className={`text-xs px-2 py-1 rounded border ${
                                model.status === 'Training' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                model.status === 'Deployed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                'bg-purple-500/10 text-purple-400 border-purple-500/20'
                             }`}>{model.status}</span>
                         </div>
                      </div>
                      
                      {model.status !== 'Deployed' && (
                         <div className="space-y-1">
                            <div className="flex justify-between text-xs text-slate-400">
                               <span>Epoch 45/100</span>
                               <span>{model.progress}%</span>
                            </div>
                            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                               <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${model.progress}%` }}></div>
                            </div>
                         </div>
                      )}
                      
                      {model.status === 'Deployed' && (
                         <div className="flex gap-4 text-xs text-slate-400 mt-2">
                            <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-emerald-500"/> API Ready</span>
                            <span>Latency: 240ms</span>
                            <span>Daily Calls: 15k</span>
                         </div>
                      )}
                   </div>
                ))}
             </div>
          </div>
       </div>

       <div className="space-y-6">
          {/* Training Metrics */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
             <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                <Activity size={16} /> 实时损失函数 (Loss)
             </h3>
             <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={trainingData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="step" hide />
                      <YAxis stroke="#475569" fontSize={10} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#e2e8f0' }}
                        itemStyle={{ color: '#818cf8' }}
                      />
                      <Line type="monotone" dataKey="loss" stroke="#6366f1" strokeWidth={2} dot={false} />
                   </LineChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* Model Service Registry */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
             <h3 className="text-sm font-semibold text-slate-300 mb-4">私有 LLM 服务</h3>
             <div className="space-y-3">
                <div className="p-3 bg-slate-950 rounded border border-slate-800 flex justify-between items-center">
                   <span className="text-sm text-slate-300">Llama-3-70B-Instruct</span>
                   <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                </div>
                <div className="p-3 bg-slate-950 rounded border border-slate-800 flex justify-between items-center">
                   <span className="text-sm text-slate-300">CodeQwen-1.5-7B</span>
                   <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

const KnowledgeGraphView = () => {
  // Mock Graph Nodes
  const nodes = [
    { id: 'REQ-001', label: '需求: 续航 > 500km', type: 'REQ', x: 50, y: 50, color: '#ef4444' },
    { id: 'FUNC-01', label: '功能: 电池管理', type: 'FUNC', x: 250, y: 50, color: '#f59e0b' },
    { id: 'LOG-02', label: '逻辑: BMS 控制器', type: 'LOGIC', x: 450, y: 50, color: '#10b981' },
    { id: 'PART-88', label: '物理: 散热板', type: 'PHY', x: 450, y: 200, color: '#3b82f6' },
    { id: 'SIM-99', label: '验证: 热仿真', type: 'VAL', x: 650, y: 200, color: '#8b5cf6' },
  ];

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500">
       <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
             <button className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-sm border border-slate-700 flex items-center gap-2">
                <Filter size={14}/> 实体过滤
             </button>
             <button className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-sm border border-slate-700 flex items-center gap-2">
                <Layers size={14}/> RFLP 视图
             </button>
          </div>
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
             <input type="text" placeholder="搜索图谱节点..." className="bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500" />
          </div>
       </div>

       <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
          {/* Main Graph Canvas Area */}
          <div className="lg:col-span-3 bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden group">
             {/* Mock Graph SVG */}
             <svg className="w-full h-full pointer-events-none">
                <defs>
                   <marker id="arrow" markerWidth="10" markerHeight="10" refX="20" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L9,3 z" fill="#475569" />
                   </marker>
                </defs>
                {/* Connections */}
                <line x1="150" y1="80" x2="250" y2="80" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="350" y1="80" x2="450" y2="80" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="500" y1="110" x2="500" y2="200" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="550" y1="230" x2="650" y2="230" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />

                {/* Nodes */}
                {nodes.map((node, i) => (
                   <g key={i} className="cursor-pointer hover:opacity-80 transition-opacity pointer-events-auto">
                      <rect x={node.x} y={node.y} width="160" height="60" rx="8" fill="#1e293b" stroke={node.color} strokeWidth="2" />
                      <text x={node.x + 80} y={node.y + 25} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{node.type}</text>
                      <text x={node.x + 80} y={node.y + 45} textAnchor="middle" fill="#94a3b8" fontSize="10">{node.label}</text>
                   </g>
                ))}
             </svg>
             
             {/* Canvas Controls */}
             <div className="absolute bottom-4 right-4 flex gap-2">
                <button className="p-2 bg-slate-800 rounded text-slate-400 hover:text-white border border-slate-700">+</button>
                <button className="p-2 bg-slate-800 rounded text-slate-400 hover:text-white border border-slate-700">-</button>
             </div>
          </div>

          {/* Side Panel: Impact Analysis */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 flex flex-col">
             <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Activity size={20} className="text-red-500" /> 影响分析
             </h3>
             
             <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 mb-4">
                <div className="text-xs text-slate-500 mb-1">选中对象</div>
                <div className="font-medium text-slate-200">REQ-001: 续航 > 500km</div>
             </div>

             <div className="flex-1 overflow-y-auto">
                <h4 className="text-xs font-semibold text-slate-400 uppercase mb-3">受影响下游实体 (3)</h4>
                <div className="space-y-2">
                   {[
                     { id: 'PART-88', name: '散热板 (Heatsink)', type: 'PHY', risk: 'High' },
                     { id: 'SIM-99', name: '热仿真报告 v2', type: 'VAL', risk: 'Medium' },
                     { id: 'DOC-204', name: '电池包规格书', type: 'DOC', risk: 'Low' }
                   ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded hover:bg-slate-800 cursor-pointer border border-transparent hover:border-slate-700">
                         <div className={`w-1.5 h-1.5 rounded-full ${item.risk === 'High' ? 'bg-red-500' : 'bg-amber-500'}`}></div>
                         <div className="flex-1">
                            <div className="text-sm text-slate-300">{item.name}</div>
                            <div className="text-[10px] text-slate-500">{item.id} • {item.type}</div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             <button className="mt-4 w-full py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-lg text-sm font-medium transition-colors">
                生成变更通知 (ECN)
             </button>
          </div>
       </div>
    </div>
  );
};

// --- Main Component ---

const DataFoundation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('LAKE');

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'LAKE', label: '统一数据湖与治理', icon: Database },
    { id: 'MODELS', label: 'AI 模型工厂', icon: Cpu },
    { id: 'GRAPH', label: 'PLM 知识图谱中枢', icon: Share2 },
  ];

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Server className="text-indigo-400" />
            数据与 AI 基础平台
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            企业级数据治理、MLOps 模型训练与全链路知识图谱。
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === tab.id 
                  ? 'bg-slate-800 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0">
        {activeTab === 'LAKE' && <DataLakeView />}
        {activeTab === 'MODELS' && <ModelFactoryView />}
        {activeTab === 'GRAPH' && <KnowledgeGraphView />}
      </div>
    </div>
  );
};

export default DataFoundation;