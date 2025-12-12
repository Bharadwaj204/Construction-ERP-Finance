import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  DollarSign, 
  ShieldAlert, 
  Settings, 
  LogOut,
  Building2,
  Menu,
  X
} from 'lucide-react';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
    <Link
      to={to}
      onClick={() => setIsMobileMenuOpen(false)}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        isActive(to)
          ? 'bg-blue-600 text-white'
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </Link>
  );

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white h-full">
        <div className="p-6 border-b border-slate-800 flex items-center space-x-2">
          <Building2 className="text-blue-500" size={28} />
          <span className="text-xl font-bold">ConstructERP</span>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavItem to="/" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/finance" icon={DollarSign} label="Finance" />
          <NavItem to="/admin" icon={Settings} label="Administration" />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center space-x-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">
              {user?.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{user?.username}</p>
              <p className="text-xs text-slate-500 truncate">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-2 text-slate-400 hover:text-red-400 transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white shadow-sm h-16 flex items-center justify-between px-4 z-20">
          <div className="flex items-center space-x-2">
            <Building2 className="text-blue-600" size={24} />
            <span className="font-bold text-slate-800">ConstructERP</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-slate-900 z-10 pt-16">
            <nav className="p-4 space-y-2">
              <NavItem to="/" icon={LayoutDashboard} label="Dashboard" />
              <NavItem to="/finance" icon={DollarSign} label="Finance" />
              <NavItem to="/admin" icon={Settings} label="Administration" />
              <button
                onClick={onLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-slate-400 mt-8"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-8 relative">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
