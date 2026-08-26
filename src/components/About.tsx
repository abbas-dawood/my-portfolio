import { motion } from 'motion/react';
import { Target, Compass, Globe, Plane, Award, Terminal } from 'lucide-react';

const storyStages = [
  {
    id: "ORIGIN",
    icon: <Compass className="w-5 h-5" />,
    title: "THE ORIGIN",
    content: "I am a disciplined Senior Secondary student based in Udaipur, Rajasthan, currently pursuing a rigorous Physics, Chemistry, and Mathematics (PCM) curriculum. My foundation is built on analytical thinking, quantitative reasoning, and self-directed study habits."
  },
  {
    id: "CURIOSITY",
    icon: <Plane className="w-5 h-5" />,
    title: "THE ASPIRATION",
    content: "My clear aspiration is toward a career as a Commercial Pilot. Aviation requires strong situational awareness, composure under pressure, and precise decision-making—qualities I actively cultivate in every aspect of my life."
  },
  {
    id: "TECHNOLOGY",
    icon: <Terminal className="w-5 h-5" />,
    title: "THE TECHNOLOGY",
    content: "Beyond the cockpit, I am a technology enthusiast. I spearhead independent research into emerging technologies, digital tools, and innovation trends. From analyzing startup ecosystems to applying design tools like Figma and Canva, I build practical, real-world knowledge."
  },
  {
    id: "DIPLOMACY",
    icon: <Globe className="w-5 h-5" />,
    title: "THE DIPLOMAT",
    content: "Through extensive participation in Model United Nations (MUN) conferences, I have sharpened my critical thinking and public speaking. Representing assigned nations in multilateral debates has strengthened my cross-cultural collaboration and persuasive communication."
  },
  {
    id: "LEADERSHIP",
    icon: <Award className="w-5 h-5" />,
    title: "THE LEADER",
    content: "Whether as an Executive Board Member, an Organizer, or a participant, I practice rational decision-making while navigating high-pressure scenarios. I believe in translating concepts into working outcomes through structured problem-solving."
  }
];

export default function About() {
  return (
    <section id="about" className="relative py-32 bg-[#020617]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 text-center"
        >
          <span className="font-mono text-xs tracking-[0.2em] text-amber-500 mb-4 block">DOCUMENTARY LOG</span>
          <h2 className="font-space text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-wider">
            The Person Behind The Journey
          </h2>
          <div className="w-24 h-[1px] bg-cyan-900/50 mx-auto" />
        </motion.div>

        <div className="relative">
          {/* Vertical Flight Path Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-900/30 to-transparent -translate-x-1/2 hidden md:block" />
          <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-900/30 to-transparent block md:hidden" />

          {storyStages.map((stage, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={stage.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 mb-24 last:mb-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Visual Marker */}
                <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-[#020617] border-2 border-cyan-500 rounded-full -translate-x-1/2 z-10 flex items-center justify-center">
                  <div className="w-1 h-1 bg-amber-400 rounded-full" />
                </div>

                {/* Content Panel */}
                <div className={`w-full pl-16 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                  <div className="inline-flex items-center gap-3 mb-3 text-cyan-400">
                    {!isEven && <span className="hidden md:block">{stage.icon}</span>}
                    <span className="font-mono text-xs tracking-widest">{stage.id}</span>
                    {isEven && <span className="hidden md:block">{stage.icon}</span>}
                    <span className="md:hidden block">{stage.icon}</span>
                  </div>
                  <h3 className="font-space text-2xl font-bold text-white mb-4">{stage.title}</h3>
                  <p className="font-sans text-gray-400 leading-relaxed font-light">
                    {stage.content}
                  </p>
                </div>
                
                {/* Empty Space for layout */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
