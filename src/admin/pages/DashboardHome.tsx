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
      className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-xl p-6 relative overflow-hidden group"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/20 group-hover:via-cyan-500/50 group-hover:to-cyan-500/20 transition-all duration-500" />
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
        </div>
        <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800 text-cyan-500">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest">
          <ArrowUpRight className="w-3 h-3 text-emerald-400" />
          <span className="text-emerald-400">{trend}</span>
          <span className="text-slate-500">vs last week</span>
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
        <h1 className="text-2xl font-bold tracking-widest text-white uppercase flex items-center gap-3">
          <Activity className="w-6 h-6 text-cyan-500" />
          Command Center Overview
        </h1>
        <p className="text-sm text-slate-400 font-mono tracking-wider mt-2">SYSTEM STATUS: LIVE. MONITORING ACTIVE DATABASES.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Projects" value={stats.projects} icon={Eye} />
        <StatCard title="Total Messages" value={stats.contacts} icon={MessageSquare} />
        <StatCard title="Unread Messages" value={stats.unreadContacts} icon={Users} />
        <StatCard title="File Modules" value="0" icon={FileDown} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-xl p-6 flex flex-col justify-center items-center"
        >
          <div className="text-slate-500 uppercase tracking-widest text-sm border border-dashed border-slate-700 rounded-xl p-8 w-full text-center">
            TRAFFIC TELEMETRY SENSORS OFFLINE (AWAITING FRONTEND ANALYTICS INJECTIONS...)
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-xl p-6 flex flex-col h-96"
        >
          <h2 className="text-sm uppercase tracking-widest text-slate-400 mb-6 shrink-0">Recent Comms Data</h2>
          <div className="flex-1 overflow-auto space-y-4 pr-2">
            {recentComms.length === 0 ? (
              <div className="text-xs text-slate-500 text-center mt-10 uppercase tracking-widest">
                NO RECENT COMMS
              </div>
            ) : (
              recentComms.map((comm) => (
                <div key={comm.id} className={`flex flex-col gap-2 p-3 bg-slate-950/50 rounded-lg border transition-colors ${comm.read ? 'border-slate-800' : 'border-cyan-500/50'}`}>
                  <div className="flex justify-between items-start">
                    <span className={`text-sm font-bold truncate max-w-[150px] ${comm.read ? 'text-slate-300' : 'text-white'}`}>{comm.name}</span>
                    <span className="text-[10px] text-slate-500 tracking-wider">
                      {comm.createdAt?.toDate ? new Date(comm.createdAt.toDate()).toLocaleDateString() : 'NOW'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">{comm.subject || comm.body}</p>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
