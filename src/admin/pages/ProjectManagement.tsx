import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { Search, Plus, Edit2, Trash2, Link as LinkIcon, Github, Loader2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack?: string[];
  order?: number;
}

export default function ProjectManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Project[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Project);
      });
      setProjects(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSave = {
        title: currentProject.title || '',
        description: currentProject.description || '',
        imageUrl: currentProject.imageUrl || '',
        liveUrl: currentProject.liveUrl || '',
        githubUrl: currentProject.githubUrl || '',
        techStack: typeof currentProject.techStack === 'string' 
            ? (currentProject.techStack as string).split(',').map((s: string) => s.trim()).filter(Boolean) 
            : (currentProject.techStack || []),
      };

      if (currentProject.id) {
        await updateDoc(doc(db, 'projects', currentProject.id), dataToSave);
      } else {
        await addDoc(collection(db, 'projects'), {
          ...dataToSave,
          createdAt: serverTimestamp(),
          order: projects.length
        });
      }
      setIsEditing(false);
      setCurrentProject({});
    } catch (error) {
      console.error("Error saving project:", error);
      alert('Error saving project. See console.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this project permanently?')) {
      await deleteDoc(doc(db, 'projects', id));
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-widest text-white uppercase">Project Matrix</h1>
          <p className="text-sm text-slate-400 font-mono tracking-wider mt-2">ADD, EDIT, OR DECOMMISSION PROJECTS.</p>
        </div>
        <button 
          onClick={() => { setIsEditing(true); setCurrentProject({}); }}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 rounded-lg tracking-widest text-sm hover:bg-cyan-500/20 transition-colors"
        >
          <Plus className="w-4 h-4" /> ADD PROJECT
        </button>
      </header>

      {isEditing && (
        <div className="bg-slate-900/40 p-6 border border-slate-700/50 rounded-xl mb-8">
          <h2 className="text-lg font-bold text-white mb-4 uppercase tracking-widest">
            {currentProject.id ? 'Edit Project' : 'New Project'}
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">Project Title</label>
                <input required type="text" value={currentProject.title || ''} onChange={(e) => setCurrentProject({...currentProject, title: e.target.value})} className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">Image URL</label>
                <input type="text" value={currentProject.imageUrl || ''} onChange={(e) => setCurrentProject({...currentProject, imageUrl: e.target.value})} className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">Live URL</label>
                <input type="text" value={currentProject.liveUrl || ''} onChange={(e) => setCurrentProject({...currentProject, liveUrl: e.target.value})} className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">GitHub URL</label>
                <input type="text" value={currentProject.githubUrl || ''} onChange={(e) => setCurrentProject({...currentProject, githubUrl: e.target.value})} className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">Tech Stack (Comma separated)</label>
                <input type="text" value={Array.isArray(currentProject.techStack) ? currentProject.techStack.join(', ') : currentProject.techStack || ''} onChange={(e) => setCurrentProject({...currentProject, techStack: e.target.value as any})} className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">Description</label>
                <textarea required rows={4} value={currentProject.description || ''} onChange={(e) => setCurrentProject({...currentProject, description: e.target.value})} className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-slate-400 hover:text-white uppercase tracking-widest text-sm">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-lg uppercase tracking-widest text-sm hover:bg-cyan-400 transition-colors">Save Protocol</button>
            </div>
          </form>
        </div>
      )}

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900/40 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors placeholder:text-slate-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
           <div className="col-span-full p-12 flex justify-center items-center text-cyan-500">
             <Loader2 className="w-8 h-8 animate-spin" />
           </div>
        ) : filteredProjects.length === 0 ? (
          <div className="col-span-full p-8 text-center border border-dashed border-slate-700 rounded-xl text-slate-500 uppercase tracking-widest text-sm">
            NO PROJECTS FOUND.
          </div>
        ) : (
          filteredProjects.map(project => (
            <div key={project.id} className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/50" />
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white leading-tight">{project.title}</h3>
                <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setIsEditing(true); setCurrentProject(project); }} className="p-2 hover:bg-slate-800 rounded border border-slate-700 text-slate-400 hover:text-white transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="p-2 hover:bg-red-900/40 rounded border border-slate-700 text-slate-400 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack?.map((tech, i) => (
                  <span key={i} className="text-[10px] uppercase tracking-widest px-2 py-1 bg-slate-800/50 text-slate-400 rounded border border-slate-700">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-800 text-slate-500">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs hover:text-cyan-400 transition-colors uppercase tracking-widest">
                    <LinkIcon className="w-3 h-3" /> Live
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs hover:text-cyan-400 transition-colors uppercase tracking-widest">
                    <Github className="w-3 h-3" /> Repo
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
