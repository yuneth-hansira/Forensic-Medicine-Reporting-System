import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  User, Edit3
} from 'lucide-react';
import { examineeService } from '../../services/examineeService';
import '../patients/patients.css';
import { authService } from '../../services/authService';
import { canCreate, canEdit, canDelete } from '../../utils/permissions';

const TABS = ['Overview'];

const ExamineeProfile = () => {
  const user = authService.getUser();
  const { id } = useParams();
  const [tab, setTab] = useState('Overview');
  const [examinee, setExaminee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExaminee = async () => {
      try {
        const data = await examineeService.getExamineeById(id);
        setExaminee(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load examinee details.");
      } finally {
        setLoading(false);
      }
    };
    fetchExaminee();
  }, [id]);

  if (loading) return <DashboardLayout><div className="pm-page"><p style={{padding:'2rem',textAlign:'center'}}>Loading examinee...</p></div></DashboardLayout>;
  if (error || !examinee) return <DashboardLayout><div className="pm-page"><p style={{padding:'2rem',textAlign:'center',color:'red'}}>{error || "Examinee not found."}</p></div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="pm-page">
        {/* Breadcrumb & Actions */}
        <div className="pm-page-header">
          <div>
            <div className="pm-breadcrumb">
              <a href="/examinees">Examinees</a><span>/</span>
              <a href="/examinees/list">All Examinees</a><span>/</span>
              <span>{examinee.Full_Name}</span>
            </div>
            <h1 className="pm-page-title">Examinee Profile</h1>
          </div>
          <div className="pm-header-actions">
            {canEdit(user) && (
              <button className="pm-btn pm-btn-primary" onClick={() => window.location.href=`/examinees/${examinee.Examinee_ID}/edit`}>
                            <Edit3 size={16}/>Edit Examinee
                          </button>
            )}
          </div>
        </div>

        {/* Profile Hero Card */}
        <div className="pp-hero-card pm-card">
          <div className="pp-hero-left">
            <div className="pp-avatar-ring">
              <div className="pp-avatar">{examinee.Full_Name?.charAt(0) || 'U'}</div>
              <div className="pp-avatar-status"/>
            </div>
            <div className="pp-hero-info">
              <div style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
                <h2 className="pp-name">{examinee.Full_Name}</h2>
                <span className="pm-badge pm-badge-active">Active</span>
              </div>
              <p className="pp-sub">
                {examinee.Age ? `${examinee.Age} yrs` : 'Unknown Age'} · {examinee.Sex || 'Unknown Gender'} · NIC: <code>{examinee.NIC_Passport || '-'}</code>
              </p>
              <div className="pp-tags">
                <span className="pp-tag">Examinee ID: E-{examinee.Examinee_ID}</span>
                <span className="pp-tag">Case ID: C-{examinee.Case_ID}</span>
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
            {/* Personal Details */}
            <div className="pm-card">
              <div className="pm-card-header">
                <h3 className="pm-card-title"><User size={16} style={{marginRight:6,verticalAlign:'middle'}}/>Personal Details</h3>
              </div>
              {[
                ['Examinee ID', `E-${examinee.Examinee_ID}`],
                ['Full Name', examinee.Full_Name || '-'],
                ['Gender', examinee.Sex || '-'],
                ['Age', examinee.Age || '-'],
                ['NIC / Passport', examinee.NIC_Passport || '-'],
                ['Address', examinee.Address || '-'],
                ['Linked Case ID', `C-${examinee.Case_ID}`],
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

export default ExamineeProfile;
