import React, { useState } from 'react';
import { 
  CalendarDays, BarChart3, GitMerge, Users, AlertTriangle, 
  Search, ArrowRight, Zap, Target, TrendingUp, Briefcase, 
  FileSpreadsheet, CheckCircle2, Clock, DollarSign, Shuffle,
  PieChart as PieChartIcon, LayoutDashboard, BrainCircuit
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  LineChart, Line, AreaChart, Area, ComposedChart, Scatter
} from 'recharts';

type Tab = 'PROJECT' | 'BI' | 'SIMULATION';

// --- Project Synergy View (Smart WBS) ---

const ProjectSynergyView = () => {
  const [generating, setGenerating] = useState(false);
  const [wbsGenerated, setWbsGenerated] = useState(false);

  const wbsTasks = [
    { id: '1.1', name: '需求分析与定义', owner: 'Product Mgr', start: 'W1', dur: '2w', status: 'Done' },
    { id: '1.2', name: '系统架构设计', owner: 'Chief Arch', start: 'W3', dur: '3w', status: 'In Progress' },
    { id: '2.1', name: '核心部件详细设计', owner: 'Mech Lead', start: 'W4', dur: '4w', status: 'Pending' },
    { id: '2.2', name: '仿真验证 (CAE)', owner: 'Sim Expert', start: 'W6', dur: '2w', status: 'Pending' },
    { id: '3.1', name: '原型制造与测试', owner: 'Mfg Eng', start: 'W8', dur: '3w', status: 'Pending' },
  ];

  const risks = [
    { id: 'R-01', desc: 'ECN-2024-001 审批停滞 5 天', impact: '详细设计延期风险 85%', action: '建议介入' },
    { id: 'R-02', desc: '仿真资源 (Sim Expert) W6 负荷 120%', impact: '交付瓶颈', action: '推荐备选: Wang Jun' },
  ];

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setWbsGenerated(true);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full animate-in fade-in duration-500">
      {/* Left: Project Creation Wizard */}
      <div className="lg:col-span-3 space-y-6">
         <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
               <Zap size={18} className="text-yellow-400" />
               智能立项向导
            </h3>
            <div className="space-y-4">
               <div>
                  <label className="text-xs text-slate-500 block mb-1.5">项目类型</label>
                  <select className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500">
                     <option>新产品研发 (NPI)</option>
                     <option>核心部件改款 (Upgrade)</option>
                     <option>成本优化项目 (VAVE)</option>
                  </select>
               </div>
               <div>
                  <label className="text-xs text-slate-500 block mb-1.5">复杂度等级</label>
                  <div className="flex gap-2">
                     {['Low', 'Medium', 'High'].map(lvl => (
                        <button key={lvl} className={`flex-1 py-1.5 text-xs rounded border ${lvl === 'High' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                           {lvl}
                        </button>
                     ))}
                  </div>
               </div>
               <div>
                  <label className="text-xs text-slate-500 block mb-1.5">目标上市时间</label>
                  <input type="date" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200" />
               </div>
               
               <button 
                 onClick={handleGenerate}
                 disabled={generating || wbsGenerated}
                 className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors mt-2"
               >
                  {generating ? <span className="animate-pulse">AI 规划中...</span> : wbsGenerated ? '重新生成' : '生成 WBS 计划'}
               </button>
            </div>
         </div>

         {wbsGenerated && (
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 animate-in slide-in-from-bottom-4">
               <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <AlertTriangle size={18} className="text-red-400" />
                  风险实时预警
               </h3>
               <div className="space-y-3">
                  {risks.map((r, i) => (
                     <div key={i} className="p-3 bg-slate-950/50 border border-slate-800 rounded-lg hover:border-red-500/30 transition-colors">
                        <div className="text-xs text-slate-300 font-medium mb-1">{r.desc}</div>
                        <div className="flex items-center gap-2 text-[10px] text-red-400 mb-2">
                           <TrendingUp size={10} /> {r.impact}
                        </div>
                        <button className="w-full py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded text-xs transition-colors">
                           {r.action}
                        </button>
                     </div>
                  ))}
               </div>
            </div>
         )}
      </div>

      {/* Right: Gantt & Resource View */}
      <div className="lg:col-span-9 flex flex-col gap-6">
         {/* WBS Visualization */}
         <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-xl p-5 flex flex-col">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-semibold text-white flex items-center gap-2">
                  <CalendarDays size={18} className="text-blue-400" />
                  智能项目计划 (Smart Gantt)
               </h3>
               {wbsGenerated && (
                  <div className="flex gap-2 text-xs">
                     <span className="flex items-center gap-1 text-slate-400"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> 完成</span>
                     <span className="flex items-center gap-1 text-slate-400"><span className="w-2 h-2 rounded-full bg-blue-500"></span> 进行中</span>
                     <span className="flex items-center gap-1 text-slate-400"><span className="w-2 h-2 rounded-full bg-slate-600"></span> 待办</span>
                  </div>
               )}
            </div>

            {wbsGenerated ? (
               <div className="flex-1 relative border border-slate-800 rounded-lg bg-slate-950 overflow-hidden">
                  {/* Mock Gantt Header */}
                  <div className="h-8 bg-slate-900 border-b border-slate-800 flex text-xs text-slate-500 uppercase font-medium">
                     <div className="w-48 px-4 flex items-center border-r border-slate-800">任务名称</div>
                     <div className="w-24 px-2 flex items-center justify-center border-r border-slate-800">负责人</div>
                     {[1, 2, 3, 4, 5, 6, 7, 8].map(w => (
                        <div key={w} className="flex-1 flex items-center justify-center border-r border-slate-800/50">W{w}</div>
                     ))}
                  </div>
                  {/* Mock Gantt Rows */}
                  <div className="divide-y divide-slate-800/50">
                     {wbsTasks.map((task, i) => (
                        <div key={i} className="h-10 flex text-sm text-slate-300 hover:bg-slate-900/30 transition-colors">
                           <div className="w-48 px-4 flex items-center border-r border-slate-800 font-medium truncate">{task.name}</div>
                           <div className="w-24 px-2 flex items-center justify-center border-r border-slate-800 text-xs text-slate-500">{task.owner}</div>
                           {/* Gantt Bar Placeholder - Simplified Logic */}
                           <div className="flex-1 relative bg-slate-900/20">
                              <div 
                                 className={`absolute top-2 bottom-2 rounded-full shadow-lg ${
                                    task.status === 'Done' ? 'bg-emerald-500' : 
                                    task.status === 'In Progress' ? 'bg-blue-500' : 'bg-slate-600'
                                 }`}
                                 style={{ 
                                    left: `${(parseInt(task.start.substring(1)) - 1) * 12.5}%`, 
                                    width: `${parseInt(task.dur.substring(0,1)) * 12.5}%` 
                                 }}
                              ></div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            ) : (
               <div className="flex-1 flex flex-col items-center justify-center text-slate-600 border border-slate-800 border-dashed rounded-lg bg-slate-950/30">
                  <FileSpreadsheet size={48} className="opacity-20 mb-4" />
                  <p>请在左侧填写项目信息以生成计划</p>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};

// --- BI Cockpit View ---

const BICockpitView = () => {
  const [query, setQuery] = useState('');
  const [showResult, setShowResult] = useState(false);

  // Mock KPI Data
  const kpis = [
    { label: '项目准时交付率', value: '92%', trend: '+3%', status: 'good' },
    { label: '研发成本占比', value: '18%', trend: '-1.5%', status: 'good' },
    { label: '变更平均周期', value: '4.5 天', trend: '+0.5 天', status: 'warn' },
    { label: '产品故障率 (PPM)', value: '120', trend: '-20', status: 'good' },
  ];

  // Mock Chart Data for Query
  const chartData = [
    { name: 'Supplier A', value: 12, type: 'Material' },
    { name: 'Supplier B', value: 8, type: 'Logistics' },
    { name: 'Supplier C', value: 15, type: 'Quality' },
    { name: 'Supplier D', value: 5, type: 'Design' },
  ];

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setShowResult(true);
    }
  };

  return (
    <div className="flex flex-col h-full gap-6 animate-in fade-in duration-500">
      {/* Top: Global KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <div key={i} className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex flex-col justify-between hover:border-slate-700 transition-colors cursor-pointer group">
             <div className="text-xs text-slate-400 uppercase tracking-wide">{k.label}</div>
             <div className="flex items-end justify-between mt-2">
                <div className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{k.value}</div>
                <div className={`text-xs px-1.5 py-0.5 rounded flex items-center gap-1 ${
                   k.status === 'good' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                }`}>
                   {k.status === 'good' ? <TrendingUp size={10} /> : <AlertTriangle size={10} />}
                   {k.trend}
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Main: NL Query Engine */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
         <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col h-full">
               <div className="mb-6">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                     <BrainCircuit size={18} className="text-purple-400" />
                     自然语言 BI 查询引擎
                  </h3>
                  <div className="relative">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                     <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleSearch}
                        placeholder="试试问: '展示上个月因供应商问题导致的设计变更分布'..." 
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-slate-200 focus:outline-none focus:border-purple-500 shadow-inner"
                     />
                  </div>
               </div>

               {showResult ? (
                  <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-5 animate-in fade-in slide-in-from-bottom-2 flex flex-col">
                     <div className="flex justify-between items-start mb-4">
                        <div>
                           <div className="text-sm font-medium text-slate-300">供应商变更延误分析 (Top 4)</div>
                           <div className="text-xs text-slate-500">时间范围: Last Month | 数据源: ERP + PLM</div>
                        </div>
                        <button className="text-xs text-blue-400 flex items-center gap-1"><FileSpreadsheet size={12}/> 导出数据</button>
                     </div>
                     <div className="flex-1 w-full min-h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                              <XAxis type="number" stroke="#475569" fontSize={10} />
                              <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={80} />
                              <Tooltip 
                                 contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#e2e8f0' }}
                                 cursor={{fill: '#1e293b'}}
                              />
                              <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]} barSize={24}>
                                 {chartData.map((entry, index) => (
                                    <React.Fragment key={`cell-${index}`}>
                                       {/* Custom Cell Coloring Logic Mockup */}
                                    </React.Fragment>
                                 ))}
                              </Bar>
                           </BarChart>
                        </ResponsiveContainer>
                     </div>
                     <div className="mt-4 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-sm text-slate-300 flex gap-3">
                        <div className="mt-1 text-indigo-400"><Zap size={16} fill="currentColor" /></div>
                        <div>
                           <span className="font-bold text-indigo-400">AI 洞察:</span> 供应商 C 导致的质量类变更最为频繁 (15起)，占总延误的 37.5%。建议对该供应商启动 SQE 专项审核。
                        </div>
                     </div>
                  </div>
               ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-600">
                     <LayoutDashboard size={48} className="opacity-20 mb-4" />
                     <p>输入问题以生成可视化报表</p>
                  </div>
               )}
            </div>
         </div>

         <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-xl p-5">
               <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Target size={18} className="text-emerald-400" />
                  智能钻取 (Drill-down)
               </h3>
               <div className="space-y-2">
                  <div className="p-3 bg-slate-950 rounded border border-slate-800 opacity-50 pointer-events-none">
                     <div className="text-xs text-slate-500">第一层</div>
                     <div className="text-sm text-slate-300">公司级 KPI 总览</div>
                  </div>
                  <div className="flex justify-center"><ArrowRight size={14} className="rotate-90 text-slate-600"/></div>
                  <div className="p-3 bg-slate-950 rounded border border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                     <div className="text-xs text-blue-400 font-bold">第二层 (当前)</div>
                     <div className="text-sm text-white">供应商绩效分析</div>
                  </div>
                  {showResult && (
                     <>
                     <div className="flex justify-center"><ArrowRight size={14} className="rotate-90 text-slate-600"/></div>
                     <div className="p-3 bg-slate-950 rounded border border-slate-800 hover:border-slate-600 cursor-pointer transition-colors">
                        <div className="text-xs text-slate-500">第三层</div>
                        <div className="text-sm text-slate-300">查看 "供应商 C" 质量工单</div>
                     </div>
                     </>
                  )}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

// --- Strategic Simulation View ---

const SimulationView = () => {
  const [scenario, setScenario] = useState('none');

  const baselineData = [
    { month: 'Jun', cost: 100, time: 0 },
    { month: 'Jul', cost: 120, time: 0 },
    { month: 'Aug', cost: 150, time: 0 },
    { month: 'Sep', cost: 180, time: 0 },
    { month: 'Oct', cost: 200, time: 0 },
  ];

  const scenarioData = [
    { month: 'Jun', cost: 100, time: 0 },
    { month: 'Jul', cost: 130, time: 1 }, // Impact starts
    { month: 'Aug', cost: 180, time: 2 },
    { month: 'Sep', cost: 240, time: 3 }, // Compound effect
    { month: 'Oct', cost: 280, time: 4 },
  ];

  const data = scenario === 'none' ? baselineData : scenarioData.map((d, i) => ({
    ...d,
    baseCost: baselineData[i].cost,
    scenarioCost: d.cost,
    delay: d.time
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full animate-in fade-in duration-500">
       {/* Left: Scenario Builder */}
       <div className="lg:col-span-4 bg-slate-900/50 border border-slate-800 rounded-xl p-5 flex flex-col">
          <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
             <Shuffle size={18} className="text-orange-400" />
             What-If 沙盘推演
          </h3>

          <div className="space-y-6">
             <div>
                <label className="text-xs text-slate-500 block mb-2 uppercase font-semibold">选择预设场景</label>
                <div className="space-y-2">
                   <button 
                     onClick={() => setScenario('none')}
                     className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${
                        scenario === 'none' ? 'bg-slate-800 border-slate-600 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                     }`}
                   >
                      <div className="font-medium">基准计划 (Baseline)</div>
                      <div className="text-xs opacity-60 mt-0.5">当前正常执行路径</div>
                   </button>
                   <button 
                     onClick={() => setScenario('supplier')}
                     className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${
                        scenario === 'supplier' ? 'bg-orange-500/20 border-orange-500 text-orange-200' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                     }`}
                   >
                      <div className="flex items-center gap-2 font-medium"><AlertTriangle size={14}/> 核心供应商断供</div>
                      <div className="text-xs opacity-60 mt-0.5">假设 Supplier A 在 7 月无法交付</div>
                   </button>
                </div>
             </div>

             {scenario === 'supplier' && (
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg animate-in fade-in">
                   <h4 className="text-xs font-semibold text-slate-400 mb-3">AI 连锁反应预测</h4>
                   <ul className="space-y-2 text-xs text-slate-300">
                      <li className="flex items-start gap-2">
                         <div className="min-w-[4px] h-4 bg-red-500 rounded-full mt-0.5"></div>
                         采购: 需紧急切换至 Supplier B (溢价 +15%)
                      </li>
                      <li className="flex items-start gap-2">
                         <div className="min-w-[4px] h-4 bg-orange-500 rounded-full mt-0.5"></div>
                         库存: 安全库存将在 8 月中旬耗尽
                      </li>
                      <li className="flex items-start gap-2">
                         <div className="min-w-[4px] h-4 bg-yellow-500 rounded-full mt-0.5"></div>
                         项目: 关键路径任务 "P-202" 延后 2 周
                      </li>
                   </ul>
                </div>
             )}
          </div>
       </div>

       {/* Right: Simulation Results */}
       <div className="lg:col-span-8 bg-slate-900/50 border border-slate-800 rounded-xl p-5 flex flex-col">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-semibold text-white flex items-center gap-2">
                <BarChart3 size={18} className="text-blue-400" />
                推演结果对比报告
             </h3>
             <div className="flex gap-4 text-xs">
                <span className="flex items-center gap-1 text-slate-400"><span className="w-3 h-1 bg-slate-500 rounded-full"></span> 基准成本</span>
                {scenario !== 'none' && (
                  <>
                   <span className="flex items-center gap-1 text-orange-400"><span className="w-3 h-1 bg-orange-500 rounded-full"></span> 场景成本</span>
                   <span className="flex items-center gap-1 text-red-400 border-l border-slate-700 pl-4"><Clock size={12}/> 预计延期 (周)</span>
                  </>
                )}
             </div>
          </div>

          <div className="flex-1 w-full">
             <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                   <XAxis dataKey="month" stroke="#475569" fontSize={12} />
                   <YAxis yAxisId="left" stroke="#94a3b8" fontSize={12} label={{ value: '累计成本 (k$)', angle: -90, position: 'insideLeft', fill: '#64748b' }} />
                   <YAxis yAxisId="right" orientation="right" stroke="#f87171" fontSize={12} hide={scenario === 'none'} label={{ value: '延期 (周)', angle: 90, position: 'insideRight', fill: '#f87171' }} />
                   <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#e2e8f0' }}
                   />
                   <Area yAxisId="left" type="monotone" dataKey="baseCost" fill="#3b82f6" fillOpacity={0.1} stroke="#3b82f6" strokeWidth={2} />
                   {scenario !== 'none' && (
                      <>
                        <Area yAxisId="left" type="monotone" dataKey="scenarioCost" fill="#f97316" fillOpacity={0.2} stroke="#f97316" strokeDasharray="5 5" strokeWidth={2} />
                        <Line yAxisId="right" type="step" dataKey="delay" stroke="#ef4444" strokeWidth={2} dot={{r:4}} />
                      </>
                   )}
                </ComposedChart>
             </ResponsiveContainer>
          </div>
       </div>
    </div>
  );
};

// --- Main Component ---

const Collaboration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('PROJECT');

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'PROJECT', label: '智能项目协同', icon: GitMerge },
    { id: 'BI', label: '企业数字孪生 (BI)', icon: LayoutDashboard },
    { id: 'SIMULATION', label: '决策沙盘 (What-If)', icon: Shuffle },
  ];

  return (
    <div className="p-6 h-full flex flex-col gap-6">
      {/* Header & Nav */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="text-indigo-500" />
            协同与决策支持
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            从数据驱动的项目管理到企业级战略推演。
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
         {activeTab === 'PROJECT' && <ProjectSynergyView />}
         {activeTab === 'BI' && <BICockpitView />}
         {activeTab === 'SIMULATION' && <SimulationView />}
      </div>
    </div>
  );
};

export default Collaboration;