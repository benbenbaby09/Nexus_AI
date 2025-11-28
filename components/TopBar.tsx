import React, { useState, useRef, useEffect } from 'react';
import { UserPersona } from '../types';
import { 
  Search, Bell, Settings, X, Box, FileText, AlertTriangle, User, 
  Filter, History, TrendingUp, ChevronRight, Package, FileCode,
  LayoutGrid, Database, Link as LinkIcon, ArrowRight, Sparkles,
  Command
} from 'lucide-react';

interface TopBarProps {
  currentPersona: UserPersona;
  setPersona: (p: UserPersona) => void;
}

// --- Mock Data for Search ---
const MOCK_RESULTS = {
  intent: {
    original: "发动机叶片疲劳分析",
    parsed: { object: "发动机叶片", type: "CAE 分析报告", time: "最新" },
    confidence: 0.98
  },
  facets: [
    { id: 'all', label: '全部结果', count: 12 },
    { id: 'part', label: '零部件 (Parts)', count: 3 },
    { id: 'doc', label: '文档 (Docs)', count: 5 },
    { id: 'issue', label: '质量问题 (Issues)', count: 2 },
    { id: 'people', label: '专家 (People)', count: 2 },
  ],
  items: {
    part: [
      { id: 'PT-10293', name: '高压涡轮叶片 (HPT Blade)', ver: 'A.3', state: 'RELEASED', stock: 120, img: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=200&auto=format&fit=crop' },
      { id: 'PT-88210', name: '叶片冷却孔工装', ver: 'B.1', state: 'IN_WORK', stock: 45, img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=200&auto=format&fit=crop' }
    ],
    doc: [
      { id: 'DOC-551', title: 'HPT 叶片低周疲劳 (LCF) 分析报告_v2.pdf', type: 'CAE Report', date: '2023-10-20', author: 'Li Wei' },
      { id: 'SPEC-002', title: '钛合金材料规格书 (Ti-6Al-4V)', type: 'Material Spec', date: '2023-09-15', author: 'Standards Dept' }
    ],
    issue: [
      { id: 'PR-992', title: '叶根榫头应力集中超标', severity: 'High', status: 'Open', owner: 'Wang Jun', ecn: 'ECN-24-055' },
    ],
    people: [
      { id: 'U-001', name: '张工', role: '结构仿真专家', dept: '设计部', skills: ['Ansys', 'Fatigue'] }
    ]
  }
};

const SUGGESTIONS = [
  "起落架液压系统",
  "最新的 ECN 变更",
  "3D 打印材料强度测试"
];

const TopBar: React.FC<TopBarProps> = ({ currentPersona, setPersona }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFocus = () => setIsSearchOpen(true);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setIsSearchOpen(false);
    if (e.key === 'Enter') setIsSearchOpen(true); // Ensure open on enter
  };

  const clearSearch = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };

  const hasQuery = searchQuery.length > 0;

  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-50">
      
      {/* --- Global Intelligent Search Bar --- */}
      <div className="flex-1 max-w-3xl relative" ref={searchRef}>
        <div className={`relative group transition-all duration-300 ${isSearchOpen ? 'scale-[1.01]' : ''}`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className={`h-4 w-4 transition-colors ${isSearchOpen ? 'text-blue-400' : 'text-slate-500'}`} />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            className={`block w-full pl-10 pr-10 py-2.5 border rounded-lg leading-5 bg-slate-950/50 text-slate-200 placeholder-slate-500 focus:outline-none transition-all duration-200
              ${isSearchOpen ? 'border-blue-500/50 ring-1 ring-blue-500/20 bg-slate-900 shadow-xl' : 'border-slate-700 hover:border-slate-600'}`}
            placeholder="全局搜索... (试着搜 '发动机叶片分析')"
          />
          {hasQuery ? (
            <button onClick={clearSearch} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300">
              <X size={14} />
            </button>
          ) : (
            <div className="absolute right-3 top-2.5 pointer-events-none">
               <span className="flex items-center gap-1 text-[10px] text-slate-600 border border-slate-700 px-1.5 rounded bg-slate-800/50">
                 <Command size={10} /> K
               </span>
            </div>
          )}
        </div>

        {/* --- Search Results Panel --- */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-2 duration-200 min-h-[400px]">
            
            {!hasQuery ? (
              // Empty State: Recent & Trending
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <History size={14} /> 最近搜索
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['ECN-2024-001', '钛合金强度参数', '起落架装配图'].map(tag => (
                      <button key={tag} onClick={() => setSearchQuery(tag)} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-full text-sm text-slate-300 transition-colors">
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <TrendingUp size={14} /> 热门推荐
                  </h4>
                  <ul className="space-y-2">
                    {SUGGESTIONS.map((s, i) => (
                      <li key={i} onClick={() => setSearchQuery(s)} className="flex items-center justify-between p-2 hover:bg-slate-800 rounded-lg cursor-pointer group">
                        <span className="text-slate-400 group-hover:text-blue-400 text-sm">{s}</span>
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 text-slate-500 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              // Results State
              <div className="flex flex-1 min-h-[500px]">
                
                {/* Left: Facets / Filters */}
                <div className="w-48 border-r border-slate-800 bg-slate-950/30 p-2 space-y-1">
                  {MOCK_RESULTS.facets.map(facet => (
                    <button
                      key={facet.id}
                      onClick={() => setActiveTab(facet.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors
                        ${activeTab === facet.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
                    >
                      <span className="truncate">{facet.label}</span>
                      <span className={`text-xs px-1.5 rounded-full ${activeTab === facet.id ? 'bg-blue-500' : 'bg-slate-800'}`}>
                        {facet.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Right: Main Content */}
                <div className="flex-1 flex flex-col">
                  
                  {/* Semantic Intent Display */}
                  <div className="p-3 border-b border-slate-800 bg-gradient-to-r from-slate-900 to-slate-900">
                    <div className="flex items-center gap-2 text-xs">
                       <Sparkles size={14} className="text-purple-400" />
                       <span className="text-slate-400">AI 已理解:</span>
                       <div className="flex gap-2">
                         <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300 border border-slate-700">
                           对象: <span className="text-white font-medium">{MOCK_RESULTS.intent.parsed.object}</span>
                         </span>
                         <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300 border border-slate-700">
                           类型: <span className="text-white font-medium">{MOCK_RESULTS.intent.parsed.type}</span>
                         </span>
                       </div>
                    </div>
                  </div>

                  {/* Scrollable Results */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    
                    {/* PARTS Section */}
                    {(activeTab === 'all' || activeTab === 'part') && (
                      <div className="space-y-3">
                        <h5 className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-2"><Box size={14}/> 零部件</h5>
                        {MOCK_RESULTS.items.part.map(item => (
                          <div key={item.id} className="flex gap-4 p-3 bg-slate-800/50 border border-slate-800 rounded-lg hover:border-slate-600 transition-colors group cursor-pointer">
                            <div className="w-16 h-16 rounded bg-slate-900 overflow-hidden border border-slate-700 flex-shrink-0 relative">
                               <img src={item.img} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                               <div className="absolute bottom-0 right-0 bg-slate-950/80 px-1 text-[8px] text-white">3D</div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <h4 className="text-sm font-medium text-blue-400 group-hover:underline truncate">{item.name}</h4>
                                <span className="text-xs font-mono text-slate-500">{item.id}</span>
                              </div>
                              <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                                <span className="bg-slate-700/50 px-1.5 rounded text-slate-300">Rev: {item.ver}</span>
                                <span className={item.state === 'RELEASED' ? 'text-emerald-400' : 'text-amber-400'}>{item.state}</span>
                                <span>ERP 库存: {item.stock}</span>
                              </div>
                              <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                                <Database size={10} /> 来自 Windchill & SAP
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* DOCS Section */}
                    {(activeTab === 'all' || activeTab === 'doc') && (
                      <div className="space-y-3">
                        <h5 className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-2"><FileText size={14}/> 文档</h5>
                        {MOCK_RESULTS.items.doc.map(item => (
                          <div key={item.id} className="p-3 bg-slate-800/50 border border-slate-800 rounded-lg hover:border-slate-600 transition-colors cursor-pointer group">
                             <div className="flex items-start gap-3">
                                <div className="p-2 bg-slate-900 rounded border border-slate-700 text-red-400">
                                   <FileCode size={18} />
                                </div>
                                <div className="flex-1">
                                   <h4 className="text-sm font-medium text-slate-200 group-hover:text-blue-400 transition-colors">{item.title}</h4>
                                   <p className="text-xs text-slate-500 mt-1 line-clamp-2">包含针对 {MOCK_RESULTS.intent.parsed.object} 的详细边界条件设置和网格划分策略摘要...</p>
                                   <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                                      <span>{item.type}</span>
                                      <span>{item.date}</span>
                                      <span className="flex items-center gap-1"><User size={10}/> {item.author}</span>
                                   </div>
                                </div>
                             </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* ISSUES Section */}
                    {(activeTab === 'all' || activeTab === 'issue') && (
                      <div className="space-y-3">
                        <h5 className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-2"><AlertTriangle size={14}/> 质量与变更</h5>
                        {MOCK_RESULTS.items.issue.map(item => (
                          <div key={item.id} className="p-3 bg-red-500/5 border border-red-500/20 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer">
                             <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-red-400 font-medium text-sm">{item.id}</span>
                                  <span className="bg-red-500 text-white text-[10px] px-1.5 rounded font-bold">{item.severity}</span>
                                </div>
                                <span className="text-xs text-slate-500">{item.status}</span>
                             </div>
                             <h4 className="text-sm text-slate-200 mb-2">{item.title}</h4>
                             <div className="flex items-center gap-3 text-xs text-slate-500">
                               <span className="flex items-center gap-1"><LinkIcon size={10}/> 关联: {item.ecn}</span>
                               <span>负责人: {item.owner}</span>
                             </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Footer */}
            <div className="h-8 bg-slate-950 border-t border-slate-800 flex items-center justify-between px-4 text-[10px] text-slate-500">
               <div className="flex gap-4">
                 <span>Enter 选择</span>
                 <span>↑↓ 导航</span>
                 <span>Esc 关闭</span>
               </div>
               <div>
                  索引更新于: 10 分钟前
               </div>
            </div>
          </div>
        )}
      </div>

      {/* --- Right Controls --- */}
      <div className="flex items-center gap-6 ml-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider hidden md:block">视角:</span>
          <select 
            value={currentPersona}
            onChange={(e) => setPersona(e.target.value as UserPersona)}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-md px-2 py-1.5 focus:ring-1 focus:ring-blue-500 focus:outline-none cursor-pointer"
          >
            <option value={UserPersona.DESIGNER}>设计师 (CAD/CAE)</option>
            <option value={UserPersona.ENGINEER}>工程师 (BOM/Mfg)</option>
            <option value={UserPersona.DEVELOPER}>开发者 (DevOps)</option>
          </select>
        </div>

        <button className="text-slate-400 hover:text-white transition-colors relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-slate-900 bg-red-500" />
        </button>
        <button className="text-slate-400 hover:text-white transition-colors">
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default TopBar;