import React from 'react';
import { UserPersona } from '../types';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Clock, CheckCircle2, AlertTriangle, FileText, ArrowRight, 
  Cpu, Zap, BookOpen, GitPullRequest, Activity, Terminal, 
  Server, Bug, Play, ShieldCheck, Share2, Search, Database, 
  Code, AlertOctagon, RefreshCw, Hexagon, Layers, Wind, Workflow
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

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
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
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-transform hover:scale-105 shadow-lg shadow-indigo-500/25">
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
                  <td className="px-4 py-3 font-medium text-slate-200">发动机支架材料变更 (Steel -> Ti)</td>
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