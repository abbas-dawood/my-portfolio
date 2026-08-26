import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-24 bg-[#0B1121] border-t border-cyan-900/20">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-950/30 border border-amber-900/50 rounded-sm text-amber-500">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-space text-3xl font-bold text-white uppercase tracking-wider">
                Certifications
              </h2>
              <p className="font-mono text-xs text-gray-400 tracking-widest mt-1 uppercase">Official Recognition</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#020617] border border-amber-900/30 p-8 rounded-sm relative overflow-hidden"
        >
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div>
              <h3 className="font-space text-2xl font-bold text-white mb-2">Eureka! Junior 2025</h3>
              <p className="font-sans text-amber-500 font-medium mb-4">Entrepreneurship Program</p>
              
              <ul className="space-y-3 lg:max-w-2xl">
                <li className="flex items-start gap-3 text-gray-400 font-sans font-light leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 bg-cyan-500 rounded-full flex-shrink-0" />
                  Selected as a participant in a national-level entrepreneurship program among a competitive applicant pool.
                </li>
                <li className="flex items-start gap-3 text-gray-400 font-sans font-light leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 bg-cyan-500 rounded-full flex-shrink-0" />
                  Cultivated problem-solving, idea validation, and entrepreneurial thinking through exposure to real startup ecosystems.
                </li>
                <li className="flex items-start gap-3 text-gray-400 font-sans font-light leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 bg-cyan-500 rounded-full flex-shrink-0" />
                  Analyzed business fundamentals and innovation frameworks, strengthening structured decision-making abilities.
                </li>
              </ul>
            </div>
            <div className="flex flex-col text-left lg:text-right mt-4 lg:mt-0">
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Issued by</span>
              <span className="font-sans text-white font-medium mb-4">E-Cell, IIT Bombay</span>
              <span className="font-mono text-xs text-amber-500 bg-amber-950/20 border border-amber-900/30 px-3 py-1 rounded-sm w-max">
                December 2025
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
