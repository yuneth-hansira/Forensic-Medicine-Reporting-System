import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Download, UserPlus, FileText, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

import PageHeader from '../../components/common/PageHeader';
import StatisticsCard from '../../components/common/StatisticsCard';
import MedicalTable from '../../components/common/MedicalTable';
import StatusBadge from '../../components/common/StatusBadge';
import DashboardLayout from '../../layouts/DashboardLayout';
import './deceased.css';

const mockData = [
  { id: '1', caseNo: 'C2026-1045', pmNo: 'PM-26-0891', name: 'John Doe',     gender: 'Male',   age: '45',    hospital: 'General Hospital', ward: 'ICU',    status: 'Pending Autopsy',        doctor: 'Dr. A. Perera', date: '2026-07-21' },
  { id: '2', caseNo: 'C2026-1046', pmNo: 'PM-26-0892', name: 'Unknown',      gender: 'Female', age: '30–40', hospital: 'City Care',         ward: 'Ward 3', status: 'Awaiting Identification', doctor: 'Dr. S. Jenkins', date: '2026-07-21' },
  { id: '3', caseNo: 'C2026-1042', pmNo: 'PM-26-0888', name: 'Robert Smith', gender: 'Male',   age: '62',    hospital: 'General Hospital', ward: 'Morgue', status: 'Released',               doctor: 'Dr. A. Perera', date: '2026-07-20' },
  { id: '4', caseNo: 'C2026-1040', pmNo: 'PM-26-0885', name: 'Jane Doe',     gender: 'Female', age: '28',    hospital: 'General Hospital', ward: 'Ward 7', status: 'Identified',              doctor: 'Dr. R. Kumar',  date: '2026-07-19' },
];

const stats = [
  { title: 'Total Bodies',     value: '24', icon: FileText,    color: '#2563eb', trend: { label: '+2 today', isPositive: true } },
  { title: 'Awaiting ID',      value: '5',  icon: UserPlus,    color: '#f59e0b' },
  { title: 'Pending Autopsy',  value: '8',  icon: AlertCircle, color: '#dc2626' },
  { title: 'Released',         value: '11', icon: FileText,    color: '#16a34a' },
];

const DeceasedList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = mockData.filter(d =>
    d.caseNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.pmNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { header: 'Case No',    accessor: 'caseNo' },
    { header: 'PM No',      accessor: 'pmNo' },
    { header: 'Full Name',  accessor: 'name' },
    { header: 'Gender / Age', accessor: (row) => `${row.gender} / ${row.age}` },
    { header: 'Hospital',   accessor: 'hospital' },
    { header: 'Date',       accessor: 'date' },
    { header: 'Status',     accessor: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <DashboardLayout>
      <div className="deceased-inner">
        <PageHeader
          title="Deceased Management"
          description="Manage deceased profiles, identifications, and body releases"
          breadcrumbs={[{ label: 'Dashboard' }, { label: 'Deceased' }]}
          actions={
            <>
              <button className="btn-secondary">
                <Download size={16} /> Export CSV
              </button>
              <button className="btn-primary" onClick={() => navigate('/deceased/new')}>
                <Plus size={16} /> Register Body
              </button>
            </>
          }
        />

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          {stats.map((s, i) => (
            <StatisticsCard key={i} {...s} />
          ))}
        </div>

        {/* Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="glass-card"
          style={{ padding: '1.5rem' }}
        >
          {/* Search + Filter row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ position: 'relative', flex: '1 1 300px', maxWidth: '400px' }}>
              <Search
                size={18}
                style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }}
              />
              <input
                type="text"
                placeholder="Search by Case No, PM No, or Name…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
            <button className="btn-secondary" style={{ whiteSpace: 'nowrap' }}>
              <Filter size={16} /> Advanced Filters
            </button>
          </div>

          <MedicalTable
            columns={columns}
            data={filtered}
            onRowClick={(row) => navigate(`/deceased/${row.id}`)}
          />

          {/* Pagination placeholder */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Showing {filtered.length} of {mockData.length} entries
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn-secondary" style={{ padding: '0.4rem 0.875rem', fontSize: '0.8rem' }}>← Prev</button>
              <button className="btn-secondary" style={{ padding: '0.4rem 0.875rem', fontSize: '0.8rem' }}>Next →</button>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default DeceasedList;
