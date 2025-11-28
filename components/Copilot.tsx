import React, { useState, useRef, useEffect } from 'react';
import { UserPersona, AppLayer, ChatMessage } from '../types';
import { generateAIResponse } from '../services/geminiService';
import { 
  Sparkles, Send, X, Bot, User, Maximize2, Minimize2, Mic, 
  Box, FileText, AlertTriangle, ArrowRight, GitPullRequest,
  CheckCircle2, Search, Zap, Loader2, Workflow
} from 'lucide-react';

interface CopilotProps {
  currentPersona: UserPersona;
  currentLayer: AppLayer;
}

// --- Mock Context Data Configuration ---
const CONTEXT_CONFIG: Record<AppLayer, { title: string; type: string; id: string; risk?: string }> = {
  [AppLayer.HOME]: { title: '个人工作台', type: 'Dashboard', id: 'DASH-001' },
  [AppLayer.DESIGN_SIMULATION]: { title: '高压涡轮叶片总成', type: 'CAD Model', id: 'ASM-2024-X', risk: 'Detected High Stress' },
  [AppLayer.ENGINEERING_MFG]: { title: 'ECN-2024-055 (材料变更)', type: 'Change Notice', id: 'ECN-55' },
  [AppLayer.DATA_FOUNDATION]: { title: '钛合金 Ti-6Al-4V', type: 'Material Data', id: 'MAT-88' },
  [AppLayer.QUALITY_SERVICE]: { title: '叶根裂纹分析报告', type: 'Quality Issue', id: 'QI-992' },
  [AppLayer.COLLABORATION]: { title: 'Q4 交付项目计划', type: 'Project', id: 'PRJ-2024-Q4' },
  [AppLayer.DEVOPS]: { title: 'Windchill Connector Logs', type: 'System Log', id: 'LOG-500' },
};

const SUGGESTIONS: Record<AppLayer, string[]> = {
  [AppLayer.HOME]: ['总结今天的待办事项', '查看系统健康状态'],
  [AppLayer.DESIGN_SIMULATION]: ['运行结构强度仿真', '检查几何干涉', '优化网格质量'],
  [AppLayer.ENGINEERING_MFG]: ['分析变更成本影响', '查找受影响的 BOM', '生成合规性报告'],
  [AppLayer.DATA_FOUNDATION]: ['查找相似材料', '显示引用关系'],
  [AppLayer.QUALITY_SERVICE]: ['根本原因分析 (RCA)', '搜索类似历史故障'],
  [AppLayer.COLLABORATION]: ['更新项目进度', '发送会议纪要'],
  [AppLayer.DEVOPS]: ['解释错误日志', '生成 API 测试脚本'],
};

const Copilot: React.FC<CopilotProps> = ({ currentPersona, currentLayer }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Active Context
  const activeContext = CONTEXT_CONFIG[currentLayer] || CONTEXT_CONFIG[AppLayer.HOME];

  // Initialize Welcome Message with Proactive Intelligence
  useEffect(() => {
    const welcomeMsg: ChatMessage = {
      id: `welcome-${Date.now()}`,
      role: 'model',
      text: `您好，我是您的智能助手。我已连接到 **${activeContext.title}** (${activeContext.id})。`,
      timestamp: new Date(),
      actionType: activeContext.risk ? 'ALERT' : undefined,
      actionData: activeContext.risk ? { title: '风险预警', desc: '检测到模型最大应力接近屈服极限，建议进行拓扑优化。' } : undefined
    };
    setMessages([welcomeMsg]);
  }, [currentLayer, activeContext]); // Re-run when layer changes

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleVoiceInput = () => {
    if (isRecording) {
      setIsRecording(false);
      // Simulate voice to text
      setInput(prev => prev + " 把材质更改为铝合金并分析影响");
    } else {
      setIsRecording(true);
      // In a real app, integrate Web Speech API here
      setTimeout(() => {
         setIsRecording(false);
         setInput("把这个部件的材质更改为铝合金 7075...");
      }, 2000);
    }
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // --- Intent Recognition & Action Simulation (Demo Logic) ---
    // In a real system, Gemini would return Function Calls.
    let simulatedAction: ChatMessage | null = null;
    let contextPromptAddon = "";

    const lowerInput = textToSend.toLowerCase();

    if (lowerInput.includes('change') || lowerInput.includes('材质') || lowerInput.includes('更改')) {
      simulatedAction = {
        id: `act-${Date.now()}`,
        role: 'model',
        text: '正在执行变更模拟...',
        timestamp: new Date(),
        actionType: 'CHANGE_REQ',
        actionData: { 
          target: activeContext.title, 
          change: 'Material -> Aluminum 7075',
          status: 'Drafting ECN...'
        }
      };
      contextPromptAddon = "User wants to change material. Confirm the action and explain the implications on stress analysis.";
    } else if (lowerInput.includes('issue') || lowerInput.includes('质量') || lowerInput.includes('问题')) {
       simulatedAction = {
        id: `act-${Date.now()}`,
        role: 'model',
        text: '正在搜索关联质量记录...',
        timestamp: new Date(),
        actionType: 'SEARCH_RESULT',
        actionData: { 
          count: 3, 
          topItem: 'QI-2023-001: Blade Root Crack'
        }
      };
      contextPromptAddon = "User is looking for quality issues. Summarize the provided search result mock data.";
    }

    // Delay slighty to show "Processing" state before action card appears
    if (simulatedAction) {
       setTimeout(() => {
         setMessages(prev => [...prev, simulatedAction!]);
       }, 600);
    }

    try {
      const fullContext = `Active Object: ${activeContext.title} (${activeContext.type}). ID: ${activeContext.id}. ${contextPromptAddon}`;
      const responseText = await generateAIResponse(textToSend, currentPersona, currentLayer, fullContext);
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // --- Render Action Cards ---
  const renderActionCard = (msg: ChatMessage) => {
    if (!msg.actionType) return null;

    switch (msg.actionType) {
      case 'CHANGE_REQ':
        return (
          <div className="mt-2 bg-slate-800 border border-slate-700 rounded-lg p-3 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center gap-2 text-blue-400 mb-2 font-medium text-xs uppercase tracking-wider">
               <Workflow size={14} /> 自动执行: 变更流程
            </div>
            <div className="bg-slate-900/50 rounded p-2 text-sm text-slate-300 mb-2 font-mono">
               <div className="flex justify-between"><span>对象:</span> <span className="text-white">{msg.actionData.target}</span></div>
               <div className="flex justify-between"><span>操作:</span> <span className="text-emerald-400">{msg.actionData.change}</span></div>
            </div>
            <div className="flex items-center justify-between text-xs">
               <span className="flex items-center gap-1 text-slate-500"><Loader2 size={12} className="animate-spin"/> {msg.actionData.status}</span>
               <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded transition-colors">
                  确认并跳转
               </button>
            </div>
          </div>
        );
      case 'SEARCH_RESULT':
        return (
           <div className="mt-2 bg-slate-800 border border-slate-700 rounded-lg p-3">
              <div className="flex items-center gap-2 text-purple-400 mb-2 font-medium text-xs uppercase tracking-wider">
                 <Search size={14} /> 知识聚合
              </div>
              <div className="text-sm text-slate-300 mb-2">
                 发现 {msg.actionData.count} 条相关记录。最相关:
              </div>
              <div className="bg-slate-900/50 border-l-2 border-red-500 p-2 text-xs text-slate-300">
                 {msg.actionData.topItem}
              </div>
              <button className="w-full mt-2 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded transition-colors">
                 查看全部
              </button>
           </div>
        );
      case 'ALERT':
        return (
          <div className="mt-2 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
             <div className="flex items-center gap-2 text-amber-400 mb-1 font-medium text-sm">
                <AlertTriangle size={16} /> {msg.actionData.title}
             </div>
             <p className="text-xs text-slate-300 leading-relaxed">
                {msg.actionData.desc}
             </p>
             <div className="mt-2 flex gap-2">
                <button className="text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-2 py-1 rounded transition-colors">
                   执行检查
                </button>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 bg-blue-600 hover:bg-blue-500 rounded-full shadow-lg shadow-blue-500/40 flex items-center justify-center text-white transition-transform hover:scale-105 z-50 group"
      >
        <Sparkles className="h-6 w-6 group-hover:animate-pulse" />
      </button>
    );
  }

  return (
    <div className="fixed top-16 right-0 bottom-0 w-96 bg-slate-900/95 backdrop-blur-xl border-l border-slate-700 shadow-2xl z-40 flex flex-col transition-all duration-300 transform translate-x-0">
      {/* Header with Context Awareness */}
      <div className="flex-none bg-slate-900/50 border-b border-slate-800">
         <div className="h-14 flex items-center justify-between px-4">
           <div className="flex items-center gap-2 text-blue-400">
             <Sparkles className="h-4 w-4" />
             <span className="font-semibold text-sm tracking-wide">Nexus Copilot</span>
           </div>
           <div className="flex items-center gap-2">
              <button onClick={() => setIsOpen(false)} className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800">
               <Minimize2 className="h-4 w-4" />
             </button>
           </div>
         </div>
         {/* Context Pill */}
         <div className="px-4 pb-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-800 rounded-lg border border-slate-700/50 shadow-sm">
               <Box size={14} className="text-indigo-400 flex-shrink-0" />
               <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">当前上下文</div>
                  <div className="text-xs text-slate-200 truncate font-medium" title={activeContext.title}>
                     {activeContext.title} <span className="opacity-50">({activeContext.id})</span>
                  </div>
               </div>
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
         </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
              msg.role === 'model' ? 'bg-indigo-600' : 'bg-slate-700'
            }`}>
              {msg.role === 'model' ? <Bot size={16} className="text-white" /> : <User size={16} className="text-slate-300" />}
            </div>
            <div className={`max-w-[85%] space-y-1`}>
               {/* Main Text Bubble */}
               {msg.text && (
                 <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                   msg.role === 'user' 
                     ? 'bg-blue-600 text-white rounded-br-none' 
                     : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-none'
                 }`}>
                   <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                 </div>
               )}
               
               {/* Action / Tool Output Cards */}
               {renderActionCard(msg)}
               
               <div className={`text-[10px] opacity-40 px-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                 {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
               </div>
            </div>
          </div>
        ))}
        {isLoading && (
           <div className="flex gap-3 animate-pulse">
             <div className="w-8 h-8 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center">
               <Bot size={16} className="text-white" />
             </div>
             <div className="bg-slate-800 border border-slate-700 px-4 py-3 rounded-2xl rounded-bl-none">
               <div className="flex space-x-1">
                 <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                 <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                 <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
               </div>
             </div>
           </div>
        )}
        
        {/* Empty State Suggestions */}
        {messages.length === 1 && (
           <div className="pl-11 pr-4">
              <div className="text-[10px] text-slate-500 mb-2 uppercase tracking-wide font-semibold">建议操作</div>
              <div className="flex flex-wrap gap-2">
                 {(SUGGESTIONS[currentLayer] || []).map((sug, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleSend(sug)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500/50 rounded-full text-xs text-slate-300 transition-all text-left"
                    >
                       {sug}
                    </button>
                 ))}
              </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-800 bg-slate-900">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入指令 (如: '把材质改为铝合金' )..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none h-14 scrollbar-hide"
          />
          <div className="absolute right-2 top-2 flex items-center gap-1">
             <button
               onClick={handleVoiceInput}
               className={`p-2 rounded-lg transition-colors ${
                 isRecording ? 'bg-red-500 text-white animate-pulse' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
               }`}
               title="语音输入 (模拟)"
             >
               <Mic size={16} />
             </button>
             <button 
               onClick={() => handleSend()}
               disabled={isLoading || !input.trim()}
               className="p-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
             >
               <Send size={16} />
             </button>
          </div>
        </div>
        <div className="mt-2 flex justify-center text-[10px] text-slate-500 gap-4">
            <span className="flex items-center gap-1"><Zap size={10}/> 实时上下文</span>
            <span className="flex items-center gap-1"><Workflow size={10}/> 自动执行</span>
        </div>
      </div>
    </div>
  );
};

export default Copilot;