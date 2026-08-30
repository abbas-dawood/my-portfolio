import { motion } from 'motion/react';
import { Compass, Code, Gamepad2, Mic2, Map, Globe2 } from 'lucide-react';

const hobbies = [
  { name: 'Aviation Tracking & Flight Mechanics Analysis', icon: <Compass className="w-5 h-5" /> },
  { name: 'Basic Coding & Web Development (Self-Learning Phase)', icon: <Code className="w-5 h-5" /> },
  { name: 'Strategic Gaming Mechanics Analysis', icon: <Gamepad2 className="w-5 h-5" /> },
  { name: 'Public Speaking & Debates', icon: <Mic2 className="w-5 h-5" /> },
  { name: 'Traveling & Exploring New Places', icon: <Map className="w-5 h-5" /> }
];

export default function Hobbies() {
  return (
    <section id="interests" className="relative py-16 md:py-24 bg-[#020617] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <Globe2 className="text-cyan-500 w-6 h-6" />
            <h2 className="font-space text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
              Hobbies & Interests
            </h2>
          </div>
          <div className="w-12 h-1 bg-cyan-500 mb-8" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hobbies.map((hobby, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-6 bg-[#0B1121] border border-cyan-900/30 rounded-sm hover:border-cyan-500/50 transition-colors group"
            >
              <div className="text-cyan-500 bg-cyan-950/30 p-3 rounded-sm group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                {hobby.icon}
              </div>
              <p className="font-sans text-gray-300 leading-relaxed font-light mt-1">
                {hobby.name}
              </p>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: hobbies.length * 0.1 }}
            className="flex items-start gap-4 p-6 bg-[#0B1121] border border-amber-900/30 rounded-sm hover:border-amber-500/50 transition-colors group"
          >
             <div className="text-amber-500 bg-amber-950/30 p-3 rounded-sm group-hover:bg-amber-500 group-hover:text-black transition-colors flex items-center justify-center font-bold font-mono">
                A/A
             </div>
             <div>
                <p className="font-mono text-[10px] text-amber-500 uppercase tracking-widest mb-1">Languages</p>
                <p className="font-sans text-gray-300 leading-relaxed font-light mt-1">
                  English, Hindi
                </p>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
