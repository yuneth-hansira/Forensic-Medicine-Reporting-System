import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { UserPlus, ArrowUpRight, Eye, Edit3, Trash2, Search } from 'lucide-react';
import { patientService } from '../../services/patientService';
import '../patients/patients.css';
import './PatientDashboard.css';

const PatientDashboard = () => {
  const [recentPatients, setRecentPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await patientService.getAllPatients();
        // Just take the first 10 for 'Recent' (assuming backend returns newest first, or just slicing)
        setRecentPatients(data.slice(0, 10));
      } catch (err) {
        console.error("Failed to fetch patients:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        await patientService.deletePatient(id);
        setRecentPatients(recentPatients.filter(p => p.Patient_ID !== id));
      } catch (err) {
        alert("Failed to delete patient");
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="pm-page">
        {/* Header */}
        <div className="pm-page-header">
          <div>
            <div className="pm-breadcrumb">
              <a href="#">Home</a><span>/</span><span>Patient Management</span>
            </div>
            <h1 className="pm-page-title">Patient Management</h1>
            <p className="pm-page-subtitle">View recent patients or register a new one</p>
          </div>
          <div className="pm-header-actions">
            <button className="pm-btn pm-btn-primary" onClick={() => window.location.href='/patients/register'}>
              <UserPlus size={16}/>Register New Patient
            </button>
          </div>
        </div>

        {/* Recent Patients Table */}
        <div className="pm-card" style={{marginTop: '2rem'}}>
          <div className="pm-card-header">
            <h3 className="pm-card-title">Recent Patients</h3>
            <div style={{display:'flex',gap:'0.75rem',alignItems:'center'}}>
              <button className="pm-btn pm-btn-secondary pm-btn-sm" onClick={()=>window.location.href='/patients/list'}>
                <ArrowUpRight size={14}/> View All Patients
              </button>
            </div>
          </div>
          <div className="pm-table-wrapper">
            <table className="pm-table">
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Patient Name</th>
                  <th>NIC</th>
                  <th>Age / Gender</th>
                  <th>Blood Group</th>
                  <th>Contact No</th>
                  <th style={{textAlign:'center'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" style={{textAlign:'center', padding:'3rem', color:'#64748b'}}>
                      Loading recent patients...
                    </td>
                  </tr>
                ) : recentPatients.length === 0 ? (
                  <tr>
                    <td colSpan="7">
                      <div className="pm-empty-state">
                        <Search size={36}/>
                        <h4>No Recent Patients</h4>
                        <p>Register a new patient to get started</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  recentPatients.map((p,i) => (
                    <tr key={i}>
                      <td><code style={{fontSize:'0.78rem',color:'#2563eb',fontWeight:600}}>PT-{p.Patient_ID}</code></td>
                      <td>
                        <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
                          <div className="pm-avatar-placeholder pm-avatar-sm" style={{fontSize:'0.75rem'}}>
                            {p.Full_Name?.charAt(0) || 'U'}
                          </div>
                          <span style={{fontWeight:600,color:'#0f172a'}}>{p.Full_Name}</span>
                        </div>
                      </td>
                      <td style={{fontFamily:'monospace',fontSize:'0.82rem'}}>{p.NIC_Passport || '-'}</td>
                      <td>{p.Date_Of_Birth ? new Date(p.Date_Of_Birth).toLocaleDateString() : '-'} / {p.Sex || '-'}</td>
                      <td>{p.Blood_Group || '-'}</td>
                      <td>{p.Contact_No || '-'}</td>
                      <td>
                        <div className="pm-action-menu" style={{justifyContent:'center', gap:'0.5rem'}}>
                          <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#0284c7', borderColor: '#bae6fd'}} title="View Details" onClick={() => window.location.href=`/patients/${p.Patient_ID}`}>
                            <Eye size={14}/>
                          </button>
                          <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#ef4444', borderColor: '#fee2e2'}} title="Delete" onClick={() => handleDelete(p.Patient_ID)}>
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

export default PatientDashboard;
