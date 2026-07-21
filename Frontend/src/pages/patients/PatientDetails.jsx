import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  User, Activity, FlaskConical, FileText, Image,
  Clipboard, Clock, Stethoscope, Plus, Eye, Edit3,
  Download, AlertCircle, CheckCircle, XCircle
} from 'lucide-react';
import '../patients/patients.css';
import './PatientDetails.css';

const TABS = [
  { id:'overview',     label:'Overview',              icon:<User size={15}/> },
  { id:'history',      label:'Medical History',        icon:<Clipboard size={15}/> },
  { id:'examination',  label:'Forensic Examination',   icon:<Stethoscope size={15}/> },
  { id:'injuries',     label:'Injuries',               icon:<Activity size={15}/> },
  { id:'laboratory',   label:'Laboratory',             icon:<FlaskConical size={15}/> },
  { id:'radiology',    label:'Radiology',              icon:<Image size={15}/> },
  { id:'documents',    label:'Documents',              icon:<FileText size={15}/> },
  { id:'reports',      label:'Reports',                icon:<FileText size={15}/> },
  { id:'timeline',     label:'Timeline',               icon:<Clock size={15}/> },
];

const patient = {
  id:'PT-2026-1045', name:'Nimal Perera', age:34, gender:'Male', nic:'890123456V',
  dob:'15 March 1992', blood:'O+', phone:'+94 71 234 5678',
  address:'No. 25, Peradeniya Road, Kandy',
  caseNo:'C2026-1045', caseType:'Medico-Legal',
  doctor:'Dr. John Silva', admissionDate:'20 July 2026', status:'active',
  policeStation:'Kandy PS', crimeRef:'CR2026/KD/00123',
};

const PatientDetails = () => {
  const [tab, setTab] = useState('overview');

  return (
    <DashboardLayout>
      <div className="pm-page">
        {/* Header */}
        <div className="pdt-patient-banner pm-card">
          <div style={{display:'flex',alignItems:'center',gap:'1.25rem',flex:1}}>
            <div className="pdt-avatar">NP</div>
            <div>
              <div style={{display:'flex',alignItems:'center',gap:'0.75rem',flexWrap:'wrap'}}>
                <h2 style={{margin:0,fontSize:'1.25rem',fontWeight:700,color:'#0f172a'}}>{patient.name}</h2>
                <span className="pm-badge pm-badge-active">Active</span>
                <span className="pm-badge pm-badge-pending">Urgent</span>
              </div>
              <p style={{margin:'0.25rem 0 0',fontSize:'0.85rem',color:'#64748b'}}>
                {patient.age} yrs · {patient.gender} · {patient.blood} · {patient.nic}
              </p>
            </div>
          </div>
          <div style={{display:'flex',gap:'1rem',flexShrink:0}}>
            {[
              ['Case', patient.caseNo],
              ['Type', patient.caseType],
              ['Doctor', patient.doctor],
              ['Admitted', patient.admissionDate],
            ].map(([l,v])=>(
              <div key={l} style={{textAlign:'center',padding:'0 1rem',borderRight:'1px solid #e2e8f0'}}>
                <div style={{fontSize:'0.7rem',color:'#94a3b8',fontWeight:600,textTransform:'uppercase'}}>{l}</div>
                <div style={{fontSize:'0.82rem',fontWeight:700,color:'#0f172a',marginTop:'0.2rem'}}>{v}</div>
              </div>
            ))}
            <div style={{display:'flex',gap:'0.5rem',alignItems:'center'}}>
              <button className="pm-btn pm-btn-secondary pm-btn-sm"><Edit3 size={13}/>Edit</button>
              <button className="pm-btn pm-btn-primary pm-btn-sm"><FileText size={13}/>Report</button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="pdt-tabs-bar">
          {TABS.map(t=>(
            <button key={t.id} className={`pdt-tab-btn ${tab===t.id?'active':''}`} onClick={()=>setTab(t.id)}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {tab === 'overview' && (
          <div className="pdt-grid-3">
            <div className="pm-card">
              <h3 className="pm-card-title">Personal Information</h3>
              {[['Full Name',patient.name],['Date of Birth',patient.dob],['Gender',patient.gender],['NIC',patient.nic],['Blood Group',patient.blood],['Phone',patient.phone],['Address',patient.address]].map(([l,v])=>(
                <div key={l} className="pm-info-row"><span className="pm-info-label">{l}</span><span className="pm-info-value">{v}</span></div>
              ))}
            </div>
            <div className="pm-card">
              <h3 className="pm-card-title">Case Information</h3>
              {[['Case No.',patient.caseNo],['Case Type',patient.caseType],['Admission Date',patient.admissionDate],['Assigned Doctor',patient.doctor],['Police Station',patient.policeStation],['Crime Reference',patient.crimeRef]].map(([l,v])=>(
                <div key={l} className="pm-info-row"><span className="pm-info-label">{l}</span><span className="pm-info-value">{v}</span></div>
              ))}
            </div>
            <div className="pm-card">
              <h3 className="pm-card-title">Case Summary</h3>
              <div className="pdt-summary-stats">
                {[
                  {label:'Examinations', count:4, color:'#2563eb'},
                  {label:'Evidence Items', count:3, color:'#8b5cf6'},
                  {label:'Reports',        count:2, color:'#10b981'},
                  {label:'Pending Tasks',  count:1, color:'#f59e0b'},
                ].map(s=>(
                  <div key={s.label} className="pdt-summary-stat" style={{borderLeftColor:s.color}}>
                    <span style={{fontSize:'1.5rem',fontWeight:700,color:s.color}}>{s.count}</span>
                    <span style={{fontSize:'0.78rem',color:'#64748b'}}>{s.label}</span>
                  </div>
                ))}
              </div>
              <div style={{marginTop:'1rem'}}>
                <div className="pm-info-row"><span className="pm-info-label">Next Appointment</span><span className="pm-info-value" style={{color:'#2563eb',fontWeight:600}}>21 Jul 2026, 10:00 AM</span></div>
                <div className="pm-info-row"><span className="pm-info-label">Last Examination</span><span className="pm-info-value">18 Jul 2026</span></div>
                <div className="pm-info-row"><span className="pm-info-label">Case Progress</span>
                  <div style={{flex:1}}>
                    <div style={{height:6,background:'#f1f5f9',borderRadius:3,overflow:'hidden',marginTop:2}}>
                      <div style={{height:'100%',width:'65%',background:'#2563eb',borderRadius:3}}/>
                    </div>
                    <span style={{fontSize:'0.72rem',color:'#64748b'}}>65% Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Examination Tab */}
        {tab === 'examination' && (
          <div className="pm-card">
            <div className="pm-card-header">
              <h3 className="pm-card-title">Forensic Examinations</h3>
              <button className="pm-btn pm-btn-primary pm-btn-sm"><Plus size={14}/>Schedule</button>
            </div>
            <table className="pm-table">
              <thead><tr><th>Exam ID</th><th>Type</th><th>Doctor</th><th>Date & Time</th><th>Findings</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {[
                  {id:'EX-0312',type:'General Medico-Legal', doctor:'Dr. John Silva',  date:'21 Jul, 10:00 AM', findings:'Scheduled',         status:'scheduled'},
                  {id:'EX-0298',type:'Injury Assessment',    doctor:'Dr. Chandima',    date:'18 Jul, 02:00 PM', findings:'Multiple lacerations',status:'completed'},
                  {id:'EX-0281',type:'Psychiatric Eval.',    doctor:'Dr. N. Perera',   date:'15 Jul, 11:30 AM', findings:'Mild PTSD symptoms', status:'completed'},
                ].map((e,i)=>(
                  <tr key={i}>
                    <td><code style={{color:'#2563eb',fontWeight:600,fontSize:'0.78rem'}}>{e.id}</code></td>
                    <td style={{fontWeight:600}}>{e.type}</td>
                    <td>{e.doctor}</td>
                    <td style={{color:'#64748b',fontSize:'0.82rem'}}>{e.date}</td>
                    <td style={{fontSize:'0.82rem',color:'#475569',maxWidth:160,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{e.findings}</td>
                    <td><span className={`pm-badge ${e.status==='completed'?'pm-badge-completed':'pm-badge-pending'}`}>{e.status}</span></td>
                    <td><button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem'}}><Eye size={13}/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Laboratory Tab */}
        {tab === 'laboratory' && (
          <div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.5rem',marginBottom:'1.5rem'}}>
              {[
                {name:'Blood Alcohol Content', value:'0.12%',  ref:'<0.05%', status:'high',   icon:<AlertCircle size={18} color="#ef4444"/>},
                {name:'Hemoglobin',             value:'13.2 g/dL',ref:'13-17', status:'normal', icon:<CheckCircle size={18} color="#10b981"/>},
                {name:'White Blood Cells',      value:'11,200/μL',ref:'4,500–11,000',status:'high',icon:<AlertCircle size={18} color="#f59e0b"/>},
                {name:'Platelets',              value:'245,000/μL',ref:'150,000–400,000',status:'normal',icon:<CheckCircle size={18} color="#10b981"/>},
              ].map((r,i)=>(
                <div key={i} className="pm-card" style={{display:'flex',alignItems:'center',gap:'1rem',padding:'1.25rem'}}>
                  {r.icon}
                  <div style={{flex:1}}>
                    <p style={{margin:0,fontWeight:600,fontSize:'0.875rem',color:'#0f172a'}}>{r.name}</p>
                    <div style={{display:'flex',justifyContent:'space-between',marginTop:'0.25rem'}}>
                      <span style={{fontSize:'1.2rem',fontWeight:700,color:r.status==='high'?'#ef4444':'#10b981'}}>{r.value}</span>
                      <span style={{fontSize:'0.75rem',color:'#94a3b8'}}>Ref: {r.ref}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pm-card">
              <div className="pm-card-header"><h3 className="pm-card-title">Lab Test Results</h3><button className="pm-btn pm-btn-primary pm-btn-sm"><Plus size={14}/>Add Test</button></div>
              <table className="pm-table">
                <thead><tr><th>Test Name</th><th>Result</th><th>Reference Range</th><th>Status</th><th>Date</th></tr></thead>
                <tbody>
                  {[
                    {test:'Complete Blood Count',  result:'See above',       ref:'—',              status:'completed', date:'20 Jul 2026'},
                    {test:'Toxicology Screen',      result:'Alcohol positive',ref:'Negative',       status:'completed', date:'20 Jul 2026'},
                    {test:'Liver Function Tests',   result:'Pending',         ref:'—',              status:'pending',   date:'21 Jul 2026'},
                    {test:'DNA Analysis',           result:'In Progress',     ref:'—',              status:'in-progress',date:'20 Jul 2026'},
                  ].map((r,i)=>(
                    <tr key={i}>
                      <td style={{fontWeight:600}}>{r.test}</td>
                      <td>{r.result}</td>
                      <td style={{color:'#94a3b8'}}>{r.ref}</td>
                      <td><span className={`pm-badge ${r.status==='completed'?'pm-badge-completed':r.status==='pending'?'pm-badge-pending':'pm-badge-in-progress'}`}>{r.status}</span></td>
                      <td style={{color:'#94a3b8',fontSize:'0.82rem'}}>{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Timeline Tab */}
        {tab === 'timeline' && (
          <div className="pm-card">
            <h3 className="pm-card-title">Full Case Timeline</h3>
            <div className="pm-timeline" style={{paddingLeft:'2rem',marginTop:'1rem'}}>
              {[
                {date:'20 Jul 2026, 10:15 AM', title:'Patient Registered',         desc:'Registered by Clerk — Kandy Teaching Hospital'},
                {date:'20 Jul 2026, 11:00 AM', title:'Case Assigned to Doctor',    desc:'Case C2026-1045 assigned to Dr. John Silva by Administrator'},
                {date:'20 Jul 2026, 12:00 PM', title:'Police Request Linked',       desc:'Request PR2026-089 from Kandy PS linked to case'},
                {date:'20 Jul 2026, 02:30 PM', title:'Examination Scheduled',      desc:'General Medico-Legal exam at 10:00 AM 21 Jul 2026'},
                {date:'20 Jul 2026, 03:45 PM', title:'Evidence Collected',         desc:'Blood sample EV2026-0152 collected and logged'},
                {date:'18 Jul 2026, 02:00 PM', title:'Injury Assessment Completed',desc:'Findings documented — multiple lacerations and contusions'},
                {date:'15 Jul 2026, 11:30 AM', title:'Psychiatric Evaluation',     desc:'Mild PTSD symptoms identified — follow-up recommended'},
              ].map((e,i)=>(
                <div key={i} className="pm-timeline-item">
                  <p className="pm-timeline-date">{e.date}</p>
                  <h4 className="pm-timeline-title">{e.title}</h4>
                  <p className="pm-timeline-desc">{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fallback for other tabs */}
        {!['overview','examination','laboratory','timeline'].includes(tab) && (
          <div className="pm-card pm-empty-state">
            <FileText size={36}/>
            <h4>{TABS.find(t=>t.id===tab)?.label}</h4>
            <p>This section is available and will display relevant content for this patient.</p>
            <button className="pm-btn pm-btn-primary" style={{marginTop:'1rem'}}><Plus size={14}/>Add Entry</button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PatientDetails;
