import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, FilePlus, UserCheck, Stethoscope, FlaskConical, FileText, CheckCircle } from 'lucide-react';


const timelineEvents = [
  { id: 1, date: '20 Jul 2026', time: '10:15 AM', title: 'Case Registered', user: 'Admin Clerk', role: 'Clerk', desc: 'Case C2026-1045 registered in the system via Kandy Police Station referral.', icon: <FilePlus size={20} />, color: 'bg-blue-100 text-blue-600 border-blue-200' },
  { id: 2, date: '20 Jul 2026', time: '11:00 AM', title: 'Doctor Assigned', user: 'Chief JMO', role: 'Admin', desc: 'Dr. John Silva assigned as the primary Judicial Medical Officer.', icon: <UserCheck size={20} />, color: 'bg-emerald-100 text-emerald-600 border-emerald-200' },
  { id: 3, date: '21 Jul 2026', time: '09:30 AM', title: 'Clinical Examination', user: 'Dr. John Silva', role: 'JMO', desc: 'Initial physical examination completed. Multiple lacerations recorded.', icon: <Stethoscope size={20} />, color: 'bg-amber-100 text-amber-600 border-amber-200' },
  { id: 4, date: '21 Jul 2026', time: '10:45 AM', title: 'Investigation Started', user: 'Lab Technician', role: 'Lab', desc: 'Blood and urine samples collected and sent to toxicology laboratory.', icon: <FlaskConical size={20} />, color: 'bg-purple-100 text-purple-600 border-purple-200' },
  { id: 5, date: '22 Jul 2026', time: '02:00 PM', title: 'Report Generated', user: 'Dr. John Silva', role: 'JMO', desc: 'Preliminary Medico-Legal Report drafted and pending approval.', icon: <FileText size={20} />, color: 'bg-slate-100 text-slate-600 border-slate-200' },
];

const CaseTimeline = () => {
  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link to="/cases" className="hover:text-blue-600 transition-colors">Case Management</Link>
          <ChevronRight size={14} />
          <Link to="/cases/C2026-1045" className="hover:text-blue-600 transition-colors">C2026-1045</Link>
          <ChevronRight size={14} />
          <span className="text-slate-800 font-medium">Timeline</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Case Timeline: C2026-1045</h1>
            <p className="text-slate-500 mt-1 text-sm">Chronological history of all case events and updates.</p>
          </div>

          <div className="bg-white rounded-[20px] p-8 shadow-sm border border-slate-200/60">
            <div className="relative border-l-2 border-slate-100 ml-4 md:ml-8 space-y-10 py-4">
              
              {timelineEvents.map((event, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={event.id} 
                  className="relative pl-10 md:pl-12"
                >
                  <div className={`absolute -left-[25px] flex items-center justify-center w-12 h-12 rounded-full border-4 border-white ${event.color} shadow-sm z-10`}>
                    {event.icon}
                  </div>
                  
                  <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
                      <h3 className="text-lg font-bold text-slate-800">{event.title}</h3>
                      <div className="text-sm font-semibold text-slate-500 flex items-center gap-2 bg-white px-3 py-1 rounded-lg border border-slate-200">
                        <Clock size={14} /> {event.date} • {event.time}
                      </div>
                    </div>
                    
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {event.desc}
                    </p>
                    
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                        {event.user.charAt(0)}
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold text-slate-700">{event.user}</span>
                        <span className="text-slate-400 mx-2">•</span>
                        <span className="text-slate-500">{event.role}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="relative pl-10 md:pl-12 mt-12 opacity-50">
                <div className={`absolute -left-[19px] flex items-center justify-center w-9 h-9 rounded-full border-4 border-white bg-slate-100 text-slate-400 shadow-sm z-10`}>
                  <CheckCircle size={16} />
                </div>
                <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl">
                  <h3 className="text-slate-500 font-semibold">Case Closed (Pending)</h3>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
};

export default CaseTimeline;
