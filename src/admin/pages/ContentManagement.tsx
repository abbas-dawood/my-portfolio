import React, { useState, useEffect } from 'react';
import { Type, AlignLeft, Save, Loader2 } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function ContentManagement() {
  const [homeHeadline, setHomeHeadline] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [myDirection, setMyDirection] = useState('');
  const [futureVision, setFutureVision] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRefHeadline = doc(db, 'settings', 'HOME_HEADLINE');
        const docRefAbout = doc(db, 'settings', 'ABOUT_ME');
        const docRefDirection = doc(db, 'settings', 'MY_DIRECTION');
        const docRefVision = doc(db, 'settings', 'FUTURE_VISION');
        
        const [snapHeadline, snapAbout, snapDirection, snapVision] = await Promise.all([
          getDoc(docRefHeadline),
          getDoc(docRefAbout),
          getDoc(docRefDirection),
          getDoc(docRefVision)
        ]);

        if (snapHeadline.exists()) setHomeHeadline(snapHeadline.data().value || '');
        if (snapAbout.exists()) setAboutMe(snapAbout.data().value || '');
        if (snapDirection.exists()) setMyDirection(snapDirection.data().value || '');
        if (snapVision.exists()) setFutureVision(snapVision.data().value || '');
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
    setMessage('');
    try {
      await Promise.all([
        setDoc(doc(db, 'settings', 'HOME_HEADLINE'), { key: 'HOME_HEADLINE', value: homeHeadline }),
        setDoc(doc(db, 'settings', 'ABOUT_ME'), { key: 'ABOUT_ME', value: aboutMe }),
        setDoc(doc(db, 'settings', 'MY_DIRECTION'), { key: 'MY_DIRECTION', value: myDirection }),
        setDoc(doc(db, 'settings', 'FUTURE_VISION'), { key: 'FUTURE_VISION', value: futureVision })
      ]);
      setMessage('Content saved successfully.');
    } catch (error) {
       console.error(error);
       setMessage('Error updating content.');
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Content Management</h1>
          <p className="text-sm text-slate-500 mt-1">Modify text and content for your public site.</p>
        </div>
      </header>

      {loading ? (
        <div className="p-12 flex justify-center items-center text-blue-500">
           <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 max-w-3xl">
           <form onSubmit={handleSave} className="space-y-6">
             <div>
               <label className="block text-sm font-semibold text-slate-700 mb-2">
                 Home Page Headline
               </label>
               <input 
                 type="text" 
                 value={homeHeadline}
                 onChange={(e) => setHomeHeadline(e.target.value)}
                 className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shadow-sm"
                 placeholder="e.g. Creative Developer & Designer"
               />
             </div>

             <div>
               <label className="block text-sm font-semibold text-slate-700 mb-2">
                 About Me - Who I Am
               </label>
               <textarea 
                 rows={4}
                 value={aboutMe}
                 onChange={(e) => setAboutMe(e.target.value)}
                 className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shadow-sm"
                 placeholder="Who are you?"
               />
             </div>

             <div>
               <label className="block text-sm font-semibold text-slate-700 mb-2">
                 About Me - My Direction
               </label>
               <textarea 
                 rows={4}
                 value={myDirection}
                 onChange={(e) => setMyDirection(e.target.value)}
                 className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shadow-sm"
                 placeholder="What is your direction?"
               />
             </div>

             <div>
               <label className="block text-sm font-semibold text-slate-700 mb-2">
                 About Me - Future Vision
               </label>
               <textarea 
                 rows={4}
                 value={futureVision}
                 onChange={(e) => setFutureVision(e.target.value)}
                 className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shadow-sm"
                 placeholder="What is your future vision?"
               />
             </div>

             <div className="flex justify-between items-center pt-4 border-t border-slate-200">
               <span className={`text-sm ${message.includes('Error') ? 'text-rose-500' : 'text-emerald-600'}`}>{message}</span>
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
