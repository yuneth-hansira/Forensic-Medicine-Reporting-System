import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  User, Edit3, ShieldAlert
} from 'lucide-react';
import { deceasedService } from '../../services/deceasedService';
import '../patients/patients.css';
import { authService } from '../../services/authService';
import { canCreate, canEdit, canDelete } from '../../utils/permissions';

const TABS = ['Overview'];

const DeceasedProfile = () => {
  const user = authService.getUser();
  const { id } = useParams();
  const [tab, setTab] = useState('Overview');
  const [deceased, setDeceased] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeceased = async () => {
      try {
        const data = await deceasedService.getDeceasedById(id);
        setDeceased(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load deceased details.");
      } finally {
        setLoading(false);
      }
    };
    fetchDeceased();
  }, [id]);

  if (loading) return <DashboardLayout><div className="pm-page"><p style={{padding:'2rem',textAlign:'center'}}>Loading deceased record...</p></div></DashboardLayout>;
  if (error || !deceased) return <DashboardLayout><div className="pm-page"><p style={{padding:'2rem',textAlign:'center',color:'red'}}>{error || "Record not found."}</p></div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="pm-page">
        {/* Breadcrumb & Actions */}
        <div className="pm-page-header">
          <div>
            <div className="pm-breadcrumb">
              <Link to="/deceased">Deceased</Link><span>/</span>
              <span>{deceased.Full_Name || `D-${deceased.Deceased_ID}`}</span>
            </div>
            <h1 className="pm-page-title">Deceased Profile</h1>
          </div>
          <div className="pm-header-actions">
            {canEdit(user) && (
              <button className="pm-btn pm-btn-primary" onClick={() => window.location.href=`/deceased/${deceased.Deceased_ID}/edit`}>
                            <Edit3 size={16}/>Edit Record
                          </button>
            )}
          </div>
        </div>

        {/* Profile Hero Card */}
        <div className="pp-hero-card pm-card" style={{borderLeft: '4px solid #ef4444'}}>
          <div className="pp-hero-left">
            <div className="pp-avatar-ring" style={{borderColor: '#ef4444'}}>
              <div className="pp-avatar" style={{backgroundColor: '#fee2e2', color: '#ef4444'}}><ShieldAlert size={28}/></div>
            </div>
            <div className="pp-hero-info">
              <div style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
                <h2 className="pp-name">{deceased.Full_Name || 'Unknown Individual'}</h2>
                <span className="pm-badge" style={{backgroundColor:'#fee2e2', color:'#ef4444', borderColor:'#f87171'}}>Deceased</span>
              </div>
              <p className="pp-sub">
                {deceased.Age ? `${deceased.Age} yrs` : 'Unknown Age'} · {deceased.Sex || 'Unknown Gender'} · Date of Death: <code>{deceased.Date_Of_Death ? new Date(deceased.Date_Of_Death).toLocaleDateString() : '-'}</code>
              </p>
              <div className="pp-tags">
                <span className="pp-tag">Deceased ID: D-{deceased.Deceased_ID}</span>
                <span className="pp-tag">Case ID: C-{deceased.Case_ID}</span>
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
                <h3 className="pm-card-title"><User size={16} style={{marginRight:6,verticalAlign:'middle'}}/>Record Details</h3>
              </div>
              {[
                ['Deceased ID', `D-${deceased.Deceased_ID}`],
                ['Full Name', deceased.Full_Name || '-'],
                ['Gender', deceased.Sex || '-'],
                ['Age', deceased.Age || '-'],
                ['BHT No', deceased.BHT_No || '-'],
                ['Date of Death', deceased.Date_Of_Death ? new Date(deceased.Date_Of_Death).toLocaleDateString() : '-'],
                ['Place of Death', deceased.Place_Of_Death || '-'],
                ['Death Type', deceased.Death_Type || '-'],
                ['Linked Case ID', `C-${deceased.Case_ID}`],
                ['Hospital ID', deceased.Hospital_ID || '-'],
                ['Ward ID', deceased.Ward_ID || '-'],
              ].map(([l,v]) => (
                <div key={l} className="pm-info-row">
                  <span className="pm-info-label">{l}</span>
                  <span className="pm-info-value">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DeceasedProfile;
