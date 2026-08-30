import { motion } from 'motion/react';
import { User, Crosshair, Navigation } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative py-16 md:py-24 bg-[#0B1121] border-y border-cyan-900/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <User className="text-cyan-500 w-6 h-6" />
            <h2 className="font-space text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
              Professional Summary
            </h2>
          </div>
          <div className="w-12 h-1 bg-cyan-500 mb-8" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8"
          >
            <div className="bg-[#020617] border border-cyan-900/30 p-8 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Navigation className="w-24 h-24 text-cyan-500" />
              </div>
              <p className="font-sans text-lg text-gray-300 leading-relaxed font-light mb-6 relative z-10">
                Disciplined and driven Senior Secondary student (Science: Physics, Chemistry, Mathematics) with a clear aspiration toward a career as a Commercial Pilot. 
                Demonstrates strong situational awareness, structured problem-solving, and composure under pressure, cultivated through active participation in Model United Nations conferences and independent research initiatives.
              </p>
              <p className="font-sans text-lg text-gray-300 leading-relaxed font-light relative z-10">
                Combines an analytical, safety-conscious mindset with proven adaptability and a growth-oriented approach to learning. 
                Recognized for clear communication, sound decision-making, and a genuine passion for aviation, innovation, and cross-cultural diplomacy.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 flex flex-col gap-6"
          >
            <div className="bg-[#020617] border border-amber-900/30 p-6 rounded-sm">
              <div className="flex items-center gap-3 mb-4">
                <Crosshair className="text-amber-500 w-5 h-5" />
                <h3 className="font-mono text-sm uppercase tracking-widest text-amber-500">Career Focus</h3>
              </div>
              <p className="font-space text-xl font-bold text-white tracking-widest uppercase">
                Commercial Aviation
              </p>
              <p className="font-mono text-xs text-gray-500 mt-2 uppercase tracking-widest">
                Trajectory Set
              </p>
            </div>
            
            <div className="bg-[#020617] border border-cyan-900/30 p-6 rounded-sm flex-1 flex flex-col justify-center">
              <p className="font-mono text-[10px] text-cyan-600 mb-2 tracking-[0.2em] uppercase">Current Coordinates</p>
              <p className="font-sans text-gray-300 font-medium">Udaipur, Rajasthan, India</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
