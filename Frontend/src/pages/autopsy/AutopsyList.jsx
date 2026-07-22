import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, Clock, CheckCircle, FileText, Calendar, 
  Search, Filter, Eye, Printer, Download, Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
// import autopsyService from '../../services/autopsyService';

const mockAutopsies = [
  { id: 'PM-2026-001', caseId: 'C2026-1045', name: 'John Doe', age: 45, gender: 'Male', doctor: 'Dr. Smith', date: '2026-07-21T08:30:00Z', status: 'Pending' },
  { id: 'PM-2026-002', caseId: 'C2026-1046', name: 'Jane Roe', age: 32, gender: 'Female', doctor: 'Dr. Allen', date: '2026-07-20T14:15:00Z', status: 'Awaiting Report' },
  { id: 'PM-2026-003', caseId: 'C2026-1047', name: 'Unknown Male', age: 'N/A', gender: 'Male', doctor: 'Dr. Clark', date: '2026-07-19T09:00:00Z', status: 'Completed' },
];

const AutopsyList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      await new Promise(r => setTimeout(r, 800));
      setData(mockAutopsies);
      setLoading(false);
    };
    fetchData();
  }, []);

  const stats = {
    total: data.length,
    pending: data.filter(d => d.status === 'Pending').length,
    completed: data.filter(d => d.status === 'Completed').length,
    awaiting: data.filter(d => d.status === 'Awaiting Report').length,
    today: 1
  };

  const statCards = [
    { title: "Total Autopsies", value: stats.total, icon: Activity, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Pending", value: stats.pending, icon: Clock, color: "text-amber-600", bg: "bg-amber-100" },
    { title: "Awaiting Report", value: stats.awaiting, icon: FileText, color: "text-purple-600", bg: "bg-purple-100" },
    { title: "Completed", value: stats.completed, icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
    { title: "Today's", value: stats.today, icon: Calendar, color: "text-slate-600", bg: "bg-slate-100" },
  ];

  const filteredData = data.filter(d => 
    d.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen ml-64 font-sans text-slate-800">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Autopsy Management</h1>
          <p className="text-slate-500 mt-2">Overview of postmortem examinations and records.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-all">
            <Filter size={18} />
            Filters
          </button>
          <button 
            onClick={() => navigate('/autopsy/new')}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow-sm shadow-blue-200 hover:bg-blue-700 flex items-center gap-2 transition-all"
          >
            <Plus size={18} />
            New Autopsy
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        {statCards.map((card, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            className="bg-white/80 backdrop-blur-md border border-white/40 p-6 rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${card.bg}`}>
              <card.icon className={card.color} size={24} />
            </div>
            <div>
              <h3 className="text-slate-500 text-sm font-medium">{card.title}</h3>
              <p className="text-2xl font-bold text-slate-800">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-[20px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-semibold text-slate-800">Autopsy Records</h2>
          <div className="flex gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search PM or Case Number..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
            <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors" title="Export CSV"><Download size={20}/></button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">PM / Case No</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Deceased Info</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Assigned Doctor</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((row, i) => (
                <motion.tr 
                  key={row.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="font-medium text-blue-600">{row.id}</div>
                    <div className="text-xs text-slate-500">{row.caseId}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-slate-800">{row.name}</div>
                    <div className="text-xs text-slate-500">{row.age} yrs • {row.gender}</div>
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-medium">{row.doctor}</td>
                  <td className="py-4 px-6 text-slate-500">{dayjs(row.date).format('MMM D, YYYY HH:mm')}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${row.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                        row.status === 'Awaiting Report' ? 'bg-purple-100 text-purple-700' : 
                        'bg-amber-100 text-amber-700'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => navigate(`/autopsy/${row.id}`)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Dashboard"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Print"
                      >
                        <Printer size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500">
                    No records found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AutopsyList;
