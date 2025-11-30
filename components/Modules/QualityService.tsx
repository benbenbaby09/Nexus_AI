import React, { useState } from 'react';
import {
  Activity, Stethoscope, Search, MessageSquare, ThumbsUp, ThumbsDown,
  BarChart3, RefreshCw, Zap, Database, ArrowRight, Settings, AlertTriangle,
  CheckCircle2, FileText, BrainCircuit, LineChart as LineChartIcon,
  MessageCircle, PieChart as PieChartIcon, Share2, Wrench, Microscope,
  GitMerge, BookOpen, PenTool, GitCompare, Library, Bot, History,
  FileCheck, Shield, Wand2, ChevronRight, UserCheck, Sparkles
} from 'lucide-react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

type Tab = 'PREDICTIVE' | 'DIAGNOSIS' | 'VOC' | 'DOCS';

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

// --- QMS Document Center View ---

const QMSDocumentView = () => {
  const [subMode, setSubMode] = useState<'EDITOR' | 'REVIEW' | 'SEARCH'>('EDITOR');
  const [selectedDoc, setSelectedDoc] = useState('QP-005');
  
  // Editor State
  const [docContent, setDocContent] = useState(
    `1. 目的\n本程序规定了不合格品控制的流程，以确保不符合要求的产品被识别和控制，防止非预期使用或交付。\n\n2. 范围\n适用于公司进料、制程及成品检验中发现的所有不合格品。\n\n3. 术语\n3.1 不合格品：未满足要求的产品。\n\n4. 职责\n4.1 质量部负责对不合格品进行判定。\n\n5. 流程\n5.1 发现问题：\n当生产线操作员发现零件尺寸偏差超过公差范围时，应立即停止生产。`
  );
  
  // Review State
  const diffContent = {
     original: `5.1.1 抽样频率：\nIPQC 应每生产批次（Lot）抽取 5 件样品进行尺寸全检。`,
     revised: `5.1.1 抽样频率：\nIPQC 应每班次（Shift）抽取 10 件样品进行尺寸全检，并记录 CPK 值。`
  };

  const docs = [
    { id: 'QM-001', title: '质量手册 (Quality Manual)', type: 'Manual', status: 'Released' },
    { id: 'QP-005', title: '不合格品控制程序', type: 'Procedure', status: 'In Revision' },
    { id: 'WI-802', title: '最终检验作业指导书', type: 'WI', status: 'Draft' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full animate-in fade-in duration-500">
      {/* Left: Document Repo */}
      <div className="lg:col-span-3 space-y-4">
         <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 h-full flex flex-col">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
               <Library size={18} className="text-blue-400" />
               质量体系文档库
            </h3>
            <div className="flex-1 space-y-2">
               {docs.map(doc => (
                  <div 
                     key={doc.id}
                     onClick={() => setSelectedDoc(doc.id)}
                     className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedDoc === doc.id ? 'bg-slate-800 border border-blue-500/30' : 'hover:bg-slate-800/50 border border-transparent'
                     }`}
                  >
                     <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-mono text-slate-500">{doc.id}</span>
                        <span className={`text-[10px] px-1.5 rounded ${
                           doc.status === 'Released' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                        }`}>{doc.status}</span>
                     </div>
                     <div className="text-sm text-slate-200">{doc.title}</div>
                     <div className="text-xs text-slate-500 mt-1">{doc.type}</div>
                  </div>
               ))}
            </div>
            <button className="w-full mt-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs flex items-center justify-center gap-2">
               <PenTool size={12}/> 新建文档
            </button>
         </div>
      </div>

      {/* Center & Right: Workspace */}
      <div className="lg:col-span-9 flex flex-col gap-4">
         {/* Sub-Nav */}
         <div className="flex gap-4 border-b border-slate-800 pb-2">
            <button onClick={() => setSubMode('EDITOR')} className={`flex items-center gap-2 pb-2 text-sm font-medium transition-colors ${subMode === 'EDITOR' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400'}`}>
               <PenTool size={16}/> 智能编辑
            </button>
            <button onClick={() => setSubMode('REVIEW')} className={`flex items-center gap-2 pb-2 text-sm font-medium transition-colors ${subMode === 'REVIEW' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400'}`}>
               <GitCompare size={16}/> 智能评审与修订
            </button>
            <button onClick={() => setSubMode('SEARCH')} className={`flex items-center gap-2 pb-2 text-sm font-medium transition-colors ${subMode === 'SEARCH' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400'}`}>
               <Bot size={16}/> 知识问答助手
            </button>
         </div>

         <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-xl p-5 overflow-hidden flex flex-col">
            {subMode === 'EDITOR' && (
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                  <div className="md:col-span-2 flex flex-col">
                     <div className="flex justify-between items-center mb-2">
                        <div className="text-sm text-slate-400">正在编辑: <span className="text-white font-medium">{docs.find(d=>d.id===selectedDoc)?.title}</span></div>
                        <div className="flex gap-2">
                           <button className="px-2 py-1 text-xs bg-slate-800 text-slate-300 rounded hover:bg-slate-700">保存草稿</button>
                           <button className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-500">AI 预审</button>
                        </div>
                     </div>
                     <textarea 
                        className="flex-1 w-full bg-slate-950 border border-slate-800 rounded-lg p-4 text-sm text-slate-300 leading-relaxed focus:outline-none focus:border-blue-500 resize-none font-sans"
                        value={docContent}
                        onChange={(e) => setDocContent(e.target.value)}
                     />
                  </div>
                  <div className="flex flex-col gap-4">
                     <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                        <h4 className="text-xs font-semibold text-slate-400 uppercase mb-3 flex items-center gap-2"><Sparkles size={12} className="text-purple-400"/> AI 写作建议</h4>
                        <div className="space-y-3">
                           <div className="p-2 bg-slate-900 rounded border border-slate-800 text-xs hover:border-purple-500/30 cursor-pointer">
                              <div className="text-purple-400 mb-1 font-medium">术语检查</div>
                              <p className="text-slate-400">检测到使用 "零件"，建议统一为公司标准术语 "组件 (Component)"。</p>
                              <button className="mt-2 text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">一键替换</button>
                           </div>
                           <div className="p-2 bg-slate-900 rounded border border-slate-800 text-xs hover:border-purple-500/30 cursor-pointer">
                              <div className="text-blue-400 mb-1 font-medium">条款推荐</div>
                              <p className="text-slate-400">根据当前"流程"章节，推荐插入引用 ISO 9001:2015 第 8.7 条款。</p>
                           </div>
                        </div>
                     </div>
                     <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex-1">
                        <h4 className="text-xs font-semibold text-slate-400 uppercase mb-3 flex items-center gap-2"><FileCheck size={12} className="text-emerald-400"/> 预审评分</h4>
                        <div className="flex items-center justify-center h-24 relative">
                           <div className="text-2xl font-bold text-white">85<span className="text-sm text-slate-500">/100</span></div>
                           <svg className="absolute inset-0 w-full h-full -rotate-90">
                              <circle cx="50%" cy="50%" r="30" stroke="#1e293b" strokeWidth="4" fill="none"/>
                              <circle cx="50%" cy="50%" r="30" stroke="#10b981" strokeWidth="4" fill="none" strokeDasharray="188" strokeDashoffset="28"/>
                           </svg>
                        </div>
                        <ul className="text-xs text-slate-400 space-y-1 mt-2">
                           <li className="flex items-center gap-2"><CheckCircle2 size={10} className="text-emerald-500"/> 结构完整性</li>
                           <li className="flex items-center gap-2"><CheckCircle2 size={10} className="text-emerald-500"/> 引用有效性</li>
                           <li className="flex items-center gap-2"><AlertTriangle size={10} className="text-amber-500"/> 术语一致性</li>
                        </ul>
                     </div>
                  </div>
               </div>
            )}

            {subMode === 'REVIEW' && (
               <div className="h-full flex flex-col">
                  <div className="flex-1 grid grid-cols-2 gap-4 mb-4">
                     <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 relative">
                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-slate-800 text-slate-400 text-xs rounded">Rev A (旧)</div>
                        <pre className="text-sm text-slate-400 whitespace-pre-wrap font-sans">{diffContent.original}</pre>
                     </div>
                     <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 relative">
                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-indigo-600 text-white text-xs rounded">Rev B (新)</div>
                        <pre className="text-sm text-slate-200 whitespace-pre-wrap font-sans">
                           {diffContent.revised.replace('每班次（Shift）', '>>>每班次（Shift）<<<')}
                        </pre>
                        {/* Mock Highlight */}
                        <div className="absolute top-[40px] left-[60px] w-[100px] h-[20px] bg-emerald-500/20 pointer-events-none"></div>
                     </div>
                  </div>
                  
                  <div className="h-48 grid grid-cols-3 gap-4">
                     <div className="col-span-2 bg-slate-950 border border-slate-800 rounded-lg p-4">
                        <h4 className="text-xs font-semibold text-indigo-400 uppercase mb-2 flex items-center gap-2"><Wand2 size={12}/> AI 变更摘要</h4>
                        <p className="text-sm text-slate-300 leading-relaxed">
                           本次修订的核心意图是<strong>提高检验频次</strong>（由按批次改为按班次），并新增了对<strong>过程能力指数 (CPK)</strong> 的记录要求。这通常是为了应对近期生产稳定性波动的问题。
                        </p>
                     </div>
                     <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
                        <h4 className="text-xs font-semibold text-red-400 uppercase mb-2 flex items-center gap-2"><Activity size={12}/> 影响分析</h4>
                        <div className="space-y-2">
                           <div className="flex items-center justify-between text-xs p-1.5 bg-slate-900 rounded border border-slate-800">
                              <span className="text-slate-300">WI-802 检验指导书</span>
                              <span className="text-red-400">需更新</span>
                           </div>
                           <div className="flex items-center justify-between text-xs p-1.5 bg-slate-900 rounded border border-slate-800">
                              <span className="text-slate-300">FM-003 检验记录表</span>
                              <span className="text-amber-400">需确认</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {subMode === 'SEARCH' && (
               <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
                  <div className="text-center mb-8">
                     <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Bot size={32} className="text-blue-400" />
                     </div>
                     <h2 className="text-2xl font-bold text-white mb-2">QMS 知识问答助手</h2>
                     <p className="text-slate-400">基于全公司 2,000+ 份质量体系文件构建</p>
                  </div>
                  
                  <div className="w-full relative mb-8">
                     <input 
                        type="text" 
                        placeholder="例如：发现不合格品应该怎么处理？或 谁有权批准特采？"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-5 py-4 pr-12 text-slate-200 focus:outline-none focus:border-blue-500 shadow-lg"
                     />
                     <button className="absolute right-3 top-3 p-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors">
                        <ArrowRight size={16} />
                     </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 w-full">
                     <button className="p-4 bg-slate-950 border border-slate-800 hover:border-blue-500/30 rounded-xl text-left transition-colors">
                        <div className="flex items-center gap-2 text-blue-400 mb-1 font-medium text-sm"><Search size={14}/> 快速查询</div>
                        <div className="text-xs text-slate-500">IQC 抽样标准是什么？</div>
                     </button>
                     <button className="p-4 bg-slate-950 border border-slate-800 hover:border-blue-500/30 rounded-xl text-left transition-colors">
                        <div className="flex items-center gap-2 text-purple-400 mb-1 font-medium text-sm"><UserCheck size={14}/> 角色职责</div>
                        <div className="text-xs text-slate-500">质量经理在变更流程中的权限？</div>
                     </button>
                  </div>
               </div>
            )}
         </div>
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
    { id: 'DOCS', label: '智能文档中心 (AI-QMS)', icon: BookOpen },
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
         {activeTab === 'DOCS' && <QMSDocumentView />}
      </div>
    </div>
  );
};

export default QualityService;