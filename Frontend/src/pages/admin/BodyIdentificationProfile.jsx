import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  UserCheck, Edit3
} from 'lucide-react';
import { bodyIdService } from '../../services/bodyIdService';
import '../patients/patients.css';

const TABS = ['Overview'];

const BodyIdentificationProfile = () => {
  const { id } = useParams();
  const [tab, setTab] = useState('Overview');
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const data = await bodyIdService.getBodyIdentificationById(id);
        setRecord(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load identification record.");
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
              <Link to="/body-id">Body Identification</Link><span>/</span>
              <span>ID-{record.Identification_ID}</span>
            </div>
            <h1 className="pm-page-title">Identification Profile</h1>
          </div>
          <div className="pm-header-actions">
            <button className="pm-btn pm-btn-primary" onClick={() => window.location.href=`/body-id/${record.Identification_ID}/edit`}>
              <Edit3 size={16}/>Edit Record
            </button>
          </div>
        </div>

        {/* Profile Hero Card */}
        <div className="pp-hero-card pm-card" style={{borderLeft: '4px solid #14b8a6'}}>
          <div className="pp-hero-left">
            <div className="pp-avatar-ring" style={{borderColor: '#14b8a6'}}>
              <div className="pp-avatar" style={{backgroundColor: '#ccfbf1', color: '#14b8a6'}}><UserCheck size={28}/></div>
            </div>
            <div className="pp-hero-info">
              <div style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
                <h2 className="pp-name">Identification ID-{record.Identification_ID}</h2>
              </div>
              <p className="pp-sub">
                Method: {record.Method || 'Unspecified'}
              </p>
              <div className="pp-tags">
                <span className="pp-tag">Deceased ID: DEC-{record.Deceased_ID}</span>
                <span className="pp-tag">Identified By: {record.Identified_By || 'Unknown'}</span>
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
              <h3 className="pm-card-title"><UserCheck size={16} style={{marginRight:6,verticalAlign:'middle'}}/>Identification Details</h3>
            </div>
            <div style={{padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Identification ID</span>
                  <span className="pm-info-value" style={{fontWeight: 600}}>ID-{record.Identification_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Linked Deceased ID</span>
                  <span className="pm-info-value" style={{fontWeight: 600}}>DEC-{record.Deceased_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Method of Identification</span>
                  <span className="pm-info-value">{record.Method || '-'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Identified By</span>
                  <span className="pm-info-value">{record.Identified_By || '-'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Relationship to Deceased</span>
                  <span className="pm-info-value">{record.Relationship_To_Deceased || '-'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Identification Date</span>
                  <span className="pm-info-value">{record.Identification_Date ? new Date(record.Identification_Date).toLocaleDateString() : '-'}</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default BodyIdentificationProfile;
