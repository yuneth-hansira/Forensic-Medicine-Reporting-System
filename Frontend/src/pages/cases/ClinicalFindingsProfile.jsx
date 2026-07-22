import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  Stethoscope, Edit3, ShieldAlert
} from 'lucide-react';
import { clinicalFindingsService } from '../../services/clinicalFindingsService';
import '../patients/patients.css';

const TABS = ['Overview', 'Detailed Notes'];

const ClinicalFindingsProfile = () => {
  const { id } = useParams();
  const [tab, setTab] = useState('Overview');
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const data = await clinicalFindingsService.getClinicalFindingById(id);
        setRecord(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load clinical findings.");
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
              <Link to="/clinical-findings">Clinical Findings</Link><span>/</span>
              <span>CF-{record.Finding_ID}</span>
            </div>
            <h1 className="pm-page-title">Clinical Findings Profile</h1>
          </div>
          <div className="pm-header-actions">
            <button className="pm-btn pm-btn-primary" onClick={() => window.location.href=`/clinical-findings/${record.Finding_ID}/edit`}>
              <Edit3 size={16}/>Edit Findings
            </button>
          </div>
        </div>

        {/* Profile Hero Card */}
        <div className="pp-hero-card pm-card" style={{borderLeft: '4px solid #0ea5e9'}}>
          <div className="pp-hero-left">
            <div className="pp-avatar-ring" style={{borderColor: '#0ea5e9'}}>
              <div className="pp-avatar" style={{backgroundColor: '#e0f2fe', color: '#0ea5e9'}}><Stethoscope size={28}/></div>
            </div>
            <div className="pp-hero-info">
              <div style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
                <h2 className="pp-name">Finding Record CF-{record.Finding_ID}</h2>
                <span className="pm-badge" style={record.Category_Of_Hurt === 'Grievous' ? {backgroundColor:'#fee2e2', color:'#ef4444', borderColor:'#f87171'} : {backgroundColor:'#e0f2fe', color:'#0ea5e9', borderColor:'#bae6fd'}}>
                  {record.Category_Of_Hurt || 'Uncategorized'}
                </span>
              </div>
              <p className="pp-sub">
                Nature of Harm: {record.Nature_Of_Bodily_Harm || 'Not specified'}
              </p>
              <div className="pp-tags">
                <span className="pp-tag">Case ID: C-{record.Case_ID}</span>
                <span className="pp-tag">Alcohol/Drug Test: {record.Alcohol_Drug_Test || 'N/A'}</span>
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
            <div className="pm-card">
              <div className="pm-card-header">
                <h3 className="pm-card-title"><Stethoscope size={16} style={{marginRight:6,verticalAlign:'middle'}}/>Basic Information</h3>
              </div>
              {[
                ['Finding ID', `CF-${record.Finding_ID}`],
                ['Linked Case ID', `C-${record.Case_ID}`],
                ['Category of Hurt', record.Category_Of_Hurt || '-'],
                ['Nature of Bodily Harm', record.Nature_Of_Bodily_Harm || '-'],
                ['Alcohol/Drug Test', record.Alcohol_Drug_Test || '-'],
              ].map(([l,v]) => (
                <div key={l} className="pm-info-row">
                  <span className="pm-info-label">{l}</span>
                  <span className="pm-info-value">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'Detailed Notes' && (
          <div className="pm-card">
            <div className="pm-card-header">
              <h3 className="pm-card-title">Comprehensive Notes</h3>
            </div>
            <div style={{padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              <div>
                <h4 style={{fontSize: '0.875rem', fontWeight: 600, color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase'}}>Internal Injuries</h4>
                <div style={{background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', minHeight: '80px', whiteSpace: 'pre-wrap'}}>
                  {record.Internal_Injuries || 'No internal injuries recorded.'}
                </div>
              </div>
              
              <div>
                <h4 style={{fontSize: '0.875rem', fontWeight: 600, color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase'}}>Sexual Assault Findings</h4>
                <div style={{background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', minHeight: '80px', whiteSpace: 'pre-wrap'}}>
                  {record.Sexual_Assault_Findings || 'No sexual assault findings recorded.'}
                </div>
              </div>

              <div>
                <h4 style={{fontSize: '0.875rem', fontWeight: 600, color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase'}}>General Remarks</h4>
                <div style={{background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', minHeight: '80px', whiteSpace: 'pre-wrap'}}>
                  {record.Remarks || 'No general remarks provided.'}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default ClinicalFindingsProfile;
