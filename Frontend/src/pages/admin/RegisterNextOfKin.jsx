import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AlertCircle, Check } from 'lucide-react';
import { kinService } from '../../services/kinService';
import '../patients/patients.css';
import { authService } from '../../services/authService';
import { canCreate, canEdit, canDelete } from '../../utils/permissions';

const RegisterNextOfKin = () => {
  const user = authService.getUser();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Deceased_ID: '',
    Full_Name: '',
    Relationship: '',
    Contact_No: '',
    Address: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchRecord = async () => {
        try {
          const data = await kinService.getNextOfKinById(id);
          setForm({
            Deceased_ID: data.Deceased_ID || '',
            Full_Name: data.Full_Name || '',
            Relationship: data.Relationship || '',
            Contact_No: data.Contact_No || '',
            Address: data.Address || ''
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
        await kinService.updateNextOfKin(id, payload);
        alert('Record updated successfully!');
        navigate(`/next-of-kin/${id}`);
      } else {
        await kinService.createNextOfKin(payload);
        alert('Record registered successfully!');
        navigate('/next-of-kin');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'register'} record`);
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
              <Link to="/next-of-kin">Next of Kin</Link><span>/</span><span>{isEditMode ? 'Edit Record' : 'Add Record'}</span>
            </div>
            <h1 className="pm-page-title">{isEditMode ? 'Edit Next of Kin Record' : 'Add Next of Kin Record'}</h1>
            <p className="pm-page-subtitle">{isEditMode ? 'Update details in the database' : 'Enter next of kin details for a deceased individual'}</p>
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
                <label className="pm-label required">Linked Deceased ID</label>
                <input 
                  required
                  type="number"
                  className="pm-input" 
                  value={form.Deceased_ID} 
                  onChange={(e) => handleChange('Deceased_ID', e.target.value)} 
                  placeholder="e.g. 1"
                  disabled={isEditMode}
                  style={isEditMode ? {backgroundColor: '#f1f5f9'} : {}}
                />
              </div>

              <div className="pm-form-grid-2" style={{marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div className="pm-form-group">
                  <label className="pm-label required">Full Name</label>
                  <input 
                    required
                    className="pm-input" 
                    value={form.Full_Name} 
                    onChange={(e) => handleChange('Full_Name', e.target.value)} 
                    placeholder="e.g. Jane Doe"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Relationship to Deceased</label>
                  <input 
                    className="pm-input" 
                    value={form.Relationship} 
                    onChange={(e) => handleChange('Relationship', e.target.value)} 
                    placeholder="e.g. Spouse, Sibling"
                  />
                </div>
              </div>

              <div className="pm-form-group" style={{marginBottom: '1.5rem'}}>
                <label className="pm-label">Contact Number</label>
                <input 
                  className="pm-input" 
                  value={form.Contact_No} 
                  onChange={(e) => handleChange('Contact_No', e.target.value)}
                  placeholder="e.g. +94 77 123 4567"
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

export default RegisterNextOfKin;
