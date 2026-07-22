import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Bed, Plus, Eye, Trash2, Search
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { wardService } from '../../services/wardService';
import '../patients/patients.css';

const Wards = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRecords = async () => {
    try {
      const data = await wardService.getAllWards();
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
    if (window.confirm("Are you sure you want to delete this ward record?")) {
      try {
        await wardService.deleteWard(id);
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
      (r.Ward_Name && r.Ward_Name.toLowerCase().includes(search)) ||
      (r.Ward_No && r.Ward_No.toLowerCase().includes(search)) ||
      (r.Hospital_Name && r.Hospital_Name.toLowerCase().includes(search))
    );
  });

  return (
    <DashboardLayout>
      <div className="pm-page" style={{padding:'2rem'}}>
        <div className="pm-page-header" style={{marginBottom:'2rem', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem'}}>
          <div>
            <div className="pm-breadcrumb">
              <Link to="/wards">Wards</Link><span>/</span><span>All Records</span>
            </div>
            <h1 className="pm-page-title">Wards</h1>
            <p className="pm-page-subtitle">View and manage hospital wards</p>
          </div>
          <div style={{display:'flex', gap:'1rem'}}>
            <Link to="/wards/register" className="pm-btn pm-btn-primary" style={{textDecoration:'none'}}>
              <Plus size={18}/> Add Ward
            </Link>
          </div>
        </div>

        <div className="pm-card">
          <div className="pm-card-header" style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem'}}>
            <h2 className="pm-card-title"><Bed size={18} style={{marginRight:'0.5rem'}}/> Ward Directory</h2>
            <div className="pm-search-box" style={{position:'relative', width:'300px'}}>
              <Search size={16} style={{position:'absolute', left:'10px', top:'50%', transform:'translateY(-50%)', color:'#64748b'}}/>
              <input 
                type="text" 
                className="pm-input" 
                placeholder="Search Name or No..." 
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
                  <th style={{textAlign:'left'}}>Ward ID</th>
                  <th style={{textAlign:'left'}}>Hospital</th>
                  <th style={{textAlign:'left'}}>Ward No</th>
                  <th style={{textAlign:'left'}}>Ward Name</th>
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
                    <tr key={r.Ward_ID}>
                      <td style={{fontWeight:600}}>W-{r.Ward_ID}</td>
                      <td><code style={{color:'#6366f1'}}>H-{r.Hospital_ID}</code> {r.Hospital_Name}</td>
                      <td>{r.Ward_No || '-'}</td>
                      <td>{r.Ward_Name || '-'}</td>
                      <td>
                        <div className="pm-action-menu" style={{justifyContent:'center', gap:'0.5rem', display:'flex'}}>
                          <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#0284c7', borderColor: '#bae6fd'}} title="View Details" onClick={() => window.location.href=`/wards/${r.Ward_ID}`}>
                            <Eye size={14}/>
                          </button>
                          <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#ef4444', borderColor: '#fee2e2'}} title="Delete" onClick={() => handleDelete(r.Ward_ID)}>
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

export default Wards;
