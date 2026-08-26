import { motion } from 'motion/react';
import { GraduationCap, PlaneTakeoff, Navigation } from 'lucide-react';

const education = [
  {
    institution: "National Institute of Open Schooling (NIOS)",
    location: "Udaipur, Rajasthan",
    degree: "Senior Secondary Education — Physics, Chemistry, Mathematics (PCM)",
    date: "Expected May 2027",
    bullets: [
      "Pursuing a rigorous PCM curriculum, building strong analytical and quantitative reasoning skills essential for flight training and technical decision-making.",
      "Balances demanding academics with active extracurricular leadership through MUN participation.",
      "Cultivates disciplined, self-directed study habits reflective of the structure required in aviation training environments."
    ]
  },
  {
    institution: "Delhi Public School (DPS)",
    location: "Udaipur, Rajasthan",
    degree: "Secondary Education, PCM Stream",
    date: "March 2020 – March 2026",
    bullets: [
      "Completed foundational schooling (Class 6–11) across Physics, Chemistry, Mathematics, and Computer Science.",
      "Developed core analytical thinking and teamwork skills through collaborative academic projects.",
      "Engaged consistently in extracurricular activities, including Model United Nations, alongside core studies."
    ]
  }
];

export default function Education() {
  return (
    <section id="education" className="relative py-24 bg-[#0B1121] border-t border-cyan-900/20">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-950/30 border border-cyan-900/50 rounded-sm text-cyan-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-space text-3xl font-bold text-white uppercase tracking-wider">
                Academic Flight Path
              </h2>
              <p className="font-mono text-xs text-gray-400 tracking-widest mt-1 uppercase">Foundation & Training</p>
            </div>
          </div>
          <PlaneTakeoff className="w-8 h-8 text-cyan-900/50 hidden md:block" />
        </motion.div>

        <div className="space-y-12">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-[#020617] border border-cyan-900/30 p-8 rounded-sm hover:border-cyan-500/50 transition-colors"
            >
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6 relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Navigation className="w-4 h-4 text-cyan-500" />
                    <h3 className="font-space text-xl font-bold text-white">{edu.institution}</h3>
                  </div>
                  <p className="font-sans text-cyan-400 font-medium ml-6">{edu.degree}</p>
                </div>
                <div className="flex flex-col lg:items-end text-left lg:text-right ml-6 lg:ml-0">
                  <span className="font-mono text-xs text-amber-500 bg-amber-950/20 border border-amber-900/30 px-3 py-1 rounded-sm w-max mb-1">
                    {edu.date}
                  </span>
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">{edu.location}</span>
                </div>
              </div>

              <ul className="space-y-3 ml-6">
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
