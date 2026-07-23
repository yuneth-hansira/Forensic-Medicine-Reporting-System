import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AlertCircle, Check } from 'lucide-react';
import { toxicologyService } from '../../services/toxicologyService';
import '../patients/patients.css';
import { authService } from '../../services/authService';
import { canCreate, canEdit, canDelete } from '../../utils/permissions';

const RegisterToxicology = () => {
  const user = authService.getUser();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Specimen_ID: '',
    Substance_Tested: '',
    Result: '',
    Analyst_Name: '',
    Test_Date: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchRecord = async () => {
        try {
          const data = await toxicologyService.getReportById(id);
          setForm({
            Specimen_ID: data.Specimen_ID || '',
            Substance_Tested: data.Substance_Tested || '',
            Result: data.Result || '',
            Analyst_Name: data.Analyst_Name || '',
            Test_Date: data.Test_Date ? data.Test_Date.split('T')[0] : ''
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

      if (isEditMode) {
        await toxicologyService.updateReport(id, payload);
        alert('Toxicology report updated successfully!');
        navigate(`/toxicology/${id}`);
      } else {
        await toxicologyService.createReport(payload);
        alert('Toxicology report registered successfully!');
        navigate('/toxicology');
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
              <Link to="/toxicology">Toxicology</Link><span>/</span><span>{isEditMode ? 'Edit Report' : 'Add Report'}</span>
            </div>
            <h1 className="pm-page-title">{isEditMode ? 'Edit Report' : 'Add Report'}</h1>
            <p className="pm-page-subtitle">{isEditMode ? 'Update chemical analysis findings' : 'Log new toxicological findings for a specimen'}</p>
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
                  <label className="pm-label">Substance Tested</label>
                  <input 
                    className="pm-input" 
                    value={form.Substance_Tested} 
                    onChange={(e) => handleChange('Substance_Tested', e.target.value)}
                    placeholder="e.g. Blood Alcohol, Heavy Metals, Narcotics"
                  />
                </div>
              </div>

              <div className="pm-form-grid-2" style={{marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div className="pm-form-group">
                  <label className="pm-label">Analyst Name</label>
                  <input 
                    className="pm-input" 
                    value={form.Analyst_Name} 
                    onChange={(e) => handleChange('Analyst_Name', e.target.value)}
                    placeholder="e.g. Dr. A. Silva"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Test Date</label>
                  <input 
                    type="date"
                    className="pm-input" 
                    value={form.Test_Date} 
                    onChange={(e) => handleChange('Test_Date', e.target.value)}
                  />
                </div>
              </div>

              <div className="pm-form-group" style={{marginBottom: '2rem'}}>
                <label className="pm-label">Result / Findings</label>
                <textarea 
                  className="pm-input" 
                  style={{minHeight: '120px', resize: 'vertical'}}
                  value={form.Result} 
                  onChange={(e) => handleChange('Result', e.target.value)}
                  placeholder="Detailed chemical analysis results..."
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

export default RegisterToxicology;
