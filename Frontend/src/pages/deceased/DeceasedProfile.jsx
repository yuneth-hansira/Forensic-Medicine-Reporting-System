import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit, Printer, FileText, Activity, Users, FileCheck, Shield, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

import PageHeader from '../../components/common/PageHeader';
import StatusBadge from '../../components/common/StatusBadge';
import './deceased.css';

const TAB_LIST = [
  { id: 'overview',        label: 'Overview' },
  { id: 'identification',  label: 'Identification' },
  { id: 'next-of-kin',     label: 'Next of Kin' },
  { id: 'hospital',        label: 'Hospital' },
  { id: 'clinical',        label: 'Clinical Findings' },
  { id: 'documents',       label: 'Documents' },
];

const DeceasedProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const quickLinks = [
    { label: 'Body Identification', icon: Shield,    path: `/deceased/${id}/identification` },
    { label: 'Next of Kin',         icon: Users,     path: `/deceased/${id}/next-of-kin` },
    { label: 'Hospital Details',    icon: Activity,  path: `/deceased/${id}/hospital` },
    { label: 'Body Release',        icon: FileCheck, path: `/deceased/${id}/release` },
  ];

  const statusItems = [
    { label: 'Identification', status: 'Pending',      type: 'warning' },
    { label: 'Next of Kin',    status: 'Not Verified', type: 'danger' },
    { label: 'Autopsy',        status: 'Pending',      type: 'warning' },
    { label: 'Release Status', status: 'Not Cleared',  type: 'danger' },
  ];

  return (
    <div className="deceased-inner">
        <PageHeader
          title="Deceased Profile"
          breadcrumbs={[{ label: 'Dashboard' }, { label: 'Deceased' }, { label: 'C2026-1045' }]}
          actions={
            <>
              <button className="btn-secondary" onClick={() => navigate(`/deceased/${id}/edit`)}>
                <Edit size={16} /> Edit
              </button>
              <button className="btn-secondary">
                <Printer size={16} /> Print
              </button>
              <button className="btn-primary" onClick={() => navigate(`/deceased/${id}/release`)}>
                Body Release
              </button>
            </>
          }
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem', alignItems: 'start' }}>
          {/* ── Left Column ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Profile Header Card */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '120px', height: '120px', borderRadius: '16px',
                background: '#f1f5f9', border: '1px solid #e2e8f0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#94a3b8', fontSize: '0.8rem', fontWeight: 500, flexShrink: 0,
              }}>
                No Photo
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                      Unknown (Pending ID)
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
                      Case No: C2026-1045 &bull; PM No: PM-26-0891
                    </p>
                  </div>
                  <StatusBadge status="Pending Identification" type="warning" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                  {[
                    { label: 'Gender',          value: 'Male' },
                    { label: 'Estimated Age',   value: '30–40 years' },
                    { label: 'Date Registered', value: '2026-07-21' },
                    { label: 'Assigned Doctor', value: 'Dr. Sarah Jenkins' },
                  ].map((item) => (
                    <div key={item.label}>
                      <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8', fontWeight: 600, margin: 0 }}>{item.label}</p>
                      <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b', margin: '0.2rem 0 0 0' }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card" style={{ overflow: 'hidden' }}>
              {/* Tab Bar */}
              <div style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', background: '#fafafa', overflowX: 'auto' }}>
                {TAB_LIST.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                    padding: '0.875rem 1.25rem',
                    fontSize: '0.85rem', fontWeight: 600,
                    border: 'none', background: 'none', cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    borderBottom: activeTab === tab.id ? '2px solid #2563eb' : '2px solid transparent',
                    color: activeTab === tab.id ? '#2563eb' : '#64748b',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div style={{ padding: '1.5rem', minHeight: '280px' }}>
                {activeTab === 'overview' ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', marginTop: 0, marginBottom: '0.75rem' }}>
                      Preliminary Cause of Death
                    </h3>
                    <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>
                      Pending investigation. Found unconscious at the scene and brought to hospital by emergency responders. No visible signs of trauma.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
                      {[
                        { label: 'Location Found',   value: 'Main Street, Colombo 03' },
                        { label: 'Police Station',   value: 'Kollupitiya Police' },
                        { label: 'Incident Date',    value: '2026-07-20' },
                        { label: 'Case Type',        value: 'Medico-Legal' },
                      ].map(item => (
                        <div key={item.label}>
                          <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>{item.label}</p>
                          <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#334155', margin: '0.2rem 0 0 0' }}>{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', color: '#94a3b8' }}>
                    <FileText size={40} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                    <p style={{ margin: 0, fontSize: '0.875rem' }}>
                      {TAB_LIST.find(t => t.id === activeTab)?.label} details — navigate via Quick Links
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* ── Right Sidebar ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Quick Links */}
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="glass-card" style={{ padding: '1.25rem' }}>
              <h3 style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.875rem 0' }}>Quick Links</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {quickLinks.map((link, idx) => (
                  <button key={idx} onClick={() => navigate(link.path)} style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.75rem 0.875rem', borderRadius: '12px',
                    border: '1px solid #e2e8f0', background: '#fff',
                    cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#bfdbfe'; e.currentTarget.style.background = '#eff6ff'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#fff'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                      <div style={{ padding: '0.4rem', background: '#f1f5f9', borderRadius: '8px', color: '#475569', display: 'flex' }}>
                        <link.icon size={16} />
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>{link.label}</span>
                    </div>
                    <ChevronRight size={16} style={{ color: '#94a3b8' }} />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Status Panel */}
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass-card" style={{ padding: '1.25rem' }}>
              <h3 style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.875rem 0' }}>Current Status</h3>
              <div>
                {statusItems.map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '0.625rem 0',
                    borderBottom: idx < statusItems.length - 1 ? '1px solid #f1f5f9' : 'none',
                  }}>
                    <span style={{ fontSize: '0.825rem', color: '#64748b' }}>{item.label}</span>
                    <StatusBadge status={item.status} type={item.type} />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
};

export default DeceasedProfile;
