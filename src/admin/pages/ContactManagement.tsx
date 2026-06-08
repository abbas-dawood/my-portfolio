import React, { useState, useEffect } from 'react';
import { Search, Filter, Trash2, MailOpen, Mail, Eye, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

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
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await deleteDoc(doc(db, 'contacts', id));
        if (selectedContact?.id === id) {
          setSelectedContact(null);
        }
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Messages</h1>
          <p className="text-sm text-slate-500 mt-1">Manage incoming messages from your portfolio.</p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border border-slate-200 text-sm pl-9 pr-4 py-2 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
          </div>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white border border-slate-200 text-sm px-4 py-2 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer outline-none"
          >
            <option value="all">All</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
      </header>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          {loading ? (
             <div className="p-12 flex justify-center items-center text-blue-500">
               <Loader2 className="w-8 h-8 animate-spin" />
             </div>
          ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Sender</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Subject</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Date</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <motion.tr 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={contact.id} 
                  className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${!contact.read ? 'bg-blue-50/30' : ''}`}
                >
                  <td className="p-4">
                    <button onClick={() => toggleRead(contact.id, contact.read)} className="text-slate-400 hover:text-blue-500">
                      {contact.read ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4 text-blue-500" />}
                    </button>
                  </td>
                  <td className="p-4">
                    <p className={`text-sm ${!contact.read ? 'text-slate-900 font-bold' : 'text-slate-700'}`}>{contact.name}</p>
                    <p className="text-xs text-slate-500">{contact.email}</p>
                  </td>
                  <td className="p-4 max-w-sm">
                    <p className={`text-sm ${!contact.read ? 'text-slate-900 font-semibold' : 'text-slate-700'}`}>{contact.subject || 'No Subject'}</p>
                    <p className="text-xs text-slate-500 truncate">{contact.body}</p>
                  </td>
                  <td className="p-4 text-xs text-slate-400">
                    {contact.createdAt?.toDate ? new Date(contact.createdAt.toDate()).toLocaleDateString() : 'Unknown'}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setSelectedContact(contact)}
                        className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors" title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteContact(contact.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filteredContacts.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-sm text-slate-500">
                    No messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          )}
        </div>
      </div>

      {/* Message Modal */}
      <AnimatePresence>
        {selectedContact && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden"
            >
              <div className="p-6 border-b border-slate-200 flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedContact.subject || 'New Message'}</h3>
                  <div className="text-sm text-slate-500 mt-1">
                    From: <span className="font-medium text-slate-700">{selectedContact.name}</span> ({selectedContact.email})
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedContact(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  Close
                </button>
              </div>
              <div className="p-6 overflow-y-auto whitespace-pre-wrap text-slate-700 text-sm leading-relaxed">
                {selectedContact.body}
              </div>
              <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-sm">
                <span className="text-slate-500">
                  Received on {selectedContact.createdAt?.toDate ? new Date(selectedContact.createdAt.toDate()).toLocaleString() : 'Unknown Database Time'}
                </span>
                <div className="flex gap-3">
                   {!selectedContact.read && (
                     <button 
                       onClick={() => {
                         toggleRead(selectedContact.id, selectedContact.read);
                         setSelectedContact(null);
                       }}
                       className="text-blue-600 hover:text-blue-700 font-medium"
                     >
                       Mark as Read
                     </button>
                   )}
                   <a 
                     href={`mailto:${selectedContact.email}`}
                     className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                   >
                     Reply to Email
                   </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
