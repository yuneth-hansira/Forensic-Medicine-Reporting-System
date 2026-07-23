import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  User, Shield, Edit3, FolderOpen, Stethoscope
} from 'lucide-react';
import { patientService } from '../../services/patientService';
import '../patients/patients.css';
import './PatientProfile.css';
import { authService } from '../../services/authService';
import { canCreate, canEdit, canDelete } from '../../utils/permissions';

const TABS = ['Overview'];

const PatientProfile = () => {
  const user = authService.getUser();
  const { id } = useParams();
  const [tab, setTab] = useState('Overview');
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const data = await patientService.getPatientById(id);
        setPatient(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load patient details.");
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  if (loading) return <DashboardLayout><div className="pm-page"><p style={{padding:'2rem',textAlign:'center'}}>Loading patient...</p></div></DashboardLayout>;
  if (error || !patient) return <DashboardLayout><div className="pm-page"><p style={{padding:'2rem',textAlign:'center',color:'red'}}>{error || "Patient not found."}</p></div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="pm-page">
        {/* Breadcrumb & Actions */}
        <div className="pm-page-header">
          <div>
            <div className="pm-breadcrumb">
              <a href="/patients">Patients</a><span>/</span>
              <a href="/patients/list">All Patients</a><span>/</span>
              <span>{patient.Full_Name}</span>
            </div>
            <h1 className="pm-page-title">Patient Profile</h1>
          </div>
          <div className="pm-header-actions">
            {canEdit(user) && (
              <button className="pm-btn pm-btn-primary" onClick={() => window.location.href=`/patients/${patient.Patient_ID}/edit`}>
                            <Edit3 size={16}/>Edit Patient
                          </button>
            )}
          </div>
        </div>

        {/* Profile Hero Card */}
        <div className="pp-hero-card pm-card">
          <div className="pp-hero-left">
            <div className="pp-avatar-ring">
              <div className="pp-avatar">{patient.Full_Name?.charAt(0) || 'U'}</div>
              <div className="pp-avatar-status"/>
            </div>
            <div className="pp-hero-info">
              <div style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
                <h2 className="pp-name">{patient.Full_Name}</h2>
                <span className="pm-badge pm-badge-active">Active</span>
              </div>
              <p className="pp-sub">
                {patient.Date_Of_Birth ? new Date(patient.Date_Of_Birth).toLocaleDateString() : 'Unknown DOB'} · {patient.Sex || 'Unknown Gender'} · {patient.Blood_Group || 'Unknown Blood'} · NIC: <code>{patient.NIC_Passport || '-'}</code>
              </p>
              <div className="pp-tags">
                <span className="pp-tag"><FolderTag/>Clinical Case</span>
                <span className="pp-tag"><IDTag/>PT-{patient.Patient_ID}</span>
                <span className="pp-tag"><DoctorTag/>Unassigned</span>
              </div>
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
                ['Patient ID', `PT-${patient.Patient_ID}`],
                ['Full Name', patient.Full_Name || '-'],
                ['Date of Birth', patient.Date_Of_Birth ? new Date(patient.Date_Of_Birth).toLocaleDateString() : '-'],
                ['Gender', patient.Sex || '-'],
                ['NIC / Passport', patient.NIC_Passport || '-'],
                ['Blood Group', patient.Blood_Group || '-'],
                ['Contact No', patient.Contact_No || '-'],
                ['Address', patient.Address || '-'],
                ['Hospital ID', patient.Hospital_ID || '-'],
                ['Ward ID', patient.Ward_ID || '-'],
              ].map(([l,v]) => (
                <div key={l} className="pm-info-row">
                  <span className="pm-info-label">{l}</span>
                  <span className="pm-info-value">{v}</span>
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
