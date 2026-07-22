import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, Clock, CheckCircle, AlertCircle, Calendar, 
  Search, Filter, Eye, ArrowRight, FileText, FileSpreadsheet
} from 'lucide-react';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import clinicalService from '../../services/clinicalService';

const ClinicalDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    todays: 0,
    pending: 0,
    completed: 0,
    urgent: 0,
    upcoming: 0,
    cases: []
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Simulating API call since backend is not ready
      // const res = await clinicalService.getDashboard();
      
      // Mock data for UI demonstration
      setTimeout(() => {
        setData({
          todays: 12,
          pending: 5,
          completed: 150,
          urgent: 2,
          upcoming: 8,
          cases: [
            { id: 'C2026-1045', patient: 'John Doe', doctor: 'Dr. Smith', type: 'Autopsy', status: 'Pending', date: new Date().toISOString() },
            { id: 'C2026-1046', patient: 'Jane Roe', doctor: 'Dr. Allen', type: 'Clinical', status: 'In Progress', date: new Date().toISOString() },
            { id: 'C2026-1047', patient: 'Unknown', doctor: 'Dr. Clark', type: 'Autopsy', status: 'Completed', date: new Date(Date.now() - 86400000).toISOString() },
          ]
        });
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const statCards = [
    { title: "Today's Exams", value: data.todays, icon: Activity, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Pending", value: data.pending, icon: Clock, color: "text-amber-600", bg: "bg-amber-100" },
    { title: "Completed", value: data.completed, icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
    { title: "Urgent", value: data.urgent, icon: AlertCircle, color: "text-red-600", bg: "bg-red-100" },
    { title: "Upcoming", value: data.upcoming, icon: Calendar, color: "text-purple-600", bg: "bg-purple-100" },
    { title: "Total Cases", value: data.cases.length, icon: FileSpreadsheet, color: "text-slate-600", bg: "bg-slate-100" },
  ];

  const filteredCases = data.cases.filter(c => 
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.patient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="font-sans text-slate-800">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Clinical Dashboard</h1>
          <p className="text-slate-500 mt-2">Overview of clinical examinations and active cases.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-all">
            <Filter size={18} />
            Filter
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow-sm shadow-blue-200 hover:bg-blue-700 flex items-center gap-2 transition-all">
            <Activity size={18} />
            New Examination
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        {statCards.map((card, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/80 backdrop-blur-md border border-white/40 p-6 rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${card.bg} group-hover:scale-110 transition-transform`}>
              <card.icon className={card.color} size={24} />
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{card.title}</h3>
            <p className="text-3xl font-bold text-slate-800 mt-1">{card.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-[20px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-semibold text-slate-800">Recent Clinical Cases</h2>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search cases..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Case Number</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Doctor</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCases.map((c, i) => (
                <motion.tr 
                  key={c.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 px-6 font-medium text-blue-600">{c.id}</td>
                  <td className="py-4 px-6 font-medium text-slate-800">{c.patient}</td>
                  <td className="py-4 px-6 text-slate-600">{c.doctor}</td>
                  <td className="py-4 px-6 text-slate-600">{c.type}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${c.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                        c.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                        'bg-blue-100 text-blue-700'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-500">{dayjs(c.date).format('MMM D, YYYY')}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => navigate(`/clinical/${c.id}/external`)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View / Continue Exam"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Generate Report"
                      >
                        <FileText size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filteredCases.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-500">
                    No cases found matching your search.
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

export default ClinicalDashboard;
