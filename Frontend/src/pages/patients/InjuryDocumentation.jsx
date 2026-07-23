import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  AlertTriangle, MapPin, Upload, Camera, ZoomIn, ZoomOut,
  RotateCcw, Plus, X, ChevronDown, Save, FileText
} from 'lucide-react';
import '../patients/patients.css';
import './InjuryDocumentation.css';
import { authService } from '../../services/authService';
import { canCreate, canEdit, canDelete } from '../../utils/permissions';

const INJURY_TYPES   = ['Laceration','Contusion','Abrasion','Fracture','Burn','Stab Wound','Gunshot','Bruise','Swelling','Other'];
const SEVERITIES     = [
  { label:'Minor',    color:'#10b981', bg:'#ecfdf5' },
  { label:'Moderate', color:'#f59e0b', bg:'#fffbeb' },
  { label:'Severe',   color:'#ef4444', bg:'#fef2f2' },
  { label:'Critical', color:'#7c3aed', bg:'#f5f3ff' },
];

const defaultPins = [];

const severityColor = { Minor:'#10b981', Moderate:'#f59e0b', Severe:'#ef4444', Critical:'#7c3aed' };

const InjuryDocumentation = () => {
  const user = authService.getUser();
  const [pins, setPins]       = useState(defaultPins);
  const [bodySide, setBodySide] = useState('front');
  const [selected, setSelected] = useState(null);
  const [newInjury, setNewInjury] = useState({ type:'Laceration', severity:'Moderate', desc:'', x:0, y:0 });
  const [addingMode, setAddingMode] = useState(false);

  const currentPins = pins.filter(p => p.side === bodySide);

  const handleBodyClick = (e) => {
    if (!addingMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top)  / rect.height) * 100);
    const newPin = { id: Date.now(), x, y, side: bodySide, ...newInjury };
    setPins(p => [...p, newPin]);
    setSelected(newPin.id);
    setAddingMode(false);
  };

  const removePin = (id) => {
    setPins(p => p.filter(x => x.id !== id));
    if (selected === id) setSelected(null);
  };

  const selectedPin = pins.find(p => p.id === selected);

  return (
    <DashboardLayout>
      <div className="pm-page">
        <div className="pm-page-header">
          <div>
            <div className="pm-breadcrumb">
              <a href="/patients">Patient Management</a><span>/</span>
              <a href="/patients/PT-2026-1045">Nimal Perera</a><span>/</span>
              <span>Injury Documentation</span>
            </div>
            <h1 className="pm-page-title">Injury Documentation</h1>
            <p className="pm-page-subtitle">Mark and record injuries on anatomical body diagram</p>
          </div>
          <div className="pm-header-actions">
            <button className="pm-btn pm-btn-secondary"><FileText size={16}/>Generate Report</button>
            <button className="pm-btn pm-btn-primary"><Save size={16}/>Save Documentation</button>
          </div>
        </div>

        <div className="id-layout">

          {/* Toolbar */}
          <div className="pm-card id-toolbar">
            <h4 style={{margin:'0 0 1rem',fontSize:'0.875rem',fontWeight:700,color:'#0f172a'}}>Add Injury</h4>
            <div className="pm-form-group">
              <label className="pm-label">Injury Type</label>
              <select className="pm-select" value={newInjury.type} onChange={e=>setNewInjury(n=>({...n,type:e.target.value}))}>
                {INJURY_TYPES.map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="pm-form-group">
              <label className="pm-label">Severity</label>
              <div className="id-severity-grid">
                {SEVERITIES.map(s=>(
                  <button
                    key={s.label}
                    className={`id-sev-btn ${newInjury.severity===s.label?'active':''}`}
                    style={newInjury.severity===s.label?{background:s.bg,borderColor:s.color,color:s.color}:{}}
                    onClick={()=>setNewInjury(n=>({...n,severity:s.label}))}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="pm-form-group">
              <label className="pm-label">Measurements (cm)</label>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.5rem'}}>
                <input className="pm-input" placeholder="Length" style={{fontSize:'0.82rem'}}/>
                <input className="pm-input" placeholder="Width"  style={{fontSize:'0.82rem'}}/>
              </div>
            </div>
            <div className="pm-form-group">
              <label className="pm-label">Description</label>
              <textarea
                className="pm-textarea"
                rows={3}
                placeholder="Describe the injury..."
                style={{fontSize:'0.82rem'}}
                value={newInjury.desc}
                onChange={e=>setNewInjury(n=>({...n,desc:e.target.value}))}
              />
            </div>
            <button
              className={`pm-btn ${addingMode?'pm-btn-danger':'pm-btn-primary'}`}
              style={{width:'100%',justifyContent:'center'}}
              onClick={()=>setAddingMode(a=>!a)}
            >
              {addingMode ? <><X size={16}/>Cancel — Click Body to Place</> : <><Plus size={16}/>Click to Place Injury Pin</>}
            </button>

            {addingMode && (
              <div className="id-instruction-banner">
                <AlertTriangle size={14} color="#d97706"/>
                <span>Click on the body diagram to place the injury marker</span>
              </div>
            )}

            {/* Injury List */}
            <div style={{marginTop:'1.5rem'}}>
              <h4 style={{margin:'0 0 0.75rem',fontSize:'0.8rem',fontWeight:700,color:'#0f172a',textTransform:'uppercase',letterSpacing:'0.05em'}}>
                Recorded Injuries ({currentPins.length})
              </h4>
              <div className="id-injury-list">
                {currentPins.length === 0 && (
                  <p style={{fontSize:'0.8rem',color:'#94a3b8',textAlign:'center',padding:'1rem'}}>No injuries marked on {bodySide} view</p>
                )}
                {currentPins.map(pin=>(
                  <div
                    key={pin.id}
                    className={`id-injury-item ${selected===pin.id?'selected':''}`}
                    onClick={()=>setSelected(selected===pin.id?null:pin.id)}
                  >
                    <div className="id-injury-dot" style={{background:severityColor[pin.severity]||'#64748b'}}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontWeight:700,fontSize:'0.8rem',color:'#0f172a'}}>{pin.type}</div>
                      <div style={{fontSize:'0.72rem',color:'#64748b',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{pin.desc||'No description'}</div>
                    </div>
                    <span style={{fontSize:'0.68rem',fontWeight:700,color:severityColor[pin.severity],flexShrink:0}}>{pin.severity}</span>
                    <button onClick={e=>{e.stopPropagation();removePin(pin.id)}} style={{background:'none',border:'none',cursor:'pointer',color:'#94a3b8',padding:'0 0 0 0.25rem'}}><X size={13}/></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Body Diagram */}
          <div className="pm-card id-body-panel">
            {/* Side Toggle */}
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.25rem'}}>
              <h3 className="pm-card-title" style={{margin:0}}>Anatomical Body Diagram</h3>
              <div className="am-view-toggle">
                <button className={bodySide==='front'?'active':''} onClick={()=>setBodySide('front')}>Front View</button>
                <button className={bodySide==='back' ?'active':''} onClick={()=>setBodySide('back')}>Back View</button>
              </div>
            </div>

            {addingMode && (
              <div style={{textAlign:'center',padding:'0.5rem',background:'#fef3c7',border:'1px solid #fde68a',borderRadius:'10px',fontSize:'0.82rem',color:'#92400e',fontWeight:600,marginBottom:'1rem'}}>
                📍 Click anywhere on the body to place the <strong>{newInjury.type}</strong> marker
              </div>
            )}

            {/* SVG Body Diagram */}
            <div
              className={`id-body-container ${addingMode?'placing':''}`}
              onClick={handleBodyClick}
            >
              {/* Simple SVG body outline */}
              <svg viewBox="0 0 200 480" className="id-body-svg" xmlns="http://www.w3.org/2000/svg">
                {/* Head */}
                <ellipse cx="100" cy="45" rx="30" ry="38" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2"/>
                {/* Neck */}
                <rect x="88" y="80" width="24" height="20" rx="4" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2"/>
                {/* Torso */}
                <rect x="60" y="98" width="80" height="120" rx="10" fill="#e8f4fd" stroke="#94a3b8" strokeWidth="2"/>
                {/* Left Arm */}
                <rect x="22" y="100" width="36" height="110" rx="18" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2"/>
                {/* Right Arm */}
                <rect x="142" y="100" width="36" height="110" rx="18" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2"/>
                {/* Left Leg */}
                <rect x="62" y="222" width="34" height="145" rx="17" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2"/>
                {/* Right Leg */}
                <rect x="104" y="222" width="34" height="145" rx="17" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2"/>
                {/* Left Foot */}
                <ellipse cx="79" cy="378" rx="18" ry="10" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2"/>
                {/* Right Foot */}
                <ellipse cx="121" cy="378" rx="18" ry="10" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2"/>

                {/* Body outline label */}
                <text x="100" y="430" textAnchor="middle" fontSize="12" fill="#94a3b8" fontWeight="600">
                  {bodySide.charAt(0).toUpperCase()+bodySide.slice(1)} View
                </text>

                {/* Injury pins */}
                {currentPins.map(pin=>(
                  <g key={pin.id} transform={`translate(${pin.x*2}, ${pin.y*4.8})`}
                    onClick={e=>{e.stopPropagation();setSelected(pin.id===selected?null:pin.id)}}
                    style={{cursor:'pointer'}}
                  >
                    <circle r="9" fill={severityColor[pin.severity]} opacity="0.25"/>
                    <circle r="6" fill={severityColor[pin.severity]}/>
                    <circle r="2.5" fill="white"/>
                    {selected===pin.id && (
                      <circle r="11" fill="none" stroke={severityColor[pin.severity]} strokeWidth="2" strokeDasharray="3 2"/>
                    )}
                  </g>
                ))}
              </svg>
            </div>

            {/* Selected Injury Detail */}
            {selectedPin && (
              <div className="id-selected-detail">
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'0.75rem'}}>
                  <h4 style={{margin:0,fontSize:'0.875rem',fontWeight:700}}>Selected Injury Detail</h4>
                  <button onClick={()=>setSelected(null)} style={{background:'none',border:'none',cursor:'pointer',color:'#94a3b8'}}><X size={16}/></button>
                </div>
                {[
                  ['Type',        selectedPin.type],
                  ['Severity',    selectedPin.severity],
                  ['Location',    `${selectedPin.side} view — X:${selectedPin.x}% Y:${selectedPin.y}%`],
                  ['Description', selectedPin.desc || '—'],
                ].map(([l,v])=>(
                  <div key={l} className="pm-info-row">
                    <span className="pm-info-label">{l}</span>
                    <span className="pm-info-value" style={l==='Severity'?{color:severityColor[selectedPin.severity],fontWeight:700}:{}}>{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Photo Upload Panel */}
          <div className="id-photo-panel">
            <div className="pm-card">
              <h3 className="pm-card-title" style={{marginBottom:'1rem'}}>Injury Photographs</h3>
              <div className="pm-upload-zone">
                <Upload size={26} className="pm-upload-zone-icon"/>
                <p className="pm-upload-zone-text">Upload Photos</p>
                <p className="pm-upload-zone-hint">JPG, PNG — max 10MB each</p>
              </div>
              <button className="pm-btn pm-btn-secondary" style={{width:'100%',justifyContent:'center',marginTop:'0.75rem'}}>
                <Camera size={16}/>Capture with Camera
              </button>

              {/* Uploaded Photo Grid */}
              <div className="id-photo-grid">
                {[]}
              </div>
            </div>

            {/* Legend */}
            <div className="pm-card" style={{marginTop:'1rem'}}>
              <h3 className="pm-card-title" style={{marginBottom:'0.75rem'}}>Severity Legend</h3>
              <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
                {SEVERITIES.map(s=>(
                  <div key={s.label} style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
                    <div style={{width:14,height:14,borderRadius:'50%',background:s.color,flexShrink:0}}/>
                    <span style={{fontSize:'0.82rem',fontWeight:600,color:'#334155'}}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default InjuryDocumentation;
