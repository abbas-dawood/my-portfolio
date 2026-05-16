import { motion } from 'motion/react';
import { Github, Linkedin, Instagram, ArrowUp } from 'lucide-react';
import { playClickSound } from '../utils/sound';

export default function Footer() {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020617] border-t border-cyan-900/30 py-8 lg:py-12 mt-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Back to top button */}
        <div className="order-2 md:order-1 flex-shrink-0">
          <button 
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-400 flex items-center justify-center text-white cursor-pointer transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        </div>

        {/* Text content */}
        <div className="order-3 md:order-2 flex flex-col items-center text-center space-y-2">
          <p className="text-gray-400 font-sans text-sm">
            © 2026 Abbas Dawood. Built with passion for innovation.
          </p>
          <p className="text-gray-500 font-serif italic text-sm">
            "The best way to predict the future is to create it."
          </p>
        </div>

        {/* Social Icons */}
        <div className="order-1 md:order-3 flex items-center gap-4 flex-shrink-0">
          <a 
            href="https://github.com/abbas-dawood" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={playClickSound}
            className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors cursor-pointer"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="https://www.linkedin.com/in/abbas-dawood/" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={playClickSound}
            className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors cursor-pointer"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a 
            href="https://www.instagram.com/abbasdawood_07/" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={playClickSound}
            className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors cursor-pointer"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
        
      </div>
    </footer>
  );
}
