import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, X } from 'lucide-react';
import { cn } from '../utils/cn';
import { playClickSound } from '../utils/sound';

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = ['Home', 'About', 'Skills', 'Resume', 'Contact'];

  const handleScroll = (id: string) => {
    playClickSound();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="fixed top-0 inset-x-0 z-[60] h-20 bg-[#020617]/50 backdrop-blur-sm border-b border-cyan-900/30 px-6"
      >
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          
          {/* Logo Area */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => handleScroll('home')}>
            <div className="relative w-10 h-10 flex items-center justify-center border border-cyan-500/30 rounded bg-cyan-950/20">
              <Plane className="w-5 h-5 text-cyan-400 rotate-45" />
              <motion.div 
                className="absolute inset-0 border border-cyan-400 rounded"
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-space text-lg font-bold tracking-widest text-white">ABBAS</span>
              <span className="font-mono text-[9px] tracking-[0.2em] text-cyan-500 uppercase">Aviation • Digital Identity</span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
               <button
                 key={item}
                 onClick={() => handleScroll(item)}
                 className="group relative font-mono text-xs tracking-widest uppercase py-2 cursor-pointer transition-colors"
               >
                 <span className={cn(
                   "transition-colors duration-300", 
                   activeSection === item.toLowerCase() ? "text-cyan-400" : "text-gray-400 group-hover:text-white"
                 )}>
                   {item}
                 </span>
                 {activeSection === item.toLowerCase() && (
                   <motion.div 
                     layoutId="nav-indicator"
                     className="absolute -bottom-1 left-0 right-0 h-[1px] bg-cyan-400"
                     initial={false}
                     transition={{ type: "spring", stiffness: 300, damping: 30 }}
                   />
                 )}
               </button>
            ))}
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            onClick={() => {
              playClickSound();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }} 
            className="md:hidden flex items-center justify-center w-10 h-10 focus:outline-none z-[60]"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-cyan-400" />
            ) : (
              <div className="flex flex-col gap-1.5 w-6">
                <span className="w-full h-[1px] bg-cyan-500 block" />
                <span className="w-4 h-[1px] bg-cyan-500 block ml-auto" />
                <span className="w-full h-[1px] bg-cyan-500 block" />
              </div>
            )}
          </button>

        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-[#020617]/95 backdrop-blur-md pt-24 px-6 md:hidden flex flex-col items-center justify-center border-b border-cyan-900/50"
          >
            <div className="flex flex-col items-center gap-8 w-full max-w-sm">
              {navItems.map((item, index) => (
                <motion.button
                  key={item}
                  custom={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleScroll(item)}
                  className="relative group w-full flex flex-col items-center py-4"
                >
                  <span className={cn(
                    "font-space text-2xl tracking-widest uppercase transition-colors duration-300", 
                    activeSection === item.toLowerCase() ? "text-cyan-400 font-bold" : "text-gray-400 group-hover:text-white"
                  )}>
                    {item}
                  </span>
                  <span className="font-mono text-[10px] text-cyan-800 mt-1 uppercase">// {String(index + 1).padStart(2, '0')}</span>
                  
                  {/* Decorative underline */}
                  <div className={cn(
                    "h-[1px] bg-cyan-500/50 transition-all duration-300 mt-2",
                    activeSection === item.toLowerCase() ? "w-1/2" : "w-0 group-hover:w-1/4"
                  )} />
                </motion.button>
              ))}
            </div>

            {/* HUD Decoration */}
            <div className="mt-auto pb-12 opacity-30 flex gap-4 pointer-events-none">
               <svg width="40" height="40">
                <rect x="0" y="0" width="40" height="40" fill="none" stroke="currentColor" className="text-cyan-500" strokeWidth="1" strokeDasharray="2 4" />
                <rect x="10" y="10" width="20" height="20" fill="currentColor" className="text-cyan-500" opacity="0.5" />
              </svg>
              <div className="font-mono text-[10px] text-cyan-500 flex items-end">
                <span>STATUS: READY</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
