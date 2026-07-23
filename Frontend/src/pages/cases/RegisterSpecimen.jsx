import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AlertCircle, Check } from 'lucide-react';
import { specimenService } from '../../services/specimenService';
import '../patients/patients.css';
import { authService } from '../../services/authService';
import { canCreate, canEdit, canDelete } from '../../utils/permissions';

const RegisterSpecimen = () => {
  const user = authService.getUser();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    PM_Finding_ID: '',
    Specimen_Type: '',
    Collection_Date: '',
    Storage_Location: '',
    Chain_Of_Custody_No: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchRecord = async () => {
        try {
          const data = await specimenService.getSpecimenById(id);
          setForm({
            PM_Finding_ID: data.PM_Finding_ID || '',
            Specimen_Type: data.Specimen_Type || '',
            Collection_Date: data.Collection_Date ? data.Collection_Date.split('T')[0] : '',
            Storage_Location: data.Storage_Location || '',
            Chain_Of_Custody_No: data.Chain_Of_Custody_No || ''
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
        await specimenService.updateSpecimen(id, payload);
        alert('Specimen updated successfully!');
        navigate(`/specimens/${id}`);
      } else {
        await specimenService.createSpecimen(payload);
        alert('Specimen registered successfully!');
        navigate('/specimens');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'register'} specimen`);
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
              <Link to="/specimens">Specimens</Link><span>/</span><span>{isEditMode ? 'Edit Specimen' : 'Add Specimen'}</span>
            </div>
            <h1 className="pm-page-title">{isEditMode ? 'Edit Specimen' : 'Add Specimen'}</h1>
            <p className="pm-page-subtitle">{isEditMode ? 'Update sample details' : 'Log new biological sample or evidence for testing'}</p>
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
                  <label className="pm-label required">Postmortem Finding ID</label>
                  <input 
                    required
                    type="number"
                    className="pm-input" 
                    value={form.PM_Finding_ID} 
                    onChange={(e) => handleChange('PM_Finding_ID', e.target.value)} 
                    placeholder="e.g. 101"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Specimen Type</label>
                  <input 
                    className="pm-input" 
                    value={form.Specimen_Type} 
                    onChange={(e) => handleChange('Specimen_Type', e.target.value)}
                    placeholder="e.g. Blood, Urine, Tissue Sample"
                  />
                </div>
              </div>

              <div className="pm-form-grid-2" style={{marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div className="pm-form-group">
                  <label className="pm-label">Collection Date</label>
                  <input 
                    type="date"
                    className="pm-input" 
                    value={form.Collection_Date} 
                    onChange={(e) => handleChange('Collection_Date', e.target.value)}
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Storage Location</label>
                  <input 
                    className="pm-input" 
                    value={form.Storage_Location} 
                    onChange={(e) => handleChange('Storage_Location', e.target.value)}
                    placeholder="e.g. Freezer B, Shelf 2"
                  />
                </div>
              </div>

              <div className="pm-form-group" style={{marginBottom: '2rem'}}>
                <label className="pm-label">Chain Of Custody Number</label>
                <input 
                  className="pm-input" 
                  value={form.Chain_Of_Custody_No} 
                  onChange={(e) => handleChange('Chain_Of_Custody_No', e.target.value)}
                  placeholder="e.g. COC-2023-4451"
                />
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

export default RegisterSpecimen;
