import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import {
  Shield, CheckCircle, FileText, Download, Printer, Plus,
  ChevronRight, Eye, PenTool, Lock, Check, FileCheck, X
} from 'lucide-react';


const dummyConsents = [];

const ConsentForms = () => {
  const { id } = useParams();
  const examineeId = id || 'EX-2026-0891';
  const [showModal, setShowModal] = useState(false);
  const [consentType, setConsentType] = useState('Medical Examination');

  const [patientSigned, setPatientSigned] = useState(false);
  const [witnessSigned, setWitnessSigned] = useState(false);
  const [doctorSigned, setDoctorSigned] = useState(false);

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link to="/examinees" className="hover:text-blue-600 transition-colors">Examinees</Link>
          <ChevronRight size={14} />
          <Link to={`/examinees/${examineeId}`} className="hover:text-blue-600 transition-colors">{examineeId}</Link>
          <ChevronRight size={14} />
          <span className="text-slate-800 font-medium">Consent Forms</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-6 rounded-[20px] shadow-sm border border-slate-200/60">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              Forensic Consent Forms
              <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100 flex items-center gap-1.5">
                <CheckCircle size={14} /> Active Consent File
              </span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">Examinee: <strong>Nimal Perera</strong> ({examineeId}) • NIC: 890123456V</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium text-sm shadow-sm shadow-blue-600/20 transition-colors"
          >
            <Plus size={16} /> Generate New Consent
          </button>
        </div>

        {/* Consent Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-200/60 flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600"><FileCheck size={24} /></div>
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase">Total Signed Forms</p>
              <h3 className="text-2xl font-bold text-slate-800">0 Forms</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-200/60 flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-blue-50 text-blue-600"><Shield size={24} /></div>
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase">Latest Consent</p>
              <h3 className="text-sm font-bold text-slate-800">—</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-200/60 flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-purple-50 text-purple-600"><Lock size={24} /></div>
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase">Legal Verification</p>
              <h3 className="text-sm font-bold text-slate-400">No data</h3>
            </div>
          </div>
        </div>

        {/* Consent Table */}
        <div className="bg-white rounded-[20px] shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Signed Consent Records</h3>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Consent ID</th>
                <th className="px-6 py-4">Consent Type</th>
                <th className="px-6 py-4">Date Signed</th>
                <th className="px-6 py-4">Signed By</th>
                <th className="px-6 py-4">Witness</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {dummyConsents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                    No consent forms found.
                  </td>
                </tr>
              ) : (
                dummyConsents.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-blue-600">{item.id}</td>
                    <td className="px-6 py-4 font-semibold text-slate-800">{item.type}</td>
                    <td className="px-6 py-4 text-slate-500">{item.date}</td>
                    <td className="px-6 py-4 text-slate-700">{item.signedBy}</td>
                    <td className="px-6 py-4 text-slate-500">{item.witness}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 font-bold text-xs rounded-full border border-emerald-200">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="Preview">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg" title="Download PDF">
                          <Download size={16} />
                        </button>
                        <button onClick={() => window.print()} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg" title="Print">
                          <Printer size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Generate New Consent Modal */}
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[24px] max-w-2xl w-full p-8 shadow-2xl border border-slate-100"
              >
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
                  <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <Shield className="text-blue-600" size={22} /> Generate Forensic Consent Form
                  </h3>
                  <button onClick={() => setShowModal(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Consent Category</label>
                    <select
                      value={consentType}
                      onChange={(e) => setConsentType(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-blue-500"
                    >
                      <option>Medical Examination</option>
                      <option>Forensic Photography Consent</option>
                      <option>Evidence Collection</option>
                      <option>DNA Collection</option>
                      <option>Laboratory Testing</option>
                      <option>Release of Medical Information</option>
                    </select>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-600 leading-relaxed">
                    <strong>Legal Declaration:</strong> I hereby give my full voluntary consent for the medical officers of FMMS to conduct the specified forensic procedures for medico-legal documentation.
                  </div>

                  {/* Digital Signature Pads */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 border border-slate-200 rounded-xl text-center">
                      <p className="text-xs font-bold text-slate-500 uppercase mb-3">Examinee Signature</p>
                      <button
                        type="button"
                        onClick={() => setPatientSigned(!patientSigned)}
                        className={`w-full py-3 rounded-lg border border-dashed font-bold text-xs flex items-center justify-center gap-2 ${patientSigned ? 'bg-emerald-50 border-emerald-400 text-emerald-700' : 'bg-slate-50 border-slate-300 text-slate-600 hover:bg-slate-100'}`}
                      >
                        {patientSigned ? <><Check size={16} /> Signed (Digital)</> : <><PenTool size={14} /> Click to Sign</>}
                      </button>
                    </div>

                    <div className="p-4 border border-slate-200 rounded-xl text-center">
                      <p className="text-xs font-bold text-slate-500 uppercase mb-3">Witness Signature</p>
                      <button
                        type="button"
                        onClick={() => setWitnessSigned(!witnessSigned)}
                        className={`w-full py-3 rounded-lg border border-dashed font-bold text-xs flex items-center justify-center gap-2 ${witnessSigned ? 'bg-emerald-50 border-emerald-400 text-emerald-700' : 'bg-slate-50 border-slate-300 text-slate-600 hover:bg-slate-100'}`}
                      >
                        {witnessSigned ? <><Check size={16} /> Witnessed</> : <><PenTool size={14} /> Click to Witness</>}
                      </button>
                    </div>

                    <div className="p-4 border border-slate-200 rounded-xl text-center">
                      <p className="text-xs font-bold text-slate-500 uppercase mb-3">Doctor Signature</p>
                      <button
                        type="button"
                        onClick={() => setDoctorSigned(!doctorSigned)}
                        className={`w-full py-3 rounded-lg border border-dashed font-bold text-xs flex items-center justify-center gap-2 ${doctorSigned ? 'bg-emerald-50 border-emerald-400 text-emerald-700' : 'bg-slate-50 border-slate-300 text-slate-600 hover:bg-slate-100'}`}
                      >
                        {doctorSigned ? <><Check size={16} /> JMO Signed</> : <><PenTool size={14} /> JMO Sign</>}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-xl text-sm hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-sm hover:bg-emerald-700 shadow-md shadow-emerald-600/20"
                  >
                    Save & Issue Consent
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    );
};

export default ConsentForms;
