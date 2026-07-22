import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronRight, Stethoscope, Clock, ShieldCheck, Check } from 'lucide-react';


const doctors = [
  { id: 1, name: 'Dr. John Silva', spec: 'Judicial Medical Officer', slmc: '23451', cases: 12, available: true, initials: 'JS' },
  { id: 2, name: 'Dr. N. Perera', spec: 'Asst. JMO', slmc: '28912', cases: 8, available: true, initials: 'NP' },
  { id: 3, name: 'Dr. Chandima', spec: 'Forensic Pathologist', slmc: '19045', cases: 15, available: false, initials: 'C' },
  { id: 4, name: 'Dr. A. Wijesooriya', spec: 'Asst. JMO', slmc: '31092', cases: 4, available: true, initials: 'AW' },
];

const AssignDoctor = () => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link to="/cases" className="hover:text-blue-600 transition-colors">Case Management</Link>
          <ChevronRight size={14} />
          <Link to="/cases/C2026-1045" className="hover:text-blue-600 transition-colors">C2026-1045</Link>
          <ChevronRight size={14} />
          <span className="text-slate-800 font-medium">Assign Doctor</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Assign Doctor to Case C2026-1045</h1>
            <p className="text-slate-500 mt-1 text-sm">Select an available Judicial Medical Officer to assign to this case.</p>
          </div>

          <div className="bg-white rounded-[20px] shadow-sm border border-slate-200/60 p-6 mb-8">
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search by doctor name, specialization, or SLMC number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {doctors.map(doc => (
              <motion.div
                whileHover={{ y: -2 }}
                key={doc.id}
                onClick={() => doc.available && setSelected(doc.id)}
                className={`p-6 rounded-[20px] border-2 cursor-pointer transition-all ${
                  selected === doc.id
                    ? 'border-blue-600 bg-blue-50/50 shadow-[0_4px_20px_-4px_rgba(37,99,235,0.2)]'
                    : !doc.available 
                      ? 'border-slate-100 bg-slate-50 opacity-75 cursor-not-allowed' 
                      : 'border-slate-200/60 bg-white hover:border-blue-300 hover:shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xl">
                      {doc.initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                        {doc.name} {selected === doc.id && <CheckCircleIcon />}
                      </h3>
                      <p className="text-sm text-slate-500">{doc.spec}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${doc.available ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                    {doc.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <ShieldCheck size={16} className="text-slate-400" /> SLMC: {doc.slmc}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock size={16} className="text-slate-400" /> Active Cases: {doc.cases}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button onClick={() => navigate(-1)} className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-medium shadow-sm transition-colors">
              Cancel
            </button>
            <button 
              disabled={!selected}
              className={`px-6 py-2.5 rounded-xl font-medium shadow-sm transition-all flex items-center gap-2 ${
                selected ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Check size={18} /> Confirm Assignment
            </button>
          </div>
        </div>
      </div>
    );
};

const CheckCircleIcon = () => (
  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

export default AssignDoctor;
