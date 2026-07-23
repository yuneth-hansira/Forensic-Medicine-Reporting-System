import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Plus, Eye, Trash2, Search, Shield
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { userService } from '../../services/userService';
import '../patients/patients.css';

const SystemUsers = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRecords = async () => {
    try {
      const data = await userService.getAllUsers();
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
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await userService.deleteUser(id);
        fetchRecords();
      } catch (err) {
        console.error(err);
        alert("Failed to delete user.");
      }
    }
  };

  const filteredRecords = records.filter(r => {
    const search = searchTerm.toLowerCase();
    return (
      (r.Username && r.Username.toLowerCase().includes(search)) ||
      (r.Role && r.Role.toLowerCase().includes(search))
    );
  });

  return (
    <DashboardLayout>
      <div className="pm-page" style={{padding:'2rem'}}>
        <div className="pm-page-header" style={{marginBottom:'2rem', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem'}}>
          <div>
            <div className="pm-breadcrumb">
              <Link to="/users">System Users</Link><span>/</span><span>All Users</span>
            </div>
            <h1 className="pm-page-title">System Users</h1>
            <p className="pm-page-subtitle">Manage user access and profiles</p>
          </div>
          <div style={{display:'flex', gap:'1rem'}}>
            <Link to="/users/register" className="pm-btn pm-btn-primary" style={{textDecoration:'none'}}>
              <Plus size={18}/> Add User
            </Link>
          </div>
        </div>

        <div className="pm-card">
          <div className="pm-card-header" style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem'}}>
            <h2 className="pm-card-title"><Users size={18} style={{marginRight:'0.5rem'}}/> User Directory</h2>
            <div className="pm-search-box" style={{position:'relative', width:'300px'}}>
              <Search size={16} style={{position:'absolute', left:'10px', top:'50%', transform:'translateY(-50%)', color:'#64748b'}}/>
              <input 
                type="text" 
                className="pm-input" 
                placeholder="Search Username or Role..." 
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
                  <th style={{textAlign:'left'}}>User ID</th>
                  <th style={{textAlign:'left'}}>Username</th>
                  <th style={{textAlign:'left'}}>Role</th>
                  <th style={{textAlign:'left'}}>Access Level</th>
                  <th style={{textAlign:'center'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" style={{textAlign:'center', padding:'2rem'}}>Loading...</td></tr>
                ) : filteredRecords.length === 0 ? (
                  <tr><td colSpan="5" style={{textAlign:'center', padding:'2rem', color:'#64748b'}}>No users found.</td></tr>
                ) : (
                  filteredRecords.map(r => (
                    <tr key={r.User_ID}>
                      <td style={{fontWeight:600}}>USR-{r.User_ID}</td>
                      <td><code style={{color:'#0f172a'}}>{r.Username}</code></td>
                      <td>
                        <span style={{
                            display:'inline-flex', alignItems:'center', gap:'0.25rem', padding:'0.15rem 0.5rem', 
                            borderRadius:'999px', fontSize:'0.75rem', fontWeight:600,
                            backgroundColor: r.Role === 'Admin' ? '#fef2f2' : '#f0fdf4',
                            color: r.Role === 'Admin' ? '#ef4444' : '#16a34a'
                        }}>
                          {r.Role === 'Admin' ? <Shield size={12}/> : null} {r.Role}
                        </span>
                      </td>
                      <td>{r.Access_Level || '-'}</td>
                      <td>
                        <div className="pm-action-menu" style={{justifyContent:'center', gap:'0.5rem', display:'flex'}}>
                          <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#0284c7', borderColor: '#bae6fd'}} title="View Details" onClick={() => window.location.href=`/users/${r.User_ID}`}>
                            <Eye size={14}/>
                          </button>
                          <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#ef4444', borderColor: '#fee2e2'}} title="Delete" onClick={() => handleDelete(r.User_ID)}>
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

export default SystemUsers;
