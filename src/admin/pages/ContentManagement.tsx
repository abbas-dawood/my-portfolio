import React, { useState, useEffect } from 'react';
import { Type, AlignLeft, Save, Loader2 } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function ContentManagement() {
  const [aboutMe, setAboutMe] = useState('');
  const [homeHeadline, setHomeHeadline] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRefAbout = doc(db, 'settings', 'ABOUT_ME');
        const docRefHeadline = doc(db, 'settings', 'HOME_HEADLINE');
        
        const [snapAbout, snapHeadline] = await Promise.all([
          getDoc(docRefAbout),
          getDoc(docRefHeadline)
        ]);

        if (snapAbout.exists()) setAboutMe(snapAbout.data().value || '');
        if (snapHeadline.exists()) setHomeHeadline(snapHeadline.data().value || '');
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await Promise.all([
        setDoc(doc(db, 'settings', 'ABOUT_ME'), { key: 'ABOUT_ME', value: aboutMe }),
        setDoc(doc(db, 'settings', 'HOME_HEADLINE'), { key: 'HOME_HEADLINE', value: homeHeadline })
      ]);
      alert('Content Updated successfully');
    } catch (error) {
       console.error(error);
       alert('Error updating content');
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-widest text-white uppercase flex items-center gap-3">
            <Type className="w-6 h-6 text-cyan-500" />
            Content Subsystem
          </h1>
          <p className="text-sm text-slate-400 font-mono tracking-wider mt-2">MODIFY PUBLIC FACING DATA.</p>
        </div>
      </header>

      {loading ? (
        <div className="p-12 flex justify-center items-center text-cyan-500">
           <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 max-w-3xl">
           <form onSubmit={handleSave} className="space-y-6">
             <div>
               <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 mb-2 font-mono">
                 <Type className="w-4 h-4" /> Home Page Headline
               </label>
               <input 
                 type="text" 
                 value={homeHeadline}
                 onChange={(e) => setHomeHeadline(e.target.value)}
                 className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                 placeholder="e.g. Creative Developer & Designer"
               />
             </div>

             <div>
               <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 mb-2 font-mono">
                 <AlignLeft className="w-4 h-4" /> About Me Description
               </label>
               <textarea 
                 rows={8}
                 value={aboutMe}
                 onChange={(e) => setAboutMe(e.target.value)}
                 className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors h-48"
                 placeholder="Write something about yourself..."
               />
             </div>

             <div className="flex justify-end pt-4 border-t border-slate-800">
               <button 
                 type="submit" 
                 disabled={saving}
                 className="flex items-center gap-2 px-6 py-2 bg-cyan-500 text-slate-950 font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-cyan-400 transition-colors disabled:opacity-50"
               >
                 {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                 {saving ? 'UPDATING...' : 'PUBLISH CHANGES'}
               </button>
             </div>
           </form>
        </div>
      )}
    </div>
  );
}
