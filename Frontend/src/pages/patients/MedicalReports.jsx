import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  FileText, Download, Printer, Eye, CheckCircle,
  Clock, AlertCircle, Plus, Search, Filter,
  Shield, PenLine, Share2, ChevronDown, Stamp
} from 'lucide-react';
import '../patients/patients.css';
import './MedicalReports.css';

const reports = [
  {
    id:'MLR-2026-0312', type:'Medico-Legal Report', patient:'Nimal Perera',
    caseNo:'C2026-1045', doctor:'Dr. John Silva',
    date:'20 Jul 2026', status:'approved', pages:8,
    desc:'General medico-legal examination report prepared for legal proceedings relating to alleged assault incident at Kandy.'
  },
  {
    id:'PMR-2026-0287', type:'Postmortem Report', patient:'Unknown Male',
    caseNo:'C2026-1038', doctor:'Dr. N. Perera',
    date:'18 Jul 2026', status:'pending_approval', pages:12,
    desc:'Full postmortem examination report including histopathology and toxicology findings. Cause of death: blunt force trauma.'
  },
  {
    id:'IER-2026-0298', type:'Injury Examination Report', patient:'Kasun Fernando',
    caseNo:'C2026-1044', doctor:'Dr. Chandima',
    date:'17 Jul 2026', status:'draft', pages:5,
    desc:'Injury assessment following road traffic accident on Kandy-Colombo highway. Multiple lacerations and fractures documented.'
  },
  {
    id:'CTR-2026-0267', type:'Court Report', patient:'Anjali De Silva',
    caseNo:'C2026-1043', doctor:'Dr. John Silva',
    date:'15 Jul 2026', status:'approved', pages:6,
    desc:'Expert witness court report submitted to the Kandy Magistrate Court case MC/KA/2026/01234.'
  },
  {
    id:'TXR-2026-0241', type:'Toxicology Report', patient:'Sahan Wijesinghe',
    caseNo:'C2026-1042', doctor:'Dr. N. Perera',
    date:'14 Jul 2026', status:'approved', pages:9,
    desc:'Comprehensive toxicology analysis including blood alcohol content, drug screening, and heavy metal profiling results.'
  },
];

const statusConfig = {
  approved:         { label:'Approved',          cls:'pm-badge-active',      icon:<CheckCircle size={12}/> },
  pending_approval: { label:'Pending Approval',  cls:'pm-badge-pending',     icon:<Clock size={12}/> },
  draft:            { label:'Draft',             cls:'pm-badge-closed',      icon:<PenLine size={12}/> },
};

const typeColor = {
  'Medico-Legal Report':     '#2563eb',
  'Postmortem Report':       '#8b5cf6',
  'Injury Examination Report':'#f59e0b',
  'Court Report':            '#10b981',
  'Toxicology Report':       '#ef4444',
};

const MedicalReports = () => {
  const [selected, setSelected] = useState(reports[0]);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = reports.filter(r => {
    const q = query.toLowerCase();
    const matchQ = !q || r.patient.toLowerCase().includes(q) || r.id.toLowerCase().includes(q) || r.type.toLowerCase().includes(q);
    const matchS = statusFilter === 'all' || r.status === statusFilter;
    return matchQ && matchS;
  });

  return (
    <DashboardLayout>
      <div className="pm-page">
        <div className="pm-page-header">
          <div>
            <div className="pm-breadcrumb">
              <a href="/patients">Patient Management</a><span>/</span><span>Medical Reports</span>
            </div>
            <h1 className="pm-page-title">Medical Reports</h1>
            <p className="pm-page-subtitle">{reports.length} total reports · {reports.filter(r=>r.status==='pending_approval').length} pending approval</p>
          </div>
          <div className="pm-header-actions">
            <button className="pm-btn pm-btn-secondary"><Download size={16}/>Export All</button>
            <button className="pm-btn pm-btn-primary"><Plus size={16}/>Generate Report</button>
          </div>
        </div>

        <div className="mr-layout">

          {/* Left Panel — Report List */}
          <div className="mr-list-panel">
            {/* Search */}
            <div className="pm-search-wrapper" style={{marginBottom:'0.75rem'}}>
              <Search size={16} color="#94a3b8"/>
              <input placeholder="Search reports..." value={query} onChange={e=>setQuery(e.target.value)}/>
            </div>

            {/* Filter Pills */}
            <div style={{display:'flex',gap:'0.4rem',marginBottom:'1rem',flexWrap:'wrap'}}>
              {['all','approved','pending_approval','draft'].map(s=>(
                <button
                  key={s}
                  className={`am-filter-tab ${statusFilter===s?'active':''}`}
                  onClick={()=>setStatusFilter(s)}
                  style={{fontSize:'0.72rem',padding:'0.3rem 0.7rem'}}
                >
                  {s==='all'?'All':statusConfig[s]?.label||s}
                </button>
              ))}
            </div>

            {/* Report Cards */}
            <div className="mr-report-list">
              {filtered.map(r=>(
                <div
                  key={r.id}
                  className={`mr-report-item ${selected.id===r.id?'selected':''}`}
                  onClick={()=>setSelected(r)}
                >
                  <div className="mr-report-type-bar" style={{background:typeColor[r.type]||'#64748b'}}/>
                  <div className="mr-report-item-content">
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'0.4rem'}}>
                      <span style={{fontWeight:700,fontSize:'0.82rem',color:'#0f172a',lineHeight:1.2}}>{r.type}</span>
                      <span className={`pm-badge ${statusConfig[r.status].cls}`} style={{fontSize:'0.68rem',flexShrink:0,marginLeft:'0.5rem'}}>
                        {statusConfig[r.status].label}
                      </span>
                    </div>
                    <p style={{margin:0,fontSize:'0.8rem',color:'#334155',fontWeight:600}}>{r.patient}</p>
                    <div style={{display:'flex',justifyContent:'space-between',marginTop:'0.4rem'}}>
                      <code style={{fontSize:'0.72rem',color:'#2563eb'}}>{r.id}</code>
                      <span style={{fontSize:'0.72rem',color:'#94a3b8'}}>{r.date}</span>
                    </div>
                  </div>
                </div>
              ))}
              {filtered.length===0 && (
                <div className="pm-empty-state" style={{padding:'2rem'}}>
                  <Search size={30}/>
                  <h4>No Reports Found</h4>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel — Report Preview */}
          {selected && (
            <div className="pm-card mr-preview-panel">
              {/* Header */}
              <div className="mr-preview-header">
                <div style={{display:'flex',alignItems:'flex-start',gap:'1rem',flex:1}}>
                  <div className="mr-preview-type-icon" style={{background:typeColor[selected.type]+'20',color:typeColor[selected.type]}}>
                    <FileText size={22}/>
                  </div>
                  <div>
                    <h2 style={{margin:0,fontSize:'1.15rem',fontWeight:700,color:'#0f172a'}}>{selected.type}</h2>
                    <p style={{margin:'0.25rem 0 0',fontSize:'0.85rem',color:'#64748b'}}>
                      {selected.patient} · Case: <code style={{color:'#2563eb'}}>{selected.caseNo}</code>
                    </p>
                  </div>
                </div>
                <div style={{display:'flex',gap:'0.6rem',flexShrink:0}}>
                  <button className="pm-btn pm-btn-secondary pm-btn-sm"><Printer size={14}/>Print</button>
                  <button className="pm-btn pm-btn-secondary pm-btn-sm"><Download size={14}/>PDF</button>
                  <button className="pm-btn pm-btn-secondary pm-btn-sm"><Share2 size={14}/>Share</button>
                  {selected.status==='pending_approval' && (
                    <button className="pm-btn pm-btn-primary pm-btn-sm"><CheckCircle size={14}/>Approve</button>
                  )}
                </div>
              </div>

              {/* Meta Info */}
              <div className="mr-meta-bar">
                <div className="mr-meta-item"><span>Report ID</span><strong>{selected.id}</strong></div>
                <div className="mr-meta-item"><span>Prepared By</span><strong>{selected.doctor}</strong></div>
                <div className="mr-meta-item"><span>Date</span><strong>{selected.date}</strong></div>
                <div className="mr-meta-item"><span>Pages</span><strong>{selected.pages} pages</strong></div>
                <div className="mr-meta-item">
                  <span>Status</span>
                  <span className={`pm-badge ${statusConfig[selected.status].cls}`} style={{fontSize:'0.72rem'}}>
                    {statusConfig[selected.status].icon} {statusConfig[selected.status].label}
                  </span>
                </div>
              </div>

              {/* PDF Viewer Simulation */}
              <div className="mr-pdf-preview">
                <div className="mr-pdf-page">
                  {/* Header */}
                  <div className="mr-pdf-header">
                    <div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
                      <Shield size={36} color="#2563eb"/>
                      <div>
                        <h3 style={{margin:0,fontSize:'1rem',fontWeight:700,color:'#0f172a'}}>FORENSIC MEDICAL MANAGEMENT SYSTEM</h3>
                        <p style={{margin:0,fontSize:'0.75rem',color:'#64748b'}}>Kandy Teaching Hospital — Forensic Medicine Department</p>
                      </div>
                    </div>
                    <div style={{textAlign:'right',fontSize:'0.72rem',color:'#64748b',lineHeight:1.6}}>
                      <div><strong>Report ID:</strong> {selected.id}</div>
                      <div><strong>Date:</strong> {selected.date}</div>
                      <div><strong>Page:</strong> 1 of {selected.pages}</div>
                    </div>
                  </div>

                  <div className="mr-pdf-divider"/>

                  <h2 style={{textAlign:'center',fontSize:'1.1rem',fontWeight:700,color:'#1e3a5f',margin:'1.25rem 0',textTransform:'uppercase',letterSpacing:'0.05em'}}>
                    {selected.type}
                  </h2>

                  {/* Report Info Table */}
                  <div className="mr-pdf-section">
                    <h4 className="mr-pdf-section-title">1. PATIENT & CASE INFORMATION</h4>
                    <div className="mr-pdf-table">
                      {[
                        ['Patient Name', selected.patient],
                        ['Case Number',  selected.caseNo],
                        ['Examining Doctor', selected.doctor],
                        ['Date of Examination', selected.date],
                        ['Report Reference', selected.id],
                      ].map(([l,v])=>(
                        <div key={l} className="mr-pdf-row">
                          <span className="mr-pdf-label">{l}:</span>
                          <span className="mr-pdf-value">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mr-pdf-section">
                    <h4 className="mr-pdf-section-title">2. EXAMINATION SUMMARY</h4>
                    <p style={{fontSize:'0.85rem',lineHeight:1.7,color:'#334155',margin:0}}>
                      {selected.desc} This report has been prepared in accordance with the requirements of the Magistrate Court and contains all relevant forensic findings documented during the examination period.
                    </p>
                  </div>

                  <div className="mr-pdf-section">
                    <h4 className="mr-pdf-section-title">3. CLINICAL FINDINGS</h4>
                    <div style={{background:'#f8fafc',borderRadius:'8px',padding:'1rem',fontSize:'0.82rem',color:'#475569',fontStyle:'italic',lineHeight:1.6}}>
                      [Full clinical findings, measurements, injury descriptions, and medical observations are documented in pages 2–{Math.floor(selected.pages/2)+1} of this report...]
                    </div>
                  </div>

                  {/* Signature */}
                  {selected.status === 'approved' && (
                    <div className="mr-pdf-signature">
                      <div className="mr-sig-line">
                        <div className="mr-sig-stamp">
                          <Stamp size={14}/> DIGITALLY SIGNED & APPROVED
                        </div>
                        <div>
                          <div style={{fontWeight:700,fontSize:'0.875rem',color:'#0f172a'}}>{selected.doctor}</div>
                          <div style={{fontSize:'0.75rem',color:'#64748b'}}>Judicial Medical Officer · {selected.date}</div>
                          <div style={{fontSize:'0.68rem',color:'#94a3b8',marginTop:'0.2rem'}}>Certificate No: FMMS/{selected.id}/SIGN</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selected.status === 'pending_approval' && (
                    <div className="mr-approval-banner">
                      <AlertCircle size={18} color="#d97706"/>
                      <span>This report is awaiting digital signature and approval from the assigned JMO before it can be submitted.</span>
                      <button className="pm-btn pm-btn-primary pm-btn-sm" style={{marginLeft:'auto'}}><CheckCircle size={14}/>Approve & Sign</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Approval Workflow */}
              <div className="mr-workflow">
                <h4 style={{margin:'0 0 1rem',fontSize:'0.85rem',fontWeight:700,color:'#0f172a'}}>Approval Workflow</h4>
                <div className="mr-workflow-steps">
                  {[
                    {step:'Created',  done:true,  user:'Clerk',             date:selected.date },
                    {step:'Reviewed', done:selected.status!=='draft', user:'Dr. Chandima', date:selected.status!=='draft'?selected.date:'Pending' },
                    {step:'Approved', done:selected.status==='approved', user:'Dr. John Silva', date:selected.status==='approved'?selected.date:'Pending' },
                    {step:'Submitted',done:selected.status==='approved', user:'System',       date:selected.status==='approved'?selected.date:'Pending' },
                  ].map((w,i)=>(
                    <div key={i} className="mr-wf-step">
                      <div className={`mr-wf-dot ${w.done?'done':''}`}>
                        {w.done ? <CheckCircle size={14}/> : <Clock size={14}/>}
                      </div>
                      <div>
                        <div style={{fontWeight:700,fontSize:'0.8rem',color:w.done?'#0f172a':'#94a3b8'}}>{w.step}</div>
                        <div style={{fontSize:'0.72rem',color:'#94a3b8'}}>{w.user} · {w.date}</div>
                      </div>
                      {i < 3 && <div className={`mr-wf-line ${w.done?'done':''}`}/>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MedicalReports;
