import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { 
  Search, ShieldAlert, Plus, Edit3, Trash2, 
  ChevronLeft, ChevronRight, AlertCircle, Check 
} from 'lucide-react';
import { policeInfoService } from '../../services/policeInfoService';
import '../patients/patients.css'; // Reusing table styles

const ROWS_PER_PAGE = 10;

const PoliceInfo = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    Case_ID: '', Police_Station: '', Investigating_Officer: '', Officer_Reg_No: '', Officer_Rank: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const data = await policeInfoService.getAllPoliceInfo();
      setRecords(data);
    } catch (err) {
      console.error("Failed to fetch police records:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = records.filter(r => {
    const q = query.toLowerCase();
    return !q || 
      (r.Case_Number && r.Case_Number.toLowerCase().includes(q)) || 
      (r.Police_Station && r.Police_Station.toLowerCase().includes(q)) || 
      (r.Investigating_Officer && r.Investigating_Officer.toLowerCase().includes(q));
  });

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paged = filtered.slice((page-1)*ROWS_PER_PAGE, page*ROWS_PER_PAGE);

  const handleOpenModal = () => {
    setForm({ Case_ID: '', Police_Station: '', Investigating_Officer: '', Officer_Reg_No: '', Officer_Rank: '' });
    setError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError(null);
      await policeInfoService.createPoliceInfo(form);
      setIsModalOpen(false);
      fetchRecords(); // Refresh list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add police record');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this police record?')) {
        try {
            await policeInfoService.deletePoliceInfo(id);
            fetchRecords();
        } catch(err) {
            alert('Failed to delete record');
        }
    }
  };

  return (
    <DashboardLayout>
      <div className="pm-page">
        <div className="pm-page-header">
          <div>
            <div className="pm-breadcrumb">
              <a href="/dashboard">Dashboard</a><span>/</span><span>Police Information</span>
            </div>
            <h1 className="pm-page-title">Police Records</h1>
            <p className="pm-page-subtitle">{filtered.length} records found</p>
          </div>
          <div className="pm-header-actions">
            <button className="pm-btn pm-btn-primary" onClick={handleOpenModal}>
              <Plus size={16}/>Add Police Info
            </button>
          </div>
        </div>

        <div className="pm-card">
          <div className="pm-filter-bar">
            <div className="pm-search-wrapper" style={{flex: '1'}}>
              <Search size={17} color="#94a3b8"/>
              <input
                placeholder="Search by Case Number, Station, or Officer Name..."
                value={query}
                onChange={e=>{setQuery(e.target.value);setPage(1);}}
              />
            </div>
          </div>

          <div className="pm-table-container">
            <table className="pm-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Case Number</th>
                  <th>Police Station</th>
                  <th>Investigating Officer</th>
                  <th>Officer Rank</th>
                  <th>Officer Reg No</th>
                  <th style={{textAlign:'center'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="7" style={{textAlign:'center', padding:'2rem'}}>Loading records...</td></tr>
                ) : paged.length === 0 ? (
                  <tr><td colSpan="7">
                    <div className="pm-empty-state">
                      <ShieldAlert size={36} color="#94a3b8"/>
                      <h4>No Police Records Found</h4>
                      <p>Try adjusting your search criteria or add a new record.</p>
                    </div>
                  </td></tr>
                ) : paged.map((r) => (
                  <tr key={r.Police_ID}>
                    <td><code style={{fontSize:'0.78rem',color:'#2563eb',fontWeight:600}}>POL-{r.Police_ID}</code></td>
                    <td>{r.Case_Number || <span style={{color:'red'}}>ID: {r.Case_ID}</span>}</td>
                    <td>{r.Police_Station || '-'}</td>
                    <td>{r.Investigating_Officer || '-'}</td>
                    <td>{r.Officer_Rank || '-'}</td>
                    <td>{r.Officer_Reg_No || '-'}</td>
                    <td>
                      <div className="pm-action-menu" style={{justifyContent:'center'}}>
                        <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#ef4444', borderColor: '#fee2e2'}} title="Delete" onClick={() => handleDelete(r.Police_ID)}>
                          <Trash2 size={14}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pm-pagination">
            <span className="pm-pagination-info">
              Showing {Math.min((page-1)*ROWS_PER_PAGE+1, filtered.length)}–{Math.min(page*ROWS_PER_PAGE, filtered.length)} of {filtered.length}
            </span>
            <div className="pm-pagination-buttons">
              <button className="pm-page-btn" disabled={page===1} onClick={()=>setPage(p=>p-1)}><ChevronLeft size={15}/></button>
              {Array.from({length:totalPages},(_,i)=>i+1).map(n=>(
                <button key={n} className={`pm-page-btn ${page===n?'active':''}`} onClick={()=>setPage(n)}>{n}</button>
              ))}
              <button className="pm-page-btn" disabled={page===totalPages || totalPages===0} onClick={()=>setPage(p=>p+1)}><ChevronRight size={15}/></button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Police Info Modal */}
      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <div style={modalHeaderStyle}>
              <h3 style={{margin:0, fontSize:'1.25rem', color:'#0f172a'}}>Add Police Information</h3>
              <button onClick={() => setIsModalOpen(false)} style={closeBtnStyle}>✕</button>
            </div>
            <form onSubmit={handleSubmit} style={{padding: '1.5rem'}}>
              {error && <div style={{color:'red', marginBottom:'1rem', padding:'0.75rem', background:'#fee2e2', borderRadius:'6px', fontSize:'0.875rem'}}>{error}</div>}
              
              <div style={{marginBottom: '1rem'}}>
                <label className="pm-label required">Case ID (Database ID)</label>
                <input required type="number" className="pm-input" value={form.Case_ID} onChange={e => setForm({...form, Case_ID: e.target.value})} placeholder="e.g. 1" />
              </div>
              
              <div style={{marginBottom: '1rem'}}>
                <label className="pm-label">Police Station</label>
                <input className="pm-input" value={form.Police_Station} onChange={e => setForm({...form, Police_Station: e.target.value})} placeholder="e.g. Cinnamon Gardens" />
              </div>

              <div style={{marginBottom: '1rem'}}>
                <label className="pm-label">Investigating Officer Name</label>
                <input className="pm-input" value={form.Investigating_Officer} onChange={e => setForm({...form, Investigating_Officer: e.target.value})} placeholder="e.g. Inspector Perera" />
              </div>

              <div style={{display:'flex', gap:'1rem', marginBottom:'1.5rem'}}>
                <div style={{flex: 1}}>
                  <label className="pm-label">Officer Rank</label>
                  <input className="pm-input" value={form.Officer_Rank} onChange={e => setForm({...form, Officer_Rank: e.target.value})} placeholder="e.g. OIC / SI" />
                </div>
                <div style={{flex: 1}}>
                  <label className="pm-label">Officer Registration No</label>
                  <input className="pm-input" value={form.Officer_Reg_No} onChange={e => setForm({...form, Officer_Reg_No: e.target.value})} placeholder="e.g. 45892" />
                </div>
              </div>

              <div style={{display:'flex', justifyContent:'flex-end', gap:'1rem'}}>
                <button type="button" className="pm-btn pm-btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="pm-btn pm-btn-primary" disabled={submitting}>
                  <Check size={16}/> {submitting ? 'Saving...' : 'Save Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

// Simple inline styles for the modal to avoid creating a new CSS file just for this
const modalOverlayStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
};
const modalStyle = {
  background: '#fff', width: '100%', maxWidth: '500px', borderRadius: '12px',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  overflow: 'hidden'
};
const modalHeaderStyle = {
  padding: '1.25rem 1.5rem', borderBottom: '1px solid #e2e8f0',
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  background: '#f8fafc'
};
const closeBtnStyle = {
  background: 'none', border: 'none', fontSize: '1.25rem', color: '#64748b', cursor: 'pointer'
};

export default PoliceInfo;
