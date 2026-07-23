import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AlertCircle, Check } from 'lucide-react';
import { hospitalService } from '../../services/hospitalService';
import '../patients/patients.css';
import { authService } from '../../services/authService';
import { canCreate, canEdit, canDelete } from '../../utils/permissions';

const RegisterHospital = () => {
  const user = authService.getUser();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Hospital_Name: '',
    Address: '',
    Contact_No: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchRecord = async () => {
        try {
          const data = await hospitalService.getHospitalById(id);
          setForm({
            Hospital_Name: data.Hospital_Name || '',
            Address: data.Address || '',
            Contact_No: data.Contact_No || ''
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
        await hospitalService.updateHospital(id, payload);
        alert('Hospital updated successfully!');
        navigate(`/hospitals/${id}`);
      } else {
        await hospitalService.createHospital(payload);
        alert('Hospital registered successfully!');
        navigate('/hospitals');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'register'} hospital`);
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
              <Link to="/hospitals">Hospitals</Link><span>/</span><span>{isEditMode ? 'Edit Hospital' : 'Add Hospital'}</span>
            </div>
            <h1 className="pm-page-title">{isEditMode ? 'Edit Hospital Record' : 'Add Hospital Record'}</h1>
            <p className="pm-page-subtitle">{isEditMode ? 'Update hospital details in the database' : 'Enter a new hospital record'}</p>
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
                <label className="pm-label required">Hospital Name</label>
                <input 
                  required
                  className="pm-input" 
                  value={form.Hospital_Name} 
                  onChange={(e) => handleChange('Hospital_Name', e.target.value)} 
                  placeholder="e.g. National Hospital of Sri Lanka"
                />
              </div>

              <div className="pm-form-group" style={{marginBottom: '1.5rem'}}>
                <label className="pm-label">Contact Number</label>
                <input 
                  className="pm-input" 
                  value={form.Contact_No} 
                  onChange={(e) => handleChange('Contact_No', e.target.value)} 
                  placeholder="e.g. +94 11 269 1111"
                />
              </div>

              <div className="pm-form-group" style={{marginBottom: '2rem'}}>
                <label className="pm-label">Address</label>
                <textarea 
                  className="pm-input" 
                  value={form.Address} 
                  onChange={(e) => handleChange('Address', e.target.value)}
                  placeholder="Full address..."
                  rows={3}
                />
              </div>

              <div style={{display:'flex', justifyContent:'flex-end', gap:'1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem'}}>
                <button type="button" className="pm-btn pm-btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                <button type="submit" className="pm-btn pm-btn-primary" disabled={isSubmitting}>
                  <Check size={16}/> {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Record' : 'Save Hospital')}
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RegisterHospital;
