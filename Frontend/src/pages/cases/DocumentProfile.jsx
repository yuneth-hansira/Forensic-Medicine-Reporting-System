import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  FileText, Edit3
} from 'lucide-react';
import { documentService } from '../../services/documentService';
import '../patients/patients.css';

const TABS = ['Overview'];

const DocumentProfile = () => {
  const { id } = useParams();
  const [tab, setTab] = useState('Overview');
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const data = await documentService.getDocumentById(id);
        setRecord(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load document record.");
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
              <Link to="/documents">Documents</Link><span>/</span>
              <span>DOC-{record.Document_ID}</span>
            </div>
            <h1 className="pm-page-title">Document Profile</h1>
          </div>
          <div className="pm-header-actions">
            <button className="pm-btn pm-btn-primary" onClick={() => window.location.href=`/documents/${record.Document_ID}/edit`}>
              <Edit3 size={16}/>Edit Document
            </button>
          </div>
        </div>

        {/* Profile Hero Card */}
        <div className="pp-hero-card pm-card" style={{borderLeft: '4px solid #8b5cf6'}}>
          <div className="pp-hero-left">
            <div className="pp-avatar-ring" style={{borderColor: '#8b5cf6'}}>
              <div className="pp-avatar" style={{backgroundColor: '#ede9fe', color: '#8b5cf6'}}><FileText size={28}/></div>
            </div>
            <div className="pp-hero-info">
              <div style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
                <h2 className="pp-name">Document DOC-{record.Document_ID}</h2>
              </div>
              <p className="pp-sub">
                Type: {record.Doc_Type || 'Unspecified'}
              </p>
              <div className="pp-tags">
                <span className="pp-tag">Case ID: C-{record.Case_ID}</span>
                <span className="pp-tag">Upload Date: {record.Upload_Date ? new Date(record.Upload_Date).toLocaleDateString() : 'Unknown'}</span>
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
              <h3 className="pm-card-title"><FileText size={16} style={{marginRight:6,verticalAlign:'middle'}}/>Document Details</h3>
            </div>
            <div style={{padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Document ID</span>
                  <span className="pm-info-value" style={{fontWeight: 600}}>DOC-{record.Document_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Linked Case ID</span>
                  <span className="pm-info-value" style={{fontWeight: 600}}>C-{record.Case_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Document Type</span>
                  <span className="pm-info-value">{record.Doc_Type || '-'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Upload Date</span>
                  <span className="pm-info-value">{record.Upload_Date ? new Date(record.Upload_Date).toLocaleDateString() : '-'}</span>
                </div>
              </div>

              <div>
                <h4 style={{fontSize: '0.875rem', fontWeight: 600, color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase'}}>File Path / URL</h4>
                <div style={{background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', wordBreak: 'break-all'}}>
                  <code style={{color: '#2563eb'}}>{record.File_Path || 'No file path provided.'}</code>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default DocumentProfile;
