import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileSignature, Plus, Eye, Trash2, Search
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { consentService } from '../../services/consentService';
import '../patients/patients.css';

const Consents = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRecords = async () => {
    try {
      const data = await consentService.getAllConsents();
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
    if (window.confirm("Are you sure you want to delete this consent record?")) {
      try {
        await consentService.deleteConsent(id);
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
      (r.Consent_Type && r.Consent_Type.toLowerCase().includes(search)) ||
      (r.Examinee_Name && r.Examinee_Name.toLowerCase().includes(search)) ||
      (r.Examinee_ID && String(r.Examinee_ID).includes(search))
    );
  });

  return (
    <DashboardLayout>
      <div className="pm-page" style={{padding:'2rem'}}>
        <div className="pm-page-header" style={{marginBottom:'2rem', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem'}}>
          <div>
            <div className="pm-breadcrumb">
              <Link to="/consents">Consents</Link><span>/</span><span>All Records</span>
            </div>
            <h1 className="pm-page-title">Consents</h1>
            <p className="pm-page-subtitle">View and manage consent forms linked to examinees</p>
          </div>
          <div style={{display:'flex', gap:'1rem'}}>
            <Link to="/consents/register" className="pm-btn pm-btn-primary" style={{textDecoration:'none'}}>
              <Plus size={18}/> Add Consent
            </Link>
          </div>
        </div>

        <div className="pm-card">
          <div className="pm-card-header" style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem'}}>
            <h2 className="pm-card-title"><FileSignature size={18} style={{marginRight:'0.5rem'}}/> Consent Directory</h2>
            <div className="pm-search-box" style={{position:'relative', width:'300px'}}>
              <Search size={16} style={{position:'absolute', left:'10px', top:'50%', transform:'translateY(-50%)', color:'#64748b'}}/>
              <input 
                type="text" 
                className="pm-input" 
                placeholder="Search Examinee Name or Type..." 
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
                  <th style={{textAlign:'left'}}>ID</th>
                  <th style={{textAlign:'left'}}>Examinee ID</th>
                  <th style={{textAlign:'left'}}>Examinee Name</th>
                  <th style={{textAlign:'left'}}>Consent Type</th>
                  <th style={{textAlign:'left'}}>Consent Date</th>
                  <th style={{textAlign:'center'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" style={{textAlign:'center', padding:'2rem'}}>Loading...</td></tr>
                ) : filteredRecords.length === 0 ? (
                  <tr><td colSpan="6" style={{textAlign:'center', padding:'2rem', color:'#64748b'}}>No records found.</td></tr>
                ) : (
                  filteredRecords.map(r => (
                    <tr key={r.Consent_ID}>
                      <td style={{fontWeight:600}}>CON-{r.Consent_ID}</td>
                      <td><code style={{color:'#2563eb'}}>EX-{r.Examinee_ID}</code></td>
                      <td>{r.Examinee_Name || '-'}</td>
                      <td>{r.Consent_Type || '-'}</td>
                      <td>{r.Consent_Date ? new Date(r.Consent_Date).toLocaleDateString() : '-'}</td>
                      <td>
                        <div className="pm-action-menu" style={{justifyContent:'center', gap:'0.5rem', display:'flex'}}>
                          <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#0284c7', borderColor: '#bae6fd'}} title="View Details" onClick={() => window.location.href=`/consents/${r.Consent_ID}`}>
                            <Eye size={14}/>
                          </button>
                          <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#ef4444', borderColor: '#fee2e2'}} title="Delete" onClick={() => handleDelete(r.Consent_ID)}>
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

export default Consents;
