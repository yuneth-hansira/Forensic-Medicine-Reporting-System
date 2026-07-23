import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AlertCircle, Check } from 'lucide-react';
import { examineeService } from '../../services/examineeService';
import '../patients/patients.css';
import { authService } from '../../services/authService';
import { canCreate, canEdit, canDelete } from '../../utils/permissions';

const RegisterExaminee = () => {
  const user = authService.getUser();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Case_ID: '',
    Full_Name: '',
    Sex: '',
    Age: '',
    NIC_Passport: '',
    Address: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchExaminee = async () => {
        try {
          const data = await examineeService.getExamineeById(id);
          setForm({
            Case_ID: data.Case_ID || '',
            Full_Name: data.Full_Name || '',
            Sex: data.Sex || '',
            Age: data.Age || '',
            NIC_Passport: data.NIC_Passport || '',
            Address: data.Address || ''
          });
        } catch (err) {
          console.error(err);
          setError("Failed to load examinee data for editing");
        } finally {
          setIsLoadingData(false);
        }
      };
      fetchExaminee();
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
        Age: form.Age === '' ? null : form.Age,
      };

      if (isEditMode) {
        await examineeService.updateExaminee(id, payload);
        alert('Examinee updated successfully!');
        navigate(`/examinees/${id}`);
      } else {
        const response = await examineeService.createExaminee(payload);
        alert('Examinee registered successfully! Examinee ID: E-' + response.examineeId);
        navigate('/examinees');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'register'} examinee`);
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
              <Link to="/examinees">Examinees</Link><span>/</span><span>{isEditMode ? 'Edit Examinee' : 'Register New Examinee'}</span>
            </div>
            <h1 className="pm-page-title">{isEditMode ? 'Edit Examinee Details' : 'Register New Examinee'}</h1>
            <p className="pm-page-subtitle">{isEditMode ? 'Update examinee details in the database' : 'Enter examinee details to register in the database'}</p>
          </div>
        </div>

        {error && (
          <div style={{background:'#fee2e2', color:'#ef4444', padding:'1rem', borderRadius:'8px', marginBottom:'1.5rem', display:'flex', alignItems:'center', gap:'0.75rem'}}>
            <AlertCircle size={20}/> {error}
          </div>
        )}

        {isLoadingData ? (
          <div style={{textAlign:'center', padding:'3rem', color:'#64748b'}}>Loading examinee data...</div>
        ) : (
          <div className="pm-card" style={{maxWidth: '800px', margin: '0 auto'}}>
            <form onSubmit={handleSubmit} style={{padding: '2rem'}}>
              
              <div className="pm-form-group" style={{marginBottom: '1.5rem'}}>
                <label className="pm-label required">Full Name</label>
                <input 
                  required
                  className="pm-input" 
                  value={form.Full_Name} 
                  onChange={(e) => handleChange('Full_Name', e.target.value)} 
                  placeholder="Enter full name"
                />
              </div>

              <div className="pm-form-grid-2" style={{marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div className="pm-form-group">
                  <label className="pm-label required">Linked Case ID</label>
                  <input 
                    required
                    type="number"
                    className="pm-input" 
                    value={form.Case_ID} 
                    onChange={(e) => handleChange('Case_ID', e.target.value)}
                    placeholder="e.g. 1"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Gender</label>
                  <select 
                    className="pm-select" 
                    value={form.Sex} 
                    onChange={(e) => handleChange('Sex', e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="pm-form-grid-2" style={{marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div className="pm-form-group">
                  <label className="pm-label">Age</label>
                  <input 
                    type="number"
                    className="pm-input" 
                    value={form.Age} 
                    onChange={(e) => handleChange('Age', e.target.value)} 
                    placeholder="e.g. 34"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">NIC / Passport Number</label>
                  <input 
                    className="pm-input" 
                    value={form.NIC_Passport} 
                    onChange={(e) => handleChange('NIC_Passport', e.target.value)}
                    placeholder="e.g. 901234567V"
                  />
                </div>
              </div>

              <div className="pm-form-group" style={{marginBottom: '2rem'}}>
                <label className="pm-label">Address</label>
                <textarea 
                  className="pm-textarea" 
                  rows={3} 
                  value={form.Address} 
                  onChange={(e) => handleChange('Address', e.target.value)} 
                  placeholder="Enter full address"
                />
              </div>

              <div style={{display:'flex', justifyContent:'flex-end', gap:'1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem'}}>
                <button type="button" className="pm-btn pm-btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                <button type="submit" className="pm-btn pm-btn-primary" disabled={isSubmitting}>
                  <Check size={16}/> {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Examinee' : 'Register Examinee')}
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RegisterExaminee;
