
import React, { useState, useEffect } from 'react';
import { UserPersona } from '../types';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Clock, CheckCircle2, AlertTriangle, FileText, ArrowRight, 
  Cpu, Zap, BookOpen, GitPullRequest, Activity, Terminal, 
  Server, Bug, Play, ShieldCheck, Share2, Search, Database, 
  Code, AlertOctagon, RefreshCw, Hexagon, Layers, Wind, Workflow,
  X, Settings2, Scale, Microscope, Check, ChevronRight, Box
} from 'lucide-react';

interface WorkbenchProps {
  persona: UserPersona;
}

// --- Shared Components ---

const Card = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <div className={`bg-slate-900/50 border border-slate-800 rounded-xl p-5 ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ icon: Icon, title, action }: { icon: any, title: string, action?: React.ReactNode }) => (
  <div className="flex justify-between items-center mb-4">
    <div className="flex items-center gap-2 text-slate-200 font-semibold">
      <Icon className="text-blue-500" size={18} />
      <h3>{title}</h3>
    </div>
    {action}
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    'Running': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Completed': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Pending': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Failed': 'bg-red-500/10 text-red-400 border-red-500/20',
    'Queued': 'bg-slate-700/30 text-slate-400 border-slate-600/30',
  };
  const defaultStyle = styles['Queued'];
  return (
    <span className={`text-xs font-mono px-2 py-0.5 rounded border ${styles[status] || defaultStyle}`}>
      {status}
    </span>
  );
};

// --- Designer View ---

const DesignerDashboard = () => {
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState<'CONFIG' | 'PROCESSING' | 'RESULTS'>('CONFIG');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);

  const tasks = [
    { id: 'T-101', title: '起落架液压支柱 CAD 修改', type: 'Design', deadline: '今天 14:00' },
    { id: 'T-102', title: '机翼前缘复合材料模型审核', type: 'Review', deadline: '明天' },
    { id: 'T-103', title: '涡轮叶片散热孔优化 (工艺反馈)', type: 'Revision', deadline: 'Oct 25' },
  ];

  const simulations = [
    { id: 'SIM-001', name: '结构强度分析 (FEA)', progress: 85, status: 'Running' },
    { id: 'SIM-002', name: '流体动力学 (CFD) - 进气道', progress: 0, status: 'Queued' },
    { id: 'SIM-003', name: '热模态分析', progress: 100, status: 'Completed' },
  ];

  const handleStartGeneration = () => {
    setWizardStep('PROCESSING');
    setProcessingProgress(0);
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setWizardStep('RESULTS');
          return 100;
        }
        return prev + 2; // Speed of simulation
      });
    }, 50);
  };

  const generatedVariants = [
    { id: 1, name: 'Organic Topology', weight: '-32%', stress: '420 MPa', cost: '$$$', type: 'Additive', imgPath: 'M10,90 Q50,10 90,90 T170,90' },
    { id: 2, name: 'Lattice Structure', weight: '-45%', stress: '480 MPa', cost: '$$$$', type: 'Additive', imgPath: 'M10,90 L50,20 L90,90 L130,20 L170,90' },
    { id: 3, name: 'Hybrid Frame', weight: '-18%', stress: '380 MPa', cost: '$', type: 'CNC', imgPath: 'M10,90 H170 V40 H10 Z' },
  ];

  const handleCloseWizard = () => {
    setShowWizard(false);
    setWizardStep('CONFIG');
    setProcessingProgress(0);
    setSelectedVariant(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      
      {/* Wizard Modal */}
      {showWizard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Hexagon className="text-indigo-500" /> AI 生成式设计向导
                </h2>
                <p className="text-sm text-slate-400">Generative Design Studio</p>
              </div>
              <button onClick={handleCloseWizard} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8">
              
              {/* Step 1: Configuration */}
              {wizardStep === 'CONFIG' && (
                <div className="space-y-8 animate-in slide-in-from-right-4">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-300 block mb-2">设计目标描述</label>
                        <textarea 
                          className="w-full h-32 bg-slate-950 border border-slate-700 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
                          placeholder="例如：优化发动机支架结构，在保持刚度的前提下减轻重量，需避开线束通道..."
                          defaultValue="优化涡轮叶片冷却通道结构，最大化散热效率，同时满足离心力结构强度要求。"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-300 block mb-2">制造工艺约束</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button className="p-3 bg-indigo-600/20 border border-indigo-500 text-indigo-300 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                            <Layers size={16}/> 增材制造 (3D Print)
                          </button>
                          <button className="p-3 bg-slate-950 border border-slate-700 text-slate-400 rounded-lg text-sm font-medium hover:border-slate-600 transition-colors">
                            <Box size={16}/> 减材制造 (CNC)
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-slate-950/50 p-5 rounded-xl border border-slate-800">
                        <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                          <Settings2 size={16} className="text-slate-400"/> 边界参数
                        </h4>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                              <span>目标安全系数</span>
                              <span className="text-white">1.5</span>
                            </div>
                            <input type="range" className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" min="1" max="3" step="0.1" defaultValue="1.5"/>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                              <span>材料</span>
                              <span className="text-white">Ti-6Al-4V (Grade 5)</span>
                            </div>
                            <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 outline-none">
                              <option>Ti-6Al-4V (Grade 5)</option>
                              <option>Inconel 718</option>
                              <option>Aluminum 7075-T6</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Processing */}
              {wizardStep === 'PROCESSING' && (
                <div className="flex flex-col items-center justify-center h-full py-12 animate-in zoom-in-95">
                  <div className="relative w-48 h-48 mb-8">
                    <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="4"/>
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#6366f1" strokeWidth="4" strokeDasharray="280" strokeDashoffset={280 - (280 * processingProgress) / 100} strokeLinecap="round"/>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">
                      {processingProgress}%
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {processingProgress < 30 ? '初始化体素网格 (Voxelizing)...' : 
                     processingProgress < 70 ? '拓扑优化迭代 (Iterating)...' : 
                     '验证结构完整性 (Validating)...'}
                  </h3>
                  <p className="text-slate-400 text-sm">AI 正在探索数千种设计可能性...</p>
                  
                  {/* Real-time Log Simulation */}
                  <div className="mt-8 w-full max-w-lg bg-slate-950 rounded-lg border border-slate-800 p-4 font-mono text-xs text-slate-500 h-32 overflow-hidden relative">
                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-slate-950 to-transparent"></div>
                    <div className="space-y-1">
                      <div>[INFO] Loading load cases: Centrifugal + Thermal</div>
                      <div>[INFO] Material defined: Ti-6Al-4V (E=113.8 GPa)</div>
                      {processingProgress > 20 && <div>[PROC] Iteration 12: Mass -5%, Stiffness +2%</div>}
                      {processingProgress > 40 && <div>[PROC] Iteration 45: Mass -15%, Stiffness +0.5%</div>}
                      {processingProgress > 60 && <div>[PROC] Iteration 88: Converging topology...</div>}
                      {processingProgress > 80 && <div className="text-emerald-500">[SUCC] Validation passed. Safety Factor: 1.52</div>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Results */}
              {wizardStep === 'RESULTS' && (
                <div className="animate-in slide-in-from-right-4">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-white">生成结果 (3 Variants)</h3>
                    <div className="flex gap-4 text-sm">
                      <span className="text-slate-400">基准重量: <span className="text-white">2.4 kg</span></span>
                      <span className="text-slate-400">基准应力: <span className="text-white">350 MPa</span></span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    {generatedVariants.map((variant) => (
                      <div 
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant.id)}
                        className={`group relative bg-slate-950 border rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] ${
                          selectedVariant === variant.id ? 'border-indigo-500 ring-1 ring-indigo-500/50' : 'border-slate-800 hover:border-slate-600'
                        }`}
                      >
                        {/* Visual Placeholder */}
                        <div className="h-40 bg-slate-900 relative flex items-center justify-center overflow-hidden">
                          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-950 opacity-50"></div>
                          <svg viewBox="0 0 200 100" className="w-3/4 h-3/4 drop-shadow-2xl">
                             <path d={variant.imgPath} fill="none" stroke={selectedVariant === variant.id ? '#818cf8' : '#cbd5e1'} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" className="transition-colors"/>
                          </svg>
                          <div className="absolute top-2 right-2 bg-slate-900/80 px-2 py-1 rounded text-[10px] text-slate-300 backdrop-blur border border-slate-700">
                            {variant.type}
                          </div>
                        </div>

                        {/* Metrics */}
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className={`font-semibold ${selectedVariant === variant.id ? 'text-indigo-400' : 'text-slate-200'}`}>{variant.name}</h4>
                            {selectedVariant === variant.id && <CheckCircle2 size={18} className="text-indigo-500"/>}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm">
                            <div>
                              <div className="text-xs text-slate-500 mb-0.5">减重</div>
                              <div className="text-emerald-400 font-bold">{variant.weight}</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-500 mb-0.5">最大应力</div>
                              <div className={parseInt(variant.stress) > 450 ? 'text-amber-400' : 'text-slate-200'}>{variant.stress}</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-500 mb-0.5">制造成本</div>
                              <div className="text-slate-300">{variant.cost}</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-500 mb-0.5">AI 评分</div>
                              <div className="text-indigo-400 font-bold">{(9.5 - variant.id * 0.5).toFixed(1)}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Controls */}
            <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex justify-between items-center rounded-b-2xl">
              {wizardStep === 'CONFIG' && (
                <>
                  <button onClick={handleCloseWizard} className="text-slate-400 hover:text-white text-sm font-medium">取消</button>
                  <button 
                    onClick={handleStartGeneration}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-lg shadow-indigo-500/20"
                  >
                    <Zap size={18} /> 开始生成
                  </button>
                </>
              )}
              {wizardStep === 'PROCESSING' && (
                <div className="w-full flex justify-center text-sm text-slate-500">
                  请稍候，计算大约需要几秒钟...
                </div>
              )}
              {wizardStep === 'RESULTS' && (
                <>
                  <button onClick={() => setWizardStep('CONFIG')} className="text-slate-400 hover:text-white text-sm font-medium">返回修改参数</button>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium">
                      导出报告
                    </button>
                    <button 
                      onClick={handleCloseWizard}
                      disabled={!selectedVariant}
                      className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-colors"
                    >
                      <Check size={18} /> 采用此方案
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Gen Design Banner */}
      <div className="relative overflow-hidden rounded-xl border border-indigo-500/30 bg-gradient-to-r from-indigo-900/40 to-slate-900 p-8">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none"></div>
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <Hexagon className="text-indigo-400" /> 生成式设计工作台
            </h2>
            <p className="text-slate-300 max-w-xl">
              基于当前项目上下文（涡轮引擎组件），AI 已为您预填充了边界条件和材料参数。
            </p>
          </div>
          <button 
            onClick={() => setShowWizard(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-transform hover:scale-105 shadow-lg shadow-indigo-500/25"
          >
            <Zap size={18} /> 启动生成向导
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Task Kanban */}
        <Card className="lg:col-span-2">
          <SectionTitle icon={Layers} title="智能任务看板" action={<button className="text-xs text-blue-400">查看全部</button>} />
          <div className="space-y-3">
            {tasks.map((task, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-950/50 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`w-1 h-10 rounded-full ${task.type === 'Review' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                  <div>
                    <div className="font-medium text-slate-200 group-hover:text-blue-400 transition-colors">{task.title}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                      <span className="bg-slate-800 px-1.5 rounded">{task.type}</span>
                      <span>截止: {task.deadline}</span>
                    </div>
                  </div>
                </div>
                <ArrowRight className="text-slate-600 group-hover:text-slate-300" size={16} />
              </div>
            ))}
          </div>
        </Card>

        {/* Right: Simulation Queue */}
        <Card>
          <SectionTitle icon={Cpu} title="仿真队列与状态" />
          <div className="space-y-5">
            {simulations.map((sim, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">{sim.name}</span>
                  <StatusBadge status={sim.status} />
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${sim.status === 'Running' ? 'bg-blue-500 animate-pulse' : sim.status === 'Completed' ? 'bg-emerald-500' : 'bg-slate-600'}`} 
                    style={{ width: `${sim.progress}%` }} 
                  />
                </div>
                {sim.status === 'Completed' && (
                  <div className="mt-1 text-xs text-emerald-400 flex items-center gap-1 cursor-pointer hover:underline">
                    <FileText size={10} /> 查看报告摘要
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Inspiration Push */}
      <Card>
        <SectionTitle icon={BookOpen} title="灵感与知识推送 (基于当前项目上下文)" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: '类似案例：GE9X 涡轮叶片设计', tag: '最佳实践', color: 'from-blue-600 to-blue-800' },
            { title: '新材料：镍基单晶高温合金 (CMSX-4)', tag: '材料库', color: 'from-purple-600 to-purple-800' },
            { title: '专利：高效气膜冷却孔结构', tag: '知识产权', color: 'from-emerald-600 to-emerald-800' },
          ].map((item, i) => (
            <div key={i} className="group relative overflow-hidden rounded-lg border border-slate-700 h-28 cursor-pointer">
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
              <div className="relative p-4 flex flex-col justify-between h-full">
                <span className="text-xs font-mono uppercase text-slate-400 border border-slate-600/50 self-start px-1.5 rounded bg-slate-900/50">{item.tag}</span>
                <span className="font-medium text-slate-200 group-hover:text-white">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// --- Engineer View ---

const EngineerDashboard = () => {
  const bomData = [
    { name: '受影响组件', value: 12, fill: '#3b82f6' },
    { name: '未受影响', value: 48, fill: '#1e293b' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Windchill Tasks */}
        <Card className="lg:col-span-2">
          <SectionTitle icon={GitPullRequest} title="Windchill 待办聚合" action={<span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">2个紧急任务</span>} />
          <div className="overflow-hidden rounded-lg border border-slate-800">
            <table className="w-full text-sm text-left text-slate-400">
              <thead className="bg-slate-950 text-xs uppercase font-medium">
                <tr>
                  <th className="px-4 py-3">编号</th>
                  <th className="px-4 py-3">任务内容</th>
                  <th className="px-4 py-3">优先级</th>
                  <th className="px-4 py-3">状态</th>
                  <th className="px-4 py-3">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                <tr className="hover:bg-slate-800/50">
                  <td className="px-4 py-3 font-mono">ECN-24-055</td>
                  <td className="px-4 py-3 font-medium text-slate-200">发动机支架材料变更 (Steel -&gt; Ti)</td>
                  <td className="px-4 py-3"><span className="text-red-400 flex items-center gap-1"><AlertTriangle size={12}/> High</span></td>
                  <td className="px-4 py-3"><StatusBadge status="Pending" /></td>
                  <td className="px-4 py-3"><button className="text-blue-400 hover:underline">处理</button></td>
                </tr>
                <tr className="hover:bg-slate-800/50">
                  <td className="px-4 py-3 font-mono">TASK-992</td>
                  <td className="px-4 py-3">批准制造 BOM (MBOM) V1.2</td>
                  <td className="px-4 py-3"><span className="text-amber-400">Medium</span></td>
                  <td className="px-4 py-3"><StatusBadge status="Pending" /></td>
                  <td className="px-4 py-3"><button className="text-blue-400 hover:underline">审批</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* BOM Impact Panel */}
        <Card>
          <SectionTitle icon={AlertOctagon} title="BOM 变更影响预估" />
          <div className="flex items-center gap-4 mb-4">
             <div className="w-24 h-24 flex-shrink-0">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie data={bomData} innerRadius={25} outerRadius={40} paddingAngle={5} dataKey="value">
                     {bomData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.fill} />
                     ))}
                   </Pie>
                 </PieChart>
               </ResponsiveContainer>
             </div>
             <div className="space-y-2 text-sm">
                <div className="flex justify-between w-40 border-b border-slate-800 pb-1">
                   <span className="text-slate-500">成本变动</span>
                   <span className="text-red-400 font-medium">+$5,200</span>
                </div>
                <div className="flex justify-between w-40 border-b border-slate-800 pb-1">
                   <span className="text-slate-500">ERP 同步</span>
                   <span className="text-amber-400">待处理</span>
                </div>
                <div className="flex justify-between w-40">
                   <span className="text-slate-500">库存影响</span>
                   <span className="text-slate-200">Low</span>
                </div>
             </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Compliance Assistant */}
         <Card>
            <SectionTitle icon={ShieldCheck} title="合规性检查助手" />
            <div className="flex gap-4">
               <div className="flex-1 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg flex items-center gap-3">
                  <div className="bg-emerald-500/20 p-2 rounded-full text-emerald-400"><CheckCircle2 size={18} /></div>
                  <div>
                    <div className="text-sm font-medium text-emerald-400">RoHS 合规</div>
                    <div className="text-xs text-emerald-500/70">所有新材料已通过验证</div>
                  </div>
               </div>
               <div className="flex-1 bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg flex items-center gap-3">
                  <div className="bg-amber-500/20 p-2 rounded-full text-amber-400"><AlertTriangle size={18} /></div>
                  <div>
                    <div className="text-sm font-medium text-amber-400">ISO 安全警告</div>
                    <div className="text-xs text-amber-500/70">需更新 MSDS 文档</div>
                  </div>
               </div>
            </div>
         </Card>

         {/* Collaboration Flow */}
         <Card>
            <SectionTitle icon={Workflow} title="跨部门协作流 (ECN-24-055)" />
            <div className="relative pt-2">
               <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2"></div>
               <div className="flex justify-between relative z-10 text-xs">
                  {[
                    { label: '工程发起', status: 'done' },
                    { label: '工艺会签', status: 'current' },
                    { label: '成本核算', status: 'pending' },
                    { label: '批准归档', status: 'pending' }
                  ].map((step, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                         step.status === 'done' ? 'bg-emerald-500 border-emerald-500 text-slate-900' :
                         step.status === 'current' ? 'bg-slate-900 border-blue-500 text-blue-500' :
                         'bg-slate-900 border-slate-700 text-slate-600'
                       }`}>
                         {step.status === 'done' ? <CheckCircle2 size={16} /> : <span>{i+1}</span>}
                       </div>
                       <span className={`${step.status === 'current' ? 'text-blue-400 font-medium' : 'text-slate-500'}`}>{step.label}</span>
                    </div>
                  ))}
               </div>
            </div>
         </Card>
      </div>
    </div>
  );
};

// --- Developer View ---

const DeveloperDashboard = () => {
  const healthData = [
    { name: 'Windchill PLM', status: 'OK', latency: '45ms', uptime: '99.9%' },
    { name: 'ERP Connector', status: 'Error', latency: 'Timeout', uptime: '98.2%' },
    { name: 'MES Gateway', status: 'OK', latency: '120ms', uptime: '99.5%' },
    { name: 'Auth Service', status: 'OK', latency: '28ms', uptime: '100%' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {healthData.map((sys, i) => (
          <div key={i} className={`p-4 rounded-xl border flex flex-col justify-between h-32 ${
            sys.status === 'OK' ? 'bg-slate-900/50 border-slate-800' : 'bg-red-500/5 border-red-500/20'
          }`}>
             <div className="flex justify-between items-start">
               <div className="flex items-center gap-2">
                 <Activity size={16} className={sys.status === 'OK' ? 'text-emerald-400' : 'text-red-400'} />
                 <span className="font-medium text-slate-200">{sys.name}</span>
               </div>
               <div className={`w-2 h-2 rounded-full ${sys.status === 'OK' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-red-500 animate-pulse'}`}></div>
             </div>
             <div>
               <div className="text-2xl font-bold text-slate-100">{sys.latency}</div>
               <div className="text-xs text-slate-500 mt-1">Uptime: {sys.uptime}</div>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Smart Log Analyzer */}
        <Card className="lg:col-span-2 flex flex-col">
           <SectionTitle icon={Terminal} title="智能日志分析器" action={<button className="text-xs text-blue-400 flex items-center gap-1"><RefreshCw size={12}/> 刷新</button>} />
           <div className="flex-1 bg-black rounded-lg p-4 font-mono text-xs overflow-hidden border border-slate-800 relative">
              <div className="text-slate-500 mb-1">[INFO] 10:42:15 - Windchill Start-up sequence completed.</div>
              <div className="text-slate-500 mb-1">[INFO] 10:42:18 - Cache manager initialized.</div>
              <div className="text-red-400 mb-1">[ERROR] 10:45:02 - Connection Timeout: SAP_Gateway (Port 8080) unreachable.</div>
              <div className="text-slate-500 mb-1">[WARN] 10:45:03 - Retrying connection (1/3)...</div>
              
              {/* AI Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur border border-indigo-500/30 rounded-lg p-3">
                 <div className="flex items-start gap-3">
                    <div className="bg-indigo-500/20 p-1.5 rounded text-indigo-400 mt-0.5"><Zap size={14}/></div>
                    <div>
                       <div className="text-indigo-300 font-medium mb-1">AI 根因分析</div>
                       <p className="text-slate-400 leading-relaxed">检测到 ERP 连接器超时。这通常是由于 VPN 隧道不稳定或防火墙规则变更导致的。建议检查网络配置或重启 Connector 服务。</p>
                       <div className="mt-2 flex gap-2">
                          <button className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 border border-slate-700 transition-colors">查看知识库 #992</button>
                          <button className="px-2 py-1 bg-indigo-600 hover:bg-indigo-500 rounded text-white transition-colors">重启服务脚本</button>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </Card>

        {/* Tools & Issues */}
        <div className="space-y-6">
           <Card>
              <SectionTitle icon={Code} title="代码生成与脚本" />
              <div className="grid grid-cols-2 gap-3">
                 <button className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-left transition-colors">
                    <Database size={20} className="text-purple-400 mb-2" />
                    <div className="text-xs font-medium text-slate-200">生成 DAO 层</div>
                 </button>
                 <button className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-left transition-colors">
                    <TestTube size={20} className="text-emerald-400 mb-2" />
                    <div className="text-xs font-medium text-slate-200">生成测试用例</div>
                 </button>
                 <button className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-left transition-colors">
                    <Server size={20} className="text-blue-400 mb-2" />
                    <div className="text-xs font-medium text-slate-200">API 包装器</div>
                 </button>
              </div>
           </Card>

           <Card>
              <SectionTitle icon={Bug} title="客户问题追踪" />
              <div className="space-y-3">
                 <div className="flex items-center justify-between text-xs p-2 bg-slate-950/30 border border-slate-800 rounded">
                    <span className="text-slate-300">#554: 登录响应慢</span>
                    <span className="bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded">High</span>
                 </div>
                 <div className="flex items-center justify-between text-xs p-2 bg-slate-950/30 border border-slate-800 rounded">
                    <span className="text-slate-300">#552: 导出 PDF 乱码</span>
                    <span className="bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded">Med</span>
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

// Helper for icon needed in DeveloperDashboard
const TestTube = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2"/>
    <path d="M8.5 2h7"/>
    <path d="M14.5 16h-5"/>
  </svg>
);

const Workbench: React.FC<WorkbenchProps> = ({ persona }) => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">
          {persona === UserPersona.DESIGNER && "设计中心 (Design Center)"}
          {persona === UserPersona.ENGINEER && "工程控制台 (Engineering Console)"}
          {persona === UserPersona.DEVELOPER && "开发者/实施中心 (Dev Hub)"}
        </h1>
        <p className="text-slate-400 text-sm">
           {persona === UserPersona.DESIGNER && "专注于 CAD、仿真和生成式设计任务。"}
           {persona === UserPersona.ENGINEER && "管理 BOM、ECN 变更流程与合规性。"}
           {persona === UserPersona.DEVELOPER && "监控系统健康、日志分析与代码辅助。"}
        </p>
      </div>

      {persona === UserPersona.DESIGNER && <DesignerDashboard />}
      {persona === UserPersona.ENGINEER && <EngineerDashboard />}
      {persona === UserPersona.DEVELOPER && <DeveloperDashboard />}
    </div>
  );
};

export default Workbench;
