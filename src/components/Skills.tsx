import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Lightbulb, Users, Monitor, Compass } from 'lucide-react';
import { cn } from '../utils/cn';
import { playClickSound, playHoverSound } from '../utils/sound';

const skillCategories = [
  {
    id: 'CORE',
    label: 'CORE COMPETENCIES',
    icon: <Target className="w-5 h-5" />,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/50',
    bgColor: 'bg-amber-950/20',
    skills: [
      { name: 'Critical Thinking', status: 'ACTIVE' },
      { name: 'Decision-Making Under Pressure', status: 'ACTIVE' },
      { name: 'Structured Problem-Solving', status: 'ACTIVE' },
      { name: 'Analytical Mindset', status: 'ACTIVE' },
      { name: 'Situational Awareness', status: 'ACTIVE' }
    ]
  },
  {
    id: 'LEADERSHIP',
    label: 'LEADERSHIP & COMMUNICATION',
    icon: <Users className="w-5 h-5" />,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/50',
    bgColor: 'bg-cyan-950/20',
    skills: [
      { name: 'Public Speaking', status: 'ACTIVE' },
      { name: 'International Diplomacy', status: 'ACTIVE' },
      { name: 'Team Collaboration', status: 'ACTIVE' },
      { name: 'Adaptability', status: 'ACTIVE' }
    ]
  },
  {
    id: 'DIGITAL',
    label: 'DIGITAL & DESIGN TOOLS',
    icon: <Monitor className="w-5 h-5" />,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/50',
    bgColor: 'bg-emerald-950/20',
    skills: [
      { name: 'Figma', status: 'WORKING' },
      { name: 'Canva', status: 'WORKING' },
      { name: 'Video Editing', status: 'WORKING' },
      { name: 'Basic Coding & Web Dev', status: 'EXPLORING' }
    ]
  }
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);

  const activeData = skillCategories.find(c => c.id === activeCategory);

  return (
    <section id="skills" className="relative py-16 md:py-24 bg-[#0B1121] border-y border-cyan-900/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <Compass className="text-cyan-500 w-6 h-6" />
            <h2 className="font-space text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
              Command Center
            </h2>
          </div>
          <p className="font-mono text-xs text-gray-400 max-w-2xl uppercase tracking-widest border-l-2 border-amber-500 pl-4 py-1">
            System Capabilities & Core Loadout
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[400px]">
          
          {/* Navigation / Categories */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  playClickSound();
                  setActiveCategory(cat.id);
                }}
                onMouseEnter={playHoverSound}
                className={cn(
                  "relative flex items-center gap-4 p-5 text-left border rounded-sm transition-all duration-300 group",
                  activeCategory === cat.id 
                    ? `bg-[#020617] ${cat.borderColor} shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]` 
                    : "bg-[#020617]/50 border-cyan-900/30 hover:border-cyan-500/50"
                )}
              >
                <div className={cn(
                  "p-2 rounded-sm transition-colors",
                  activeCategory === cat.id ? cat.bgColor + " " + cat.color : "bg-cyan-950/20 text-cyan-700 group-hover:text-cyan-400"
                )}>
                  {cat.icon}
                </div>
                <div className="flex-1">
                  <h3 className={cn(
                    "font-mono text-sm tracking-widest uppercase transition-colors",
                    activeCategory === cat.id ? "text-white" : "text-gray-500 group-hover:text-gray-300"
                  )}>
                    {cat.label}
                  </h3>
                </div>
                
                {/* Active Indicator Line */}
                {activeCategory === cat.id && (
                  <motion.div 
                    layoutId="active-indicator"
                    className={cn("absolute right-0 top-0 bottom-0 w-1", cat.bgColor)}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Details / Skills Display */}
          <div className="lg:col-span-8 bg-[#020617] border border-cyan-900/30 p-8 rounded-sm relative overflow-hidden flex flex-col">
            
            {/* Grid Background Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 flex-1 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-cyan-900/30">
                  <div className={cn("p-3 rounded-sm", activeData?.bgColor, activeData?.color)}>
                    {activeData?.icon}
                  </div>
                  <div>
                    <h3 className="font-space text-2xl font-bold text-white uppercase tracking-wider">{activeData?.label}</h3>
                    <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mt-1">STATUS: OPERATIONAL</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-max flex-1">
                  {activeData?.skills.map((skill, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      key={skill.name}
                      className="flex items-center justify-between p-4 bg-black/40 border border-cyan-900/30 rounded-sm hover:border-cyan-500/30 transition-colors"
                    >
                      <span className="font-sans text-gray-200 font-medium">{skill.name}</span>
                      <span className={cn(
                        "font-mono text-[10px] px-2 py-1 rounded-sm uppercase tracking-widest",
                        skill.status === 'ACTIVE' ? "bg-amber-950/30 text-amber-500 border border-amber-900/50" : 
                        skill.status === 'WORKING' ? "bg-cyan-950/30 text-cyan-400 border border-cyan-900/50" :
                        "bg-gray-900/50 text-gray-400 border border-gray-700"
                      )}>
                        {skill.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
