export enum UserRole {
  ADMIN = 'Admin',
  FINANCE_MANAGER = 'Finance Manager',
  PROJECT_MANAGER = 'Project Manager',
}

export interface User {
  id: number;
  username: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Project {
  id: number;
  name: string;
  budget: number;
  spent: number;
  progress: number; // Percentage 0-100
  status: 'Active' | 'Completed' | 'On Hold';
  startDate: string;
  endDate: string;
}

export interface Invoice {
  id: number;
  invoiceNumber: string;
  projectId: number;
  vendorName: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  dueDate: string;
  currency: string;
}

export interface Account {
  id: number;
  code: string;
  name: string;
  type: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';
  balance: number;
}

export interface RiskAnalysis {
  projectId: number;
  projectName: string;
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  factors: string[];
}

export interface CashFlowData {
  month: string;
  income: number;
  expenses: number;
}

export interface DashboardStats {
  totalRevenue: number;
  activeProjects: number;
  pendingInvoices: number;
  highRiskProjects: number;
}
