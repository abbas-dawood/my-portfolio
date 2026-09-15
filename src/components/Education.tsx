import { motion, useScroll, useTransform } from 'motion/react';
import { BookOpen, Plane } from 'lucide-react';
import { useRef } from 'react';

const educationData = [
  {
    institution: 'National Institute of Open Schooling (NIOS)',
    location: 'Udaipur, Rajasthan',
    date: 'Expected May 2027',
    degree: 'Senior Secondary Education — Physics, Chemistry, Mathematics (PCM)',
    bullets: [
      'Pursuing a rigorous PCM curriculum, building strong analytical and quantitative reasoning skills essential for flight training and technical decision-making',
      'Balances demanding academics with active extracurricular leadership through MUN participation',
      'Cultivates disciplined, self-directed study habits reflective of the structure required in aviation training environments'
    ]
  },
  {
    institution: 'Delhi Public School (DPS)',
    location: 'Udaipur, Rajasthan',
    date: 'March 2020 – March 2026',
    degree: 'Secondary Education, PCM Stream',
    bullets: [
      'Completed foundational schooling (Class 6–11) across Physics, Chemistry, Mathematics, and Computer Science',
      'Developed core analytical thinking and teamwork skills through collaborative academic projects',
      'Engaged consistently in extracurricular activities, including Model United Nations, alongside core studies'
    ]
  }
];

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const planeY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="education" className="relative py-16 md:py-24 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <BookOpen className="text-cyan-500 w-6 h-6" />
            <h2 className="font-space text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
              Education
            </h2>
          </div>
          <div className="w-12 h-1 bg-cyan-500 mb-8" />
        </motion.div>

        <div ref={containerRef} className="relative pl-8 md:pl-12 space-y-16">
          {/* Static Background Path */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-cyan-900/30" />
          
          {/* Glowing Animated Path */}
          <motion.div 
            style={{ height: lineHeight }} 
            className="absolute left-[0px] -translate-x-[0.5px] top-0 w-[2px] bg-cyan-400 shadow-[0_0_10px_#22d3ee] origin-top" 
          />

          {/* Animated Airplane */}
          <motion.div 
            style={{ top: planeY }} 
            className="absolute left-[-11px] w-6 h-6 bg-[#020617] flex items-center justify-center z-10 -translate-y-1/2 rounded-full border border-cyan-900/50"
          >
            <Plane className="w-3.5 h-3.5 text-cyan-400 rotate-180" />
          </motion.div>

          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative z-0"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[37px] md:-left-[53px] top-1 w-3 h-3 bg-cyan-900 rounded-full" />
              <div className="absolute -left-[45px] md:-left-[61px] top-[1px] w-7 h-7 border border-cyan-900/50 rounded-full" />
              
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-space text-xl font-bold text-white mb-2">{edu.institution}</h3>
                  <p className="font-mono text-xs text-cyan-400 uppercase tracking-widest">{edu.degree}</p>
                </div>
                <div className="flex flex-col items-start lg:items-end gap-2 shrink-0">
                  <span className="font-mono text-xs text-amber-500 bg-amber-950/20 border border-amber-900/30 px-3 py-1 rounded-sm w-max">
                    {edu.date}
                  </span>
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">{edu.location}</span>
                </div>
              </div>
              
              <ul className="space-y-3 ml-2 lg:ml-6">
                {edu.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-400 font-sans font-light leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
