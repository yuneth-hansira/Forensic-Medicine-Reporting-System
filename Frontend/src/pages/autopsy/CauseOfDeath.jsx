import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FileCheck, Save, Clock, Activity, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const CauseOfDeath = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      immediateCause: '',
      underlyingCause: '',
      contributingFactors: '',
      mechanismOfDeath: '',
      mannerOfDeath: 'Undetermined',
      timeSinceDeath: '',
      labFindings: '',
      toxicology: '',
      histopathology: '',
      radiology: '',
      medicalOpinion: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await new Promise(r => setTimeout(r, 1200));
      toast.success('Cause of Death approved & saved');
      navigate(`/autopsy/${id}/opinion`);
    } catch (error) {
      toast.error('Failed to save data');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateCertificate = async () => {
    try {
      setIsGenerating(true);
      await new Promise(r => setTimeout(r, 1500));
      toast.success('Death Certificate generated successfully');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen ml-64 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-2 text-sm text-slate-500 font-medium">
              <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate('/autopsy')}>Autopsy</span>
              <span>/</span>
              <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate(`/autopsy/${id}`)}>{id}</span>
              <span>/</span>
              <span className="text-blue-600">Cause of Death</span>
            </div>
            <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Cause of Death</h1>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleGenerateCertificate}
              disabled={isGenerating}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-all disabled:opacity-70"
            >
              <FileText size={18} /> {isGenerating ? 'Generating...' : 'Death Certificate'}
            </button>
            <button 
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-sm shadow-blue-200 hover:bg-blue-700 flex items-center gap-2 transition-all disabled:opacity-70"
            >
              <Save size={18} /> {isSubmitting ? 'Approving...' : 'Approve COD'}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Activity className="text-red-500" size={24} /> Primary Conclusions
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">I(a) Immediate Cause of Death</label>
                <input {...register('immediateCause')} placeholder="e.g. Cardiopulmonary Arrest" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="pl-6 border-l-2 border-slate-200">
                <label className="block text-sm font-medium text-slate-700 mb-1">I(b) Due to (Underlying Cause)</label>
                <input {...register('underlyingCause')} placeholder="e.g. Acute Myocardial Infarction" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">II. Other Significant Contributing Factors</label>
                <textarea {...register('contributingFactors')} rows="2" placeholder="e.g. Type II Diabetes, Hypertension" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-100">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Manner of Death</label>
                <select {...register('mannerOfDeath')} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="Natural">Natural</option>
                  <option value="Accident">Accident</option>
                  <option value="Suicide">Suicide</option>
                  <option value="Homicide">Homicide</option>
                  <option value="Undetermined">Undetermined</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mechanism of Death</label>
                <input {...register('mechanismOfDeath')} placeholder="e.g. Exsanguination, Asphyxiation" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Clock className="text-amber-500" size={24} /> Postmortem Interval
            </h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Estimated Time Since Death</label>
              <input {...register('timeSinceDeath')} placeholder="e.g. 12-24 hours prior to examination" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <FileCheck className="text-purple-500" size={24} /> Supporting Evidence
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Laboratory Findings</label>
                <textarea {...register('labFindings')} rows="2" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Toxicology</label>
                <textarea {...register('toxicology')} rows="2" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Histopathology</label>
                <textarea {...register('histopathology')} rows="2" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-100">
              <label className="block text-sm font-medium text-slate-700 mb-1">Medical Opinion & Review Summary</label>
              <textarea {...register('medicalOpinion')} rows="4" placeholder="Final summary rationalizing the cause of death based on findings..." className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default CauseOfDeath;
