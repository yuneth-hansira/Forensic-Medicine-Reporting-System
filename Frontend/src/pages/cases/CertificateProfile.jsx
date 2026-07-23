import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  FileBadge, Edit3
} from 'lucide-react';
import { certificateService } from '../../services/certificateService';
import '../patients/patients.css';
import { authService } from '../../services/authService';
import { canCreate, canEdit, canDelete } from '../../utils/permissions';

const TABS = ['Overview', 'Details'];

const CertificateProfile = () => {
  const user = authService.getUser();
  const { id } = useParams();
  const [tab, setTab] = useState('Overview');
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const data = await certificateService.getCertificateById(id);
        setRecord(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load certificate record.");
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
              <Link to="/certificates">Certificates</Link><span>/</span>
              <span>REC-{record.Receipt_ID}</span>
            </div>
            <h1 className="pm-page-title">Certificate Profile</h1>
          </div>
          <div className="pm-header-actions">
            {canEdit(user) && (
              <button className="pm-btn pm-btn-primary" onClick={() => window.location.href=`/certificates/${record.Receipt_ID}/edit`}>
                            <Edit3 size={16}/>Edit Certificate
                          </button>
            )}
          </div>
        </div>

        {/* Profile Hero Card */}
        <div className="pp-hero-card pm-card" style={{borderLeft: '4px solid #f59e0b'}}>
          <div className="pp-hero-left">
            <div className="pp-avatar-ring" style={{borderColor: '#f59e0b'}}>
              <div className="pp-avatar" style={{backgroundColor: '#fef3c7', color: '#f59e0b'}}><FileBadge size={28}/></div>
            </div>
            <div className="pp-hero-info">
              <div style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
                <h2 className="pp-name">Certificate REC-{record.Receipt_ID}</h2>
              </div>
              <p className="pp-sub">
                Court Ref: {record.Court_Reference || 'None'}
              </p>
              <div className="pp-tags">
                <span className="pp-tag">Report ID: RPT-{record.Report_ID}</span>
                <span className="pp-tag">Case ID: C-{record.Case_ID}</span>
                <span className="pp-tag">Doctor ID: {record.Doctor_ID ? `DOC-${record.Doctor_ID}` : 'N/A'}</span>
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
              <h3 className="pm-card-title"><FileBadge size={16} style={{marginRight:6,verticalAlign:'middle'}}/>Certificate Identity</h3>
            </div>
            <div style={{padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Receipt ID</span>
                  <span className="pm-info-value" style={{fontWeight: 600}}>REC-{record.Receipt_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Linked Report ID</span>
                  <span className="pm-info-value" style={{fontWeight: 600}}>RPT-{record.Report_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Linked Case ID</span>
                  <span className="pm-info-value" style={{fontWeight: 600}}>C-{record.Case_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Linked Doctor ID</span>
                  <span className="pm-info-value" style={{fontWeight: 600}}>{record.Doctor_ID ? `DOC-${record.Doctor_ID}` : '-'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Court Reference</span>
                  <span className="pm-info-value">{record.Court_Reference || '-'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Report Date</span>
                  <span className="pm-info-value">{record.Report_Date ? new Date(record.Report_Date).toLocaleDateString() : '-'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'Details' && (
          <div className="pm-card">
            <div className="pm-card-header">
              <h3 className="pm-card-title">Comprehensive Details</h3>
            </div>
            <div style={{padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              
              <div>
                <h4 style={{fontSize: '0.875rem', fontWeight: 600, color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase'}}>Findings</h4>
                <div style={{background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', whiteSpace: 'pre-wrap'}}>
                  {record.Findings || 'No findings recorded.'}
                </div>
              </div>

              <div>
                <h4 style={{fontSize: '0.875rem', fontWeight: 600, color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase'}}>Injury Description</h4>
                <div style={{background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', whiteSpace: 'pre-wrap'}}>
                  {record.Injury_Description || 'No injury description provided.'}
                </div>
              </div>

              <div>
                <h4 style={{fontSize: '0.875rem', fontWeight: 600, color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase'}}>Conclusion</h4>
                <div style={{background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', whiteSpace: 'pre-wrap'}}>
                  {record.Conclusion || 'No conclusion recorded.'}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default CertificateProfile;
