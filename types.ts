
export enum UserPersona {
  DESIGNER = 'DESIGNER',
  ENGINEER = 'ENGINEER',
  DEVELOPER = 'DEVELOPER'
}

export enum AppLayer {
  SYSTEM_INTRO = 'SYSTEM_INTRO',
  HOME = 'HOME', // Workbench
  DATA_FOUNDATION = 'DATA_FOUNDATION',
  DESIGN_SIMULATION = 'DESIGN_SIMULATION',
  ENGINEERING_MFG = 'ENGINEERING_MFG',
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
  
  COLLABORATION = 'COLLABORATION', // Deprecated main entry, kept for safe fallback
  DEVOPS = 'DEVOPS'
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
