import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  User, Edit3, Shield, Mail, Briefcase, Hash, Phone
} from 'lucide-react';
import { userService } from '../../services/userService';
import '../patients/patients.css';
import { authService } from '../../services/authService';
import { canCreate, canEdit, canDelete } from '../../utils/permissions';

const TABS = ['Overview'];

const SystemUserProfile = () => {
  const user = authService.getUser();
  const { id } = useParams();
  const [tab, setTab] = useState('Overview');
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const data = await userService.getUserById(id);
        setRecord(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load user record.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecord();
  }, [id]);

  if (loading) return <DashboardLayout><div className="pm-page"><p style={{padding:'2rem',textAlign:'center'}}>Loading record...</p></div></DashboardLayout>;
  if (error || !record) return <DashboardLayout><div className="pm-page"><p style={{padding:'2rem',textAlign:'center',color:'red'}}>{error || "Record not found."}</p></div></DashboardLayout>;

  const isAdmin = record.Role === 'Admin';

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await userService.deleteUser(id);
        window.location.href = '/users';
      } catch (err) {
        console.error(err);
        alert("Failed to delete user.");
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="pm-page">
        {/* Breadcrumb & Actions */}
        <div className="pm-page-header">
          <div>
            <div className="pm-breadcrumb">
              <Link to="/users">System Users</Link><span>/</span>
              <span>USR-{record.User_ID}</span>
            </div>
            <h1 className="pm-page-title">User Profile</h1>
          </div>
          <div className="pm-header-actions" style={{display: 'flex', gap: '0.5rem'}}>
            {canEdit(user) && (
              <button className="pm-btn pm-btn-primary" onClick={() => window.location.href=`/users/${record.User_ID}/edit`}>
                <Edit3 size={16}/>Edit User
              </button>
            )}
            {canDelete(user) && (
              <button className="pm-btn pm-btn-secondary" style={{color: '#ef4444', borderColor: '#fee2e2'}} onClick={handleDelete}>
                Delete User
              </button>
            )}
          </div>
        </div>

        {/* Profile Hero Card */}
        <div className="pp-hero-card pm-card" style={{borderLeft: `4px solid ${isAdmin ? '#ef4444' : '#10b981'}`}}>
          <div className="pp-hero-left">
            <div className="pp-avatar-ring" style={{borderColor: isAdmin ? '#ef4444' : '#10b981'}}>
              <div className="pp-avatar" style={{backgroundColor: isAdmin ? '#fee2e2' : '#d1fae5', color: isAdmin ? '#ef4444' : '#10b981'}}>
                {isAdmin ? <Shield size={28}/> : <User size={28}/>}
              </div>
            </div>
            <div className="pp-hero-info">
              <div style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
                <h2 className="pp-name">{record.Username}</h2>
              </div>
              <p className="pp-sub">
                @{record.Username} | Role: {record.Role}
              </p>
              <div className="pp-tags">
                <span className="pp-tag" style={{backgroundColor: isAdmin ? '#fee2e2' : '#f1f5f9', color: isAdmin ? '#ef4444' : '#64748b', fontWeight:600}}>Access Level: {record.Access_Level}</span>
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
              <h3 className="pm-card-title"><User size={16} style={{marginRight:6,verticalAlign:'middle'}}/>Account & Profile Details</h3>
            </div>
            <div style={{padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>User ID</span>
                  <span className="pm-info-value" style={{fontWeight: 600}}>USR-{record.User_ID}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Username</span>
                  <span className="pm-info-value" style={{fontWeight: 600}}>@{record.Username}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>System Role</span>
                  <span className="pm-info-value">{record.Role}</span>
                </div>
                <div>
                  <span className="pm-info-label" style={{display:'block', marginBottom:'0.25rem'}}>Access Level</span>
                  <span className="pm-info-value">{record.Access_Level || '-'}</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default SystemUserProfile;
