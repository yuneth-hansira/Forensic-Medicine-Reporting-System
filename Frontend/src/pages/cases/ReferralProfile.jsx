import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  Share2, Edit3, Briefcase, FileText
} from 'lucide-react';
import { referralService } from '../../services/referralService';
import '../patients/patients.css';

const TABS = ['Overview'];

const ReferralProfile = () => {
  const { id } = useParams();
  const [tab, setTab] = useState('Overview');
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const data = await referralService.getReferralById(id);
        setRecord(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load referral record.");
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
              <Link to="/referrals">Referrals</Link><span>/</span>
              <span>REF-{record.Referral_ID}</span>
            </div>
            <h1 className="pm-page-title">Referral Profile</h1>
          </div>
          <div className="pm-header-actions">
            <button className="pm-btn pm-btn-primary" onClick={() => window.location.href=`/referrals/${record.Referral_ID}/edit`}>
              <Edit3 size={16}/>Edit Referral
            </button>
          </div>
        </div>

        {/* Profile Hero Card */}
        <div className="pp-hero-card pm-card" style={{borderLeft: '4px solid #f59e0b'}}>
          <div className="pp-hero-left">
            <div className="pp-avatar-ring" style={{borderColor: '#f59e0b'}}>
              <div className="pp-avatar" style={{backgroundColor: '#fef3c7', color: '#f59e0b'}}><Share2 size={28}/></div>
            </div>
            <div className="pp-hero-info">
              <div style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
                <h2 className="pp-name" style={{fontSize:'1.25rem'}}>Referral to: {record.Referral_To || 'Unknown'}</h2>
              </div>
              <p className="pp-sub">
                REF-{record.Referral_ID} | Case ID: {record.Case_ID}
              </p>
              <div className="pp-tags">
                <span className="pp-tag" style={{backgroundColor: '#f1f5f9', color: '#475569'}}>
                  Date: {record.Referral_Date ? new Date(record.Referral_Date).toLocaleDateString() : 'N/A'}
                </span>
                <span className="pp-tag" style={{backgroundColor: '#e0e7ff', color: '#4f46e5'}}>
                  Case Status: {record.Case_Status || 'Unknown'}
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
              <h3 className="pm-card-title"><Briefcase size={16} style={{marginRight:6,verticalAlign:'middle'}}/>Referral Details</h3>
            </div>
            <div style={{padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Referral ID</span>
                  <span className="pm-info-value" style={{fontWeight: 600}}>REF-{record.Referral_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Case ID</span>
                  <span className="pm-info-value">CASE-{record.Case_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Referral Date</span>
                  <span className="pm-info-value">{record.Referral_Date ? new Date(record.Referral_Date).toLocaleDateString() : '-'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Referral To</span>
                  <span className="pm-info-value">{record.Referral_To || '-'}</span>
                </div>
              </div>

              <hr style={{borderColor:'#e2e8f0', margin:'1rem 0'}}/>
              
              <div>
                <h4 style={{fontSize: '1rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.75rem', display:'flex', alignItems:'center', gap:'0.5rem'}}>
                  <FileText size={16}/> Referral Report
                </h4>
                <div style={{background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#334155', whiteSpace: 'pre-wrap'}}>
                  {record.Referral_Report || 'No report details provided.'}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default ReferralProfile;
