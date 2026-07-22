import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Plus, Eye, Trash2, Search
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { documentService } from '../../services/documentService';
import '../patients/patients.css';

const Documents = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRecords = async () => {
    try {
      const data = await documentService.getAllDocuments();
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
    if (window.confirm("Are you sure you want to delete this document record?")) {
      try {
        await documentService.deleteDocument(id);
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
      (r.Doc_Type && r.Doc_Type.toLowerCase().includes(search)) ||
      (r.File_Path && r.File_Path.toLowerCase().includes(search)) ||
      (r.FMMS_Case_Number && r.FMMS_Case_Number.toLowerCase().includes(search))
    );
  });

  return (
    <DashboardLayout>
      <div className="pm-page" style={{padding:'2rem'}}>
        <div className="pm-page-header" style={{marginBottom:'2rem', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem'}}>
          <div>
            <div className="pm-breadcrumb">
              <Link to="/documents">Documents</Link><span>/</span><span>All Records</span>
            </div>
            <h1 className="pm-page-title">Documents</h1>
            <p className="pm-page-subtitle">View and manage document records linked to cases</p>
          </div>
          <div style={{display:'flex', gap:'1rem'}}>
            <Link to="/documents/register" className="pm-btn pm-btn-primary" style={{textDecoration:'none'}}>
              <Plus size={18}/> Add Document
            </Link>
          </div>
        </div>

        <div className="pm-card">
          <div className="pm-card-header" style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem'}}>
            <h2 className="pm-card-title"><FileText size={18} style={{marginRight:'0.5rem'}}/> Document Directory</h2>
            <div className="pm-search-box" style={{position:'relative', width:'300px'}}>
              <Search size={16} style={{position:'absolute', left:'10px', top:'50%', transform:'translateY(-50%)', color:'#64748b'}}/>
              <input 
                type="text" 
                className="pm-input" 
                placeholder="Search Type or Case No..." 
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
                  <th style={{textAlign:'left'}}>Case ID</th>
                  <th style={{textAlign:'left'}}>Doc Type</th>
                  <th style={{textAlign:'left'}}>File Path</th>
                  <th style={{textAlign:'left'}}>Upload Date</th>
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
                    <tr key={r.Document_ID}>
                      <td style={{fontWeight:600}}>DOC-{r.Document_ID}</td>
                      <td><code style={{color:'#2563eb'}}>C-{r.Case_ID}</code></td>
                      <td>{r.Doc_Type || '-'}</td>
                      <td>
                        <span style={{
                          display: 'inline-block',
                          maxWidth: '200px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {r.File_Path || '-'}
                        </span>
                      </td>
                      <td>{r.Upload_Date ? new Date(r.Upload_Date).toLocaleDateString() : '-'}</td>
                      <td>
                        <div className="pm-action-menu" style={{justifyContent:'center', gap:'0.5rem', display:'flex'}}>
                          <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#0284c7', borderColor: '#bae6fd'}} title="View Details" onClick={() => window.location.href=`/documents/${r.Document_ID}`}>
                            <Eye size={14}/>
                          </button>
                          <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#ef4444', borderColor: '#fee2e2'}} title="Delete" onClick={() => handleDelete(r.Document_ID)}>
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

export default Documents;
