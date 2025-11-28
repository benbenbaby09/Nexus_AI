import React, { useState, useEffect } from 'react';
import { 
  Play, RotateCcw, Download, Cpu, Layers, FileText, 
  Upload, FileSearch, CheckSquare, AlertOctagon, 
  Wand2, ChevronRight, Gauge, FileCheck, ArrowRight,
  Split, GitMerge, Microscope, Scale, History
} from 'lucide-react';

type SubModule = 'REQUIREMENTS' | 'SIMULATION';

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
              建议：检查能量密度 > 220 Wh/kg 的电芯技术方案。
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

const DesignSim: React.FC = () => {
  const [activeModule, setActiveModule] = useState<SubModule>('SIMULATION');

  return (
    <div className="p-6 h-full flex flex-col gap-6">
      {/* Module Header & Nav */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="text-purple-400" />
            智能产品定义与设计
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            端到端研发闭环：从需求解析到仿真驱动设计。
          </p>
        </div>

        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveModule('REQUIREMENTS')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-md transition-all ${
              activeModule === 'REQUIREMENTS' 
                ? 'bg-slate-800 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Split size={14} />
            1. 智能需求工程
          </button>
          <button
            onClick={() => setActiveModule('SIMULATION')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-md transition-all ${
              activeModule === 'SIMULATION' 
                ? 'bg-slate-800 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu size={14} />
            2. 智能设计与仿真
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 relative">
         {activeModule === 'REQUIREMENTS' && <RequirementsView />}
         {activeModule === 'SIMULATION' && <SimulationView />}
      </div>
    </div>
  );
};

export default DesignSim;