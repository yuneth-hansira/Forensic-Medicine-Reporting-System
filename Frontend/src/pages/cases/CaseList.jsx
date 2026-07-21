import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText, CheckCircle, Clock, AlertTriangle, Search,
  Filter, MoreVertical, Eye, Edit, UserPlus, UploadCloud,
  XCircle, ChevronLeft, ChevronRight, FileDown, Download
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

const dummyCases = [
  { id: 'C2026-1045', mle: 'MLE-892', type: 'Medico-Legal', examinee: 'Nimal Perera', doctor: 'Dr. John Silva', police: 'Kandy PS', status: 'Pending', date: '20 Jul 2026' },
  { id: 'C2026-1044', mle: 'PM-412', type: 'Postmortem', examinee: 'Unknown', doctor: 'Dr. N. Perera', police: 'Peradeniya PS', status: 'Completed', date: '19 Jul 2026' },
  { id: 'C2026-1043', mle: 'MLE-890', type: 'Injury', examinee: 'Kasun Fernando', doctor: 'Dr. Chandima', police: 'Katugastota PS', status: 'Emergency', date: '18 Jul 2026' },
  { id: 'C2026-1042', mle: 'MLE-889', type: 'Toxicology', examinee: 'Sahan Wijesinghe', doctor: 'Dr. John Silva', police: 'Kandy PS', status: 'Pending', date: '17 Jul 2026' },
  { id: 'C2026-1041', mle: 'MLE-888', type: 'Medico-Legal', examinee: 'Ruwan Jayasekara', doctor: 'Dr. N. Perera', police: 'Kandy PS', status: 'Completed', date: '16 Jul 2026' },
];

const StatCard = ({ title, count, icon, color }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-200/60 flex items-center gap-4"
  >
    <div className={`p-4 rounded-2xl ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-slate-500 text-sm font-semibold">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{count}</h3>
    </div>
  </motion.div>
);

const CaseList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const statusColors = {
    Pending: 'bg-amber-100 text-amber-700 border-amber-200',
    Completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Emergency: 'bg-red-100 text-red-700 border-red-200',
    Closed: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <DashboardLayout>
      <div className="p-8 bg-slate-50 min-h-screen font-sans">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Case Management</h1>
            <p className="text-slate-500 text-sm mt-1">Manage and track all forensic cases</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium text-sm shadow-sm">
              <Download size={16} /> Export
            </button>
            <button
              onClick={() => navigate('/cases/new')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm shadow-blue-600/20"
            >
              <PlusIcon size={16} /> New Case
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Cases" count="1,245" icon={<FileText size={24} />} color="bg-blue-50 text-blue-600" />
          <StatCard title="Pending" count="42" icon={<Clock size={24} />} color="bg-amber-50 text-amber-600" />
          <StatCard title="Completed" count="856" icon={<CheckCircle size={24} />} color="bg-emerald-50 text-emerald-600" />
          <StatCard title="Emergency" count="12" icon={<AlertTriangle size={24} />} color="bg-red-50 text-red-600" />
        </div>

        {/* Table Section */}
        <div className="bg-white border border-slate-200/60 rounded-[20px] shadow-sm overflow-hidden">
          
          {/* Toolbar */}
          <div className="p-5 border-b border-slate-100 flex justify-between items-center gap-4 bg-white/50 backdrop-blur-sm">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search cases by ID, name, or police station..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium text-sm">
              <Filter size={16} /> Filters
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Case ID</th>
                  <th className="px-6 py-4 font-semibold">Type</th>
                  <th className="px-6 py-4 font-semibold">Examinee</th>
                  <th className="px-6 py-4 font-semibold">Assigned Doctor</th>
                  <th className="px-6 py-4 font-semibold">Police Station</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dummyCases.map((caseItem, idx) => (
                  <motion.tr
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={caseItem.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-blue-600">{caseItem.id}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{caseItem.mle}</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-700">{caseItem.type}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-slate-800">{caseItem.examinee}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{caseItem.doctor}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{caseItem.police}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[caseItem.status]}`}>
                        {caseItem.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{caseItem.date}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link to={`/cases/${caseItem.id}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye size={16} />
                        </Link>
                        <Link to={`/cases/${caseItem.id}/edit`} className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                          <Edit size={16} />
                        </Link>
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-5 border-t border-slate-100 flex items-center justify-between">
            <span className="text-sm text-slate-500">Showing 1 to 5 of 1,245 cases</span>
            <div className="flex gap-1">
              <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50"><ChevronLeft size={16} /></button>
              <button className="w-9 h-9 border border-blue-600 bg-blue-600 text-white rounded-lg text-sm font-medium">1</button>
              <button className="w-9 h-9 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium">2</button>
              <button className="w-9 h-9 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium">3</button>
              <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const PlusIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default CaseList;
