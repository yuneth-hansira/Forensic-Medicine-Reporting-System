import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Users, UserPlus, ShieldAlert, Check, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import PageHeader from '../../components/common/PageHeader';
import StatusBadge from '../../components/common/StatusBadge';
import MedicalTable from '../../components/common/MedicalTable';
import './deceased.css';

const INITIAL_KIN = [
  { id: 1, name: 'Jane Doe',     relation: 'Spouse', nic: '19851234567V', phone: '071-234-5678', email: 'jane@example.com', verified: true,  confirmedDate: '2026-07-20' },
  { id: 2, name: 'John Doe Jr.', relation: 'Son',    nic: '20001234567V', phone: '077-765-4321', email: '',                  verified: false, confirmedDate: null },
];

const NextOfKin = () => {
  const { id } = useParams();
  const [kinList, setKinList] = useState(INITIAL_KIN);
  const [showForm, setShowForm] = useState(false);

  const verify = (kinId) => {
    setKinList(prev => prev.map(k => k.id === kinId ? { ...k, verified: true, confirmedDate: new Date().toISOString().slice(0, 10) } : k));
  };

  const remove = (kinId) => {
    setKinList(prev => prev.filter(k => k.id !== kinId));
  };

  const columns = [
    { header: 'Name',         accessor: 'name' },
    { header: 'Relationship', accessor: 'relation' },
    { header: 'NIC',          accessor: 'nic' },
    { header: 'Phone',        accessor: 'phone' },
    { header: 'Status',       accessor: (row) => <StatusBadge status={row.verified ? 'Verified' : 'Pending'} type={row.verified ? 'success' : 'warning'} /> },
    { header: 'Confirmed',    accessor: (row) => row.confirmedDate || <span style={{ color: '#94a3b8' }}>—</span> },
    {
      header: 'Actions',
      accessor: (row) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {!row.verified && (
            <button onClick={(e) => { e.stopPropagation(); verify(row.id); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, color: '#2563eb', padding: '0.25rem 0.5rem', borderRadius: '6px' }}>
              Verify
            </button>
          )}
          <button onClick={(e) => { e.stopPropagation(); remove(row.id); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, color: '#dc2626', padding: '0.25rem 0.5rem', borderRadius: '6px' }}>
            Remove
          </button>
        </div>
      ),
    },
  ];

  const verifiedCount = kinList.filter(k => k.verified).length;

  return (
    <div className="deceased-inner">
        <PageHeader
          title="Next of Kin"
          description="Manage family members and verification status"
          breadcrumbs={[{ label: 'Dashboard' }, { label: 'Deceased' }, { label: 'Profile' }, { label: 'Next of Kin' }]}
          actions={
            <button className="btn-primary" onClick={() => setShowForm(v => !v)}>
              <Plus size={16} /> Add Relative
            </button>
          }
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start' }}>

          {/* Left — Table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Add Relative Form */}
            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="glass-card"
                  style={{ padding: '1.5rem', overflow: 'hidden' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Add New Relative</h3>
                    <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                      <X size={20} />
                    </button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                    {['Full Name', 'Relationship', 'NIC Number', 'Phone', 'Email', 'Address'].map(lbl => (
                      <div key={lbl}>
                        <label className="form-label">{lbl}</label>
                        <input className="form-input" type={lbl === 'Email' ? 'email' : 'text'} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
                    <button className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                    <button className="btn-primary">Save Relative</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Family Table */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
                <Users size={20} style={{ color: '#2563eb' }} />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                  Family Members ({kinList.length})
                </h3>
              </div>
              <MedicalTable columns={columns} data={kinList} />
            </motion.div>
          </div>

          {/* Right — Info Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Verification Status */}
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem', paddingBottom: '0.875rem', borderBottom: '1px solid #f1f5f9' }}>
                <ShieldAlert size={18} style={{ color: '#f59e0b' }} />
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Verification Status</h3>
              </div>

              {/* Progress bar */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.4rem' }}>
                  <span>Verified</span>
                  <span>{verifiedCount} / {kinList.length}</span>
                </div>
                <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: kinList.length ? `${(verifiedCount / kinList.length) * 100}%` : '0%',
                    background: verifiedCount === kinList.length ? '#16a34a' : '#f59e0b',
                    borderRadius: '9999px',
                    transition: 'width 0.4s ease',
                  }} />
                </div>
              </div>

              <div style={{ padding: '0.875rem', background: verifiedCount > 0 ? '#fefce8' : '#fff7ed', borderRadius: '10px', border: `1px solid ${verifiedCount > 0 ? '#fde68a' : '#fed7aa'}`, fontSize: '0.825rem', color: '#92400e', lineHeight: 1.6 }}>
                {verifiedCount > 0
                  ? 'Primary verification complete. Awaiting signed consent forms.'
                  : 'At least one primary relative must be verified before body release.'}
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <UserPlus size={16} /> Generate Consent Form
              </button>
              <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                Upload Identification Docs
              </button>
              <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                Confirmation History
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    );
};

export default NextOfKin;
