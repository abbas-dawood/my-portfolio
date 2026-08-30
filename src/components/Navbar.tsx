import React from "react";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Plane } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/sound';

const navLinks = [
  { name: 'ABOUT', href: '#about' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'MUN & DIPLOMACY', href: '#mun' },
  { name: 'EDUCATION', href: '#education' },
  { name: 'CERTIFICATION', href: '#certifications' },
  { name: 'INTERESTS', href: '#interests' },
  { name: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    navLinks.forEach((link) => {
      if (link.href.startsWith('#')) {
        const el = document.querySelector(link.href);
        if (el) observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playClickSound();
    setMobileMenuOpen(false);
    
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#020617]/90 backdrop-blur-md border-b border-cyan-900/30 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        
        {/* Brand */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home')}
          onMouseEnter={playHoverSound}
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 flex items-center justify-center border border-cyan-500/50 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-colors rounded-sm">
            <Plane className="w-4 h-4" />
          </div>
          <span className="font-space font-bold tracking-widest text-white uppercase text-sm">
            A. Dawood
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              onMouseEnter={playHoverSound}
              className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-all relative pb-1 ${
                activeSection === link.href 
                  ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] border-b-2 border-cyan-400' 
                  : 'text-gray-400 hover:text-cyan-400'
              }`}
            >
              {link.name}
            </a>
          ))}
          
          <a
            href="/Abbas_Dawood_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-black bg-cyan-500 hover:bg-white px-4 py-2 rounded-sm transition-colors ml-2"
          >
            VIEW CV
          </a>
          <a
            href="/Abbas_Dawood_Resume.pdf"
            download
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-500 border border-cyan-500 hover:bg-cyan-500/10 px-4 py-2 rounded-sm transition-colors ml-2"
          >
            DOWNLOAD
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => { playClickSound(); setMobileMenuOpen(!mobileMenuOpen); }}
          className="lg:hidden text-cyan-500"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#020617] border-b border-cyan-900/30 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-mono text-xs uppercase tracking-[0.2em] transition-colors block py-2 border-b ${
                    activeSection === link.href 
                      ? 'text-cyan-400 border-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]' 
                      : 'text-gray-400 hover:text-cyan-400 border-cyan-900/20'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="/Abbas_Dawood_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { playClickSound(); setMobileMenuOpen(false); }}
                className="font-mono text-xs uppercase tracking-[0.2em] text-black bg-cyan-500 hover:bg-white text-center py-3 rounded-sm transition-colors mt-2"
              >
                VIEW CV
              </a>
              <a
                href="/Abbas_Dawood_Resume.pdf"
                download
                onClick={() => { playClickSound(); setMobileMenuOpen(false); }}
                className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-500 border border-cyan-500 hover:bg-cyan-500/10 text-center py-3 rounded-sm transition-colors mt-2"
              >
                DOWNLOAD CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
