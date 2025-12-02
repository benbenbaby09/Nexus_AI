
import React, { useState, useRef, useEffect } from 'react';
import {
  Activity, Stethoscope, Search, MessageSquare, ThumbsUp, ThumbsDown,
  BarChart3, RefreshCw, Zap, Database, ArrowRight, Settings, AlertTriangle,
  CheckCircle2, FileText, BrainCircuit, LineChart as LineChartIcon,
  MessageCircle, PieChart as PieChartIcon, Share2, Wrench, Microscope,
  GitMerge, BookOpen, PenTool, GitCompare, Library, Bot, History,
  FileCheck, Shield, Wand2, ChevronRight, UserCheck, Sparkles,
  FileSpreadsheet, ShieldAlert, ScanLine, Printer, Type, Eraser, MoveVertical,
  Upload, XCircle, FolderOpen, File, Edit3, Save, Eye, X,
  Clock, TrendingUp, Users, LayoutDashboard, CheckSquare, Send, MessageSquarePlus
} from 'lucide-react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import * as XLSX from 'xlsx';
import * as mammoth from 'mammoth';
import * as docx from 'docx-preview';
import { reviewQMSDocument, chatWithDocument } from '../../services/geminiService';

// Define the view modes corresponding to AppLayer sub-menus
type ViewMode = 'DIAGNOSIS' | 'VOC' | 'FORMAT' | 'PREDICTIVE' | 'DOCS';

interface QualityServiceProps {
  viewMode: ViewMode;
}

// --- Predictive Quality View (Digital Twin) ---

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

// --- Format Compliance Checker View (Implemented using SheetJS) ---

interface ExcelCell {
  val: any;
  address: string;
  isError: boolean;
  msg?: string;
}

interface ExcelData {
  rows: ExcelCell[][];
  headers: string[];
}

const FormatComplianceView = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [excelData, setExcelData] = useState<ExcelData | null>(null);
  const [issuesCount, setIssuesCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAnalyzing(true);
    setIssuesCount(0);

    const reader = new FileReader();
    
    // Use ArrayBuffer for broader compatibility
    reader.onload = (evt) => {
      try {
        const data = evt.target?.result;
        const wb = XLSX.read(data, { type: 'array' }); // Read as array
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        
        // Convert to JSON array of arrays
        const jsonData: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });
        
        if (!jsonData || jsonData.length === 0) {
           setAnalyzing(false);
           return;
        }

        // Process Data for Display & Checking
        const headers = jsonData[0] as string[];
        const processedRows: ExcelCell[][] = [];
        let errorCount = 0;

        // Skip header row in loop
        for (let i = 1; i < jsonData.length; i++) {
           const rowData = jsonData[i];
           const rowCells: ExcelCell[] = [];
           
           // Normalize row length to match headers
           for (let j = 0; j < headers.length; j++) {
              const cellValue = rowData[j];
              let isError = false;
              let msg = '';

              // --- AI / Logic Checks (Simulation for Demo) ---
              
              // 1. Mandatory Field Check (Simulation: 1st column 'ID' or 'Name' is required)
              if (j === 0 && (!cellValue || String(cellValue).trim() === '')) {
                 isError = true;
                 msg = '必填项缺失 (Missing Required Field)';
              }
              
              // 2. Enum Validation Check (Simulation: 'Status' column)
              const headerLower = String(headers[j]).toLowerCase();
              if (headerLower.includes('status') || headerLower.includes('状态')) {
                 const validStatuses = ['open', 'closed', 'pending', 'released', 'in work', '已发布', '设计中', '归档'];
                 if (cellValue && !validStatuses.includes(String(cellValue).toLowerCase())) {
                    isError = true;
                    msg = '非标准状态值 (Invalid Enum)';
                 }
              }

              // 3. AI Anomaly Simulation (Randomly flag some 'Description' fields if they are too short)
              if (!isError && headerLower.includes('desc') && cellValue && String(cellValue).length < 5) {
                 isError = true;
                 msg = '描述过于简略 (AI Detected)';
              }

              if (isError) errorCount++;

              rowCells.push({
                 val: cellValue,
                 address: XLSX.utils.encode_cell({ r: i, c: j }),
                 isError,
                 msg
              });
           }
           processedRows.push(rowCells);
        }

        // Simulate a slight delay for "AI Analysis" visualization
        setTimeout(() => {
           setExcelData({ headers, rows: processedRows });
           setIssuesCount(errorCount);
           setAnalyzing(false);
        }, 800);

      } catch (err) {
        console.error("Error reading excel", err);
        setAnalyzing(false);
      }
    };
    
    reader.readAsArrayBuffer(file);
  };

  const handleReset = () => {
     setExcelData(null);
     setIssuesCount(0);
     if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-500">
       {/* Left: Control & Summary */}
       <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
             <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                 <Shield size={18} className="text-blue-400" />
                 格式合规卫士
             </h3>
             
             {!excelData ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-6 text-center border-dashed relative hover:bg-slate-900 transition-colors group cursor-pointer mb-4"
                >
                  <input 
                     type="file" 
                     ref={fileInputRef}
                     accept=".xlsx, .xls, .csv" 
                     className="hidden" 
                     onChange={handleFileUpload} 
                  />
                  <div className="flex flex-col items-center gap-3 pointer-events-none">
                     <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                        <FileSpreadsheet size={24} />
                     </div>
                     <div>
                        <div className="text-sm font-medium text-slate-200">点击上传表格</div>
                        <div className="text-xs text-slate-500 mt-1">支持 .xlsx, .csv (Max 10MB)</div>
                     </div>
                  </div>
               </div>
             ) : (
                <div className="space-y-4">
                   <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                      <div className="text-xs text-slate-500 mb-1">文件状态</div>
                      <div className="flex items-center justify-between">
                         <span className="text-sm text-slate-300 font-medium">Analysis Complete</span>
                         <CheckCircle2 size={16} className="text-emerald-500"/>
                      </div>
                   </div>
                   
                   <div className={`p-4 rounded-lg border ${issuesCount > 0 ? 'bg-red-500/10 border-red-500/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
                      <div className="text-xs text-slate-400 mb-1">发现异常点</div>
                      <div className={`text-2xl font-bold ${issuesCount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                         {issuesCount}
                      </div>
                   </div>

                   <button 
                     onClick={handleReset}
                     className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs flex items-center justify-center gap-2 transition-colors"
                   >
                      <RefreshCw size={14}/> 上传新文件
                   </button>
                </div>
             )}
          </div>

          {analyzing && (
             <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex items-center gap-3 animate-pulse">
                <RefreshCw className="animate-spin text-blue-400" size={20} />
                <span className="text-sm text-slate-300">正在解析并扫描合规性...</span>
             </div>
          )}
          
          {/* Legend */}
          {excelData && issuesCount > 0 && (
             <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                <div className="text-xs text-slate-500 mb-2 uppercase font-semibold">图例</div>
                <div className="flex items-center gap-2 mb-1">
                   <div className="w-3 h-3 bg-red-500/20 border border-red-500 rounded"></div>
                   <span className="text-xs text-slate-400">合规性错误</span>
                </div>
             </div>
          )}
       </div>

       {/* Right: Spreadsheet Viewer */}
       <div className="lg:col-span-9 bg-slate-900/50 border border-slate-800 rounded-xl p-1 flex flex-col overflow-hidden relative group">
          <div className="h-9 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-3">
             <span className="text-xs text-slate-500 font-mono flex items-center gap-2">
               <FileSpreadsheet size={14} className="text-emerald-500"/> 
               {excelData ? 'DATA PREVIEW' : 'NO FILE LOADED'}
             </span>
             {excelData && issuesCount > 0 && (
               <div className="flex items-center gap-1 px-2 py-0.5 bg-red-500/10 rounded border border-red-500/20">
                  <AlertTriangle size={12} className="text-red-400"/>
                  <span className="text-[10px] text-red-400 font-bold">{issuesCount} Issues Found</span>
               </div>
             )}
          </div>
          
          <div className="flex-1 bg-white relative overflow-auto">
             {!excelData ? (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                   <div className="text-center text-slate-600">
                     <FileSpreadsheet size={48} className="mx-auto mb-2 opacity-20"/>
                     <p>等待 Excel 文档...</p>
                   </div>
                </div>
             ) : (
                <table className="w-full text-xs border-collapse text-slate-800">
                   <thead className="bg-slate-100 sticky top-0 z-10 shadow-sm">
                      <tr>
                         <th className="border border-slate-300 bg-slate-200 px-2 py-1 w-10 text-center text-slate-500">#</th>
                         {excelData.headers.map((h, i) => (
                            <th key={i} className="border border-slate-300 px-4 py-2 text-left font-semibold text-slate-700 min-w-[100px]">{h}</th>
                         ))}
                      </tr>
                   </thead>
                   <tbody>
                      {excelData.rows.map((row, rIdx) => (
                         <tr key={rIdx} className="hover:bg-blue-50">
                            <td className="border border-slate-300 bg-slate-50 text-center text-slate-400 select-none font-mono">{rIdx + 1}</td>
                            {row.map((cell, cIdx) => (
                               <td 
                                 key={cIdx} 
                                 className={`border border-slate-300 px-2 py-1 relative group cursor-default transition-colors ${
                                    cell.isError ? 'bg-red-100 border-red-300' : ''
                                 }`}
                               >
                                  <div className="truncate max-w-[200px]">
                                    {cell.val !== undefined && cell.val !== null ? String(cell.val) : <span className="text-slate-300 italic">null</span>}
                                  </div>
                                  
                                  {/* Error Tooltip */}
                                  {cell.isError && (
                                     <div className="absolute left-0 bottom-full mb-1 hidden group-hover:block z-20 w-max max-w-xs">
                                        <div className="bg-red-600 text-white text-[10px] px-2 py-1 rounded shadow-xl flex items-center gap-1">
                                           <AlertTriangle size={10} className="fill-white text-red-600"/>
                                           {cell.msg}
                                        </div>
                                        <div className="w-2 h-2 bg-red-600 rotate-45 transform translate-x-3 -translate-y-1"></div>
                                     </div>
                                  )}
                               </td>
                            ))}
                         </tr>
                      ))}
                   </tbody>
                </table>
             )}
          </div>
       </div>
    </div>
  );
};

// --- VoC Analysis View ---

const VoCAnalysisView = () => {
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);

  const feedbacks = [
    { id: 'FB-001', text: '新款手柄的握持感很差，用久了手腕疼。', sentiment: 'Negative', cat: 'Design', score: -0.8, image: 'https://images.unsplash.com/photo-1593118247619-e2d6f056869e?q=80&w=400&auto=format&fit=crop', user: 'User_992', date: '2024-10-24' },
    { id: 'FB-002', text: '电池续航比宣传的短了整整两小时！', sentiment: 'Negative', cat: 'Design', score: -0.9, image: 'https://images.unsplash.com/photo-1623126908029-58cb08a2b272?q=80&w=400&auto=format&fit=crop', user: 'Mike_T', date: '2024-10-23' },
    { id: 'FB-003', text: 'APP 连接速度很快，界面也很好看。', sentiment: 'Positive', cat: 'Software', score: 0.7, image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=400&auto=format&fit=crop', user: 'Sarah_L', date: '2024-10-22' },
    { id: 'FB-004', text: '外壳接缝处有明显的毛刺，做工不行。', sentiment: 'Negative', cat: 'Manufacturing', score: -0.6, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop', user: 'David_W', date: '2024-10-21' },
  ];

  const chartData = [
    { name: '设计缺陷', value: 45, fill: '#ef4444' },
    { name: '制造工艺', value: 25, fill: '#f59e0b' },
    { name: '软件故障', value: 20, fill: '#3b82f6' },
    { name: '服务投诉', value: 10, fill: '#8b5cf6' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full animate-in fade-in duration-500 relative">
       
       {/* Feedback Detail Modal */}
       {selectedFeedback && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
             <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row h-[500px] md:h-[400px]">
                <button 
                  onClick={() => setSelectedFeedback(null)} 
                  className="absolute top-4 right-4 p-1 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors z-20"
                >
                   <X size={18} />
                </button>
                
                {/* Left: Image */}
                <div className="w-full md:w-1/2 bg-black relative flex items-center justify-center overflow-hidden">
                   <img 
                     src={selectedFeedback.image} 
                     alt="Feedback Evidence" 
                     className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                   />
                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="text-white text-sm font-semibold flex items-center gap-2">
                         <CameraIcon size={14}/> 客户上传凭证
                      </div>
                   </div>
                </div>
                
                {/* Right: Details */}
                <div className="w-full md:w-1/2 p-6 flex flex-col bg-slate-900">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                         <div className="text-xs text-slate-500 font-mono mb-1">Feedback ID: {selectedFeedback.id}</div>
                         <div className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded border ${
                            selectedFeedback.sentiment === 'Negative' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                         }`}>
                            {selectedFeedback.sentiment === 'Negative' ? <ThumbsDown size={12}/> : <ThumbsUp size={12}/>}
                            {selectedFeedback.sentiment}
                         </div>
                      </div>
                      <div className="text-right">
                         <div className="text-sm font-medium text-slate-200">{selectedFeedback.user}</div>
                         <div className="text-xs text-slate-500">{selectedFeedback.date}</div>
                      </div>
                   </div>

                   <h4 className="text-sm font-semibold text-slate-200 mb-2">问题描述</h4>
                   <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-1 overflow-y-auto">
                      {selectedFeedback.text}
                   </p>

                   <div className="mt-auto pt-4 border-t border-slate-800 space-y-3">
                      <div className="flex justify-between text-xs">
                         <span className="text-slate-500">分类归属:</span>
                         <span className="text-indigo-400 font-medium">{selectedFeedback.cat}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                         <span className="text-slate-500">AI 严重度评分:</span>
                         <span className={`font-mono font-bold ${selectedFeedback.score < -0.5 ? 'text-red-400' : 'text-emerald-400'}`}>{selectedFeedback.score}</span>
                      </div>
                      
                      {selectedFeedback.sentiment === 'Negative' && (
                         <button className="w-full py-2 bg-red-600 hover:bg-red-500 text-white rounded text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 transition-all">
                            <Share2 size={14}/> 创建 Jira/Windchill 工单
                         </button>
                      )}
                   </div>
                </div>
             </div>
          </div>
       )}

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
                <div 
                  key={i} 
                  onClick={() => setSelectedFeedback(fb)}
                  className="p-3 bg-slate-950 border border-slate-800 rounded-lg hover:border-slate-600 hover:bg-slate-900 transition-all cursor-pointer group"
                >
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
                   <div className="flex gap-3">
                      {/* Thumbnail */}
                      <div className="w-12 h-12 bg-slate-900 rounded overflow-hidden flex-shrink-0 border border-slate-800 mt-1">
                         <img src={fb.image} alt="thumb" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"/>
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className="text-sm text-slate-200 mb-2 truncate group-hover:text-white transition-colors">{fb.text}</p>
                         
                         {/* Auto-Routing Action Preview */}
                         {fb.cat === 'Design' && fb.sentiment === 'Negative' && (
                            <div className="flex items-center justify-between pt-1 border-t border-slate-800/50">
                               <div className="flex items-center gap-1 text-[10px] text-red-400">
                                  <AlertTriangle size={10} /> 自动归类: 设计缺陷
                               </div>
                               <span className="text-[10px] text-slate-500 flex items-center gap-1 group-hover:text-blue-400">
                                  点击查看详情 <ArrowRight size={10}/>
                               </span>
                            </div>
                         )}
                      </div>
                   </div>
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

// Helper Icon
const CameraIcon = ({size, className}: {size:number, className?:string}) => (
   <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
);

// --- QMS Document Center View with Intelligent Review & Workflow ---

interface Document {
   id: string;
   name: string;
   type: string;
   content?: string; // Text content for editing/analysis
   url?: string; // Blob URL for PDF preview
   arrayBuffer?: ArrayBuffer; // For Word docx preview
   base64?: string; // For PDF AI processing
}

const QMSDocumentView = () => {
   const [activeTab, setActiveTab] = useState<'WORKSPACE' | 'ANALYTICS'>('WORKSPACE');
   
   // Initial Mock Documents
   const initialDocuments: Document[] = [
      { id: 'ISO-9001', name: 'ISO 9001:2015 Standard', type: 'External', content: "ISO 9001:2015 Requirements..." },
      { id: 'DOC-001', name: 'Quality Manual v4.0', type: 'Internal', content: "4.1 General Requirements\nThe organization shall establish, document, implement and maintain a quality management system and continually improve its effectiveness in accordance with the requirements of this International Standard.\n\n4.2 Documentation Requirements\n4.2.1 General\nThe quality management system documentation shall include:\na) documented statements of a quality policy and quality objectives,\nb) a quality manual,\nc) documented procedures and records required by this International Standard." },
      { id: 'SOP-102', name: 'Non-Conformity Control', type: 'SOP', content: "Standard Operating Procedure for Non-Conformity..." },
      { id: 'WI-005', name: 'Incoming Inspection', type: 'Work Instruction', content: "Work Instruction 005: Steps for incoming inspection..." },
   ];

   const [documents, setDocuments] = useState<Document[]>(initialDocuments);
   const [selectedDocId, setSelectedDocId] = useState<string>('DOC-001');
   const [docContent, setDocContent] = useState<string>(''); // For Textarea
   const [currentPdfUrl, setCurrentPdfUrl] = useState<string | null>(null); // For PDF Iframe
   const docxContainerRef = useRef<HTMLDivElement>(null);
   
   // Right Side Panel State
   const [rightTab, setRightTab] = useState<'REVIEW' | 'CHAT'>('CHAT');
   
   // Review State
   const [reviewing, setReviewing] = useState(false);
   const [reviewResult, setReviewResult] = useState<any[] | null>(null);
   const fileInputRef = useRef<HTMLInputElement>(null);

   // Chat State
   const [chatMessages, setChatMessages] = useState<{role: 'user'|'model', text: string}[]>([]);
   const [chatInput, setChatInput] = useState('');
   const [isChatting, setIsChatting] = useState(false);
   const chatEndRef = useRef<HTMLDivElement>(null);

   // Text Selection State
   const [showFloatingBtn, setShowFloatingBtn] = useState(false);
   const [floatingBtnPos, setFloatingBtnPos] = useState({ x: 0, y: 0 });
   const [tempSelectedText, setTempSelectedText] = useState('');

   // Sync content when selection changes
   useEffect(() => {
      const doc = documents.find(d => d.id === selectedDocId);
      if (doc) {
         if (doc.type === 'PDF' && doc.url) {
            setCurrentPdfUrl(doc.url);
            setDocContent(''); // Clear text editor for PDF
         } else if (doc.type === 'Word' && doc.arrayBuffer) {
            setCurrentPdfUrl(null);
            setDocContent('');
            if (docxContainerRef.current) {
                docxContainerRef.current.innerHTML = ''; // Clear previous
                // Fix: Access renderAsync safely handling both named and default exports
                const render = (docx as any).renderAsync || (docx as any).default?.renderAsync;
                if (render) {
                    render(doc.arrayBuffer, docxContainerRef.current)
                        .then(() => console.log("Docx rendered"))
                        .catch((err: any) => console.error("Docx render error", err));
                } else {
                    console.error("docx-preview renderAsync function not found");
                }
            }
         } else {
            setCurrentPdfUrl(null);
            setDocContent(doc.content || '');
         }
         // Clear previous review result when switching docs
         setReviewResult(null);
         // Reset Chat for new document
         setChatMessages([{ role: 'model', text: `您好，我是您的文档助手。您正在查看 ${doc.name}，有什么可以帮您？` }]);
      }
   }, [selectedDocId, documents]);

   // Scroll chat to bottom
   useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [chatMessages]);

   const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const fileType = file.name.split('.').pop()?.toLowerCase();
      const newDocId = `DOC-${Date.now().toString().slice(-4)}`;

      if (fileType === 'pdf') {
         const url = URL.createObjectURL(file);
         // Read as Base64 for AI processing
         const reader = new FileReader();
         reader.onload = (event) => {
             const result = event.target?.result as string;
             // Extract base64 part
             const base64 = result.split(',')[1];
             
             const newDoc: Document = {
                id: newDocId,
                name: file.name,
                type: 'PDF',
                url: url,
                base64: base64
             };
             setDocuments(prev => [...prev, newDoc]);
             setSelectedDocId(newDocId);
         };
         reader.readAsDataURL(file);

      } else if (fileType === 'docx' || fileType === 'doc') {
         const reader = new FileReader();
         reader.onload = (event) => {
            const arrayBuffer = event.target?.result as ArrayBuffer;
            // Extract text for AI analysis context
            mammoth.extractRawText({ arrayBuffer: arrayBuffer })
               .then((result) => {
                  const newDoc: Document = {
                     id: newDocId,
                     name: file.name,
                     type: 'Word',
                     arrayBuffer: arrayBuffer, // For visual rendering
                     content: result.value || "[Empty Document]" // For AI
                  };
                  setDocuments(prev => [...prev, newDoc]);
                  setSelectedDocId(newDocId);
               })
               .catch((err) => {
                  console.error("Mammoth error:", err);
                  alert("Error processing Word document.");
               });
         };
         reader.readAsArrayBuffer(file);
      } else {
         alert("Unsupported file type. Please upload PDF or Word documents.");
      }
      
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = '';
   };

   const handleSaveDocument = () => {
      if (!selectedDoc) return;
      // Update the document in state
      const updatedDocs = documents.map(doc => {
         if (doc.id === selectedDocId) {
            return { ...doc, content: docContent };
         }
         return doc;
      });
      setDocuments(updatedDocs);
      alert("文档内容已保存并同步至 AI 上下文。");
   };

   const handleSelection = (e: React.MouseEvent) => {
      const selection = window.getSelection();
      let text = '';

      // Handle Textarea specific case if possible, otherwise generic selection
      if (e.target instanceof HTMLTextAreaElement) {
         const start = e.target.selectionStart;
         const end = e.target.selectionEnd;
         text = e.target.value.substring(start, end);
      } else {
         text = selection?.toString() || '';
      }

      if (text.trim().length > 0) {
         // Position near mouse pointer within the container
         const containerRect = e.currentTarget.getBoundingClientRect();
         setFloatingBtnPos({
            x: e.clientX - containerRect.left,
            y: e.clientY - containerRect.top - 40 // slightly above
         });
         setTempSelectedText(text);
         setShowFloatingBtn(true);
      } else {
         setShowFloatingBtn(false);
      }
   };

   const handleQuoteToChat = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (tempSelectedText) {
         setChatInput(prev => prev ? prev + '\n> 引用: ' + tempSelectedText + '\n' : '> 引用: ' + tempSelectedText + '\n');
         setRightTab('CHAT');
         setShowFloatingBtn(false);
      }
   };

   const handleSendMessage = async () => {
      if (!chatInput.trim() || !selectedDoc) return;
      
      const userMsg = chatInput;
      setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
      setChatInput('');
      setIsChatting(true);

      // Determine content source
      let contentToContext = '';
      let mimeType: 'text/plain' | 'application/pdf' = 'text/plain';

      if (selectedDoc.type === 'PDF' && selectedDoc.base64) {
          contentToContext = selectedDoc.base64;
          mimeType = 'application/pdf';
      } else if (selectedDoc.type === 'Word' && selectedDoc.content) {
          contentToContext = selectedDoc.content; // Use extracted text for Word
          mimeType = 'text/plain';
      } else {
          contentToContext = docContent || selectedDoc.content || '';
          mimeType = 'text/plain';
      }

      const aiResponse = await chatWithDocument(userMsg, contentToContext, mimeType);
      
      setChatMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
      setIsChatting(false);
   };

   const workflowSteps = [
     { id: 'SUBMIT', label: '文档提交', actor: '提交人', status: 'completed' },
     { id: 'FORMAT', label: '格式预检', actor: '自动系统', status: 'completed' },
     { id: 'CONTENT', label: '内容初审', actor: '初级审核员', status: 'current' },
     { id: 'EXPERT', label: '专业审核', actor: '部门专家', status: 'pending' },
     { id: 'APPROVE', label: '综合审批', actor: '审批领导', status: 'pending' },
     { id: 'ARCHIVE', label: '归档发布', actor: '档案管理员', status: 'pending' },
   ];

   const efficiencyData = [
      { name: '格式预检', hours: 0.1 },
      { name: '内容初审', hours: 4.5 },
      { name: '专业审核', hours: 12.0 },
      { name: '综合审批', hours: 8.0 },
      { name: '归档', hours: 1.0 },
   ];

   const issueTypeData = [
      { name: '合规性错误', value: 35, color: '#ef4444' },
      { name: '模糊表达', value: 25, color: '#f59e0b' },
      { name: '格式问题', value: 15, color: '#3b82f6' },
      { name: '引用失效', value: 25, color: '#8b5cf6' },
   ];

   const handleSmartReview = async () => {
      if (!selectedDoc) return;
      
      setReviewing(true);
      setReviewResult(null);

      // Determine content source
      let contentToReview = '';
      let mimeType: 'text/plain' | 'application/pdf' = 'text/plain';

      if (selectedDoc.type === 'PDF' && selectedDoc.base64) {
          contentToReview = selectedDoc.base64;
          mimeType = 'application/pdf';
      } else if (selectedDoc.content || docContent) {
          contentToReview = selectedDoc.content || docContent;
          mimeType = 'text/plain';
      } else {
          setReviewing(false);
          alert("无法获取文档内容进行评审。");
          return;
      }

      // Call Real AI Service
      const issues = await reviewQMSDocument(contentToReview, mimeType);
      
      setReviewResult(issues);
      setReviewing(false);
   };

   const handleAutoModify = () => {
      const selectedDoc = documents.find(d => d.id === selectedDocId);
      if (selectedDoc?.type === 'Word' || selectedDoc?.type === 'PDF') {
          alert("自动修改暂不支持 PDF 或 Word 格式。请在源文件中修改后重新上传。");
          return;
      }
      setDocContent(prev => prev + "\n\n[AI Auto-Generated Update]\n6.1 Actions to address risks and opportunities\nThe organization shall consider the issues referred to in 4.1 and the requirements referred to in 4.2 and determine the risks and opportunities that need to be addressed.");
      setReviewResult(null); // Clear issues
   };

   const selectedDoc = documents.find(d => d.id === selectedDocId);

   return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full animate-in fade-in duration-500">
         {/* Left: Navigation & Document Tree */}
         <div className="lg:col-span-3 flex flex-col gap-4">
             {/* Tab Switcher */}
             <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-1 flex">
                <button 
                  onClick={() => setActiveTab('WORKSPACE')}
                  className={`flex-1 py-2 text-xs font-medium rounded-lg flex items-center justify-center gap-2 transition-all ${
                     activeTab === 'WORKSPACE' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                   <FileText size={14}/> 文档工作台
                </button>
                <button 
                  onClick={() => setActiveTab('ANALYTICS')}
                  className={`flex-1 py-2 text-xs font-medium rounded-lg flex items-center justify-center gap-2 transition-all ${
                     activeTab === 'ANALYTICS' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                   <BarChart3 size={14}/> 统计分析
                </button>
             </div>

             <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex flex-col flex-1">
               <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Library size={18} className="text-blue-400" />
                  QMS 文档库
               </h3>
               <div className="space-y-1">
                  {documents.map(doc => (
                     <div 
                        key={doc.id} 
                        onClick={() => setSelectedDocId(doc.id)}
                        className={`flex items-center gap-2 p-2 rounded cursor-pointer text-sm ${
                           selectedDocId === doc.id ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-slate-800'
                        }`}
                     >
                        {doc.type === 'External' ? <BookOpen size={14}/> : doc.type === 'PDF' ? <FileText size={14} className="text-red-400"/> : doc.type === 'Word' ? <FileText size={14} className="text-blue-400"/> : <FileText size={14}/>}
                        <div className="flex-1 truncate">{doc.name}</div>
                     </div>
                  ))}
               </div>
               <div className="mt-auto pt-4 border-t border-slate-800">
                  <input 
                     type="file" 
                     ref={fileInputRef} 
                     className="hidden" 
                     accept=".pdf,.docx,.doc"
                     onChange={handleDocUpload}
                  />
                  <button 
                     onClick={() => fileInputRef.current?.click()}
                     className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs flex items-center justify-center gap-2"
                  >
                     <Upload size={14}/> 上传新文档
                  </button>
               </div>
            </div>
         </div>

         {/* Center & Right Content Area */}
         <div className="lg:col-span-9 flex flex-col h-full overflow-hidden">
            {activeTab === 'WORKSPACE' ? (
               <div className="flex flex-col h-full gap-4">
                  {/* Workflow Stepper */}
                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex justify-between items-center overflow-x-auto">
                     {workflowSteps.map((step, idx) => (
                        <div key={idx} className="flex items-center">
                           <div className="flex flex-col items-center gap-1 min-w-[80px]">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-colors ${
                                 step.status === 'completed' ? 'bg-emerald-500 border-emerald-500 text-white' :
                                 step.status === 'current' ? 'bg-indigo-600 border-indigo-500 text-white animate-pulse' :
                                 'bg-slate-900 border-slate-700 text-slate-500'
                              }`}>
                                 {step.status === 'completed' ? <CheckCircle2 size={16}/> : idx + 1}
                              </div>
                              <span className={`text-[10px] font-medium ${step.status === 'current' ? 'text-indigo-400' : 'text-slate-400'}`}>{step.label}</span>
                              <span className="text-[9px] text-slate-600">{step.actor}</span>
                           </div>
                           {idx < workflowSteps.length - 1 && (
                              <div className={`w-12 h-0.5 mx-2 ${
                                 step.status === 'completed' ? 'bg-emerald-500/50' : 'bg-slate-800'
                              }`}></div>
                           )}
                        </div>
                     ))}
                  </div>

                  {/* Editor & Review/Chat Panel */}
                  <div className="flex-1 grid grid-cols-3 gap-4 min-h-0">
                     {/* Editor */}
                     <div 
                        className="col-span-2 flex flex-col bg-slate-950 border border-slate-800 rounded-xl overflow-hidden relative"
                        onMouseUp={handleSelection} // Listen for selection events on the wrapper
                     >
                        <div className="h-10 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 z-10 relative">
                           <span className="text-sm font-medium text-slate-200 flex items-center gap-2">
                              <Edit3 size={14} className="text-emerald-400"/> 
                              {selectedDoc?.name || 'Editor'}
                           </span>
                           <div className="flex gap-2">
                              {currentPdfUrl ? (
                                 <span className="text-xs text-slate-500">Read Only (PDF)</span>
                              ) : selectedDoc?.type === 'Word' ? (
                                 <span className="text-xs text-slate-500">Preview (Word)</span>
                              ) : (
                                 <button 
                                    onClick={handleSaveDocument}
                                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                 >
                                    <Save size={12}/> 保存并同步
                                 </button>
                              )}
                           </div>
                        </div>
                        
                        <div className="flex-1 relative overflow-auto bg-slate-100">
                           {currentPdfUrl ? (
                              <iframe 
                                 src={currentPdfUrl} 
                                 className="w-full h-full border-none" 
                                 title="PDF Preview"
                              />
                           ) : selectedDoc?.type === 'Word' ? (
                              <div ref={docxContainerRef} className="bg-white text-black p-8 min-h-full shadow-lg m-4 rounded"></div>
                           ) : (
                              <textarea 
                                 className="w-full h-full bg-slate-950 text-sm text-slate-300 leading-relaxed focus:outline-none resize-none font-serif p-6"
                                 value={docContent}
                                 onChange={(e) => setDocContent(e.target.value)}
                              />
                           )}
                           
                           {/* Floating Action Button */}
                           {showFloatingBtn && (
                              <button
                                 onClick={handleQuoteToChat}
                                 className="absolute bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-xl px-3 py-1.5 text-xs font-medium flex items-center gap-1 z-50 transition-all animate-in zoom-in-95 duration-200"
                                 style={{ left: floatingBtnPos.x, top: floatingBtnPos.y }}
                              >
                                 <MessageSquarePlus size={14} />
                                 发给 AI 助手
                              </button>
                           )}
                        </div>
                     </div>

                     {/* Right Panel: Smart Review or AI Chat */}
                     <div className="col-span-1 bg-slate-900/50 border border-slate-800 rounded-xl p-0 flex flex-col overflow-hidden">
                        
                        {/* Right Panel Tabs */}
                        <div className="flex border-b border-slate-800">
                           <button
                              onClick={() => setRightTab('CHAT')}
                              className={`flex-1 py-3 text-xs font-medium text-center transition-colors ${
                                 rightTab === 'CHAT' ? 'text-indigo-400 border-b-2 border-indigo-500 bg-slate-900' : 'text-slate-500 hover:text-slate-300'
                              }`}
                           >
                              <div className="flex items-center justify-center gap-2"><Bot size={14}/> AI 助手</div>
                           </button>
                           <button
                              onClick={() => setRightTab('REVIEW')}
                              className={`flex-1 py-3 text-xs font-medium text-center transition-colors ${
                                 rightTab === 'REVIEW' ? 'text-purple-400 border-b-2 border-purple-500 bg-slate-900' : 'text-slate-500 hover:text-slate-300'
                              }`}
                           >
                              <div className="flex items-center justify-center gap-2"><UserCheck size={14}/> 智能评审</div>
                           </button>
                        </div>

                        {rightTab === 'REVIEW' ? (
                           <div className="flex-1 flex flex-col p-5 overflow-hidden">
                              <h3 className="font-semibold text-white mb-4 flex items-center gap-2 shrink-0">
                                 <ScanLine size={18} className="text-purple-400" />
                                 合规性扫描
                              </h3>
                              
                              <div className="flex-1 overflow-y-auto">
                                 {!reviewResult ? (
                                    <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center">
                                       {reviewing ? (
                                          <>
                                             <RefreshCw size={32} className="animate-spin text-purple-500 mb-2"/>
                                             <p className="text-xs">
                                                {selectedDoc?.type === 'PDF' || selectedDoc?.type === 'Word' 
                                                   ? "AI 视觉引擎正在分析文档内容 (Compliance Check)..." 
                                                   : "正在分析条款合规性..."}
                                             </p>
                                          </>
                                       ) : (
                                          <>
                                             <Bot size={32} className="opacity-20 mb-2"/>
                                             <p className="text-xs px-4">
                                                点击下方按钮启动 AI 评审，自动检测不合规项与模糊表达。
                                             </p>
                                          </>
                                       )}
                                    </div>
                                 ) : (
                                    <div className="space-y-3 animate-in slide-in-from-right-4">
                                       {reviewResult.map((res, i) => (
                                          <div key={i} className="bg-slate-950 border border-slate-800 p-3 rounded-lg hover:border-red-500/30 transition-colors">
                                             <div className="flex items-center gap-2 mb-1">
                                                <AlertTriangle size={12} className={res.type === 'compliance' ? "text-red-400" : "text-amber-400"}/>
                                                <span className="text-xs font-bold text-slate-300 uppercase">{res.type} Issue</span>
                                             </div>
                                             <p className="text-xs text-slate-400 mb-2 italic">"{res.text}"</p>
                                             <div className="bg-purple-500/10 border border-purple-500/20 p-2 rounded text-[10px] text-purple-300">
                                                建议: {res.suggestion}
                                             </div>
                                          </div>
                                       ))}
                                    </div>
                                 )}
                              </div>

                              <div className="mt-4 space-y-2 shrink-0">
                                 <button 
                                    onClick={handleSmartReview}
                                    disabled={reviewing}
                                    className="w-full py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
                                 >
                                    <ScanLine size={14}/> 启动智能评审
                                 </button>
                                 {reviewResult && selectedDoc?.type !== 'Word' && selectedDoc?.type !== 'PDF' && (
                                    <button 
                                       onClick={handleAutoModify}
                                       className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs flex items-center justify-center gap-2 border border-slate-700"
                                    >
                                       <Wand2 size={14}/> 一键采纳修改
                                    </button>
                                 )}
                              </div>
                           </div>
                        ) : (
                           // --- CHAT INTERFACE ---
                           <div className="flex-1 flex flex-col overflow-hidden">
                              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                 {chatMessages.map((msg, i) => (
                                    <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                       <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                                          msg.role === 'model' ? 'bg-indigo-600' : 'bg-slate-700'
                                       }`}>
                                          {msg.role === 'model' ? <Bot size={16} className="text-white" /> : <Users size={16} className="text-slate-300" />}
                                       </div>
                                       <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                                          msg.role === 'user' 
                                             ? 'bg-blue-600 text-white rounded-br-none' 
                                             : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-none'
                                       }`}>
                                          {msg.text}
                                       </div>
                                    </div>
                                 ))}
                                 {isChatting && (
                                    <div className="flex gap-3 animate-pulse">
                                       <div className="w-8 h-8 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center">
                                          <Bot size={16} className="text-white" />
                                       </div>
                                       <div className="bg-slate-800 border border-slate-700 px-3 py-2 rounded-2xl rounded-bl-none">
                                          <div className="flex space-x-1">
                                             <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                             <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                             <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                          </div>
                                       </div>
                                    </div>
                                 )}
                                 <div ref={chatEndRef} />
                              </div>
                              <div className="p-3 border-t border-slate-800 bg-slate-900">
                                 <div className="relative">
                                    <textarea 
                                       value={chatInput}
                                       onChange={(e) => setChatInput(e.target.value)}
                                       onKeyDown={(e) => {
                                          if (e.key === 'Enter' && !e.shiftKey) {
                                             e.preventDefault();
                                             handleSendMessage();
                                          }
                                       }}
                                       placeholder="询问文档相关问题..."
                                       className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-3 pr-10 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none h-10 scrollbar-hide"
                                       disabled={isChatting}
                                    />
                                    <button 
                                       onClick={handleSendMessage}
                                       disabled={isChatting || !chatInput.trim()}
                                       className="absolute right-1.5 top-1.5 p-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded transition-colors disabled:bg-slate-800 disabled:text-slate-600"
                                    >
                                       <Send size={12}/>
                                    </button>
                                 </div>
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            ) : (
               // --- ANALYTICS DASHBOARD ---
               <div className="grid grid-cols-2 gap-6 h-full overflow-y-auto pr-2 pb-2">
                  {/* Efficiency Analysis */}
                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                     <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                        <Clock size={18} className="text-blue-400" />
                        审核效率分析 (平均用时/小时)
                     </h3>
                     <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={efficiencyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                              <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                              <YAxis stroke="#64748b" fontSize={10} />
                              <Tooltip cursor={{fill: '#1e293b'}} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#e2e8f0' }} />
                              <Bar dataKey="hours" fill="#3b82f6" barSize={30} radius={[4, 4, 0, 0]}>
                                 {efficiencyData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.hours > 10 ? '#ef4444' : '#3b82f6'} />
                                 ))}
                              </Bar>
                           </BarChart>
                        </ResponsiveContainer>
                     </div>
                  </div>

                  {/* Quality Issues Analysis */}
                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                     <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                        <CheckSquare size={18} className="text-purple-400" />
                        高频错误类型统计
                     </h3>
                     <div className="h-64 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                           <PieChart>
                              <Pie data={issueTypeData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                 {issueTypeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                 ))}
                              </Pie>
                              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }} />
                              <Legend verticalAlign="bottom" height={36} iconSize={8} wrapperStyle={{ fontSize: '12px' }}/>
                           </PieChart>
                        </ResponsiveContainer>
                     </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                     <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                        <TrendingUp size={18} className="text-emerald-400" />
                        人员绩效指标
                     </h3>
                     <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-slate-950 rounded border border-slate-800">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400"><Users size={16}/></div>
                              <div>
                                 <div className="text-sm font-medium text-slate-200">初级审核员</div>
                                 <div className="text-xs text-slate-500">Avg. 响应时间</div>
                              </div>
                           </div>
                           <div className="text-right">
                              <div className="text-sm font-bold text-emerald-400">4.5h</div>
                              <div className="text-[10px] text-emerald-500/70">Top 10%</div>
                           </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-950 rounded border border-slate-800">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400"><Shield size={16}/></div>
                              <div>
                                 <div className="text-sm font-medium text-slate-200">AI 预检系统</div>
                                 <div className="text-xs text-slate-500">拦截准确率</div>
                              </div>
                           </div>
                           <div className="text-right">
                              <div className="text-sm font-bold text-blue-400">98.2%</div>
                              <div className="text-[10px] text-slate-500">Stable</div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Optimization Suggestions */}
                  <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-5 flex flex-col relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-3 opacity-10"><Sparkles size={64}/></div>
                     <h3 className="font-semibold text-indigo-300 mb-4 flex items-center gap-2 relative z-10">
                        <Zap size={18} /> 流程优化建议
                     </h3>
                     <div className="flex-1 space-y-3 relative z-10">
                        <div className="p-3 bg-slate-900/80 rounded border border-indigo-500/20 backdrop-blur-sm">
                           <div className="text-xs font-bold text-indigo-400 mb-1 flex items-center gap-1">
                              <AlertTriangle size={12}/> 瓶颈识别
                           </div>
                           <p className="text-xs text-slate-300 leading-relaxed">
                              数据显示 "专业审核" 环节平均耗时 <strong>12.0小时</strong>，显著高于其他环节。主要积压在 "结构专家" 队列中。
                           </p>
                        </div>
                        <div className="p-3 bg-slate-900/80 rounded border border-emerald-500/20 backdrop-blur-sm">
                           <div className="text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1">
                              <Wand2 size={12}/> AI 改进建议
                           </div>
                           <p className="text-xs text-slate-300 leading-relaxed">
                              建议引入 <strong>自动合规性预检规则 (Rule #402)</strong> 以分流 30% 的简单审核工作，或增加外部专家资源。
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

// --- Main Component ---

const QualityService: React.FC<QualityServiceProps> = ({ viewMode = 'DIAGNOSIS' }) => {
  // --- Render Header Logic ---
  const renderHeader = () => {
     let title = "质量与服务";
     let icon = <CheckCircle2 className="text-emerald-500" />;
     let desc = "仿真与实测闭环、故障智能诊断与市场反馈分析。";

     if (viewMode === 'DIAGNOSIS') {
        title = "智能诊断 (RAG)";
        icon = <Stethoscope className="text-indigo-400" />;
        desc = "基于知识图谱与历史数据的智能故障排查。";
     } else if (viewMode === 'VOC') {
        title = "客户声音 (VoC)";
        icon = <MessageSquare className="text-indigo-400" />;
        desc = "全渠道客户反馈情感分析与缺陷归类。";
     } else if (viewMode === 'FORMAT') {
        title = "格式合规卫士";
        icon = <FileCheck className="text-blue-400" />;
        desc = "基于 SheetJS 的本地 Excel 合规性扫描与异常标记。";
     } else if (viewMode === 'DOCS') {
        title = "质量文档中心";
        icon = <BookOpen className="text-blue-400" />;
        desc = "QMS 体系文件管理与智能评审修改。";
     } else if (viewMode === 'PREDICTIVE') {
        title = "预测性质量";
        icon = <Activity className="text-purple-400" />;
        desc = "基于数字孪生的实时质量预测与仿真校准。";
     }

     return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                 {icon} {title}
              </h2>
              <p className="text-slate-400 text-xs mt-1">{desc}</p>
           </div>
        </div>
     );
  };

  return (
    <div className="p-6 h-full flex flex-col gap-6">
      {renderHeader()}

      {/* Content */}
      <div className="flex-1 min-h-0 relative">
         {viewMode === 'PREDICTIVE' && <PredictiveQualityView />}
         {viewMode === 'DIAGNOSIS' && <RAGDiagnosisView />}
         {viewMode === 'VOC' && <VoCAnalysisView />}
         {viewMode === 'FORMAT' && <FormatComplianceView />}
         {viewMode === 'DOCS' && <QMSDocumentView />}
      </div>
    </div>
  );
};

export default QualityService;
