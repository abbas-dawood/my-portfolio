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
    if (window.confirm("Are you sure you want to delete this setting?")) {
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
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage global environment variables.</p>
      </header>

      {loading ? (
         <div className="p-12 flex justify-center items-center text-blue-500">
           <Loader2 className="w-8 h-8 animate-spin" />
         </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900 mb-6">Current Variables</h2>
            {settings.length === 0 ? (
              <p className="text-sm text-slate-500">No configuration variables defined.</p>
            ) : (
              <div className="space-y-4">
                {settings.map(setting => (
                  <div key={setting.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 border border-slate-200 rounded-lg group">
                    <div className="md:w-1/3">
                      <span className="text-sm font-mono text-slate-700">{setting.id}</span>
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
                        className="flex-1 bg-white border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md px-3 py-2 text-sm text-slate-900 outline-none transition-colors"
                      />
                      <button onClick={() => handleDelete(setting.id)} className="p-2 text-slate-400 hover:text-rose-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                <p className="text-xs text-slate-500 mt-4">Changes save automatically when you click outside the input field.</p>
              </div>
            )}
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
             <h2 className="text-sm font-semibold text-slate-900 mb-6">Add New Variable</h2>
             <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 items-start md:items-end">
               <div className="flex-1 w-full">
                 <label className="block text-xs font-semibold text-slate-700 mb-2">Key</label>
                 <input 
                    required 
                    type="text" 
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value)}
                    placeholder="e.g. PORTFOLIO_THEME"
                    className="w-full bg-white border border-slate-300 rounded-md px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                 />
               </div>
               <div className="flex-1 w-full">
                 <label className="block text-xs font-semibold text-slate-700 mb-2">Value</label>
                 <input 
                    required 
                    type="text" 
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder="e.g. dark"
                    className="w-full bg-white border border-slate-300 rounded-md px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                 />
               </div>
               <button 
                  type="submit" 
                  disabled={saving}
                  className="w-full md:w-auto px-6 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
               >
                 {saving ? 'Adding...' : 'Add Variable'}
               </button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
}
