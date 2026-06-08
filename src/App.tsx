/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Portfolio from './components/Portfolio';
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/pages/AdminLogin';
import DashboardHome from './admin/pages/DashboardHome';
import ContactManagement from './admin/pages/ContactManagement';
import AnalyticsPage from './admin/pages/AnalyticsPage';
import ContentManagement from './admin/pages/ContentManagement';
import ProjectManagement from './admin/pages/ProjectManagement';
import ResumeManagement from './admin/pages/ResumeManagement';
import SettingsPage from './admin/pages/SettingsPage';
import { AuthProvider, useAuth } from './admin/context/AuthContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="h-screen w-full bg-[#020617] flex items-center justify-center text-cyan-500 font-mono">INITIALIZING TERMINAL...</div>;
  }
  
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
}

function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route path="/" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<DashboardHome />} />
          <Route path="contacts" element={<ContactManagement />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="content" element={<ContentManagement />} />
          <Route path="projects" element={<ProjectManagement />} />
          <Route path="resume" element={<ResumeManagement />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div 
            className="min-h-screen w-full overflow-hidden relative border-[6px] md:border-8 border-slate-900 flex flex-col items-stretch text-slate-300 font-mono select-none"
            style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #0c1e33 0%, #020617 100%)' }}
          >
            <div 
              className="fixed inset-0 pointer-events-none opacity-[0.15]" 
              style={{ backgroundImage: 'repeating-linear-gradient(0deg, #06b6d4 0px, transparent 1px, transparent 2px)', backgroundSize: '100% 3px' }}
            />
            <div className="fixed top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50 m-4 md:m-6 pointer-events-none z-[100]" />
            <div className="fixed top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50 m-4 md:m-6 pointer-events-none z-[100]" />
            <div className="fixed bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/50 m-4 md:m-6 pointer-events-none z-[100]" />
            <div className="fixed bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50 m-4 md:m-6 pointer-events-none z-[100]" />
            
            <Portfolio />
          </div>
        } />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppWrapper;
