import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, FileCheck, PenTool, Printer, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

import PageHeader from '../../components/common/PageHeader';
import './deceased.css';

const CHECKLIST_ITEMS = [
  { key: 'id',        label: 'Identification Confirmed',   defaultChecked: true  },
  { key: 'autopsy',   label: 'Autopsy Completed',          defaultChecked: true  },
  { key: 'reports',   label: 'Reports Generated',          defaultChecked: true  },
  { key: 'police',    label: 'Police Clearance Obtained',  defaultChecked: false },
  { key: 'court',     label: 'Court Approval (if needed)', defaultChecked: false },
  { key: 'kin',       label: 'Next of Kin Verified',       defaultChecked: true  },
];

const BodyRelease = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [checklist, setChecklist] = useState(
    Object.fromEntries(CHECKLIST_ITEMS.map(i => [i.key, i.defaultChecked]))
  );
  const [showConfirm, setShowConfirm] = useState(false);

  const allChecked = Object.values(checklist).every(Boolean);
  const checkedCount = Object.values(checklist).filter(Boolean).length;

  const toggle = (key) => setChecklist(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="deceased-inner">
        <PageHeader
          title="Body Release"
          description="Complete the checklist and fill in release authorization details"
          breadcrumbs={[{ label: 'Dashboard' }, { label: 'Deceased' }, { label: 'Profile' }, { label: 'Release' }]}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>

          {/* ── Left: Checklist ── */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="glass-card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #f1f5f9' }}>
              <FileCheck size={22} style={{ color: '#2563eb' }} />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Pre-Release Checklist</h3>
              <span style={{ marginLeft: 'auto', fontSize: '0.8rem', fontWeight: 600, color: allChecked ? '#16a34a' : '#f59e0b', background: allChecked ? '#dcfce7' : '#fef9c3', padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
                {checkedCount}/{CHECKLIST_ITEMS.length} Complete
              </span>
            </div>

            {/* Progress */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(checkedCount / CHECKLIST_ITEMS.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                  style={{ height: '100%', background: allChecked ? '#16a34a' : '#2563eb', borderRadius: '9999px' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {CHECKLIST_ITEMS.map(item => (
                <label key={item.key} onClick={() => toggle(item.key)} style={{
                  display: 'flex', alignItems: 'center', gap: '0.875rem',
                  padding: '0.875rem 1rem', borderRadius: '12px', cursor: 'pointer',
                  border: `1px solid ${checklist[item.key] ? '#bbf7d0' : '#e2e8f0'}`,
                  background: checklist[item.key] ? '#f0fdf4' : '#fff',
                  transition: 'all 0.2s',
                }}>
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: checklist[item.key] ? '#16a34a' : '#fff',
                    border: `2px solid ${checklist[item.key] ? '#16a34a' : '#d1d5db'}`,
                    transition: 'all 0.2s',
                  }}>
                    {checklist[item.key] && <Check size={14} style={{ color: '#fff', strokeWidth: 3 }} />}
                  </div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: checklist[item.key] ? '#15803d' : '#374151' }}>
                    {item.label}
                  </span>
                  {!checklist[item.key] && <AlertTriangle size={15} style={{ color: '#f59e0b', marginLeft: 'auto' }} />}
                </label>
              ))}
            </div>

            {!allChecked && (
              <div style={{ marginTop: '1rem', padding: '0.875rem', background: '#fff7ed', borderRadius: '10px', border: '1px solid #fed7aa', fontSize: '0.825rem', color: '#92400e' }}>
                ⚠ All checklist items must be completed before releasing the body.
              </div>
            )}
          </motion.div>

          {/* ── Right: Release Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ opacity: allChecked ? 1 : 0.45, pointerEvents: allChecked ? 'auto' : 'none', transition: 'opacity 0.3s' }}
          >
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #f1f5f9' }}>
                <PenTool size={22} style={{ color: '#2563eb' }} />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Release Authorization</h3>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <label className="form-label">Released To (Full Name)</label>
                  <input className="form-input" defaultValue="Jane Doe" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label className="form-label">NIC Number</label>
                    <input className="form-input" defaultValue="19851234567V" />
                  </div>
                  <div>
                    <label className="form-label">Relationship</label>
                    <input className="form-input" defaultValue="Spouse" />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label className="form-label">Release Date</label>
                    <input className="form-input" type="date" />
                  </div>
                  <div>
                    <label className="form-label">Release Time</label>
                    <input className="form-input" type="time" />
                  </div>
                </div>
                <div>
                  <label className="form-label">Witness Name</label>
                  <input className="form-input" placeholder="Authorized officer / witness" />
                </div>

                {/* Signature Pad */}
                <div>
                  <label className="form-label">Digital Signature</label>
                  <div style={{
                    border: '2px dashed #cbd5e1', borderRadius: '14px',
                    height: '100px', background: '#f8fafc',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#94a3b8', fontSize: '0.875rem', cursor: 'crosshair',
                  }}>
                    Sign Here
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
                  <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                    <Printer size={16} /> Print Receipt
                  </button>
                  <button
                    className="btn-primary"
                    style={{ flex: 1, justifyContent: 'center', background: '#16a34a' }}
                    onClick={() => setShowConfirm(true)}
                  >
                    <CheckCircle2 size={16} /> Confirm Release
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Confirmation Dialog */}
        {showConfirm && (
          <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ background: '#fff', borderRadius: '20px', padding: '2rem', maxWidth: '420px', width: '90%', boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}
            >
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <CheckCircle2 size={30} style={{ color: '#16a34a' }} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.5rem' }}>Confirm Body Release</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                  Are you sure you want to release this body to <strong>Jane Doe</strong>? This action cannot be undone.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowConfirm(false)}>Cancel</button>
                <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', background: '#16a34a' }} onClick={() => { setShowConfirm(false); navigate('/deceased'); }}>
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    );
};

export default BodyRelease;
