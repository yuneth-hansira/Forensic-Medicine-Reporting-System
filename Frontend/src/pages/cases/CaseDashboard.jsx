import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Plus, Eye, Trash2
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { caseService } from '../../services/caseService';
import '../patients/patients.css';
import { authService } from '../../services/authService';
import { canCreate, canEdit, canDelete } from '../../utils/permissions';

const CaseDashboard = () => {
  const user = authService.getUser();
  const [recentCases, setRecentCases] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCases = async () => {
    try {
      const data = await caseService.getAllCases();
      setRecentCases(data.slice(0, 5));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this case?")) {
      try {
        await caseService.deleteCase(id);
        fetchCases();
      } catch (err) {
        console.error(err);
        alert("Failed to delete case.");
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="pm-page" style={{padding:'2rem'}}>
        <div className="pm-page-header" style={{marginBottom:'2rem', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <h1 className="pm-page-title">Case Management</h1>
            <p className="pm-page-subtitle">Overview of forensic cases</p>
          </div>
          {canCreate(user) && user?.Role !== 'Nurse' && (
            <Link to="/cases/register" className="pm-btn pm-btn-primary" style={{textDecoration:'none'}}>
              <Plus size={18}/> Register Case
            </Link>
          )}
        </div>

        <div className="pm-card" style={{marginTop:'2rem'}}>
          <div className="pm-card-header" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h2 className="pm-card-title"><FileText size={18} style={{marginRight:'0.5rem'}}/> Recent Cases</h2>
            <Link to="/cases/list" className="pm-btn pm-btn-secondary pm-btn-sm" style={{textDecoration:'none'}}>View All</Link>
          </div>
          
          <div style={{overflowX:'auto'}}>
            <table className="pm-table" style={{width:'100%', minWidth:'600px'}}>
              <thead>
                <tr>
                  <th style={{textAlign:'left'}}>Case ID</th>
                  <th style={{textAlign:'left'}}>Type</th>
                  <th style={{textAlign:'left'}}>Ref No</th>
                  <th style={{textAlign:'left'}}>Status</th>
                  <th style={{textAlign:'left'}}>Date Registered</th>
                  <th style={{textAlign:'center'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" style={{textAlign:'center', padding:'2rem'}}>Loading...</td></tr>
                ) : recentCases.length === 0 ? (
                  <tr><td colSpan="6" style={{textAlign:'center', padding:'2rem', color:'#64748b'}}>No recent cases found.</td></tr>
                ) : (
                  recentCases.map(c => (
                    <tr key={c.Case_ID}>
                      <td style={{fontWeight:600}}>C-{c.Case_ID}</td>
                      <td>{c.Case_Type || '-'}</td>
                      <td>{c.MLEF_No_or_PM_No || '-'}</td>
                      <td>
                        <span className={`pm-badge ${c.Case_Status === 'Open' ? 'pm-badge-pending' : c.Case_Status === 'Closed' ? 'pm-badge-completed' : 'pm-badge-active'}`}>
                          {c.Case_Status || 'Unknown'}
                        </span>
                      </td>
                      <td>{c.Date_Registered ? new Date(c.Date_Registered).toLocaleDateString() : '-'}</td>
                      <td>
                        <div className="pm-action-menu" style={{justifyContent:'center', gap:'0.5rem', display:'flex'}}>
                          <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#0284c7', borderColor: '#bae6fd'}} title="View Details" onClick={() => window.location.href=`/cases/${c.Case_ID}`}>
                            <Eye size={14}/>
                          </button>
                          {canDelete(user) && (
                            <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#ef4444', borderColor: '#fee2e2'}} title="Delete" onClick={() => handleDelete(c.Case_ID)}>
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

export default CaseDashboard;
