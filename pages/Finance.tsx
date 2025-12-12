import React, { useState, useEffect } from 'react';
import { ApiService } from '../services/api';
import { Invoice, Account } from '../types';
import { Plus, Download, Filter } from 'lucide-react';

const Finance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'invoices' | 'accounts'>('invoices');
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // New Invoice Form State
  const [newInv, setNewInv] = useState({
    invoiceNumber: '',
    vendorName: '',
    amount: '',
    projectId: '1'
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [invData, accData] = await Promise.all([
          ApiService.getInvoices(),
          ApiService.getAccounts()
        ]);
        setInvoices(invData);
        setAccounts(accData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInv.amount || !newInv.vendorName) return;

    try {
      const created = await ApiService.createInvoice({
        invoiceNumber: newInv.invoiceNumber || `INV-${Date.now()}`,
        vendorName: newInv.vendorName,
        amount: parseFloat(newInv.amount),
        projectId: parseInt(newInv.projectId),
        status: 'Pending',
        dueDate: new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0],
        currency: 'USD'
      });
      setInvoices([...invoices, created]);
      setIsModalOpen(false);
      setNewInv({ invoiceNumber: '', vendorName: '', amount: '', projectId: '1' });
    } catch (e) {
      alert('Failed to create invoice');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Financial Management</h1>
          <p className="text-slate-500 text-sm">General Ledger & Accounts Payable/Receivable</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            <span>New Invoice</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('invoices')}
            className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'invoices' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Invoices (AP/AR)
          </button>
          <button
            onClick={() => setActiveTab('accounts')}
            className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'accounts' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Chart of Accounts
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading financial data...</div>
        ) : activeTab === 'invoices' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold">Invoice #</th>
                  <th className="px-6 py-4 font-semibold">Vendor</th>
                  <th className="px-6 py-4 font-semibold">Project ID</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Due Date</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{inv.invoiceNumber}</td>
                    <td className="px-6 py-4 text-slate-600">{inv.vendorName}</td>
                    <td className="px-6 py-4 text-slate-500">{inv.projectId}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: inv.currency }).format(inv.amount)}
                    </td>
                    <td className="px-6 py-4 text-slate-500">{inv.dueDate}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        inv.status === 'Paid' ? 'bg-green-100 text-green-800' :
                        inv.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold">Code</th>
                  <th className="px-6 py-4 font-semibold">Account Name</th>
                  <th className="px-6 py-4 font-semibold">Type</th>
                  <th className="px-6 py-4 font-semibold text-right">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {accounts.map((acc) => (
                  <tr key={acc.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-mono text-slate-500">{acc.code}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{acc.name}</td>
                    <td className="px-6 py-4 text-slate-600">{acc.type}</td>
                    <td className="px-6 py-4 font-medium text-slate-900 text-right">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(acc.balance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Create New Invoice</h2>
            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Vendor Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={newInv.vendorName}
                  onChange={(e) => setNewInv({...newInv, vendorName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Amount</label>
                <input 
                  required
                  type="number" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={newInv.amount}
                  onChange={(e) => setNewInv({...newInv, amount: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Project ID</label>
                <select 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={newInv.projectId}
                  onChange={(e) => setNewInv({...newInv, projectId: e.target.value})}
                >
                  <option value="1">Skyline Tower (ID: 1)</option>
                  <option value="2">River Bridge (ID: 2)</option>
                  <option value="3">Downtown Mall (ID: 3)</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 px-4 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Finance;
