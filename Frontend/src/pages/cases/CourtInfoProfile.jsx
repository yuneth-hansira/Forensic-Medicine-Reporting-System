import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  Gavel, Edit3, Calendar, FileText, Hash, User
} from 'lucide-react';
import { courtInfoService } from '../../services/courtInfoService';
import '../patients/patients.css';
import { authService } from '../../services/authService';
import { canEdit } from '../../utils/permissions';

const CourtInfoProfile = () => {
  const user = authService.getUser();
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const records = await courtInfoService.getAllCourtInfo();
        const data = records.find(r => String(r.Court_ID) === String(id));
        if (!data) throw new Error("Record not found");
        setRecord(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load court record.");
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
              <Link to="/court-info">Court Information</Link><span>/</span>
              <span>CI-{record.Court_ID}</span>
            </div>
            <h1 className="pm-page-title">Court Information Profile</h1>
          </div>
          <div className="pm-header-actions">
            {canEdit(user) && (
              <button className="pm-btn pm-btn-primary" onClick={() => window.location.href=`/court-info/${record.Court_ID}/edit`}>
                <Edit3 size={16}/>Edit Record
              </button>
            )}
          </div>
        </div>

        {/* Profile Hero Card */}
        <div className="pp-hero-card pm-card" style={{borderLeft: '4px solid #3b82f6'}}>
          <div className="pp-hero-left">
            <div className="pp-avatar-ring" style={{borderColor: '#3b82f6'}}>
              <div className="pp-avatar" style={{backgroundColor: '#eff6ff', color: '#3b82f6'}}><Gavel size={28}/></div>
            </div>
            <div className="pp-hero-info">
              <div style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
                <h2 className="pp-name" style={{fontSize:'1.25rem'}}>{record.Court_Name || 'Unknown Court'}</h2>
              </div>
              <p className="pp-sub">
                CI-{record.Court_ID} | Case Number: {record.Case_Number || `ID: ${record.Case_ID}`}
              </p>
              <div className="pp-tags">
                <span className="pp-tag" style={{backgroundColor: '#f1f5f9', color: '#475569'}}>
                  <User size={12} style={{marginRight:'0.25rem'}}/> {record.Magistrate_Name || 'N/A'}
                </span>
                <span className="pp-tag" style={{backgroundColor: '#e0e7ff', color: '#4f46e5'}}>
                  <Calendar size={12} style={{marginRight:'0.25rem'}}/> {record.Date_Of_Trial ? new Date(record.Date_Of_Trial).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="pm-tabs" style={{background:'white',borderRadius:'12px',padding:'0.25rem 1rem',border:'1px solid #e2e8f0',marginBottom:'1.5rem',boxShadow:'0 1px 3px rgba(0,0,0,0.05)'}}>
          <button className="pm-tab active">Overview</button>
        </div>

        {/* Tab Content */}
        <div className="pm-card">
          <div className="pm-card-header">
            <h3 className="pm-card-title"><Gavel size={16} style={{marginRight:6,verticalAlign:'middle'}}/>Court Details</h3>
          </div>
          <div style={{padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
              <div>
                <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}><Hash size={12} style={{marginRight:'0.25rem'}}/>Record ID</span>
                <span className="pm-info-value" style={{fontWeight: 600}}>CI-{record.Court_ID}</span>
              </div>
              <div>
                <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}><FileText size={12} style={{marginRight:'0.25rem'}}/>Case ID (Database)</span>
                <span className="pm-info-value">{record.Case_ID}</span>
              </div>
              <div>
                <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}><Gavel size={12} style={{marginRight:'0.25rem'}}/>Court Name</span>
                <span className="pm-info-value">{record.Court_Name || '-'}</span>
              </div>
              <div>
                <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}><User size={12} style={{marginRight:'0.25rem'}}/>Magistrate Name</span>
                <span className="pm-info-value">{record.Magistrate_Name || '-'}</span>
              </div>
              <div>
                <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}><Hash size={12} style={{marginRight:'0.25rem'}}/>Case Number</span>
                <span className="pm-info-value">{record.Case_Number || '-'}</span>
              </div>
              <div>
                <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}><Calendar size={12} style={{marginRight:'0.25rem'}}/>Date of Trial</span>
                <span className="pm-info-value">{record.Date_Of_Trial ? new Date(record.Date_Of_Trial).toLocaleDateString() : '-'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CourtInfoProfile;
