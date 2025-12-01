
import { GoogleGenAI } from "@google/genai";
import { UserPersona, AppLayer } from "../types";

// Initialize the client
// API Key is assumed to be in process.env.API_KEY per instructions
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTIONS: Record<UserPersona, string> = {
  [UserPersona.DESIGNER]: "你是一位专家级的工业设计和仿真助手。你精通 CAD (NX, Catia)、CAE (Ansys, Abaqus) 和材料科学。请帮助用户优化几何形状，设置仿真边界条件，并解释应力/应变结果。请始终使用中文回答。",
  [UserPersona.ENGINEER]: "你是一位高级制造工程师副驾驶。你精通 Windchill PLM、BOM 管理、工艺规划和 ECN (工程变更通知) 工作流。请协助进行影响分析、BOM 完整性检查和成本估算。请始终使用中文回答。",
  [UserPersona.DEVELOPER]: "你是一位 DevOps 和 PLM 实施专家。你精通 Windchill 定制开发 (Java, JSP)、API 集成、系统日志分析和自动化测试脚本。请帮助编写高效的代码并调试系统错误。请始终使用中文回答。"
};

const LAYER_CONTEXT: Record<AppLayer, string> = {
  [AppLayer.SYSTEM_INTRO]: "用户正在查看系统的介绍和概览页面，展示了Nexus AI平台的整体架构，包括门户层、基础层、应用层等。",
  [AppLayer.HOME]: "用户正在个人工作台。",
  [AppLayer.DATA_FOUNDATION]: "用户正在数据湖与知识图谱模块。",
  [AppLayer.DESIGN_SIMULATION]: "用户正在设计与仿真 (CAD/CAE) 模块。",
  [AppLayer.ENGINEERING_MFG]: "用户正在工程、BOM 与制造模块。",
  [AppLayer.QUALITY_SERVICE]: "用户正在质量、预测性维护与服务模块。",
  [AppLayer.COLLABORATION]: "用户正在项目管理与 BI 决策模块。",
  [AppLayer.DEVOPS]: "用户正在 DevOps 与实施中心。",
};

export const generateAIResponse = async (
  prompt: string,
  persona: UserPersona,
  currentLayer: AppLayer,
  contextData?: string
): Promise<string> => {
  try {
    const systemInstruction = `
      ${SYSTEM_INSTRUCTIONS[persona]}
      当前上下文: ${LAYER_CONTEXT[currentLayer]}
      ${contextData ? `当前页面数据: ${contextData}` : ''}
      
      保持回答简洁、专业，并符合工业环境的技术准确性。
      如果需要，使用 Markdown 表格格式化复杂数据。
      请务必使用中文（简体）回答。
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "我处理了请求，但未收到文本输出。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "系统错误：无法连接到工业智能 Nexus 大脑。请检查您的网络或 API 配额。";
  }
};

export const analyzeBOMImpact = async (bomData: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `分析此 BOM 结构的潜在供应链风险，并在适用的情况下建议替代材料。请使用中文回答: ${bomData}`,
      config: {
        temperature: 0.2, // Lower temperature for analytical tasks
      }
    });
    return response.text || "分析失败。";
  } catch (error) {
    return "分析 BOM 数据时出错。";
  }
};
