import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  Stethoscope, Edit3, Briefcase
} from 'lucide-react';
import { doctorService } from '../../services/doctorService';
import '../patients/patients.css';

const TABS = ['Overview'];

const DoctorProfile = () => {
  const { id } = useParams();
  const [tab, setTab] = useState('Overview');
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const data = await doctorService.getDoctorById(id);
        setRecord(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load doctor record.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecord();
  }, [id]);

  if (loading) return <DashboardLayout><div className="pm-page"><p style={{padding:'2rem',textAlign:'center'}}>Loading record...</p></div></DashboardLayout>;
  if (error || !record) return <DashboardLayout><div className="pm-page"><p style={{padding:'2rem',textAlign:'center',color:'red'}}>{error || "Record not found."}</p></div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="pm-page">
        {/* Breadcrumb & Actions */}
        <div className="pm-page-header">
          <div>
            <div className="pm-breadcrumb">
              <Link to="/doctors">Doctors</Link><span>/</span>
              <span>DR-{record.Doctor_ID}</span>
            </div>
            <h1 className="pm-page-title">Doctor Profile</h1>
          </div>
          <div className="pm-header-actions">
            <button className="pm-btn pm-btn-primary" onClick={() => window.location.href=`/doctors/${record.Doctor_ID}/edit`}>
              <Edit3 size={16}/>Edit Profile
            </button>
          </div>
        </div>

        {/* Profile Hero Card */}
        <div className="pp-hero-card pm-card" style={{borderLeft: '4px solid #8b5cf6'}}>
          <div className="pp-hero-left">
            <div className="pp-avatar-ring" style={{borderColor: '#8b5cf6'}}>
              <div className="pp-avatar" style={{backgroundColor: '#ede9fe', color: '#8b5cf6'}}><Stethoscope size={28}/></div>
            </div>
            <div className="pp-hero-info">
              <div style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
                <h2 className="pp-name">{record.Name}</h2>
              </div>
              <p className="pp-sub">
                DR-{record.Doctor_ID} | {record.Designation || 'Medical Officer'}
              </p>
              <div className="pp-tags">
                <span className="pp-tag" style={{backgroundColor: record.Username ? '#d1fae5' : '#f1f5f9', color: record.Username ? '#059669' : '#64748b'}}>
                  Account: {record.Username ? `@${record.Username}` : 'None'}
                </span>
                <span className="pp-tag">Contact: {record.Contact_No || 'N/A'}</span>
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
          <div className="pm-card">
            <div className="pm-card-header">
              <h3 className="pm-card-title"><Briefcase size={16} style={{marginRight:6,verticalAlign:'middle'}}/>Professional Details</h3>
            </div>
            <div style={{padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Doctor ID</span>
                  <span className="pm-info-value" style={{fontWeight: 600}}>DR-{record.Doctor_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Full Name</span>
                  <span className="pm-info-value">{record.Name || '-'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Designation</span>
                  <span className="pm-info-value">{record.Designation || '-'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>SLMC Registration No</span>
                  <span className="pm-info-value">{record.SLMC_Reg_No || '-'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Contact Number</span>
                  <span className="pm-info-value">{record.Contact_No || '-'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Linked System User ID</span>
                  <span className="pm-info-value">{record.User_ID ? `USR-${record.User_ID}` : 'Not linked'}</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default DoctorProfile;
