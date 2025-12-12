import React, { useEffect, useState } from 'react';
import { ApiService } from '../services/api';
import { User } from '../types';
import { Shield, Clock } from 'lucide-react';

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await ApiService.getUsers();
        setUsers(data);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">System Administration</h1>
        <p className="text-slate-500 text-sm">User management and audit logs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Management */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center">
            <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
              <Shield size={20} className="text-blue-600" />
              User Management
            </h2>
            <button className="text-sm text-blue-600 font-medium hover:text-blue-700">Add User</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-semibold">User</th>
                  <th className="px-6 py-3 font-semibold">Role</th>
                  <th className="px-6 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan={3} className="p-4 text-center">Loading...</td></tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img src={user.avatarUrl} alt="" className="w-8 h-8 rounded-full bg-slate-200" />
                        <span className="font-medium text-slate-900">{user.username}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-blue-600">Edit</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mock Audit Log */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
              <Clock size={20} className="text-blue-600" />
              Recent Audit Logs
            </h2>
          </div>
          <div className="p-0">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-4 p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-400" />
                <div>
                  <p className="text-sm text-slate-800">
                    User <span className="font-medium">admin</span> updated project <span className="font-medium">Skyline Tower</span> budget.
                  </p>
                  <p className="text-xs text-slate-400 mt-1">2 hours ago • IP: 192.168.1.42</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
