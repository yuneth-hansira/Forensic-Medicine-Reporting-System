import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ZoomIn, ZoomOut, Save, Printer, 
  MapPin, Image as ImageIcon, Trash2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const legendColors = {
  Laceration: '#ef4444', // red-500
  Bruise: '#8b5cf6', // violet-500
  Burn: '#f97316', // orange-500
  Gunshot: '#14b8a6', // teal-500
  Fracture: '#eab308', // yellow-500
  Other: '#64748b' // slate-500
};

const BodyMap = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [scale, setScale] = useState(1);
  const [markers, setMarkers] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [view, setView] = useState('front'); // 'front' or 'back'
  const svgRef = useRef(null);

  const handleSvgClick = (e) => {
    // Only place marker if clicking directly on the SVG or body parts, not existing markers
    if (e.target.tagName !== 'svg' && e.target.tagName !== 'path' && e.target.tagName !== 'rect') return;
    
    const svg = svgRef.current;
    if (!svg) return;
    
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    
    const newMarker = {
      id: Date.now().toString(),
      x: svgP.x,
      y: svgP.y,
      type: 'Laceration',
      description: 'New Injury',
      view: view
    };
    
    setMarkers([...markers, newMarker]);
    setActiveMarker(newMarker.id);
  };

  const updateMarker = (id, updates) => {
    setMarkers(markers.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  const deleteMarker = (id) => {
    setMarkers(markers.filter(m => m.id !== id));
    setActiveMarker(null);
    toast.success('Marker deleted');
  };

  return (
    <div className="font-sans text-slate-800">
      <div className="max-w-6xl mx-auto flex flex-col h-[calc(100vh-6rem)]">
        <div className="mb-6 flex justify-between items-end flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-2 text-sm text-slate-500 font-medium">
              <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate('/clinical/dashboard')}>Clinical</span>
              <span>/</span>
              <span className="hover:text-blue-600 cursor-pointer">{caseId}</span>
              <span>/</span>
              <span className="text-blue-600">Body Map</span>
            </div>
            <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Interactive Body Map</h1>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-all">
              <Printer size={18} /> Print Diagram
            </button>
            <button 
              onClick={() => toast.success('Body map saved')}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-sm shadow-blue-200 hover:bg-blue-700 flex items-center gap-2 transition-all"
            >
              <Save size={18} /> Save Map
            </button>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-[24px] shadow-sm border border-slate-100 flex overflow-hidden">
          {/* Controls Sidebar */}
          <div className="w-64 border-r border-slate-100 p-6 flex flex-col bg-slate-50/50">
            <h3 className="font-semibold text-slate-800 mb-4">View</h3>
            <div className="flex bg-slate-200/50 p-1 rounded-xl mb-6">
              <button 
                onClick={() => setView('front')}
                className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${view === 'front' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Front
              </button>
              <button 
                onClick={() => setView('back')}
                className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${view === 'back' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Back
              </button>
            </div>

            <h3 className="font-semibold text-slate-800 mb-4">Legend</h3>
            <div className="space-y-3 mb-6">
              {Object.entries(legendColors).map(([type, color]) => (
                <div key={type} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  <span className="text-sm text-slate-600 font-medium">{type}</span>
                </div>
              ))}
            </div>

            <h3 className="font-semibold text-slate-800 mb-4">Controls</h3>
            <div className="flex gap-2 mb-6">
              <button onClick={() => setScale(Math.max(0.5, scale - 0.2))} className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <ZoomOut size={18} className="text-slate-600" />
              </button>
              <button onClick={() => setScale(Math.min(2.5, scale + 0.2))} className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <ZoomIn size={18} className="text-slate-600" />
              </button>
              <span className="my-auto text-sm text-slate-500 font-medium px-2">{Math.round(scale * 100)}%</span>
            </div>
            
            <div className="mt-auto">
              <button className="w-full py-3 bg-white border-2 border-dashed border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 hover:border-blue-400 hover:text-blue-500 transition-colors flex justify-center items-center gap-2">
                <ImageIcon size={18} /> Upload Image
              </button>
            </div>
          </div>

          {/* SVG Canvas */}
          <div className="flex-1 overflow-auto bg-[#F8FAFC] relative flex items-center justify-center p-8">
            <div 
              className="relative cursor-crosshair"
              style={{ transform: `scale(${scale})`, transition: 'transform 0.2s ease-out' }}
            >
              <svg 
                ref={svgRef}
                width="400" 
                height="800" 
                viewBox="0 0 400 800" 
                onClick={handleSvgClick}
                className="bg-white rounded-3xl shadow-sm"
              >
                {/* Simplified Body Outline placeholder */}
                {view === 'front' ? (
                  <g stroke="#94a3b8" strokeWidth="2" fill="#f1f5f9" className="hover:fill-[#e2e8f0] transition-colors">
                    {/* Head */}
                    <circle cx="200" cy="100" r="40" />
                    {/* Torso */}
                    <rect x="150" y="150" width="100" height="150" rx="20" />
                    {/* Arms */}
                    <rect x="90" y="150" width="40" height="180" rx="20" />
                    <rect x="270" y="150" width="40" height="180" rx="20" />
                    {/* Legs */}
                    <rect x="160" y="320" width="35" height="200" rx="15" />
                    <rect x="205" y="320" width="35" height="200" rx="15" />
                  </g>
                ) : (
                  <g stroke="#94a3b8" strokeWidth="2" fill="#f1f5f9" className="hover:fill-[#e2e8f0] transition-colors">
                     {/* Head (Back) */}
                     <circle cx="200" cy="100" r="40" strokeDasharray="4 4" />
                    {/* Torso (Back) */}
                    <rect x="150" y="150" width="100" height="150" rx="20" />
                    {/* Arms (Back) */}
                    <rect x="90" y="150" width="40" height="180" rx="20" />
                    <rect x="270" y="150" width="40" height="180" rx="20" />
                    {/* Legs (Back) */}
                    <rect x="160" y="320" width="35" height="200" rx="15" />
                    <rect x="205" y="320" width="35" height="200" rx="15" />
                  </g>
                )}

                {/* Markers */}
                {markers.filter(m => m.view === view).map(marker => (
                  <g 
                    key={marker.id} 
                    transform={`translate(${marker.x}, ${marker.y})`}
                    onClick={(e) => { e.stopPropagation(); setActiveMarker(marker.id); }}
                    className="cursor-pointer group"
                  >
                    <circle 
                      r="12" 
                      fill={legendColors[marker.type]} 
                      className={`transition-all ${activeMarker === marker.id ? 'stroke-black stroke-[3px]' : 'stroke-white stroke-2 group-hover:scale-110'}`} 
                    />
                    <circle r="4" fill="white" />
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Edit Marker Overlay */}
          <AnimatePresence>
            {activeMarker && (
              <motion.div 
                initial={{ x: 300, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }} 
                exit={{ x: 300, opacity: 0 }}
                className="w-80 border-l border-slate-100 bg-white p-6 absolute right-0 top-0 bottom-0 shadow-[-10px_0_30px_rgba(0,0,0,0.05)] flex flex-col"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-slate-800 text-lg">Marker Details</h3>
                  <button onClick={() => setActiveMarker(null)} className="text-slate-400 hover:text-slate-600">✕</button>
                </div>
                
                {markers.find(m => m.id === activeMarker) && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Injury Type</label>
                      <select 
                        value={markers.find(m => m.id === activeMarker).type}
                        onChange={(e) => updateMarker(activeMarker, { type: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        {Object.keys(legendColors).map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                      <textarea 
                        rows="4"
                        value={markers.find(m => m.id === activeMarker).description}
                        onChange={(e) => updateMarker(activeMarker, { description: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                      ></textarea>
                    </div>
                    
                    <button 
                      onClick={() => deleteMarker(activeMarker)}
                      className="w-full py-2 bg-red-50 text-red-600 font-medium rounded-xl hover:bg-red-100 transition-colors flex justify-center items-center gap-2 mt-4"
                    >
                      <Trash2 size={18} /> Delete Marker
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
    );
};

export default BodyMap;
