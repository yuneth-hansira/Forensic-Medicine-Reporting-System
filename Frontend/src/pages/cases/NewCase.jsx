import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AlertCircle, Check } from 'lucide-react';
import { caseService } from '../../services/caseService';
import '../patients/patients.css';

const NewCase = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Case_Type: '',
    MLEF_No_or_PM_No: '',
    Case_Status: 'Open',
    Date_Registered: new Date().toISOString().split('T')[0]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchCase = async () => {
        try {
          const data = await caseService.getCaseById(id);
          setForm({
            Case_Type: data.Case_Type || '',
            MLEF_No_or_PM_No: data.MLEF_No_or_PM_No || '',
            Case_Status: data.Case_Status || 'Open',
            Date_Registered: data.Date_Registered ? data.Date_Registered.substring(0, 10) : ''
          });
        } catch (err) {
          console.error(err);
          setError("Failed to load case data for editing");
        } finally {
          setIsLoadingData(false);
        }
      };
      fetchCase();
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
      };

      if (isEditMode) {
        await caseService.updateCase(id, payload);
        alert('Case updated successfully!');
        navigate(`/cases/${id}`);
      } else {
        const response = await caseService.createCase(payload);
        alert('Case registered successfully! Case ID: C-' + response.caseId);
        navigate('/cases');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'register'} case`);
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
              <Link to="/cases">Cases</Link><span>/</span><span>{isEditMode ? 'Edit Case' : 'Register New Case'}</span>
            </div>
            <h1 className="pm-page-title">{isEditMode ? 'Edit Case Details' : 'Register New Case'}</h1>
            <p className="pm-page-subtitle">{isEditMode ? 'Update case details in the database' : 'Enter case details to register in the database'}</p>
          </div>
        </div>

        {error && (
          <div style={{background:'#fee2e2', color:'#ef4444', padding:'1rem', borderRadius:'8px', marginBottom:'1.5rem', display:'flex', alignItems:'center', gap:'0.75rem'}}>
            <AlertCircle size={20}/> {error}
          </div>
        )}

        {isLoadingData ? (
          <div style={{textAlign:'center', padding:'3rem', color:'#64748b'}}>Loading case data...</div>
        ) : (
          <div className="pm-card" style={{maxWidth: '800px', margin: '0 auto'}}>
            <form onSubmit={handleSubmit} style={{padding: '2rem'}}>
              
              <div className="pm-form-grid-2" style={{marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div className="pm-form-group">
                  <label className="pm-label required">Case Type</label>
                  <select 
                    required
                    className="pm-select" 
                    value={form.Case_Type} 
                    onChange={(e) => handleChange('Case_Type', e.target.value)}
                  >
                    <option value="">Select Case Type</option>
                    <option value="Medico-Legal">Medico-Legal</option>
                    <option value="Postmortem">Postmortem</option>
                    <option value="Clinical">Clinical</option>
                    <option value="Toxicology">Toxicology</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="pm-form-group">
                  <label className="pm-label required">Ref No (MLEF / PM No)</label>
                  <input 
                    required
                    className="pm-input" 
                    value={form.MLEF_No_or_PM_No} 
                    onChange={(e) => handleChange('MLEF_No_or_PM_No', e.target.value)} 
                    placeholder="e.g. MLE-892"
                  />
                </div>
              </div>

              <div className="pm-form-grid-2" style={{marginBottom: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div className="pm-form-group">
                  <label className="pm-label required">Date Registered</label>
                  <input 
                    required
                    type="date" 
                    className="pm-input" 
                    value={form.Date_Registered} 
                    onChange={(e) => handleChange('Date_Registered', e.target.value)}
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label required">Case Status</label>
                  <select 
                    required
                    className="pm-select" 
                    value={form.Case_Status} 
                    onChange={(e) => handleChange('Case_Status', e.target.value)}
                  >
                    <option value="Open">Open</option>
                    <option value="Pending">Pending</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div style={{display:'flex', justifyContent:'flex-end', gap:'1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem'}}>
                <button type="button" className="pm-btn pm-btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                <button type="submit" className="pm-btn pm-btn-primary" disabled={isSubmitting}>
                  <Check size={16}/> {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Case' : 'Register Case')}
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default NewCase;
