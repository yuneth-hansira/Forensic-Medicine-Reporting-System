import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  Building2, Edit3
} from 'lucide-react';
import { hospitalService } from '../../services/hospitalService';
import '../patients/patients.css';

const TABS = ['Overview', 'Wards'];

const HospitalProfile = () => {
  const { id } = useParams();
  const [tab, setTab] = useState('Overview');
  const [record, setRecord] = useState(null);
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const data = await hospitalService.getHospitalById(id);
        setRecord(data);
        
        try {
            const wardsData = await hospitalService.getWardsByHospital(id);
            setWards(wardsData);
        } catch (wErr) {
            console.error("Could not fetch wards", wErr);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load hospital record.");
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
              <Link to="/hospitals">Hospitals</Link><span>/</span>
              <span>H-{record.Hospital_ID}</span>
            </div>
            <h1 className="pm-page-title">Hospital Profile</h1>
          </div>
          <div className="pm-header-actions">
            <button className="pm-btn pm-btn-primary" onClick={() => window.location.href=`/hospitals/${record.Hospital_ID}/edit`}>
              <Edit3 size={16}/>Edit Hospital
            </button>
          </div>
        </div>

        {/* Profile Hero Card */}
        <div className="pp-hero-card pm-card" style={{borderLeft: '4px solid #6366f1'}}>
          <div className="pp-hero-left">
            <div className="pp-avatar-ring" style={{borderColor: '#6366f1'}}>
              <div className="pp-avatar" style={{backgroundColor: '#e0e7ff', color: '#6366f1'}}><Building2 size={28}/></div>
            </div>
            <div className="pp-hero-info">
              <div style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
                <h2 className="pp-name">{record.Hospital_Name}</h2>
              </div>
              <p className="pp-sub">
                H-{record.Hospital_ID}
              </p>
              <div className="pp-tags">
                <span className="pp-tag">{record.Contact_No || 'No Contact Info'}</span>
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
              <h3 className="pm-card-title"><Building2 size={16} style={{marginRight:6,verticalAlign:'middle'}}/>Hospital Details</h3>
            </div>
            <div style={{padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Hospital ID</span>
                  <span className="pm-info-value" style={{fontWeight: 600}}>H-{record.Hospital_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Hospital Name</span>
                  <span className="pm-info-value" style={{fontWeight: 600}}>{record.Hospital_Name}</span>
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

        {tab === 'Wards' && (
          <div className="pm-card">
            <div className="pm-card-header">
              <h3 className="pm-card-title">Registered Wards</h3>
            </div>
            <div style={{padding: '1.5rem'}}>
              {wards.length === 0 ? (
                <p style={{color: '#64748b'}}>No wards are currently registered for this hospital.</p>
              ) : (
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem'}}>
                    {wards.map(w => (
                        <div key={w.Ward_ID} style={{border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', background: '#f8fafc'}}>
                            <div style={{fontWeight: 600, color: '#0f172a', marginBottom: '0.25rem'}}>Ward No: {w.Ward_No}</div>
                            <div style={{fontSize: '0.875rem', color: '#64748b'}}>{w.Ward_Name || 'Unnamed Ward'}</div>
                        </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default HospitalProfile;
