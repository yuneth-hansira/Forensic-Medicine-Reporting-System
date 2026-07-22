import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FileText, Save, CheckCircle, Search, Clock, 
  PenTool, History, Download, Gavel, FileCheck 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const opinionCategories = [
  { id: 'medical', title: 'Medical Opinion', icon: FileCheck },
  { id: 'forensic', title: 'Forensic Opinion', icon: Search },
  { id: 'legal', title: 'Legal & Court Recommendations', icon: Gavel },
  { id: 'police', title: 'Police Investigation Recommendations', icon: FileText },
];

const MedicoLegalOpinion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('medical');
  const [content, setContent] = useState({});
  const [isSigned, setIsSigned] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveDraft = () => {
    toast.success('Opinion draft saved');
  };

  const handleSignAndSubmit = async () => {
    try {
      setIsSubmitting(true);
      await new Promise(r => setTimeout(r, 1500));
      setIsSigned(true);
      toast.success('Opinion digitally signed and finalized');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ActiveIcon = opinionCategories.find(c => c.id === activeCategory)?.icon || FileText;

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen ml-64 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col h-[calc(100vh-6rem)]">
        <div className="mb-6 flex justify-between items-end flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-2 text-sm text-slate-500 font-medium">
              <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate('/autopsy')}>Autopsy</span>
              <span>/</span>
              <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate(`/autopsy/${id}`)}>{id}</span>
              <span>/</span>
              <span className="text-blue-600">Opinion</span>
            </div>
            <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Medico-Legal Opinion</h1>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-all">
              <History size={18} /> Version History
            </button>
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-all">
              <Download size={18} /> Generate Report
            </button>
          </div>
        </div>

        <div className="flex-1 flex gap-6 min-h-0">
          {/* Sidebar */}
          <div className="w-72 flex flex-col gap-4">
            <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-4">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Opinion Sections</h3>
              <div className="space-y-1 mb-6">
                {opinionCategories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                      ${activeCategory === cat.id ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    <cat.icon size={16} className={activeCategory === cat.id ? 'text-blue-600' : 'text-slate-400'} />
                    {cat.title}
                  </button>
                ))}
              </div>

              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Status & Signatures</h3>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-600">Review Status</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${isSigned ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {isSigned ? 'Finalized' : 'Draft'}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">DS</div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Assigned Doctor</p>
                    <p className="text-sm font-semibold text-slate-800">Dr. Smith</p>
                  </div>
                </div>
                {isSigned && (
                  <div className="mt-3 flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-2 py-1.5 rounded-lg">
                    <PenTool size={12} /> Digitally Signed ({new Date().toLocaleDateString()})
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Editor Area */}
          <div className="flex-1 bg-white rounded-[24px] shadow-sm border border-slate-100 flex flex-col overflow-hidden relative">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
              <ActiveIcon size={20} className="text-blue-600" />
              <h2 className="text-lg font-semibold text-slate-800">{opinionCategories.find(c => c.id === activeCategory)?.title}</h2>
            </div>
            
            {/* Toolbar mockup */}
            <div className="px-6 py-2 border-b border-slate-100 flex gap-2 text-slate-600 bg-white">
              <button className="px-3 py-1.5 hover:bg-slate-100 rounded-lg text-sm font-bold">B</button>
              <button className="px-3 py-1.5 hover:bg-slate-100 rounded-lg text-sm italic font-serif">I</button>
              <button className="px-3 py-1.5 hover:bg-slate-100 rounded-lg text-sm underline">U</button>
              <div className="w-px h-5 bg-slate-200 my-auto mx-2"></div>
              <button className="px-3 py-1.5 hover:bg-slate-100 rounded-lg text-sm">H1</button>
              <button className="px-3 py-1.5 hover:bg-slate-100 rounded-lg text-sm">H2</button>
            </div>
            
            <div className="flex-1 p-6 relative">
              <textarea 
                value={content[activeCategory] || ''}
                onChange={(e) => setContent({...content, [activeCategory]: e.target.value})}
                disabled={isSigned}
                className="w-full h-full resize-none border-none focus:outline-none text-slate-700 leading-relaxed disabled:bg-transparent disabled:text-slate-600" 
                placeholder={`Type the ${opinionCategories.find(c => c.id === activeCategory)?.title.toLowerCase()} here...`}
              ></textarea>
              
              {isSigned && (
                <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] flex items-center justify-center pointer-events-none"></div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              {!isSigned && (
                <>
                  <button onClick={handleSaveDraft} className="px-6 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-100 transition-colors">
                    Save Draft
                  </button>
                  <button 
                    onClick={handleSignAndSubmit}
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-70 shadow-sm shadow-blue-200"
                  >
                    <PenTool size={16} /> 
                    {isSubmitting ? 'Signing...' : 'Sign & Finalize'}
                  </button>
                </>
              )}
              {isSigned && (
                <div className="flex items-center gap-2 text-green-600 font-medium">
                  <CheckCircle size={18} /> Document Finalized and Locked
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicoLegalOpinion;
