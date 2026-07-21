import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  FileText, User, Shield, Gavel, Stethoscope, FileUp,
  Check, ChevronRight, ChevronLeft, Search, UploadCloud,
  CheckCircle, Plus
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Link, useParams } from 'react-router-dom';

const steps = [
  { id: 1, name: 'Case Info', icon: <FileText size={18} /> },
  { id: 2, name: 'Examinee', icon: <User size={18} /> },
  { id: 3, name: 'Police', icon: <Shield size={18} /> },
  { id: 4, name: 'Court', icon: <Gavel size={18} /> },
  { id: 5, name: 'Doctor', icon: <Stethoscope size={18} /> },
  { id: 6, name: 'Documents', icon: <FileUp size={18} /> },
];

const NewCase = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  
  const [currentStep, setCurrentStep] = useState(1);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: isEditMode ? {
      caseId: id,
      caseType: 'Medico-Legal',
      examineeName: 'Nimal Perera',
    } : {}
  });
  
  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const onSubmit = (data) => {
    console.log("Case Data Submitted: ", data);
    nextStep();
  };

  return (
    <DashboardLayout>
      <div className="p-8 bg-slate-50 min-h-screen font-sans">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <Link to="/cases" className="hover:text-blue-600 transition-colors">Case Management</Link>
            <ChevronRight size={14} />
            {isEditMode && (
              <>
                <Link to={`/cases/${id}`} className="hover:text-blue-600 transition-colors">{id}</Link>
                <ChevronRight size={14} />
              </>
            )}
            <span className="text-slate-800 font-medium">
              {isEditMode ? 'Edit Case' : 'Create New Case'}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            {isEditMode ? `Edit Case: ${id}` : 'Create New Case'}
          </h1>
        </div>

        {/* Stepper */}
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-200/60 mb-8 overflow-x-auto">
          <div className="flex items-center min-w-max">
            {steps.map((step, idx) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center relative w-32">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative z-10 bg-white
                    ${currentStep > step.id ? 'border-emerald-500 bg-emerald-500 text-white' : 
                      currentStep === step.id ? 'border-blue-600 text-blue-600 shadow-[0_0_0_4px_rgba(37,99,235,0.1)]' : 
                      'border-slate-200 text-slate-400'}`}
                  >
                    {currentStep > step.id ? <Check size={20} /> : step.icon}
                  </div>
                  <span className={`mt-3 text-xs font-bold ${currentStep === step.id ? 'text-slate-800' : 'text-slate-400'}`}>
                    {step.name}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`flex-1 h-[2px] -mt-6 mx-2 transition-all duration-300 ${currentStep > step.id ? 'bg-emerald-500' : 'bg-slate-100'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Area */}
        <div className="bg-white rounded-[20px] shadow-sm border border-slate-200/60">
          <form onSubmit={handleSubmit(onSubmit)}>
            
            <div className="p-8 min-h-[400px]">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: Case Info */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Case Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Case ID <span className="text-red-500">*</span></label>
                        <input {...register('caseId', { required: true })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="e.g. C2026-1046" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Case Type <span className="text-red-500">*</span></label>
                        <select {...register('caseType', { required: true })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all">
                          <option value="">Select Case Type</option>
                          <option>Medico-Legal</option>
                          <option>Postmortem</option>
                          <option>Injury Examination</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">MLEF / PM Number</label>
                        <input {...register('mlefNumber')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="MLE-901" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Registration Date</label>
                        <input type="date" {...register('registrationDate')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Examinee */}
                {currentStep === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <div className="flex justify-between items-end mb-6 border-b border-slate-100 pb-4">
                      <h3 className="text-lg font-bold text-slate-800">Examinee Information</h3>
                      <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg">
                        Search Existing
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                        <input {...register('examineeName')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">NIC / Passport</label>
                        <input {...register('nic')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="123456789V" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Gender</label>
                        <select {...register('gender')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500">
                          <option>Male</option><option>Female</option><option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Age</label>
                        <input type="number" {...register('age')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="30" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 & 4 Omitted for brevity in mockup, adding quick mock */}
                {currentStep === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Police Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Police Station</label>
                        <input {...register('policeStation')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Officer Name</label>
                        <input {...register('officerName')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 4 && (
                   <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                   <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Court Information</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                       <label className="block text-sm font-semibold text-slate-700 mb-1.5">Court Name</label>
                       <input {...register('courtName')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" />
                     </div>
                     <div>
                       <label className="block text-sm font-semibold text-slate-700 mb-1.5">Case Number</label>
                       <input {...register('courtCaseNumber')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" />
                     </div>
                   </div>
                 </motion.div>
                )}

                {/* STEP 5: Doctor */}
                {currentStep === 5 && (
                  <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Assign Doctor</h3>
                    <div className="relative mb-6">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input type="text" placeholder="Search doctor by name or SLMC..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['Dr. John Silva', 'Dr. N. Perera'].map((doc) => (
                        <div key={doc} className="p-4 border border-slate-200 rounded-xl flex items-center gap-4 hover:border-blue-500 cursor-pointer transition-colors bg-white">
                          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">{doc.charAt(4)}</div>
                          <div className="flex-1">
                            <h4 className="font-bold text-slate-800">{doc}</h4>
                            <p className="text-xs text-slate-500">JMO • Available</p>
                          </div>
                          <input type="radio" value={doc} {...register('doctor')} className="w-4 h-4 text-blue-600" />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 6: Documents & Review */}
                {currentStep === 6 && (
                  <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Documents & Review</h3>
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer mb-8">
                      <UploadCloud size={40} className="text-blue-500 mb-3" />
                      <p className="font-semibold text-slate-700">Drag & Drop files here</p>
                      <p className="text-xs text-slate-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                      <button type="button" className="mt-4 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm hover:text-blue-600">Browse Files</button>
                    </div>
                    
                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-start gap-3">
                      <CheckCircle size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-emerald-800 text-sm">Ready for Submission</h4>
                        <p className="text-xs text-emerald-600 mt-1">
                          All required fields have been completed. Please review the details before {isEditMode ? 'saving changes' : 'creating the case'}.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Navigation Footer */}
            <div className="p-6 border-t border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-b-[20px]">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${currentStep === 1 ? 'opacity-50 cursor-not-allowed text-slate-400' : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-sm'}`}
              >
                <ChevronLeft size={16} /> Previous
              </button>
              
              <div className="flex gap-3">
                <button type="button" className="px-5 py-2.5 rounded-xl font-medium text-sm text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-sm transition-colors">
                  Save Draft
                </button>
                {currentStep < 6 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-600/20 transition-all"
                  >
                    Next Step <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm shadow-emerald-600/20 transition-all"
                  >
                    <Check size={16} /> {isEditMode ? 'Save Changes' : 'Create Case'}
                  </button>
                )}
              </div>
            </div>

          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewCase;
