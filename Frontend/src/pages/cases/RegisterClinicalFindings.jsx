import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AlertCircle, Check } from 'lucide-react';
import { clinicalFindingsService } from '../../services/clinicalFindingsService';
import '../patients/patients.css';

const RegisterClinicalFindings = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Case_ID: '',
    Nature_Of_Bodily_Harm: '',
    Internal_Injuries: '',
    Category_Of_Hurt: '',
    Alcohol_Drug_Test: '',
    Sexual_Assault_Findings: '',
    Remarks: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchRecord = async () => {
        try {
          const data = await clinicalFindingsService.getClinicalFindingById(id);
          setForm({
            Case_ID: data.Case_ID || '',
            Nature_Of_Bodily_Harm: data.Nature_Of_Bodily_Harm || '',
            Internal_Injuries: data.Internal_Injuries || '',
            Category_Of_Hurt: data.Category_Of_Hurt || '',
            Alcohol_Drug_Test: data.Alcohol_Drug_Test || '',
            Sexual_Assault_Findings: data.Sexual_Assault_Findings || '',
            Remarks: data.Remarks || ''
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
        await clinicalFindingsService.updateClinicalFinding(id, payload);
        alert('Clinical findings updated successfully!');
        navigate(`/clinical-findings/${id}`);
      } else {
        await clinicalFindingsService.createClinicalFinding(payload);
        alert('Clinical findings registered successfully!');
        navigate('/clinical-findings');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'register'} clinical findings`);
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
              <Link to="/clinical-findings">Clinical Findings</Link><span>/</span><span>{isEditMode ? 'Edit Findings' : 'Add Findings'}</span>
            </div>
            <h1 className="pm-page-title">{isEditMode ? 'Edit Clinical Findings' : 'Add Clinical Findings'}</h1>
            <p className="pm-page-subtitle">{isEditMode ? 'Update clinical records in the database' : 'Enter clinical records linked to a case'}</p>
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
                  <label className="pm-label">Category of Hurt</label>
                  <select 
                    className="pm-select" 
                    value={form.Category_Of_Hurt} 
                    onChange={(e) => handleChange('Category_Of_Hurt', e.target.value)}
                  >
                    <option value="">Select Category</option>
                    <option value="Non-Grievous">Non-Grievous</option>
                    <option value="Grievous">Grievous</option>
                    <option value="Fatal">Fatal</option>
                  </select>
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Alcohol / Drug Test Status</label>
                  <input 
                    className="pm-input" 
                    value={form.Alcohol_Drug_Test} 
                    onChange={(e) => handleChange('Alcohol_Drug_Test', e.target.value)}
                    placeholder="e.g. Pending, Positive for Alcohol"
                  />
                </div>
              </div>

              <div className="pm-form-group" style={{marginBottom: '1.5rem'}}>
                <label className="pm-label">Nature of Bodily Harm</label>
                <input 
                  className="pm-input" 
                  value={form.Nature_Of_Bodily_Harm} 
                  onChange={(e) => handleChange('Nature_Of_Bodily_Harm', e.target.value)}
                  placeholder="e.g. Blunt force trauma to head"
                />
              </div>

              <div className="pm-form-group" style={{marginBottom: '1.5rem'}}>
                <label className="pm-label">Internal Injuries</label>
                <textarea 
                  className="pm-input" 
                  value={form.Internal_Injuries} 
                  onChange={(e) => handleChange('Internal_Injuries', e.target.value)}
                  placeholder="Describe internal injuries..."
                  rows={3}
                />
              </div>

              <div className="pm-form-group" style={{marginBottom: '1.5rem'}}>
                <label className="pm-label">Sexual Assault Findings</label>
                <textarea 
                  className="pm-input" 
                  value={form.Sexual_Assault_Findings} 
                  onChange={(e) => handleChange('Sexual_Assault_Findings', e.target.value)}
                  placeholder="Describe sexual assault findings if applicable..."
                  rows={3}
                />
              </div>

              <div className="pm-form-group" style={{marginBottom: '2rem'}}>
                <label className="pm-label">General Remarks</label>
                <textarea 
                  className="pm-input" 
                  value={form.Remarks} 
                  onChange={(e) => handleChange('Remarks', e.target.value)}
                  placeholder="Any additional remarks..."
                  rows={3}
                />
              </div>

              <div style={{display:'flex', justifyContent:'flex-end', gap:'1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem'}}>
                <button type="button" className="pm-btn pm-btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                <button type="submit" className="pm-btn pm-btn-primary" disabled={isSubmitting}>
                  <Check size={16}/> {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Record' : 'Save Findings')}
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RegisterClinicalFindings;
