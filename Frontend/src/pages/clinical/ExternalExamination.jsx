import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Save, CheckCircle, UploadCloud, Mic, 
  Activity, User, Thermometer, Heart, Camera
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import clinicalService from '../../services/clinicalService';

const schema = z.object({
  consciousness: z.string().min(1, 'Required'),
  orientation: z.string().min(1, 'Required'),
  height: z.string(),
  weight: z.string(),
  temperature: z.string(),
  pulse: z.string(),
  bloodPressure: z.string(),
  respiration: z.string(),
  skinColour: z.string(),
  clothingDescription: z.string(),
  visibleInjuries: z.string(),
  scars: z.string(),
  tattoos: z.string(),
  doctorRemarks: z.string()
});

const ExternalExamination = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      consciousness: 'Alert',
      orientation: 'Oriented to time, place, and person',
      height: '',
      weight: '',
      temperature: '',
      pulse: '',
      bloodPressure: '',
      respiration: '',
      skinColour: '',
      clothingDescription: '',
      visibleInjuries: '',
      scars: '',
      tattoos: '',
      doctorRemarks: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      // Simulate API call
      // await clinicalService.updateClinicalExamination(caseId, { external: data });
      await new Promise(r => setTimeout(r, 1000));
      toast.success('External examination saved successfully');
      navigate(`/clinical/${caseId}/internal`);
    } catch (error) {
      toast.error('Failed to save examination data');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    toast.success('Draft saved successfully');
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
              <span className="text-blue-600">External Exam</span>
            </div>
            <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">External Examination</h1>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleSaveDraft}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-all"
            >
              <Save size={18} />
              Save Draft
            </button>
            <button 
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-sm shadow-blue-200 hover:bg-blue-700 flex items-center gap-2 transition-all disabled:opacity-70"
            >
              <CheckCircle size={18} />
              {isSubmitting ? 'Saving...' : 'Submit & Continue'}
            </button>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vitals Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-100"
            >
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Activity className="text-blue-600" size={24} />
                Vital Signs & Metrics
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Height (cm)</label>
                  <input {...register('height')} type="number" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Weight (kg)</label>
                  <input {...register('weight')} type="number" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Temperature (°C)</label>
                  <input {...register('temperature')} type="number" step="0.1" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Pulse (bpm)</label>
                  <input {...register('pulse')} type="number" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">BP (mmHg)</label>
                  <input {...register('bloodPressure')} placeholder="120/80" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Resp. Rate</label>
                  <input {...register('respiration')} type="number" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
              </div>
            </motion.div>

            {/* General Appearance */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-100"
            >
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <User className="text-purple-600" size={24} />
                General Appearance
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Consciousness</label>
                  <select {...register('consciousness')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                    <option value="Alert">Alert</option>
                    <option value="Lethargic">Lethargic</option>
                    <option value="Obtunded">Obtunded</option>
                    <option value="Stupor">Stupor</option>
                    <option value="Coma">Coma</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Orientation</label>
                  <input {...register('orientation')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Skin Colour</label>
                  <input {...register('skinColour')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Clothing Description</label>
                  <textarea {...register('clothingDescription')} rows="2" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"></textarea>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Detailed Observations */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-100"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Camera className="text-amber-600" size={24} />
              Identifying Marks & Injuries
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Visible Injuries</label>
                <textarea {...register('visibleInjuries')} rows="3" placeholder="Describe any bruises, abrasions, lacerations..." className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Scars & Marks</label>
                <textarea {...register('scars')} rows="3" placeholder="Location, size, and type of scars..." className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tattoos & Piercings</label>
                <textarea {...register('tattoos')} rows="3" placeholder="Description and location..." className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Doctor's Remarks</label>
                <textarea {...register('doctorRemarks')} rows="3" placeholder="Additional observations..." className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"></textarea>
              </div>
            </div>
            
            <div className="mt-6 border-t border-slate-100 pt-6 flex gap-4">
              <button type="button" className="flex-1 border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:border-blue-400 hover:text-blue-500 transition-colors bg-slate-50 hover:bg-blue-50 cursor-pointer">
                <UploadCloud size={32} className="mb-2" />
                <span className="font-medium">Upload Clinical Photos</span>
                <span className="text-xs mt-1">JPEG, PNG up to 10MB</span>
              </button>
              <button type="button" className="w-32 border border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-500 hover:border-purple-400 hover:text-purple-500 transition-colors bg-slate-50 hover:bg-purple-50 cursor-pointer">
                <Mic size={24} className="mb-2" />
                <span className="font-medium text-sm">Voice Note</span>
              </button>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
    );
};

export default ExternalExamination;
