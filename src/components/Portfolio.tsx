import { useState, useEffect } from 'react';
import BootSequence from './BootSequence';
import Background from './Background';
import CustomCursor from './CustomCursor';
import Navbar from './Navbar';
import HUDOverlay from './HUDOverlay';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Resume from './Resume';
import Contact from './Contact';
import Footer from './Footer';

export default function Portfolio() {
  const [bootComplete, setBootComplete] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'resume', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    if (bootComplete) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [bootComplete]);

  return (
    <>
      <CustomCursor />
      
      {!bootComplete && (
        <BootSequence onComplete={() => setBootComplete(true)} />
      )}

      {bootComplete && (
        <div className="relative text-white selection:bg-cyan-500/30 font-sans">
          <Background />
          <HUDOverlay />
          <Navbar activeSection={activeSection} />
          
          <main className="relative z-10 w-full overflow-hidden">
            <Hero />
            <About />
            <Skills />
            <Resume />
            <Contact />
          </main>
          
          <Footer />
        </div>
      )}
    </>
  );
}
