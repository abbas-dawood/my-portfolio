import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Target, Compass, Download } from 'lucide-react';
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
            <span className="font-mono text-xs tracking-[0.2em] text-cyan-400">IDENTITY // VERIFIED</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-space text-5xl md:text-7xl font-bold leading-tight mb-4"
          >
            <span className="text-white">Abbas</span>{' '}
            <span className="text-gray-300">Dawood</span>
            <span className="sr-only">, Future Commercial Pilot, MUN Leader &amp; Technologist</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-3 mb-6"
          >
            <span className="font-mono text-[10px] md:text-xs text-amber-500 border border-amber-900/50 bg-amber-950/20 px-3 py-1 rounded-sm uppercase tracking-widest">Aspiring Commercial Pilot</span>
            <span className="font-mono text-[10px] md:text-xs text-cyan-500 border border-cyan-900/50 bg-cyan-950/20 px-3 py-1 rounded-sm uppercase tracking-widest">Student Leader</span>
            <span className="font-mono text-[10px] md:text-xs text-cyan-500 border border-cyan-900/50 bg-cyan-950/20 px-3 py-1 rounded-sm uppercase tracking-widest">Technology Enthusiast</span>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-sans text-xl md:text-2xl text-gray-300 mb-12 font-light max-w-lg leading-relaxed"
          >
            Building a future between technology, creativity, diplomacy, and aviation.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center gap-4 md:gap-6"
          >
            <button 
              onClick={() => handleScroll('about')}
              className="group relative px-6 py-3 bg-cyan-500 text-black font-bold tracking-widest uppercase text-xs hover:bg-white transition-all rounded-sm flex items-center gap-2"
            >
              Explore My Journey
              <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
            </button>
            
            <button 
              onClick={() => handleScroll('contact')}
              className="group relative px-6 py-3 border border-cyan-500 text-cyan-500 font-bold tracking-widest uppercase text-xs hover:bg-cyan-500/10 transition-colors rounded-sm flex items-center gap-2"
            >
              Contact Me
              <Target className="w-4 h-4" />
            </button>
            
            <a 
              href="/Abbas_Dawood_Resume.pdf"
              download="Abbas_Dawood_Resume.pdf"
              onClick={playClickSound}
              className="group flex items-center gap-2 px-6 py-3 border border-transparent text-gray-400 font-bold tracking-widest uppercase text-xs hover:text-white transition-colors cursor-pointer"
            > 
              <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              Download CV
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
          <div className="relative w-full max-w-md aspect-square rounded-full border-[0.5px] border-cyan-900/30 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.1),transparent_70%)]">
            
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
               <circle cx="50%" cy="50%" r="48%" fill="none" stroke="rgba(245,158,11,0.2)" strokeWidth="0.5" strokeDasharray="20 40 10 40" />
            </motion.svg>

            {/* Radar Sweep */}
            <motion.div 
               className="absolute top-[50%] left-[50%] w-[50%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-cyan-400 origin-left"
               animate={{ rotate: 360 }}
               transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
               <div className="absolute top-0 right-0 w-24 h-24 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(6,182,212,0.2)_90deg,transparent_90deg)] opacity-50 origin-bottom-left -translate-y-full -translate-x-full rotate-90" />
            </motion.div>
            
            {/* Overlay Data Tags */}
            <div className="absolute top-[15%] left-[15%] text-left">
              <p className="font-mono text-[9px] text-cyan-600 tracking-widest">TRAJECTORY</p>
              <p className="font-mono text-xs text-white">SET</p>
            </div>
            
            <div className="absolute top-[15%] right-[15%] text-right bg-black/40 backdrop-blur-md px-3 py-1 border border-cyan-900/50 rounded-sm">
              <p className="font-mono text-[9px] text-amber-400 mb-1 tracking-widest">PHASE</p>
              <p className="font-space text-sm font-bold tracking-widest text-white whitespace-nowrap">ASCENT</p>
            </div>
            
            <div className="absolute bottom-[20%] left-[10%] text-left bg-black/40 backdrop-blur-md px-3 py-1 border border-cyan-900/50 rounded-sm">
              <p className="font-mono text-[9px] text-cyan-400 mb-1 tracking-widest">SYSTEM</p>
              <p className="font-space text-sm font-bold tracking-widest text-white whitespace-nowrap">NOMINAL</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
