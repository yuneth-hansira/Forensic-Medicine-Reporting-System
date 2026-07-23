import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  Archive, Edit3, Briefcase, FileText, MapPin, Calendar, ShieldAlert
} from 'lucide-react';
import { exhibitService } from '../../services/exhibitService';
import '../patients/patients.css';
import { authService } from '../../services/authService';
import { canCreate, canEdit, canDelete } from '../../utils/permissions';

const TABS = ['Overview'];

const ExhibitProfile = () => {
  const user = authService.getUser();
  const { id } = useParams();
  const [tab, setTab] = useState('Overview');
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const data = await exhibitService.getExhibitById(id);
        setRecord(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load exhibit record.");
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
              <Link to="/exhibits">Exhibits</Link><span>/</span>
              <span>EXH-{record.Exhibit_ID}</span>
            </div>
            <h1 className="pm-page-title">Exhibit Profile</h1>
          </div>
          <div className="pm-header-actions">
            {canEdit(user) && (
              <button className="pm-btn pm-btn-primary" onClick={() => window.location.href=`/exhibits/${record.Exhibit_ID}/edit`}>
                            <Edit3 size={16}/>Edit Exhibit
                          </button>
            )}
          </div>
        </div>

        {/* Profile Hero Card */}
        <div className="pp-hero-card pm-card" style={{borderLeft: '4px solid #14b8a6'}}>
          <div className="pp-hero-left">
            <div className="pp-avatar-ring" style={{borderColor: '#14b8a6'}}>
              <div className="pp-avatar" style={{backgroundColor: '#ccfbf1', color: '#14b8a6'}}><Archive size={28}/></div>
            </div>
            <div className="pp-hero-info">
              <div style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
                <h2 className="pp-name" style={{fontSize:'1.25rem'}}>Type: {record.Exhibit_Type || 'Unknown Evidence'}</h2>
              </div>
              <p className="pp-sub">
                EXH-{record.Exhibit_ID} | Case ID: {record.Case_ID}
              </p>
              <div className="pp-tags">
                <span className="pp-tag" style={{backgroundColor: '#f1f5f9', color: '#475569'}}>
                  <MapPin size={12} style={{marginRight:'0.25rem'}}/> {record.Storage_Location || 'N/A'}
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
              <h3 className="pm-card-title"><Briefcase size={16} style={{marginRight:6,verticalAlign:'middle'}}/>Exhibit Details</h3>
            </div>
            <div style={{padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Exhibit ID</span>
                  <span className="pm-info-value" style={{fontWeight: 600}}>EXH-{record.Exhibit_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Case ID</span>
                  <span className="pm-info-value">CASE-{record.Case_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Police ID</span>
                  <span className="pm-info-value" style={{display:'flex', alignItems:'center', gap:'0.25rem'}}>
                    {record.Police_ID ? <ShieldAlert size={14}/> : null}
                    {record.Police_ID || '-'}
                  </span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Handover Date</span>
                  <span className="pm-info-value" style={{display:'flex', alignItems:'center', gap:'0.25rem'}}>
                    {record.Handover_Date ? <Calendar size={14}/> : null}
                    {record.Handover_Date ? new Date(record.Handover_Date).toLocaleDateString() : '-'}
                  </span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Exhibit Type</span>
                  <span className="pm-info-value">{record.Exhibit_Type || '-'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Storage Location</span>
                  <span className="pm-info-value">{record.Storage_Location || '-'}</span>
                </div>
              </div>

              <hr style={{borderColor:'#e2e8f0', margin:'1rem 0'}}/>
              
              <div>
                <h4 style={{fontSize: '1rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.75rem', display:'flex', alignItems:'center', gap:'0.5rem'}}>
                  <FileText size={16}/> Description
                </h4>
                <div style={{background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#334155', whiteSpace: 'pre-wrap'}}>
                  {record.Description || 'No description provided.'}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default ExhibitProfile;
