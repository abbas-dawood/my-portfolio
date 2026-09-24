import { motion } from 'motion/react';
import { Shield, LayoutDashboard, Share2 } from 'lucide-react';

const leadershipData = [
  {
    role: "Executive Board Member / Rapporteur",
    event: "SASSY'26",
    organization: "St. Anthony's Students Summit by YUVA, Udaipur.",
    committee: "Education Ministry of India (Senior)",
    date: "August 2026",
    icon: <Shield className="w-5 h-5" />
  },
  {
    role: "OC Member",
    event: "DPS MUN 2024",
    organization: "Organizing Committee",
    committee: "Organizing Committee",
    mission: "Facilitated logistics and core operations.",
    date: "2024",
    icon: <LayoutDashboard className="w-5 h-5" />
  },
  {
    role: "Campus Ambassador & Social Media Marketing Internship",
    event: "IMUN",
    organization: "International Model United Nations",
    committee: "Campus Ambassador",
    mission: "Executed social media marketing campaigns, contributed to business development, and represented IMUN as a Campus Ambassador.",
    icon: <Share2 className="w-5 h-5" />
  }
];

export default function Leadership() {
  return (
    <section id="leadership" className="relative py-16 md:py-24 bg-[#0B1121] border-y border-cyan-900/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <Shield className="text-amber-500 w-6 h-6" />
            <h2 className="font-space text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
              Leadership & Organizing
            </h2>
          </div>
          <div className="w-12 h-1 bg-amber-500 mb-8" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {leadershipData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#020617] border border-cyan-900/30 p-8 rounded-sm hover:border-amber-500/50 transition-colors relative group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="text-amber-500 bg-amber-950/30 p-3 rounded-sm group-hover:bg-amber-500 group-hover:text-black transition-colors">
                  {item.icon}
                </div>
                {item.date && (
                  <span className="font-mono text-[10px] text-gray-400 border border-gray-800 bg-gray-900/50 px-3 py-1 rounded-sm uppercase tracking-widest">
                    {item.date}
                  </span>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="font-space text-xl font-bold text-white mb-2">{item.event}</h3>
                <p className="font-mono text-xs text-cyan-400 font-bold mb-4 uppercase tracking-wide">{item.role}</p>
                
                {item.organization && (
                  <p className="font-sans text-sm text-gray-400 font-light leading-relaxed mb-2">
                    <strong className="text-gray-300">Organization:</strong> {item.organization}
                  </p>
                )}
                {item.committee && (
                  <p className="font-sans text-sm text-gray-400 font-light leading-relaxed mb-4">
                    <strong className="text-gray-300">Role/Format:</strong> {item.committee}
                  </p>
                )}
                {item.mission && (
                  <div className="mt-4 pt-4 border-t border-cyan-900/30">
                    <p className="font-sans text-sm text-gray-300 font-light leading-relaxed">
                      {item.mission}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
