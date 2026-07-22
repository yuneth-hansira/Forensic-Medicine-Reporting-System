import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AlertCircle, Check } from 'lucide-react';
import { courtInfoService } from '../../services/courtInfoService';
import '../patients/patients.css';

const RegisterCourtInfo = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Case_ID: '',
    Court_Name: '',
    Magistrate_Name: '',
    Case_Number: '',
    Date_Of_Trial: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchCourtInfo = async () => {
        try {
          const data = await courtInfoService.getCourtInfoById(id);
          setForm({
            Case_ID: data.Case_ID || '',
            Court_Name: data.Court_Name || '',
            Magistrate_Name: data.Magistrate_Name || '',
            Case_Number: data.Case_Number || '',
            Date_Of_Trial: data.Date_Of_Trial ? data.Date_Of_Trial.substring(0, 10) : ''
          });
        } catch (err) {
          console.error(err);
          setError("Failed to load court info for editing");
        } finally {
          setIsLoadingData(false);
        }
      };
      fetchCourtInfo();
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
        Date_Of_Trial: form.Date_Of_Trial === '' ? null : form.Date_Of_Trial
      };

      if (isEditMode) {
        await courtInfoService.updateCourtInfo(id, payload);
        alert('Court info updated successfully!');
        navigate(`/court-info`);
      } else {
        await courtInfoService.createCourtInfo(payload);
        alert('Court info registered successfully!');
        navigate('/court-info');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'register'} court info`);
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
              <Link to="/court-info">Court Info</Link><span>/</span><span>{isEditMode ? 'Edit Court Info' : 'Add Court Info'}</span>
            </div>
            <h1 className="pm-page-title">{isEditMode ? 'Edit Court Information' : 'Add Court Information'}</h1>
            <p className="pm-page-subtitle">{isEditMode ? 'Update court details in the database' : 'Enter court details to link to a case'}</p>
          </div>
        </div>

        {error && (
          <div style={{background:'#fee2e2', color:'#ef4444', padding:'1rem', borderRadius:'8px', marginBottom:'1.5rem', display:'flex', alignItems:'center', gap:'0.75rem'}}>
            <AlertCircle size={20}/> {error}
          </div>
        )}

        {isLoadingData ? (
          <div style={{textAlign:'center', padding:'3rem', color:'#64748b'}}>Loading court data...</div>
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
                  disabled={isEditMode} // Usually you don't change the linked case once created
                  style={isEditMode ? {backgroundColor: '#f1f5f9'} : {}}
                />
              </div>

              <div className="pm-form-grid-2" style={{marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div className="pm-form-group">
                  <label className="pm-label">Court Name</label>
                  <input 
                    className="pm-input" 
                    value={form.Court_Name} 
                    onChange={(e) => handleChange('Court_Name', e.target.value)}
                    placeholder="e.g. High Court Kandy"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Magistrate Name</label>
                  <input 
                    className="pm-input" 
                    value={form.Magistrate_Name} 
                    onChange={(e) => handleChange('Magistrate_Name', e.target.value)}
                    placeholder="e.g. Mr. S. Silva"
                  />
                </div>
              </div>

              <div className="pm-form-grid-2" style={{marginBottom: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div className="pm-form-group">
                  <label className="pm-label">Court Case Number</label>
                  <input 
                    className="pm-input" 
                    value={form.Case_Number} 
                    onChange={(e) => handleChange('Case_Number', e.target.value)} 
                    placeholder="e.g. HC-2026/89"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Date of Trial</label>
                  <input 
                    type="date"
                    className="pm-input" 
                    value={form.Date_Of_Trial} 
                    onChange={(e) => handleChange('Date_Of_Trial', e.target.value)}
                  />
                </div>
              </div>

              <div style={{display:'flex', justifyContent:'flex-end', gap:'1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem'}}>
                <button type="button" className="pm-btn pm-btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                <button type="submit" className="pm-btn pm-btn-primary" disabled={isSubmitting}>
                  <Check size={16}/> {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Record' : 'Save Court Info')}
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RegisterCourtInfo;
