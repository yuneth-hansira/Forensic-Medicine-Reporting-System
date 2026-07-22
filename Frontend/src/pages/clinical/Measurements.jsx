import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Ruler, Scale, Activity, Save, History, 
  ArrowRight, FileText, CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import toast from 'react-hot-toast';

const mockHistoryData = [
  { date: '2026-06-01', weight: 70, bmi: 22.5 },
  { date: '2026-06-15', weight: 69, bmi: 22.2 },
  { date: '2026-07-01', weight: 68.5, bmi: 22.0 },
  { date: '2026-07-21', weight: 68, bmi: 21.8 },
];

const Measurements = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const [measurements, setMeasurements] = useState({
    height: 175,
    weight: 68,
    headCircumference: 56,
    chestCircumference: 98,
    waist: 82,
    hip: 95,
    limbLengthRight: 80,
    limbLengthLeft: 80,
    doctorRemarks: ''
  });

  const bmi = (measurements.weight / ((measurements.height / 100) * (measurements.height / 100))).toFixed(1);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await new Promise(r => setTimeout(r, 1000));
      toast.success('Measurements saved successfully');
    } catch (error) {
      toast.error('Failed to save measurements');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setMeasurements(prev => ({ ...prev, [field]: value }));
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
              <span className="text-blue-600">Measurements</span>
            </div>
            <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Clinical Measurements</h1>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate(`/clinical/${caseId}/notes`)}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-all"
            >
              Notes <ArrowRight size={18} />
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-sm shadow-blue-200 hover:bg-blue-700 flex items-center gap-2 transition-all disabled:opacity-70"
            >
              <Save size={18} />
              {isSaving ? 'Saving...' : 'Save Data'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Metrics */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 rounded-[24px] shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-blue-200 font-medium text-sm">Body Mass Index</h3>
                  <p className="text-4xl font-bold mt-1">{bmi}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
                  <Activity size={24} className="text-white" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-100 bg-black/10 p-3 rounded-xl">
                <CheckCircle size={16} /> Normal Range (18.5 - 24.9)
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <History className="text-purple-600" size={20} />
                History & Trends
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockHistoryData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="date" tick={{fontSize: 12, fill: '#64748b'}} tickLine={false} axisLine={false} tickFormatter={(val) => val.split('-').slice(1).join('/')} />
                    <YAxis yAxisId="left" tick={{fontSize: 12, fill: '#64748b'}} tickLine={false} axisLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
                    <YAxis yAxisId="right" orientation="right" tick={{fontSize: 12, fill: '#64748b'}} tickLine={false} axisLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Line yAxisId="left" type="monotone" dataKey="weight" stroke="#2563eb" strokeWidth={3} dot={{r: 4, fill: '#2563eb'}} name="Weight (kg)" />
                    <Line yAxisId="right" type="monotone" dataKey="bmi" stroke="#8b5cf6" strokeWidth={3} dot={{r: 4, fill: '#8b5cf6'}} name="BMI" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Form Fields */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-8 rounded-[24px] shadow-sm border border-slate-100">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-slate-800">
                <Ruler className="text-amber-600" size={24} />
                Physical Dimensions
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Height (cm)</label>
                  <input type="number" value={measurements.height} onChange={(e) => handleInputChange('height', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Weight (kg)</label>
                  <input type="number" value={measurements.weight} onChange={(e) => handleInputChange('weight', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Head Circumference (cm)</label>
                  <input type="number" value={measurements.headCircumference} onChange={(e) => handleInputChange('headCircumference', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Chest Circumference (cm)</label>
                  <input type="number" value={measurements.chestCircumference} onChange={(e) => handleInputChange('chestCircumference', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Waist (cm)</label>
                  <input type="number" value={measurements.waist} onChange={(e) => handleInputChange('waist', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Hip (cm)</label>
                  <input type="number" value={measurements.hip} onChange={(e) => handleInputChange('hip', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Right Limb Length (cm)</label>
                  <input type="number" value={measurements.limbLengthRight} onChange={(e) => handleInputChange('limbLengthRight', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Left Limb Length (cm)</label>
                  <input type="number" value={measurements.limbLengthLeft} onChange={(e) => handleInputChange('limbLengthLeft', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <FileText size={16} className="text-slate-500" /> Remarks & Interpretation
                </label>
                <textarea 
                  rows="3" 
                  value={measurements.doctorRemarks} 
                  onChange={(e) => handleInputChange('doctorRemarks', e.target.value)} 
                  placeholder="Additional context on physical dimensions..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                ></textarea>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Measurements;
