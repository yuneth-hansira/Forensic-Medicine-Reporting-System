import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  Users, Edit3
} from 'lucide-react';
import { kinService } from '../../services/kinService';
import '../patients/patients.css';
import { authService } from '../../services/authService';
import { canCreate, canEdit, canDelete } from '../../utils/permissions';

const TABS = ['Overview'];

const NextOfKinProfile = () => {
  const user = authService.getUser();
  const { id } = useParams();
  const [tab, setTab] = useState('Overview');
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const data = await kinService.getNextOfKinById(id);
        setRecord(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load next of kin record.");
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
              <Link to="/next-of-kin">Next of Kin</Link><span>/</span>
              <span>KIN-{record.Kin_ID}</span>
            </div>
            <h1 className="pm-page-title">Kin Profile</h1>
          </div>
          <div className="pm-header-actions">
            {canEdit(user) && (
              <button className="pm-btn pm-btn-primary" onClick={() => window.location.href=`/next-of-kin/${record.Kin_ID}/edit`}>
                            <Edit3 size={16}/>Edit Record
                          </button>
            )}
          </div>
        </div>

        {/* Profile Hero Card */}
        <div className="pp-hero-card pm-card" style={{borderLeft: '4px solid #f59e0b'}}>
          <div className="pp-hero-left">
            <div className="pp-avatar-ring" style={{borderColor: '#f59e0b'}}>
              <div className="pp-avatar" style={{backgroundColor: '#fef3c7', color: '#f59e0b'}}><Users size={28}/></div>
            </div>
            <div className="pp-hero-info">
              <div style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
                <h2 className="pp-name">{record.Full_Name || `Kin KIN-${record.Kin_ID}`}</h2>
              </div>
              <p className="pp-sub">
                KIN-{record.Kin_ID} | Relationship: {record.Relationship || 'Unspecified'}
              </p>
              <div className="pp-tags">
                <span className="pp-tag">Deceased ID: DEC-{record.Deceased_ID}</span>
                <span className="pp-tag">Contact: {record.Contact_No || 'N/A'}</span>
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
              <h3 className="pm-card-title"><Users size={16} style={{marginRight:6,verticalAlign:'middle'}}/>Kin Details</h3>
            </div>
            <div style={{padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Kin ID</span>
                  <span className="pm-info-value" style={{fontWeight: 600}}>KIN-{record.Kin_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Linked Deceased ID</span>
                  <span className="pm-info-value" style={{fontWeight: 600}}>DEC-{record.Deceased_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Full Name</span>
                  <span className="pm-info-value">{record.Full_Name || '-'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Relationship</span>
                  <span className="pm-info-value">{record.Relationship || '-'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Contact Number</span>
                  <span className="pm-info-value">{record.Contact_No || '-'}</span>
                </div>
              </div>
              
              <div>
                <h4 style={{fontSize: '0.875rem', fontWeight: 600, color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase'}}>Address</h4>
                <div style={{background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', whiteSpace: 'pre-wrap'}}>
                  {record.Address || 'No address provided.'}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default NextOfKinProfile;
