export enum UserPersona {
  DESIGNER = 'DESIGNER',
  ENGINEER = 'ENGINEER',
  DEVELOPER = 'DEVELOPER'
}

export enum AppLayer {
  HOME = 'HOME', // Workbench
  DATA_FOUNDATION = 'DATA_FOUNDATION',
  DESIGN_SIMULATION = 'DESIGN_SIMULATION',
  ENGINEERING_MFG = 'ENGINEERING_MFG',
  QUALITY_SERVICE = 'QUALITY_SERVICE',
  COLLABORATION = 'COLLABORATION',
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