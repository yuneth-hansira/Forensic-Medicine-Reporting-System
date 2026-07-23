import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  Shield, Edit3, Briefcase, MapPin, User, FileText, Hash
} from 'lucide-react';
import { policeInfoService } from '../../services/policeInfoService';
import '../patients/patients.css';
import { authService } from '../../services/authService';
import { canCreate, canEdit, canDelete } from '../../utils/permissions';

const TABS = ['Overview'];

const PoliceInfoProfile = () => {
  const user = authService.getUser();
  const { id } = useParams();
  const [tab, setTab] = useState('Overview');
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const records = await policeInfoService.getAllPoliceInfo();
        const data = records.find(r => String(r.Police_ID) === String(id));
        if (!data) throw new Error("Record not found");
        setRecord(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load police record.");
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
              <Link to="/police-info">Police Information</Link><span>/</span>
              <span>POL-{record.Police_ID}</span>
            </div>
            <h1 className="pm-page-title">Police Information Profile</h1>
          </div>
          <div className="pm-header-actions">
            {canEdit(user) && (
              <button className="pm-btn pm-btn-primary" onClick={() => window.location.href=`/police-info/${record.Police_ID}/edit`}>
                            <Edit3 size={16}/>Edit Record
                          </button>
            )}
          </div>
        </div>

        {/* Profile Hero Card */}
        <div className="pp-hero-card pm-card" style={{borderLeft: '4px solid #3b82f6'}}>
          <div className="pp-hero-left">
            <div className="pp-avatar-ring" style={{borderColor: '#3b82f6'}}>
              <div className="pp-avatar" style={{backgroundColor: '#eff6ff', color: '#3b82f6'}}><Shield size={28}/></div>
            </div>
            <div className="pp-hero-info">
              <div style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
                <h2 className="pp-name" style={{fontSize:'1.25rem'}}>{record.Police_Station || 'Unknown Station'}</h2>
              </div>
              <p className="pp-sub">
                POL-{record.Police_ID} | Case Number: {record.Case_Number || `ID: ${record.Case_ID}`}
              </p>
              <div className="pp-tags">
                <span className="pp-tag" style={{backgroundColor: '#f1f5f9', color: '#475569'}}>
                  <User size={12} style={{marginRight:'0.25rem'}}/> {record.Investigating_Officer || 'N/A'}
                </span>
                <span className="pp-tag" style={{backgroundColor: '#e0e7ff', color: '#4f46e5'}}>
                  <Briefcase size={12} style={{marginRight:'0.25rem'}}/> {record.Officer_Rank || 'N/A'}
                </span>
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
              <h3 className="pm-card-title"><Briefcase size={16} style={{marginRight:6,verticalAlign:'middle'}}/>Police Details</h3>
            </div>
            <div style={{padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}><Hash size={12} style={{marginRight:'0.25rem'}}/>Record ID</span>
                  <span className="pm-info-value" style={{fontWeight: 600}}>POL-{record.Police_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}><FileText size={12} style={{marginRight:'0.25rem'}}/>Case ID (Database)</span>
                  <span className="pm-info-value">{record.Case_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}><MapPin size={12} style={{marginRight:'0.25rem'}}/>Police Station</span>
                  <span className="pm-info-value">{record.Police_Station || '-'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}><User size={12} style={{marginRight:'0.25rem'}}/>Investigating Officer</span>
                  <span className="pm-info-value">{record.Investigating_Officer || '-'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}><Shield size={12} style={{marginRight:'0.25rem'}}/>Officer Rank</span>
                  <span className="pm-info-value">{record.Officer_Rank || '-'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}><Hash size={12} style={{marginRight:'0.25rem'}}/>Officer Reg No</span>
                  <span className="pm-info-value">{record.Officer_Reg_No || '-'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default PoliceInfoProfile;
