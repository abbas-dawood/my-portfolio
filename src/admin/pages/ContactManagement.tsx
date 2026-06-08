import React, { useState, useEffect } from 'react';
import { Search, Filter, Trash2, MailOpen, Mail, Eye, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  body: string;
  read: boolean;
  createdAt: any;
}

export default function ContactManagement() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, unread, read
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const contactsData: Contact[] = [];
      snapshot.forEach((doc) => {
        contactsData.push({ id: doc.id, ...doc.data() } as Contact);
      });
      setContacts(contactsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching contacts:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredContacts = contacts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (c.subject && c.subject.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filter === 'unread') return matchesSearch && !c.read;
    if (filter === 'read') return matchesSearch && c.read;
    return matchesSearch;
  });

  const toggleRead = async (id: string, currentRead: boolean) => {
    try {
      await updateDoc(doc(db, 'contacts', id), { read: !currentRead });
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const deleteContact = async (id: string) => {
    if (window.confirm("CONFIRM DELETION OF COMMUNICATION NODE?")) {
      try {
        await deleteDoc(doc(db, 'contacts', id));
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-widest text-white uppercase">Communications Node</h1>
          <p className="text-sm text-slate-400 font-mono tracking-wider mt-2">INCOMING MESSAGES AND INQUIRIES.</p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="SEARCH COMMS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-sm pl-9 pr-4 py-2 rounded-lg text-white focus:outline-none focus:border-cyan-500 w-full md:w-64"
            />
          </div>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-sm px-4 py-2 rounded-lg text-white focus:outline-none focus:border-cyan-500 appearance-none uppercase tracking-widest cursor-pointer"
          >
            <option value="all">ALL</option>
            <option value="unread">UNREAD</option>
            <option value="read">READ</option>
          </select>
        </div>
      </header>

      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
             <div className="p-12 flex justify-center items-center text-cyan-500">
               <Loader2 className="w-8 h-8 animate-spin" />
             </div>
          ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80">
                <th className="p-4 text-xs tracking-widest text-slate-400 uppercase font-medium">Status</th>
                <th className="p-4 text-xs tracking-widest text-slate-400 uppercase font-medium">Sender</th>
                <th className="p-4 text-xs tracking-widest text-slate-400 uppercase font-medium">Subject</th>
                <th className="p-4 text-xs tracking-widest text-slate-400 uppercase font-medium">Date</th>
                <th className="p-4 text-xs tracking-widest text-slate-400 uppercase font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <motion.tr 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={contact.id} 
                  className={`border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors ${!contact.read ? 'bg-cyan-950/10' : ''}`}
                >
                  <td className="p-4">
                    <button onClick={() => toggleRead(contact.id, contact.read)} className="text-slate-500 hover:text-cyan-400">
                      {contact.read ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4 text-cyan-500" />}
                    </button>
                  </td>
                  <td className="p-4">
                    <p className={`text-sm ${!contact.read ? 'text-white font-bold' : 'text-slate-300'}`}>{contact.name}</p>
                    <p className="text-xs text-slate-500">{contact.email}</p>
                  </td>
                  <td className="p-4 max-w-sm">
                    <p className={`text-sm ${!contact.read ? 'text-white' : 'text-slate-300'}`}>{contact.subject || 'NO SUBJECT'}</p>
                    <p className="text-xs text-slate-500 truncate">{contact.body}</p>
                  </td>
                  <td className="p-4 text-xs text-slate-400 tracking-wider">
                    {contact.createdAt?.toDate ? new Date(contact.createdAt.toDate()).toLocaleDateString() : 'UNKNOWN'}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteContact(contact.id)} className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filteredContacts.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-sm text-slate-500 tracking-widest uppercase">
                    NO COMMUNICATIONS FOUND IN THIS SECTOR
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          )}
        </div>
      </div>
    </div>
  );
}
