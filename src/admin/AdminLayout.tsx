import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { LayoutDashboard, Users, BarChart2, FileText, Briefcase, FileBadge, Settings, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Users, label: 'Messages', path: '/admin/contacts' },
  { icon: FileText, label: 'Content', path: '/admin/content' },
  { icon: Briefcase, label: 'Projects', path: '/admin/projects' },
  { icon: FileBadge, label: 'Resume', path: '/admin/resume' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 font-sans flex flex-col md:flex-row overflow-hidden relative">
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-64 border-b md:border-r border-slate-200 bg-white shrink-0 flex flex-col pt-6 z-10">
        <div className="px-6 pb-6 border-b border-slate-200">
          <h1 className="text-xl font-bold tracking-tight text-slate-800">Admin Portal</h1>
          <p className="text-xs text-slate-500 mt-1">Manage your portfolio</p>
        </div>
        
        <div className="flex-1 py-4 overflow-y-auto px-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="p-4 border-t border-slate-200">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-md text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto relative z-10 bg-slate-50">
        <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-full">
            <Outlet />
        </div>
      </main>
    </div>
  );
}
