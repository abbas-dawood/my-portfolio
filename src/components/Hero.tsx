import { motion } from 'motion/react';
import { Crosshair, Target, Navigation } from 'lucide-react';
import { cn } from '../utils/cn';
import { playClickSound } from '../utils/sound';

export default function Hero() {
  const handleScroll = (id: string) => {
    playClickSound();
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-20 flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div className="z-10 flex flex-col items-start pt-12 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-[1px] bg-cyan-500 block" />
            <span className="font-mono text-xs tracking-[0.2em] text-cyan-400">SYS.ON // READY</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-space text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            Abbas <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">Dawood</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-sans text-xl md:text-2xl text-gray-300 mb-6 font-light"
          >
            Building a future between <span className="text-white font-medium">technology</span>, <span className="text-white font-medium">creativity</span>, and <span className="text-cyan-400">aviation</span>.
          </motion.p>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="font-mono text-xs md:text-sm text-gray-500 leading-relaxed mb-12 max-w-lg border-l border-white/10 pl-4 py-1"
          >
            A cinematic digital identity designed to reflect ambition, curiosity, and a future shaped by discipline, creativity, and flight.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap items-center gap-6"
          >
            <button 
              onClick={() => handleScroll('contact')}
              className="group relative px-8 py-4 bg-cyan-500 text-black font-bold tracking-widest uppercase text-xs hover:bg-white transition-all transform hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Initiate Contact</span>
                <Target className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              </span>
            </button>
            
            <a 
              href="/Abbas_Dawood_Resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              className="group flex items-center gap-3 px-8 py-4 border border-cyan-500 text-cyan-500 font-bold tracking-widest uppercase text-xs hover:bg-cyan-500/10 transition-colors cursor-pointer"
            >
               Retrieve CV
            </a>
          </motion.div>
        </div>

        {/* Right Aviation Interface Panel */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center z-10"
        >
          {/* Main Cockpit Circle */}
          <div className="relative w-full max-w-md aspect-square rounded-full border-[0.5px] border-cyan-900/30 flex items-center justify-center bg-radial from-cyan-900/10 to-transparent">
            {/* Animated dashed ring */}
            <motion.svg 
              className="absolute inset-0 w-full h-full -rotate-90"
              animate={{ rotate: 270 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            >
               <circle cx="50%" cy="50%" r="45%" fill="none" stroke="rgba(6,182,212,0.2)" strokeWidth="1" strokeDasharray="4 8" />
            </motion.svg>
            
            {/* Inner Ring */}
             <motion.svg 
              className="absolute inset-8 w-[calc(100%-4rem)] h-[calc(100%-4rem)] rotate-90"
              animate={{ rotate: -270 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            >
               <circle cx="50%" cy="50%" r="48%" fill="none" stroke="rgba(0,100,255,0.3)" strokeWidth="0.5" strokeDasharray="20 40 10 40" />
            </motion.svg>

            {/* Radar Sweep */}
            <motion.div 
               className="absolute top-[50%] left-[50%] w-[50%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-cyan-400 origin-left"
               animate={{ rotate: 360 }}
               transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
               <div className="absolute top-0 right-0 w-24 h-24 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(6,182,212,0.2)_90deg,transparent_90deg)] opacity-50 origin-bottom-left -translate-y-full -translate-x-full rotate-90" />
            </motion.div>

            {/* Center Crosshair */}
            <Crosshair className="w-12 h-12 text-cyan-500/80 absolute z-20" strokeWidth={1} />
            
            {/* Overlay Data Tags */}
            <div className="absolute top-[15%] left-[20%] text-left">
              <p className="font-mono text-[9px] text-cyan-600">PITCH</p>
              <p className="font-mono text-xs text-white">0.05</p>
            </div>
            
            <div className="absolute top-[15%] right-[20%] text-right bg-black/40 backdrop-blur-md px-3 py-1 border border-cyan-900/50 rounded-sm">
              <p className="font-mono text-[9px] text-cyan-400 mb-1">ROLE [01]</p>
              <p className="font-space text-sm font-bold tracking-widest text-white whitespace-nowrap">DIGITAL</p>
              <p className="font-space text-sm font-bold tracking-widest text-white whitespace-nowrap">CREATOR</p>
            </div>
            
            <div className="absolute bottom-[20%] left-[10%] text-left bg-black/40 backdrop-blur-md px-3 py-1 border border-cyan-900/50 rounded-sm">
              <p className="font-mono text-[9px] text-cyan-400 mb-1">ROLE [02]</p>
              <p className="font-space text-sm font-bold tracking-widest text-white whitespace-nowrap">ASPIRING</p>
              <p className="font-space text-sm font-bold tracking-widest text-white whitespace-nowrap">PILOT</p>
            </div>

            <div className="absolute bottom-[10%] right-[30%] text-right">
              <p className="font-mono text-[9px] text-cyan-600">YAW</p>
              <p className="font-mono text-xs text-white">-1.2</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
