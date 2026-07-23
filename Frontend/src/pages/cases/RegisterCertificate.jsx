import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AlertCircle, Check } from 'lucide-react';
import { certificateService } from '../../services/certificateService';
import '../patients/patients.css';
import { authService } from '../../services/authService';
import { canCreate, canEdit, canDelete } from '../../utils/permissions';

const RegisterCertificate = () => {
  const user = authService.getUser();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Report_ID: '',
    Case_ID: '',
    Doctor_ID: '',
    Court_Reference: '',
    Findings: '',
    Injury_Description: '',
    Conclusion: '',
    Report_Date: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchRecord = async () => {
        try {
          const data = await certificateService.getCertificateById(id);
          setForm({
            Report_ID: data.Report_ID || '',
            Case_ID: data.Case_ID || '',
            Doctor_ID: data.Doctor_ID || '',
            Court_Reference: data.Court_Reference || '',
            Findings: data.Findings || '',
            Injury_Description: data.Injury_Description || '',
            Conclusion: data.Conclusion || '',
            Report_Date: data.Report_Date ? data.Report_Date.substring(0, 10) : ''
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
        Doctor_ID: form.Doctor_ID === '' ? null : form.Doctor_ID,
        Report_Date: form.Report_Date === '' ? null : form.Report_Date
      };

      if (isEditMode) {
        await certificateService.updateCertificate(id, payload);
        alert('Certificate updated successfully!');
        navigate(`/certificates/${id}`);
      } else {
        await certificateService.createCertificate(payload);
        alert('Certificate registered successfully!');
        navigate('/certificates');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'register'} certificate`);
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
              <Link to="/certificates">Certificates</Link><span>/</span><span>{isEditMode ? 'Edit Certificate' : 'Add Certificate'}</span>
            </div>
            <h1 className="pm-page-title">{isEditMode ? 'Edit Certificate of Receipt' : 'Add Certificate of Receipt'}</h1>
            <p className="pm-page-subtitle">{isEditMode ? 'Update certificate details in the database' : 'Enter certificate details linked to a report'}</p>
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
                  <label className="pm-label required">Linked Report ID</label>
                  <input 
                    required
                    type="number"
                    className="pm-input" 
                    value={form.Report_ID} 
                    onChange={(e) => handleChange('Report_ID', e.target.value)} 
                    placeholder="e.g. 1"
                    disabled={isEditMode}
                    style={isEditMode ? {backgroundColor: '#f1f5f9'} : {}}
                  />
                </div>
                <div className="pm-form-group">
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
              </div>

              <div className="pm-form-grid-2" style={{marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div className="pm-form-group">
                  <label className="pm-label">Doctor ID</label>
                  <input 
                    type="number"
                    className="pm-input" 
                    value={form.Doctor_ID} 
                    onChange={(e) => handleChange('Doctor_ID', e.target.value)} 
                    placeholder="e.g. 1"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Court Reference</label>
                  <input 
                    className="pm-input" 
                    value={form.Court_Reference} 
                    onChange={(e) => handleChange('Court_Reference', e.target.value)}
                    placeholder="e.g. MC/123/2024"
                  />
                </div>
              </div>

              <div className="pm-form-group" style={{marginBottom: '1.5rem'}}>
                <label className="pm-label">Findings</label>
                <textarea 
                  className="pm-input" 
                  value={form.Findings} 
                  onChange={(e) => handleChange('Findings', e.target.value)}
                  placeholder="Detailed findings..."
                  rows={3}
                />
              </div>

              <div className="pm-form-group" style={{marginBottom: '1.5rem'}}>
                <label className="pm-label">Injury Description</label>
                <textarea 
                  className="pm-input" 
                  value={form.Injury_Description} 
                  onChange={(e) => handleChange('Injury_Description', e.target.value)}
                  placeholder="Detailed injury description..."
                  rows={3}
                />
              </div>

              <div className="pm-form-group" style={{marginBottom: '1.5rem'}}>
                <label className="pm-label">Conclusion</label>
                <textarea 
                  className="pm-input" 
                  value={form.Conclusion} 
                  onChange={(e) => handleChange('Conclusion', e.target.value)}
                  placeholder="Final conclusion..."
                  rows={3}
                />
              </div>

              <div className="pm-form-group" style={{marginBottom: '2rem'}}>
                <label className="pm-label">Report Date</label>
                <input 
                  type="date"
                  className="pm-input" 
                  value={form.Report_Date} 
                  onChange={(e) => handleChange('Report_Date', e.target.value)}
                />
              </div>

              <div style={{display:'flex', justifyContent:'flex-end', gap:'1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem'}}>
                <button type="button" className="pm-btn pm-btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                <button type="submit" className="pm-btn pm-btn-primary" disabled={isSubmitting}>
                  <Check size={16}/> {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Record' : 'Save Certificate')}
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RegisterCertificate;
