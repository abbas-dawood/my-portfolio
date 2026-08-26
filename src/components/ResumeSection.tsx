import { motion } from 'motion/react';
import { FileText, Download } from 'lucide-react';
import { playClickSound } from '../utils/sound';

export default function ResumeSection() {
  return (
    <section id="resume" className="relative py-24 bg-[#020617] border-t border-cyan-900/20">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="w-16 h-16 bg-cyan-950/30 text-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8" />
          </div>
          <h2 className="font-space text-3xl md:text-4xl font-bold text-white uppercase tracking-wider mb-4">
            Curriculum Vitae
          </h2>
          <p className="font-sans text-gray-400 font-light max-w-lg mx-auto">
            Review the complete and verified record of my academic, leadership, and technical journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="/Abbas_Dawood_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClickSound}
            className="group relative px-8 py-4 bg-cyan-500 text-black font-bold tracking-widest uppercase text-xs hover:bg-white transition-all rounded-sm flex items-center gap-3 w-full sm:w-auto justify-center"
          >
            <FileText className="w-4 h-4" />
            View CV
          </a>
          
          <a
            href="/Abbas_Dawood_Resume.pdf"
            download="Abbas_Dawood_Resume.pdf"
            onClick={playClickSound}
            className="group relative px-8 py-4 border border-cyan-500 text-cyan-500 font-bold tracking-widest uppercase text-xs hover:bg-cyan-500/10 transition-all rounded-sm flex items-center gap-3 w-full sm:w-auto justify-center"
          >
            <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            Download CV
          </a>
        </motion.div>
      </div>
    </section>
  );
}
