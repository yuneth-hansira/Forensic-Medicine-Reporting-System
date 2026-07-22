import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AlertCircle, Check } from 'lucide-react';
import { consentService } from '../../services/consentService';
import '../patients/patients.css';

const RegisterConsent = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Examinee_ID: '',
    Consent_Type: '',
    Consent_Date: '',
    Signature: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchRecord = async () => {
        try {
          const data = await consentService.getConsentById(id);
          setForm({
            Examinee_ID: data.Examinee_ID || '',
            Consent_Type: data.Consent_Type || '',
            Consent_Date: data.Consent_Date ? data.Consent_Date.substring(0, 10) : '',
            Signature: data.Signature || ''
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
        Consent_Date: form.Consent_Date === '' ? null : form.Consent_Date 
      };

      if (isEditMode) {
        await consentService.updateConsent(id, payload);
        alert('Consent updated successfully!');
        navigate(`/consents/${id}`);
      } else {
        await consentService.createConsent(payload);
        alert('Consent registered successfully!');
        navigate('/consents');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'register'} consent`);
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
              <Link to="/consents">Consents</Link><span>/</span><span>{isEditMode ? 'Edit Consent' : 'Add Consent'}</span>
            </div>
            <h1 className="pm-page-title">{isEditMode ? 'Edit Consent Record' : 'Add Consent Record'}</h1>
            <p className="pm-page-subtitle">{isEditMode ? 'Update consent details in the database' : 'Enter consent details linked to an examinee'}</p>
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
                <label className="pm-label required">Linked Examinee ID</label>
                <input 
                  required
                  type="number"
                  className="pm-input" 
                  value={form.Examinee_ID} 
                  onChange={(e) => handleChange('Examinee_ID', e.target.value)} 
                  placeholder="e.g. 1"
                  disabled={isEditMode}
                  style={isEditMode ? {backgroundColor: '#f1f5f9'} : {}}
                />
              </div>

              <div className="pm-form-grid-2" style={{marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div className="pm-form-group">
                  <label className="pm-label">Consent Type</label>
                  <input 
                    className="pm-input" 
                    value={form.Consent_Type} 
                    onChange={(e) => handleChange('Consent_Type', e.target.value)}
                    placeholder="e.g. Medical Examination, Surgery"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Consent Date</label>
                  <input 
                    type="date"
                    className="pm-input" 
                    value={form.Consent_Date} 
                    onChange={(e) => handleChange('Consent_Date', e.target.value)}
                  />
                </div>
              </div>

              <div className="pm-form-group" style={{marginBottom: '2rem'}}>
                <label className="pm-label">Signature / Reference</label>
                <input 
                  className="pm-input" 
                  value={form.Signature} 
                  onChange={(e) => handleChange('Signature', e.target.value)}
                  placeholder="e.g. Signed physical copy #123"
                />
              </div>

              <div style={{display:'flex', justifyContent:'flex-end', gap:'1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem'}}>
                <button type="button" className="pm-btn pm-btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                <button type="submit" className="pm-btn pm-btn-primary" disabled={isSubmitting}>
                  <Check size={16}/> {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Record' : 'Save Consent')}
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RegisterConsent;
