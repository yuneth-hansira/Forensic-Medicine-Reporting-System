import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, CheckCircle, FileText, Lock, AlertTriangle, Fingerprint, Activity, Download } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

const CloseCase = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [signature, setSignature] = useState('');

  return (
    <DashboardLayout>
      <div className="p-8 bg-slate-50 min-h-screen font-sans">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link to="/cases" className="hover:text-blue-600 transition-colors">Case Management</Link>
          <ChevronRight size={14} />
          <Link to="/cases/C2026-1045" className="hover:text-blue-600 transition-colors">C2026-1045</Link>
          <ChevronRight size={14} />
          <span className="text-slate-800 font-medium">Close Case</span>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Close Case: C2026-1045</h1>
            <p className="text-slate-500 mt-2 text-sm">Please verify all prerequisites and digitally sign to finalize and close this case.</p>
          </div>

          <div className="bg-white rounded-[20px] shadow-sm border border-slate-200/60 p-8 mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <CheckCircle className="text-emerald-500" size={20} /> Pre-closure Checklist
            </h3>
            
            <div className="space-y-4 mb-8">
              {[
                { label: 'Clinical Findings Completed', done: true },
                { label: 'Primary Doctor Assigned', done: true },
                { label: 'All Lab Reports Uploaded', done: true },
                { label: 'Final JMO Report Generated', done: true },
                { label: 'Police/Court Documents Verified', done: true },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.done ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                    <CheckCircle size={14} />
                  </div>
                  <span className={`font-medium ${item.done ? 'text-slate-700' : 'text-slate-400'}`}>{item.label}</span>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8 flex gap-4">
              <AlertTriangle className="text-amber-500 flex-shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-amber-800 text-sm">Warning: Irreversible Action</h4>
                <p className="text-amber-700 text-xs mt-1 leading-relaxed">
                  Closing this case will lock all clinical records, documents, and timelines. No further edits can be made unless authorized by the Chief JMO. Ensure all data is accurate before proceeding.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-8">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Fingerprint className="text-blue-500" size={20} /> Digital Signature Verification
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Final Remarks / Reason for Closure</label>
                  <textarea rows={3} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="e.g., All required reports submitted to Magistrate..."></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">PIN / Password Signature</label>
                  <input type="password" value={signature} onChange={e => setSignature(e.target.value)} className="w-full max-w-sm px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="Enter your secure PIN" />
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-1 w-4 h-4 text-blue-600 rounded" />
                  <span className="text-sm text-slate-600 leading-relaxed">
                    I, <strong>Dr. John Silva (SLMC: 23451)</strong>, confirm that all findings and reports attached to Case C2026-1045 are accurate to the best of my professional knowledge. I authorize the final closure of this case.
                  </span>
                </label>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
              <button className="flex items-center gap-2 text-blue-600 font-semibold text-sm hover:underline">
                <Download size={16} /> Preview Final Case PDF
              </button>
              
              <div className="flex gap-4 w-full sm:w-auto">
                <button onClick={() => navigate(-1)} className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-bold transition-colors w-full sm:w-auto">
                  Cancel
                </button>
                <button 
                  disabled={!agreed || signature.length < 4}
                  className={`px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all w-full sm:w-auto ${
                    agreed && signature.length >= 4
                      ? 'bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-600/20'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Lock size={18} /> Confirm Closure
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CloseCase;
