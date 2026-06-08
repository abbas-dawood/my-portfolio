import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FileBadge, Save, Loader2, Link as LinkIcon, ExternalLink } from 'lucide-react';

export default function ResumeManagement() {
  const [resumeUrl, setResumeUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const docRef = doc(db, 'settings', 'RESUME_URL');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setResumeUrl(docSnap.data().value || '');
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'RESUME_URL'), {
        key: 'RESUME_URL',
        value: resumeUrl
      });
      alert('Resume updated');
    } catch (error) {
      console.error(error);
      alert('Failed to update resume URL');
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-widest text-white uppercase flex items-center gap-3">
          <FileBadge className="w-6 h-6 text-cyan-500" />
          Dossier Uplink
        </h1>
        <p className="text-sm text-slate-400 font-mono tracking-wider mt-2">MANAGE RESUME DOCUMENTS.</p>
      </header>
      
      {loading ? (
         <div className="p-12 flex justify-center items-center text-cyan-500">
           <Loader2 className="w-8 h-8 animate-spin" />
         </div>
      ) : (
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 max-w-2xl">
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2 font-mono">Current Resume Document URL (PDF/Drive Link)</label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="url" 
                  value={resumeUrl}
                  onChange={(e) => setResumeUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">Enter an external URL to your resume (e.g., Google Drive link).</p>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              {resumeUrl ? (
                <a href={resumeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-500 hover:text-cyan-400">
                   <ExternalLink className="w-4 h-4" /> Test Link
                </a>
              ) : <div/>}

              <button 
                type="submit" 
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-cyan-500 text-slate-950 font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-cyan-400 transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'UPDATING...' : 'UPDATE DOSSIER'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
