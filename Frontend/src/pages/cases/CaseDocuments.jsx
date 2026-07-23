import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, UploadCloud, Search, Filter, FileText, Image as ImageIcon, File, Download, Trash2, Eye } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { authService } from '../../services/authService';
import { canCreate, canEdit, canDelete } from '../../utils/permissions';

const documents = [];

const getIcon = (type) => {
  if (type === 'PDF') return <FileText size={32} className="text-red-500" />;
  if (type === 'Image') return <ImageIcon size={32} className="text-blue-500" />;
  return <File size={32} className="text-slate-500" />;
};

const CaseDocuments = () => {
  const user = authService.getUser();
  const [view, setView] = useState('grid');
  const [search, setSearch] = useState('');

  return (
    <DashboardLayout>
      <div className="p-8 bg-slate-50 min-h-screen font-sans">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link to="/cases" className="hover:text-blue-600 transition-colors">Case Management</Link>
          <ChevronRight size={14} />
          <Link to="/cases/C2026-1045" className="hover:text-blue-600 transition-colors">C2026-1045</Link>
          <ChevronRight size={14} />
          <span className="text-slate-800 font-medium">Documents</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Case Documents</h1>
            <p className="text-slate-500 mt-1 text-sm">Manage, view, and upload case-related files.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm shadow-blue-600/20">
            <UploadCloud size={18} /> Upload Document
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-[20px] p-4 shadow-sm border border-slate-200/60 mb-6 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search documents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-100 transition-colors text-sm font-medium">
              <Filter size={16} /> Filter
            </button>
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button onClick={() => setView('grid')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${view === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Grid</button>
            <button onClick={() => setView('list')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${view === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>List</button>
          </div>
        </div>

        {/* Upload Area */}
        <div className="border-2 border-dashed border-slate-300 rounded-[20px] p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-blue-50/50 hover:border-blue-400 transition-colors cursor-pointer mb-8 group">
          <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <UploadCloud size={28} className="text-blue-500" />
          </div>
          <h3 className="text-slate-800 font-bold text-lg">Click or drag documents to upload</h3>
          <p className="text-slate-500 text-sm mt-1">Supports PDF, JPG, PNG, DOCX up to 20MB</p>
        </div>

        {/* Document Grid/List */}
        {documents.length === 0 ? (
          <div className="bg-white rounded-[20px] p-12 shadow-sm border border-slate-200/60 text-center flex flex-col items-center">
            <FileText size={48} className="text-slate-200 mb-4" />
            <h3 className="text-lg font-bold text-slate-700">No documents found</h3>
            <p className="text-slate-500 mt-1">There are no documents uploaded for this case yet.</p>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {documents.map((doc, idx) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                key={doc.id} 
                className="bg-white rounded-[20px] p-5 shadow-sm border border-slate-200/60 hover:shadow-md hover:border-blue-200 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                    {getIcon(doc.type)}
                  </div>
                  <button className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                    <Trash2 size={18} />
                  </button>
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-1 truncate" title={doc.name}>{doc.name}</h4>
                <div className="flex justify-between items-center text-xs text-slate-500 mb-4">
                  <span className="bg-slate-100 px-2 py-1 rounded-md">{doc.category}</span>
                  <span>{doc.size}</span>
                </div>
                <div className="flex gap-2 pt-4 border-t border-slate-100">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors">
                    <Eye size={14} /> Preview
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors">
                    <Download size={14} /> Download
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[20px] shadow-sm border border-slate-200/60 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
                  <th className="px-6 py-4 font-semibold">Document Name</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold">Size</th>
                  <th className="px-6 py-4 font-semibold">Uploaded By</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4 flex items-center gap-3">
                      {getIcon(doc.type)}
                      <span className="font-semibold text-slate-800 text-sm">{doc.name}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600"><span className="bg-slate-100 px-2.5 py-1 rounded-lg">{doc.category}</span></td>
                    <td className="px-6 py-4 text-sm text-slate-500">{doc.size}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{doc.user}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{doc.date}</td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Eye size={16} /></button>
                        <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"><Download size={16} /></button>
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default CaseDocuments;
