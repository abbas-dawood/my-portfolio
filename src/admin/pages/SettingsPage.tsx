import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Save, Plus, Trash2, Loader2, Settings } from 'lucide-react';

interface GlobalSetting {
  id: string; // key
  value: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<GlobalSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'settings'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: GlobalSetting[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, value: doc.data().value } as GlobalSetting);
      });
      setSettings(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleUpdate = async (id: string, val: string) => {
    try {
      await setDoc(doc(db, 'settings', id), { key: id, value: val });
    } catch (e) {
      console.error(e);
      alert('Error updating setting');
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey || !newValue) return;
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', newKey.trim()), { key: newKey.trim(), value: newValue });
      setNewKey('');
      setNewValue('');
    } catch (error) {
      console.error(error);
      alert('Error adding setting');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("DELETE ROOT SETTING? THIS MAY CAUSE SYSTEM INSTABILITY.")) {
      try {
        await deleteDoc(doc(db, 'settings', id));
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-widest text-white uppercase flex items-center gap-3">
          <Settings className="w-6 h-6 text-cyan-500" />
          System Configuration
        </h1>
        <p className="text-sm text-slate-400 font-mono tracking-wider mt-2">GLOBAL KEY-VALUE PAIR REGISTRY.</p>
      </header>

      {loading ? (
         <div className="p-12 flex justify-center items-center text-cyan-500">
           <Loader2 className="w-8 h-8 animate-spin" />
         </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm tracking-widest text-slate-400 uppercase mb-6">Current Variables</h2>
            {settings.length === 0 ? (
              <p className="text-xs text-slate-500 font-mono tracking-widest uppercase">No configuration variables defined.</p>
            ) : (
              <div className="space-y-4">
                {settings.map(setting => (
                  <div key={setting.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-slate-950/50 border border-slate-800 rounded-lg group">
                    <div className="md:w-1/3">
                      <span className="text-sm font-mono text-cyan-400">{setting.id}</span>
                    </div>
                    <div className="flex-1 flex gap-2">
                      <input 
                        type="text" 
                        value={setting.value}
                        onChange={(e) => {
                          const newSettings = [...settings];
                          const idx = newSettings.findIndex(s => s.id === setting.id);
                          if (idx > -1) {
                            newSettings[idx].value = e.target.value;
                            setSettings(newSettings);
                          }
                        }}
                        onBlur={() => handleUpdate(setting.id, setting.value)}
                        className="flex-1 bg-slate-900/40 border border-slate-700 focus:border-cyan-500 rounded px-3 py-2 text-sm text-white outline-none transition-colors"
                      />
                      <button onClick={() => handleDelete(setting.id)} className="p-2 text-slate-500 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                <p className="text-[10px] text-slate-500 tracking-widest mt-4">CHANGES AUTOSAVE ON BLUR</p>
              </div>
            )}
          </div>

          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
             <h2 className="text-sm tracking-widest text-cyan-500 uppercase mb-6">Inject New Variable</h2>
             <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 items-start md:items-end">
               <div className="flex-1 w-full">
                 <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">Key</label>
                 <input 
                    required 
                    type="text" 
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value)}
                    placeholder="e.g. PORTFOLIO_THEME"
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500" 
                 />
               </div>
               <div className="flex-1 w-full">
                 <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">Value</label>
                 <input 
                    required 
                    type="text" 
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder="e.g. dark"
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500" 
                 />
               </div>
               <button 
                  type="submit" 
                  disabled={saving}
                  className="w-full md:w-auto px-6 py-2 bg-cyan-500 text-slate-950 font-bold tracking-widest text-sm rounded-lg hover:bg-cyan-400 transition-colors disabled:opacity-50"
               >
                 {saving ? 'INJECTING...' : 'INJECT'}
               </button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
}
