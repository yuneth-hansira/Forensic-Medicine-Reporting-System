import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  CheckCircle, FileText, Activity, Microscope, 
  Stethoscope, Image as ImageIcon, Camera, Link, AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ClinicalFindings = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [isApproving, setIsApproving] = useState(false);

  const handleApprove = async () => {
    try {
      setIsApproving(true);
      await new Promise(r => setTimeout(r, 1500));
      toast.success('Clinical findings approved successfully');
      navigate(`/clinical/${caseId}/injuries`);
    } catch (error) {
      toast.error('Failed to approve findings');
    } finally {
      setIsApproving(false);
    }
  };

  const handleGenerateSummary = () => {
    toast.success('Generating clinical summary report...');
  };

  return (
    <div className="font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-2 text-sm text-slate-500 font-medium">
              <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate('/clinical/dashboard')}>Clinical</span>
              <span>/</span>
              <span className="hover:text-blue-600 cursor-pointer">{caseId}</span>
              <span>/</span>
              <span className="text-blue-600">Findings</span>
            </div>
            <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Clinical Findings</h1>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleGenerateSummary}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-all"
            >
              <FileText size={18} />
              Generate Summary
            </button>
            <button 
              onClick={handleApprove}
              disabled={isApproving}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-sm shadow-blue-200 hover:bg-blue-700 flex items-center gap-2 transition-all disabled:opacity-70"
            >
              <CheckCircle size={18} />
              {isApproving ? 'Approving...' : 'Approve Findings'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-100">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Stethoscope className="text-blue-600" size={24} />
                Diagnosis & Clinical Impression
              </h2>
              <textarea rows="4" placeholder="Enter primary diagnosis and overall clinical impression..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none mb-4"></textarea>
              
              <h3 className="text-sm font-medium text-slate-700 mb-2">Recommendations</h3>
              <textarea rows="2" placeholder="Clinical recommendations..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"></textarea>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-100">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Microscope className="text-purple-600" size={24} />
                Laboratory & Radiology Findings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-2">Lab Results</h3>
                  <textarea rows="3" placeholder="Blood tests, toxicology..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"></textarea>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-2">Radiology</h3>
                  <textarea rows="3" placeholder="X-Rays, CT scans..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"></textarea>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-100">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Activity className="text-green-600" size={24} />
                Vital Signs Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 font-medium">BP</span>
                  <span className="text-slate-800 font-semibold">120/80 mmHg</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 font-medium">Pulse</span>
                  <span className="text-slate-800 font-semibold">72 bpm</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 font-medium">Temp</span>
                  <span className="text-slate-800 font-semibold">37.2 °C</span>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-100">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Camera className="text-amber-600" size={24} />
                Evidence & Media
              </h2>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="aspect-square bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 border border-slate-200 border-dashed cursor-pointer hover:bg-slate-50 hover:text-blue-500 transition-colors">
                  <ImageIcon size={24} />
                </div>
                <div className="aspect-square bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 border border-slate-200 border-dashed cursor-pointer hover:bg-slate-50 hover:text-blue-500 transition-colors">
                  <ImageIcon size={24} />
                </div>
              </div>
              <button className="w-full py-2 bg-slate-50 border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-100 transition-colors flex justify-center items-center gap-2">
                <Link size={16} /> Attach Document
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default ClinicalFindings;
