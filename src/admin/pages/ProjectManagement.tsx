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
          <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your portfolio projects.</p>
        </div>
        <button 
          onClick={() => { setIsEditing(true); setCurrentProject({}); }}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </header>

      {isEditing && (
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-6">
            {currentProject.id ? 'Edit Project' : 'New Project'}
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Project Title</label>
                <input required type="text" value={currentProject.title || ''} onChange={(e) => setCurrentProject({...currentProject, title: e.target.value})} className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Image URL</label>
                <input type="text" value={currentProject.imageUrl || ''} onChange={(e) => setCurrentProject({...currentProject, imageUrl: e.target.value})} className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Live URL</label>
                <input type="text" value={currentProject.liveUrl || ''} onChange={(e) => setCurrentProject({...currentProject, liveUrl: e.target.value})} className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">GitHub URL</label>
                <input type="text" value={currentProject.githubUrl || ''} onChange={(e) => setCurrentProject({...currentProject, githubUrl: e.target.value})} className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tech Stack (Comma separated)</label>
                <input type="text" value={Array.isArray(currentProject.techStack) ? currentProject.techStack.join(', ') : currentProject.techStack || ''} onChange={(e) => setCurrentProject({...currentProject, techStack: e.target.value as any})} className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                <textarea required rows={4} value={currentProject.description || ''} onChange={(e) => setCurrentProject({...currentProject, description: e.target.value})} className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-200">
              <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
              <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">Save Project</button>
            </div>
          </form>
        </div>
      )}

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {loading ? (
           <div className="col-span-full p-12 flex justify-center items-center text-blue-500">
             <Loader2 className="w-8 h-8 animate-spin" />
           </div>
        ) : filteredProjects.length === 0 ? (
          <div className="col-span-full p-12 text-center border-2 border-dashed border-slate-200 rounded-xl text-slate-500 text-sm">
            No projects found.
          </div>
        ) : (
          filteredProjects.map(project => (
            <div key={project.id} className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm relative group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-900 leading-tight">{project.title}</h3>
                <div className="flex gap-2">
                  <button onClick={() => { setIsEditing(true); setCurrentProject(project); }} className="p-2 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-700 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="p-2 hover:bg-rose-50 rounded-md text-slate-400 hover:text-rose-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-5 line-clamp-3 leading-relaxed">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack?.map((tech, i) => (
                  <span key={i} className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-6 pt-5 border-t border-slate-100 text-sm font-medium">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 transition-colors">
                    <LinkIcon className="w-4 h-4" /> Live Site
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-slate-600 hover:text-slate-800 transition-colors">
                    <Github className="w-4 h-4" /> Repository
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
