import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AlertCircle, Check } from 'lucide-react';
import { histopathologyService } from '../../services/histopathologyService';
import '../patients/patients.css';
import { authService } from '../../services/authService';
import { canCreate, canEdit, canDelete } from '../../utils/permissions';

const RegisterHistopathology = () => {
  const user = authService.getUser();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Specimen_ID: '',
    Pathologist_ID: '',
    Tissue_Type: '',
    Findings: '',
    Report_Date: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchRecord = async () => {
        try {
          const data = await histopathologyService.getReportById(id);
          setForm({
            Specimen_ID: data.Specimen_ID || '',
            Pathologist_ID: data.Pathologist_ID || '',
            Tissue_Type: data.Tissue_Type || '',
            Findings: data.Findings || '',
            Report_Date: data.Report_Date ? data.Report_Date.split('T')[0] : ''
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
      
      const payload = { ...form };
      if (!payload.Pathologist_ID) payload.Pathologist_ID = null;

      if (isEditMode) {
        await histopathologyService.updateReport(id, payload);
        alert('Histopathology report updated successfully!');
        navigate(`/histopathology/${id}`);
      } else {
        await histopathologyService.createReport(payload);
        alert('Histopathology report registered successfully!');
        navigate('/histopathology');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'register'} report`);
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
              <Link to="/histopathology">Histopathology</Link><span>/</span><span>{isEditMode ? 'Edit Report' : 'Add Report'}</span>
            </div>
            <h1 className="pm-page-title">{isEditMode ? 'Edit Report' : 'Add Report'}</h1>
            <p className="pm-page-subtitle">{isEditMode ? 'Update pathology findings' : 'Log new histopathology findings for a specimen'}</p>
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
              
              <div className="pm-form-grid-2" style={{marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div className="pm-form-group">
                  <label className="pm-label required">Specimen ID</label>
                  <input 
                    required
                    type="number"
                    className="pm-input" 
                    value={form.Specimen_ID} 
                    onChange={(e) => handleChange('Specimen_ID', e.target.value)} 
                    placeholder="e.g. 101"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Pathologist ID (Optional)</label>
                  <input 
                    type="number"
                    className="pm-input" 
                    value={form.Pathologist_ID} 
                    onChange={(e) => handleChange('Pathologist_ID', e.target.value)}
                    placeholder="e.g. 5"
                  />
                </div>
              </div>

              <div className="pm-form-grid-2" style={{marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div className="pm-form-group">
                  <label className="pm-label">Tissue Type</label>
                  <input 
                    className="pm-input" 
                    value={form.Tissue_Type} 
                    onChange={(e) => handleChange('Tissue_Type', e.target.value)}
                    placeholder="e.g. Liver, Lung Tissue, Skin"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Report Date</label>
                  <input 
                    type="date"
                    className="pm-input" 
                    value={form.Report_Date} 
                    onChange={(e) => handleChange('Report_Date', e.target.value)}
                  />
                </div>
              </div>

              <div className="pm-form-group" style={{marginBottom: '2rem'}}>
                <label className="pm-label">Findings</label>
                <textarea 
                  className="pm-input" 
                  style={{minHeight: '120px', resize: 'vertical'}}
                  value={form.Findings} 
                  onChange={(e) => handleChange('Findings', e.target.value)}
                  placeholder="Detailed microscopic findings and diagnosis..."
                ></textarea>
              </div>

              <div style={{display:'flex', justifyContent:'flex-end', gap:'1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem'}}>
                <button type="button" className="pm-btn pm-btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                <button type="submit" className="pm-btn pm-btn-primary" disabled={isSubmitting}>
                  <Check size={16}/> {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Record' : 'Save Record')}
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RegisterHistopathology;
