import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  Bandage, Edit3, ShieldAlert
} from 'lucide-react';
import { injuryService } from '../../services/injuryService';
import '../patients/patients.css';

const TABS = ['Overview'];

const InjuryProfile = () => {
  const { id } = useParams();
  const [tab, setTab] = useState('Overview');
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const data = await injuryService.getInjuryById(id);
        setRecord(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load injury record.");
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
              <Link to="/injuries">Injuries</Link><span>/</span>
              <span>INJ-{record.Injury_ID}</span>
            </div>
            <h1 className="pm-page-title">Injury Profile</h1>
          </div>
          <div className="pm-header-actions">
            <button className="pm-btn pm-btn-primary" onClick={() => window.location.href=`/injuries/${record.Injury_ID}/edit`}>
              <Edit3 size={16}/>Edit Injury
            </button>
          </div>
        </div>

        {/* Profile Hero Card */}
        <div className="pp-hero-card pm-card" style={{borderLeft: '4px solid #f59e0b'}}>
          <div className="pp-hero-left">
            <div className="pp-avatar-ring" style={{borderColor: '#f59e0b'}}>
              <div className="pp-avatar" style={{backgroundColor: '#fef3c7', color: '#f59e0b'}}><Bandage size={28}/></div>
            </div>
            <div className="pp-hero-info">
              <div style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
                <h2 className="pp-name">Injury INJ-{record.Injury_ID}</h2>
              </div>
              <p className="pp-sub">
                Weapon: {record.Causative_Weapon || 'Not specified'}
              </p>
              <div className="pp-tags">
                <span className="pp-tag">Case ID: C-{record.Case_ID}</span>
                <span className="pp-tag">Size: {record.Size || 'Unknown'}</span>
                <span className="pp-tag">Shape: {record.Shape || 'Unknown'}</span>
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
              <h3 className="pm-card-title"><Bandage size={16} style={{marginRight:6,verticalAlign:'middle'}}/>Injury Details</h3>
            </div>
            <div style={{padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Injury ID</span>
                  <span className="pm-info-value" style={{fontWeight: 600}}>INJ-{record.Injury_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Linked Case ID</span>
                  <span className="pm-info-value" style={{fontWeight: 600}}>C-{record.Case_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Size</span>
                  <span className="pm-info-value">{record.Size || '-'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Shape</span>
                  <span className="pm-info-value">{record.Shape || '-'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Causative Weapon</span>
                  <span className="pm-info-value">{record.Causative_Weapon || '-'}</span>
                </div>
              </div>

              <div>
                <h4 style={{fontSize: '0.875rem', fontWeight: 600, color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase'}}>Detailed Description</h4>
                <div style={{background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', minHeight: '80px', whiteSpace: 'pre-wrap'}}>
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

export default InjuryProfile;
