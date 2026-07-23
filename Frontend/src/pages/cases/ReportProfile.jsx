import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  ClipboardList, Edit3
} from 'lucide-react';
import { reportService } from '../../services/reportService';
import '../patients/patients.css';
import { authService } from '../../services/authService';
import { canEdit } from '../../utils/permissions';

const TABS = ['Overview'];

const ReportProfile = () => {
  const user = authService.getUser();
  const { id } = useParams();
  const [tab, setTab] = useState('Overview');
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const data = await reportService.getReportById(id);
        setRecord(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load report record.");
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
              <Link to="/reports">Reports</Link><span>/</span>
              <span>RPT-{record.Report_ID}</span>
            </div>
            <h1 className="pm-page-title">Report Profile</h1>
          </div>
          <div className="pm-header-actions">
            {canEdit(user) && user?.Role !== 'Nurse' && (
              <button className="pm-btn pm-btn-primary" onClick={() => window.location.href=`/reports/${record.Report_ID}/edit`}>
                <Edit3 size={16}/>Edit Report
              </button>
            )}
          </div>
        </div>

        {/* Profile Hero Card */}
        <div className="pp-hero-card pm-card" style={{borderLeft: '4px solid #ef4444'}}>
          <div className="pp-hero-left">
            <div className="pp-avatar-ring" style={{borderColor: '#ef4444'}}>
              <div className="pp-avatar" style={{backgroundColor: '#fee2e2', color: '#ef4444'}}><ClipboardList size={28}/></div>
            </div>
            <div className="pp-hero-info">
              <div style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
                <h2 className="pp-name">Report RPT-{record.Report_ID}</h2>
              </div>
              <p className="pp-sub">
                Type: {record.Report_Type || 'Unspecified'}
              </p>
              <div className="pp-tags">
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
              <h3 className="pm-card-title"><ClipboardList size={16} style={{marginRight:6,verticalAlign:'middle'}}/>Report Details</h3>
            </div>
            <div style={{padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Report ID</span>
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
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Report Type</span>
                  <span className="pm-info-value">{record.Report_Type || '-'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Report Date</span>
                  <span className="pm-info-value">{record.Report_Date ? new Date(record.Report_Date).toLocaleDateString() : '-'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Date of Dispatch</span>
                  <span className="pm-info-value">{record.Date_Of_Dispatch ? new Date(record.Date_Of_Dispatch).toLocaleDateString() : '-'}</span>
                </div>
              </div>

              <div>
                <h4 style={{fontSize: '0.875rem', fontWeight: 600, color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase'}}>Signature / Remarks</h4>
                <div style={{background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0'}}>
                  {record.Signature || 'No signature or remarks provided.'}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default ReportProfile;
