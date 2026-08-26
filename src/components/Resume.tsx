import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef } from 'react';
import { Download, Award, GraduationCap, Briefcase, Globe, Target, Terminal, ChevronRight, MapPin } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/sound.ts';
import { cn } from '../utils/cn.ts';

export default function Resume() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const experiences = [
    {
      id: "EXP_01",
      role: "Model United Nations",
      org: "MUN Participant",
      date: "November 2022 — Present",
      points: [
        "Represented assigned nations in structured multilateral debates on global diplomacy and policy issues.",
        "Cultivated advanced public speaking, negotiation, and persuasive communication skills.",
        "Practiced composed, rational decision-making while navigating high-pressure debate scenarios."
      ]
    },
    {
      id: "EXP_02",
      role: "Independent Technology & Innovation Initiative",
      org: "Self-Directed",
      date: "April 2021 — Present",
      points: [
        "Spearheaded independent research into emerging technologies, digital tools, and innovation research.",
        "Managed self-directed projects end-to-end, applying structured problem-solving.",
        "Analyzed startup ecosystem research.",
        "Applied design tools (Figma, Canva) and video editing to independently plan and produce creative digital projects."
      ]
    },
    {
      id: "EXP_03",
      role: "IMUN",
      org: "Campus Ambassador & Social Media Marketing Internship",
      date: "Timeline Undisclosed",
      points: [
        "Represented IMUN as a Campus Ambassador, promoting global diplomacy and awareness.",
        "Managed social media marketing initiatives to increase engagement and outreach."
      ]
    },
    {
      id: "EXP_04",
      role: "SASSY'26",
      org: "Executive Board Member / Rapporteur",
      date: "August 2026",
      points: [
        "Education Ministry of India (Senior) at St. Anthony's Students Summit by YUVA, Udaipur."
      ]
    },
    {
      id: "EXP_05",
      role: "IDC MUN 2026 — Chapter 1",
      org: "Organiser",
      date: "2026",
      points: [
        "Organised and coordinated the Chapter 1 conference in Jaipur."
      ]
    }
  ];

  const education = [
    {
      id: "EDU_01",
      role: "Senior Secondary Education — PCM",
      org: "National Institute of Open Schooling (NIOS)",
      loc: "Udaipur, Rajasthan",
      date: "Expected May 2027",
    },
    {
      id: "EDU_02",
      role: "Secondary Education — PCM Stream",
      org: "Delhi Public School, Udaipur",
      loc: "Udaipur, Rajasthan",
      date: "March 2020 — March 2026",
    }
  ];

  const recognition = [
    {
      id: "REC_01",
      title: "Eureka! Junior 2025",
      org: "Entrepreneurship Program, E-Cell, IIT Bombay",
      date: "December 2025"
    }
  ];

  const diplomaticLogs = [
    { role: "IP Member", conf: "DPS Udaipur MUN" },
    { role: "Participant", conf: "IMUN, India" },
    { role: "Participant", conf: "Mock Parliament, Jaipur" },
    { role: "OC Member", conf: "DPS MUN 2024" },
    { role: "Lok Sabha", conf: "RYCMUN 2025" },
    { role: "CCC", conf: "Sangam MUN 2025" },
    { role: "AIIMP", conf: "IIT Bombay 2025" },
    { role: "Participant", conf: "Delhi Mock Parliament" },
    { role: "Lok Sabha", conf: "Sangam MUN 2026" },
    { role: "Multiple Conferences", conf: "Mumbai MUN Circuit", desc: "Attended multiple MUN conferences in Mumbai." },
    { role: "Various Committees", conf: "Online MUN Experience", desc: "UNGA, UNHRC, IPL, and other online committees." }
  ];

  const debates = [
    "School Debates",
    "Tark Vitrak",
    "IDC",
    "Baithke",
    "Charchaar",
    "Mock Parliament",
    "Parliamentary formats"
  ];

  return (
    <section id="resume" className="relative min-h-screen py-24 border-t border-cyan-900/30" ref={containerRef}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-[#020617] pointer-events-none" />
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-900/30 to-transparent -translate-x-1/2 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full z-10 relative">
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <h2 className="font-space text-3xl md:text-5xl font-bold mb-4">
              <span className="text-cyan-500">03. </span>
              <span className="glitch-text" data-text="Flight Log">Flight Log</span>
            </h2>
            <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase">
              // The Journey So Far
            </p>
          </div>
          <button 
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
            className="group relative px-6 py-3 bg-transparent border border-cyan-500 text-cyan-400 font-mono text-sm uppercase tracking-widest hover:bg-cyan-500 hover:text-black transition-all rounded-sm flex items-center gap-3 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Resume
            </span>
            <div className="absolute inset-0 bg-cyan-400 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>
        </div>

        {/* EXPERIENCE SECTION */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <Briefcase className="text-cyan-500 w-6 h-6" />
            <h3 className="font-space text-2xl font-bold text-white tracking-widest uppercase">Experience</h3>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-cyan-900/50 to-transparent ml-4" />
          </div>

          <div className="relative border-l-2 border-cyan-900/50 pl-8 md:pl-12 space-y-16 ml-2 md:ml-4">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 rounded-full bg-[#020617] border-2 border-cyan-500 group-hover:bg-cyan-500 group-hover:shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-all duration-300" />
                <div className="absolute -left-[34px] md:-left-[50px] top-3 w-8 h-[1px] bg-cyan-900/50 group-hover:bg-cyan-500/50 transition-colors duration-300" />

                <div className="bg-[#0B1121] border border-cyan-900/30 p-6 md:p-8 rounded-sm hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.05)] transition-all duration-500 group-hover:-translate-y-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div>
                      <h4 className="font-space text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{exp.role}</h4>
                      <p className="font-mono text-sm text-amber-500/80 mt-1">{exp.org}</p>
                    </div>
                    <div className="font-mono text-xs text-cyan-600/70 bg-cyan-950/30 px-3 py-1 rounded-sm border border-cyan-900/50 whitespace-nowrap self-start md:self-auto">
                      {exp.date}
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mt-6">
                    {exp.points.map((point, i) => (
                      <li key={i} className="text-gray-400 font-sans text-sm leading-relaxed flex items-start gap-3">
                        <ChevronRight className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* DIPLOMATIC FLIGHT LOG */}
        <div className="mb-32 relative">
           <div className="absolute inset-0 bg-[#06b6d4]/5 blur-[100px] pointer-events-none" />
           <div className="relative z-10 bg-[#0B1121] border border-cyan-500/30 p-8 md:p-12 rounded-sm shadow-[inset_0_0_40px_rgba(6,182,212,0.05)]">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-cyan-900/50 pb-8">
               <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Globe className="text-amber-500 w-6 h-6 animate-pulse" />
                    <span className="font-mono text-xs text-amber-500 tracking-widest">MISSION CONTROL</span>
                  </div>
                  <h3 className="font-space text-3xl font-bold text-white tracking-widest uppercase mb-2">Diplomatic Flight Log</h3>
                  <p className="font-mono text-sm text-cyan-400/70">15+ MUN & Parliamentary Experiences</p>
               </div>
               <div className="flex gap-4">
                  <div className="bg-[#020617] border border-cyan-900/50 p-4 rounded-sm text-center min-w-[100px]">
                     <div className="font-space text-2xl font-bold text-cyan-400">15+</div>
                     <div className="font-mono text-[9px] text-gray-500 tracking-widest mt-1">MISSIONS</div>
                  </div>
                  <div className="bg-[#020617] border border-amber-900/50 p-4 rounded-sm text-center min-w-[100px]">
                     <div className="font-space text-2xl font-bold text-amber-400">EB</div>
                     <div className="font-mono text-[9px] text-gray-500 tracking-widest mt-1">LEADERSHIP</div>
                  </div>
               </div>
             </div>

             {/* SASSY'26 Spotlight */}
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12 bg-gradient-to-br from-[#020617] to-[#0a192f] border border-amber-500/30 p-6 md:p-8 rounded-sm relative overflow-hidden group"
             >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[50px] group-hover:bg-amber-500/20 transition-all duration-700" />
                <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
                   <div>
                      <h4 className="font-space text-2xl font-bold text-amber-400 mb-1">SASSY'26</h4>
                      <p className="font-mono text-sm text-gray-300">EXECUTIVE BOARD MEMBER / RAPPORTEUR</p>
                      <p className="font-sans text-xs text-gray-400 mt-2">Education Ministry of India (Senior)</p>
                   </div>
                   <div className="text-left md:text-right">
                      <p className="font-mono text-xs text-amber-500/70">St. Anthony's Students Summit by YUVA</p>
                      <p className="font-mono text-xs text-gray-500 mt-1">Udaipur • August 2026</p>
                   </div>
                </div>
                
                <div className="border-t border-amber-900/30 pt-6">
                   <p className="font-mono text-[10px] text-amber-500 tracking-widest mb-4 flex items-center gap-2">
                     <Target className="w-3 h-3" /> MISSION DETAILS
                   </p>
                   <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                     {[
                       "Assisting the Main Speaker/Deputy Speaker",
                       "Moderating committee sessions",
                       "Maintaining committee proceedings",
                       "Attendance & Speakers' lists",
                       "Motions & Voting records where applicable",
                       "Guiding delegates on Rules of Procedure",
                       "Coordinating with Executive Board and organising team",
                       "Supporting an inclusive committee environment"
                     ].map((detail, idx) => (
                       <li key={idx} className="flex items-start gap-2 font-sans text-sm text-gray-300">
                          <span className="text-amber-500/50 mt-1 text-[10px]">■</span>
                          {detail}
                       </li>
                     ))}
                   </ul>
                </div>
             </motion.div>

             {/* Diplomatic Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
               {diplomaticLogs.map((log, idx) => (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.05 }}
                   className="bg-[#020617] border border-cyan-900/30 p-4 rounded-sm hover:border-cyan-500/50 transition-colors flex flex-col justify-center"
                 >
                   <p className="font-space font-bold text-white text-sm mb-1">{log.conf}</p>
                   <p className="font-mono text-[10px] text-cyan-500 tracking-widest uppercase">{log.role}</p>
                   {log.desc && <p className="font-sans text-xs text-gray-500 mt-2">{log.desc}</p>}
                 </motion.div>
               ))}
             </div>

             {/* Debate & Parliamentary */}
             <div className="border-t border-cyan-900/50 pt-8">
                <h4 className="font-mono text-sm text-cyan-400 tracking-widest mb-6">DEBATE & PARLIAMENTARY SPEAKING</h4>
                <div className="flex flex-wrap gap-3">
                   {debates.map((debate, idx) => (
                     <span key={idx} className="bg-cyan-950/20 border border-cyan-900/50 px-3 py-1.5 rounded-sm font-sans text-xs text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors cursor-default">
                       {debate}
                     </span>
                   ))}
                </div>
             </div>
           </div>
        </div>

        {/* EDUCATION & RECOGNITION ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* EDUCATION */}
          <div>
            <div className="flex items-center gap-4 mb-12">
              <GraduationCap className="text-cyan-500 w-6 h-6" />
              <h3 className="font-space text-2xl font-bold text-white tracking-widest uppercase">Education</h3>
              <div className="h-[1px] flex-grow bg-gradient-to-r from-cyan-900/50 to-transparent ml-4" />
            </div>

            <div className="space-y-8">
              {education.map((edu, idx) => (
                <motion.div 
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#0B1121] border border-cyan-900/30 p-6 md:p-8 rounded-sm hover:border-cyan-500/30 transition-colors"
                >
                  <h4 className="font-space text-lg font-bold text-white mb-1">{edu.org}</h4>
                  <p className="font-sans text-sm text-cyan-400 font-medium mb-4">{edu.role}</p>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 font-mono text-xs text-gray-500">
                    <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> {edu.loc}</span>
                    <span className="bg-black/30 px-2 py-1 rounded-sm border border-gray-800">{edu.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RECOGNITION */}
          <div>
            <div className="flex items-center gap-4 mb-12">
              <Award className="text-cyan-500 w-6 h-6" />
              <h3 className="font-space text-2xl font-bold text-white tracking-widest uppercase">Recognition</h3>
              <div className="h-[1px] flex-grow bg-gradient-to-r from-cyan-900/50 to-transparent ml-4" />
            </div>

            <div className="space-y-8">
              {recognition.map((rec, idx) => (
                <motion.div 
                  key={rec.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#0B1121] border border-amber-900/30 p-6 md:p-8 rounded-sm hover:border-amber-500/30 transition-colors group"
                >
                  <div className="w-10 h-10 bg-amber-500/10 rounded-sm flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-colors">
                    <Award className="w-5 h-5 text-amber-500" />
                  </div>
                  <h4 className="font-space text-lg font-bold text-white mb-2">{rec.title}</h4>
                  <p className="font-sans text-sm text-gray-400 leading-relaxed mb-4">{rec.org}</p>
                  <div className="inline-block font-mono text-xs text-amber-500/70 bg-amber-950/20 px-2 py-1 rounded-sm border border-amber-900/30">
                    {rec.date}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
