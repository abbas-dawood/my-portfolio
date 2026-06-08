import React from 'react';
import { Users, Eye, FileDown, MessageSquare, ArrowUpRight, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', visitors: 120 },
  { name: 'Tue', visitors: 180 },
  { name: 'Wed', visitors: 150 },
  { name: 'Thu', visitors: 220 },
  { name: 'Fri', visitors: 300 },
  { name: 'Sat', visitors: 280 },
  { name: 'Sun', visitors: 390 },
];

function StatCard({ title, value, icon: Icon, trend }: { title: string, value: string, icon: any, trend: string }) {
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
      <div className="flex items-center gap-2 text-xs font-mono tracking-widest">
        <ArrowUpRight className="w-3 h-3 text-emerald-400" />
        <span className="text-emerald-400">{trend}</span>
        <span className="text-slate-500">vs last week</span>
      </div>
    </motion.div>
  );
}

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-widest text-white uppercase flex items-center gap-3">
          <Activity className="w-6 h-6 text-cyan-500" />
          Command Center Overview
        </h1>
        <p className="text-sm text-slate-400 font-mono tracking-wider mt-2">SYSTEM STATUS: NOMINAL. MONITORING ALL SECTORS.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Visitors" value="12,492" icon={Users} trend="+14.2%" />
        <StatCard title="Portfolio Views" value="48,102" icon={Eye} trend="+8.1%" />
        <StatCard title="Resume D/L" value="342" icon={FileDown} trend="+22.4%" />
        <StatCard title="Comms [Messages]" value="89" icon={MessageSquare} trend="+5.0%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-xl p-6"
        >
          <h2 className="text-sm uppercase tracking-widest text-slate-400 mb-6">Traffic Telemetry (7 Days)</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc', fontFamily: 'monospace', fontSize: '12px' }}
                  itemStyle={{ color: '#06b6d4' }}
                />
                <Area type="monotone" dataKey="visitors" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorVisitors)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-xl p-6 flex flex-col"
        >
          <h2 className="text-sm uppercase tracking-widest text-slate-400 mb-6">Recent Comms Data</h2>
          <div className="flex-1 overflow-auto space-y-4 pr-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col gap-2 p-3 bg-slate-950/50 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-bold text-white truncate max-w-[150px]">Sarah Jenkins</span>
                  <span className="text-xs text-slate-500 tracking-wider">2H AGO</span>
                </div>
                <p className="text-xs text-slate-400 truncate">I'd like to discuss a potential project regarding...</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-xs tracking-widest text-cyan-500 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/10 transition-colors uppercase">
            View All Comms
          </button>
        </motion.div>
      </div>
    </div>
  );
}
