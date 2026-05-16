import { motion } from 'motion/react';
import { Code, PenTool, Users } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/sound';

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming",
      icon: <Code className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />,
      skills: ["HTML", "CSS", "JavaScript (Basic)", "Python (Basic)"]
    },
    {
      title: "Design",
      icon: <PenTool className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />,
      skills: ["Figma", "Canva", "Video Editing"]
    },
    {
      title: "Core Abilities",
      icon: <Users className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />,
      skills: ["Problem Solving", "Analytical Thinking", "Decision Making", "Communication Skills"]
    }
  ];

  return (
    <section id="skills" className="relative min-h-screen py-24 border-t border-cyan-900/30">
      {/* Background decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-cyan-900/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full z-10 relative">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="font-space text-3xl md:text-5xl font-bold mb-4">
              <span className="text-cyan-500">02. </span>
              Skills & Expertise
            </h2>
            <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              Active Modules
            </p>
          </div>
          
          <div className="hidden md:flex gap-4">
            {/* Decal */}
            <div className="font-mono text-[10px] text-gray-500 text-right">
              <p>SYS.CAPABILITIES</p>
              <p>VER: 2.0.4</p>
            </div>
            <svg width="40" height="40" className="opacity-30">
              <rect x="0" y="0" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
              <rect x="10" y="10" width="20" height="20" fill="currentColor" opacity="0.5" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
             <motion.div
               key={category.title}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.5, delay: index * 0.1 }}
               whileHover={{ y: -5 }}
               onClick={playClickSound}
               onMouseEnter={playHoverSound}
               className="group relative p-8 bg-[#0B1121] border border-cyan-900/30 hover:border-cyan-500/40 transition-all rounded-sm overflow-hidden"
             >
               {/* Internal scanning line */}
               <motion.div 
                 className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent z-0 blur-[1px]"
                 animate={{ top: ['-10%', '110%'] }}
                 transition={{ duration: 3 + Math.random(), repeat: Infinity, ease: 'linear' }}
               />

               <div className="relative z-10">
                 {/* Header matches the screenshot layout */}
                 <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-12 rounded-sm bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center font-bold">
                     {category.icon}
                   </div>
                   <h3 className="font-space text-2xl font-bold text-gray-200 group-hover:text-white transition-colors">
                     {category.title}
                   </h3>
                 </div>
                 
                 {/* Flex container for the pills */}
                 <div className="flex flex-wrap gap-3">
                   {category.skills.map((skill, skillIndex) => (
                     <span 
                       key={skillIndex} 
                       className="font-mono text-sm px-4 py-2 bg-cyan-950/20 border border-cyan-900/50 text-cyan-300 rounded-full group-hover:border-cyan-500/50 hover:bg-cyan-900/40 transition-all cursor-default"
                     >
                       {skill}
                     </span>
                   ))}
                 </div>
               </div>

               {/* Accent corners */}
               <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors" />
               <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors" />
             </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
