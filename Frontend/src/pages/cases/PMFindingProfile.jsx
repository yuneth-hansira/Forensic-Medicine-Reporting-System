import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  ClipboardList, Edit3, Briefcase, FileText, AlertCircle, Clock
} from 'lucide-react';
import { pmFindingsService } from '../../services/pmFindingsService';
import '../patients/patients.css';

const TABS = ['Overview'];

const PMFindingProfile = () => {
  const { id } = useParams();
  const [tab, setTab] = useState('Overview');
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const data = await pmFindingsService.getFindingById(id);
        setRecord(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load postmortem findings record.");
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
              <Link to="/pm-findings">Postmortem Findings</Link><span>/</span>
              <span>PMF-{record.PM_Finding_ID}</span>
            </div>
            <h1 className="pm-page-title">Postmortem Findings Profile</h1>
          </div>
          <div className="pm-header-actions">
            <button className="pm-btn pm-btn-primary" onClick={() => window.location.href=`/pm-findings/${record.PM_Finding_ID}/edit`}>
              <Edit3 size={16}/>Edit Findings
            </button>
          </div>
        </div>

        {/* Profile Hero Card */}
        <div className="pp-hero-card pm-card" style={{borderLeft: '4px solid #6366f1'}}>
          <div className="pp-hero-left">
            <div className="pp-avatar-ring" style={{borderColor: '#6366f1'}}>
              <div className="pp-avatar" style={{backgroundColor: '#e0e7ff', color: '#6366f1'}}><ClipboardList size={28}/></div>
            </div>
            <div className="pp-hero-info">
              <div style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
                <h2 className="pp-name" style={{fontSize:'1.25rem'}}>COD: {record.Immediate_Cause_Of_Death || 'Pending / Unknown'}</h2>
              </div>
              <p className="pp-sub">
                PMF-{record.PM_Finding_ID} | Case ID: {record.Case_ID}
              </p>
              <div className="pp-tags">
                {record.Maternal_Death ? (
                  <span className="pp-tag" style={{backgroundColor: '#fee2e2', color: '#ef4444'}}>
                    <AlertCircle size={12} style={{marginRight:'0.25rem'}}/> Maternal Death
                  </span>
                ) : null}
                <span className="pp-tag" style={{backgroundColor: '#f1f5f9', color: '#475569'}}>
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
              <h3 className="pm-card-title"><Briefcase size={16} style={{marginRight:6,verticalAlign:'middle'}}/>Cause of Death Summary</h3>
            </div>
            <div style={{padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>PM Finding ID</span>
                  <span className="pm-info-value" style={{fontWeight: 600}}>PMF-{record.PM_Finding_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Case ID</span>
                  <span className="pm-info-value">CASE-{record.Case_ID}</span>
                </div>
                <div style={{gridColumn: '1 / -1'}}>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>I(a) Immediate Cause</span>
                  <span className="pm-info-value" style={{color: '#0f172a', fontWeight: 500}}>{record.Immediate_Cause_Of_Death || '-'}</span>
                </div>
                <div style={{gridColumn: '1 / -1'}}>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>I(b)/(c) Antecedent Cause</span>
                  <span className="pm-info-value">{record.Antecedent_Cause || '-'}</span>
                </div>
                <div style={{gridColumn: '1 / -1'}}>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>II Contributory Cause</span>
                  <span className="pm-info-value">{record.Contributory_Cause || '-'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Interval Onset to Death</span>
                  <span className="pm-info-value" style={{display:'flex', alignItems:'center', gap:'0.25rem'}}>
                    {record.Interval_Onset_Death ? <Clock size={14}/> : null}
                    {record.Interval_Onset_Death || '-'}
                  </span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Maternal Death Flag</span>
                  <span className="pm-info-value">{record.Maternal_Death ? 'Yes' : 'No'}</span>
                </div>
              </div>

              <hr style={{borderColor:'#e2e8f0', margin:'1rem 0'}}/>
              
              <div>
                <h4 style={{fontSize: '1rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.75rem', display:'flex', alignItems:'center', gap:'0.5rem'}}>
                  <FileText size={16}/> PMR Text (Summary)
                </h4>
                <div style={{background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#334155', whiteSpace: 'pre-wrap'}}>
                  {record.PMR_Text || 'No PMR summary provided.'}
                </div>
              </div>

              {record.Comments_Opinions && (
                <div>
                  <h4 style={{fontSize: '1rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.75rem', display:'flex', alignItems:'center', gap:'0.5rem'}}>
                    <AlertCircle size={16}/> Comments & Opinions
                  </h4>
                  <div style={{background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#334155', whiteSpace: 'pre-wrap'}}>
                    {record.Comments_Opinions}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default PMFindingProfile;
