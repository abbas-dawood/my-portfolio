import { motion } from 'motion/react';
import { Plane } from 'lucide-react';
import { cn } from '../utils/cn';
import { playClickSound } from '../utils/sound';

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const navItems = ['Home', 'About', 'Skills', 'Resume', 'Contact'];

  const handleScroll = (id: string) => {
    playClickSound();
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="fixed top-0 inset-x-0 z-50 h-20 bg-[#020617]/50 backdrop-blur-sm border-b border-cyan-900/30 px-6"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-full flex items-center justify-between">
        
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
        <button onClick={playClickSound} className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none">
          <span className="w-6 h-[1px] bg-cyan-500 block" />
          <span className="w-4 h-[1px] bg-cyan-500 block ml-auto" />
          <span className="w-6 h-[1px] bg-cyan-500 block" />
        </button>

      </div>
    </motion.nav>
  );
}
