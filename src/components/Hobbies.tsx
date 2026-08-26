import { motion } from 'motion/react';
import { Plane, Terminal, Gamepad2, Mic, Map, Languages } from 'lucide-react';
import { cn } from '../utils/cn';

const hobbies = [
  {
    icon: <Plane className="w-6 h-6" />,
    title: "Aviation Tracking",
    desc: "Flight mechanics analysis & aerospace monitoring."
  },
  {
    icon: <Terminal className="w-6 h-6" />,
    title: "Web Development",
    desc: "Self-learning coding fundamentals and digital architecture."
  },
  {
    icon: <Gamepad2 className="w-6 h-6" />,
    title: "Strategic Gaming",
    desc: "Analyzing game mechanics and complex strategy systems."
  },
  {
    icon: <Mic className="w-6 h-6" />,
    title: "Public Speaking",
    desc: "Debates, discourse, and structured arguments."
  },
  {
    icon: <Map className="w-6 h-6" />,
    title: "Exploration",
    desc: "Traveling and exploring new places and cultures."
  }
];

export default function Hobbies() {
  return (
    <section id="hobbies" className="relative py-24 bg-[#0B1121] border-t border-cyan-900/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="font-mono text-xs tracking-[0.2em] text-cyan-500 mb-4 block">BEYOND THE RESUME</span>
          <h2 className="font-space text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
            Interests & Exploration
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {hobbies.map((hobby, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#020617] p-8 border border-cyan-900/30 rounded-sm hover:border-cyan-500/50 hover:bg-cyan-950/10 transition-all group"
            >
              <div className="w-12 h-12 bg-cyan-950/30 text-cyan-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {hobby.icon}
              </div>
              <h3 className="font-space text-xl font-bold text-white mb-2">{hobby.title}</h3>
              <p className="font-sans text-gray-400 font-light text-sm">{hobby.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 bg-cyan-950/20 border border-cyan-900/40 p-6 rounded-sm max-w-lg mx-auto"
        >
          <Languages className="w-6 h-6 text-amber-500" />
          <div className="flex gap-6">
            <div>
              <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Language 01</p>
              <p className="font-sans text-white font-medium">English</p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Language 02</p>
              <p className="font-sans text-white font-medium">Hindi</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
