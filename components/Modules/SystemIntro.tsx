
import React from 'react';
import { 
  Database, Cpu, Network, Layers, 
  ArrowRight, ShieldCheck, Zap, Box, 
  GitBranch, Workflow, Activity, Globe,
  CheckCircle2, Share2, Sparkles, Server,
  LayoutDashboard, Search, MessageSquare, Terminal, 
  PenTool, Wrench, BarChart3, Shuffle, Users
} from 'lucide-react';
import { AppLayer } from '../../types';

interface SystemIntroProps {
  setLayer: (layer: AppLayer) => void;
}

const ArchitectureCard = ({ 
  title, icon: Icon, color, children, onClick 
}: { 
  title: string; icon: any; color: string; children?: React.ReactNode; onClick?: () => void 
}) => (
  <div 
    onClick={onClick}
    className={`bg-slate-900/40 border border-slate-800 rounded-xl p-5 hover:bg-slate-900/60 hover:border-${color}-500/30 transition-all cursor-pointer group h-full flex flex-col`}
  >
    <div className={`text-${color}-400 flex items-center gap-2 mb-3 font-semibold`}>
      <Icon size={18} />
      <span className="group-hover:text-white transition-colors">{title}</span>
    </div>
    <div className="flex-1 text-sm text-slate-400 space-y-2">
      {children}
    </div>
    {onClick && (
      <div className={`mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-${color}-400 opacity-60 group-hover:opacity-100 transition-opacity`}>
        <span>进入模块</span>
        <ArrowRight size={12} />
      </div>
    )}
  </div>
);

const FeaturePoint = ({ label, desc }: { label: string; desc: string }) => (
  <div className="flex items-start gap-2">
    <div className="mt-1.5 w-1 h-1 rounded-full bg-slate-500"></div>
    <div>
      <span className="text-slate-300 font-medium">{label}: </span>
      <span className="text-slate-500">{desc}</span>
    </div>
  </div>
);

const SystemIntro: React.FC<SystemIntroProps> = ({ setLayer }) => {
  return (
    <div className="p-8 h-full overflow-y-auto bg-slate-950/50">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          PLM AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Nexus</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          新一代PLM智能平台架构概览
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-12 pb-20">
        
        {/* Layer 1: Portal (User Experience) */}
        <div className="flex items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <div className="hidden xl:block w-32 shrink-0 text-right">
             <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Layer 1</div>
             <div className="text-sm font-semibold text-blue-400">统一门户</div>
             <div className="text-[10px] text-slate-600">User Experience</div>
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
            <ArchitectureCard title="个性化工作台" icon={LayoutDashboard} color="blue" onClick={() => setLayer(AppLayer.HOME)}>
              <FeaturePoint label="设计师视图" desc="聚合 CAD/CAE 任务与仿真状态" />
              <FeaturePoint label="工程师视图" desc="Windchill ECN 与 BOM 变更待办" />
              <FeaturePoint label="开发者视图" desc="系统日志与代码工具入口" />
            </ArchitectureCard>
            <ArchitectureCard title="全局智能搜索" icon={Search} color="blue">
              <FeaturePoint label="语义检索" desc="自然语言理解 (NLP)" />
              <FeaturePoint label="跨域融合" desc="同时搜索图纸 PDF、物料属性与 ERP 库存" />
            </ArchitectureCard>
            <ArchitectureCard title="AI Copilot" icon={MessageSquare} color="blue">
              <FeaturePoint label="场景感知" desc="Sidekick 模式，根据当前页面主动辅助" />
              <FeaturePoint label="对话式操作" desc="通过指令自动发起变更流程" />
            </ArchitectureCard>
          </div>
        </div>

        {/* Arrow Connector */}
        <div className="flex justify-center opacity-20"><ArrowRight size={24} className="rotate-90" /></div>

        {/* Layer 2: Business Applications (Core Subsystems) */}
        <div className="flex items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <div className="hidden xl:block w-32 shrink-0 text-right">
             <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Layer 2</div>
             <div className="text-sm font-semibold text-purple-400">核心应用</div>
             <div className="text-[10px] text-slate-600">Business Apps</div>
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Design */}
            <div className="space-y-4">
               <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Design & Sim</div>
               <ArchitectureCard title="智能设计" icon={PenTool} color="purple" onClick={() => setLayer(AppLayer.DESIGN_SIMULATION)}>
                 <FeaturePoint label="需求工程" desc="AI 解析标书 PDF 拆解条目" />
                 <FeaturePoint label="实时仿真" desc="代理模型 (Surrogate) 秒级预测" />
                 <FeaturePoint label="自动报告" desc="一键生成 Word 分析报告" />
               </ArchitectureCard>
            </div>

            {/* Engineering */}
            <div className="space-y-4">
               <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Eng & Mfg</div>
               <ArchitectureCard title="工程与制造" icon={Wrench} color="emerald" onClick={() => setLayer(AppLayer.ENGINEERING_MFG)}>
                 <FeaturePoint label="智能 BOM" desc="查重选型与完整性审计" />
                 <FeaturePoint label="工艺规划" desc="几何特征识别推荐参数" />
                 <FeaturePoint label="智能变更" desc="ECN 影响范围自动分析" />
               </ArchitectureCard>
            </div>

            {/* Quality */}
            <div className="space-y-4">
               <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Quality & Service</div>
               <ArchitectureCard title="质量服务" icon={ShieldCheck} color="red" onClick={() => setLayer(AppLayer.QUALITY_DIAGNOSIS)}>
                 <FeaturePoint label="预测性质量" desc="仿真 vs 实测闭环校准" />
                 <FeaturePoint label="RAG 诊断" desc="检索历史故障库解决报错" />
                 <FeaturePoint label="VoC 分析" desc="售后反馈自动分类与推送" />
               </ArchitectureCard>
            </div>

            {/* Collaboration */}
            <div className="space-y-4">
               <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Collab & Decision</div>
               <ArchitectureCard title="协同决策" icon={Users} color="orange" onClick={() => setLayer(AppLayer.COLLABORATION_PROJECT)}>
                 <FeaturePoint label="智能协同" desc="AI 自动生成 WBS 计划" />
                 <FeaturePoint label="数字孪生" desc="企业级 BI 驾驶舱" />
                 <FeaturePoint label="自然语言 BI" desc="对话式生成报表图表" />
               </ArchitectureCard>
            </div>
          </div>
        </div>

        {/* Arrow Connector */}
        <div className="flex justify-center opacity-20"><ArrowRight size={24} className="rotate-90" /></div>

        {/* Layer 3: Foundation (Tech Stack) */}
        <div className="flex items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
           <div className="hidden xl:block w-32 shrink-0 text-right">
             <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Layer 3</div>
             <div className="text-sm font-semibold text-indigo-400">数字底座</div>
             <div className="text-[10px] text-slate-600">Foundation</div>
          </div>
          <div className="flex-1 bg-slate-900/30 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
             <ArchitectureCard title="数据湖与治理" icon={Database} color="indigo" onClick={() => setLayer(AppLayer.DATA_FOUNDATION)}>
               <FeaturePoint label="多模态 ETL" desc="解析 CAD/CAE/Doc 等异构数据" />
               <FeaturePoint label="数据治理" desc="自动清洗脏数据与补全属性" />
             </ArchitectureCard>
             
             <ArchitectureCard title="AI 模型工厂" icon={Cpu} color="indigo" onClick={() => setLayer(AppLayer.DATA_FOUNDATION)}>
               <FeaturePoint label="仿真代理" desc="训练降阶模型加速 CAE" />
               <FeaturePoint label="代码大模型" desc="StarCoder 微调生成 PLM 代码" />
               <FeaturePoint label="私有 LLM" desc="统一管理 Llama3/Qwen 接口" />
             </ArchitectureCard>

             <ArchitectureCard title="知识图谱中枢" icon={Share2} color="indigo" onClick={() => setLayer(AppLayer.DATA_FOUNDATION)}>
               <FeaturePoint label="全链路图谱" desc="建立 RFLP + 仿真结果关联" />
               <FeaturePoint label="语义网络" desc="支持复杂的工程推理查询" />
             </ArchitectureCard>
          </div>
        </div>

        {/* Side Layer: DevOps (Efficiency) */}
        <div className="mt-12 pt-12 border-t border-slate-800/50 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
          <div className="flex items-center gap-4 mb-6">
             <div className="bg-pink-500/10 p-2 rounded-lg text-pink-400"><Terminal size={20}/></div>
             <div>
                <h3 className="text-lg font-semibold text-white">实施与运维效能中心 (DevOps)</h3>
                <p className="text-xs text-slate-400">赋能 IT 团队与实施顾问的专用工具链</p>
             </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div onClick={() => setLayer(AppLayer.DEVOPS)} className="bg-slate-950 border border-slate-800 p-4 rounded-lg flex items-center gap-4 cursor-pointer hover:border-pink-500/30 transition-colors">
                <div className="text-pink-400"><Terminal size={20}/></div>
                <div>
                   <div className="font-medium text-slate-200 text-sm">代码生成器</div>
                   <div className="text-xs text-slate-500">Service, Action, Loader</div>
                </div>
             </div>
             <div onClick={() => setLayer(AppLayer.DEVOPS)} className="bg-slate-950 border border-slate-800 p-4 rounded-lg flex items-center gap-4 cursor-pointer hover:border-pink-500/30 transition-colors">
                <div className="text-pink-400"><CheckCircle2 size={20}/></div>
                <div>
                   <div className="font-medium text-slate-200 text-sm">自动化测试</div>
                   <div className="text-xs text-slate-500">生成测试用例与脚本</div>
                </div>
             </div>
             <div onClick={() => setLayer(AppLayer.DEVOPS)} className="bg-slate-950 border border-slate-800 p-4 rounded-lg flex items-center gap-4 cursor-pointer hover:border-pink-500/30 transition-colors">
                <div className="text-pink-400"><Shuffle size={20}/></div>
                <div>
                   <div className="font-medium text-slate-200 text-sm">数据迁移助手</div>
                   <div className="text-xs text-slate-500">自动映射旧系统规则</div>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SystemIntro;
