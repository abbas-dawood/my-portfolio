import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Users, Award, Play } from 'lucide-react';
import { cn } from '../utils/cn';
import { playClickSound, playHoverSound } from '../utils/sound';

const munExperiences = [
  { id: 1, name: "SASSY'26", role: "Executive Board Member / Rapporteur", committee: "Education Ministry of India (Senior)", category: "EXECUTIVE BOARD", year: "2026", details: "St. Anthony's Students Summit by YUVA, Udaipur." },
  { id: 2, name: "IDC MUN 2026 — Chapter 1", role: "Organizer", committee: "Core Organizing Committee", category: "ORGANIZER", year: "2026", details: "Organised and coordinated Chapter 1 of IDC MUN in Jaipur." },
  { id: 3, name: "Sangam MUN 2026", role: "Participant", committee: "Lok Sabha", category: "PARTICIPANT", year: "2026", details: "Active participation in parliamentary procedures." },
  { id: 4, name: "IIT Bombay 2025", role: "Participant", committee: "AIIMP", category: "PARTICIPANT", year: "2025", details: "Advanced level debate and structural discussions." },
  { id: 5, name: "RYCMUN 2025", role: "Participant", committee: "Lok Sabha", category: "PARTICIPANT", year: "2025", details: "National policy formulation and debate." },
  { id: 6, name: "Sangam MUN 2025", role: "Participant", committee: "CCC", category: "PARTICIPANT", year: "2025", details: "Crisis committee navigation and strategy." },
  { id: 7, name: "DPS MUN 2024", role: "OC Member", committee: "Organizing Committee", category: "OC", year: "2024", details: "Facilitated logistics and core operations." },
  { id: 8, name: "DPS Udaipur MUN", role: "IP Member", committee: "International Press", category: "PARTICIPANT", year: "Previous", details: "Journalism and reporting within the MUN framework." },
  { id: 9, name: "IMUN, India", role: "Participant", committee: "General Assembly", category: "PARTICIPANT", year: "Previous", details: "International Model United Nations." },
  { id: 10, name: "Mock Parliament, Jaipur", role: "Participant", committee: "Parliament", category: "PARTICIPANT", year: "Previous", details: "Indian parliamentary simulation." },
  { id: 11, name: "Delhi Mock Parliament", role: "Participant", committee: "Parliament", category: "PARTICIPANT", year: "Previous", details: "National level mock parliament." },
  { id: 12, name: "Mumbai MUN Circuit", role: "Delegate", committee: "Multiple Committees", category: "PARTICIPANT", year: "Various", details: "Attended multiple competitive MUN conferences across the Mumbai circuit." },
  { id: 13, name: "Online MUN Experiences", role: "Delegate", committee: "UNGA, UNHRC, IPL", category: "ONLINE", year: "Various", details: "Participated in diverse online committee simulations." },
  { id: 14, name: "Debate & Parliamentary", role: "Speaker", committee: "Tark Vitrak, IDC, Baithke, Charchaar", category: "PARTICIPANT", year: "Various", details: "Extensive involvement in school debates and structured parliamentary formats." }
];

const categories = ["ALL", "EXECUTIVE BOARD", "ORGANIZER", "OC", "PARTICIPANT", "ONLINE"];

export default function MunDiplomacy() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedExp, setSelectedExp] = useState(munExperiences[0]);

  const filtered = activeFilter === "ALL" 
    ? munExperiences 
    : munExperiences.filter(exp => exp.category === activeFilter);

  return (
    <section id="mun" className="relative py-24 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Globe className="text-cyan-500 w-8 h-8" />
              <h2 className="font-space text-4xl font-bold text-white uppercase tracking-wider">
                MUN & Diplomacy
              </h2>
            </div>
            <p className="font-sans text-gray-400 max-w-2xl text-lg">
              Representing nations, structuring policy, and navigating high-pressure diplomacy.
            </p>
          </div>
          <div className="bg-cyan-950/20 border border-cyan-900/50 px-6 py-4 rounded-sm text-center">
            <span className="block font-space text-3xl font-bold text-amber-500">15+</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400">Experiences</span>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { playClickSound(); setActiveFilter(cat); }}
              onMouseEnter={playHoverSound}
              className={cn(
                "px-4 py-2 font-mono text-xs uppercase tracking-widest rounded-sm transition-all",
                activeFilter === cat 
                  ? "bg-cyan-500 text-black font-bold" 
                  : "bg-[#0B1121] text-gray-400 border border-cyan-900/30 hover:border-cyan-500/50 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* List/Grid */}
          <div className="lg:col-span-1 h-[500px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            <AnimatePresence>
              {filtered.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  onClick={() => { playClickSound(); setSelectedExp(exp); }}
                  onMouseEnter={playHoverSound}
                  className={cn(
                    "p-4 border rounded-sm cursor-pointer transition-all",
                    selectedExp.id === exp.id 
                      ? "bg-cyan-950/30 border-cyan-500 shadow-[inset_4px_0_0_#06b6d4]" 
                      : "bg-[#0B1121] border-cyan-900/30 hover:border-cyan-500/50"
                  )}
                >
                  <h4 className="font-space font-bold text-white mb-1">{exp.name}</h4>
                  <p className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest">{exp.role}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-2 bg-[#0B1121] border border-cyan-900/30 p-8 rounded-sm relative overflow-hidden flex flex-col justify-center min-h-[400px]">
            {/* World Map / Radar overlay */}
            <div className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none">
              <Globe className="w-96 h-96" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedExp.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className={cn(
                    "px-3 py-1 font-mono text-[10px] tracking-widest uppercase rounded-sm border",
                    selectedExp.category === 'EXECUTIVE BOARD' || selectedExp.category === 'ORGANIZER'
                      ? "bg-amber-950/30 text-amber-500 border-amber-900/50"
                      : "bg-cyan-950/30 text-cyan-400 border-cyan-900/50"
                  )}>
                    {selectedExp.category}
                  </span>
                  <span className="font-mono text-[10px] text-gray-500 tracking-widest">
                    SESSION {selectedExp.year}
                  </span>
                </div>

                <h3 className="font-space text-3xl md:text-4xl font-bold text-white mb-2">{selectedExp.name}</h3>
                <p className="font-sans text-xl text-cyan-400 mb-8">{selectedExp.role}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Committee / Format</p>
                    <p className="font-sans text-gray-200 font-medium">{selectedExp.committee}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Mission Log</p>
                    <p className="font-sans text-gray-400 font-light leading-relaxed">{selectedExp.details}</p>
                  </div>
                </div>

                {(selectedExp.category === 'EXECUTIVE BOARD' || selectedExp.category === 'ORGANIZER') && (
                  <div className="flex items-center gap-3 mt-8 p-4 bg-amber-950/10 border border-amber-900/30 rounded-sm inline-flex">
                    <Award className="text-amber-500 w-5 h-5" />
                    <span className="font-mono text-xs text-amber-400 uppercase tracking-widest">Verified Leadership Role</span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(6, 182, 212, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.6);
        }
      `}</style>
    </section>
  );
}
