
import React, { useState, useEffect } from 'react';
import { 
  Play, RotateCcw, Download, Cpu, Layers, FileText, 
  Upload, FileSearch, CheckSquare, AlertOctagon, 
  Wand2, ChevronRight, Gauge, FileCheck, ArrowRight,
  Split, GitMerge, Microscope, Scale, History,
  Cuboid, Eye, EyeOff, MessageSquare, Image, Video, 
  MonitorPlay, MousePointer2, Palette, Scan, Share2, 
  Box, Maximize, MoreHorizontal, PenTool, ImagePlus,
  FileOutput, Settings2, RefreshCw, Save
} from 'lucide-react';
import { 
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip
} from 'recharts';

type ViewMode = 'REQUIREMENTS' | 'SIMULATION' | 'BLENDER' | 'IMG_TO_3D';

interface DesignSimProps {
  viewMode: ViewMode;
}

const RequirementsView = () => {
  const [parsingStep, setParsingStep] = useState(0); // 0: Idle, 1: Uploading, 2: Parsing, 3: Done

  const reqs = [
    { id: 'REQ-001', text: '动力电池组容量应大于 100 kWh。', cat: '性能 (Performance)', ver: '测试', status: 'Valid' },
    { id: 'REQ-002', text: '系统总重量（含冷却液）不得超过 450 kg。', cat: '物理 (Physical)', ver: '称重', status: 'Conflict' },
    { id: 'REQ-003', text: '必须在 -40°C 至 60°C 环境温度下正常工作。', cat: '环境 (Env)', ver: '环境舱', status: 'Valid' },
    { id: 'REQ-004', text: '需满足 ISO 26262 ASIL-D 功能安全等级。', cat: '安全 (Safety)', ver: '审查', status: 'Valid' },
  ];

  useEffect(() => {
    // Simulate parsing animation on mount
    if (parsingStep === 0) {
      setTimeout(() => setParsingStep(1), 500);
      setTimeout(() => setParsingStep(2), 1500);
      setTimeout(() => setParsingStep(3), 3000);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Left: Document Source & Parsing */}
      <div className="lg:col-span-4 space-y-6 flex flex-col">
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 flex-1">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <FileText size={18} className="text-blue-400" />
            源文档解析
          </h3>
          
          <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-slate-950/30 hover:bg-slate-900 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Upload className="text-blue-400" size={20} />
            </div>
            <p className="text-sm text-slate-300 font-medium">拖拽标书/需求规格书到此处</p>
            <p className="text-xs text-slate-500 mt-1">支持 PDF, Word, Excel (Max 50MB)</p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${parsingStep >= 1 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                <FileSearch size={16} />
              </div>
              <div className="flex-1">
                <div className="text-sm text-slate-200">文档结构识别</div>
                <div className="text-xs text-slate-500">OCR & 布局分析</div>
              </div>
              {parsingStep === 1 && <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>}
              {parsingStep > 1 && <CheckSquare size={14} className="text-emerald-500" />}
            </div>

            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${parsingStep >= 2 ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-500'}`}>
                <Microscope size={16} />
              </div>
              <div className="flex-1">
                <div className="text-sm text-slate-200">条款抽取与分类</div>
                <div className="text-xs text-slate-500">NLP 实体识别</div>
              </div>
              {parsingStep === 2 && <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>}
              {parsingStep > 2 && <CheckSquare size={14} className="text-emerald-500" />}
            </div>

             <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${parsingStep >= 3 ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-800 text-slate-500'}`}>
                <GitMerge size={16} />
              </div>
              <div className="flex-1">
                <div className="text-sm text-slate-200">Windchill 对象生成</div>
                <div className="text-xs text-slate-500">结构化数据写入</div>
              </div>
              {parsingStep === 3 && <CheckSquare size={14} className="text-emerald-500" />}
            </div>
          </div>
        </div>

        {/* AI Insight Card */}
        {parsingStep === 3 && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center gap-2 mb-2 text-amber-400 font-semibold">
              <Scale size={18} />
              AI 冲突检测
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              检测到潜在需求冲突：<br/>
              <span className="text-white font-medium">REQ-001 (高容量)</span> 与 <span className="text-white font-medium">REQ-002 (轻量化)</span> 存在权衡关系。
            </p>
            <div className="text-xs text-slate-500 bg-slate-900/50 p-2 rounded">
              建议：检查能量密度 &gt; 220 Wh/kg 的电芯技术方案。
            </div>
          </div>
        )}
      </div>

      {/* Right: Requirements Table */}
      <div className="lg:col-span-8 bg-slate-900/50 border border-slate-800 rounded-xl p-5 flex flex-col">
        <div className="flex justify-between items-center mb-4">
           <h3 className="font-semibold text-white flex items-center gap-2">
             <Layers size={18} className="text-purple-400" />
             结构化需求列表 (Generated)
           </h3>
           <div className="flex gap-2">
             <button className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700">导出 Excel</button>
             <button className="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded">同步至 Windchill</button>
           </div>
        </div>

        <div className="flex-1 overflow-auto rounded-lg border border-slate-800 bg-slate-950">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-900 text-slate-400 text-xs uppercase sticky top-0">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">需求条款</th>
                <th className="px-4 py-3">分类</th>
                <th className="px-4 py-3">验证方法</th>
                <th className="px-4 py-3">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {reqs.map((req, i) => (
                <tr key={i} className="hover:bg-slate-900/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-blue-400 text-xs">{req.id}</td>
                  <td className="px-4 py-3 font-medium">{req.text}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-400 border border-slate-700">{req.cat}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">{req.ver}</td>
                  <td className="px-4 py-3">
                    {req.status === 'Conflict' ? (
                       <span className="flex items-center gap-1 text-amber-400 text-xs"><AlertOctagon size={12} /> 冲突</span>
                    ) : (
                       <span className="flex items-center gap-1 text-emerald-400 text-xs"><CheckSquare size={12} /> 有效</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {parsingStep < 3 && (
            <div className="p-8 text-center text-slate-500">
              等待解析完成...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SimulationView = () => {
  const [wallThickness, setWallThickness] = useState(2.5);
  const [isSimulating, setIsSimulating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  // Surrogate Model Proxy Calculation
  const maxStress = Math.round(450 * (2.5 / wallThickness) * (1 + Math.random() * 0.05));
  const safetyFactor = (600 / maxStress).toFixed(2); // Assume Yield Strength 600 MPa
  const displacement = (2.1 * (2.5 / wallThickness)).toFixed(2);

  const generateReport = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setReportGenerated(true);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
       
       {/* Left: Design Parameters & Wizard */}
       <div className="lg:col-span-3 space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
             <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Wand2 size={18} className="text-purple-400" />
                仿真前处理向导
             </h3>
             
             <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs text-slate-500 block mb-1.5">分析类型</label>
                  <select className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500">
                     <option>静力学分析 (Static Structural)</option>
                     <option>模态分析 (Modal)</option>
                     <option>流体动力学 (CFD)</option>
                  </select>
                </div>
                
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                   <div className="text-xs font-semibold text-blue-400 mb-1 flex items-center gap-1"><Cpu size={12}/> AI 推荐模板</div>
                   <p className="text-xs text-slate-300">
                      检测到 "涡轮叶片" 特征。已自动应用 <strong>Ni-Superalloy</strong> 材料属性与 <strong>离心载荷</strong> 边界条件。
                   </p>
                </div>
             </div>

             <div className="border-t border-slate-800 pt-4">
                <h4 className="text-sm font-medium text-slate-300 mb-3">实时设计参数 (代理模型)</h4>
                <div className="space-y-4">
                   <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                         <span>壁厚 (Wall Thickness)</span>
                         <span className="text-white">{wallThickness} mm</span>
                      </div>
                      <input 
                        type="range" min="1.0" max="5.0" step="0.1" 
                        value={wallThickness}
                        onChange={(e) => setWallThickness(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Gauge size={18} className="text-emerald-400" />
                性能预测 (Real-time)
              </h3>
              <div className="space-y-3">
                 <div className="flex justify-between items-center p-2 bg-slate-950/50 rounded border border-slate-800">
                    <span className="text-xs text-slate-400">最大应力</span>
                    <span className={`text-sm font-mono font-bold ${maxStress > 550 ? 'text-red-400' : 'text-slate-200'}`}>
                      {maxStress} MPa
                    </span>
                 </div>
                 <div className="flex justify-between items-center p-2 bg-slate-950/50 rounded border border-slate-800">
                    <span className="text-xs text-slate-400">安全系数</span>
                    <span className={`text-sm font-mono font-bold ${parseFloat(safetyFactor) < 1.1 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {safetyFactor}
                    </span>
                 </div>
                 <div className="flex justify-between items-center p-2 bg-slate-950/50 rounded border border-slate-800">
                    <span className="text-xs text-slate-400">最大位移</span>
                    <span className="text-sm font-mono font-bold text-slate-200">
                      {displacement} mm
                    </span>
                 </div>
              </div>
          </div>
       </div>

       {/* Center: 3D Viewer */}
       <div className="lg:col-span-6 flex flex-col">
          <div className="flex-1 bg-black rounded-xl border border-slate-700 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                {/* Dynamic Stress Visualization */}
                <div className="relative w-full h-full p-10 flex items-center justify-center opacity-90 transition-all duration-300">
                    <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 drop-shadow-2xl">
                        {/* Blade Shape approximation */}
                        <path 
                          d="M60,180 C10,180 20,80 60,40 C100,0 140,40 160,180 Z" 
                          fill="url(#stressGradient)" 
                          stroke="#ffffff33" 
                          strokeWidth="1"
                        />
                        <defs>
                            <radialGradient id="stressGradient" cx="50%" cy="80%" r="90%" fx="50%" fy="80%">
                                {/* Color shifts based on stress */}
                                <stop offset="0%" stopColor={maxStress > 500 ? "#ef4444" : "#f97316"} /> 
                                <stop offset="40%" stopColor="#eab308" /> 
                                <stop offset="100%" stopColor="#3b82f6" /> 
                            </radialGradient>
                        </defs>
                    </svg>
                    
                    {/* Measurement Points */}
                    <div className="absolute top-[30%] left-[40%] flex flex-col items-center group/marker">
                       <div className="w-2 h-2 bg-white rounded-full animate-ping absolute"></div>
                       <div className="w-2 h-2 bg-red-500 rounded-full relative z-10 border border-white"></div>
                       <div className="mt-2 bg-black/70 backdrop-blur px-2 py-1 rounded text-[10px] text-white border border-slate-600 opacity-0 group-hover/marker:opacity-100 transition-opacity whitespace-nowrap">
                          Max Stress: {maxStress} MPa
                       </div>
                    </div>
                </div>
            </div>
            
            {/* Viewport Overlay */}
            <div className="absolute top-4 left-4 text-xs font-mono text-slate-500">
               <div>MODEL: HPT_BLADE_V4.prt</div>
               <div>NODES: 1.2M</div>
               <div>SOLVER: ANSYS (Proxy)</div>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 bg-slate-900/80 backdrop-blur-md px-6 py-2 rounded-full border border-slate-700">
               <button className="text-white hover:text-blue-400"><RotateCcw size={18}/></button>
               <div className="w-px h-5 bg-slate-600"></div>
               <span className="text-xs text-slate-300 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-red-500"></div> Stress
               </span>
               <span className="text-xs text-slate-500 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-slate-500"></div> Strain
               </span>
            </div>
          </div>
       </div>

       {/* Right: Report Generation */}
       <div className="lg:col-span-3 bg-slate-900/50 border border-slate-800 rounded-xl p-5 flex flex-col">
           <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <FileText size={18} className="text-blue-400" />
              CAE 智能报告
           </h3>
           
           <div className="flex-1 space-y-4">
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-slate-400 leading-relaxed overflow-hidden relative">
                 {reportGenerated ? (
                   <div className="animate-in fade-in duration-500">
                     <p className="text-slate-300 font-bold mb-2"># 仿真分析摘要</p>
                     <p>模型: HPT_BLADE_V4</p>
                     <p>工况: 离心载荷 + 热耦合</p>
                     <br/>
                     <p>本次分析结果显示，在壁厚为 {wallThickness}mm 时，最大 Von Mises 应力为 {maxStress} MPa，位于叶根圆角处。</p>
                     <br/>
                     <p className={parseFloat(safetyFactor) < 1.1 ? "text-red-400" : "text-emerald-400"}>
                        结论: {parseFloat(safetyFactor) < 1.1 ? "安全系数不足，建议优化。" : "设计满足强度要求。"}
                     </p>
                   </div>
                 ) : (
                   <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-2">
                      <FileCheck size={32} opacity={0.2} />
                      <p>等待生成...</p>
                   </div>
                 )}
              </div>
           </div>

           <button 
             onClick={generateReport}
             disabled={isSimulating}
             className="mt-4 w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
           >
             {isSimulating ? (
               <><div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></div> 正在撰写...</>
             ) : (
               <><Wand2 size={16} /> 生成 AI 报告</>
             )}
           </button>
       </div>

    </div>
  );
};

// --- Blender Studio View ---

const BlenderStudioView = () => {
  const [mode, setMode] = useState<'REVIEW' | 'RENDER' | 'CONCEPT'>('REVIEW');
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(false);
  
  // Mock Scene Data
  const parts = [
    { id: 'ASM-001', name: '涡轮总成 (Turbine ASM)', status: 'Released', visible: true },
    { id: 'PRT-102', name: '机匣外壳 (Casing)', status: 'In Work', visible: true },
    { id: 'PRT-105', name: '主轴 (Main Shaft)', status: 'Released', visible: true },
    { id: 'PRT-209', name: '叶片组 (Blade Set)', status: 'In Work', visible: true },
  ];

  const comments = [
    { id: 1, user: 'Li Wei', text: '机匣壁厚此处需增加 0.5mm 余量', date: '10 mins ago', x: 40, y: 30 },
    { id: 2, user: 'Sarah J', text: '检查与其他组件的干涉情况', date: '2 hours ago', x: 60, y: 60 },
  ];

  const handleRender = () => {
    setIsRendering(true);
    setTimeout(() => setIsRendering(false), 2000);
  };

  const selectedPart = parts.find(p => p.id === selectedPartId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 h-full animate-in fade-in duration-500 bg-black border border-slate-800 rounded-xl overflow-hidden">
       
       {/* Left Sidebar: Scene Graph */}
       <div className="lg:col-span-2 bg-slate-900 border-r border-slate-800 flex flex-col">
          <div className="p-3 border-b border-slate-800 flex justify-between items-center">
             <span className="text-xs font-semibold text-slate-400 uppercase">Scene Collection</span>
             <MoreHorizontal size={14} className="text-slate-500"/>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
             {parts.map(part => (
                <div 
                  key={part.id} 
                  onClick={() => setSelectedPartId(part.id)}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer text-xs ${
                     selectedPartId === part.id ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                   {part.visible ? <Eye size={12} className="opacity-50"/> : <EyeOff size={12} className="opacity-50"/>}
                   <Cuboid size={12} className={part.id.startsWith('ASM') ? 'text-blue-400' : 'text-orange-400'}/>
                   <span className="truncate">{part.name}</span>
                </div>
             ))}
          </div>
          {/* Linked Data Preview */}
          <div className="p-3 border-t border-slate-800 bg-slate-950">
             <div className="text-[10px] text-slate-500 uppercase mb-2 font-semibold flex items-center gap-1"><Share2 size={10}/> Windchill Data</div>
             {selectedPart ? (
                <div className="space-y-1">
                   <div className="text-xs text-white truncate">{selectedPart.name}</div>
                   <div className="flex justify-between text-[10px] text-slate-400">
                      <span>{selectedPart.id}</span>
                      <span className={selectedPart.status === 'Released' ? 'text-emerald-500' : 'text-amber-500'}>{selectedPart.status}</span>
                   </div>
                </div>
             ) : (
                <div className="text-[10px] text-slate-600 italic">Select a part to view details</div>
             )}
          </div>
       </div>

       {/* Center: 3D Viewport */}
       <div className="lg:col-span-7 bg-gradient-to-br from-slate-900 via-slate-950 to-black relative group">
          
          {/* Viewport Toolbar */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-800/80 backdrop-blur rounded-lg border border-slate-700 p-1 flex gap-1 shadow-lg z-10">
             <button className="p-1.5 hover:bg-slate-700 rounded text-slate-300" title="Select"><MousePointer2 size={16}/></button>
             <button className="p-1.5 hover:bg-slate-700 rounded text-slate-300" title="Move"><Maximize size={16}/></button>
             <button className="p-1.5 hover:bg-slate-700 rounded text-slate-300" title="Rotate"><RotateCcw size={16}/></button>
             <div className="w-px h-4 bg-slate-600 self-center mx-1"></div>
             <button 
               className={`p-1.5 hover:bg-slate-700 rounded transition-colors ${mode === 'REVIEW' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
               onClick={() => setMode('REVIEW')}
             >
                <MessageSquare size={16}/>
             </button>
             <button 
               className={`p-1.5 hover:bg-slate-700 rounded transition-colors ${mode === 'RENDER' ? 'bg-purple-600 text-white' : 'text-slate-300'}`}
               onClick={() => setMode('RENDER')}
             >
                <Image size={16}/>
             </button>
             <button 
               className={`p-1.5 hover:bg-slate-700 rounded transition-colors ${mode === 'CONCEPT' ? 'bg-emerald-600 text-white' : 'text-slate-300'}`}
               onClick={() => setMode('CONCEPT')}
             >
                <Palette size={16}/>
             </button>
          </div>

          {/* 3D Scene Mock */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             {/* Simple visual representation of engine parts */}
             <div className="relative w-96 h-96 opacity-80 animate-[spin_20s_linear_infinite] hover:pause">
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_50px_rgba(59,130,246,0.3)]">
                   <circle cx="100" cy="100" r="80" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                   <circle cx="100" cy="100" r="60" fill="none" stroke="#475569" strokeWidth="2" />
                   <circle cx="100" cy="100" r="20" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
                   {/* Blades */}
                   {[...Array(12)].map((_, i) => (
                      <rect 
                        key={i} 
                        x="95" y="20" width="10" height="60" 
                        fill="#334155" 
                        transform={`rotate(${i * 30} 100 100)`} 
                        className="hover:fill-blue-500 transition-colors pointer-events-auto cursor-pointer"
                        onClick={() => setSelectedPartId('PRT-209')}
                      />
                   ))}
                </svg>
                {/* Annotations Overlay */}
                {mode === 'REVIEW' && comments.map(c => (
                   <div 
                     key={c.id}
                     className="absolute w-6 h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-lg pointer-events-auto cursor-pointer hover:scale-110 transition-transform"
                     style={{ top: `${c.y}%`, left: `${c.x}%` }}
                   >
                      {c.id}
                   </div>
                ))}
             </div>
          </div>
          
          <div className="absolute bottom-4 right-4 text-xs font-mono text-slate-500">
             Blender 4.0 Core | Cycles Engine Ready
          </div>
       </div>

       {/* Right Sidebar: Context Panel */}
       <div className="lg:col-span-3 bg-slate-900 border-l border-slate-800 p-4 flex flex-col">
          {mode === 'REVIEW' && (
             <>
                <h4 className="text-xs font-semibold text-white uppercase mb-4 flex items-center gap-2">
                   <MessageSquare size={14} className="text-blue-400"/> Design Review
                </h4>
                <div className="flex-1 space-y-3 overflow-y-auto">
                   {comments.map(c => (
                      <div key={c.id} className="bg-slate-950 p-3 rounded border border-slate-800 hover:border-slate-700">
                         <div className="flex justify-between items-start mb-1">
                            <div className="flex items-center gap-2">
                               <div className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[9px]">{c.id}</div>
                               <span className="text-xs font-medium text-slate-300">{c.user}</span>
                            </div>
                            <span className="text-[9px] text-slate-600">{c.date}</span>
                         </div>
                         <p className="text-xs text-slate-400 leading-relaxed">{c.text}</p>
                      </div>
                   ))}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-800">
                   <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded flex items-center justify-center gap-2">
                      <PenTool size={12}/> Add Marker
                   </button>
                </div>
             </>
          )}

          {mode === 'RENDER' && (
             <>
                <h4 className="text-xs font-semibold text-white uppercase mb-4 flex items-center gap-2">
                   <Image size={14} className="text-purple-400"/> AI Render Studio
                </h4>
                
                <div className="space-y-4">
                   <div>
                      <label className="text-xs text-slate-500 block mb-2">Style Preset</label>
                      <div className="grid grid-cols-2 gap-2">
                         {['Studio', 'Outdoor', 'Blueprint', 'Clay'].map(style => (
                            <button key={style} className="py-2 text-xs bg-slate-950 border border-slate-800 rounded text-slate-400 hover:text-white hover:border-purple-500/50 transition-colors">
                               {style}
                            </button>
                         ))}
                      </div>
                   </div>

                   <div>
                      <label className="text-xs text-slate-500 block mb-2">Output Format</label>
                      <select className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-xs text-slate-300">
                         <option>4K Image (.png)</option>
                         <option>Turntable (.mp4)</option>
                         <option>Exploded View (.mp4)</option>
                      </select>
                   </div>
                   
                   <div className="h-32 bg-slate-950 rounded border border-slate-800 flex items-center justify-center relative overflow-hidden">
                      {isRendering ? (
                         <div className="flex flex-col items-center gap-2">
                            <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-xs text-purple-400 animate-pulse">Rendering...</span>
                         </div>
                      ) : (
                         <div className="text-center opacity-40">
                            <Image size={24} className="mx-auto mb-1"/>
                            <span className="text-[10px]">Preview</span>
                         </div>
                      )}
                   </div>

                   <button 
                     onClick={handleRender}
                     disabled={isRendering}
                     className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-600 text-white text-xs rounded font-medium flex items-center justify-center gap-2"
                   >
                      <Wand2 size={12}/> Generate Render
                   </button>
                </div>
             </>
          )}

          {mode === 'CONCEPT' && (
             <>
                <h4 className="text-xs font-semibold text-white uppercase mb-4 flex items-center gap-2">
                   <Palette size={14} className="text-emerald-400"/> Concept Lab
                </h4>
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-lg text-center mb-4">
                   <Scan size={24} className="mx-auto text-emerald-500 mb-2"/>
                   <p className="text-xs text-slate-300 mb-2">Generative Design Agent</p>
                   <p className="text-[10px] text-slate-500">Describe your concept, and AI will generate a 3D mesh for sculpting.</p>
                </div>
                <textarea 
                  className="w-full h-24 bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-emerald-500 mb-2"
                  placeholder="e.g. A futuristic drone housing with organic voronoi patterns..."
                ></textarea>
                <button className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded">
                   Generate Mesh
                </button>
             </>
          )}
       </div>

    </div>
  );
};

// --- Image to 3D View ---

const ImageTo3DView = () => {
   const [step, setStep] = useState<'UPLOAD' | 'PROCESSING' | 'RESULT'>('UPLOAD');
   const [uploadedImage, setUploadedImage] = useState<string | null>(null);
   const [processingStage, setProcessingStage] = useState(0); // 0-100
   
   // Mock Feature Tree
   const features = [
      { id: 'SKETCH_01', type: 'Sketch', name: 'Base Contour' },
      { id: 'EXTRUDE_01', type: 'Extrude', name: 'Boss Extrude', param: '25mm' },
      { id: 'FILLET_01', type: 'Fillet', name: 'Edge Blend', param: 'R 5mm' },
      { id: 'SHELL_01', type: 'Shell', name: 'Housing Shell', param: '2mm' },
   ];

   const handleUpload = () => {
      // Simulate file upload
      setUploadedImage('https://images.unsplash.com/photo-1544654067-27b5936720f7?q=80&w=600&auto=format&fit=crop'); // Placeholder sketch image
      setStep('PROCESSING');
      
      // Simulate processing
      let progress = 0;
      const interval = setInterval(() => {
         progress += 5;
         setProcessingStage(progress);
         if (progress >= 100) {
            clearInterval(interval);
            setStep('RESULT');
         }
      }, 150);
   };

   return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full animate-in fade-in duration-500">
         
         {/* Left Column: Input & Tree */}
         <div className="lg:col-span-3 bg-slate-900/50 border border-slate-800 rounded-xl p-5 flex flex-col">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
               <Layers size={18} className="text-orange-400" />
               设计输入与特征树
            </h3>
            
            {step === 'UPLOAD' ? (
               <div 
                  onClick={handleUpload}
                  className="flex-1 border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-900/50 hover:border-orange-500/50 transition-colors"
               >
                  <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mb-3">
                     <ImagePlus size={24} className="text-orange-400"/>
                  </div>
                  <p className="text-sm text-slate-300 font-medium">点击上传草图或照片</p>
                  <p className="text-xs text-slate-500 mt-1">支持 JPG, PNG, HEIC</p>
               </div>
            ) : (
               <div className="flex-1 flex flex-col">
                  {/* Thumbnail */}
                  <div className="h-32 bg-slate-950 rounded-lg mb-4 border border-slate-800 overflow-hidden relative">
                     {uploadedImage && <img src={uploadedImage} className="w-full h-full object-cover opacity-60" />}
                     <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1 text-[10px] text-center text-slate-400">Source Image</div>
                  </div>

                  {/* Feature Tree */}
                  <div className="flex-1 bg-slate-950 rounded-lg border border-slate-800 p-2 overflow-y-auto">
                     <div className="text-[10px] text-slate-500 uppercase font-bold mb-2 px-2">Parametric History</div>
                     <div className="space-y-1">
                        {features.map((feat, i) => (
                           <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-800 cursor-pointer group">
                              <Box size={12} className="text-blue-400"/>
                              <div className="flex-1 min-w-0">
                                 <div className="text-xs text-slate-300 font-medium">{feat.name}</div>
                                 <div className="text-[10px] text-slate-500">{feat.type} • {feat.param}</div>
                              </div>
                              <Settings2 size={12} className="text-slate-600 group-hover:text-slate-400"/>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            )}
         </div>

         {/* Center Column: Visualization */}
         <div className="lg:col-span-6 bg-black border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center">
             {/* Background Grid */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.2)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
             
             {step === 'PROCESSING' && (
                <div className="flex flex-col items-center gap-4 z-10">
                   <div className="relative w-24 h-24">
                      <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-orange-500 font-bold">{processingStage}%</div>
                   </div>
                   <div className="text-sm text-slate-300 font-medium animate-pulse">
                      {processingStage < 30 ? '图像分割与轮廓提取...' : 
                       processingStage < 60 ? '几何特征推断...' : 
                       processingStage < 90 ? '构建 B-Rep 模型...' : '参数化重构...'}
                   </div>
                </div>
             )}

             {step === 'RESULT' && (
                <div className="relative w-full h-full flex items-center justify-center z-10">
                   {/* 3D Representation Placeholder */}
                   <svg viewBox="0 0 400 300" className="w-3/4 h-3/4 drop-shadow-2xl animate-in zoom-in duration-500">
                      <path d="M100,200 L300,200 L350,150 L150,150 Z" fill="#334155" stroke="#94a3b8" strokeWidth="2" /> {/* Base */}
                      <path d="M100,200 L100,100 L300,100 L300,200 Z" fill="#475569" stroke="#94a3b8" strokeWidth="2" opacity="0.8" /> {/* Front */}
                      <path d="M100,100 L150,50 L350,50 L300,100 Z" fill="#64748b" stroke="#94a3b8" strokeWidth="2" /> {/* Top */}
                      <path d="M300,200 L350,150 L350,50 L300,100 Z" fill="#475569" stroke="#94a3b8" strokeWidth="2" opacity="0.6" /> {/* Side */}
                      <circle cx="225" cy="125" r="20" fill="#1e293b" stroke="#94a3b8" strokeWidth="2"/> {/* Hole feature */}
                   </svg>
                   
                   <div className="absolute bottom-6 flex gap-4">
                      <button className="p-2 bg-slate-800/80 backdrop-blur rounded-full text-slate-300 hover:text-white border border-slate-600"><RotateCcw size={20}/></button>
                      <button className="p-2 bg-slate-800/80 backdrop-blur rounded-full text-slate-300 hover:text-white border border-slate-600"><Maximize size={20}/></button>
                   </div>
                </div>
             )}
         </div>

         {/* Right Column: Actions */}
         <div className="lg:col-span-3 space-y-4">
             {step === 'RESULT' ? (
                <>
                   <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                      <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                         <Wand2 size={16} className="text-purple-400" />
                         语义编辑 (Semantic Edit)
                      </h4>
                      <div className="space-y-2">
                         <input 
                           type="text" 
                           placeholder="例如: 将圆角半径增加到 10mm" 
                           className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                         />
                         <button className="w-full py-1.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-500/30 rounded text-xs transition-colors">
                            应用修改
                         </button>
                      </div>
                   </div>

                   <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                      <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                         <FileOutput size={16} className="text-emerald-400" />
                         导出与集成
                      </h4>
                      <div className="space-y-2">
                         <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs text-slate-300 flex items-center justify-center gap-2">
                            <Download size={14}/> 导出 STEP (.stp)
                         </button>
                         <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs text-slate-300 flex items-center justify-center gap-2">
                            <Download size={14}/> 导出 IGES (.igs)
                         </button>
                         <div className="h-px bg-slate-800 my-2"></div>
                         <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs flex items-center justify-center gap-2">
                            <Save size={14}/> 创建 Windchill 部件
                         </button>
                      </div>
                   </div>
                </>
             ) : (
                <div className="h-full bg-slate-900/30 border border-slate-800 rounded-xl flex items-center justify-center text-slate-600 text-xs p-8 text-center border-dashed">
                   等待模型生成...
                </div>
             )}
         </div>
      </div>
   );
};

const DesignSim: React.FC<DesignSimProps> = ({ viewMode }) => {
  // --- Render Header Logic ---
  const renderHeader = () => {
     let title = "智能产品定义与设计";
     let icon = <Layers className="text-purple-400" />;
     let desc = "端到端研发闭环：从需求解析到仿真驱动设计。";

     if (viewMode === 'REQUIREMENTS') {
        title = "智能需求工程";
        icon = <Split className="text-blue-400" />;
        desc = "AI 辅助的标书解析、条款提取与冲突检测。";
     } else if (viewMode === 'SIMULATION') {
        title = "智能设计与仿真";
        icon = <Cpu className="text-purple-400" />;
        desc = "实时代理模型 (Surrogate Model) 预测与设计参数优化。";
     } else if (viewMode === 'BLENDER') {
        title = "Blender Studio";
        icon = <Box className="text-orange-400" />;
        desc = "集成式 3D 评审、渲染与概念设计环境。";
     } else if (viewMode === 'IMG_TO_3D') {
        title = "图生 3D (Image to Mesh)";
        icon = <ImagePlus className="text-emerald-400" />;
        desc = "基于草图或照片快速生成参数化 3D 模型。";
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

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 relative">
         {viewMode === 'REQUIREMENTS' && <RequirementsView />}
         {viewMode === 'SIMULATION' && <SimulationView />}
         {viewMode === 'BLENDER' && <BlenderStudioView />}
         {viewMode === 'IMG_TO_3D' && <ImageTo3DView />}
      </div>
    </div>
  );
};

export default DesignSim;
