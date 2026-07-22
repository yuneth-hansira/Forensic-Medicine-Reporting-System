import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Activity, FlaskConical, TestTube, CheckCircle, Clock, 
  Plus, Printer, QrCode, Search, Eye, Edit2, AlertCircle, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

const mockSpecimens = [
  { id: 'SPEC-001', type: 'Blood', site: 'Femoral Vein', quantity: '20ml', time: '2026-07-21T09:15:00Z', collectedBy: 'Dr. Smith', lab: 'Toxicology Lab', status: 'Pending Analysis' },
  { id: 'SPEC-002', type: 'Liver Tissue', site: 'Right Lobe', quantity: '50g', time: '2026-07-21T09:30:00Z', collectedBy: 'Dr. Smith', lab: 'Histopathology Lab', status: 'Sent to Lab' },
  { id: 'SPEC-003', type: 'Vitreous Humour', site: 'Right Eye', quantity: '2ml', time: '2026-07-21T09:40:00Z', collectedBy: 'Dr. Smith', lab: 'Biochemistry Lab', status: 'Completed' },
];

const specimenTypes = [
  'Blood', 'Urine', 'Vitreous Humour', 'Liver Tissue', 'Kidney Tissue', 
  'Heart Tissue', 'Lung Tissue', 'Brain Tissue', 'Stomach Contents', 
  'Bone', 'Hair', 'DNA Sample', 'Toxicology Sample', 'Histopathology Sample'
];

const statCards = [
  { title: "Total Specimens", value: "3", icon: Activity, color: "text-blue-600", bg: "bg-blue-100" },
  { title: "Sent to Lab", value: "1", icon: FlaskConical, color: "text-purple-600", bg: "bg-purple-100" },
  { title: "Pending Analysis", value: "1", icon: Clock, color: "text-amber-600", bg: "bg-amber-100" },
  { title: "Completed", value: "1", icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
];

const SpecimensCollected = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSpecimen, setSelectedSpecimen] = useState(null); // For tracking/timeline view

  const handlePrintLabel = (specId) => {
    toast.success(`Printing barcode label for ${specId}...`);
  };

  const filteredData = mockSpecimens.filter(s => 
    s.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.lab.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen ml-64 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-2 text-sm text-slate-500 font-medium">
              <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate('/autopsy')}>Autopsy</span>
              <span>/</span>
              <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate(`/autopsy/${id}`)}>{id}</span>
              <span>/</span>
              <span className="text-blue-600">Specimens</span>
            </div>
            <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Specimens Collected</h1>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-all">
              <Printer size={18} /> Print All Labels
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-sm shadow-blue-200 hover:bg-blue-700 flex items-center gap-2 transition-all"
            >
              <Plus size={18} /> Add Specimen
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

        <div className="flex gap-6">
          {/* Main Table Area */}
          <div className="flex-1 bg-white rounded-[24px] shadow-sm border border-slate-100 flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-semibold text-slate-800">Specimen Inventory</h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search specimens..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID / Type</th>
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Collection Detail</th>
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Laboratory</th>
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredData.map((spec) => (
                    <tr 
                      key={spec.id} 
                      className={`hover:bg-slate-50/50 transition-colors cursor-pointer ${selectedSpecimen?.id === spec.id ? 'bg-blue-50/30' : ''}`}
                      onClick={() => setSelectedSpecimen(spec)}
                    >
                      <td className="py-4 px-6">
                        <div className="font-medium text-slate-800 flex items-center gap-2">
                          <TestTube size={16} className="text-blue-500" /> {spec.type}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">{spec.id}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm font-medium text-slate-700">{spec.site} ({spec.quantity})</div>
                        <div className="text-xs text-slate-500 mt-1">{dayjs(spec.time).format('HH:mm')} • {spec.collectedBy}</div>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600 font-medium">{spec.lab}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-medium border
                          ${spec.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' : 
                            spec.status === 'Pending Analysis' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                            'bg-purple-50 text-purple-700 border-purple-200'}`}>
                          {spec.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={(e) => { e.stopPropagation(); handlePrintLabel(spec.id); }} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Print Label">
                            <QrCode size={16} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Edit">
                            <Edit2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Sidebar: Timeline & Tracker */}
          <div className="w-80 flex flex-col gap-6">
            <AnimatePresence mode="wait">
              {selectedSpecimen ? (
                <motion.div 
                  key="tracker"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-6"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="font-semibold text-slate-800">Chain of Custody</h3>
                      <p className="text-xs text-slate-500 mt-1">{selectedSpecimen.id} • {selectedSpecimen.type}</p>
                    </div>
                    <button onClick={() => setSelectedSpecimen(null)} className="text-slate-400 hover:text-slate-600">✕</button>
                  </div>
                  
                  {/* Mock QR Code */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center mb-6">
                    <QrCode size={64} className="text-slate-400 mb-2" />
                    <span className="text-xs font-mono text-slate-500">{selectedSpecimen.id}</span>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                    <div className="relative flex items-start">
                      <div className="bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-[10px] flex-shrink-0 z-10 shadow-sm">✓</div>
                      <div className="ml-4 flex flex-col">
                        <span className="text-sm font-semibold text-slate-800">Collected</span>
                        <span className="text-xs text-slate-500">{dayjs(selectedSpecimen.time).format('MMM D, HH:mm')} by {selectedSpecimen.collectedBy}</span>
                      </div>
                    </div>
                    <div className="relative flex items-start">
                      <div className={`rounded-full w-6 h-6 flex items-center justify-center text-[10px] flex-shrink-0 z-10 shadow-sm ${selectedSpecimen.status === 'Completed' || selectedSpecimen.status === 'Sent to Lab' ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-400'}`}>✓</div>
                      <div className="ml-4 flex flex-col">
                        <span className="text-sm font-semibold text-slate-800">Sent to Lab</span>
                        <span className="text-xs text-slate-500">{selectedSpecimen.lab}</span>
                      </div>
                    </div>
                    <div className="relative flex items-start">
                      <div className={`rounded-full w-6 h-6 flex items-center justify-center text-[10px] flex-shrink-0 z-10 shadow-sm ${selectedSpecimen.status === 'Completed' ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-400'}`}>✓</div>
                      <div className="ml-4 flex flex-col">
                        <span className="text-sm font-semibold text-slate-800">Results Received</span>
                        <span className="text-xs text-slate-500">Pending upload</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="bg-slate-50/50 rounded-[24px] border border-slate-100 p-8 flex flex-col items-center justify-center text-center h-full text-slate-400"
                >
                  <FlaskConical size={48} className="mb-4 text-slate-300" />
                  <p className="font-medium text-slate-600 mb-1">No Specimen Selected</p>
                  <p className="text-sm">Click on a specimen row to view its chain of custody timeline and generate barcode labels.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Add Modal Placeholder */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[24px] shadow-xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h2 className="text-xl font-semibold">Add New Specimen</h2>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Specimen Type</label>
                  <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {specimenTypes.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Collection Site</label>
                    <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Quantity/Volume</label>
                    <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Target Laboratory</label>
                  <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Toxicology Lab</option>
                    <option>Histopathology Lab</option>
                    <option>Biochemistry Lab</option>
                    <option>DNA Lab</option>
                  </select>
                </div>
              </div>
              <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-xl transition-colors">Cancel</button>
                <button onClick={() => { setShowAddModal(false); toast.success('Specimen added'); }} className="px-6 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors">Add Specimen</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpecimensCollected;
