import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle, AlertTriangle, Fingerprint, Dna, ImageIcon, Search } from 'lucide-react';
import { motion } from 'framer-motion';

import PageHeader from '../../components/common/PageHeader';
import UploadArea from '../../components/common/UploadArea';
import DashboardLayout from '../../layouts/DashboardLayout';
import './deceased.css';

const METHODS = [
  { title: 'Visual',       icon: ImageIcon,    status: 'pending',   color: '#f59e0b' },
  { title: 'Fingerprint',  icon: Fingerprint,  status: 'untested',  color: '#94a3b8' },
  { title: 'Dental',       icon: Search,       status: 'untested',  color: '#94a3b8' },
  { title: 'DNA',          icon: Dna,          status: 'untested',  color: '#94a3b8' },
];

const BodyIdentification = () => {
  const { id } = useParams();
  const [activeMethod, setActiveMethod] = useState(null);

  return (
    <DashboardLayout>
      <div className="deceased-inner">
        <PageHeader
          title="Body Identification"
          breadcrumbs={[{ label: 'Dashboard' }, { label: 'Deceased' }, { label: 'Profile' }, { label: 'Identification' }]}
          actions={
            <button className="btn-primary">
              <CheckCircle size={16} /> Confirm Identity
            </button>
          }
        />

        {/* Identification Method Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
          {METHODS.map((method, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              onClick={() => setActiveMethod(idx)}
              className="glass-card"
              style={{
                padding: '1.25rem',
                display: 'flex', alignItems: 'center', gap: '0.875rem',
                cursor: 'pointer',
                border: activeMethod === idx ? '1.5px solid #2563eb' : '1px solid rgba(226,232,240,0.6)',
                transition: 'all 0.2s',
              }}
            >
              <div style={{
                padding: '0.625rem', borderRadius: '10px',
                background: method.status === 'confirmed' ? '#dcfce7' : method.status === 'pending' ? '#fef9c3' : '#f1f5f9',
                color: method.color, flexShrink: 0, display: 'flex',
              }}>
                <method.icon size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b', margin: 0 }}>{method.title}</p>
                <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: '0.1rem 0 0 0', textTransform: 'capitalize' }}>{method.status}</p>
              </div>
              {method.status === 'pending' && <AlertTriangle size={16} style={{ color: '#f59e0b', flexShrink: 0 }} />}
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem', alignItems: 'start' }}>

          {/* Body Features Form */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 1.25rem 0', paddingBottom: '0.875rem', borderBottom: '1px solid #f1f5f9' }}>
              Body Features
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { label: 'Height (cm)', type: 'number', placeholder: '170' },
                { label: 'Weight (kg)', type: 'number', placeholder: '65' },
                { label: 'Hair Colour',  type: 'text',   placeholder: 'e.g. Black' },
                { label: 'Eye Colour',   type: 'text',   placeholder: 'e.g. Brown' },
              ].map(f => (
                <div key={f.label}>
                  <label className="form-label">{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} className="form-input" />
                </div>
              ))}
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Scars / Tattoos / Distinctive Marks</label>
                <textarea className="form-input" rows={3} placeholder="Describe any identifying marks…" style={{ resize: 'vertical' }} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Clothing & Jewellery Found On Body</label>
                <textarea className="form-input" rows={2} style={{ resize: 'vertical' }} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.25rem', gap: '0.75rem' }}>
              <button className="btn-secondary">Clear</button>
              <button className="btn-primary">Save Features</button>
            </div>
          </motion.div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 1rem 0', paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
                Upload Reference Images
              </h3>
              <UploadArea multiple accept=".jpg,.jpeg,.png" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.875rem 0', paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
                Identification History
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 0', color: '#94a3b8', textAlign: 'center' }}>
                <Fingerprint size={36} style={{ opacity: 0.25, marginBottom: '0.75rem' }} />
                <p style={{ fontSize: '0.85rem', margin: 0 }}>No identification attempts recorded yet.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card" style={{ padding: '1.5rem' }}>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Generate Identification Report
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BodyIdentification;
