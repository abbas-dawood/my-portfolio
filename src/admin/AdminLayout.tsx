import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { LayoutDashboard, Users, BarChart2, FileText, Briefcase, FileBadge, Settings, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'COMMAND CENTER', path: '/admin' },
  { icon: Users, label: 'CONTACTS', path: '/admin/contacts' },
  { icon: BarChart2, label: 'ANALYTICS', path: '/admin/analytics' },
  { icon: FileText, label: 'CONTENT', path: '/admin/content' },
  { icon: Briefcase, label: 'PROJECTS', path: '/admin/projects' },
  { icon: FileBadge, label: 'RESUME', path: '/admin/resume' },
  { icon: Settings, label: 'SETTINGS', path: '/admin/settings' },
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
    <div className="min-h-screen w-full bg-[#020617] text-slate-300 font-mono flex flex-col md:flex-row overflow-hidden relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, #06b6d4 0px, transparent 1px, transparent 2px)', backgroundSize: '100% 3px' }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.1),rgba(2,6,23,0))] pointer-events-none" />

      {/* Sidebar Navigation */}
      <nav className="w-full md:w-64 border-b md:border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl shrink-0 flex flex-col pt-6 z-10">
        <div className="px-6 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            <span className="text-xs tracking-widest text-cyan-500 font-bold">SYSTEM ONLINE</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white uppercase">NEXUS ADMIN</h1>
        </div>
        
        <div className="flex-1 py-4 overflow-y-auto px-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm tracking-widest border border-transparent transition-all duration-300 ${
                  isActive 
                    ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[inset_0_0_12px_rgba(6,182,212,0.1)]' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm tracking-widest text-rose-400 hover:text-white hover:bg-rose-500/10 hover:border-rose-500/30 border border-transparent transition-all duration-300"
          >
            <LogOut className="w-4 h-4" />
            DISCONNECT
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto relative z-10 bg-slate-900/20 backdrop-blur-3xl">
        <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-full">
            <Outlet />
        </div>
      </main>

      {/* Corner Accents */}
      <div className="fixed top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/30 m-4 md:m-6 pointer-events-none z-[100]" />
      <div className="fixed top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/30 m-4 md:m-6 pointer-events-none z-[100]" />
      <div className="fixed bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/30 m-4 md:m-6 pointer-events-none z-[100]" />
      <div className="fixed bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/30 m-4 md:m-6 pointer-events-none z-[100]" />
    </div>
  );
}
