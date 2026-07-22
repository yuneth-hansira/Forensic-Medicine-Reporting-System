import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  User, Phone, Stethoscope, Building2, Shield, FileUp,
  Check, ChevronRight, ChevronLeft, UploadCloud, CheckCircle,
  Save, AlertCircle
} from 'lucide-react';


const steps = [
  { id: 1, name: 'Personal',  icon: <User size={18} /> },
  { id: 2, name: 'Contact',   icon: <Phone size={18} /> },
  { id: 3, name: 'Medical',   icon: <Stethoscope size={18} /> },
  { id: 4, name: 'Hospital',  icon: <Building2 size={18} /> },
  { id: 5, name: 'Forensic',  icon: <Shield size={18} /> },
  { id: 6, name: 'Uploads',   icon: <FileUp size={18} /> },
];

const RegisterExaminee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [currentStep, setCurrentStep] = useState(1);
  const [photoPreview, setPhotoPreview] = useState(null);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: isEditMode ? {
      firstName: 'Nimal',
      middleName: 'Bandara',
      lastName: 'Perera',
      nic: '890123456V',
      passport: '',
      gender: 'Male',
      dob: '1992-03-15',
      age: 34,
      nationality: 'Sri Lankan',
      maritalStatus: 'Married',
      religion: 'Buddhist',
      occupation: 'Clerk',
      phone: '+94 71 234 5678',
      email: 'nimal.perera@gmail.com',
      address: 'No. 25, Peradeniya Road',
      district: 'Kandy',
      province: 'Central',
      postalCode: '20000',
      emergencyName: 'Kamala Perera',
      emergencyRelation: 'Spouse',
      emergencyPhone: '+94 71 999 8877',
      bloodGroup: 'O+',
      allergies: 'Penicillin',
      hospital: 'Kandy National Hospital',
      ward: 'Ward 12',
      bedNumber: '14',
      caseNumber: 'C2026-1045',
      caseType: 'Medico-Legal',
      mlefNumber: 'MLE-892',
      policeStation: 'Kandy Police Station',
      investigatingOfficer: 'IP Kumara',
    } : {
      nationality: 'Sri Lankan',
      gender: 'Male',
      bloodGroup: 'O+',
    }
  });

  const dobValue = watch('dob');

  // Auto-calculate age from DOB
  useEffect(() => {
    if (dobValue) {
      const birthDate = new Date(dobValue);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (!isNaN(age) && age >= 0) {
        setValue('age', age);
      }
    }
  }, [dobValue, setValue]);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const onSubmit = (data) => {
    console.log("Examinee Data:", data);
    navigate(isEditMode ? `/examinees/${id}` : '/examinees');
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
        
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <Link to="/examinees" className="hover:text-blue-600 transition-colors">Examinees</Link>
            <ChevronRight size={14} />
            {isEditMode && (
              <>
                <Link to={`/examinees/${id}`} className="hover:text-blue-600 transition-colors">{id}</Link>
                <ChevronRight size={14} />
              </>
            )}
            <span className="text-slate-800 font-medium">
              {isEditMode ? 'Edit Examinee' : 'Register Examinee'}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            {isEditMode ? `Edit Examinee: ${id}` : 'Register New Examinee'}
          </h1>
        </div>

        {/* Stepper Progress Indicator */}
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-200/60 mb-8 overflow-x-auto">
          <div className="flex items-center min-w-max justify-between px-4">
            {steps.map((step, idx) => (
              <React.Fragment key={step.id}>
                <div 
                  onClick={() => setCurrentStep(step.id)} 
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative z-10 bg-white
                    ${currentStep > step.id ? 'border-emerald-500 bg-emerald-500 text-white' : 
                      currentStep === step.id ? 'border-blue-600 text-blue-600 shadow-[0_0_0_4px_rgba(37,99,235,0.1)]' : 
                      'border-slate-200 text-slate-400 group-hover:border-slate-300'}`}
                  >
                    {currentStep > step.id ? <Check size={20} /> : step.icon}
                  </div>
                  <span className={`mt-2 text-xs font-bold ${currentStep === step.id ? 'text-slate-800' : 'text-slate-400'}`}>
                    {step.name}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`flex-1 h-[2px] mx-4 transition-all duration-300 ${currentStep > step.id ? 'bg-emerald-500' : 'bg-slate-100'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-[20px] shadow-sm border border-slate-200/60">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-8 min-h-[420px]">
              <AnimatePresence mode="wait">

                {/* STEP 1: Personal Information */}
                {currentStep === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-lg font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100 flex items-center gap-2">
                      <User className="text-blue-600" size={20} /> Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">First Name <span className="text-red-500">*</span></label>
                        <input {...register('firstName', { required: true })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="e.g. Nimal" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Middle Name</label>
                        <input {...register('middleName')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="e.g. Bandara" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Last Name <span className="text-red-500">*</span></label>
                        <input {...register('lastName', { required: true })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="e.g. Perera" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">NIC Number <span className="text-red-500">*</span></label>
                        <input {...register('nic', { required: true })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="890123456V / 198901203456" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Passport Number</label>
                        <input {...register('passport')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="N1234567" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Gender <span className="text-red-500">*</span></label>
                        <select {...register('gender')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 font-medium">
                          <option>Male</option><option>Female</option><option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Date of Birth</label>
                        <input type="date" {...register('dob')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Age (Auto Calculated)</label>
                        <input type="number" readOnly {...register('age')} className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm outline-none font-bold text-slate-700" placeholder="Auto" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Nationality</label>
                        <input {...register('nationality')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Marital Status</label>
                        <select {...register('maritalStatus')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500">
                          <option>Single</option><option>Married</option><option>Divorced</option><option>Widowed</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Religion</label>
                        <input {...register('religion')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="e.g. Buddhist" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Occupation</label>
                        <input {...register('occupation')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="e.g. Teacher" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Contact Information */}
                {currentStep === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-lg font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100 flex items-center gap-2">
                      <Phone className="text-blue-600" size={20} /> Contact & Emergency Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Phone Number <span className="text-red-500">*</span></label>
                        <input {...register('phone', { required: true })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="+94 77 123 4567" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Email Address</label>
                        <input type="email" {...register('email')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="name@example.com" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Permanent Address</label>
                        <input {...register('address')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="House No, Street Name, Town" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">District</label>
                        <input {...register('district')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="Kandy" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Province</label>
                        <input {...register('province')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="Central Province" />
                      </div>
                    </div>

                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 pt-4 border-t border-slate-100">Emergency Contact</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Contact Name</label>
                        <input {...register('emergencyName')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Relationship</label>
                        <input {...register('emergencyRelation')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="Spouse / Parent / Sibling" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Emergency Phone</label>
                        <input {...register('emergencyPhone')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Medical Information */}
                {currentStep === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-lg font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100 flex items-center gap-2">
                      <Stethoscope className="text-blue-600" size={20} /> Medical Background
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Blood Group</label>
                        <select {...register('bloodGroup')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 font-bold text-red-600">
                          <option>O+</option><option>O-</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Known Allergies</label>
                        <input {...register('allergies')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="e.g. Penicillin, Nuts" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Current Medications</label>
                        <textarea rows={2} {...register('medications')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="List active prescriptions..." />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Medical Conditions & Past Surgeries</label>
                        <textarea rows={2} {...register('medicalConditions')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="e.g. Hypertension, Diabetes, Appendectomy 2021" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: Hospital Information */}
                {currentStep === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-lg font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100 flex items-center gap-2">
                      <Building2 className="text-blue-600" size={20} /> Hospital & Admission Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Hospital Name</label>
                        <input {...register('hospital')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="Kandy National Hospital" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Ward Number</label>
                        <input {...register('ward')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="Ward 12" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Bed Number</label>
                        <input {...register('bedNumber')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="Bed 14" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Admission Date</label>
                        <input type="date" {...register('admissionDate')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Referral Hospital</label>
                        <input {...register('referralHospital')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="Peradeniya Teaching Hospital" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Referral Doctor</label>
                        <input {...register('referralDoctor')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="Dr. S. K. Perera" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: Forensic Information */}
                {currentStep === 5 && (
                  <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-lg font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100 flex items-center gap-2">
                      <Shield className="text-blue-600" size={20} /> Forensic & Legal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Case Number</label>
                        <input {...register('caseNumber')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="C2026-1045" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Case Type</label>
                        <select {...register('caseType')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 font-medium">
                          <option>Medico-Legal</option><option>Postmortem</option><option>Injury Examination</option><option>Toxicology</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">MLEF Number</label>
                        <input {...register('mlefNumber')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="MLE-892" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Police Station</label>
                        <input {...register('policeStation')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="Kandy Police Station" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Investigating Officer</label>
                        <input {...register('investigatingOfficer')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="IP Kumara" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Reason for Examination</label>
                        <input {...register('reasonExam')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="Assault / RTA / Physical Exam" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 6: Uploads & Review */}
                {currentStep === 6 && (
                  <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-lg font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100 flex items-center gap-2">
                      <FileUp className="text-blue-600" size={20} /> Documents & Review
                    </h3>

                    <div className="border-2 border-dashed border-slate-300 rounded-[20px] p-8 flex flex-col items-center justify-center bg-slate-50/70 hover:bg-blue-50/50 hover:border-blue-400 transition-colors cursor-pointer mb-8">
                      <UploadCloud size={44} className="text-blue-500 mb-3" />
                      <p className="font-bold text-slate-800 text-base">Drag & Drop identification docs, photo, referral letter</p>
                      <p className="text-xs text-slate-500 mt-1">Supports PDF, JPG, PNG up to 15MB</p>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-start gap-3">
                      <CheckCircle size={22} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-emerald-800 text-sm">Ready for Submission</h4>
                        <p className="text-xs text-emerald-700 mt-1">
                          All mandatory fields are populated. Click <strong>{isEditMode ? 'Save Changes' : 'Submit Registration'}</strong> to record this examinee in the FMIS system.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Form Footer */}
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
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm shadow-emerald-600/20 transition-all"
                  >
                    <Check size={16} /> {isEditMode ? 'Save Changes' : 'Submit Registration'}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
};

export default RegisterExaminee;
