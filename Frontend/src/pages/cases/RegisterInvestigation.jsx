import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AlertCircle, Check } from 'lucide-react';
import { investigationService } from '../../services/investigationService';
import '../patients/patients.css';

const RegisterInvestigation = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Case_ID: '',
    Type: '',
    Institution_Referred: '',
    Result: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchRecord = async () => {
        try {
          const data = await investigationService.getInvestigationById(id);
          setForm({
            Case_ID: data.Case_ID || '',
            Type: data.Type || '',
            Institution_Referred: data.Institution_Referred || '',
            Result: data.Result || ''
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
        await investigationService.updateInvestigation(id, payload);
        alert('Investigation updated successfully!');
        navigate(`/investigations/${id}`);
      } else {
        await investigationService.createInvestigation(payload);
        alert('Investigation registered successfully!');
        navigate('/investigations');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'register'} investigation`);
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
              <Link to="/investigations">Investigations</Link><span>/</span><span>{isEditMode ? 'Edit Investigation' : 'Add Investigation'}</span>
            </div>
            <h1 className="pm-page-title">{isEditMode ? 'Edit Investigation' : 'Add Investigation'}</h1>
            <p className="pm-page-subtitle">{isEditMode ? 'Update investigation details' : 'Register a new case investigation'}</p>
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
                  <label className="pm-label required">Case ID</label>
                  <input 
                    required
                    type="number"
                    className="pm-input" 
                    value={form.Case_ID} 
                    onChange={(e) => handleChange('Case_ID', e.target.value)} 
                    placeholder="e.g. 101"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Investigation Type</label>
                  <input 
                    className="pm-input" 
                    value={form.Type} 
                    onChange={(e) => handleChange('Type', e.target.value)}
                    placeholder="e.g. Blood Test, DNA Analysis"
                  />
                </div>
              </div>

              <div className="pm-form-group" style={{marginBottom: '1.5rem'}}>
                <label className="pm-label">Institution Referred</label>
                <input 
                  className="pm-input" 
                  value={form.Institution_Referred} 
                  onChange={(e) => handleChange('Institution_Referred', e.target.value)}
                  placeholder="e.g. Government Analyst Department"
                />
              </div>

              <div className="pm-form-group" style={{marginBottom: '2rem'}}>
                <label className="pm-label">Investigation Result</label>
                <textarea 
                  className="pm-input" 
                  style={{minHeight: '120px', resize: 'vertical'}}
                  value={form.Result} 
                  onChange={(e) => handleChange('Result', e.target.value)}
                  placeholder="Enter the findings/results of the investigation..."
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

export default RegisterInvestigation;
