import { motion } from 'motion/react';
import { Award } from 'lucide-react';

const certifications = [
  {
    title: 'Eureka! Junior 2025 — Entrepreneurship Program',
    issuer: 'E-Cell, IIT Bombay',
    date: 'December 2025',
    bullets: [
      'Selected as a participant in a national-level entrepreneurship program among a competitive applicant pool',
      'Cultivated problem-solving, idea validation, and entrepreneurial thinking through exposure to real startup ecosystems',
      'Analyzed business fundamentals and innovation frameworks, strengthening structured decision-making abilities'
    ]
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-16 md:py-24 bg-[#0B1121] border-y border-cyan-900/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <Award className="text-cyan-500 w-6 h-6" />
            <h2 className="font-space text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
              Certification
            </h2>
          </div>
          <div className="w-12 h-1 bg-cyan-500 mb-8" />
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#020617] border border-cyan-900/30 p-8 rounded-sm hover:border-cyan-500/50 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-space text-xl font-bold text-white mb-2">{cert.title}</h3>
                  <p className="font-mono text-xs text-amber-500 uppercase tracking-widest">Issued by: {cert.issuer}</p>
                </div>
                <div className="shrink-0">
                  <span className="font-mono text-xs text-gray-400 border border-gray-800 bg-gray-900/50 px-3 py-1 rounded-sm uppercase tracking-widest block text-center">
                    {cert.date}
                  </span>
                </div>
              </div>
              <ul className="space-y-3">
                {cert.bullets.map((bullet, idx) => (
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
