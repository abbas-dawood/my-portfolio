import { motion } from 'motion/react';
import { Download } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/sound';

export default function Resume() {
  const experiences = [
    {
      id: "EXP_01",
      role: "Tech Research & Self-Learning",
      org: "Independent",
      date: "April 2021 – Present",
      points: [
        "Conducted independent research on emerging technologies, digital tools, and innovation trends.",
        "Built small projects and experimented with ideas to strengthen practical knowledge.",
        "Learned programming fundamentals including HTML, CSS, JavaScript, and Python.",
        "Explored concepts related to startups and 'Make-in-India' innovation."
      ]
    },
    {
      id: "EXP_02",
      role: "Participant & Debater",
      org: "Model United Nations",
      date: "November 2022 – Present",
      points: [
        "Participated in Model United Nations conferences representing different countries.",
        "Developed communication, negotiation, and public speaking skills.",
        "Engaged in structured debates on global issues and diplomacy."
      ]
    }
  ];

  const education = [
    {
      id: "EDU_01",
      role: "Senior Secondary (Class 12 - PCM)",
      org: "National Institute of Open Schooling (NIOS)",
      date: "Expected May 2027",
      points: [
        "Building strong analytical and problem-solving skills.",
        "Actively exploring technology and innovation alongside academics."
      ]
    },
    {
      id: "EDU_02",
      role: "Secondary Education",
      org: "Delhi Public School (DPS)",
      date: "March 2020 – March 2026",
      points: [
        "Completed schooling from Class 6 to 11.",
        "Studied core subjects including Physics, Chemistry, Mathematics, and Computer Science."
      ]
    }
  ];

  return (
    <section id="resume" className="relative min-h-screen py-24 border-t border-cyan-900/30">
      <div className="absolute left-1/2 md:left-[20%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-900/40 to-transparent -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full z-10 relative">
        <div className="mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="font-space text-3xl md:text-5xl font-bold mb-4">
              <span className="text-cyan-500">03. </span>
              <span className="glitch-text" data-text="A Snapshot Of My Journey">A Snapshot Of My Journey</span>
            </h2>
            <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase">
              // Timeline • Milestones • Education
            </p>
          </div>
          
          <a 
            href="/Abbas_Dawood_Resume.pdf" 
            target="_blank"
            onClick={playClickSound}
            rel="noopener noreferrer"
            className="group relative flex items-center gap-3 px-8 py-4 bg-black/20 border border-cyan-500 text-cyan-500 font-bold uppercase tracking-widest text-xs hover:bg-cyan-500/10 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            <span>RETRIEVE CV</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 relative pl-8 md:pl-0">
          
          {/* Experience Column */}
          <div className="space-y-16 mt-12 md:pl-32">
            <h3 className="font-mono text-xl text-white tracking-widest flex items-center gap-4 relative">
               <span className="absolute -left-8 md:-left-32 w-4 h-4 rounded-full bg-[#020617] border-2 border-cyan-500 z-10" />
               <span className="text-cyan-500 font-bold">///</span> Experience
            </h3>
            
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative">
                {/* Timeline connector dot and line */}
                <div className="absolute -left-8 md:-left-[8.5rem] top-10 w-2 h-2 rounded-full border border-cyan-500 bg-[#020617] z-10 group-hover:bg-cyan-400 transition-colors" />
                <div className="absolute -left-6 md:-left-[8rem] top-10 w-6 md:w-[8rem] h-[1px] bg-cyan-900/50 group-hover:bg-cyan-500/50 transition-colors" />

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  onMouseEnter={playHoverSound}
                  onClick={playClickSound}
                  className="relative group p-6 sm:p-8 mb-12 bg-[#0B1121] border border-cyan-500/30 rounded-sm shadow-[inset_0_0_20px_rgba(6,182,212,0.05)] hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.15),inset_0_0_30px_rgba(6,182,212,0.1)] transition-all duration-500 overflow-hidden cursor-pointer"
                >
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  
                  <div className="relative z-20">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-cyan-900/30 pb-4">
                      <div>
                        <h4 className="font-space text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{exp.role}</h4>
                        <p className="font-sans text-xs sm:text-sm text-gray-500 tracking-wider uppercase mt-1">{exp.org}</p>
                      </div>
                      <p className="font-mono text-xs text-cyan-500 bg-cyan-950/30 px-3 py-1 rounded-sm border border-cyan-900/50 w-fit">{exp.date}</p>
                    </div>
                    
                    <ul className="space-y-3">
                      {exp.points.map((point, i) => (
                        <li key={i} className="font-sans text-sm text-gray-400/80 font-light flex items-start gap-3">
                          <span className="text-cyan-500/50 mt-1 text-[10px]">▹</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Education Column */}
          <div className="space-y-16 mt-12 md:pl-16">
            <h3 className="font-mono text-xl text-white tracking-widest flex items-center gap-4 relative">
               <span className="absolute -left-8 md:-left-[4.5rem] w-4 h-4 rounded-full bg-[#020617] border-2 border-cyan-500 z-10 hidden md:block" />
               <span className="text-cyan-500 font-bold">///</span> Education
            </h3>
            
            {education.map((edu, index) => (
              <div key={edu.id} className="relative">
                {/* Timeline connector dot and line */}
                <div className="absolute -left-8 md:-left-[4.5rem] top-10 w-2 h-2 rounded-full border border-cyan-500 bg-[#020617] z-10 group-hover:bg-cyan-400 transition-colors hidden md:block" />
                <div className="absolute -left-6 md:-left-[4rem] top-10 w-6 md:w-[4rem] h-[1px] bg-cyan-900/50 group-hover:bg-cyan-500/50 transition-colors hidden md:block" />

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  onMouseEnter={playHoverSound}
                  onClick={playClickSound}
                  className="relative group p-6 sm:p-8 mb-12 bg-[#0B1121] border border-cyan-500/30 rounded-sm shadow-[inset_0_0_20px_rgba(6,182,212,0.05)] hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.15),inset_0_0_30px_rgba(6,182,212,0.1)] transition-all duration-500 overflow-hidden cursor-pointer"
                >
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  
                  <div className="relative z-20">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-cyan-900/30 pb-4">
                      <div>
                        <h4 className="font-space text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{edu.role}</h4>
                        <p className="font-sans text-xs sm:text-sm text-gray-500 tracking-wider uppercase mt-1">{edu.org}</p>
                      </div>
                      <p className="font-mono text-xs text-cyan-500 bg-cyan-950/30 px-3 py-1 rounded-sm border border-cyan-900/50 w-fit">{edu.date}</p>
                    </div>
                    
                    <ul className="space-y-3">
                      {edu.points.map((point, i) => (
                        <li key={i} className="font-sans text-sm text-gray-400/80 font-light flex items-start gap-3">
                          <span className="text-cyan-500/50 mt-1 text-[10px]">▹</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
