import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, CheckCircle, ChevronDown, ChevronUp, FileText, FlaskConical, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const systems = [
  { id: 'head_neck', label: 'Head & Neck' },
  { id: 'chest', label: 'Chest' },
  { id: 'heart', label: 'Heart' },
  { id: 'lungs', label: 'Lungs' },
  { id: 'abdomen', label: 'Abdomen' },
  { id: 'liver', label: 'Liver' },
  { id: 'kidneys', label: 'Kidneys' },
  { id: 'spleen', label: 'Spleen' },
  { id: 'stomach', label: 'Stomach & Intestines' },
  { id: 'pelvis', label: 'Pelvis' },
  { id: 'spine', label: 'Spine' },
  { id: 'limbs', label: 'Upper & Lower Limbs' },
  { id: 'genital', label: 'Genital Examination' }
];

const InternalExamination = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState('head_neck');
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  const handleInputChange = (systemId, field, value) => {
    setFormData(prev => ({
      ...prev,
      [systemId]: {
        ...(prev[systemId] || {}),
        [field]: value
      }
    }));
  };

  const handleSaveDraft = () => {
    toast.success('Internal examination draft saved');
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await new Promise(r => setTimeout(r, 1000));
      toast.success('Internal examination saved successfully');
      navigate(`/clinical/${caseId}/findings`);
    } catch (error) {
      toast.error('Failed to save data');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans text-slate-800">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-2 text-sm text-slate-500 font-medium">
              <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate('/clinical/dashboard')}>Clinical</span>
              <span>/</span>
              <span className="hover:text-blue-600 cursor-pointer">{caseId}</span>
              <span>/</span>
              <span className="text-blue-600">Internal Exam</span>
            </div>
            <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Internal Examination</h1>
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
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-sm shadow-blue-200 hover:bg-blue-700 flex items-center gap-2 transition-all disabled:opacity-70"
            >
              <CheckCircle size={18} />
              {isSubmitting ? 'Saving...' : 'Submit & Continue'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[20px] shadow-sm border border-slate-100 overflow-hidden mb-6">
          {systems.map((system, idx) => (
            <div key={system.id} className={`${idx !== systems.length - 1 ? 'border-b border-slate-100' : ''}`}>
              <button
                onClick={() => toggleSection(system.id)}
                className={`w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-slate-50 transition-colors ${openSection === system.id ? 'bg-blue-50/30' : ''}`}
              >
                <span className="font-semibold text-slate-800">{system.label}</span>
                {openSection === system.id ? <ChevronUp className="text-blue-600" size={20} /> : <ChevronDown className="text-slate-400" size={20} />}
              </button>
              
              <AnimatePresence>
                {openSection === system.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-slate-50/50 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                          <FileText size={16} className="text-blue-500" /> Observations
                        </label>
                        <textarea 
                          rows="3" 
                          value={formData[system.id]?.observations || ''}
                          onChange={(e) => handleInputChange(system.id, 'observations', e.target.value)}
                          placeholder="Detailed observations..." 
                          className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                        ></textarea>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Measurements / Weight</label>
                          <input 
                            type="text" 
                            value={formData[system.id]?.measurements || ''}
                            onChange={(e) => handleInputChange(system.id, 'measurements', e.target.value)}
                            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                            <FlaskConical size={16} className="text-purple-500" /> Specimens Collected
                          </label>
                          <input 
                            type="text" 
                            value={formData[system.id]?.specimens || ''}
                            onChange={(e) => handleInputChange(system.id, 'specimens', e.target.value)}
                            placeholder="e.g. Tissue sample, fluid..."
                            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                          />
                        </div>
                      </div>
                      
                      <div>
                        <button className="text-sm font-medium text-blue-600 flex items-center gap-1 hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                          <Paperclip size={16} /> Attach Image / File
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-100">
          <h2 className="text-xl font-semibold mb-4">Doctor's Overall Opinion</h2>
          <textarea 
            rows="4" 
            placeholder="Summary of internal findings..." 
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
          ></textarea>
        </div>
      </div>
    </div>
    );
};

export default InternalExamination;
