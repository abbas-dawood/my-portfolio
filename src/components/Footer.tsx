import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { playClickSound } from '../utils/sound';
import SocialLinks from './SocialLinks';

export default function Footer() {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 bg-[#020617] border-t border-cyan-900/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-4">
          <button 
            onClick={scrollToTop}
            className="w-10 h-10 border border-cyan-900/50 flex items-center justify-center text-cyan-500 hover:bg-cyan-500 hover:text-black transition-colors rounded-sm"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <div>
            <p className="font-space font-bold text-white uppercase">Abbas Dawood</p>
            <p className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">© {new Date().getFullYear()} All Rights Reserved</p>
          </div>
        </div>
        
        <SocialLinks showLabels={false} />
      </div>
    </footer>
  );
}
