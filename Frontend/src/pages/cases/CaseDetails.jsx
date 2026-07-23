import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  FileText, Edit3, FolderOpen, Shield
} from 'lucide-react';
import { caseService } from '../../services/caseService';
import '../patients/patients.css';
import { authService } from '../../services/authService';
import { canEdit } from '../../utils/permissions';

const TABS = ['Overview'];

const CaseDetails = () => {
  const user = authService.getUser();
  const { id } = useParams();
  const [tab, setTab] = useState('Overview');
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const data = await caseService.getCaseById(id);
        setCaseData(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load case details.");
      } finally {
        setLoading(false);
      }
    };
    fetchCase();
  }, [id]);

  if (loading) return <DashboardLayout><div className="pm-page"><p style={{padding:'2rem',textAlign:'center'}}>Loading case...</p></div></DashboardLayout>;
  if (error || !caseData) return <DashboardLayout><div className="pm-page"><p style={{padding:'2rem',textAlign:'center',color:'red'}}>{error || "Case not found."}</p></div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="pm-page">
        {/* Breadcrumb & Actions */}
        <div className="pm-page-header">
          <div>
            <div className="pm-breadcrumb">
              <a href="/cases">Cases</a><span>/</span>
              <a href="/cases/list">All Cases</a><span>/</span>
              <span>C-{caseData.Case_ID}</span>
            </div>
            <h1 className="pm-page-title">Case Profile</h1>
          </div>
          <div className="pm-header-actions">
            {canEdit(user) && user?.Role !== 'Nurse' && (
              <button className="pm-btn pm-btn-primary" onClick={() => window.location.href=`/cases/${caseData.Case_ID}/edit`}>
                <Edit3 size={16}/>Edit Case
              </button>
            )}
          </div>
        </div>

        {/* Profile Hero Card */}
        <div className="pm-card" style={{marginBottom:'1.5rem', display:'flex', alignItems:'center', gap:'1.5rem', padding:'2rem'}}>
          <div style={{width:'80px', height:'80px', borderRadius:'50%', background:'#e0f2fe', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <FolderOpen size={36} color="#0284c7"/>
          </div>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap', marginBottom:'0.5rem'}}>
              <h2 style={{fontSize:'1.5rem', fontWeight:700, margin:0, color:'#0f172a'}}>Case C-{caseData.Case_ID}</h2>
              <span className={`pm-badge ${caseData.Case_Status === 'Open' ? 'pm-badge-pending' : caseData.Case_Status === 'Closed' ? 'pm-badge-completed' : 'pm-badge-active'}`}>
                {caseData.Case_Status || 'Unknown Status'}
              </span>
            </div>
            <p style={{margin:0, color:'#64748b', fontSize:'0.9rem'}}>
              Ref No: <code style={{color:'#0f172a', background:'#f1f5f9', padding:'0.1rem 0.4rem', borderRadius:'4px'}}>{caseData.MLEF_No_or_PM_No || '-'}</code> · 
              Registered: {caseData.Date_Registered ? new Date(caseData.Date_Registered).toLocaleDateString() : '-'}
            </p>
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
          <div className="pp-overview-grid" style={{display:'grid', gridTemplateColumns:'1fr', gap:'1.5rem'}}>
            <div className="pm-card">
              <div className="pm-card-header">
                <h3 className="pm-card-title"><FileText size={16} style={{marginRight:6,verticalAlign:'middle'}}/>Case Details</h3>
              </div>
              {[
                ['Case ID', `C-${caseData.Case_ID}`],
                ['Case Type', caseData.Case_Type || '-'],
                ['Ref No (MLEF/PM)', caseData.MLEF_No_or_PM_No || '-'],
                ['Case Status', caseData.Case_Status || '-'],
                ['Date Registered', caseData.Date_Registered ? new Date(caseData.Date_Registered).toLocaleDateString() : '-'],
              ].map(([l,v]) => (
                <div key={l} className="pm-info-row" style={{display:'flex', justifyContent:'space-between', padding:'0.75rem 0', borderBottom:'1px solid #f1f5f9'}}>
                  <span className="pm-info-label" style={{color:'#64748b', fontSize:'0.85rem', fontWeight:600}}>{l}</span>
                  <span className="pm-info-value" style={{color:'#0f172a', fontSize:'0.9rem', fontWeight:500}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CaseDetails;
