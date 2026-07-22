import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save, Printer, Download, Search, Filter,
  Bold, Italic, Underline, List, Paperclip, Mic, Image as ImageIcon,
  Clock, Pin, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const categories = [
  'General Notes', 'Clinical Notes', 'Doctor Notes', 'Evidence Notes', 'Laboratory Notes'
];

const mockNotes = [
  { id: 1, title: 'Initial Assessment', category: 'General Notes', date: '2026-07-21T10:30:00Z', content: 'Patient arrived with superficial wounds on arms.', isPinned: true },
  { id: 2, title: 'Lab Results Review', category: 'Laboratory Notes', date: '2026-07-21T14:15:00Z', content: 'Blood tests show elevated WBC.', isPinned: false },
];

const Notes = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  
  const handleSave = () => {
    toast.success('Note saved successfully');
    setIsEditorOpen(false);
  };

  const filteredNotes = mockNotes.filter(note => 
    (activeCategory === 'All' || note.category === activeCategory) &&
    (note.title.toLowerCase().includes(searchTerm.toLowerCase()) || note.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="font-sans text-slate-800">
      <div className="max-w-6xl mx-auto flex flex-col h-[calc(100vh-6rem)]">
        <div className="mb-6 flex justify-between items-end flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-2 text-sm text-slate-500 font-medium">
              <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate('/clinical/dashboard')}>Clinical</span>
              <span>/</span>
              <span className="hover:text-blue-600 cursor-pointer">{caseId}</span>
              <span>/</span>
              <span className="text-blue-600">Notes</span>
            </div>
            <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Clinical Notes</h1>
          </div>
          <div className="flex gap-4">
            <button className="p-2 bg-white border border-slate-200 text-slate-700 rounded-xl shadow-sm hover:bg-slate-50 transition-all">
              <Printer size={18} />
            </button>
            <button className="p-2 bg-white border border-slate-200 text-slate-700 rounded-xl shadow-sm hover:bg-slate-50 transition-all">
              <Download size={18} />
            </button>
            <button 
              onClick={() => setIsEditorOpen(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-sm shadow-blue-200 hover:bg-blue-700 flex items-center gap-2 transition-all"
            >
              <FileText size={18} /> New Note
            </button>
          </div>
        </div>

        <div className="flex-1 flex gap-6 min-h-0">
          {/* Sidebar Filters */}
          <div className="w-64 flex flex-col gap-4">
            <div className="bg-white rounded-[20px] shadow-sm border border-slate-100 p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search notes..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">Categories</h3>
              <div className="space-y-1">
                <button 
                  onClick={() => setActiveCategory('All')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === 'All' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  All Notes
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notes List / Editor Area */}
          <div className="flex-1 bg-white rounded-[24px] shadow-sm border border-slate-100 flex flex-col overflow-hidden relative">
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
              {filteredNotes.map(note => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={note.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {note.isPinned && <Pin size={14} className="text-amber-500 fill-amber-500" />}
                      <h3 className="font-semibold text-slate-800">{note.title}</h3>
                    </div>
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                      <Clock size={12} /> {new Date(note.date).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md mb-3 font-medium">{note.category}</span>
                  <p className="text-slate-600 text-sm line-clamp-2">{note.content}</p>
                </motion.div>
              ))}
              {filteredNotes.length === 0 && (
                <div className="h-full flex items-center justify-center text-slate-400">
                  No notes found matching your criteria.
                </div>
              )}
            </div>
            
            {/* Slide-up Editor */}
            <AnimatePresence>
              {isEditorOpen && (
                <motion.div 
                  initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="absolute inset-x-0 bottom-0 h-[80%] bg-white rounded-t-[24px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-slate-200 flex flex-col z-10"
                >
                  <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-[24px]">
                    <input type="text" placeholder="Note Title..." className="text-lg font-semibold bg-transparent border-none focus:outline-none w-1/2" />
                    <div className="flex gap-3">
                      <button onClick={() => setIsEditorOpen(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-xl transition-colors text-sm">Cancel</button>
                      <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors text-sm flex items-center gap-2">
                        <Save size={16} /> Save Note
                      </button>
                    </div>
                  </div>
                  
                  {/* Rich Text Toolbar Mock */}
                  <div className="px-6 py-2 border-b border-slate-100 flex gap-2 text-slate-600 bg-white">
                    <button className="p-2 hover:bg-slate-100 rounded-lg"><Bold size={16} /></button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg"><Italic size={16} /></button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg"><Underline size={16} /></button>
                    <div className="w-px h-6 bg-slate-200 my-auto mx-2"></div>
                    <button className="p-2 hover:bg-slate-100 rounded-lg"><List size={16} /></button>
                    <div className="w-px h-6 bg-slate-200 my-auto mx-2"></div>
                    <select className="bg-slate-50 border border-slate-200 rounded-lg px-2 text-sm focus:outline-none">
                      <option>General Notes</option>
                      <option>Clinical Notes</option>
                      <option>Doctor Notes</option>
                    </select>
                    <div className="ml-auto flex gap-2">
                      <button className="p-2 hover:bg-slate-100 text-blue-600 rounded-lg"><Paperclip size={16} /></button>
                      <button className="p-2 hover:bg-slate-100 text-amber-600 rounded-lg"><ImageIcon size={16} /></button>
                      <button className="p-2 hover:bg-slate-100 text-purple-600 rounded-lg"><Mic size={16} /></button>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-6">
                    <textarea 
                      className="w-full h-full resize-none border-none focus:outline-none text-slate-700" 
                      placeholder="Start typing your note here..."
                    ></textarea>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Notes;
