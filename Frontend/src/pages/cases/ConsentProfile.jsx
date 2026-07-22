import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  FileSignature, Edit3
} from 'lucide-react';
import { consentService } from '../../services/consentService';
import '../patients/patients.css';

const TABS = ['Overview'];

const ConsentProfile = () => {
  const { id } = useParams();
  const [tab, setTab] = useState('Overview');
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const data = await consentService.getConsentById(id);
        setRecord(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load consent record.");
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
              <Link to="/consents">Consents</Link><span>/</span>
              <span>CON-{record.Consent_ID}</span>
            </div>
            <h1 className="pm-page-title">Consent Profile</h1>
          </div>
          <div className="pm-header-actions">
            <button className="pm-btn pm-btn-primary" onClick={() => window.location.href=`/consents/${record.Consent_ID}/edit`}>
              <Edit3 size={16}/>Edit Consent
            </button>
          </div>
        </div>

        {/* Profile Hero Card */}
        <div className="pp-hero-card pm-card" style={{borderLeft: '4px solid #10b981'}}>
          <div className="pp-hero-left">
            <div className="pp-avatar-ring" style={{borderColor: '#10b981'}}>
              <div className="pp-avatar" style={{backgroundColor: '#d1fae5', color: '#10b981'}}><FileSignature size={28}/></div>
            </div>
            <div className="pp-hero-info">
              <div style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
                <h2 className="pp-name">Consent CON-{record.Consent_ID}</h2>
              </div>
              <p className="pp-sub">
                Type: {record.Consent_Type || 'Unspecified'}
              </p>
              <div className="pp-tags">
                <span className="pp-tag">Examinee ID: EX-{record.Examinee_ID}</span>
                <span className="pp-tag">Date: {record.Consent_Date ? new Date(record.Consent_Date).toLocaleDateString() : 'Unknown'}</span>
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
              <h3 className="pm-card-title"><FileSignature size={16} style={{marginRight:6,verticalAlign:'middle'}}/>Consent Details</h3>
            </div>
            <div style={{padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Consent ID</span>
                  <span className="pm-info-value" style={{fontWeight: 600}}>CON-{record.Consent_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Linked Examinee ID</span>
                  <span className="pm-info-value" style={{fontWeight: 600}}>EX-{record.Examinee_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Consent Type</span>
                  <span className="pm-info-value">{record.Consent_Type || '-'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Consent Date</span>
                  <span className="pm-info-value">{record.Consent_Date ? new Date(record.Consent_Date).toLocaleDateString() : '-'}</span>
                </div>
              </div>

              <div>
                <h4 style={{fontSize: '0.875rem', fontWeight: 600, color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase'}}>Signature / Reference</h4>
                <div style={{background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0'}}>
                  {record.Signature || 'No signature or reference provided.'}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default ConsentProfile;
