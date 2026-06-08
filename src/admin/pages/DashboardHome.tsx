import React, { useState, useEffect } from 'react';
import { Users, Eye, FileDown, MessageSquare, ArrowUpRight, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { db } from '../../firebase';

function StatCard({ title, value, icon: Icon, trend }: { title: string, value: string | number, icon: any, trend?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm relative overflow-hidden group"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-2 text-sm font-medium">
          <ArrowUpRight className="w-4 h-4 text-emerald-500" />
          <span className="text-emerald-500">{trend}</span>
          <span className="text-slate-400 font-normal">vs last week</span>
        </div>
      )}
    </motion.div>
  );
}

export default function DashboardHome() {
  const [stats, setStats] = useState({ projects: 0, contacts: 0, unreadContacts: 0 });
  const [recentComms, setRecentComms] = useState<any[]>([]);

  useEffect(() => {
    // Listen to contacts
    const qContacts = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
    const unsubContacts = onSnapshot(qContacts, (snapshot) => {
      setStats(prev => ({ 
        ...prev, 
        contacts: snapshot.size,
        unreadContacts: snapshot.docs.filter(d => !d.data().read).length 
      }));
      setRecentComms(snapshot.docs.slice(0, 5).map(d => ({ id: d.id, ...d.data() })));
    });

    // Listen to projects
    const qProjects = query(collection(db, 'projects'));
    const unsubProjects = onSnapshot(qProjects, (snapshot) => {
      setStats(prev => ({ ...prev, projects: snapshot.size }));
    });

    return () => {
      unsubContacts();
      unsubProjects();
    };
  }, []);

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Overview of your portfolio's performance.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Projects" value={stats.projects} icon={Eye} />
        <StatCard title="Total Messages" value={stats.contacts} icon={MessageSquare} />
        <StatCard title="Unread Messages" value={stats.unreadContacts} icon={Users} />
        <StatCard title="Resume Downloads" value="0" icon={FileDown} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white border border-slate-200 shadow-sm rounded-xl p-6 flex flex-col justify-center items-center h-96"
        >
          <div className="text-slate-400 text-sm w-full text-center">
            Detailed analytics will appear here after more traffic.
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 flex flex-col h-96"
        >
          <h2 className="text-lg font-bold text-slate-900 mb-6 shrink-0">Recent Messages</h2>
          <div className="flex-1 overflow-auto space-y-4 pr-2">
            {recentComms.length === 0 ? (
              <div className="text-sm text-slate-500 text-center mt-10">
                No recent messages
              </div>
            ) : (
              recentComms.map((comm) => (
                <div key={comm.id} className={`flex flex-col gap-1 p-3 rounded-lg border ${comm.read ? 'bg-slate-50 border-slate-100' : 'bg-blue-50/50 border-blue-100'} transition-colors`}>
                  <div className="flex justify-between items-start">
                    <span className={`text-sm font-semibold truncate max-w-[150px] ${comm.read ? 'text-slate-700' : 'text-slate-900'}`}>{comm.name}</span>
                    <span className="text-xs text-slate-400">
                      {comm.createdAt?.toDate ? new Date(comm.createdAt.toDate()).toLocaleDateString() : 'Now'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 truncate">{comm.subject || comm.body}</p>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
