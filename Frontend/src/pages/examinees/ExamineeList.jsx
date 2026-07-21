import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users, UserPlus, Search, Filter, Eye, Edit, FileText,
  Printer, MoreVertical, ChevronLeft, ChevronRight, FileDown,
  Clock, Activity, CheckCircle, Shield, Download, FileCheck, UserCheck
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

const dummyExaminees = [
  { id: 'EX-2026-0891', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', nic: '890123456V', name: 'Nimal Perera', gender: 'Male', age: 34, phone: '+94 71 234 5678', caseId: 'C2026-1045', doctor: 'Dr. John Silva', date: '20 Jul 2026', status: 'Pending Examination' },
  { id: 'EX-2026-0890', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', nic: '921456789V', name: 'Kasun Fernando', gender: 'Male', age: 29, phone: '+94 77 987 6543', caseId: 'C2026-1043', doctor: 'Dr. Chandima', date: '18 Jul 2026', status: 'Active Case' },
  { id: 'EX-2026-0889', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', nic: '956789123V', name: 'Dilani Samarasinghe', gender: 'Female', age: 27, phone: '+94 76 543 2109', caseId: 'C2026-1039', doctor: 'Dr. N. Perera', date: '15 Jul 2026', status: 'Completed' },
  { id: 'EX-2026-0888', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', nic: '841239876V', name: 'Sahan Wijesinghe', gender: 'Male', age: 41, phone: '+94 70 112 2334', caseId: 'C2026-1042', doctor: 'Dr. John Silva', date: '17 Jul 2026', status: 'Pending Examination' },
  { id: 'EX-2026-0887', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', nic: '987654321V', name: 'Ruwan Jayasekara', gender: 'Male', age: 38, phone: '+94 71 888 9900', caseId: 'C2026-1041', doctor: 'Dr. N. Perera', date: '16 Jul 2026', status: 'Completed' },
];

const StatCard = ({ title, count, icon: Icon, color, subtext }) => (
  <motion.div
    whileHover={{ y: -3 }}
    className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-200/60 flex items-center gap-5"
  >
    <div className={`p-4 rounded-2xl ${color}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-slate-500 text-sm font-semibold">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{count}</h3>
      {subtext && <p className="text-xs text-slate-400 mt-0.5">{subtext}</p>}
    </div>
  </motion.div>
);

const ExamineeList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterGender, setFilterGender] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const statusColors = {
    'Pending Examination': 'bg-amber-100 text-amber-700 border-amber-200',
    'Active Case': 'bg-blue-100 text-blue-700 border-blue-200',
    'Completed': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  };

  return (
    <DashboardLayout>
      <div className="p-8 bg-slate-50 min-h-screen font-sans">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Examinee Management</h1>
            <p className="text-slate-500 text-sm mt-1">Register, view, and manage examinee forensic records</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium text-sm shadow-sm">
              <Download size={16} /> Export CSV
            </button>
            <button
              onClick={() => navigate('/examinees/new')}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm shadow-blue-600/20"
            >
              <UserPlus size={16} /> Register Examinee
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Examinees" count="1,482" icon={Users} color="bg-blue-50 text-blue-600" subtext="+24 this week" />
          <StatCard title="Today's Registrations" count="8" icon={UserCheck} color="bg-emerald-50 text-emerald-600" subtext="3 completed" />
          <StatCard title="Active Cases" count="45" icon={Activity} color="bg-indigo-50 text-indigo-600" subtext="Assigned to 6 doctors" />
          <StatCard title="Pending Exams" count="14" icon={Clock} color="bg-amber-50 text-amber-600" subtext="Requires JMO review" />
        </div>

        {/* Table & Filter Container */}
        <div className="bg-white border border-slate-200/60 rounded-[20px] shadow-sm overflow-hidden">
          
          {/* Filter Toolbar */}
          <div className="p-5 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4 bg-white">
            <div className="relative flex-1 min-w-[280px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search by Examinee ID, Name, NIC, or Phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value)}
                className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 outline-none focus:border-blue-500 font-medium"
              >
                <option value="All">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 outline-none focus:border-blue-500 font-medium"
              >
                <option value="All">All Statuses</option>
                <option value="Pending Examination">Pending Examination</option>
                <option value="Active Case">Active Case</option>
                <option value="Completed">Completed</option>
              </select>

              <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-100 transition-colors font-medium text-sm">
                <Filter size={16} /> Filters
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
                  <th className="px-6 py-4 font-semibold">Examinee</th>
                  <th className="px-6 py-4 font-semibold">NIC Number</th>
                  <th className="px-6 py-4 font-semibold">Gender / Age</th>
                  <th className="px-6 py-4 font-semibold">Phone</th>
                  <th className="px-6 py-4 font-semibold">Assigned Case</th>
                  <th className="px-6 py-4 font-semibold">Doctor</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dummyExaminees.map((examinee, idx) => (
                  <motion.tr
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={examinee.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img src={examinee.photo} alt={examinee.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                      <div>
                        <div className="font-bold text-slate-800 text-sm">{examinee.name}</div>
                        <div className="text-xs text-blue-600 font-semibold">{examinee.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-700">{examinee.nic}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{examinee.gender}, {examinee.age} yrs</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{examinee.phone}</td>
                    <td className="px-6 py-4">
                      <Link to={`/cases/${examinee.caseId}`} className="text-sm font-semibold text-blue-600 hover:underline">
                        {examinee.caseId}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{examinee.doctor}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[examinee.status]}`}>
                        {examinee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                        <Link to={`/examinees/${examinee.id}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Profile">
                          <Eye size={16} />
                        </Link>
                        <Link to={`/examinees/${examinee.id}/edit`} className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
                          <Edit size={16} />
                        </Link>
                        <Link to={`/examinees/${examinee.id}/history`} className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Medical History">
                          <FileText size={16} />
                        </Link>
                        <Link to={`/examinees/${examinee.id}/consent`} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Consent Forms">
                          <FileCheck size={16} />
                        </Link>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm text-slate-500 font-medium">Showing 1 to 5 of 1,482 examinees</span>
            <div className="flex items-center gap-1">
              <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50"><ChevronLeft size={16} /></button>
              <button className="w-9 h-9 border border-blue-600 bg-blue-600 text-white rounded-lg text-sm font-bold">1</button>
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

export default ExamineeList;
