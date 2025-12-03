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
    className={`bg-slate-900/40 border border-slate-800 rounded-xl p-5 lg:p-6 xl:p-8 hover:bg-slate-900/60 hover:border-${color}-500/30 transition-all cursor-pointer group h-full flex flex-col shadow-lg hover:shadow-${color}-500/10`}
  >
    <div className={`text-${color}-400 flex items-center gap-3 mb-4 font-semibold text-base lg:text-lg xl:text-xl`}>
      <Icon className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" />
      <span className="group-hover:text-white transition-colors">{title}</span>
    </div>
    <div className="flex-1 space-y-3">
      {children}
    </div>
    {onClick && (
      <div className={`mt-5 pt-4 border-t border-slate-800 flex justify-between items-center text-xs lg:text-sm xl:text-base text-${color}-400 opacity-60 group-hover:opacity-100 transition-opacity`}>
        <span>进入模块</span>
        <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4" />
      </div>
    )}
  </div>
);

const FeaturePoint = ({ label, desc }: { label: string; desc: string }) => (
  <div className="flex items-start gap-2.5">
    <div className="mt-1.5 lg:mt-2 w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0"></div>
    <div className="text-sm lg:text-base xl:text-lg leading-relaxed text-slate-300">
      <span className="font-medium text-slate-200">{label}: </span>
      <span className="text-slate-400">{desc}</span>
    </div>
  </div>
);

const LayerLabel = ({ layer, title, sub, color }: { layer: string, title: string, sub: string, color: string }) => (
  <div className="hidden xl:flex flex-col w-32 xl:w-48 shrink-0 text-right justify-center h-full pt-4">
     <div className="text-xs xl:text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Layer {layer}</div>
     <div className={`text-sm xl:text-xl font-bold text-${color}-400 mb-0.5`}>{title}</div>
     <div className="text-[10px] xl:text-sm text-slate-600 font-medium">{sub}</div>
  </div>
);

const SystemIntro: React.FC<SystemIntroProps> = ({ setLayer }) => {
  return (
    <div className="p-6 md:p-10 h-full overflow-y-auto bg-slate-950/50">
      
      {/* Header */}
      <div className="max-w-[90%] mx-auto text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700 pt-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 tracking-tight">
          PLM AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Nexus</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
          新一代 PLM 智能平台架构概览
        </p>
      </div>

      <div className="max-w-[95%] 2xl:max-w-[85%] mx-auto space-y-16 pb-32">
        
        {/* Layer 1: Portal (User Experience) */}
        <div className="flex items-stretch gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <LayerLabel layer="1" title="统一门户" sub="User Experience" color="blue" />
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
            <ArchitectureCard title="个性化工作台" icon={LayoutDashboard} color="blue" onClick={() => setLayer(AppLayer.HOME)}>
              <FeaturePoint label="设计师视图" desc="聚合 CAD/CAE 任务与仿真状态" />
              <FeaturePoint label="工程师视图" desc="Windchill ECN 与 BOM 变更待办" />
              <FeaturePoint label="开发者视图" desc="系统日志与代码工具入口" />
            </ArchitectureCard>
            <ArchitectureCard title="全局智能搜索" icon={Search} color="blue">
              <FeaturePoint label="语义检索" desc="自然语言理解 (NLP) 意图识别" />
              <FeaturePoint label="跨域融合" desc="同时搜索图纸 PDF、物料属性与 ERP 库存" />
            </ArchitectureCard>
            <ArchitectureCard title="AI Copilot" icon={MessageSquare} color="blue">
              <FeaturePoint label="场景感知" desc="Sidekick 模式，根据当前页面主动辅助" />
              <FeaturePoint label="对话式操作" desc="通过指令自动发起变更流程" />
            </ArchitectureCard>
          </div>
        </div>

        {/* Arrow Connector */}
        <div className="flex justify-center opacity-20"><ArrowRight className="w-6 h-6 lg:w-8 lg:h-8 rotate-90" /></div>

        {/* Layer 2: Business Applications (Core Subsystems) */}
        <div className="flex items-stretch gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <LayerLabel layer="2" title="核心应用" sub="Business Apps" color="purple" />

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            
            {/* Design */}
            <div className="space-y-4 flex flex-col">
               <div className="text-xs lg:text-sm font-semibold text-slate-500 uppercase tracking-wider text-center mb-2">Design & Sim</div>
               <div className="flex-1">
                 <ArchitectureCard title="智能设计" icon={PenTool} color="purple" onClick={() => setLayer(AppLayer.DESIGN_SIMULATION_CORE)}>
                   <FeaturePoint label="需求工程" desc="AI 解析标书 PDF 拆解条目" />
                   <FeaturePoint label="实时仿真" desc="代理模型 (Surrogate) 秒级预测" />
                   <FeaturePoint label="自动报告" desc="一键生成 Word 分析报告" />
                 </ArchitectureCard>
               </div>
            </div>

            {/* Engineering */}
            <div className="space-y-4 flex flex-col">
               <div className="text-xs lg:text-sm font-semibold text-slate-500 uppercase tracking-wider text-center mb-2">Eng & Mfg</div>
               <div className="flex-1">
                 <ArchitectureCard title="工程与制造" icon={Wrench} color="emerald" onClick={() => setLayer(AppLayer.ENGINEERING_BOM)}>
                   <FeaturePoint label="智能 BOM" desc="查重选型与完整性审计" />
                   <FeaturePoint label="工艺规划" desc="几何特征识别推荐参数" />
                   <FeaturePoint label="智能变更" desc="ECN 影响范围自动分析" />
                 </ArchitectureCard>
               </div>
            </div>

            {/* Quality */}
            <div className="space-y-4 flex flex-col">
               <div className="text-xs lg:text-sm font-semibold text-slate-500 uppercase tracking-wider text-center mb-2">Quality & Service</div>
               <div className="flex-1">
                 <ArchitectureCard title="质量服务" icon={ShieldCheck} color="red" onClick={() => setLayer(AppLayer.QUALITY_DIAGNOSIS)}>
                   <FeaturePoint label="预测性质量" desc="仿真 vs 实测闭环校准" />
                   <FeaturePoint label="RAG 诊断" desc="检索历史故障库解决报错" />
                   <FeaturePoint label="VoC 分析" desc="售后反馈自动分类与推送" />
                 </ArchitectureCard>
               </div>
            </div>

            {/* Collaboration */}
            <div className="space-y-4 flex flex-col">
               <div className="text-xs lg:text-sm font-semibold text-slate-500 uppercase tracking-wider text-center mb-2">Collab & Decision</div>
               <div className="flex-1">
                 <ArchitectureCard title="协同决策" icon={Users} color="orange" onClick={() => setLayer(AppLayer.COLLABORATION_PROJECT)}>
                   <FeaturePoint label="智能协同" desc="AI 自动生成 WBS 计划" />
                   <FeaturePoint label="数字孪生" desc="企业级 BI 驾驶舱" />
                   <FeaturePoint label="自然语言 BI" desc="对话式生成报表图表" />
                 </ArchitectureCard>
               </div>
            </div>
          </div>
        </div>

        {/* Arrow Connector */}
        <div className="flex justify-center opacity-20"><ArrowRight className="w-6 h-6 lg:w-8 lg:h-8 rotate-90" /></div>

        {/* Layer 3: Foundation (Tech Stack) */}
        <div className="flex items-stretch gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
           <LayerLabel layer="3" title="数字底座" sub="Foundation" color="indigo" />

          <div className="flex-1 bg-slate-900/30 border border-slate-800 rounded-2xl p-6 lg:p-8 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
             <ArchitectureCard title="数据湖与治理" icon={Database} color="indigo" onClick={() => setLayer(AppLayer.DATA_LAKE)}>
               <FeaturePoint label="多模态 ETL" desc="解析 CAD/CAE/Doc 等异构数据" />
               <FeaturePoint label="数据治理" desc="自动清洗脏数据与补全属性" />
             </ArchitectureCard>
             
             <ArchitectureCard title="AI 模型工厂" icon={Cpu} color="indigo" onClick={() => setLayer(AppLayer.DATA_MODELS)}>
               <FeaturePoint label="仿真代理" desc="训练降阶模型加速 CAE" />
               <FeaturePoint label="代码大模型" desc="StarCoder 微调生成 PLM 代码" />
               <FeaturePoint label="私有 LLM" desc="统一管理 Llama3/Qwen 接口" />
             </ArchitectureCard>

             <ArchitectureCard title="知识图谱中枢" icon={Share2} color="indigo" onClick={() => setLayer(AppLayer.DATA_GRAPH)}>
               <FeaturePoint label="全链路图谱" desc="建立 RFLP + 仿真结果关联" />
               <FeaturePoint label="语义网络" desc="支持复杂的工程推理查询" />
             </ArchitectureCard>
          </div>
        </div>

        {/* Side Layer: DevOps (Efficiency) */}
        <div className="mt-16 pt-16 border-t border-slate-800/50 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
          <div className="flex items-center gap-6 mb-8 justify-center lg:justify-start">
             <div className="bg-pink-500/10 p-3 lg:p-4 rounded-xl text-pink-400"><Terminal className="w-6 h-6 lg:w-8 lg:h-8"/></div>
             <div>
                <h3 className="text-xl lg:text-3xl font-semibold text-white">实施与运维效能中心 (DevOps)</h3>
                <p className="text-sm lg:text-lg text-slate-400 mt-1">赋能 IT 团队与实施顾问的专用工具链</p>
             </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
             <div onClick={() => setLayer(AppLayer.DEVOPS_CODEGEN)} className="bg-slate-950 border border-slate-800 p-6 lg:p-8 rounded-xl flex items-center gap-6 cursor-pointer hover:border-pink-500/30 transition-colors shadow-lg hover:shadow-pink-500/5 group">
                <div className="text-pink-400 p-2 bg-pink-500/10 rounded-lg group-hover:scale-110 transition-transform"><Terminal className="w-6 h-6 lg:w-8 lg:h-8"/></div>
                <div>
                   <div className="font-semibold text-slate-200 text-lg lg:text-xl">代码生成器</div>
                   <div className="text-sm lg:text-base text-slate-500 mt-1">Service, Action, Loader</div>
                </div>
             </div>
             <div onClick={() => setLayer(AppLayer.DEVOPS_TESTING)} className="bg-slate-950 border border-slate-800 p-6 lg:p-8 rounded-xl flex items-center gap-6 cursor-pointer hover:border-pink-500/30 transition-colors shadow-lg hover:shadow-pink-500/5 group">
                <div className="text-pink-400 p-2 bg-pink-500/10 rounded-lg group-hover:scale-110 transition-transform"><CheckCircle2 className="w-6 h-6 lg:w-8 lg:h-8"/></div>
                <div>
                   <div className="font-semibold text-slate-200 text-lg lg:text-xl">自动化测试</div>
                   <div className="text-sm lg:text-base text-slate-500 mt-1">生成测试用例与脚本</div>
                </div>
             </div>
             <div onClick={() => setLayer(AppLayer.DEVOPS_MIGRATION)} className="bg-slate-950 border border-slate-800 p-6 lg:p-8 rounded-xl flex items-center gap-6 cursor-pointer hover:border-pink-500/30 transition-colors shadow-lg hover:shadow-pink-500/5 group">
                <div className="text-pink-400 p-2 bg-pink-500/10 rounded-lg group-hover:scale-110 transition-transform"><Shuffle className="w-6 h-6 lg:w-8 lg:h-8"/></div>
                <div>
                   <div className="font-semibold text-slate-200 text-lg lg:text-xl">数据迁移助手</div>
                   <div className="text-sm lg:text-base text-slate-500 mt-1">自动映射旧系统规则</div>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SystemIntro;