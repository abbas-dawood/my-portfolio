import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import Navbar from './Navbar';
import HUDOverlay from './HUDOverlay';
import CustomCursor from './CustomCursor';
import Background from './Background';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Experience from './Experience';
import MunDiplomacy from './MunDiplomacy';
import Leadership from './Leadership';
import Education from './Education';
import Hobbies from './Hobbies';
import Certifications from './Certifications';
import Contact from './Contact';
import Footer from './Footer';
import BootSequence from './BootSequence';

export default function Portfolio() {
  const [bootComplete, setBootComplete] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      <AnimatePresence>
        {!bootComplete && <BootSequence onComplete={() => setBootComplete(true)} />}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: bootComplete ? 1 : 0 }}
        transition={{ duration: 1 }}
        style={{ pointerEvents: bootComplete ? 'auto' : 'none', height: bootComplete ? 'auto' : '100vh', overflow: bootComplete ? 'visible' : 'hidden' }}
      >
        <CustomCursor />
        <Background />
        <HUDOverlay />
        
        {/* Top Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] bg-cyan-500 origin-left z-50 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
          style={{ scaleX }}
        />
        
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <MunDiplomacy />
          <Leadership />
          <Education />
          <Certifications />
          <Hobbies />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </div>
  );
}
