import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  Bed, Edit3
} from 'lucide-react';
import { wardService } from '../../services/wardService';
import '../patients/patients.css';
import { authService } from '../../services/authService';
import { canCreate, canEdit, canDelete } from '../../utils/permissions';

const TABS = ['Overview'];

const WardProfile = () => {
  const user = authService.getUser();
  const { id } = useParams();
  const [tab, setTab] = useState('Overview');
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const data = await wardService.getWardById(id);
        setRecord(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load ward record.");
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
              <Link to="/wards">Wards</Link><span>/</span>
              <span>W-{record.Ward_ID}</span>
            </div>
            <h1 className="pm-page-title">Ward Profile</h1>
          </div>
          <div className="pm-header-actions">
            {canEdit(user) && (
              <button className="pm-btn pm-btn-primary" onClick={() => window.location.href=`/wards/${record.Ward_ID}/edit`}>
                            <Edit3 size={16}/>Edit Ward
                          </button>
            )}
          </div>
        </div>

        {/* Profile Hero Card */}
        <div className="pp-hero-card pm-card" style={{borderLeft: '4px solid #06b6d4'}}>
          <div className="pp-hero-left">
            <div className="pp-avatar-ring" style={{borderColor: '#06b6d4'}}>
              <div className="pp-avatar" style={{backgroundColor: '#cffafe', color: '#06b6d4'}}><Bed size={28}/></div>
            </div>
            <div className="pp-hero-info">
              <div style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
                <h2 className="pp-name">{record.Ward_Name || `Ward ${record.Ward_No}`}</h2>
              </div>
              <p className="pp-sub">
                W-{record.Ward_ID}
              </p>
              <div className="pp-tags">
                <span className="pp-tag">Hospital ID: H-{record.Hospital_ID}</span>
                <span className="pp-tag">Ward No: {record.Ward_No || 'N/A'}</span>
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
              <h3 className="pm-card-title"><Bed size={16} style={{marginRight:6,verticalAlign:'middle'}}/>Ward Details</h3>
            </div>
            <div style={{padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Ward ID</span>
                  <span className="pm-info-value" style={{fontWeight: 600}}>W-{record.Ward_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Linked Hospital ID</span>
                  <span className="pm-info-value" style={{fontWeight: 600}}>H-{record.Hospital_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Ward No</span>
                  <span className="pm-info-value">{record.Ward_No || '-'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Ward Name</span>
                  <span className="pm-info-value">{record.Ward_Name || '-'}</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default WardProfile;
