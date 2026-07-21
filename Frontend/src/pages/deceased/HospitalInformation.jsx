import React from 'react';
import { useParams } from 'react-router-dom';
import { Activity, Clock, User, Calendar, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

import PageHeader from '../../components/common/PageHeader';
import DashboardLayout from '../../layouts/DashboardLayout';
import './deceased.css';

const TIMELINE = [
  { date: '2026-07-21 05:00', title: 'Transferred to Morgue',          detail: 'Body moved to morgue by pathology staff.',    active: true },
  { date: '2026-07-21 03:15', title: 'Pronounced Dead — Ward 14',       detail: 'Time of death certified by Dr. A. Perera.',   active: false },
  { date: '2026-07-20 09:00', title: 'Transferred to ICU',              detail: 'Critical condition — elevated to intensive care.', active: false },
  { date: '2026-07-19 14:30', title: 'Admitted to Emergency',           detail: 'Patient brought in by emergency services.', active: false },
];

const DetailRow = ({ icon: Icon, label, value }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
      <Icon size={16} />
      <span style={{ fontSize: '0.875rem' }}>{label}</span>
    </div>
    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>{value}</span>
  </div>
);

const HospitalInformation = () => {
  const { id } = useParams();

  return (
    <DashboardLayout>
      <div className="deceased-inner">
        <PageHeader
          title="Hospital Information"
          description="Admission details, medical notes, and transfer history"
          breadcrumbs={[{ label: 'Dashboard' }, { label: 'Deceased' }, { label: 'Profile' }, { label: 'Hospital' }]}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>

          {/* Hospital Card */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: '1.75rem' }}>
            {/* Hospital header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #60a5fa)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(37,99,235,0.25)', flexShrink: 0 }}>
                <Activity size={24} style={{ color: '#fff' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>General Hospital Colombo</h3>
                <p style={{ fontSize: '0.825rem', color: '#2563eb', fontWeight: 600, margin: '0.15rem 0 0 0' }}>Ward 14 — ICU</p>
              </div>
            </div>

            <DetailRow icon={Calendar} label="Admission Date"   value="2026-07-19 — 14:30" />
            <DetailRow icon={Clock}    label="Time of Death"    value="2026-07-21 — 03:15" />
            <DetailRow icon={User}     label="Attending Doctor" value="Dr. A. Perera" />
            <DetailRow icon={Phone}    label="Hospital Contact" value="+94 11 269 1111" />
            <DetailRow icon={MapPin}   label="Location"         value="Regent Street, Colombo 10" />

            <div style={{ marginTop: '1.25rem', padding: '0.875rem', background: '#f0fdf4', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
              <p style={{ fontSize: '0.78rem', fontWeight: 600, color: '#15803d', margin: '0 0 0.25rem 0' }}>Bed Number</p>
              <p style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>ICU-14B</p>
            </div>
          </motion.div>

          {/* Transfer Timeline */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 1.5rem 0', paddingBottom: '0.875rem', borderBottom: '1px solid #f1f5f9' }}>
              Transfer & Location History
            </h3>

            <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
              {/* Vertical line */}
              <div style={{ position: 'absolute', left: '7px', top: '4px', bottom: '4px', width: '2px', background: '#e2e8f0', borderRadius: '9999px' }} />

              {TIMELINE.map((event, idx) => (
                <div key={idx} style={{ position: 'relative', marginBottom: idx < TIMELINE.length - 1 ? '1.5rem' : 0 }}>
                  <div style={{
                    position: 'absolute', left: '-1.5rem',
                    top: '2px', width: '16px', height: '16px', borderRadius: '50%',
                    background: event.active ? '#2563eb' : '#e2e8f0',
                    border: `3px solid ${event.active ? '#bfdbfe' : '#fff'}`,
                    boxShadow: event.active ? '0 0 0 3px #eff6ff' : 'none',
                  }} />
                  <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: '0 0 0.2rem 0', fontWeight: 500 }}>{event.date}</p>
                  <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1e293b', margin: '0 0 0.2rem 0' }}>{event.title}</p>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>{event.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Medical Notes */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 1rem 0', paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
            Medical Notes
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.8, margin: 0 }}>
            Patient admitted with severe polytrauma following a road traffic accident on the Galle Road. Underwent emergency laparotomy within 2 hours of admission. 
            Post-operative care in ICU — deteriorated over 36 hours due to multiorgan failure. Pronounced dead at 03:15 on 2026-07-21 by Dr. A. Perera.
            Case referred to the Judicial Medical Officer for post-mortem examination due to unnatural cause of death.
          </p>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default HospitalInformation;
