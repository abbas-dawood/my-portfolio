import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FileBadge, Save, Loader2, Link as LinkIcon, ExternalLink } from 'lucide-react';

export default function ResumeManagement() {
  const [resumeUrl, setResumeUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

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
    setMessage('');
    try {
      await setDoc(doc(db, 'settings', 'RESUME_URL'), {
        key: 'RESUME_URL',
        value: resumeUrl
      });
      setMessage('Resume URL updated successfully.');
    } catch (error) {
      console.error(error);
      setMessage('Failed to update resume URL.');
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Resume Management</h1>
        <p className="text-sm text-slate-500 mt-1">Manage the link to your resume document.</p>
      </header>
      
      {loading ? (
         <div className="p-12 flex justify-center items-center text-blue-500">
           <Loader2 className="w-8 h-8 animate-spin" />
         </div>
      ) : (
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 max-w-2xl">
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Resume Document URL (PDF/Drive Link)</label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="url" 
                  value={resumeUrl}
                  onChange={(e) => setResumeUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shadow-sm"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">Enter an external URL to your resume.</p>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-slate-200">
              <div className="flex items-center gap-4">
                {resumeUrl ? (
                  <a href={resumeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                    <ExternalLink className="w-4 h-4" /> Test Link
                  </a>
                ) : <div/>}
                <span className={`text-sm ${message.includes('Failed') ? 'text-rose-500' : 'text-emerald-600'}`}>{message}</span>
              </div>

              <button 
                type="submit" 
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
