import { 
  MOCK_USERS, 
  MOCK_PROJECTS, 
  MOCK_INVOICES, 
  MOCK_ACCOUNTS, 
  MOCK_CASH_FLOW 
} from '../mockData';
import { 
  User, 
  UserRole, 
  Project, 
  Invoice, 
  Account, 
  RiskAnalysis, 
  DashboardStats,
  CashFlowData
} from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const ApiService = {
  login: async (username: string): Promise<User> => {
    await delay(500);
    const user = MOCK_USERS.find(u => u.username === username);
    if (!user) throw new Error('Invalid credentials');
    return user;
  },

  getDashboardStats: async (): Promise<DashboardStats> => {
    await delay(300);
    const totalRevenue = MOCK_ACCOUNTS.find(a => a.type === 'Revenue')?.balance || 0;
    const activeProjects = MOCK_PROJECTS.filter(p => p.status === 'Active').length;
    const pendingInvoices = MOCK_INVOICES.filter(i => i.status === 'Pending').length;
    
    // Calculate high risk count on the fly
    const risks = await ApiService.getRiskAnalysis();
    const highRiskProjects = risks.filter(r => r.riskLevel === 'High' || r.riskLevel === 'Critical').length;

    return { totalRevenue, activeProjects, pendingInvoices, highRiskProjects };
  },

  getProjects: async (): Promise<Project[]> => {
    await delay(400);
    return [...MOCK_PROJECTS];
  },

  getInvoices: async (): Promise<Invoice[]> => {
    await delay(400);
    return [...MOCK_INVOICES];
  },

  getAccounts: async (): Promise<Account[]> => {
    await delay(300);
    return [...MOCK_ACCOUNTS];
  },

  getCashFlow: async (): Promise<CashFlowData[]> => {
    await delay(500);
    // Simulate forecast by adding a projected month
    const lastMonth = MOCK_CASH_FLOW[MOCK_CASH_FLOW.length - 1];
    const forecastMonth = {
      month: 'Nov (Est)',
      income: lastMonth.income * 1.05,
      expenses: lastMonth.expenses * 0.95
    };
    return [...MOCK_CASH_FLOW, forecastMonth];
  },

  // "AI" Logic Simulation
  getRiskAnalysis: async (): Promise<RiskAnalysis[]> => {
    await delay(600);
    return MOCK_PROJECTS.map(project => {
      let riskScore = 0;
      const factors: string[] = [];
      
      const budgetUsedPercent = (project.spent / project.budget) * 100;
      const budgetProgressDelta = budgetUsedPercent - project.progress;

      // Rule 1: Budget Overrun
      if (budgetUsedPercent > 100) {
        riskScore += 40;
        factors.push('Budget Exceeded');
      } else if (budgetProgressDelta > 20) {
        riskScore += 30;
        factors.push('Spending exceeds progress by >20%');
      }

      // Rule 2: Timeline (Simulated based on progress vs rigid ID logic for demo)
      if (project.progress < 50 && project.spent > project.budget * 0.7) {
        riskScore += 25;
        factors.push('Low progress with high spend');
      }

      // Determine Level
      let riskLevel: RiskAnalysis['riskLevel'] = 'Low';
      if (riskScore > 75) riskLevel = 'Critical';
      else if (riskScore > 50) riskLevel = 'High';
      else if (riskScore > 25) riskLevel = 'Medium';

      return {
        projectId: project.id,
        projectName: project.name,
        riskScore,
        riskLevel,
        factors
      };
    });
  },

  // Admin Logic
  getUsers: async (): Promise<User[]> => {
    await delay(300);
    return [...MOCK_USERS];
  },
  
  // Mock Invoice Creation
  createInvoice: async (invoice: Omit<Invoice, 'id'>): Promise<Invoice> => {
    await delay(400);
    const newInvoice = { ...invoice, id: Math.floor(Math.random() * 10000) };
    MOCK_INVOICES.push(newInvoice);
    return newInvoice;
  }
};
