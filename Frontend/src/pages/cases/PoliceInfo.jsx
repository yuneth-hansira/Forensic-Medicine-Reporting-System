import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { 
  Search, ShieldAlert, Plus, Edit3, Trash2, 
  ChevronLeft, ChevronRight, AlertCircle, Check, Eye
} from 'lucide-react';
import { policeInfoService } from '../../services/policeInfoService';
import '../patients/patients.css'; // Reusing table styles
import { authService } from '../../services/authService';
import { canCreate, canEdit, canDelete } from '../../utils/permissions';

const ROWS_PER_PAGE = 10;

const PoliceInfo = () => {
  const user = authService.getUser();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

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

  // Modal logic removed, using standalone pages

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
            <button className="pm-btn pm-btn-primary" onClick={() => window.location.href='/police-info/register'}>
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
                      <div className="pm-action-menu" style={{justifyContent:'center', display:'flex', gap:'0.5rem'}}>
                        <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#0284c7', borderColor: '#bae6fd'}} title="View Details" onClick={() => window.location.href=`/police-info/${r.Police_ID}`}>
                          <Eye size={14}/>
                        </button>
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
    </DashboardLayout>
  );
};

export default PoliceInfo;
