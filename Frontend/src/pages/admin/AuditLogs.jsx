import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ClipboardList, Plus, Eye, Trash2, Search, Clock
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { auditLogService } from '../../services/auditLogService';
import '../patients/patients.css';

const AuditLogs = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRecords = async () => {
    try {
      const data = await auditLogService.getAllLogs();
      setRecords(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this log entry?")) {
      try {
        await auditLogService.deleteLog(id);
        fetchRecords();
      } catch (err) {
        console.error(err);
        alert("Failed to delete log entry.");
      }
    }
  };

  const filteredRecords = records.filter(r => {
    const search = searchTerm.toLowerCase();
    return (
      (r.Action && r.Action.toLowerCase().includes(search)) ||
      (r.Table_Affected && r.Table_Affected.toLowerCase().includes(search)) ||
      (r.Username && r.Username.toLowerCase().includes(search))
    );
  });

  return (
    <DashboardLayout>
      <div className="pm-page" style={{padding:'2rem'}}>
        <div className="pm-page-header" style={{marginBottom:'2rem', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem'}}>
          <div>
            <div className="pm-breadcrumb">
              <Link to="/audit-logs">System Logs</Link><span>/</span><span>Audit Trail</span>
            </div>
            <h1 className="pm-page-title">Audit Logs</h1>
            <p className="pm-page-subtitle">Track system activity and data modifications</p>
          </div>

        </div>

        <div className="pm-card">
          <div className="pm-card-header" style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem'}}>
            <h2 className="pm-card-title"><ClipboardList size={18} style={{marginRight:'0.5rem'}}/> Activity Log</h2>
            <div className="pm-search-box" style={{position:'relative', width:'300px'}}>
              <Search size={16} style={{position:'absolute', left:'10px', top:'50%', transform:'translateY(-50%)', color:'#64748b'}}/>
              <input 
                type="text" 
                className="pm-input" 
                placeholder="Search Action, Table or User..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{paddingLeft:'2.2rem'}}
              />
            </div>
          </div>
          
          <div style={{overflowX:'auto'}}>
            <table className="pm-table" style={{width:'100%', minWidth:'800px'}}>
              <thead>
                <tr>
                  <th style={{textAlign:'left'}}>Log ID</th>
                  <th style={{textAlign:'left'}}>Timestamp</th>
                  <th style={{textAlign:'left'}}>User</th>
                  <th style={{textAlign:'left'}}>Action</th>
                  <th style={{textAlign:'left'}}>Table Affected</th>
                  <th style={{textAlign:'center'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" style={{textAlign:'center', padding:'2rem'}}>Loading...</td></tr>
                ) : filteredRecords.length === 0 ? (
                  <tr><td colSpan="6" style={{textAlign:'center', padding:'2rem', color:'#64748b'}}>No logs found.</td></tr>
                ) : (
                  filteredRecords.map(r => (
                    <tr key={r.Log_ID}>
                      <td style={{fontWeight:600}}>LOG-{r.Log_ID}</td>
                      <td>
                        <span style={{display:'flex', alignItems:'center', gap:'0.25rem', color:'#64748b', fontSize:'0.85rem'}}>
                          <Clock size={14}/> {new Date(r.Timestamp).toLocaleString()}
                        </span>
                      </td>
                      <td style={{fontWeight:500, color:'#0f172a'}}>
                        {r.Username ? <code style={{color:'#6366f1'}}>@{r.Username}</code> : <span style={{color:'#94a3b8'}}>System/Unknown</span>}
                      </td>
                      <td>
                        <span style={{
                            display:'inline-flex', alignItems:'center', padding:'0.15rem 0.5rem', 
                            borderRadius:'4px', fontSize:'0.75rem', fontWeight:600,
                            backgroundColor: r.Action?.toLowerCase().includes('delete') ? '#fef2f2' : r.Action?.toLowerCase().includes('update') ? '#fffbeb' : '#f0fdf4',
                            color: r.Action?.toLowerCase().includes('delete') ? '#ef4444' : r.Action?.toLowerCase().includes('update') ? '#d97706' : '#16a34a',
                            border: `1px solid ${r.Action?.toLowerCase().includes('delete') ? '#fca5a5' : r.Action?.toLowerCase().includes('update') ? '#fcd34d' : '#86efac'}`
                        }}>
                          {r.Action || '-'}
                        </span>
                      </td>
                      <td><code style={{color:'#475569'}}>{r.Table_Affected || '-'}</code></td>
                      <td>
                        <div className="pm-action-menu" style={{justifyContent:'center', gap:'0.5rem', display:'flex'}}>
                          <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#0284c7', borderColor: '#bae6fd'}} title="View Details" onClick={() => window.location.href=`/audit-logs/${r.Log_ID}`}>
                            <Eye size={14}/>
                          </button>
                          <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#ef4444', borderColor: '#fee2e2'}} title="Delete" onClick={() => handleDelete(r.Log_ID)}>
                            <Trash2 size={14}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AuditLogs;
