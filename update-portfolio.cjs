const fs = require('fs');
let code = fs.readFileSync('src/components/Portfolio.tsx', 'utf8');

const target = `  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {!bootComplete && <BootSequence onComplete={() => setBootComplete(true)} />}
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
        <Education />
        <MunDiplomacy />
        <Leadership />
        <Hobbies />
        <Certifications />
        <ResumeSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );`;

const replacement = `  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {!bootComplete ? (
        <BootSequence onComplete={() => setBootComplete(true)} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
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
            <Education />
            <MunDiplomacy />
            <Leadership />
            <Hobbies />
            <Certifications />
            <ResumeSection />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  );`;

code = code.replace(target, replacement);
fs.writeFileSync('src/components/Portfolio.tsx', code);
