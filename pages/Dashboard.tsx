import React, { useEffect, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  AlertTriangle, 
  Briefcase, 
  FileText 
} from 'lucide-react';
import { ApiService } from '../services/api';
import { DashboardStats, RiskAnalysis, CashFlowData } from '../types';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [risks, setRisks] = useState<RiskAnalysis[]>([]);
  const [cashFlow, setCashFlow] = useState<CashFlowData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, riskData, flowData] = await Promise.all([
          ApiService.getDashboardStats(),
          ApiService.getRiskAnalysis(),
          ApiService.getCashFlow()
        ]);
        setStats(statsData);
        setRisks(riskData);
        setCashFlow(flowData);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-slate-500">Loading Dashboard...</div>;
  }

  const StatCard = ({ title, value, icon: Icon, color }: { title: string, value: string | number, icon: any, color: string }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-500 text-sm font-medium uppercase">{title}</h3>
        <div className={`p-2 rounded-lg ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
          <Icon size={20} className={color.replace('bg-', 'text-')} />
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Executive Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1 sm:mt-0">Real-time construction insights</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`$${(stats?.totalRevenue || 0).toLocaleString()}`} 
          icon={TrendingUp} 
          color="bg-green-100 text-green-600" 
        />
        <StatCard 
          title="Active Projects" 
          value={stats?.activeProjects || 0} 
          icon={Briefcase} 
          color="bg-blue-100 text-blue-600" 
        />
        <StatCard 
          title="Pending Invoices" 
          value={stats?.pendingInvoices || 0} 
          icon={FileText} 
          color="bg-orange-100 text-orange-600" 
        />
        <StatCard 
          title="High Risk Projects" 
          value={stats?.highRiskProjects || 0} 
          icon={AlertTriangle} 
          color="bg-red-100 text-red-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cash Flow Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-lg text-slate-800 mb-6">Cash Flow Forecast</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cashFlow}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Legend />
                <Line type="monotone" dataKey="income" name="Income" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Risk Insights */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-slate-800">AI Risk Analysis</h3>
            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded">AI Powered</span>
          </div>
          
          <div className="space-y-4">
            {risks.map((risk) => (
              <div key={risk.projectId} className="p-4 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-slate-800">{risk.projectName}</h4>
                    <p className="text-xs text-slate-500">Risk Score: {risk.riskScore}/100</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    risk.riskLevel === 'Critical' ? 'bg-red-100 text-red-700' :
                    risk.riskLevel === 'High' ? 'bg-orange-100 text-orange-700' :
                    risk.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {risk.riskLevel}
                  </span>
                </div>
                {risk.factors.length > 0 && (
                  <div className="space-y-1 mt-2">
                    {risk.factors.map((factor, idx) => (
                      <div key={idx} className="flex items-center text-xs text-slate-500">
                        <AlertTriangle size={12} className="mr-1 text-slate-400" />
                        {factor}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
