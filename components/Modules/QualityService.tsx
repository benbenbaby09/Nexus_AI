import React, { useState } from 'react';
import {
  Activity, Stethoscope, Search, MessageSquare, ThumbsUp, ThumbsDown,
  BarChart3, RefreshCw, Zap, Database, ArrowRight, Settings, AlertTriangle,
  CheckCircle2, FileText, BrainCircuit, LineChart as LineChartIcon,
  MessageCircle, PieChart as PieChartIcon, Share2, Wrench, Microscope,
  GitMerge, BookOpen
} from 'lucide-react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

type Tab = 'PREDICTIVE' | 'DIAGNOSIS' | 'VOC';

// --- Predictive Quality View ---

const PredictiveQualityView = () => {
  const [calibrating, setCalibrating] = useState(false);
  const [calibrationProgress, setCalibrationProgress] = useState(0);

  // Mock Data: Sensor readings vs Simulation predictions
  const dataPoints = [
    { time: '0s', measured: 10, simulated: 12, calibrated: 10.2 },
    { time: '1s', measured: 45, simulated: 55, calibrated: 46.5 },
    { time: '2s', measured: 88, simulated: 105, calibrated: 89.1 },
    { time: '3s', measured: 130, simulated: 160, calibrated: 132.0 },
    { time: '4s', measured: 95, simulated: 115, calibrated: 96.5 },
    { time: '5s', measured: 40, simulated: 45, calibrated: 41.2 },
  ];

  const handleCalibrate = () => {
    setCalibrating(true);
    setCalibrationProgress(0);
    const interval = setInterval(() => {
      setCalibrationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setCalibrating(false);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full animate-in fade-in duration-500">
      {/* Left: Digital Twin Alignment */}
      <div className="lg:col-span-8 bg-slate-900/50 border border-slate-800 rounded-xl p-5 flex flex-col">
         <div className="flex justify-between items-center mb-6">
            <div>
               <h3 className="font-semibold text-white flex items-center gap-2">
                  <Activity size={18} className="text-blue-400" />
                  仿真与实测数据对齐
               </h3>
               <p className="text-xs text-slate-400 mt-1">测试对象: 翼梁疲劳测试台 (Test-Bench-04)</p>
            </div>
            <div className="flex gap-4 text-xs">
               <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-400"></div> 实测数据</div>
               <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-500"></div> 原始仿真</div>
               {calibrationProgress === 100 && <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-400"></div> 校准后模型</div>}
            </div>
         </div>

         <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
               <LineChart data={dataPoints}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#475569" fontSize={10} />
                  <YAxis stroke="#475569" fontSize={10} label={{ value: '应力 (MPa)', angle: -90, position: 'insideLeft', fill: '#64748b' }}/>
                  <Tooltip 
                     contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#e2e8f0' }}
                     itemStyle={{ fontSize: 12 }}
                  />
                  <Line type="monotone" dataKey="measured" stroke="#34d399" strokeWidth={2} dot={{r: 4}} name="实测值" />
                  <Line type="monotone" dataKey="simulated" stroke="#64748b" strokeWidth={2} strokeDasharray="5 5" name="仿真预测 (V1)" />
                  {calibrationProgress === 100 && (
                     <Line type="monotone" dataKey="calibrated" stroke="#818cf8" strokeWidth={3} name="AI 校准后 (V2)" animationDuration={1000} />
                  )}
               </LineChart>
            </ResponsiveContainer>
         </div>
      </div>

      {/* Right: AI Calibration Control */}
      <div className="lg:col-span-4 space-y-6">
         <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
               <BrainCircuit size={18} className="text-purple-400" />
               AI 模型自动校准
            </h3>
            
            <div className="space-y-4 mb-6">
               <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-xs text-slate-400">参数灵敏度分析</span>
                     <span className="text-xs text-indigo-400 font-mono">High Impact</span>
                  </div>
                  <div className="space-y-2">
                     <div className="flex justify-between text-xs text-slate-300">
                        <span>杨氏模量 (E)</span>
                        <span>偏差 +15%</span>
                     </div>
                     <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full w-[75%]"></div>
                     </div>
                     <div className="flex justify-between text-xs text-slate-300">
                        <span>阻尼比 (ζ)</span>
                        <span>偏差 -5%</span>
                     </div>
                     <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-yellow-500 h-full w-[25%]"></div>
                     </div>
                  </div>
               </div>
            </div>

            {calibrating ? (
               <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                     <span>正在运行反向优化算法...</span>
                     <span>{calibrationProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                     <div 
                        className="bg-indigo-500 h-full transition-all duration-100 ease-linear" 
                        style={{ width: `${calibrationProgress}%` }}
                     ></div>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-2 font-mono">
                     Iterating: Batch {Math.floor(calibrationProgress / 10)} | Loss: {(0.5 - calibrationProgress * 0.004).toFixed(4)}
                  </div>
               </div>
            ) : (
               <button 
                  onClick={handleCalibrate}
                  disabled={calibrationProgress === 100}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-500/20"
               >
                  {calibrationProgress === 100 ? (
                     <><CheckCircle2 size={16} /> 校准完成 (Diff &lt; 2%)</>
                  ) : (
                     <><Zap size={16} /> 启动 AI 校准</>
                  )}
               </button>
            )}
            
            {calibrationProgress === 100 && (
               <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs text-emerald-300 flex gap-2">
                  <GitMerge size={14} className="flex-shrink-0 mt-0.5" />
                  <div>
                     已生成新版本模型 <strong>v2.1 (Calibrated)</strong>。
                     <br/>
                     <span className="underline cursor-pointer opacity-80 hover:opacity-100">点击部署到仿真库</span>
                  </div>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};

// --- RAG Diagnosis View ---

const RAGDiagnosisView = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any>(null);
  const [searching, setSearching] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    setSearching(true);
    // Simulate RAG Latency
    setTimeout(() => {
       setResult({
          answer: "该错误 `WT-472109` 通常是由于 **CAD文档与部件的生命周期状态不一致** 导致的。在执行检入 (Check-in) 操作前，Windchill 会校验两者的状态。\n\n**建议解决步骤：**\n1. 检查 CAD 文档是否处于 `IN_WORK` 状态。\n2. 检查关联的 WTPart 是否已被其他用户检出。\n3. 在工作区中执行 'Update' 以获取服务器最新状态。",
          sources: [
             { id: 'KB-1022', title: 'Windchill 检入常见错误排查手册', score: 0.92 },
             { id: 'TICKET-8821', title: '无法检入：对象状态无效', score: 0.88 },
             { id: 'FORUM-551', title: 'Checkin Failed Error Guide', score: 0.85 }
          ]
       });
       setSearching(false);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full animate-in fade-in duration-500">
       {/* Left: Search & Chat */}
       <div className="lg:col-span-7 bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col">
          <div className="text-center mb-8 mt-4">
             <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope size={24} className="text-indigo-400" />
             </div>
             <h2 className="text-xl font-bold text-white mb-2">智能诊断与维护助手</h2>
             <p className="text-slate-400 text-sm">基于 RAG 技术，索引 50,000+ 份技术文档与历史工单。</p>
          </div>

          <div className="relative mb-6">
             <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="在此粘贴报错代码或描述故障现象..." 
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-4 pr-12 text-slate-200 focus:outline-none focus:border-indigo-500 shadow-inner"
             />
             <button 
               onClick={handleSearch}
               disabled={searching}
               className="absolute right-2 top-2 bottom-2 aspect-square bg-indigo-600 hover:bg-indigo-500 rounded-lg flex items-center justify-center text-white transition-colors"
             >
                {searching ? <RefreshCw size={20} className="animate-spin" /> : <ArrowRight size={20} />}
             </button>
          </div>

          {result && (
             <div className="flex-1 overflow-y-auto animate-in slide-in-from-bottom-4">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 mb-4 relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                   <h4 className="font-semibold text-indigo-400 mb-3 flex items-center gap-2">
                      <Zap size={16} /> AI 诊断结论
                   </h4>
                   <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                      {result.answer.split('\n').map((line: string, i: number) => (
                         <span key={i} className="block mb-2" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                      ))}
                   </div>
                   <div className="mt-4 flex gap-4 border-t border-slate-800 pt-3">
                      <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-emerald-400 transition-colors"><ThumbsUp size={14}/> 有帮助</button>
                      <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-400 transition-colors"><ThumbsDown size={14}/> 不准确</button>
                   </div>
                </div>
             </div>
          )}
       </div>

       {/* Right: Knowledge Sources */}
       <div className="lg:col-span-5 bg-slate-900/50 border border-slate-800 rounded-xl p-5">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
             <Database size={18} className="text-emerald-400" />
             知识来源检索
          </h3>
          
          {result ? (
             <div className="space-y-3">
                {result.sources.map((source: any, i: number) => (
                   <div key={i} className="group p-3 bg-slate-950 border border-slate-800 rounded-lg hover:border-emerald-500/30 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-1">
                         <span className="text-xs font-mono text-slate-500 px-1.5 py-0.5 rounded border border-slate-700">{source.id}</span>
                         <span className="text-xs font-bold text-emerald-500">{Math.round(source.score * 100)}% 匹配</span>
                      </div>
                      <h4 className="text-sm font-medium text-slate-200 group-hover:text-emerald-400 transition-colors">{source.title}</h4>
                      <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                         <BookOpen size={12} />
                         <span>点击预览原文档</span>
                      </div>
                   </div>
                ))}
             </div>
          ) : (
             <div className="flex flex-col items-center justify-center h-64 text-slate-600">
                <Search size={48} className="opacity-20 mb-4" />
                <p className="text-sm">等待查询...</p>
             </div>
          )}
       </div>
    </div>
  );
};

// --- VoC Analysis View ---

const VoCAnalysisView = () => {
  const feedbacks = [
    { id: 'FB-001', text: '新款手柄的握持感很差，用久了手腕疼。', sentiment: 'Negative', cat: 'Design', score: -0.8 },
    { id: 'FB-002', text: '电池续航比宣传的短了整整两小时！', sentiment: 'Negative', cat: 'Design', score: -0.9 },
    { id: 'FB-003', text: 'APP 连接速度很快，界面也很好看。', sentiment: 'Positive', cat: 'Software', score: 0.7 },
    { id: 'FB-004', text: '外壳接缝处有明显的毛刺，做工不行。', sentiment: 'Negative', cat: 'Manufacturing', score: -0.6 },
  ];

  const chartData = [
    { name: '设计缺陷', value: 45, fill: '#ef4444' },
    { name: '制造工艺', value: 25, fill: '#f59e0b' },
    { name: '软件故障', value: 20, fill: '#3b82f6' },
    { name: '服务投诉', value: 10, fill: '#8b5cf6' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full animate-in fade-in duration-500">
       {/* Left: Feedback Stream & Routing */}
       <div className="lg:col-span-7 bg-slate-900/50 border border-slate-800 rounded-xl p-5 flex flex-col">
          <div className="flex justify-between items-center mb-4">
             <h3 className="font-semibold text-white flex items-center gap-2">
                <MessageCircle size={18} className="text-indigo-400" />
                客户反馈流 (实时)
             </h3>
             <button className="text-xs flex items-center gap-1 text-slate-400 hover:text-white">
                <RefreshCw size={12} /> 同步
             </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
             {feedbacks.map((fb, i) => (
                <div key={i} className="p-3 bg-slate-950 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors group">
                   <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                         <span className={`w-2 h-2 rounded-full ${fb.sentiment === 'Negative' ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
                         <span className="text-xs font-mono text-slate-500">{fb.id}</span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border uppercase ${
                         fb.cat === 'Design' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                         fb.cat === 'Manufacturing' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                         'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>{fb.cat}</span>
                   </div>
                   <p className="text-sm text-slate-200 mb-2">{fb.text}</p>
                   
                   {/* Auto-Routing Action */}
                   {fb.cat === 'Design' && fb.sentiment === 'Negative' && (
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/50">
                         <div className="flex items-center gap-1 text-[10px] text-red-400">
                            <AlertTriangle size={10} /> 自动归类: 设计缺陷
                         </div>
                         <button className="flex items-center gap-1 px-2 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 text-xs rounded border border-red-500/30 transition-colors">
                            <Share2 size={12} /> 创建改进任务 (Windchill)
                         </button>
                      </div>
                   )}
                </div>
             ))}
          </div>
       </div>

       {/* Right: Analytics Dashboard */}
       <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
             <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <PieChartIcon size={18} className="text-purple-400" />
                缺陷责任归类
             </h3>
             <div className="h-48 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                      <Pie 
                         data={chartData} 
                         innerRadius={40} 
                         outerRadius={70} 
                         paddingAngle={5} 
                         dataKey="value"
                      >
                         {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} stroke="rgba(0,0,0,0)" />
                         ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }} />
                      <Legend verticalAlign="middle" align="right" layout="vertical" iconSize={8} wrapperStyle={{ fontSize: '12px' }}/>
                   </PieChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
             <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Wrench size={18} className="text-emerald-400" />
                闭环行动追踪
             </h3>
             <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <div className="text-xs text-slate-400">已自动创建任务</div>
                   <div className="text-sm font-bold text-white">12</div>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                   <div className="bg-blue-500 h-full w-[60%]"></div>
                </div>
                <div className="flex items-center justify-between">
                   <div className="text-xs text-slate-400">改进已部署</div>
                   <div className="text-sm font-bold text-white">5</div>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                   <div className="bg-emerald-500 h-full w-[25%]"></div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

// --- Main Component ---

const QualityService: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('PREDICTIVE');

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'PREDICTIVE', label: '预测性质量 (Digital Twin)', icon: Activity },
    { id: 'DIAGNOSIS', label: '智能诊断 (RAG)', icon: Stethoscope },
    { id: 'VOC', label: '客户声音 (VoC)', icon: MessageSquare },
  ];

  return (
    <div className="p-6 h-full flex flex-col gap-6">
      {/* Header & Nav */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="text-emerald-500" />
            质量与服务
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            仿真与实测闭环、故障智能诊断与市场反馈分析。
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
         {activeTab === 'PREDICTIVE' && <PredictiveQualityView />}
         {activeTab === 'DIAGNOSIS' && <RAGDiagnosisView />}
         {activeTab === 'VOC' && <VoCAnalysisView />}
      </div>
    </div>
  );
};

export default QualityService;