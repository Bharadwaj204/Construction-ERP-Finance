import { Project, Invoice, Account, User, UserRole, CashFlowData } from './types';

export const MOCK_USERS: User[] = [
  { id: 1, username: 'admin', role: UserRole.ADMIN, avatarUrl: 'https://picsum.photos/200/200' },
  { id: 2, username: 'finance', role: UserRole.FINANCE_MANAGER, avatarUrl: 'https://picsum.photos/201/201' },
  { id: 3, username: 'pm', role: UserRole.PROJECT_MANAGER, avatarUrl: 'https://picsum.photos/202/202' },
];

export const MOCK_PROJECTS: Project[] = [
  { id: 1, name: 'Skyline Tower', budget: 5000000, spent: 4200000, progress: 60, status: 'Active', startDate: '2023-01-01', endDate: '2024-12-31' },
  { id: 2, name: 'River Bridge', budget: 1200000, spent: 300000, progress: 25, status: 'Active', startDate: '2023-06-01', endDate: '2024-06-01' },
  { id: 3, name: 'Downtown Mall', budget: 8500000, spent: 8600000, progress: 95, status: 'Active', startDate: '2022-01-01', endDate: '2023-12-31' },
  { id: 4, name: 'Suburb Housing', budget: 2000000, spent: 150000, progress: 10, status: 'On Hold', startDate: '2024-01-01', endDate: '2025-06-30' },
];

export const MOCK_INVOICES: Invoice[] = [
  { id: 101, invoiceNumber: 'INV-001', projectId: 1, vendorName: 'Steel Corp', amount: 50000, status: 'Paid', dueDate: '2023-10-01', currency: 'USD' },
  { id: 102, invoiceNumber: 'INV-002', projectId: 1, vendorName: 'Cement Bros', amount: 12000, status: 'Pending', dueDate: '2023-11-15', currency: 'USD' },
  { id: 103, invoiceNumber: 'INV-003', projectId: 3, vendorName: 'Glass Works', amount: 35000, status: 'Overdue', dueDate: '2023-09-30', currency: 'USD' },
  { id: 104, invoiceNumber: 'INV-004', projectId: 2, vendorName: 'Earth Movers', amount: 8000, status: 'Pending', dueDate: '2023-11-20', currency: 'USD' },
];

export const MOCK_ACCOUNTS: Account[] = [
  { id: 1, code: '1000', name: 'Cash', type: 'Asset', balance: 1500000 },
  { id: 2, code: '1200', name: 'Accounts Receivable', type: 'Asset', balance: 340000 },
  { id: 3, code: '2000', name: 'Accounts Payable', type: 'Liability', balance: 120000 },
  { id: 4, code: '4000', name: 'Construction Revenue', type: 'Revenue', balance: 8500000 },
  { id: 5, code: '5000', name: 'Material Expenses', type: 'Expense', balance: 4200000 },
];

export const MOCK_CASH_FLOW: CashFlowData[] = [
  { month: 'May', income: 400000, expenses: 320000 },
  { month: 'Jun', income: 300000, expenses: 450000 },
  { month: 'Jul', income: 550000, expenses: 300000 },
  { month: 'Aug', income: 450000, expenses: 380000 },
  { month: 'Sep', income: 600000, expenses: 400000 },
  { month: 'Oct', income: 700000, expenses: 420000 },
];
