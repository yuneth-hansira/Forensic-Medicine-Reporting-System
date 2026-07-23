import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AlertCircle, Check } from 'lucide-react';
import { doctorService } from '../../services/doctorService';
import '../patients/patients.css';
import { authService } from '../../services/authService';
import { canCreate, canEdit, canDelete } from '../../utils/permissions';

const RegisterDoctor = () => {
  const user = authService.getUser();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    User_ID: '',
    Name: '',
    Designation: '',
    SLMC_Reg_No: '',
    Contact_No: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchRecord = async () => {
        try {
          const data = await doctorService.getDoctorById(id);
          setForm({
            User_ID: data.User_ID || '',
            Name: data.Name || '',
            Designation: data.Designation || '',
            SLMC_Reg_No: data.SLMC_Reg_No || '',
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
      
      const payload = { 
          ...form,
          User_ID: form.User_ID === '' ? null : form.User_ID
      };

      if (isEditMode) {
        await doctorService.updateDoctor(id, payload);
        alert('Doctor updated successfully!');
        navigate(`/doctors/${id}`);
      } else {
        await doctorService.createDoctor(payload);
        alert('Doctor registered successfully!');
        navigate('/doctors');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'register'} doctor`);
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
              <Link to="/doctors">Doctors</Link><span>/</span><span>{isEditMode ? 'Edit Doctor' : 'Add Doctor'}</span>
            </div>
            <h1 className="pm-page-title">{isEditMode ? 'Edit Doctor Profile' : 'Add Doctor Profile'}</h1>
            <p className="pm-page-subtitle">{isEditMode ? 'Update medical staff details' : 'Register a new doctor in the system'}</p>
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
                <label className="pm-label required">Full Name</label>
                <input 
                  required
                  className="pm-input" 
                  value={form.Name} 
                  onChange={(e) => handleChange('Name', e.target.value)} 
                  placeholder="e.g. Dr. John Doe"
                />
              </div>

              <div className="pm-form-grid-2" style={{marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div className="pm-form-group">
                  <label className="pm-label">Designation</label>
                  <input 
                    className="pm-input" 
                    value={form.Designation} 
                    onChange={(e) => handleChange('Designation', e.target.value)} 
                    placeholder="e.g. Senior Medical Officer"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">SLMC Registration No</label>
                  <input 
                    className="pm-input" 
                    value={form.SLMC_Reg_No} 
                    onChange={(e) => handleChange('SLMC_Reg_No', e.target.value)} 
                    placeholder="e.g. 12345"
                  />
                </div>
              </div>

              <div className="pm-form-grid-2" style={{marginBottom: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div className="pm-form-group">
                  <label className="pm-label">Contact Number</label>
                  <input 
                    className="pm-input" 
                    value={form.Contact_No} 
                    onChange={(e) => handleChange('Contact_No', e.target.value)}
                    placeholder="e.g. +94 77 123 4567"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Linked User ID (Optional)</label>
                  <input 
                    type="number"
                    className="pm-input" 
                    value={form.User_ID} 
                    onChange={(e) => handleChange('User_ID', e.target.value)}
                    placeholder="e.g. 1"
                  />
                  <small style={{display:'block', marginTop:'0.25rem', color:'#64748b'}}>Leave blank if this doctor doesn't have a system account.</small>
                </div>
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

export default RegisterDoctor;
