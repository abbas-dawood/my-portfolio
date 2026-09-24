import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Filter, Mic2, Shield, Calendar, Users, Play, FileText, Monitor } from 'lucide-react';
import { cn } from '../utils/cn';
import { playClickSound, playHoverSound } from '../utils/sound';

const munData = [
  {
    id: 'sassy26',
    role: "Executive Board Member / Rapporteur",
    event: "SASSY'26",
    mission: "St. Anthony's Students Summit by YUVA, Udaipur.",
    committee: "Education Ministry of India (Senior)",
    category: "EXECUTIVE BOARD",
    icon: <Shield className="w-5 h-5" />
  },
  {
    id: 'sangam26',
    role: "Participant",
    event: "Sangam MUN 2026",
    mission: "Active participation in parliamentary procedures.",
    committee: "Lok Sabha",
    category: "PARTICIPANT",
    icon: <Mic2 className="w-5 h-5" />
  },
  {
    id: 'iit25',
    role: "Participant",
    event: "IIT Bombay 2025",
    mission: "Advanced level debate and structural discussions.",
    committee: "AIIMP",
    category: "PARTICIPANT",
    icon: <Globe className="w-5 h-5" />
  },
  {
    id: 'ryc25',
    role: "Participant",
    event: "RYCMUN 2025",
    mission: "National policy formulation and debate.",
    committee: "Lok Sabha",
    category: "PARTICIPANT",
    icon: <Mic2 className="w-5 h-5" />
  },
  {
    id: 'sangam25',
    role: "Participant",
    event: "Sangam MUN 2025",
    mission: "Crisis committee navigation and strategy.",
    committee: "CCC",
    category: "PARTICIPANT",
    icon: <Mic2 className="w-5 h-5" />
  },
  {
    id: 'dps24',
    role: "OC Member",
    event: "DPS MUN 2024",
    mission: "Facilitated logistics and core operations.",
    committee: "Organizing Committee",
    category: "OC",
    icon: <Users className="w-5 h-5" />
  },
  {
    id: 'dps-ud',
    role: "IP Member",
    event: "DPS Udaipur MUN",
    mission: "Journalism and reporting within the MUN framework.",
    committee: "International Press",
    category: "PARTICIPANT",
    icon: <FileText className="w-5 h-5" />
  },
  {
    id: 'imun',
    role: "Participant",
    event: "IMUN, India",
    mission: "International Model United Nations.",
    committee: "General Assembly",
    category: "PARTICIPANT",
    icon: <Globe className="w-5 h-5" />
  },
  {
    id: 'mock',
    role: "Participant",
    event: "Mock Parliament, Jaipur",
    mission: "Indian parliamentary simulation.",
    committee: "Parliament",
    category: "PARTICIPANT",
    icon: <Mic2 className="w-5 h-5" />
  },
  {
    id: 'mumbai',
    role: "Delegate",
    event: "Mumbai MUN Circuit",
    mission: "Attended multiple competitive MUN conferences across the Mumbai circuit.",
    committee: "Multiple Committees",
    category: "PARTICIPANT",
    icon: <Globe className="w-5 h-5" />
  },
  {
    id: 'online',
    role: "Delegate",
    event: "Online MUN Experiences",
    mission: "Participated in diverse online committee simulations.",
    committee: "UNGA, UNHRC, IPL",
    category: "ONLINE",
    icon: <Monitor className="w-5 h-5" />
  },
  {
    id: 'debate',
    role: "Speaker",
    event: "Debate & Parliamentary",
    mission: "Extensive involvement in school debates and structured parliamentary formats.",
    committee: "Tark Vitrak, Baithke, Charchaaar",
    category: "PARTICIPANT",
    icon: <Mic2 className="w-5 h-5" />
  }
];

const filters = ["ALL", "EXECUTIVE BOARD", "OC", "PARTICIPANT", "ONLINE"];

export default function MunDiplomacy() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedId, setSelectedId] = useState(munData[0].id);

  const filteredData = useMemo(() => {
    return munData.filter(item => activeFilter === "ALL" || item.category === activeFilter);
  }, [activeFilter]);

  // Ensure selected item is always valid when filter changes
  useMemo(() => {
    if (filteredData.length > 0 && !filteredData.find(item => item.id === selectedId)) {
      setSelectedId(filteredData[0].id);
    }
  }, [filteredData, selectedId]);

  const activeItem = useMemo(() => {
    return munData.find(item => item.id === selectedId) || filteredData[0];
  }, [selectedId, filteredData]);

  return (
    <section id="mun" className="relative py-16 md:py-24 bg-[#0B1121] border-y border-cyan-900/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-4">
            <Globe className="text-cyan-500 w-6 h-6" />
            <h2 className="font-space text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
              MUN & Diplomacy
            </h2>
          </div>
          <div className="w-12 h-1 bg-cyan-500 mb-6" />
          
          <div className="bg-[#020617]/70 border border-cyan-900/40 p-4 md:p-5 rounded-sm max-w-3xl backdrop-blur-xs relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
            <p className="font-sans text-sm md:text-base text-gray-300 leading-relaxed font-light pl-2">
              <span className="text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold mr-2">[Notice]</span>
              I have attended 18+ MUN conferences, but have attached a selected list of key conferences here. As an active MUN delegate and debater, if you would like to contact me regarding Executive Board (EB) or Secretariat opportunities, please reach out in the{' '}
              <a 
                href="#contact" 
                onClick={playClickSound}
                className="text-cyan-400 hover:text-white underline underline-offset-4 decoration-cyan-500/60 transition-colors font-medium"
              >
                contact section below
              </a>.
            </p>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <Filter className="w-4 h-4 text-cyan-500 mr-2" />
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => { playClickSound(); setActiveFilter(filter); }}
              onMouseEnter={playHoverSound}
              className={cn(
                "font-mono text-[10px] px-3 py-1.5 rounded-sm uppercase tracking-widest transition-colors border",
                activeFilter === filter
                  ? "bg-cyan-500 text-black border-cyan-500"
                  : "bg-[#020617] text-gray-400 border-cyan-900/30 hover:border-cyan-500/50 hover:text-cyan-400"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[500px]">
          
          {/* Left Side: Scrollable List */}
          <div className="lg:col-span-5 flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence>
              {filteredData.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => { playClickSound(); setSelectedId(item.id); }}
                  onMouseEnter={playHoverSound}
                  className={cn(
                    "flex flex-col text-left p-4 border rounded-sm transition-all duration-300 relative group",
                    selectedId === item.id
                      ? "bg-[#020617] border-cyan-400 shadow-[inset_0_0_15px_rgba(6,182,212,0.2)]"
                      : "bg-[#020617]/50 border-cyan-900/30 hover:border-cyan-500/50"
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={cn(
                      "font-space text-base font-bold transition-colors",
                      selectedId === item.id ? "text-cyan-400" : "text-gray-300 group-hover:text-white"
                    )}>
                      {item.event}
                    </h3>
                    <span className="font-mono text-[9px] text-amber-500 border border-amber-900/30 bg-amber-950/20 px-2 py-0.5 rounded-sm uppercase tracking-widest shrink-0 ml-2">
                      {item.category}
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest line-clamp-1">{item.role}</p>
                </motion.button>
              ))}
            </AnimatePresence>
            {filteredData.length === 0 && (
              <div className="text-center p-8 border border-dashed border-cyan-900/30 rounded-sm">
                <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">No records found for this filter.</p>
              </div>
            )}
          </div>

          {/* Right Side: Detail Panel */}
          <div className="lg:col-span-7 bg-[#020617] border border-cyan-900/30 p-8 rounded-sm relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {activeItem && (
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 flex-1 flex flex-col"
                >
                  <div className="flex items-start gap-4 mb-8 pb-6 border-b border-cyan-900/30">
                    <div className="p-4 bg-cyan-950/20 text-cyan-500 border border-cyan-900/30 rounded-sm shrink-0">
                      {activeItem.icon}
                    </div>
                    <div>
                      <h3 className="font-space text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">{activeItem.event}</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="font-mono text-xs text-cyan-400 bg-cyan-950/30 border border-cyan-900/50 px-3 py-1 rounded-sm uppercase tracking-widest">
                          {activeItem.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 flex-1">
                    <div className="bg-[#0B1121] p-6 rounded-sm border border-cyan-900/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="w-4 h-4 text-gray-400" />
                        <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Committee / Format</h4>
                      </div>
                      <p className="font-sans text-sm text-gray-200 leading-relaxed font-medium">{activeItem.committee}</p>
                    </div>

                    <div className="bg-[#0B1121] p-6 rounded-sm border border-cyan-900/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Play className="w-4 h-4 text-gray-400" />
                        <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Mission Log / Description</h4>
                      </div>
                      <p className="font-sans text-sm text-gray-300 leading-relaxed font-light">{activeItem.mission}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
      
      {/* Scrollbar styles for the left panel */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(2, 6, 23, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.6);
        }
      `}} />
    </section>
  );
}
