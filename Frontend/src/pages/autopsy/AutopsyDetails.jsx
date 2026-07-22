import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  FileText, Printer, Lock, Edit2, ShieldAlert, 
  Activity, Users, FileCheck, Stethoscope, ChevronRight,
  Clock, CheckCircle, AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';

const mockData = {
  pmNumber: 'PM-2026-001',
  caseId: 'C2026-1045',
  status: 'In Progress',
  date: '2026-07-21T08:30:00Z',
  doctor: 'Dr. Smith',
  hospital: 'General Hospital',
  deceased: {
    name: 'John Doe',
    age: 45,
    gender: 'Male'
  },
  progress: 45
};

const navTabs = [
  { name: 'Overview', path: '', icon: Activity },
  { name: 'Postmortem Findings', path: '/postmortem', icon: ShieldAlert },
  { name: 'Cause of Death', path: '/cause-of-death', icon: FileCheck },
  { name: 'Opinion', path: '/opinion', icon: Stethoscope },
  { name: 'Specimens', path: '/specimens', icon: Users },
];

const AutopsyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (path) => {
    navigate(`/autopsy/${id}${path}`);
  };

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen ml-64 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Header section */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-sm text-slate-500 font-medium">
              <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate('/autopsy')}>Autopsy</span>
              <span>/</span>
              <span className="text-blue-600">{id}</span>
            </div>
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">{id}</h1>
              <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-semibold rounded-full border border-amber-200">
                {mockData.status}
              </span>
            </div>
            <p className="text-slate-500 mt-2">Case No: {mockData.caseId} • {dayjs(mockData.date).format('MMMM D, YYYY')}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-all">
              <Edit2 size={16} /> Edit
            </button>
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-all">
              <FileText size={16} /> Report
            </button>
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-all">
              <Printer size={16} /> Print
            </button>
            <button className="px-4 py-2 bg-red-50 border border-red-100 text-red-600 rounded-xl shadow-sm hover:bg-red-100 flex items-center gap-2 transition-all">
              <Lock size={16} /> Close Autopsy
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 p-1 bg-slate-200/50 rounded-2xl mb-8 border border-slate-200/50">
          {navTabs.map((tab) => {
            const isActive = tab.path === '' 
              ? location.pathname === `/autopsy/${id}`
              : location.pathname.includes(tab.path);
            
            return (
              <button
                key={tab.name}
                onClick={() => handleTabClick(tab.path)}
                className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all ${isActive ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-white/50 hover:text-slate-800'}`}
              >
                <tab.icon size={16} />
                {tab.name}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content (Overview) */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Users className="text-blue-600" size={20} />
                Deceased Information
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Full Name</p>
                  <p className="font-medium text-slate-800">{mockData.deceased.name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Age / Gender</p>
                  <p className="font-medium text-slate-800">{mockData.deceased.age} yrs • {mockData.deceased.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Identification Status</p>
                  <p className="font-medium text-green-600">Identified</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <FileText className="text-purple-600" size={20} />
                Case Summary
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The deceased was brought to the mortuary following a suspected road traffic accident. Initial police reports indicate pedestrian struck by a vehicle.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Police Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-slate-500">Station:</span><span className="font-medium text-slate-800">Central Station</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Officer:</span><span className="font-medium text-slate-800">Sgt. Miller</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Court Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-slate-500">Jurisdiction:</span><span className="font-medium text-slate-800">District 4</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Inquest No:</span><span className="font-medium text-slate-800">INQ-4021</span></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-4">Administrative Details</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Stethoscope size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase">Assigned Doctor</p>
                    <p className="font-medium text-slate-800">{mockData.doctor}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                    <Activity size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase">Hospital</p>
                    <p className="font-medium text-slate-800">{mockData.hospital}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-4 flex justify-between">
                <span>Case Progress</span>
                <span className="text-blue-600">{mockData.progress}%</span>
              </h3>
              <div className="w-full bg-slate-100 rounded-full h-2.5 mb-6">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${mockData.progress}%` }}></div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-sm font-medium text-slate-700">Initial Registration</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-sm font-medium text-slate-700">External Examination</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-amber-500" />
                  <span className="text-sm font-medium text-slate-700">Internal Examination</span>
                </div>
                <div className="flex items-center gap-3">
                  <AlertCircle size={16} className="text-slate-300" />
                  <span className="text-sm font-medium text-slate-400">Lab Results Pending</span>
                </div>
                <div className="flex items-center gap-3">
                  <AlertCircle size={16} className="text-slate-300" />
                  <span className="text-sm font-medium text-slate-400">Final Opinion</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutopsyDetails;
