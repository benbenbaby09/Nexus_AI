import React, { useState } from 'react';
import { 
  ListTree, Factory, GitPullRequest, ScanEye, AlertTriangle, 
  CheckCircle2, ArrowRight, FileText, Settings2, Network, 
  DollarSign, Package, Wrench, Search, Plus, Sparkles, 
  Copy, BarChart4, Microscope, Ruler, Timer, Wand2
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell 
} from 'recharts';

type Tab = 'BOM' | 'PROCESS' | 'CHANGE';

// --- BOM Management View ---

const BOMManagerView = () => {
  const [auditStatus, setAuditStatus] = useState<'IDLE' | 'RUNNING' | 'DONE'>('IDLE');
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);

  const bomItems = [
    { id: 'ASM-2024-001', name: '高压涡轮总成 (HPT Assembly)', rev: 'A.2', type: 'Assembly', status: 'In Work' },
    { id: 'SUB-1002', name: '├─ 转子组件', rev: 'A.1', type: 'Sub-Assembly', status: 'Released' },
    { id: 'PRT-5501', name: '│  ├─ 涡轮叶片 (Blade)', rev: 'B.3', type: 'Part', status: 'In Work' },
    { id: 'PRT-5502', name: '│  ├─ 轮盘 (Disk)', rev: 'A.1', type: 'Part', status: 'Released' },
    { id: 'PRT-NEW', name: '│  └─ [新增] 紧固螺栓 M12', rev: '-', type: 'Part', status: 'Draft' },
  ];

  const auditIssues = [
    { id: 'ERR-01', item: 'PRT-5501', msg: '缺失关联的 2D 工程图', severity: 'High' },
    { id: 'ERR-02', item: 'PRT-NEW', msg: '属性 "材质 (Material)" 未填写', severity: 'Medium' },
    { id: 'WARN-01', item: 'PRT-NEW', msg: '未指定首选供应商', severity: 'Low' },
  ];

  const runAudit = () => {
    setAuditStatus('RUNNING');
    setTimeout(() => setAuditStatus('DONE'), 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full animate-in fade-in duration-500">
      {/* Left: BOM Tree Structure */}
      <div className="lg:col-span-8 bg-slate-900/50 border border-slate-800 rounded-xl p-5 flex flex-col">
        <div className="flex justify-between items-center mb-4">
           <h3 className="font-semibold text-white flex items-center gap-2">
             <ListTree size={18} className="text-blue-400" />
             BOM 结构 (EBOM)
           </h3>
           <div className="flex gap-2">
             <button 
                onClick={() => setShowDuplicateModal(true)}
                className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 flex items-center gap-2"
             >
                <Plus size={14} /> 添加物料
             </button>
             <button 
               onClick={runAudit}
               disabled={auditStatus === 'RUNNING'}
               className="px-3 py-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white rounded flex items-center gap-2"
             >
               {auditStatus === 'RUNNING' ? <Sparkles size={14} className="animate-spin" /> : <ScanEye size={14} />}
               完整性审计
             </button>
           </div>
        </div>

        <div className="flex-1 bg-slate-950 rounded-lg border border-slate-800 overflow-hidden">
           <table className="w-full text-sm text-left text-slate-400">
              <thead className="bg-slate-900 text-xs uppercase font-medium">
                <tr>
                   <th className="px-4 py-3">编号 (Number)</th>
                   <th className="px-4 py-3">名称 (Name)</th>
                   <th className="px-4 py-3">版本</th>
                   <th className="px-4 py-3">类型</th>
                   <th className="px-4 py-3">状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {bomItems.map((item, i) => (
                  <tr key={i} className={`hover:bg-slate-900/50 ${item.id === 'PRT-NEW' ? 'bg-blue-500/5' : ''}`}>
                     <td className="px-4 py-3 font-mono text-slate-300">{item.id}</td>
                     <td className="px-4 py-3 text-slate-200">{item.name}</td>
                     <td className="px-4 py-3">{item.rev}</td>
                     <td className="px-4 py-3">{item.type}</td>
                     <td className="px-4 py-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded border ${
                           item.status === 'Released' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                           item.status === 'In Work' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                           'bg-slate-700/30 text-slate-400 border-slate-600/30'
                        }`}>{item.status}</span>
                     </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>
      </div>

      {/* Right: AI Panel (Audit & Recommendation) */}
      <div className="lg:col-span-4 space-y-6">
         {/* Duplicate Recommendation Modal Simulation */}
         {showDuplicateModal && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 animate-in slide-in-from-right-4">
               <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                     <Copy size={16} className="text-amber-400" />
                     智能选型推荐
                  </h4>
                  <button onClick={() => setShowDuplicateModal(false)} className="text-slate-500 hover:text-white"><AlertTriangle size={14}/></button>
               </div>
               <p className="text-xs text-slate-400 mb-4">
                  系统检测到您尝试创建的新零件 "Hex Bolt M12" 与库中现有零件高度相似。
               </p>
               
               <div className="space-y-3">
                  <div className="bg-slate-950 p-3 rounded border border-emerald-500/30 relative overflow-hidden">
                     <div className="absolute top-0 right-0 bg-emerald-500 text-slate-900 text-[10px] px-2 py-0.5 font-bold">99% 相似</div>
                     <div className="flex gap-3">
                        <div className="w-12 h-12 bg-slate-800 rounded flex items-center justify-center text-xs text-slate-500">3D</div>
                        <div>
                           <div className="text-sm font-medium text-emerald-400">STD-BOLT-M12-40</div>
                           <div className="text-xs text-slate-500 mt-1">标准件库 • 库存: 500+</div>
                        </div>
                     </div>
                     <button className="mt-2 w-full py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded">直接选用</button>
                  </div>

                  <div className="bg-slate-950 p-3 rounded border border-slate-700 opacity-60">
                     <div className="absolute top-0 right-0 bg-slate-700 text-slate-300 text-[10px] px-2 py-0.5">85% 相似</div>
                     <div className="flex gap-3">
                        <div className="w-12 h-12 bg-slate-800 rounded flex items-center justify-center text-xs text-slate-500">3D</div>
                        <div>
                           <div className="text-sm font-medium text-slate-300">STD-BOLT-M12-35</div>
                           <div className="text-xs text-slate-500 mt-1">长度差异 5mm</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* Audit Report */}
         <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 flex-1">
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
               <ScanEye size={18} className="text-indigo-400" />
               审计报告
            </h4>
            
            {auditStatus === 'IDLE' && (
               <div className="text-center py-8 text-slate-500 text-sm">
                  点击 "完整性审计" 开始扫描 BOM。
               </div>
            )}

            {auditStatus === 'RUNNING' && (
               <div className="space-y-3 py-4">
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                     <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                     正在检查几何关联性...
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300 opacity-50">
                     <div className="w-4 h-4 border-2 border-slate-600 border-t-transparent rounded-full"></div>
                     正在验证属性完整性...
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mt-4">
                     <div className="h-full bg-indigo-500 animate-[loading-bar_1.5s_ease-in-out_infinite]"></div>
                  </div>
               </div>
            )}

            {auditStatus === 'DONE' && (
               <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-center gap-2 mb-2">
                     <span className="text-2xl font-bold text-amber-400">3</span>
                     <span className="text-sm text-slate-400">个潜在问题待修复</span>
                  </div>
                  {auditIssues.map((issue, i) => (
                     <div key={i} className="p-3 bg-slate-950 rounded border border-slate-800 flex gap-3 group hover:border-slate-600 transition-colors cursor-pointer">
                        <AlertTriangle size={16} className={issue.severity === 'High' ? 'text-red-400' : 'text-amber-400'} />
                        <div>
                           <div className="text-xs font-mono text-slate-500 mb-0.5">{issue.item}</div>
                           <div className="text-sm text-slate-200">{issue.msg}</div>
                        </div>
                        <ArrowRight size={14} className="ml-auto text-slate-600 group-hover:text-slate-300 self-center" />
                     </div>
                  ))}
                  <button className="w-full mt-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded border border-slate-700">
                     一键修复建议
                  </button>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};

// --- Process Planning View ---

const ProcessPlannerView = () => {
  const [analyzing, setAnalyzing] = useState(false);
  
  // Mock Process Data
  const features = [
    { id: 'F-01', type: '孔 (Hole)', spec: 'Ø10 H7', depth: '15mm', roughness: 'Ra 1.6' },
    { id: 'F-02', type: '平面 (Face)', spec: 'Flatness 0.05', depth: '-', roughness: 'Ra 0.8' },
    { id: 'F-03', type: '槽 (Slot)', spec: '12mm x 5mm', depth: '5mm', roughness: 'Ra 3.2' },
  ];

  const processRoute = [
    { step: 10, op: '铣削平面', tool: '面铣刀 Ø50', params: 'S=800, F=200', icon: Factory },
    { step: 20, op: '钻中心孔', tool: '中心钻 Ø3', params: 'S=1500, F=80', icon: Ruler },
    { step: 30, op: '钻底孔', tool: '麻花钻 Ø9.8', params: 'S=1200, F=120', icon: Ruler },
    { step: 40, op: '铰孔 (精加工)', tool: '铰刀 Ø10 H7', params: 'S=400, F=40', icon: Microscope },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full animate-in fade-in duration-500">
       {/* Left: 3D Visualization Placeholder */}
       <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex-1 bg-black rounded-xl border border-slate-800 relative group overflow-hidden">
             <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
                <div className="text-slate-600 text-sm flex flex-col items-center gap-2">
                   <div className="w-24 h-24 border-2 border-slate-700 border-dashed rounded-lg flex items-center justify-center">
                      3D Model
                   </div>
                   [零件三维模型预览区]
                </div>
             </div>
             {/* Feature Markers (Mock) */}
             <div className="absolute top-1/3 left-1/2 w-4 h-4 border-2 border-yellow-500 rounded-full animate-ping"></div>
             <div className="absolute top-1/3 left-1/2 w-4 h-4 border-2 border-yellow-500 rounded-full"></div>
             <div className="absolute top-1/3 left-[55%] bg-yellow-500/10 backdrop-blur border border-yellow-500/50 text-yellow-400 text-[10px] px-2 py-1 rounded">
                特征 F-01: Ø10 H7
             </div>
          </div>
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
             <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <ScanEye size={18} className="text-purple-400" />
                特征自动识别
             </h3>
             <div className="space-y-2">
                {features.map((f, i) => (
                   <div key={i} className="flex justify-between items-center p-2 bg-slate-950 border border-slate-800 rounded hover:border-purple-500/30 transition-colors">
                      <div className="flex items-center gap-3">
                         <span className="text-xs font-mono text-slate-500">{f.id}</span>
                         <span className="text-sm text-slate-200">{f.type}</span>
                      </div>
                      <div className="text-right">
                         <div className="text-xs text-slate-400">{f.spec}</div>
                         <div className="text-[10px] text-slate-600">{f.roughness}</div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>

       {/* Right: AI Process Planning */}
       <div className="lg:col-span-7 bg-slate-900/50 border border-slate-800 rounded-xl p-5 flex flex-col">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-semibold text-white flex items-center gap-2">
                <Wrench size={18} className="text-emerald-400" />
                智能工艺路线生成
             </h3>
             <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded flex items-center gap-2 shadow-lg shadow-emerald-500/20">
                <Sparkles size={14} /> 重新生成
             </button>
          </div>

          <div className="relative pl-6 border-l border-slate-800 space-y-8 my-4">
             {processRoute.map((step, i) => (
                <div key={i} className="relative group">
                   {/* Timeline Node */}
                   <div className="absolute -left-[31px] bg-slate-900 border-2 border-slate-700 group-hover:border-emerald-500 text-slate-500 group-hover:text-emerald-500 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors">
                      {step.step}
                   </div>
                   
                   {/* Card */}
                   <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 group-hover:border-slate-600 transition-all">
                      <div className="flex justify-between items-start mb-2">
                         <div className="flex items-center gap-2">
                            <step.icon size={16} className="text-blue-400" />
                            <span className="font-medium text-slate-200">{step.op}</span>
                         </div>
                         <span className="text-xs text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                            AI 推荐
                         </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-3">
                         <div className="bg-slate-900/50 p-2 rounded border border-slate-800/50">
                            <div className="text-[10px] text-slate-500 uppercase mb-1">推荐刀具</div>
                            <div className="text-xs text-slate-300 flex items-center gap-1">
                               <Settings2 size={12} /> {step.tool}
                            </div>
                         </div>
                         <div className="bg-slate-900/50 p-2 rounded border border-slate-800/50">
                            <div className="text-[10px] text-slate-500 uppercase mb-1">切削参数</div>
                            <div className="text-xs font-mono text-emerald-400">
                               {step.params}
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             ))}
          </div>
          
          <div className="mt-auto pt-4 border-t border-slate-800">
             <div className="flex items-center justify-between text-xs text-slate-500">
                <span>知识库来源: Enterprise_Std_V4.0</span>
                <span>置信度: 98.5%</span>
             </div>
          </div>
       </div>
    </div>
  );
};

// --- Change Management View ---

const ChangeManagerView = () => {
  const [summaryGenerated, setSummaryGenerated] = useState(false);

  const costData = [
    { name: '库存报废', value: 4500 },
    { name: '工装修改', value: 12000 },
    { name: '重新认证', value: 3000 },
    { name: '人工成本', value: 1500 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full animate-in fade-in duration-500">
       {/* Left: ECN Detail & AI Summary */}
       <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
             <div className="flex justify-between items-start mb-4">
                <div>
                   <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-white">ECN-2024-055</h3>
                      <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded border border-red-500/30">High Priority</span>
                   </div>
                   <p className="text-sm text-slate-400">发动机支架材料及工艺变更</p>
                </div>
                <div className="text-right text-xs text-slate-500">
                   <div>发起人: John Doe</div>
                   <div>日期: 2024-10-24</div>
                </div>
             </div>

             <div className="space-y-2 mb-4">
                <div className="p-2 bg-slate-950 rounded border border-slate-800 flex items-center justify-between">
                   <span className="text-xs text-slate-400 flex items-center gap-2"><FileText size={14}/> 客户需求变更通知.pdf</span>
                   <button className="text-xs text-blue-400 hover:underline">预览</button>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800 flex items-center justify-between">
                   <span className="text-xs text-slate-400 flex items-center gap-2"><FileText size={14}/> 结构强度分析报告_V2.docx</span>
                   <button className="text-xs text-blue-400 hover:underline">预览</button>
                </div>
             </div>

             <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10"><Sparkles size={48} /></div>
                <h4 className="text-sm font-semibold text-indigo-300 mb-2 flex items-center gap-2">
                   <Wand2 size={14}/> AI 智能摘要
                </h4>
                {summaryGenerated ? (
                   <p className="text-sm text-slate-300 leading-relaxed animate-in fade-in">
                      因客户要求提升整机防水等级至 IP67，需将<strong>发动机支架 (P/N: BK-202)</strong> 的材质由 45# 钢更改为 <strong>304 不锈钢</strong>，并增加密封槽加工工序。预计影响 3 套在制模具，需报废库存零件 50 件。
                   </p>
                ) : (
                   <div className="text-center py-4">
                      <button 
                        onClick={() => setSummaryGenerated(true)}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs rounded shadow-lg transition-colors"
                      >
                         阅读附件并生成摘要
                      </button>
                   </div>
                )}
             </div>
          </div>
       </div>

       {/* Right: Knowledge Graph Impact Analysis */}
       <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
             <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Network size={18} className="text-blue-400" />
                基于图谱的影响分析
             </h3>

             <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-center">
                   <div className="text-xs text-slate-500 uppercase mb-1">预计总成本</div>
                   <div className="text-xl font-bold text-red-400 flex items-center justify-center gap-1">
                      <DollarSign size={16} /> 21,000
                   </div>
                </div>
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-center">
                   <div className="text-xs text-slate-500 uppercase mb-1">受影响对象</div>
                   <div className="text-xl font-bold text-amber-400 flex items-center justify-center gap-1">
                      <Package size={16} /> 12 Items
                   </div>
                </div>
             </div>

             <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={costData} layout="vertical" margin={{ left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                      <XAxis type="number" stroke="#475569" fontSize={10} />
                      <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={80} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#e2e8f0' }}
                        cursor={{fill: '#1e293b'}}
                      />
                      <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20}>
                        {costData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#ef4444', '#f59e0b', '#3b82f6', '#10b981'][index % 4]} />
                        ))}
                      </Bar>
                   </BarChart>
                </ResponsiveContainer>
             </div>
             
             <div className="mt-4 pt-4 border-t border-slate-800">
                <div className="text-xs text-slate-400 mb-2">关键风险提示:</div>
                <div className="flex gap-2">
                   <span className="px-2 py-1 bg-red-500/10 text-red-400 border border-red-500/20 text-xs rounded">工装交付延迟风险</span>
                   <span className="px-2 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs rounded">库存呆滞</span>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

// --- Main Component ---

const EngineeringMfg: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('BOM');

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'BOM', label: '智能 BOM 管理', icon: ListTree },
    { id: 'PROCESS', label: '智能工艺规划', icon: Factory },
    { id: 'CHANGE', label: '智能变更管理', icon: GitPullRequest },
  ];

  return (
    <div className="p-6 h-full flex flex-col gap-6">
      {/* Header & Nav */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Wrench className="text-blue-500" />
            工程与制造
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            BOM 完整性审计、自动化工艺规划与变更影响分析。
          </p>
        </div>

        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-md transition-all ${
                activeTab === tab.id 
                  ? 'bg-slate-800 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 relative">
         {activeTab === 'BOM' && <BOMManagerView />}
         {activeTab === 'PROCESS' && <ProcessPlannerView />}
         {activeTab === 'CHANGE' && <ChangeManagerView />}
      </div>
    </div>
  );
};

export default EngineeringMfg;