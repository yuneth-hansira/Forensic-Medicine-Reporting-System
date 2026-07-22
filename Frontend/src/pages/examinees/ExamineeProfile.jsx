import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  User, Edit, Printer, FileText, ChevronRight, QrCode,
  Shield, Stethoscope, Clock, FileCheck, Activity, Phone,
  MapPin, Heart, AlertTriangle, Building2, Calendar, FolderOpen,
  CheckCircle, Plus, ExternalLink
} from 'lucide-react';


const TABS = [
  { id: 'overview',  label: 'Overview',          icon: <User size={16} /> },
  { id: 'history',   label: 'Medical History',   icon: <FileText size={16} /> },
  { id: 'clinical',  label: 'Clinical Findings',  icon: <Stethoscope size={16} /> },
  { id: 'cases',     label: 'Cases',             icon: <FolderOpen size={16} /> },
  { id: 'documents', label: 'Documents',         icon: <FileCheck size={16} /> },
  { id: 'consent',   label: 'Consent Forms',     icon: <Shield size={16} /> },
  { id: 'timeline',  label: 'Timeline',          icon: <Clock size={16} /> },
];

const ExamineeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const examineeId = id || 'EX-2026-0891';
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link to="/examinees" className="hover:text-blue-600 transition-colors">Examinees</Link>
          <ChevronRight size={14} />
          <span className="text-slate-800 font-medium">{examineeId}</span>
        </div>

        {/* Profile Banner / Header */}
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-200/60 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                alt="Examinee Avatar"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-100 shadow-sm"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full" title="Active Record" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-slate-800">Nimal Perera</h1>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-lg border border-amber-200">
                  Pending Examination
                </span>
                <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg border border-blue-100 flex items-center gap-1">
                  <QrCode size={13} /> {examineeId}
                </span>
              </div>
              <p className="text-sm text-slate-500 font-medium">
                NIC: 890123456V • 34 yrs • Male • Blood: <span className="font-bold text-red-600">O+</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium text-sm shadow-sm"
            >
              <Printer size={16} /> Print Profile
            </button>
            <Link
              to={`/examinees/${examineeId}/edit`}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium text-sm shadow-sm"
            >
              <Edit size={16} /> Edit Profile
            </Link>
            <Link
              to={`/examinees/${examineeId}/consent`}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium text-sm shadow-sm shadow-emerald-600/20"
            >
              <Shield size={16} /> Consent Forms
            </Link>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Left Main Content */}
          <div className="lg:col-span-3">

            {/* Navigation Tabs */}
            <div className="flex overflow-x-auto gap-1 bg-white p-1.5 rounded-xl shadow-sm border border-slate-200/60 mb-6">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 shadow-sm'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Body Container */}
            <div className="bg-white rounded-[20px] p-8 shadow-sm border border-slate-200/60 min-h-[500px]">
              <AnimatePresence mode="wait">

                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                  <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <h3 className="text-lg font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">Examinee Overview</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      
                      {/* Personal Info */}
                      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <User size={16} className="text-blue-600" /> Personal Details
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between"><span className="text-slate-500">Full Name</span><span className="font-semibold text-slate-800">Nimal Bandara Perera</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">NIC Number</span><span className="font-semibold text-slate-800">890123456V</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Date of Birth</span><span className="font-semibold text-slate-800">15 Mar 1992 (34 yrs)</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Gender</span><span className="font-semibold text-slate-800">Male</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Marital Status</span><span className="font-semibold text-slate-800">Married</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Occupation</span><span className="font-semibold text-slate-800">Clerk</span></div>
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <Phone size={16} className="text-blue-600" /> Contact Details
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between"><span className="text-slate-500">Phone</span><span className="font-semibold text-slate-800">+94 71 234 5678</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Email</span><span className="font-semibold text-slate-800">nimal.perera@gmail.com</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Address</span><span className="font-semibold text-slate-800 text-right">No. 25, Peradeniya Rd, Kandy</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">District</span><span className="font-semibold text-slate-800">Kandy</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Province</span><span className="font-semibold text-slate-800">Central Province</span></div>
                        </div>
                      </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Emergency Contact */}
                      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <Heart size={16} className="text-red-500" /> Emergency Contact
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between"><span className="text-slate-500">Name</span><span className="font-semibold text-slate-800">Kamala Perera</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Relationship</span><span className="font-semibold text-slate-800">Spouse</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Phone</span><span className="font-semibold text-slate-800">+94 71 999 8877</span></div>
                        </div>
                      </div>

                      {/* Forensic Details */}
                      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <Shield size={16} className="text-blue-600" /> Current Case Info
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between"><span className="text-slate-500">Case ID</span><span className="font-semibold text-blue-600">C2026-1045</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">MLEF Number</span><span className="font-semibold text-slate-800">MLE-892</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Police Station</span><span className="font-semibold text-slate-800">Kandy Police Station</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Investigating Officer</span><span className="font-semibold text-slate-800">IP Kumara</span></div>
                        </div>
                      </div>
                    </div>

                  </motion.div>
                )}

                {/* MEDICAL HISTORY TAB */}
                {activeTab === 'history' && (
                  <motion.div key="history" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                      <h3 className="text-lg font-bold text-slate-800">Medical History</h3>
                      <Link to={`/examinees/${examineeId}/history`} className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1">
                        Full View <ExternalLink size={14} />
                      </Link>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                        <h4 className="font-bold text-amber-800 text-sm mb-1">Known Allergies</h4>
                        <p className="text-sm text-amber-700">Penicillin — causes skin rashes and mild dyspnea.</p>
                      </div>

                      <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                        <h4 className="font-bold text-slate-800 text-sm mb-1">Past Surgeries</h4>
                        <p className="text-sm text-slate-600">Appendectomy completed at Kandy General Hospital in 2021.</p>
                      </div>

                      <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                        <h4 className="font-bold text-slate-800 text-sm mb-1">Active Medications</h4>
                        <p className="text-sm text-slate-600">Paracetamol 500mg TDS, Amoxicillin 500mg TDS (Discontinued).</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* CLINICAL FINDINGS TAB */}
                {activeTab === 'clinical' && (
                  <motion.div key="clinical" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <h3 className="text-lg font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">Clinical Findings</h3>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-700 leading-relaxed mb-6">
                      Patient examined on 20 Jul 2026. Laceration on forehead (4 cm) and multiple contusions on left forearm noted. Photo documentation attached in evidence section.
                    </div>
                    <Link to={`/cases/C2026-1045`} className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg inline-flex items-center gap-2">
                      Open Case Clinical Sheet <ChevronRight size={14} />
                    </Link>
                  </motion.div>
                )}

                {/* CASES TAB */}
                {activeTab === 'cases' && (
                  <motion.div key="cases" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <h3 className="text-lg font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">Assigned Forensic Cases</h3>
                    <div className="border border-slate-200/60 rounded-xl overflow-hidden">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 text-xs uppercase text-slate-400 font-semibold">
                          <tr>
                            <th className="p-4">Case ID</th>
                            <th className="p-4">Type</th>
                            <th className="p-4">Doctor</th>
                            <th className="p-4">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                          <tr className="hover:bg-slate-50">
                            <td className="p-4 font-bold text-blue-600"><Link to="/cases/C2026-1045">C2026-1045</Link></td>
                            <td className="p-4 text-slate-600">Medico-Legal</td>
                            <td className="p-4 text-slate-600">Dr. John Silva</td>
                            <td className="p-4"><span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">Pending</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

                {/* CONSENT TAB */}
                {activeTab === 'consent' && (
                  <motion.div key="consent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                      <h3 className="text-lg font-bold text-slate-800">Consent Forms</h3>
                      <Link to={`/examinees/${examineeId}/consent`} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center gap-2">
                        <Plus size={14} /> New Consent
                      </Link>
                    </div>
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="text-emerald-600" size={20} />
                        <div>
                          <p className="font-bold text-emerald-900 text-sm">Medical Examination Consent</p>
                          <p className="text-xs text-emerald-700 mt-0.5">Signed by Examinee on 20 Jul 2026</p>
                        </div>
                      </div>
                      <Link to={`/examinees/${examineeId}/consent`} className="text-xs font-bold text-emerald-800 hover:underline">View PDF</Link>
                    </div>
                  </motion.div>
                )}

                {/* TIMELINE TAB */}
                {activeTab === 'timeline' && (
                  <motion.div key="timeline" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <h3 className="text-lg font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">Examinee Audit Trail</h3>
                    <div className="space-y-4 pl-4 border-l-2 border-slate-100">
                      <div className="relative pl-6">
                        <div className="absolute -left-[25px] top-1 w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white" />
                        <p className="font-bold text-slate-800 text-sm">Registered Examinee Record</p>
                        <p className="text-xs text-slate-400 mt-0.5">20 Jul 2026, 10:15 AM by Clerk</p>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>

          {/* Right Sidebar Widgets */}
          <div className="space-y-6">

            {/* Doctor Widget */}
            <div className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-200/60">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Assigned JMO</h4>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-lg">JS</div>
                <div>
                  <h5 className="font-bold text-slate-800 text-sm">Dr. John Silva</h5>
                  <p className="text-xs text-slate-500 mt-0.5">Senior JMO • Kandy</p>
                </div>
              </div>
            </div>

            {/* Hospital Info Widget */}
            <div className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-200/60">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Hospital Details</h4>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Hospital</span><span className="font-semibold text-slate-800">Kandy General</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Ward</span><span className="font-semibold text-slate-800">Ward 12</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Bed</span><span className="font-semibold text-slate-800">Bed 14</span></div>
              </div>
            </div>

            {/* Upcoming Examination Widget */}
            <div className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-200/60">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Upcoming Schedule</h4>
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
                <p className="font-bold text-blue-800 text-sm">Re-examination</p>
                <p className="text-xs text-blue-600 mt-1">28 Jul 2026 at 10:00 AM</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
};

export default ExamineeProfile;
