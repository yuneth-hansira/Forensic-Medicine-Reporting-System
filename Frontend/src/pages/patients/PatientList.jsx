import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  Search, Filter, UserPlus, Eye, Edit3, FileText,
  Printer, MoreHorizontal, ChevronLeft, ChevronRight,
  Download, RefreshCw, SlidersHorizontal
} from 'lucide-react';
import '../patients/patients.css';

const allPatients = [];

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
  const [status, setStatus]     = useState('');
  const [caseType, setCaseType] = useState('');
  const [doctor, setDoctor]     = useState('');
  const [page, setPage]         = useState(1);
  const [selected, setSelected] = useState([]);

  const filtered = allPatients.filter(p => {
    const q = query.toLowerCase();
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.nic.toLowerCase().includes(q);
    const matchS  = !status   || p.status   === status;
    const matchC  = !caseType || p.caseType === caseType;
    const matchD  = !doctor   || p.doctor   === doctor;
    return matchQ && matchS && matchC && matchD;
  });

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paged      = filtered.slice((page-1)*ROWS_PER_PAGE, page*ROWS_PER_PAGE);

  const toggleSelect = (id) =>
    setSelected(s => s.includes(id) ? s.filter(x=>x!==id) : [...s,id]);
  const toggleAll = () =>
    setSelected(s => s.length === paged.length ? [] : paged.map(p=>p.id));

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
            <button className="pm-btn pm-btn-secondary"><Download size={16}/>Export</button>
            <button className="pm-btn pm-btn-secondary"><RefreshCw size={16}/>Refresh</button>
            <button className="pm-btn pm-btn-primary" onClick={()=>window.location.href='/patients/register'}>
              <UserPlus size={16}/>Register Patient
            </button>
          </div>
        </div>

        <div className="pm-card">
          {/* Filter Bar */}
          <div className="pm-filter-bar">
            <div className="pm-search-wrapper" style={{flex:'1.5'}}>
              <Search size={17} color="#94a3b8"/>
              <input
                placeholder="Search by name, patient ID, NIC..."
                value={query}
                onChange={e=>{setQuery(e.target.value);setPage(1);}}
              />
            </div>
            <select className="pm-filter-select" value={status} onChange={e=>{setStatus(e.target.value);setPage(1);}}>
              <option value="">All Statuses</option>
              {['active','pending','completed','in-progress','closed'].map(s=>(
                <option key={s} value={s}>{statusMap[s].label}</option>
              ))}
            </select>
            <select className="pm-filter-select" value={caseType} onChange={e=>{setCaseType(e.target.value);setPage(1);}}>
              <option value="">All Case Types</option>
              {['Medico-Legal','Injury','Postmortem','Toxicology'].map(c=>(
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select className="pm-filter-select" value={doctor} onChange={e=>{setDoctor(e.target.value);setPage(1);}}>
              <option value="">All Doctors</option>
              {['Dr. John Silva','Dr. Chandima','Dr. N. Perera'].map(d=>(
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <button className="pm-btn pm-btn-secondary" onClick={()=>{setQuery('');setStatus('');setCaseType('');setDoctor('');setPage(1);}}>
              <SlidersHorizontal size={15}/>Clear
            </button>
          </div>

          {/* Bulk Action Bar */}
          {selected.length > 0 && (
            <div className="pl-bulk-bar">
              <span>{selected.length} selected</span>
              <button className="pm-btn pm-btn-secondary pm-btn-sm"><FileText size={14}/>Generate Reports</button>
              <button className="pm-btn pm-btn-secondary pm-btn-sm"><Printer size={14}/>Print</button>
              <button className="pm-btn pm-btn-danger pm-btn-sm">Archive</button>
            </div>
          )}

          {/* Table */}
          <div className="pm-table-wrapper">
            <table className="pm-table">
              <thead>
                <tr>
                  <th style={{width:'40px'}}>
                    <input type="checkbox" onChange={toggleAll} checked={selected.length===paged.length && paged.length>0}/>
                  </th>
                  <th>Patient ID</th>
                  <th>Patient Name</th>
                  <th>NIC</th>
                  <th>Age / Gender</th>
                  <th>Case Type</th>
                  <th>Assigned Doctor</th>
                  <th>Status</th>
                  <th>Registered Date</th>
                  <th style={{textAlign:'center'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.length === 0 ? (
                  <tr><td colSpan={10}>
                    <div className="pm-empty-state">
                      <Search size={36}/>
                      <h4>No Patients Found</h4>
                      <p>Try adjusting your search or filter criteria</p>
                    </div>
                  </td></tr>
                ) : paged.map((p,i) => (
                  <tr key={i} className={selected.includes(p.id) ? 'pl-row-selected' : ''}>
                    <td><input type="checkbox" checked={selected.includes(p.id)} onChange={()=>toggleSelect(p.id)}/></td>
                    <td><code style={{fontSize:'0.78rem',color:'#2563eb',fontWeight:600}}>{p.id}</code></td>
                    <td>
                      <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
                        <div className="pm-avatar-placeholder pm-avatar-sm" style={{fontSize:'0.75rem',width:32,height:32}}>
                          {p.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{fontWeight:600,color:'#0f172a',fontSize:'0.875rem'}}>{p.name}</div>
                          <div style={{fontSize:'0.75rem',color:'#94a3b8'}}>{p.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{fontFamily:'monospace',fontSize:'0.82rem'}}>{p.nic}</td>
                    <td>{p.age} / {p.gender}</td>
                    <td>
                      <span style={{fontSize:'0.78rem',background:'#f1f5f9',color:'#475569',padding:'0.2rem 0.6rem',borderRadius:'20px',fontWeight:600}}>
                        {p.caseType}
                      </span>
                    </td>
                    <td style={{fontSize:'0.85rem'}}>{p.doctor}</td>
                    <td><span className={`pm-badge ${statusMap[p.status].cls}`}>{statusMap[p.status].label}</span></td>
                    <td style={{color:'#94a3b8',fontSize:'0.8rem'}}>{p.date}</td>
                    <td>
                      <div className="pm-action-menu" style={{justifyContent:'center'}}>
                        <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem'}} title="View">
                          <Eye size={14}/>
                        </button>
                        <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem'}} title="Edit">
                          <Edit3 size={14}/>
                        </button>
                        <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem'}} title="Report">
                          <FileText size={14}/>
                        </button>
                        <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem'}} title="More">
                          <MoreHorizontal size={14}/>
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
