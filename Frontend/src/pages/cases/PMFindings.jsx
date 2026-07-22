import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ClipboardList, Plus, Eye, Trash2, Search
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { pmFindingsService } from '../../services/pmFindingsService';
import '../patients/patients.css';

const PMFindings = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRecords = async () => {
    try {
      const data = await pmFindingsService.getAllFindings();
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
    if (window.confirm("Are you sure you want to delete these findings?")) {
      try {
        await pmFindingsService.deleteFinding(id);
        fetchRecords();
      } catch (err) {
        console.error(err);
        alert("Failed to delete findings.");
      }
    }
  };

  const filteredRecords = records.filter(r => {
    const search = searchTerm.toLowerCase();
    return (
      (r.Immediate_Cause_Of_Death && r.Immediate_Cause_Of_Death.toLowerCase().includes(search)) ||
      (r.Case_ID && String(r.Case_ID).includes(search))
    );
  });

  return (
    <DashboardLayout>
      <div className="pm-page" style={{padding:'2rem'}}>
        <div className="pm-page-header" style={{marginBottom:'2rem', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem'}}>
          <div>
            <div className="pm-breadcrumb">
              <Link to="/pm-findings">Postmortem Findings</Link><span>/</span><span>All Records</span>
            </div>
            <h1 className="pm-page-title">Postmortem Findings</h1>
            <p className="pm-page-subtitle">Track and manage autopsy results and causes of death</p>
          </div>
          <div style={{display:'flex', gap:'1rem'}}>
            <Link to="/pm-findings/register" className="pm-btn pm-btn-primary" style={{textDecoration:'none'}}>
              <Plus size={18}/> New Findings
            </Link>
          </div>
        </div>

        <div className="pm-card">
          <div className="pm-card-header" style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem'}}>
            <h2 className="pm-card-title"><ClipboardList size={18} style={{marginRight:'0.5rem'}}/> Findings Directory</h2>
            <div className="pm-search-box" style={{position:'relative', width:'300px'}}>
              <Search size={16} style={{position:'absolute', left:'10px', top:'50%', transform:'translateY(-50%)', color:'#64748b'}}/>
              <input 
                type="text" 
                className="pm-input" 
                placeholder="Search Cause of Death, Case ID..." 
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
                  <th style={{textAlign:'left'}}>Finding ID</th>
                  <th style={{textAlign:'left'}}>Case ID</th>
                  <th style={{textAlign:'left'}}>Immediate Cause Of Death</th>
                  <th style={{textAlign:'left'}}>Maternal Death</th>
                  <th style={{textAlign:'center'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" style={{textAlign:'center', padding:'2rem'}}>Loading...</td></tr>
                ) : filteredRecords.length === 0 ? (
                  <tr><td colSpan="5" style={{textAlign:'center', padding:'2rem', color:'#64748b'}}>No records found.</td></tr>
                ) : (
                  filteredRecords.map(r => (
                    <tr key={r.PM_Finding_ID}>
                      <td style={{fontWeight:600}}>PMF-{r.PM_Finding_ID}</td>
                      <td>
                        <code style={{color:'#0f172a'}}>CASE-{r.Case_ID || 'Unknown'}</code>
                        <div style={{fontSize:'0.75rem', color:'#64748b', marginTop:'0.2rem'}}>{r.Case_Status || 'Unknown'}</div>
                      </td>
                      <td style={{fontWeight:500, color:'#0f172a'}}>{r.Immediate_Cause_Of_Death || '-'}</td>
                      <td>
                        {r.Maternal_Death ? (
                          <span style={{background:'#fee2e2', color:'#ef4444', padding:'0.2rem 0.5rem', borderRadius:'4px', fontSize:'0.75rem', fontWeight:600}}>Yes</span>
                        ) : (
                          <span style={{background:'#f1f5f9', color:'#64748b', padding:'0.2rem 0.5rem', borderRadius:'4px', fontSize:'0.75rem'}}>No</span>
                        )}
                      </td>
                      <td>
                        <div className="pm-action-menu" style={{justifyContent:'center', gap:'0.5rem', display:'flex'}}>
                          <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#0284c7', borderColor: '#bae6fd'}} title="View Details" onClick={() => window.location.href=`/pm-findings/${r.PM_Finding_ID}`}>
                            <Eye size={14}/>
                          </button>
                          <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#ef4444', borderColor: '#fee2e2'}} title="Delete" onClick={() => handleDelete(r.PM_Finding_ID)}>
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

export default PMFindings;
