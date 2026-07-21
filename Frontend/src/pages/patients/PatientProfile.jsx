import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  User, Phone, MapPin, Calendar, FileText, Activity,
  Shield, Edit3, Printer, Download, Share2, QrCode,
  Clock, CheckCircle, AlertCircle, Stethoscope, FlaskConical,
  ChevronRight, MoreHorizontal, Eye, Plus, FolderOpen
} from 'lucide-react';
import '../patients/patients.css';
import './PatientProfile.css';

const TABS = ['Overview','Medical History','Examinations','Documents','Reports','Timeline'];

const PatientProfile = () => {
  const [tab, setTab] = useState('Overview');

  const patient = {
    id: 'PT-2026-1045',
    name: 'Nimal Perera',
    age: 34, gender: 'Male', nic: '890123456V',
    dob: '15 March 1992',
    blood: 'O+',
    phone: '+94 71 234 5678',
    email: 'nimal.perera@email.com',
    address: 'No. 25, Peradeniya Road, Kandy',
    caseType: 'Medico-Legal',
    caseNo: 'C2026-1045',
    status: 'active',
    doctor: 'Dr. John Silva',
    admissionDate: '20 July 2026',
    priority: 'Urgent',
    policeStation: 'Kandy Police Station',
    crimeRef: 'CR2026/KD/00123',
  };

  return (
    <DashboardLayout>
      <div className="pm-page">
        {/* Breadcrumb & Actions */}
        <div className="pm-page-header">
          <div>
            <div className="pm-breadcrumb">
              <a href="/patients">Patients</a><span>/</span>
              <a href="/patients/list">All Patients</a><span>/</span>
              <span>{patient.name}</span>
            </div>
            <h1 className="pm-page-title">Patient Profile</h1>
          </div>
          <div className="pm-header-actions">
            <button className="pm-btn pm-btn-secondary"><Printer size={16}/>Print</button>
            <button className="pm-btn pm-btn-secondary"><Share2 size={16}/>Share</button>
            <button className="pm-btn pm-btn-primary" onClick={()=>window.location.href='/patients/edit/PT-2026-1045'}>
              <Edit3 size={16}/>Edit Patient
            </button>
          </div>
        </div>

        {/* Profile Hero Card */}
        <div className="pp-hero-card pm-card">
          <div className="pp-hero-left">
            <div className="pp-avatar-ring">
              <div className="pp-avatar">NP</div>
              <div className="pp-avatar-status"/>
            </div>
            <div className="pp-hero-info">
              <div style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
                <h2 className="pp-name">{patient.name}</h2>
                <span className="pm-badge pm-badge-active">Active</span>
                <span className="pm-badge pm-badge-pending" style={{background:'#fef3c7',color:'#d97706'}}>Urgent</span>
              </div>
              <p className="pp-sub">{patient.age} yrs · {patient.gender} · {patient.blood} · NIC: <code>{patient.nic}</code></p>
              <div className="pp-tags">
                <span className="pp-tag"><FolderTag/>{patient.caseType}</span>
                <span className="pp-tag"><IDTag/>{patient.caseNo}</span>
                <span className="pp-tag"><DoctorTag/>{patient.doctor}</span>
              </div>
            </div>
          </div>
          <div className="pp-hero-right">
            <div className="pp-qr-box">
              <QrCode size={60} color="#2563eb"/>
              <p style={{fontSize:'0.7rem',color:'#64748b',margin:'0.5rem 0 0',textAlign:'center'}}>Scan Patient QR</p>
            </div>
            <div className="pp-quick-stats">
              <div className="pp-qs-item"><span className="pp-qs-num">4</span><span className="pp-qs-label">Examinations</span></div>
              <div className="pp-qs-item"><span className="pp-qs-num">3</span><span className="pp-qs-label">Reports</span></div>
              <div className="pp-qs-item"><span className="pp-qs-num">2</span><span className="pp-qs-label">Evidence Items</span></div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="pm-tabs" style={{background:'white',borderRadius:'12px',padding:'0.25rem 1rem',border:'1px solid #e2e8f0',marginBottom:'1.5rem',boxShadow:'0 1px 3px rgba(0,0,0,0.05)'}}>
          {TABS.map(t => (
            <button key={t} className={`pm-tab ${tab===t?'active':''}`} onClick={()=>setTab(t)}>{t}</button>
          ))}
        </div>

        {/* Tab Content */}
        {tab === 'Overview' && (
          <div className="pp-overview-grid">
            {/* Personal Details */}
            <div className="pm-card">
              <div className="pm-card-header">
                <h3 className="pm-card-title"><User size={16} style={{marginRight:6,verticalAlign:'middle'}}/>Personal Details</h3>
              </div>
              {[
                ['Full Name', patient.name],
                ['Date of Birth', patient.dob],
                ['Gender', patient.gender],
                ['NIC / Passport', patient.nic],
                ['Blood Group', patient.blood],
                ['Phone', patient.phone],
                ['Email', patient.email],
                ['Address', patient.address],
              ].map(([l,v]) => (
                <div key={l} className="pm-info-row">
                  <span className="pm-info-label">{l}</span>
                  <span className="pm-info-value">{v}</span>
                </div>
              ))}
            </div>

            {/* Case Details */}
            <div className="pm-card">
              <div className="pm-card-header">
                <h3 className="pm-card-title"><Shield size={16} style={{marginRight:6,verticalAlign:'middle'}}/>Case & Forensic Details</h3>
              </div>
              {[
                ['Case Number', patient.caseNo],
                ['Case Type', patient.caseType],
                ['Admission Date', patient.admissionDate],
                ['Priority', patient.priority],
                ['Assigned Doctor', patient.doctor],
                ['Police Station', patient.policeStation],
                ['Crime Reference', patient.crimeRef],
              ].map(([l,v]) => (
                <div key={l} className="pm-info-row">
                  <span className="pm-info-label">{l}</span>
                  <span className="pm-info-value">{v}</span>
                </div>
              ))}
            </div>

            {/* Recent Activity Timeline */}
            <div className="pm-card">
              <div className="pm-card-header">
                <h3 className="pm-card-title"><Clock size={16} style={{marginRight:6,verticalAlign:'middle'}}/>Recent Activity</h3>
                <button className="pm-btn pm-btn-secondary pm-btn-sm"><Eye size={13}/>View All</button>
              </div>
              <div className="pm-timeline">
                {[
                ].map((e,i) => (
                  <div key={i} className="pm-timeline-item">
                    <p className="pm-timeline-date">{e.date}</p>
                    <h4 className="pm-timeline-title">{e.title}</h4>
                    <p className="pm-timeline-desc">{e.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'Medical History' && (
          <div className="pm-card">
            <div className="pm-card-header">
              <h3 className="pm-card-title">Medical History</h3>
              <button className="pm-btn pm-btn-primary pm-btn-sm"><Plus size={14}/>Add Entry</button>
            </div>
            <div className="pp-history-list">
              {[
              ].map((h,i) => (
                <div key={i} className="pp-history-item">
                  <div className="pp-history-icon">
                    {h.status==='ongoing'?<AlertCircle size={18} color="#f59e0b"/>:<CheckCircle size={18} color="#10b981"/>}
                  </div>
                  <div className="pp-history-content">
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                      <h4 style={{margin:0,fontSize:'0.9rem',fontWeight:700,color:'#0f172a'}}>{h.condition}</h4>
                      <span className={`pm-badge ${h.status==='ongoing'?'pm-badge-warning':'pm-badge-completed'}`} style={{fontSize:'0.7rem'}}>
                        {h.status==='ongoing'?'Ongoing':'Resolved'}
                      </span>
                    </div>
                    <p style={{margin:'0.25rem 0',fontSize:'0.82rem',color:'#475569'}}>{h.treatment}</p>
                    <p style={{margin:0,fontSize:'0.75rem',color:'#94a3b8'}}>{h.doctor} · {h.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'Examinations' && (
          <div className="pm-card">
            <div className="pm-card-header">
              <h3 className="pm-card-title">Forensic Examinations</h3>
              <button className="pm-btn pm-btn-primary pm-btn-sm"><Plus size={14}/>Schedule Examination</button>
            </div>
            <table className="pm-table">
              <thead>
                <tr><th>Exam ID</th><th>Type</th><th>Doctor</th><th>Date & Time</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {[
                ].map((e,i) => (
                  <tr key={i}>
                    <td><code style={{color:'#2563eb',fontWeight:600,fontSize:'0.78rem'}}>{e.id}</code></td>
                    <td style={{fontWeight:600}}>{e.type}</td>
                    <td>{e.doctor}</td>
                    <td style={{color:'#64748b',fontSize:'0.85rem'}}>{e.date}</td>
                    <td><span className={`pm-badge ${e.status==='scheduled'?'pm-badge-pending':'pm-badge-completed'}`}>{e.status}</span></td>
                    <td><button className="pm-btn pm-btn-secondary pm-btn-sm"><Eye size={14}/>View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {(tab === 'Documents' || tab === 'Reports') && (
          <div className="pm-card">
            <div className="pm-card-header">
              <h3 className="pm-card-title">{tab}</h3>
              <button className="pm-btn pm-btn-primary pm-btn-sm"><Plus size={14}/>Add {tab==='Documents'?'Document':'Report'}</button>
            </div>
            <div className="pp-doc-grid">
              {[].map(i => (
                <div key={i} className="pp-doc-card">
                  <FileText size={28} color="#2563eb"/>
                  <div className="pp-doc-info">
                    <p className="pp-doc-name">{tab==='Documents'?`Document_${i}.pdf`:`Report_2026_00${i}.pdf`}</p>
                    <p className="pp-doc-meta">Uploaded 20 Jul 2026 · 1.{i}MB</p>
                  </div>
                  <div style={{display:'flex',gap:'0.5rem'}}>
                    <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem'}}><Eye size={13}/></button>
                    <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem'}}><Download size={13}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'Timeline' && (
          <div className="pm-card">
            <div className="pm-card-header">
              <h3 className="pm-card-title">Case Timeline</h3>
            </div>
            <div className="pm-timeline" style={{paddingLeft:'2rem'}}>
              {[
              ].map((e,i) => (
                <div key={i} className="pm-timeline-item">
                  <p className="pm-timeline-date">{e.date}</p>
                  <h4 className="pm-timeline-title">{e.title}</h4>
                  <p className="pm-timeline-desc">{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

// Inline tag helpers
const FolderTag = () => <FolderOpen size={12}/>;
const IDTag     = () => <Shield size={12}/>;
const DoctorTag = () => <Stethoscope size={12}/>;

export default PatientProfile;
