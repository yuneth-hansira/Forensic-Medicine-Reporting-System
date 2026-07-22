import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Edit, Printer, CheckCircle, Lock,
  User, Shield, Stethoscope, Clock, AlertTriangle,
  Gavel, ChevronRight, Check, Activity, FileDown, Users
} from 'lucide-react';


const TABS = [
  { id: 'overview',  label: 'Overview',         icon: <FileText size={16} /> },
  { id: 'examinee',  label: 'Examinee',          icon: <User size={16} /> },
  { id: 'clinical',  label: 'Clinical Findings', icon: <Stethoscope size={16} /> },
  { id: 'police',    label: 'Police',            icon: <Shield size={16} /> },
  { id: 'court',     label: 'Court',             icon: <Gavel size={16} /> },
  { id: 'timeline',  label: 'Timeline',          icon: <Clock size={16} /> },
];

// ── Tab content components ────────────────────────────────────────────────────

const OverviewTab = () => (
  <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
    <h3 className="text-lg font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">Case Overview</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Case Details</h4>
        <div className="space-y-3.5">
          {[
            ['Case ID',      'C2026-1045'],
            ['MLEF Number',  'MLE-892'],
            ['Case Type',    'Medico-Legal'],
            ['Priority',     'High'],
            ['Registered',   '20 Jul 2026, 10:15 AM'],
            ['Last Updated', '22 Jul 2026, 02:00 PM'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between items-center py-1 border-b border-slate-50">
              <span className="text-slate-500 text-sm">{k}</span>
              <span className="font-semibold text-slate-800 text-sm">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Summary / Remarks</h4>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-700 leading-relaxed mb-6">
          Patient presented with multiple lacerations on forehead and contusions on left arm following a reported road traffic accident. Case referred by Kandy Police Station. Preliminary examination completed by Dr. John Silva.
        </div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Quick Links</h4>
        <div className="flex flex-wrap gap-2">
          <Link to="/cases/C2026-1045/documents" className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg hover:bg-blue-100 transition-colors">
            <FileText size={14}/> Documents
          </Link>
          <Link to="/cases/C2026-1045/timeline" className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-600 text-xs font-semibold rounded-lg hover:bg-purple-100 transition-colors">
            <Activity size={14}/> Timeline
          </Link>
          <Link to="/cases/C2026-1045/assign" className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-lg hover:bg-emerald-100 transition-colors">
            <Users size={14}/> Assign Doctor
          </Link>
        </div>
      </div>
    </div>
  </motion.div>
);

const ExamineeTab = () => (
  <motion.div key="examinee" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-600">NP</div>
      <div>
        <h3 className="text-xl font-bold text-slate-800">Nimal Perera</h3>
        <p className="text-slate-500 text-sm mt-0.5">34 yrs • Male • NIC: 890123456V</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10">
      {[
        ['Date of Birth', '15 Mar 1992'],
        ['Age',           '34 years'],
        ['Gender',        'Male'],
        ['Nationality',   'Sri Lankan'],
        ['NIC / Passport','890123456V'],
        ['Religion',      'Buddhist'],
        ['Occupation',    'Clerk'],
        ['Contact',       '+94 71 234 5678'],
        ['Address',       'No. 25, Peradeniya Road, Kandy'],
        ['Blood Group',   'O+'],
      ].map(([label, value]) => (
        <div key={label}>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</label>
          <p className={`font-semibold mt-1 text-sm ${label === 'Blood Group' ? 'text-red-600' : 'text-slate-800'}`}>{value}</p>
        </div>
      ))}
    </div>
  </motion.div>
);

const ClinicalTab = () => (
  <motion.div key="clinical" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
    <h3 className="text-lg font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">Clinical Findings</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Vital Signs</h4>
        <div className="grid grid-cols-2 gap-3">
          {[
            ['BP', '120/80 mmHg'], ['Pulse', '82 bpm'],
            ['Temp', '37.1 °C'],   ['SpO2', '98%'],
            ['Weight', '72 kg'],   ['Height', '168 cm'],
          ].map(([k, v]) => (
            <div key={k} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <p className="text-xs text-slate-400 font-semibold mb-1">{k}</p>
              <p className="font-bold text-slate-800 text-sm">{v}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">General Examination</h4>
        <div className="space-y-2 text-sm text-slate-700">
          <p><span className="font-semibold">Consciousness:</span> Alert & Oriented × 3</p>
          <p><span className="font-semibold">Built:</span> Average</p>
          <p><span className="font-semibold">Pallor:</span> Absent</p>
          <p><span className="font-semibold">Icterus:</span> Absent</p>
          <p><span className="font-semibold">Lymph Nodes:</span> Not palpable</p>
        </div>
      </div>
    </div>
    <div>
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Injury Description</h4>
      <div className="space-y-3">
        {[
          { region: 'Forehead', desc: 'A laceration measuring 4 cm × 0.5 cm present on the right side of the forehead, 3 cm above the right eyebrow. Edges are irregular.', severity: 'Moderate' },
          { region: 'Left Arm', desc: 'Multiple contusions (3 in number) present on the dorsal aspect of the left forearm, measuring approx. 2 cm × 1.5 cm each.', severity: 'Minor' },
        ].map((inj, i) => (
          <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-800 text-sm">{inj.region}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${inj.severity === 'Moderate' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-blue-100 text-blue-700 border-blue-200'}`}>
                {inj.severity}
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{inj.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const PoliceTab = () => (
  <motion.div key="police" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
    <h3 className="text-lg font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">Police Information</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Police Station Details</h4>
        <div className="space-y-3.5">
          {[
            ['Station',         'Kandy Police Station'],
            ['District',        'Kandy'],
            ['Officer Name',    'IP Kumara'],
            ['Badge Number',    'PS-4521'],
            ['Contact',         '+94 81 222 4521'],
            ['Report Ref No.',  'KPS/2026/1890'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between items-center py-1 border-b border-slate-50">
              <span className="text-slate-500 text-sm">{k}</span>
              <span className="font-semibold text-slate-800 text-sm">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Police Report Summary</h4>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-700 leading-relaxed mb-4">
          The victim was found injured at the scene of a road traffic accident at Peradeniya Road junction at approximately 09:45 AM on 20 Jul 2026. Referred to Kandy General Hospital for medico-legal examination.
        </div>
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
          <Check size={18} className="text-emerald-600 flex-shrink-0" />
          <span className="text-sm text-emerald-700 font-semibold">Police Report Received & Verified</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const CourtTab = () => (
  <motion.div key="court" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
    <h3 className="text-lg font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">Court Information</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Court Details</h4>
        <div className="space-y-3.5">
          {[
            ['Court Name',    'Magistrate Court — Kandy'],
            ['Case Number',   'MC/KDY/2026/504'],
            ['Magistrate',    'Hon. W.A. Jayawardena'],
            ['Hearing Date',  '10 Aug 2026'],
            ['Report Status', 'Pending Submission'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between items-center py-1 border-b border-slate-50">
              <span className="text-slate-500 text-sm">{k}</span>
              <span className="font-semibold text-slate-800 text-sm">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Court Orders</h4>
        <div className="space-y-3">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="font-bold text-amber-800 text-sm mb-1">Pending: Medico-Legal Report</p>
            <p className="text-xs text-amber-600">Court ordered submission before 10 Aug 2026 hearing</p>
          </div>
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <p className="font-bold text-emerald-800 text-sm mb-1">Received: Police Report</p>
            <p className="text-xs text-emerald-600">Submitted and acknowledged on 21 Jul 2026</p>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const InlineTimeline = ({ caseId }) => {
  const events = [
    { date: '20 Jul 2026', time: '10:15 AM', title: 'Case Registered',      user: 'Admin Clerk',     color: 'bg-blue-500' },
    { date: '20 Jul 2026', time: '11:00 AM', title: 'Doctor Assigned',       user: 'Chief JMO',       color: 'bg-emerald-500' },
    { date: '21 Jul 2026', time: '09:30 AM', title: 'Clinical Examination',  user: 'Dr. John Silva',  color: 'bg-amber-500' },
    { date: '21 Jul 2026', time: '10:45 AM', title: 'Lab Investigation',     user: 'Lab Technician',  color: 'bg-purple-500' },
    { date: '22 Jul 2026', time: '02:00 PM', title: 'Report Drafted',        user: 'Dr. John Silva',  color: 'bg-slate-400' },
  ];
  return (
    <motion.div key="timeline" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-800">Case Timeline</h3>
        <Link to={`/cases/${caseId}/timeline`} className="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:underline">
          Full View <ChevronRight size={14} />
        </Link>
      </div>
      <div className="relative border-l-2 border-slate-100 ml-4 space-y-6 py-2">
        {events.map((ev, i) => (
          <div key={i} className="relative pl-8">
            <div className={`absolute -left-[9px] w-4 h-4 rounded-full ${ev.color} border-2 border-white shadow`} />
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex justify-between items-start">
                <p className="font-bold text-slate-800 text-sm">{ev.title}</p>
                <span className="text-xs text-slate-400">{ev.date} • {ev.time}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">By {ev.user}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const CaseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const caseId = id || 'C2026-1045';

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link to="/cases" className="hover:text-blue-600 transition-colors">Case Management</Link>
          <ChevronRight size={14} />
          <span className="text-slate-800 font-medium">{caseId}</span>
        </div>

        {/* Header Card */}
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-200/60 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm">
              <FileText size={28} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-slate-800">Case {caseId}</h1>
                <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-lg border border-amber-200">Pending</span>
                <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-lg border border-red-200">High Priority</span>
              </div>
              <p className="text-sm text-slate-500 font-medium">
                Medico-Legal • MLE-892 • Registered on 20 Jul 2026
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium text-sm shadow-sm">
              <Printer size={16} /> Print
            </button>
            <Link
              to={`/cases/${caseId}/edit`}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium text-sm shadow-sm">
              <Edit size={16} /> Edit
            </Link>
            <Link
              to={`/cases/${caseId}/documents`}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium text-sm shadow-sm">
              <FileDown size={16} /> Documents
            </Link>
            <Link
              to={`/cases/${caseId}/close`}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium text-sm shadow-sm shadow-emerald-600/20">
              <Lock size={16} /> Close Case
            </Link>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Left — Tabs + Content */}
          <div className="lg:col-span-3">
            {/* Tab Bar */}
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

            {/* Tab Content Panel */}
            <div className="bg-white rounded-[20px] p-8 shadow-sm border border-slate-200/60 min-h-[500px]">
              <AnimatePresence mode="wait">
                {activeTab === 'overview'  && <OverviewTab />}
                {activeTab === 'examinee'  && <ExamineeTab />}
                {activeTab === 'clinical'  && <ClinicalTab />}
                {activeTab === 'police'    && <PoliceTab />}
                {activeTab === 'court'     && <CourtTab />}
                {activeTab === 'timeline'  && <InlineTimeline caseId={caseId} />}
              </AnimatePresence>
            </div>
          </div>

          {/* Right — Sidebar Widgets */}
          <div className="space-y-6">

            {/* Doctor Card */}
            <div className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-200/60">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center justify-between">
                Assigned Doctor
                <Link to={`/cases/${caseId}/assign`} className="text-blue-600 text-xs font-semibold hover:underline">Change</Link>
              </h4>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">JS</div>
                <div>
                  <h5 className="font-bold text-slate-800 text-sm">Dr. John Silva</h5>
                  <p className="text-xs text-slate-500 mt-0.5">JMO • SLMC: 23451</p>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-200/60">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Case Progress</h4>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-slate-600">Overall Completion</span>
                  <span className="text-blue-600">65%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-4">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }} />
                </div>
                <div className="space-y-2">
                  {[
                    ['Initial Examination',    true ],
                    ['Police Report Uploaded', true ],
                    ['Laboratory Results',     false],
                    ['Final JMO Report',       false],
                  ].map(([label, done]) => (
                    <div key={label} className="flex items-center gap-3 text-sm">
                      {done
                        ? <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
                        : <div className="w-4 h-4 rounded-full border-2 border-slate-200 flex-shrink-0" />}
                      <span className={done ? 'text-slate-700' : 'text-slate-400'}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-200/60">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center justify-between">
                Recent Activity
                <Link to={`/cases/${caseId}/timeline`} className="text-blue-600 text-xs font-semibold hover:underline">View All</Link>
              </h4>
              <div className="space-y-4">
                {[
                  { dot: 'bg-blue-500',    text: 'Document Uploaded',  time: '2 hours ago by Clerk' },
                  { dot: 'bg-emerald-500', text: 'Doctor Assigned',     time: '1 day ago by Admin'  },
                  { dot: 'bg-amber-500',   text: 'Case Registered',     time: '2 days ago by Clerk' },
                ].map((a, i) => (
                  <div key={i} className="flex gap-3">
                    <div className={`w-2 h-2 rounded-full ${a.dot} mt-1.5 flex-shrink-0`} />
                    <div>
                      <p className="text-sm text-slate-700 font-medium">{a.text}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
};

export default CaseDetails;
