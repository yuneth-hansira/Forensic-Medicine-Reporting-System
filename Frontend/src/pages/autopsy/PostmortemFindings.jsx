import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Save, CheckCircle, UploadCloud, Stethoscope, ChevronRight, Activity, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const sections = [
  { id: 'general', title: 'General Condition', icon: Activity },
  { id: 'external', title: 'External Examination', icon: Stethoscope },
  { id: 'internal', title: 'Internal Examination', icon: Stethoscope },
  { id: 'injuries', title: 'Injuries & Measurements', icon: MapPin },
];

const PostmortemFindings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit } = useForm();

  const handleSaveDraft = () => {
    toast.success('Draft saved successfully');
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await new Promise(r => setTimeout(r, 1200));
      toast.success('Postmortem findings approved & saved');
      navigate(`/autopsy/${id}/cause-of-death`);
    } catch (error) {
      toast.error('Failed to save findings');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen ml-64 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-2 text-sm text-slate-500 font-medium">
              <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate('/autopsy')}>Autopsy</span>
              <span>/</span>
              <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate(`/autopsy/${id}`)}>{id}</span>
              <span>/</span>
              <span className="text-blue-600">Postmortem</span>
            </div>
            <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Postmortem Findings</h1>
          </div>
          <div className="flex gap-4">
            <button 
              type="button"
              onClick={handleSaveDraft}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-all"
            >
              <Save size={18} /> Save Draft
            </button>
            <button 
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-sm shadow-blue-200 hover:bg-blue-700 flex items-center gap-2 transition-all disabled:opacity-70"
            >
              <CheckCircle size={18} />
              {isSubmitting ? 'Approving...' : 'Approve Findings'}
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Vertical Tabs Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-[20px] shadow-sm border border-slate-100 p-2 sticky top-8">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl mb-1 transition-all ${activeSection === section.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <div className="flex items-center gap-3">
                    <section.icon size={18} className={activeSection === section.id ? 'text-blue-600' : 'text-slate-400'} />
                    <span className="text-sm">{section.title}</span>
                  </div>
                  {activeSection === section.id && <ChevronRight size={16} className="text-blue-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 bg-white rounded-[24px] shadow-sm border border-slate-100 p-8 min-h-[600px]">
            <form id="postmortem-form" onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {activeSection === 'general' && (
                  <motion.div key="general" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="text-xl font-semibold mb-6 pb-4 border-b border-slate-100">General Condition</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Body Condition / Built</label>
                        <select {...register('bodyCondition')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                          <option value="Average">Average</option>
                          <option value="Thin">Thin / Emaciated</option>
                          <option value="Obese">Obese</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Nutrition</label>
                        <select {...register('nutrition')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                          <option value="Good">Good</option>
                          <option value="Fair">Fair</option>
                          <option value="Poor">Poor</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Rigor Mortis</label>
                        <input {...register('rigorMortis')} placeholder="Extent & distribution..." className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Livor Mortis (Postmortem Lividity)</label>
                        <input {...register('livorMortis')} placeholder="Colour & distribution..." className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Signs of Decomposition</label>
                        <textarea {...register('decomposition')} rows="3" placeholder="Discolouration, marbling, bloating..." className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'external' && (
                  <motion.div key="external" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="text-xl font-semibold mb-6 pb-4 border-b border-slate-100">External Examination</h2>
                    <div className="space-y-4">
                      {['Head', 'Face', 'Neck', 'Chest', 'Abdomen', 'Back', 'Upper Limbs', 'Lower Limbs', 'Pelvis & Genitalia'].map(region => (
                        <div key={region}>
                          <label className="block text-sm font-medium text-slate-700 mb-1">{region}</label>
                          <textarea {...register(`ext_${region}`)} rows="2" placeholder={`Observations on ${region.toLowerCase()}...`} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeSection === 'internal' && (
                  <motion.div key="internal" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="text-xl font-semibold mb-6 pb-4 border-b border-slate-100">Internal Examination</h2>
                    <div className="space-y-4">
                      {['Brain & Meninges', 'Heart & Pericardium', 'Lungs & Pleura', 'Liver & Gallbladder', 'Kidneys', 'Spleen', 'Stomach & Contents', 'Intestines', 'Bladder & Reproductive Organs', 'Musculoskeletal'].map(organ => (
                        <div key={organ}>
                          <label className="block text-sm font-medium text-slate-700 mb-1">{organ}</label>
                          <textarea {...register(`int_${organ}`)} rows="2" placeholder={`Pathological findings in ${organ.toLowerCase()}...`} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeSection === 'injuries' && (
                  <motion.div key="injuries" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="text-xl font-semibold mb-6 pb-4 border-b border-slate-100">Injuries, Media & Notes</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Summary of Injuries & Measurements</label>
                        <textarea {...register('injuriesSummary')} rows="4" placeholder="Detailed injury descriptions..." className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
                      </div>
                      
                      <div className="border-t border-slate-100 pt-6">
                        <label className="block text-sm font-medium text-slate-700 mb-3">Upload Clinical Images & Diagrams</label>
                        <button type="button" className="w-full border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:border-blue-400 hover:text-blue-500 transition-colors bg-slate-50 hover:bg-blue-50 cursor-pointer">
                          <UploadCloud size={32} className="mb-2" />
                          <span className="font-medium">Upload Photos or Files</span>
                          <span className="text-xs mt-1">JPEG, PNG, PDF up to 15MB</span>
                        </button>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Doctor's Private Notes</label>
                        <textarea {...register('doctorNotes')} rows="4" placeholder="Notes not included in the final public report..." className="w-full px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none resize-none"></textarea>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostmortemFindings;
