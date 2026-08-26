import { motion } from 'motion/react';
import { Briefcase, Activity, Share2 } from 'lucide-react';

const experiences = [
  {
    role: "Independent Technology & Innovation Initiative",
    type: "Self-Directed",
    date: "April 2021 – Present",
    location: "Udaipur, Rajasthan",
    icon: <Activity className="w-5 h-5" />,
    bullets: [
      "Spearheaded independent research into emerging technologies, digital tools, and innovation trends to build practical, real-world knowledge.",
      "Managed self-directed learning projects end-to-end, applying structured problem-solving to translate concepts into working outcomes.",
      "Analyzed startup ecosystems and “Make-in-India” innovation themes, developing a foundational understanding of entrepreneurial thinking.",
      "Applied design tools (Figma, Canva) and video editing to independently plan and produce creative digital projects."
    ]
  },
  {
    role: "Campus Ambassador & Social Media Marketing Internship",
    type: "IMUN",
    date: "Timeline not specified",
    location: "Remote / Campus",
    icon: <Share2 className="w-5 h-5" />,
    bullets: [
      "Represented IMUN as a Campus Ambassador, promoting conferences and driving engagement.",
      "Executed social media marketing campaigns and contributed to business development initiatives.",
      "Developed leadership and networking skills within a dynamic, international student community."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 bg-[#020617]">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex items-center gap-4"
        >
          <div className="p-3 bg-cyan-950/30 border border-cyan-900/50 rounded-sm text-cyan-400">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-space text-3xl font-bold text-white uppercase tracking-wider">
              Experience Log
            </h2>
            <p className="font-mono text-xs text-gray-400 tracking-widest mt-1 uppercase">Field Initiatives & Internships</p>
          </div>
        </motion.div>

        <div className="relative border-l border-cyan-900/40 ml-4 md:ml-8 pl-8 md:pl-12 space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] md:-left-[57px] top-1 w-8 h-8 bg-[#020617] border border-cyan-500/50 rounded-full flex items-center justify-center z-10 text-cyan-400">
                {exp.icon}
              </div>

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-space text-xl font-bold text-white">{exp.role}</h3>
                  <p className="font-sans text-cyan-400 font-medium">{exp.type}</p>
                </div>
                <div className="flex flex-col md:items-end text-left md:text-right">
                  <span className="font-mono text-xs text-amber-500 bg-amber-950/20 border border-amber-900/30 px-2 py-1 rounded-sm w-max mb-1">
                    {exp.date}
                  </span>
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">{exp.location}</span>
                </div>
              </div>

              <ul className="space-y-3">
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-400 font-sans font-light leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 bg-cyan-900 rounded-full flex-shrink-0" />
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
