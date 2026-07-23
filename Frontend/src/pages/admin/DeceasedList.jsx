import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Plus, Eye, Trash2, Search, ShieldAlert
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { deceasedService } from '../../services/deceasedService';
import '../patients/patients.css'; // Using shared styles
import { authService } from '../../services/authService';
import { canCreate, canEdit, canDelete } from '../../utils/permissions';

const DeceasedList = () => {
  const user = authService.getUser();
  const [deceasedList, setDeceasedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchDeceased = async () => {
    try {
      const data = await deceasedService.getAllDeceased();
      setDeceasedList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeceased();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await deceasedService.deleteDeceased(id);
        fetchDeceased();
      } catch (err) {
        console.error(err);
        alert("Failed to delete record.");
      }
    }
  };

  const filteredList = deceasedList.filter(d => {
    const search = searchTerm.toLowerCase();
    return (
      (d.Full_Name && d.Full_Name.toLowerCase().includes(search)) ||
      (d.BHT_No && d.BHT_No.toLowerCase().includes(search))
    );
  });

  return (
    <DashboardLayout>
      <div className="pm-page" style={{padding:'2rem'}}>
        <div className="pm-page-header" style={{marginBottom:'2rem', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem'}}>
          <div>
            <div className="pm-breadcrumb">
              <Link to="/deceased">Deceased</Link><span>/</span><span>All Records</span>
            </div>
            <h1 className="pm-page-title">Deceased Register</h1>
            <p className="pm-page-subtitle">View and manage all deceased records</p>
          </div>
          <div style={{display:'flex', gap:'1rem'}}>
            {canCreate(user) && (
              <Link to="/deceased/register" className="pm-btn pm-btn-primary" style={{textDecoration:'none'}}>
                            <Plus size={18}/> Register Deceased
                          </Link>
            )}
          </div>
        </div>

        <div className="pm-card">
          <div className="pm-card-header" style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem'}}>
            <h2 className="pm-card-title"><ShieldAlert size={18} style={{marginRight:'0.5rem', color:'#ef4444'}}/> Deceased Directory</h2>
            <div className="pm-search-box" style={{position:'relative', width:'300px'}}>
              <Search size={16} style={{position:'absolute', left:'10px', top:'50%', transform:'translateY(-50%)', color:'#64748b'}}/>
              <input 
                type="text" 
                className="pm-input" 
                placeholder="Search by Name or BHT No..." 
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
                  <th style={{textAlign:'left'}}>Full Name</th>
                  <th style={{textAlign:'left'}}>Gender</th>
                  <th style={{textAlign:'left'}}>Age</th>
                  <th style={{textAlign:'left'}}>Date of Death</th>
                  <th style={{textAlign:'left'}}>Case ID</th>
                  <th style={{textAlign:'center'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="7" style={{textAlign:'center', padding:'2rem'}}>Loading...</td></tr>
                ) : filteredList.length === 0 ? (
                  <tr><td colSpan="7" style={{textAlign:'center', padding:'2rem', color:'#64748b'}}>No records found.</td></tr>
                ) : (
                  filteredList.map(d => (
                    <tr key={d.Deceased_ID}>
                      <td style={{fontWeight:600}}>D-{d.Deceased_ID}</td>
                      <td>{d.Full_Name || '-'}</td>
                      <td>{d.Sex || '-'}</td>
                      <td>{d.Age || '-'}</td>
                      <td>{d.Date_Of_Death ? new Date(d.Date_Of_Death).toLocaleDateString() : '-'}</td>
                      <td><code style={{color:'#2563eb'}}>C-{d.Case_ID}</code></td>
                      <td>
                        <div className="pm-action-menu" style={{justifyContent:'center', gap:'0.5rem', display:'flex'}}>
                          <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#0284c7', borderColor: '#bae6fd'}} title="View Details" onClick={() => window.location.href=`/deceased/${d.Deceased_ID}`}>
                            <Eye size={14}/>
                          </button>
                          {canDelete(user) && (
              <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#ef4444', borderColor: '#fee2e2'}} title="Delete" onClick={() => handleDelete(d.Deceased_ID)}>
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

export default DeceasedList;
