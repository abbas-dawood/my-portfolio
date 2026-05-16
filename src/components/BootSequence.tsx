import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { cn } from '../utils/cn';

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  
  const bootLogs = [
    "INITIALIZING AVIONICS...",
    "LOADING CORE SYSTEMS [OK]",
    "ESTABLISHING SECURE CONNECTION...",
    "CALIBRATING NAVIGATION SENSORS...",
    "FLIGHT CONTROL SYSTEMS ONLINE.",
    "USER IDENTITY VERIFIED: ABBAS DAWOOD",
    "ALTITUDE SYSTEM READY."
  ];

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 8;
      if (currentProgress > 100) currentProgress = 100;
      setProgress(currentProgress);
      
      const logIndex = Math.floor((currentProgress / 100) * bootLogs.length);
      setLogs(bootLogs.slice(0, logIndex + 1));
      
      if (currentProgress === 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 1500); // Wait for exit animation
        }, 800);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020617] text-cyan-500 font-mono overflow-hidden"
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-grid-cyan opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]" />

          <div className="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-4xl font-bold tracking-[0.2em] mb-12 text-center"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              ABBAS ALTITUDE SYSTEM BOOT
            </motion.h1>

            {/* Progress Circle & Text */}
            <div className="relative w-48 h-48 flex items-center justify-center mb-12">
              <svg className="w-full h-full -rotate-90">
                <circle 
                  cx="96" cy="96" r="88" 
                  className="stroke-cyan-900/40 fill-none" 
                  strokeWidth="2" 
                />
                <motion.circle 
                  cx="96" cy="96" r="88" 
                  className="stroke-cyan-500 fill-none drop-shadow-[0_0_8px_#06b6d4]" 
                  strokeWidth="4"
                  strokeDasharray="552.92" // 2 * pi * 88
                  strokeDashoffset={552.92 - (552.92 * progress) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-bold tracking-wider">
                  {Math.round(progress)}<span className="text-xl">%</span>
                </span>
                <span className="text-xs text-cyan-600 tracking-widest mt-1">SYS LOAD</span>
              </div>
            </div>

            {/* Logs Window */}
            <div className="w-full bg-cyan-950/20 border border-cyan-800/50 p-4 rounded bg-clip-padding backdrop-filter backdrop-blur-sm h-40 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-b from-cyan-500/20 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-[#020617] to-transparent z-10" />
              <div className="flex flex-col space-y-2 justify-end h-full text-sm">
                {logs.map((log, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center space-x-2"
                  >
                    <span className="text-cyan-500">{'>'}</span>
                    <span className={cn(i === logs.length - 1 ? "text-white" : "text-cyan-600 drop-shadow-[0_0_2px_rgba(6,182,212,0.4)]")}>
                      {log}
                    </span>
                  </motion.div>
                ))}
                {progress < 100 && (
                  <motion.div 
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="flex items-center space-x-2 text-cyan-500 mt-2"
                  >
                    <span>{'>'}</span><span className="w-3 h-4 bg-cyan-500 block"></span>
                  </motion.div>
                )}
              </div>
            </div>
            
            <div className="mt-8 text-cyan-600/60 text-xs tracking-[0.3em] flex gap-8">
              <span>LAT: 24.5854° N</span>
              <span>LON: 73.7125° E</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
