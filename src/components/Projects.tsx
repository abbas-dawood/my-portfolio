import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Folder } from 'lucide-react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { playHoverSound, playClickSound } from '../utils/sound';

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(data);
      } catch (e) {
        console.error("Error fetching projects", e);
      }
    };
    fetchProjects();
  }, []);

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="relative min-h-screen py-24 border-t border-cyan-900/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full z-10 relative">
        <div className="mb-16">
          <h2 className="font-space text-3xl md:text-5xl font-bold mb-4">
            <span className="text-cyan-500">02. </span>
            <span className="glitch-text" data-text="Featured Projects">Featured Projects</span>
          </h2>
          <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase">
            // Architecture • Implementation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="bg-[#0B1121] border border-cyan-900/50 rounded-sm p-6 flex flex-col group hover:border-cyan-500/50 transition-colors"
            >
               <div className="flex justify-between items-start mb-6">
                 <Folder className="w-10 h-10 text-cyan-500/80" strokeWidth={1} />
                 <div className="flex gap-4">
                   {project.githubUrl && (
                     <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
                       <Github className="w-5 h-5" />
                     </a>
                   )}
                   {project.liveUrl && (
                     <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
                       <ExternalLink className="w-5 h-5" />
                     </a>
                   )}
                 </div>
               </div>
               
               <h3 className="text-xl font-bold font-space text-slate-200 group-hover:text-cyan-400 transition-colors mb-2">
                 {project.title}
               </h3>
               
               <p className="text-sm text-slate-400 font-sans font-light flex-grow mb-6 whitespace-pre-wrap">
                 {project.description}
               </p>
               
               <div className="flex flex-wrap gap-3 mt-auto">
                 {project.techStack?.map((tech: string, i: number) => (
                   <span key={i} className="text-xs font-mono text-cyan-500 tracking-widest uppercase opacity-70">
                     {tech}
                   </span>
                 ))}
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
