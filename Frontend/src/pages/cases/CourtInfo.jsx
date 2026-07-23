import React, { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import { canCreate, canEdit, canDelete } from '../../utils/permissions';
import { Link } from 'react-router-dom';
import {
  Gavel, Plus, Eye, Trash2, Search
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { courtInfoService } from '../../services/courtInfoService';
import '../patients/patients.css';


const CourtInfo = () => {
  const user = authService.getUser();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRecords = async () => {
    try {
      const data = await courtInfoService.getAllCourtInfo();
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
    if (window.confirm("Are you sure you want to delete this court record?")) {
      try {
        await courtInfoService.deleteCourtInfo(id);
        fetchRecords();
      } catch (err) {
        console.error(err);
        alert("Failed to delete record.");
      }
    }
  };

  const filteredRecords = records.filter(r => {
    const search = searchTerm.toLowerCase();
    return (
      (r.Case_Number && r.Case_Number.toLowerCase().includes(search)) ||
      (r.Court_Name && r.Court_Name.toLowerCase().includes(search)) ||
      (r.FMMS_Case_Number && r.FMMS_Case_Number.toLowerCase().includes(search))
    );
  });

  return (
    <DashboardLayout>
      <div className="pm-page" style={{padding:'2rem'}}>
        <div className="pm-page-header" style={{marginBottom:'2rem', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem'}}>
          <div>
            <div className="pm-breadcrumb">
              <Link to="/court-info">Court Info</Link><span>/</span><span>All Records</span>
            </div>
            <h1 className="pm-page-title">Court Information</h1>
            <p className="pm-page-subtitle">View and manage court records linked to cases</p>
          </div>
          <div style={{display:'flex', gap:'1rem'}}>
            <Link to="/court-info/register" className="pm-btn pm-btn-primary" style={{textDecoration:'none'}}>
              <Plus size={18}/> Add Court Info
            </Link>
          </div>
        </div>

        <div className="pm-card">
          <div className="pm-card-header" style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem'}}>
            <h2 className="pm-card-title"><Gavel size={18} style={{marginRight:'0.5rem'}}/> Court Directory</h2>
            <div className="pm-search-box" style={{position:'relative', width:'300px'}}>
              <Search size={16} style={{position:'absolute', left:'10px', top:'50%', transform:'translateY(-50%)', color:'#64748b'}}/>
              <input 
                type="text" 
                className="pm-input" 
                placeholder="Search Court Name or Case No..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{paddingLeft:'2.2rem'}}
              />
            </div>
          </div>
          
          <div style={{overflowX:'auto'}}>
            <table className="pm-table" style={{width:'100%', minWidth:'600px'}}>
              <thead>
                <tr>
                  <th style={{textAlign:'left'}}>ID</th>
                  <th style={{textAlign:'left'}}>Case ID</th>
                  <th style={{textAlign:'left'}}>Court Name</th>
                  <th style={{textAlign:'left'}}>Magistrate</th>
                  <th style={{textAlign:'left'}}>Court Case No</th>
                  <th style={{textAlign:'left'}}>Date of Trial</th>
                  <th style={{textAlign:'center'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="7" style={{textAlign:'center', padding:'2rem'}}>Loading...</td></tr>
                ) : filteredRecords.length === 0 ? (
                  <tr><td colSpan="7" style={{textAlign:'center', padding:'2rem', color:'#64748b'}}>No records found.</td></tr>
                ) : (
                  filteredRecords.map(r => (
                    <tr key={r.Court_ID}>
                      <td style={{fontWeight:600}}>CI-{r.Court_ID}</td>
                      <td><code style={{color:'#2563eb'}}>C-{r.Case_ID}</code></td>
                      <td>{r.Court_Name || '-'}</td>
                      <td>{r.Magistrate_Name || '-'}</td>
                      <td>{r.Case_Number || '-'}</td>
                      <td>{r.Date_Of_Trial ? new Date(r.Date_Of_Trial).toLocaleDateString() : '-'}</td>
                      <td>
                        <div className="pm-action-menu" style={{justifyContent:'center', gap:'0.5rem', display:'flex'}}>
                          <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#0284c7', borderColor: '#bae6fd'}} title="View Details" onClick={() => window.location.href=`/court-info/${r.Court_ID}`}>
                            <Eye size={14}/>
                          </button>
                          {canDelete(user) && (
                            <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#ef4444', borderColor: '#fee2e2'}} title="Delete" onClick={() => handleDelete(r.Court_ID)}>
                              <Trash2 size={14}/>
                            </button>
                          )}
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

export default CourtInfo;
