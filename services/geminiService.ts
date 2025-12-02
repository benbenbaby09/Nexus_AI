
import { GoogleGenAI, Type } from "@google/genai";
import { UserPersona, AppLayer } from "../types";

// Initialize the client
// API Key is assumed to be in process.env.API_KEY per instructions
const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) ? process.env.API_KEY : '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTIONS: Record<UserPersona, string> = {
  [UserPersona.DESIGNER]: "你是一位专家级的工业设计和仿真助手。你精通 CAD (NX, Catia)、CAE (Ansys, Abaqus) 和材料科学。请帮助用户优化几何形状，设置仿真边界条件，并解释应力/应变结果。请始终使用中文回答。",
  [UserPersona.ENGINEER]: "你是一位高级制造工程师副驾驶。你精通 Windchill PLM、BOM 管理、工艺规划和 ECN (工程变更通知) 工作流。请协助进行影响分析、BOM 完整性检查和成本估算。请始终使用中文回答。",
  [UserPersona.DEVELOPER]: "你是一位 DevOps 和 PLM 实施专家。你精通 Windchill 定制开发 (Java, JSP)、API 集成、系统日志分析和自动化测试脚本。请帮助编写高效的代码并调试系统错误。请始终使用中文回答。"
};

const LAYER_CONTEXT: Record<AppLayer, string> = {
  [AppLayer.SYSTEM_INTRO]: "用户正在查看系统的介绍和概览页面，展示了Nexus AI平台的整体架构。",
  [AppLayer.HOME]: "用户正在个人工作台。",
  
  // Data Foundation
  [AppLayer.DATA_LAKE]: "用户正在数据湖与治理模块，查看异构数据源连接状态和 ETL 管道。",
  [AppLayer.DATA_MODELS]: "用户正在 AI 模型工厂，管理私有模型训练任务。",
  [AppLayer.DATA_GRAPH]: "用户正在 PLM 知识图谱模块，进行 RFLP 关联分析。",
  [AppLayer.DATA_FOUNDATION]: "用户正在数据基础层。",

  // Design
  [AppLayer.DESIGN_REQUIREMENTS]: "用户正在智能需求工程模块，解析标书和需求文档。",
  [AppLayer.DESIGN_SIMULATION_CORE]: "用户正在设计与仿真模块，使用代理模型进行快速分析。",
  [AppLayer.DESIGN_BLENDER]: "用户正在 Blender Studio，进行 3D 渲染和评审。",
  [AppLayer.DESIGN_IMG23D]: "用户正在图生 3D 模块，从草图生成三维模型。",
  [AppLayer.DESIGN_SIMULATION]: "用户正在设计与仿真中心。",

  // Engineering
  [AppLayer.ENGINEERING_BOM]: "用户正在智能 BOM 管理模块，查看 EBOM 结构和进行完整性审计。",
  [AppLayer.ENGINEERING_PROCESS]: "用户正在智能工艺规划模块，生成加工特征和路线。",
  [AppLayer.ENGINEERING_CHANGE]: "用户正在变更管理模块，分析 ECN 影响范围。",
  [AppLayer.ENGINEERING_MFG]: "用户正在工程与制造中心。",
  
  // Quality
  [AppLayer.QUALITY_PREDICTIVE]: "用户正在查看预测性质量概览（数字孪生）。",
  [AppLayer.QUALITY_DIAGNOSIS]: "用户正在使用 RAG 智能诊断工具。",
  [AppLayer.QUALITY_VOC]: "用户正在分析客户声音 (VoC) 反馈。",
  [AppLayer.QUALITY_FORMAT]: "用户正在使用格式合规卫士检查文档。",
  [AppLayer.QUALITY_DOCS]: "用户正在浏览质量文档中心。",

  // Collaboration
  [AppLayer.COLLABORATION_PROJECT]: "用户正在智能项目协同模块，查看甘特图和任务 WBS。",
  [AppLayer.COLLABORATION_BI]: "用户正在企业数字孪生 BI 模块，使用自然语言查询运营指标。",
  [AppLayer.COLLABORATION_SIMULATION]: "用户正在决策沙盘 (What-If) 模块，推演供应链风险。",
  [AppLayer.COLLABORATION]: "用户正在协同与决策模块。",

  // DevOps
  [AppLayer.DEVOPS_CODEGEN]: "用户正在代码生成器模块，生成 Windchill 二次开发代码。",
  [AppLayer.DEVOPS_TESTING]: "用户正在自动化测试模块，生成测试用例。",
  [AppLayer.DEVOPS_MIGRATION]: "用户正在数据迁移助手模块，进行数据映射。",
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

export const reviewQMSDocument = async (
  docContent: string,
  mimeType: 'text/plain' | 'application/pdf'
): Promise<any[]> => {
  try {
    const parts: any[] = [];
    if (mimeType === 'application/pdf') {
      parts.push({ inlineData: { mimeType: mimeType, data: docContent } });
      parts.push({ text: "作为 ISO 9001 质量体系审核专家，请审核此 PDF 文档。找出不符合标准、表述模糊（如'足够'、'适当'等词）或语法错误的地方。请以 JSON 格式返回列表。" });
    } else {
      parts.push({ text: `作为 ISO 9001 质量体系审核专家，请审核以下文档内容。找出不符合标准、表述模糊或语法错误的地方:\n\n${docContent}` });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { 
                type: Type.STRING, 
                enum: ['compliance', 'ambiguity', 'grammar', 'formatting'],
                description: "Issue category"
              },
              text: { type: Type.STRING },
              suggestion: { type: Type.STRING }
            },
            required: ['type', 'text', 'suggestion']
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return [];
  } catch (error) {
    console.error("AI Review Error:", error);
    return [{ type: 'error', text: 'AI 服务暂时不可用', suggestion: '请检查网络连接或 API Key 配额。' }];
  }
};

export const chatWithDocument = async (
  message: string,
  docContent: string,
  mimeType: 'text/plain' | 'application/pdf'
): Promise<string> => {
  try {
    const parts: any[] = [];
    
    // Add Document Context
    if (mimeType === 'application/pdf') {
      parts.push({ inlineData: { mimeType: mimeType, data: docContent } });
      parts.push({ text: "Here is the PDF document content for context." });
    } else {
      parts.push({ text: `Document Content:\n${docContent}\n\n` });
    }

    // Add User Question
    parts.push({ text: message });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts },
      config: {
        systemInstruction: "你是一位专业的质量文档助手。请根据提供的文档内容回答用户的问题。如果问题超出文档范围，请说明。请使用中文回答，保持专业和简洁。",
        temperature: 0.5,
      }
    });

    return response.text || "无法生成回复。";
  } catch (error) {
    console.error("Doc Chat Error:", error);
    return "与文档对话时发生错误，请稍后重试。";
  }
};
