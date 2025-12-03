
export enum UserPersona {
  DESIGNER = 'DESIGNER',
  ENGINEER = 'ENGINEER',
  DEVELOPER = 'DEVELOPER'
}

export enum AppLayer {
  SYSTEM_INTRO = 'SYSTEM_INTRO',
  HOME = 'HOME', // Workbench
  
  // Data Foundation Sub-layers
  DATA_LAKE = 'DATA_LAKE',
  DATA_MODELS = 'DATA_MODELS',
  DATA_GRAPH = 'DATA_GRAPH',
  DATA_FOUNDATION = 'DATA_FOUNDATION', // Fallback/Group

  // Design & Simulation Sub-layers
  DESIGN_REQUIREMENTS = 'DESIGN_REQUIREMENTS',
  DESIGN_SIMULATION_CORE = 'DESIGN_SIMULATION_CORE',
  DESIGN_BLENDER = 'DESIGN_BLENDER',
  DESIGN_IMG23D = 'DESIGN_IMG23D',
  DESIGN_COMPARE = 'DESIGN_COMPARE', // New Layer
  DESIGN_SIMULATION = 'DESIGN_SIMULATION', // Fallback/Group

  // Engineering & Mfg Sub-layers
  ENGINEERING_BOM = 'ENGINEERING_BOM',
  ENGINEERING_PROCESS = 'ENGINEERING_PROCESS',
  ENGINEERING_CHANGE = 'ENGINEERING_CHANGE',
  ENGINEERING_MFG = 'ENGINEERING_MFG', // Fallback/Group

  // Quality Sub-layers
  QUALITY_DIAGNOSIS = 'QUALITY_DIAGNOSIS', // Intelligent Diagnosis (1st)
  QUALITY_VOC = 'QUALITY_VOC',             // Voice of Customer
  QUALITY_FORMAT = 'QUALITY_FORMAT',       // Compliance Guardian
  QUALITY_PREDICTIVE = 'QUALITY_PREDICTIVE', // Digital Twin / Overview
  QUALITY_DOCS = 'QUALITY_DOCS',           // Document Center
  
  // Collaboration Sub-layers
  COLLABORATION_PROJECT = 'COLLABORATION_PROJECT', // Smart Project Synergy
  COLLABORATION_BI = 'COLLABORATION_BI',           // Enterprise Digital Twin (BI)
  COLLABORATION_SIMULATION = 'COLLABORATION_SIMULATION', // Decision Sandbox (What-If)
  COLLABORATION = 'COLLABORATION', // Fallback/Group

  // DevOps Sub-layers
  DEVOPS_CODEGEN = 'DEVOPS_CODEGEN',
  DEVOPS_TESTING = 'DEVOPS_TESTING',
  DEVOPS_MIGRATION = 'DEVOPS_MIGRATION',
  DEVOPS = 'DEVOPS' // Fallback/Group
}

export interface Task {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Completed';
  type: 'CAD' | 'CAE' | 'ECN' | 'CODE' | 'ALERT';
  dueDate: string;
}

export interface ChartData {
  name: string;
  value: number;
  secondary?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
  actionType?: 'CHANGE_REQ' | 'SEARCH_RESULT' | 'COMPARISON' | 'ALERT';
  actionData?: any;
}
