import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AlertCircle, Check } from 'lucide-react';
import { documentService } from '../../services/documentService';
import '../patients/patients.css';
import { authService } from '../../services/authService';
import { canCreate, canEdit, canDelete } from '../../utils/permissions';

const RegisterDocument = () => {
  const user = authService.getUser();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Case_ID: '',
    Doc_Type: '',
    File_Path: '',
    Upload_Date: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchRecord = async () => {
        try {
          const data = await documentService.getDocumentById(id);
          setForm({
            Case_ID: data.Case_ID || '',
            Doc_Type: data.Doc_Type || '',
            File_Path: data.File_Path || '',
            Upload_Date: data.Upload_Date ? data.Upload_Date.substring(0, 10) : ''
          });
        } catch (err) {
          console.error(err);
          setError("Failed to load record for editing");
        } finally {
          setIsLoadingData(false);
        }
      };
      fetchRecord();
    }
  }, [id, isEditMode]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setError(null);
      
      const payload = { 
        ...form,
        Upload_Date: form.Upload_Date === '' ? null : form.Upload_Date 
      };

      if (isEditMode) {
        await documentService.updateDocument(id, payload);
        alert('Document updated successfully!');
        navigate(`/documents/${id}`);
      } else {
        await documentService.createDocument(payload);
        alert('Document registered successfully!');
        navigate('/documents');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'register'} document`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="pm-page" style={{padding:'2rem'}}>
        <div className="pm-page-header" style={{marginBottom:'2rem'}}>
          <div>
            <div className="pm-breadcrumb">
              <Link to="/documents">Documents</Link><span>/</span><span>{isEditMode ? 'Edit Document' : 'Add Document'}</span>
            </div>
            <h1 className="pm-page-title">{isEditMode ? 'Edit Document Record' : 'Add Document Record'}</h1>
            <p className="pm-page-subtitle">{isEditMode ? 'Update document details in the database' : 'Enter document details linked to a case'}</p>
          </div>
        </div>

        {error && (
          <div style={{background:'#fee2e2', color:'#ef4444', padding:'1rem', borderRadius:'8px', marginBottom:'1.5rem', display:'flex', alignItems:'center', gap:'0.75rem'}}>
            <AlertCircle size={20}/> {error}
          </div>
        )}

        {isLoadingData ? (
          <div style={{textAlign:'center', padding:'3rem', color:'#64748b'}}>Loading data...</div>
        ) : (
          <div className="pm-card" style={{maxWidth: '800px', margin: '0 auto'}}>
            <form onSubmit={handleSubmit} style={{padding: '2rem'}}>
              
              <div className="pm-form-group" style={{marginBottom: '1.5rem'}}>
                <label className="pm-label required">Linked Case ID</label>
                <input 
                  required
                  type="number"
                  className="pm-input" 
                  value={form.Case_ID} 
                  onChange={(e) => handleChange('Case_ID', e.target.value)} 
                  placeholder="e.g. 1"
                  disabled={isEditMode}
                  style={isEditMode ? {backgroundColor: '#f1f5f9'} : {}}
                />
              </div>

              <div className="pm-form-grid-2" style={{marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div className="pm-form-group">
                  <label className="pm-label">Document Type</label>
                  <input 
                    className="pm-input" 
                    value={form.Doc_Type} 
                    onChange={(e) => handleChange('Doc_Type', e.target.value)}
                    placeholder="e.g. Police Report, Medical History"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Upload Date</label>
                  <input 
                    type="date"
                    className="pm-input" 
                    value={form.Upload_Date} 
                    onChange={(e) => handleChange('Upload_Date', e.target.value)}
                  />
                </div>
              </div>

              <div className="pm-form-group" style={{marginBottom: '2rem'}}>
                <label className="pm-label">File Path / URL</label>
                <input 
                  className="pm-input" 
                  value={form.File_Path} 
                  onChange={(e) => handleChange('File_Path', e.target.value)}
                  placeholder="e.g. /uploads/documents/report.pdf"
                />
              </div>

              <div style={{display:'flex', justifyContent:'flex-end', gap:'1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem'}}>
                <button type="button" className="pm-btn pm-btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                <button type="submit" className="pm-btn pm-btn-primary" disabled={isSubmitting}>
                  <Check size={16}/> {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Record' : 'Save Document')}
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RegisterDocument;
