import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  Package, Edit3, Briefcase, Calendar, MapPin, Hash
} from 'lucide-react';
import { specimenService } from '../../services/specimenService';
import '../patients/patients.css';

const TABS = ['Overview'];

const SpecimenProfile = () => {
  const { id } = useParams();
  const [tab, setTab] = useState('Overview');
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const data = await specimenService.getSpecimenById(id);
        setRecord(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load specimen record.");
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
              <Link to="/specimens">Specimens</Link><span>/</span>
              <span>SPEC-{record.Specimen_ID}</span>
            </div>
            <h1 className="pm-page-title">Specimen Profile</h1>
          </div>
          <div className="pm-header-actions">
            <button className="pm-btn pm-btn-primary" onClick={() => window.location.href=`/specimens/${record.Specimen_ID}/edit`}>
              <Edit3 size={16}/>Edit Specimen
            </button>
          </div>
        </div>

        {/* Profile Hero Card */}
        <div className="pp-hero-card pm-card" style={{borderLeft: '4px solid #06b6d4'}}>
          <div className="pp-hero-left">
            <div className="pp-avatar-ring" style={{borderColor: '#06b6d4'}}>
              <div className="pp-avatar" style={{backgroundColor: '#cffafe', color: '#06b6d4'}}><Package size={28}/></div>
            </div>
            <div className="pp-hero-info">
              <div style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
                <h2 className="pp-name" style={{fontSize:'1.25rem'}}>Type: {record.Specimen_Type || 'Unknown'}</h2>
              </div>
              <p className="pp-sub">
                SPEC-{record.Specimen_ID} | PM Finding ID: {record.PM_Finding_ID}
              </p>
              <div className="pp-tags">
                <span className="pp-tag" style={{backgroundColor: '#f1f5f9', color: '#475569'}}>
                  <MapPin size={12} style={{marginRight:'0.25rem'}}/> Location: {record.Storage_Location || 'N/A'}
                </span>
                <span className="pp-tag" style={{backgroundColor: '#e0e7ff', color: '#4f46e5'}}>
                  Case ID: {record.Case_ID || 'Unknown'}
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
              <h3 className="pm-card-title"><Briefcase size={16} style={{marginRight:6,verticalAlign:'middle'}}/>Specimen Details</h3>
            </div>
            <div style={{padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Specimen ID</span>
                  <span className="pm-info-value" style={{fontWeight: 600}}>SPEC-{record.Specimen_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>PM Finding ID</span>
                  <span className="pm-info-value">{record.PM_Finding_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Case ID</span>
                  <span className="pm-info-value">{record.Case_ID ? `CASE-${record.Case_ID}` : 'N/A'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Specimen Type</span>
                  <span className="pm-info-value">{record.Specimen_Type || '-'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Collection Date</span>
                  <span className="pm-info-value" style={{display:'flex', alignItems:'center', gap:'0.25rem'}}>
                    {record.Collection_Date ? <Calendar size={14}/> : null}
                    {record.Collection_Date ? new Date(record.Collection_Date).toLocaleDateString() : '-'}
                  </span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Storage Location</span>
                  <span className="pm-info-value">{record.Storage_Location || '-'}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Chain Of Custody No.</span>
                  <span className="pm-info-value" style={{display:'flex', alignItems:'center', gap:'0.25rem'}}>
                    {record.Chain_Of_Custody_No ? <Hash size={14}/> : null}
                    {record.Chain_Of_Custody_No || '-'}
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default SpecimenProfile;
