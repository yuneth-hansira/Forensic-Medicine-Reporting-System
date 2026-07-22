import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Plus, Edit2, Trash2, Eye, AlertOctagon, 
  Activity, ArrowRight, ShieldAlert, HeartPulse
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const mockInjuries = [
  { id: 'INJ-001', type: 'Laceration', region: 'Head', side: 'Left', size: '5x2 cm', depth: 'Superficial', colour: 'Red', age: 'Recent', severity: 'Minor', weapon: 'Blunt', description: 'Small cut above eyebrow' },
  { id: 'INJ-002', type: 'Bruise', region: 'Chest', side: 'Right', size: '10x8 cm', depth: 'N/A', colour: 'Purple/Blue', age: '1-2 Days', severity: 'Major', weapon: 'Unknown', description: 'Large contusion on right pectoralis' },
  { id: 'INJ-003', type: 'Fracture', region: 'Arm', side: 'Left', size: 'N/A', depth: 'Deep', colour: 'Swollen', age: 'Recent', severity: 'Critical', weapon: 'Blunt force', description: 'Radius fracture' },
];

const statCards = [
  { title: "Total Injuries", value: "3", icon: Activity, color: "text-blue-600", bg: "bg-blue-100" },
  { title: "Critical", value: "1", icon: AlertOctagon, color: "text-red-600", bg: "bg-red-100" },
  { title: "Major", value: "1", icon: ShieldAlert, color: "text-amber-600", bg: "bg-amber-100" },
  { title: "Minor", value: "1", icon: HeartPulse, color: "text-green-600", bg: "bg-green-100" },
];

const InjuryRecording = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [injuries, setInjuries] = useState(mockInjuries);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleDelete = (id) => {
    setInjuries(injuries.filter(inj => inj.id !== id));
    toast.success('Injury record deleted');
  };

  return (
    <div className="font-sans text-slate-800">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-2 text-sm text-slate-500 font-medium">
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate('/clinical/dashboard')}>Clinical</span>
            <span>/</span>
            <span className="hover:text-blue-600 cursor-pointer">{caseId}</span>
            <span>/</span>
            <span className="text-blue-600">Injuries</span>
          </div>
          <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Injury Recording</h1>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate(`/clinical/${caseId}/body-map`)}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-all"
          >
            Body Map <ArrowRight size={18} />
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow-sm shadow-blue-200 hover:bg-blue-700 flex items-center gap-2 transition-all"
          >
            <Plus size={18} />
            Add Injury
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-100 flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${card.bg}`}>
              <card.icon className={card.color} size={24} />
            </div>
            <div>
              <h3 className="text-slate-500 text-sm font-medium">{card.title}</h3>
              <p className="text-2xl font-bold text-slate-800">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-[20px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-semibold text-slate-800">Recorded Injuries</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID / Type</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Region / Side</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Size / Depth</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Age / Colour</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Severity</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {injuries.map((inj, i) => (
                <motion.tr 
                  key={inj.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="font-medium text-slate-800">{inj.type}</div>
                    <div className="text-xs text-slate-500">{inj.id}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-slate-700">{inj.region}</div>
                    <div className="text-xs text-slate-500">{inj.side} side</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-slate-700">{inj.size}</div>
                    <div className="text-xs text-slate-500">{inj.depth}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-slate-700">{inj.age}</div>
                    <div className="text-xs text-slate-500">{inj.colour}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${inj.severity === 'Critical' ? 'bg-red-100 text-red-700' : 
                        inj.severity === 'Major' ? 'bg-amber-100 text-amber-700' : 
                        'bg-green-100 text-green-700'}`}>
                      {inj.severity}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(inj.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {injuries.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500">
                    No injuries recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal Placeholder */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[24px] shadow-xl w-full max-w-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Add New Injury</h2>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Injury Type</label>
                    <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Body Region</label>
                    <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea rows="3" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 resize-none"></textarea>
                </div>
              </div>
              <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-xl transition-colors">Cancel</button>
                <button onClick={() => { setShowAddModal(false); toast.success('Injury added'); }} className="px-6 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors">Save Injury</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
    );
};

export default InjuryRecording;
