import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AlertCircle, Check } from 'lucide-react';
import { wardService } from '../../services/wardService';
import '../patients/patients.css';
import { authService } from '../../services/authService';
import { canCreate, canEdit, canDelete } from '../../utils/permissions';

const RegisterWard = () => {
  const user = authService.getUser();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Hospital_ID: '',
    Ward_No: '',
    Ward_Name: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchRecord = async () => {
        try {
          const data = await wardService.getWardById(id);
          setForm({
            Hospital_ID: data.Hospital_ID || '',
            Ward_No: data.Ward_No || '',
            Ward_Name: data.Ward_Name || ''
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
        await wardService.updateWard(id, payload);
        alert('Ward updated successfully!');
        navigate(`/wards/${id}`);
      } else {
        await wardService.createWard(payload);
        alert('Ward registered successfully!');
        navigate('/wards');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'register'} ward`);
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
              <Link to="/wards">Wards</Link><span>/</span><span>{isEditMode ? 'Edit Ward' : 'Add Ward'}</span>
            </div>
            <h1 className="pm-page-title">{isEditMode ? 'Edit Ward Record' : 'Add Ward Record'}</h1>
            <p className="pm-page-subtitle">{isEditMode ? 'Update ward details in the database' : 'Enter ward details linked to a hospital'}</p>
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
                <label className="pm-label required">Linked Hospital ID</label>
                <input 
                  required
                  type="number"
                  className="pm-input" 
                  value={form.Hospital_ID} 
                  onChange={(e) => handleChange('Hospital_ID', e.target.value)} 
                  placeholder="e.g. 1"
                  disabled={isEditMode}
                  style={isEditMode ? {backgroundColor: '#f1f5f9'} : {}}
                />
              </div>

              <div className="pm-form-grid-2" style={{marginBottom: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div className="pm-form-group">
                  <label className="pm-label">Ward No</label>
                  <input 
                    className="pm-input" 
                    value={form.Ward_No} 
                    onChange={(e) => handleChange('Ward_No', e.target.value)} 
                    placeholder="e.g. 12B"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Ward Name</label>
                  <input 
                    className="pm-input" 
                    value={form.Ward_Name} 
                    onChange={(e) => handleChange('Ward_Name', e.target.value)} 
                    placeholder="e.g. Intensive Care Unit"
                  />
                </div>
              </div>

              <div style={{display:'flex', justifyContent:'flex-end', gap:'1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem'}}>
                <button type="button" className="pm-btn pm-btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                <button type="submit" className="pm-btn pm-btn-primary" disabled={isSubmitting}>
                  <Check size={16}/> {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Record' : 'Save Ward')}
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RegisterWard;
