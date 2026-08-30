import { motion } from 'motion/react';
import { Briefcase } from 'lucide-react';

const experienceData = [
  {
    role: 'Model United Nations (MUN) Participant',
    company: 'Various MUN Conferences',
    location: 'Udaipur, Rajasthan',
    date: 'November 2022 – Present',
    bullets: [
      'Represented assigned nations in structured multilateral debates on global diplomacy and policy issues, sharpening critical thinking under time pressure',
      'Cultivated advanced public speaking, negotiation, and persuasive communication skills across multiple conference settings',
      'Practiced composed, rational decision-making while navigating high-pressure debate scenarios and shifting positions',
      'Strengthened leadership presence and cross-cultural collaboration by engaging respectfully with diverse viewpoints'
    ]
  },
  {
    role: 'Independent Technology & Innovation Initiative',
    company: 'Self-Directed',
    location: 'Udaipur, Rajasthan',
    date: 'April 2021 – Present',
    bullets: [
      'Spearheaded independent research into emerging technologies, digital tools, and innovation trends to build practical, real-world knowledge',
      'Managed self-directed learning projects end-to-end, applying structured problem-solving to translate concepts into working outcomes',
      'Analyzed startup ecosystems and “Make-in-India” innovation themes, developing a foundational understanding of entrepreneurial thinking',
      'Applied design tools (Figma, Canva) and video editing to independently plan and produce creative digital projects'
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-16 md:py-24 bg-[#0B1121] border-t border-cyan-900/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <Briefcase className="text-cyan-500 w-6 h-6" />
            <h2 className="font-space text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
              Experience & Leadership
            </h2>
          </div>
          <div className="w-12 h-1 bg-cyan-500 mb-8" />
        </motion.div>

        <div className="relative border-l border-cyan-900/30 pl-8 md:pl-12 space-y-16">
          {experienceData.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[37px] md:-left-[53px] top-1 w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
              <div className="absolute -left-[45px] md:-left-[61px] top-[1px] w-7 h-7 border border-cyan-500/30 rounded-full" />
              
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-space text-xl font-bold text-white mb-2">{exp.role}</h3>
                  <p className="font-mono text-xs text-cyan-400 uppercase tracking-widest">{exp.company}</p>
                </div>
                <div className="flex flex-col items-start lg:items-end gap-2 shrink-0">
                  <span className="font-mono text-xs text-cyan-400 bg-cyan-950/20 border border-cyan-900/30 px-3 py-1 rounded-sm w-max">
                    {exp.date}
                  </span>
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">{exp.location}</span>
                </div>
              </div>
              
              <ul className="space-y-3 ml-2 lg:ml-6">
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-400 font-sans font-light leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 bg-cyan-500 rounded-full flex-shrink-0" />
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
