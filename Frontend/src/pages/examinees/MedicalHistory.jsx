import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import {
  FileText, Search, Download, ChevronRight, Stethoscope,
  AlertTriangle, Shield, Calendar, FileDown, Plus, Filter,
  Eye, Paperclip, Activity
} from 'lucide-react';


const historyTimeline = [
  { id: 1, type: 'Forensic Case', title: 'Road Traffic Accident (MLEF Examination)', date: '20 Jul 2026', doctor: 'Dr. John Silva', category: 'Forensic', detail: 'Patient examined following RTA. Forehead laceration and forearm contusions documented under Case C2026-1045.', badgeColor: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 2, type: 'Hospital Admission', title: 'Admitted to Kandy National Hospital', date: '20 Jul 2026', doctor: 'Dr. S. K. Perera', category: 'Admission', detail: 'Admitted to Ward 12, Bed 14 under Casualty Observation.', badgeColor: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 3, type: 'Allergy Record', title: 'Penicillin Hypersensitivity Noted', date: '15 Jan 2024', doctor: 'Dr. Wickramasinghe', category: 'Allergy', detail: 'Developed erythema and urticaria following oral Penicillin VK administration.', badgeColor: 'bg-amber-100 text-amber-700 border-amber-200' },
  { id: 4, type: 'Surgery', title: 'Laparoscopic Appendectomy', date: '12 Nov 2021', doctor: 'Dr. M. Fernando', category: 'Surgery', detail: 'Uncomplicated laparoscopic excision of inflamed appendix at Kandy General Hospital.', badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { id: 5, type: 'Previous Injury', title: 'Right Wrist Sprain (Sports Injury)', date: '04 Aug 2019', doctor: 'Dr. Ranatunga', category: 'Injury', detail: 'X-ray confirmed no fracture. Treated with elastic bandage and analgesics.', badgeColor: 'bg-slate-100 text-slate-700 border-slate-200' },
];

const MedicalHistory = () => {
  const { id } = useParams();
  const examineeId = id || 'EX-2026-0891';
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link to="/examinees" className="hover:text-blue-600 transition-colors">Examinees</Link>
          <ChevronRight size={14} />
          <Link to={`/examinees/${examineeId}`} className="hover:text-blue-600 transition-colors">{examineeId}</Link>
          <ChevronRight size={14} />
          <span className="text-slate-800 font-medium">Medical History</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-6 rounded-[20px] shadow-sm border border-slate-200/60">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              Medical History Timeline
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">{examineeId}</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">Examinee: <strong>Nimal Perera</strong> • NIC: 890123456V</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-medium text-sm shadow-sm transition-colors"
            >
              <Download size={16} /> Export Medical History PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium text-sm shadow-sm shadow-blue-600/20 transition-colors">
              <Plus size={16} /> Add Medical Entry
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-[20px] shadow-sm border border-slate-200/60 mb-8 flex flex-wrap justify-between items-center gap-4">
          <div className="relative flex-1 min-w-[280px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search medical history records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <select className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-semibold outline-none focus:border-blue-500">
              <option value="All">All Categories</option>
              <option value="Forensic">Forensic Cases</option>
              <option value="Admission">Admissions</option>
              <option value="Allergy">Allergies</option>
              <option value="Surgery">Surgeries</option>
            </select>
          </div>
        </div>

        {/* Vertical Medical Timeline */}
        <div className="bg-white p-8 rounded-[20px] shadow-sm border border-slate-200/60">
          <div className="relative border-l-2 border-slate-200 ml-4 space-y-8 py-2">
            {historyTimeline.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="relative pl-8 group"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-md group-hover:scale-125 transition-transform" />

                {/* Event Card */}
                <div className="p-6 bg-slate-50/80 rounded-2xl border border-slate-200/80 hover:bg-white hover:shadow-md transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${item.badgeColor}`}>
                        {item.type}
                      </span>
                      <h3 className="font-bold text-slate-800 text-base">{item.title}</h3>
                    </div>
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                      <Calendar size={14} /> {item.date}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{item.detail}</p>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold">Attending: {item.doctor}</span>
                    <button className="text-blue-600 font-bold hover:underline flex items-center gap-1">
                      <Paperclip size={13} /> View Attached Reports
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    );
};

export default MedicalHistory;
