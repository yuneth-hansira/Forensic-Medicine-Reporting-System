import React, { useState } from 'react';

import {
  User, Phone, Building2, FolderOpen, Upload,
  Camera, Users, Check, ChevronRight, ChevronLeft,
  AlertCircle, X, Image
} from 'lucide-react';
import '../patients/patients.css';
import './RegisterPatient.css';

const STEPS = [
  { num: 1, label: 'Personal Info',    desc: 'Basic details',     icon: <User size={16}/> },
  { num: 2, label: 'Contact Info',     desc: 'Address & phone',   icon: <Phone size={16}/> },
  { num: 3, label: 'Hospital Details', desc: 'Admission info',    icon: <Building2 size={16}/> },
  { num: 4, label: 'Case Details',     desc: 'Forensic info',     icon: <FolderOpen size={16}/> },
  { num: 5, label: 'Documents',        desc: 'Upload files',      icon: <Upload size={16}/> },
  { num: 6, label: 'Photo & Biometrics',desc:'Capture photo',    icon: <Camera size={16}/> },
  { num: 7, label: 'Emergency Contact',desc: 'Next of kin',       icon: <Users size={16}/> },
];

const RegisterPatient = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName:'', lastName:'', dob:'', gender:'', nic:'', nationality:'Sri Lankan',
    address:'', city:'', district:'', province:'', phone:'', email:'',
    admissionDate:'', wardNo:'', bedNo:'', referredBy:'', admissionType:'',
    caseNo:'', caseType:'', policeStation:'', officerName:'', officerBadge:'', crimeRef:'',
    assignedDoctor:'', priority:'normal',
    emergencyName:'', emergencyRelation:'', emergencyPhone:'', emergencyAddress:''
  });

  const set = (k, v) => setForm(f => ({...f, [k]: v}));
  const inp = (k) => ({ value: form[k], onChange: e => set(k, e.target.value), className:'pm-input' });
  const sel = (k) => ({ value: form[k], onChange: e => set(k, e.target.value), className:'pm-select' });

  const canNext = step < 7;
  const canBack = step > 1;

  return (
    <div className="pm-page">
        {/* Header */}
        <div className="pm-page-header">
          <div>
            <div className="pm-breadcrumb">
              <a href="/patients">Patient Management</a><span>/</span>
              <a href="/patients/list">Patients</a><span>/</span>
              <span>Register Patient</span>
            </div>
            <h1 className="pm-page-title">Register New Patient</h1>
            <p className="pm-page-subtitle">Step {step} of {STEPS.length} — {STEPS[step-1].label}</p>
          </div>
        </div>

        {/* Stepper */}
        <div className="rp-stepper">
          {STEPS.map((s, idx) => (
            <div key={s.num} className={`rp-step ${step === s.num ? 'active' : step > s.num ? 'completed' : ''}`}>
              <div className="rp-step-conn">
                <div className="rp-step-num">
                  {step > s.num ? <Check size={14}/> : s.num}
                </div>
                {idx < STEPS.length - 1 && <div className="rp-step-line"/>}
              </div>
              <div className="rp-step-info">
                <span className="rp-step-label">{s.label}</span>
                <span className="rp-step-desc">{s.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="pm-card rp-form-card">

          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div>
              <h3 className="pm-section-title">Personal Information</h3>
              <div className="pm-form-grid-3">
                <div className="pm-form-group">
                  <label className="pm-label required">First Name</label>
                  <input {...inp('firstName')} placeholder="Enter first name"/>
                </div>
                <div className="pm-form-group">
                  <label className="pm-label required">Last Name</label>
                  <input {...inp('lastName')} placeholder="Enter last name"/>
                </div>
                <div className="pm-form-group">
                  <label className="pm-label required">NIC Number</label>
                  <input {...inp('nic')} placeholder="e.g. 901234567V"/>
                </div>
              </div>
              <div className="pm-form-grid-3">
                <div className="pm-form-group">
                  <label className="pm-label required">Date of Birth</label>
                  <input type="date" {...inp('dob')}/>
                </div>
                <div className="pm-form-group">
                  <label className="pm-label required">Gender</label>
                  <select {...sel('gender')}>
                    <option value="">Select Gender</option>
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Nationality</label>
                  <input {...inp('nationality')} placeholder="Nationality"/>
                </div>
              </div>
              <div className="pm-form-grid-2">
                <div className="pm-form-group">
                  <label className="pm-label">Religion</label>
                  <select className="pm-select">
                    <option value="">Select Religion</option>
                    <option>Buddhist</option><option>Hindu</option>
                    <option>Muslim</option><option>Christian</option><option>Other</option>
                  </select>
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Civil Status</label>
                  <select className="pm-select">
                    <option value="">Select Status</option>
                    <option>Single</option><option>Married</option>
                    <option>Divorced</option><option>Widowed</option>
                  </select>
                </div>
              </div>
              <div className="pm-form-grid-2">
                <div className="pm-form-group">
                  <label className="pm-label">Occupation</label>
                  <input className="pm-input" placeholder="Enter occupation"/>
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Blood Group</label>
                  <select className="pm-select">
                    <option value="">Select Blood Group</option>
                    {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(b=><option key={b}>{b}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {step === 2 && (
            <div>
              <h3 className="pm-section-title">Contact Information</h3>
              <div className="pm-form-group">
                <label className="pm-label required">Street Address</label>
                <input {...inp('address')} placeholder="No. Street, Area"/>
              </div>
              <div className="pm-form-grid-3">
                <div className="pm-form-group">
                  <label className="pm-label required">City</label>
                  <input {...inp('city')} placeholder="City"/>
                </div>
                <div className="pm-form-group">
                  <label className="pm-label required">District</label>
                  <select {...sel('district')}>
                    <option value="">Select District</option>
                    {['Kandy','Colombo','Gampaha','Galle','Matara','Jaffna','Kurunegala','Ratnapura','Badulla','Trincomalee'].map(d=>(
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="pm-form-group">
                  <label className="pm-label required">Province</label>
                  <select {...sel('province')}>
                    <option value="">Select Province</option>
                    {['Central','Western','Southern','Northern','Eastern','North Western','Sabaragamuwa','Uva','North Central'].map(p=>(
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="pm-form-grid-2">
                <div className="pm-form-group">
                  <label className="pm-label required">Mobile Number</label>
                  <input {...inp('phone')} placeholder="+94 71 234 5678"/>
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Email Address</label>
                  <input type="email" {...inp('email')} placeholder="patient@email.com"/>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Hospital Details */}
          {step === 3 && (
            <div>
              <h3 className="pm-section-title">Hospital Admission Details</h3>
              <div className="pm-form-grid-3">
                <div className="pm-form-group">
                  <label className="pm-label required">Admission Date</label>
                  <input type="date" {...inp('admissionDate')}/>
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Ward Number</label>
                  <input {...inp('wardNo')} placeholder="e.g. Ward 3B"/>
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Bed Number</label>
                  <input {...inp('bedNo')} placeholder="e.g. Bed 12"/>
                </div>
              </div>
              <div className="pm-form-grid-2">
                <div className="pm-form-group">
                  <label className="pm-label">Admission Type</label>
                  <select {...sel('admissionType')}>
                    <option value="">Select Type</option>
                    <option>Emergency</option><option>Outpatient</option>
                    <option>Inpatient</option><option>Referral</option>
                  </select>
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Referred By</label>
                  <input {...inp('referredBy')} placeholder="Referring hospital or doctor"/>
                </div>
              </div>
              <div className="pm-form-grid-2">
                <div className="pm-form-group">
                  <label className="pm-label required">Assigned Doctor</label>
                  <select {...sel('assignedDoctor')}>
                    <option value="">Select Doctor</option>
                    <option>Dr. John Silva — JMO</option>
                    <option>Dr. Chandima Perera — JMO</option>
                    <option>Dr. N. Perera — Forensic Pathologist</option>
                  </select>
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Priority Level</label>
                  <select {...sel('priority')}>
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Forensic Case Details */}
          {step === 4 && (
            <div>
              <h3 className="pm-section-title">Forensic Case Details</h3>
              <div className="pm-form-grid-2">
                <div className="pm-form-group">
                  <label className="pm-label required">Case Number</label>
                  <input {...inp('caseNo')} placeholder="e.g. C2026-1046"/>
                </div>
                <div className="pm-form-group">
                  <label className="pm-label required">Case Type</label>
                  <select {...sel('caseType')}>
                    <option value="">Select Case Type</option>
                    <option>Medico-Legal</option><option>Postmortem</option>
                    <option>Injury Examination</option><option>Toxicology</option>
                    <option>Sexual Assault</option><option>Child Abuse</option>
                    <option>Road Traffic Accident</option><option>Occupational Injury</option>
                  </select>
                </div>
              </div>
              <div className="pm-form-grid-3">
                <div className="pm-form-group">
                  <label className="pm-label">Police Station</label>
                  <input {...inp('policeStation')} placeholder="Name of police station"/>
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Officer Name</label>
                  <input {...inp('officerName')} placeholder="Investigating officer"/>
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Badge / ID</label>
                  <input {...inp('officerBadge')} placeholder="Badge number"/>
                </div>
              </div>
              <div className="pm-form-group">
                <label className="pm-label">Crime Reference Number</label>
                <input {...inp('crimeRef')} placeholder="e.g. CR2026/KD/00123"/>
              </div>
              <div className="pm-form-group">
                <label className="pm-label">Incident Description</label>
                <textarea className="pm-textarea" rows={5} placeholder="Describe the incident, circumstances, and reason for forensic examination..."/>
              </div>
              <div className="pm-form-group">
                <label className="pm-label">Initial Clinical Notes</label>
                <textarea className="pm-textarea" rows={3} placeholder="Clinical observations at time of admission..."/>
              </div>
            </div>
          )}

          {/* Step 5: Documents */}
          {step === 5 && (
            <div>
              <h3 className="pm-section-title">Document Uploads</h3>
              <div className="rp-upload-grid">
                {[
                  { label: 'NIC / Passport Copy',        accept:'image/*,.pdf', hint:'JPG, PNG, or PDF — max 5MB' },
                  { label: 'Police Warrant / B Report',  accept:'.pdf,.doc,.docx', hint:'PDF or Word document — max 10MB' },
                  { label: 'Medical Records',            accept:'.pdf,.doc,.jpg', hint:'Any supporting medical documents' },
                  { label: 'X-Ray / Radiology Images',   accept:'image/*,.pdf', hint:'DICOM, JPG, PNG, or PDF' },
                ].map((doc, i) => (
                  <div key={i}>
                    <label className="pm-label">{doc.label}</label>
                    <div className="pm-upload-zone" style={{marginTop:'0.4rem'}}>
                      <Upload size={28} className="pm-upload-zone-icon"/>
                      <p className="pm-upload-zone-text">Drag & Drop or <span style={{color:'#2563eb'}}>Browse</span></p>
                      <p className="pm-upload-zone-hint">{doc.hint}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Photo & Biometrics */}
          {step === 6 && (
            <div>
              <h3 className="pm-section-title">Patient Photo & Biometrics</h3>
              <div className="rp-photo-grid">
                <div className="rp-photo-capture">
                  <div className="rp-camera-box">
                    <Camera size={48} color="#94a3b8"/>
                    <p style={{color:'#64748b',fontWeight:600,margin:'0.75rem 0 0.25rem'}}>Camera Preview</p>
                    <p style={{color:'#94a3b8',fontSize:'0.8rem',margin:0}}>Click to activate camera</p>
                  </div>
                  <div style={{display:'flex',gap:'0.75rem',justifyContent:'center',marginTop:'1rem'}}>
                    <button className="pm-btn pm-btn-primary"><Camera size={16}/>Capture Photo</button>
                    <button className="pm-btn pm-btn-secondary"><Upload size={16}/>Upload Photo</button>
                  </div>
                </div>
                <div className="rp-photo-side">
                  <div className="pm-upload-zone" style={{marginBottom:'1.25rem'}}>
                    <Image size={28} className="pm-upload-zone-icon"/>
                    <p className="pm-upload-zone-text">Upload Patient Photo</p>
                    <p className="pm-upload-zone-hint">JPG or PNG — min 200×200px — max 3MB</p>
                  </div>
                  <div className="rp-biometric-note">
                    <AlertCircle size={16} color="#f59e0b"/>
                    <span>Fingerprint capture requires biometric hardware connection. Ensure the device is plugged in before proceeding.</span>
                  </div>
                  <button className="pm-btn pm-btn-secondary" style={{width:'100%',justifyContent:'center',marginTop:'1rem'}}>
                    🔍 Capture Fingerprint
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 7: Emergency Contact */}
          {step === 7 && (
            <div>
              <h3 className="pm-section-title">Emergency Contact (Next of Kin)</h3>
              <div className="pm-form-grid-2">
                <div className="pm-form-group">
                  <label className="pm-label required">Contact Name</label>
                  <input {...inp('emergencyName')} placeholder="Full name"/>
                </div>
                <div className="pm-form-group">
                  <label className="pm-label required">Relationship</label>
                  <select {...sel('emergencyRelation')}>
                    <option value="">Select Relationship</option>
                    <option>Spouse</option><option>Parent</option><option>Child</option>
                    <option>Sibling</option><option>Guardian</option><option>Other</option>
                  </select>
                </div>
              </div>
              <div className="pm-form-grid-2">
                <div className="pm-form-group">
                  <label className="pm-label required">Phone Number</label>
                  <input {...inp('emergencyPhone')} placeholder="+94 71 234 5678"/>
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Email</label>
                  <input type="email" className="pm-input" placeholder="Emergency contact email"/>
                </div>
              </div>
              <div className="pm-form-group">
                <label className="pm-label">Address</label>
                <textarea {...{value:form.emergencyAddress,onChange:e=>set('emergencyAddress',e.target.value),className:'pm-textarea'}} rows={3} placeholder="Contact address..."/>
              </div>

              {/* Review Summary */}
              <div className="rp-review-box">
                <h4 style={{margin:'0 0 1rem',fontSize:'0.9rem',fontWeight:700,color:'#0f172a'}}>📋 Review Before Submission</h4>
                <div className="rp-review-grid">
                  <div className="pm-info-row"><span className="pm-info-label">Patient Name</span><span className="pm-info-value">{form.firstName} {form.lastName}</span></div>
                  <div className="pm-info-row"><span className="pm-info-label">NIC</span><span className="pm-info-value">{form.nic || '—'}</span></div>
                  <div className="pm-info-row"><span className="pm-info-label">Gender</span><span className="pm-info-value">{form.gender || '—'}</span></div>
                  <div className="pm-info-row"><span className="pm-info-label">Case Type</span><span className="pm-info-value">{form.caseType || '—'}</span></div>
                  <div className="pm-info-row"><span className="pm-info-label">Assigned Doctor</span><span className="pm-info-value">{form.assignedDoctor || '—'}</span></div>
                  <div className="pm-info-row"><span className="pm-info-label">Priority</span><span className="pm-info-value">{form.priority}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="rp-nav-buttons">
            <div>
              {canBack && (
                <button className="pm-btn pm-btn-secondary" onClick={()=>setStep(s=>s-1)}>
                  <ChevronLeft size={16}/>Previous
                </button>
              )}
            </div>
            <div style={{display:'flex',gap:'1rem',alignItems:'center'}}>
              <button className="pm-btn pm-btn-secondary">Save Draft</button>
              {canNext ? (
                <button className="pm-btn pm-btn-primary" onClick={()=>setStep(s=>s+1)}>
                  Next Step<ChevronRight size={16}/>
                </button>
              ) : (
                <button className="pm-btn pm-btn-success" style={{background:'#10b981',color:'white',boxShadow:'0 2px 8px rgba(16,185,129,0.3)'}}>
                  <Check size={16}/>Register Patient
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
};

export default RegisterPatient;
