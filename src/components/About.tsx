import { motion } from 'motion/react';
import { User, Compass, Eye } from 'lucide-react';
import { cn } from '../utils/cn';
import { playHoverSound, playClickSound } from '../utils/sound';

export default function About() {
  const cards = [
    {
      title: "Who I Am",
      icon: User,
      content: "I am a motivated student pursuing senior secondary education in Science (PCM) with a profound interest in technology, innovation, and aviation. I thrive on self-learning, experimentation, and research."
    },
    {
      title: "My Direction",
      icon: Compass,
      content: "While actively exploring web technologies (HTML, CSS, JavaScript, React) and Python, I am simultaneously pursuing my dream of becoming a Commercial Pilot. I believe in blending technical acumen with strict discipline."
    },
    {
      title: "Future Vision",
      icon: Eye,
      content: "I am passionate about emerging systems, startup ecosystems, and 'Make-in-India' innovation. Through leadership in MUN and hands-on projects, I am building the analytical foundation needed to create meaningful impact."
    }
  ];

  return (
    <section id="about" className="relative min-h-[80vh] py-24 flex flex-col justify-center border-t border-cyan-900/30">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full z-10">
        
        <div className="mb-16">
          <h2 className="font-space text-3xl md:text-5xl font-bold mb-4">
            <span className="text-cyan-500">01. </span>
            <span className="glitch-text" data-text="More Than Just A Portfolio">More Than Just A Portfolio</span>
          </h2>
          <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase">
            // Identity • Motivation • Trajectory
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
             <motion.div
               key={index}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.6, delay: index * 0.2 }}
               whileHover={{ y: -5 }}
               onMouseEnter={playHoverSound}
               onClick={playClickSound}
               className="group relative cursor-pointer"
             >
               {/* Hover Glow Background */}
               <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/20 group-hover:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur" />
               
               {/* Card Content */}
               <div className="relative h-full p-8 bg-black/40 border border-cyan-500/30 rounded-sm shadow-[inset_0_0_20px_rgba(6,182,212,0.05)] hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.15),inset_0_0_30px_rgba(6,182,212,0.1)] transition-all duration-500 backdrop-blur-md overflow-hidden flex flex-col">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors duration-500" />
                 
                 {/* Top edge highlight */}
                 <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                 
                 <div className="mb-8 p-3 bg-cyan-950/40 rounded-sm inline-block w-fit border border-cyan-500/30 text-slate-300 group-hover:text-cyan-400 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all">
                   <card.icon className="w-6 h-6" />
                 </div>
                 
                 <h3 className="font-space text-xl font-medium mb-4 text-white">{card.title}</h3>
                 
                 <p className="font-sans text-sm text-gray-400 leading-relaxed font-light grow">
                   {card.content}
                 </p>
                 
                 {/* Decorative HUD element at bottom */}
                 <div className="w-full h-[1px] bg-cyan-900/50 mt-8 relative overflow-hidden">
                   <motion.div 
                     className="absolute top-0 left-0 h-full bg-cyan-500 w-1/3"
                     initial={{ x: '-100%' }}
                     whileHover={{ x: '300%' }}
                     transition={{ duration: 1, ease: 'easeInOut' }}
                   />
                 </div>
               </div>
             </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
