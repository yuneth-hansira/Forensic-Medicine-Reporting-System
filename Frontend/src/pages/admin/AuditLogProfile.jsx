import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  ClipboardList, Edit3, Database, User, Clock
} from 'lucide-react';
import { auditLogService } from '../../services/auditLogService';
import '../patients/patients.css';

const TABS = ['Overview'];

const AuditLogProfile = () => {
  const { id } = useParams();
  const [tab, setTab] = useState('Overview');
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const data = await auditLogService.getLogById(id);
        setRecord(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load audit log.");
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
              <Link to="/audit-logs">Audit Logs</Link><span>/</span>
              <span>LOG-{record.Log_ID}</span>
            </div>
            <h1 className="pm-page-title">Audit Log Entry</h1>
          </div>
        </div>
        {/* Profile Hero Card */}
        <div className="pp-hero-card pm-card" style={{borderLeft: '4px solid #64748b'}}>
          <div className="pp-hero-left">
            <div className="pp-avatar-ring" style={{borderColor: '#64748b'}}>
              <div className="pp-avatar" style={{backgroundColor: '#f1f5f9', color: '#64748b'}}><ClipboardList size={28}/></div>
            </div>
            <div className="pp-hero-info">
              <div style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
                <h2 className="pp-name" style={{fontSize:'1.25rem'}}>{record.Action}</h2>
              </div>
              <p className="pp-sub">
                LOG-{record.Log_ID} | Table: {record.Table_Affected || 'N/A'}
              </p>
              <div className="pp-tags">
                <span className="pp-tag" style={{backgroundColor: '#f8fafc', color: '#475569', border:'1px solid #cbd5e1'}}>
                  <Clock size={12} style={{marginRight:4}}/>{new Date(record.Timestamp).toLocaleString()}
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
              <h3 className="pm-card-title"><Database size={16} style={{marginRight:6,verticalAlign:'middle'}}/>Log Details</h3>
            </div>
            <div style={{padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Log ID</span>
                  <span className="pm-info-value" style={{fontWeight: 600}}>LOG-{record.Log_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Timestamp</span>
                  <span className="pm-info-value">{new Date(record.Timestamp).toLocaleString()}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Action</span>
                  <span className="pm-info-value" style={{fontWeight:600}}>{record.Action || '-'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Affected Table</span>
                  <span className="pm-info-value"><code style={{color:'#0f172a'}}>{record.Table_Affected || '-'}</code></span>
                </div>
              </div>

              <hr style={{borderColor:'#e2e8f0', margin:'1rem 0'}}/>
              <h4 style={{fontSize: '1rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.5rem'}}><User size={16} style={{marginRight:6,verticalAlign:'middle'}}/> Performed By</h4>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '1rem'}}>
                <div>
                    <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>User ID</span>
                    <span className="pm-info-value">{record.User_ID ? `USR-${record.User_ID}` : 'System'}</span>
                </div>
                <div>
                    <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Username</span>
                    <span className="pm-info-value">{record.Username ? `@${record.Username}` : '-'}</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default AuditLogProfile;
