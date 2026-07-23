import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  Search, Filter, UserPlus, Eye, Edit3, FileText, Trash2,
  Printer, MoreHorizontal, ChevronLeft, ChevronRight,
  Download, RefreshCw, SlidersHorizontal
} from 'lucide-react';
import '../patients/patients.css';

import { patientService } from '../../services/patientService';

const statusMap = {
  active:       { label:'Active',       cls:'pm-badge-active' },
  pending:      { label:'Pending',      cls:'pm-badge-pending' },
  completed:    { label:'Completed',    cls:'pm-badge-completed' },
  'in-progress':{ label:'In Progress',  cls:'pm-badge-in-progress' },
  closed:       { label:'Closed',       cls:'pm-badge-closed' },
};

const ROWS_PER_PAGE = 7;

const PatientList = () => {
  const [query, setQuery]       = useState('');
  const [page, setPage]         = useState(1);

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await patientService.getAllPatients();
        setPatients(data);
      } catch (err) {
        console.error("Failed to fetch patients:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        await patientService.deletePatient(id);
        setPatients(patients.filter(p => p.Patient_ID !== id));
      } catch (err) {
        alert("Failed to delete patient");
      }
    }
  };

  const filtered = patients.filter(p => {
    const q = query.toLowerCase();
    const matchQ = !q || 
      (p.Full_Name && p.Full_Name.toLowerCase().includes(q)) || 
      (p.Patient_ID && String(p.Patient_ID).includes(q)) || 
      (p.NIC_Passport && p.NIC_Passport.toLowerCase().includes(q));
    return matchQ;
  });

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paged      = filtered.slice((page-1)*ROWS_PER_PAGE, page*ROWS_PER_PAGE);

  return (
    <DashboardLayout>
      <div className="pm-page">
        {/* Header */}
        <div className="pm-page-header">
          <div>
            <div className="pm-breadcrumb">
              <a href="/patients">Patient Management</a><span>/</span><span>Patient List</span>
            </div>
            <h1 className="pm-page-title">All Patients</h1>
            <p className="pm-page-subtitle">{filtered.length} patients found</p>
          </div>
          <div className="pm-header-actions">
            <button className="pm-btn pm-btn-primary" onClick={()=>window.location.href='/patients/register'}>
              <UserPlus size={16}/>Register Patient
            </button>
          </div>
        </div>

        <div className="pm-card">
          {/* Filter Bar */}
          <div className="pm-filter-bar">
            <div className="pm-search-wrapper" style={{flex:'1'}}>
              <Search size={17} color="#94a3b8"/>
              <input
                placeholder="Search by name, patient ID, NIC..."
                value={query}
                onChange={e=>{setQuery(e.target.value);setPage(1);}}
              />
            </div>
          </div>

          {/* Table */}
          <div className="pm-table-wrapper">
            <table className="pm-table">
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Patient Name</th>
                  <th>NIC</th>
                  <th>Age / Gender</th>
                  <th>Blood Group</th>
                  <th>Contact No</th>
                  <th style={{textAlign:'center'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" style={{textAlign:'center', padding:'2rem'}}>Loading patients...</td>
                  </tr>
                ) : paged.length === 0 ? (
                  <tr><td colSpan={7}>
                    <div className="pm-empty-state">
                      <Search size={36}/>
                      <h4>No Patients Found</h4>
                      <p>Try adjusting your search or filter criteria</p>
                    </div>
                  </td></tr>
                ) : paged.map((p,i) => (
                  <tr key={i}>
                    <td><code style={{fontSize:'0.78rem',color:'#2563eb',fontWeight:600}}>PT-{p.Patient_ID}</code></td>
                    <td>
                      <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
                        <div className="pm-avatar-placeholder pm-avatar-sm" style={{fontSize:'0.75rem',width:32,height:32}}>
                          {p.Full_Name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <div style={{fontWeight:600,color:'#0f172a',fontSize:'0.875rem'}}>{p.Full_Name}</div>
                          <div style={{fontSize:'0.75rem',color:'#94a3b8'}}>{p.Contact_No}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{fontFamily:'monospace',fontSize:'0.82rem'}}>{p.NIC_Passport || '-'}</td>
                    <td>{p.Date_Of_Birth ? new Date(p.Date_Of_Birth).toLocaleDateString() : '-'} / {p.Sex || '-'}</td>
                    <td>{p.Blood_Group || '-'}</td>
                    <td>{p.Contact_No || '-'}</td>
                    <td>
                      <div className="pm-action-menu" style={{justifyContent:'center', gap:'0.5rem'}}>
                        <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#0284c7', borderColor: '#bae6fd'}} title="View Details" onClick={() => window.location.href=`/patients/${p.Patient_ID}`}>
                          <Eye size={14}/>
                        </button>
                        <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#ef4444', borderColor: '#fee2e2'}} title="Delete" onClick={() => handleDelete(p.Patient_ID)}>
                          <Trash2 size={14}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pm-pagination">
            <span className="pm-pagination-info">
              Showing {Math.min((page-1)*ROWS_PER_PAGE+1,filtered.length)}–{Math.min(page*ROWS_PER_PAGE,filtered.length)} of {filtered.length} patients
            </span>
            <div className="pm-pagination-buttons">
              <button className="pm-page-btn" disabled={page===1} onClick={()=>setPage(p=>p-1)}><ChevronLeft size={15}/></button>
              {Array.from({length:totalPages},(_,i)=>i+1).map(n=>(
                <button key={n} className={`pm-page-btn ${page===n?'active':''}`} onClick={()=>setPage(n)}>{n}</button>
              ))}
              <button className="pm-page-btn" disabled={page===totalPages} onClick={()=>setPage(p=>p+1)}><ChevronRight size={15}/></button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientList;
