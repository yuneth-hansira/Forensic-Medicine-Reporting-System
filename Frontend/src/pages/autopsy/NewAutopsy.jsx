import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Save, X, FileText, User, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const schema = z.object({
  caseId: z.string().min(1, 'Case Number is required'),
  name: z.string().min(1, 'Deceased Name is required'),
  age: z.string().min(1, 'Age is required'),
  gender: z.string().min(1, 'Gender is required'),
  autopsyType: z.string().min(1, 'Autopsy Type is required'),
  assignedDoctor: z.string().min(1, 'Assigned Doctor is required'),
  hospital: z.string().min(1, 'Hospital is required'),
  remarks: z.string().optional(),
});

const NewAutopsy = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      caseId: '',
      name: '',
      age: '',
      gender: '',
      autopsyType: 'Medico-Legal',
      assignedDoctor: '',
      hospital: 'General Hospital',
      remarks: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await new Promise(r => setTimeout(r, 1000)); // Simulate API
      toast.success('Autopsy registered successfully');
      navigate(`/autopsy/PM-2026-NEW`);
    } catch (error) {
      toast.error('Failed to register autopsy');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen ml-64 font-sans text-slate-800 flex justify-center items-start pt-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-[24px] shadow-sm border border-slate-100 w-full max-w-3xl"
      >
        <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">Register New Autopsy</h1>
            <p className="text-slate-500 mt-1 text-sm">Link an autopsy examination to a registered case.</p>
          </div>
          <button onClick={() => navigate('/autopsy')} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl space-y-6 border border-slate-100">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2 mb-4">
              <FileText size={16} className="text-blue-600" /> Case Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Case Number <span className="text-red-500">*</span></label>
                <input {...register('caseId')} placeholder="e.g. C2026-1045" className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                {errors.caseId && <p className="text-red-500 text-xs mt-1">{errors.caseId.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Autopsy Type <span className="text-red-500">*</span></label>
                <select {...register('autopsyType')} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                  <option value="Medico-Legal">Medico-Legal (Forensic)</option>
                  <option value="Clinical">Clinical (Pathological)</option>
                  <option value="Academic">Academic</option>
                </select>
                {errors.autopsyType && <p className="text-red-500 text-xs mt-1">{errors.autopsyType.message}</p>}
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl space-y-6 border border-slate-100">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2 mb-4">
              <User size={16} className="text-purple-600" /> Deceased Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                <input {...register('name')} placeholder="Full name of deceased (or 'Unknown')" className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Age <span className="text-red-500">*</span></label>
                <input {...register('age')} type="number" placeholder="Years" className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Gender <span className="text-red-500">*</span></label>
                <select {...register('gender')} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Unknown">Unknown</option>
                </select>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl space-y-6 border border-slate-100">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2 mb-4">
              <Activity size={16} className="text-green-600" /> Administrative
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Assigned Doctor <span className="text-red-500">*</span></label>
                <input {...register('assignedDoctor')} placeholder="Doctor's Name" className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                {errors.assignedDoctor && <p className="text-red-500 text-xs mt-1">{errors.assignedDoctor.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Hospital <span className="text-red-500">*</span></label>
                <input {...register('hospital')} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                {errors.hospital && <p className="text-red-500 text-xs mt-1">{errors.hospital.message}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Initial Remarks</label>
                <textarea {...register('remarks')} rows="3" placeholder="Any initial observations or notes before examination..." className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"></textarea>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-slate-100">
            <button 
              type="button" 
              onClick={() => navigate('/autopsy')}
              className="px-6 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-8 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 flex items-center gap-2 disabled:opacity-70"
            >
              <Save size={18} />
              {isSubmitting ? 'Registering...' : 'Register Autopsy'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default NewAutopsy;
