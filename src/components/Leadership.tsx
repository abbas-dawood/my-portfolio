import { motion } from 'motion/react';
import { Flag, Award, Calendar } from 'lucide-react';

const leadershipRoles = [
  {
    title: "Executive Board Member / Rapporteur",
    organization: "SASSY'26",
    committee: "Education Ministry of India (Senior)",
    description: "St. Anthony's Students Summit by YUVA, Udaipur.",
    date: "August 2026"
  },
  {
    title: "Organizer",
    organization: "IDC MUN 2026 — Chapter 1",
    committee: "Core Organizing Committee",
    description: "Organised and coordinated Chapter 1 of IDC MUN in Jaipur.",
    date: "2026"
  },
  {
    title: "OC Member",
    organization: "DPS MUN 2024",
    committee: "Organizing Committee",
    description: "Facilitated logistics and core operations.",
    date: "2024"
  },
  {
    title: "Campus Ambassador & Social Media Marketing Internship",
    organization: "IMUN",
    committee: "International Model United Nations",
    description: "Executed social media marketing campaigns, contributed to business development, and represented IMUN as a Campus Ambassador.",
    date: "Timeline not specified"
  }
];

export default function Leadership() {
  return (
    <section id="leadership" className="relative py-24 bg-[#0B1121] border-t border-cyan-900/20">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex items-center justify-center text-center gap-4"
        >
          <div>
            <div className="w-12 h-12 bg-cyan-950/30 text-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-900/50">
              <Flag className="w-5 h-5" />
            </div>
            <h2 className="font-space text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
              Leadership & Organizing
            </h2>
            <p className="font-mono text-xs text-gray-400 tracking-widest mt-3 uppercase">Coordination / Management / Execution</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leadershipRoles.map((role, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#020617] p-8 border border-cyan-900/30 rounded-sm hover:border-cyan-500/50 transition-colors relative group overflow-hidden"
            >
              {/* Highlight bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-cyan-900/20 opacity-50 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-space text-xl font-bold text-white pr-4">{role.title}</h3>
                  <Award className="w-5 h-5 text-amber-500 flex-shrink-0" />
                </div>
                
                <h4 className="font-sans text-cyan-400 font-medium mb-1">{role.organization}</h4>
                <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-4">{role.committee}</p>
                
                <p className="font-sans text-gray-400 font-light text-sm mb-6 flex-1">
                  {role.description}
                </p>

                <div className="flex items-center gap-2 text-amber-500 bg-amber-950/20 border border-amber-900/30 px-3 py-1.5 rounded-sm w-max">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="font-mono text-[10px] uppercase tracking-widest">{role.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
