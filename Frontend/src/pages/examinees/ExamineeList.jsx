import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Plus, Eye, Trash2, Search
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { examineeService } from '../../services/examineeService';
import '../patients/patients.css'; // Using shared styles

const ExamineeList = () => {
  const [examinees, setExaminees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchExaminees = async () => {
    try {
      const data = await examineeService.getAllExaminees();
      setExaminees(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExaminees();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this examinee?")) {
      try {
        await examineeService.deleteExaminee(id);
        fetchExaminees();
      } catch (err) {
        console.error(err);
        alert("Failed to delete examinee.");
      }
    }
  };

  const filteredExaminees = examinees.filter(e => {
    const search = searchTerm.toLowerCase();
    return (
      (e.Full_Name && e.Full_Name.toLowerCase().includes(search)) ||
      (e.NIC_Passport && e.NIC_Passport.toLowerCase().includes(search))
    );
  });

  return (
    <DashboardLayout>
      <div className="pm-page" style={{padding:'2rem'}}>
        <div className="pm-page-header" style={{marginBottom:'2rem', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem'}}>
          <div>
            <div className="pm-breadcrumb">
              <Link to="/examinees">Examinees</Link><span>/</span><span>All Examinees</span>
            </div>
            <h1 className="pm-page-title">Examinee Management</h1>
            <p className="pm-page-subtitle">View and manage all registered examinees</p>
          </div>
          <div style={{display:'flex', gap:'1rem'}}>
            <Link to="/examinees/register" className="pm-btn pm-btn-primary" style={{textDecoration:'none'}}>
              <Plus size={18}/> Register Examinee
            </Link>
          </div>
        </div>

        <div className="pm-card">
          <div className="pm-card-header" style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem'}}>
            <h2 className="pm-card-title"><Users size={18} style={{marginRight:'0.5rem'}}/> Examinee Directory</h2>
            <div className="pm-search-box" style={{position:'relative', width:'300px'}}>
              <Search size={16} style={{position:'absolute', left:'10px', top:'50%', transform:'translateY(-50%)', color:'#64748b'}}/>
              <input 
                type="text" 
                className="pm-input" 
                placeholder="Search by Name or NIC..." 
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
                  <th style={{textAlign:'left'}}>NIC / Passport</th>
                  <th style={{textAlign:'left'}}>Case ID</th>
                  <th style={{textAlign:'center'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="7" style={{textAlign:'center', padding:'2rem'}}>Loading...</td></tr>
                ) : filteredExaminees.length === 0 ? (
                  <tr><td colSpan="7" style={{textAlign:'center', padding:'2rem', color:'#64748b'}}>No examinees found.</td></tr>
                ) : (
                  filteredExaminees.map(e => (
                    <tr key={e.Examinee_ID}>
                      <td style={{fontWeight:600}}>E-{e.Examinee_ID}</td>
                      <td>{e.Full_Name || '-'}</td>
                      <td>{e.Sex || '-'}</td>
                      <td>{e.Age || '-'}</td>
                      <td>{e.NIC_Passport || '-'}</td>
                      <td><code style={{color:'#2563eb'}}>C-{e.Case_ID}</code></td>
                      <td>
                        <div className="pm-action-menu" style={{justifyContent:'center', gap:'0.5rem', display:'flex'}}>
                          <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#0284c7', borderColor: '#bae6fd'}} title="View Details" onClick={() => window.location.href=`/examinees/${e.Examinee_ID}`}>
                            <Eye size={14}/>
                          </button>
                          <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#ef4444', borderColor: '#fee2e2'}} title="Delete" onClick={() => handleDelete(e.Examinee_ID)}>
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

export default ExamineeList;
