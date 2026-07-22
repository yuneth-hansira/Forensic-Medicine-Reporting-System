import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AlertCircle, Check } from 'lucide-react';
import { deceasedService } from '../../services/deceasedService';
import '../patients/patients.css';

const RegisterDeceased = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Case_ID: '',
    Hospital_ID: '',
    Ward_ID: '',
    Full_Name: '',
    Sex: '',
    Age: '',
    BHT_No: '',
    Date_Of_Death: '',
    Place_Of_Death: '',
    Death_Type: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchDeceased = async () => {
        try {
          const data = await deceasedService.getDeceasedById(id);
          setForm({
            Case_ID: data.Case_ID || '',
            Hospital_ID: data.Hospital_ID || '',
            Ward_ID: data.Ward_ID || '',
            Full_Name: data.Full_Name || '',
            Sex: data.Sex || '',
            Age: data.Age || '',
            BHT_No: data.BHT_No || '',
            Date_Of_Death: data.Date_Of_Death ? data.Date_Of_Death.substring(0, 10) : '',
            Place_Of_Death: data.Place_Of_Death || '',
            Death_Type: data.Death_Type || ''
          });
        } catch (err) {
          console.error(err);
          setError("Failed to load record for editing");
        } finally {
          setIsLoadingData(false);
        }
      };
      fetchDeceased();
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
        Hospital_ID: form.Hospital_ID === '' ? null : form.Hospital_ID,
        Ward_ID: form.Ward_ID === '' ? null : form.Ward_ID,
        Age: form.Age === '' ? null : form.Age,
      };

      if (isEditMode) {
        await deceasedService.updateDeceased(id, payload);
        alert('Record updated successfully!');
        navigate(`/deceased/${id}`);
      } else {
        const response = await deceasedService.createDeceased(payload);
        alert('Record registered successfully! ID: D-' + response.deceasedId);
        navigate('/deceased');
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
              <Link to="/deceased">Deceased</Link><span>/</span><span>{isEditMode ? 'Edit Record' : 'Register Deceased'}</span>
            </div>
            <h1 className="pm-page-title">{isEditMode ? 'Edit Deceased Record' : 'Register Deceased Record'}</h1>
            <p className="pm-page-subtitle">{isEditMode ? 'Update deceased details in the database' : 'Enter deceased details to register in the database'}</p>
          </div>
        </div>

        {error && (
          <div style={{background:'#fee2e2', color:'#ef4444', padding:'1rem', borderRadius:'8px', marginBottom:'1.5rem', display:'flex', alignItems:'center', gap:'0.75rem'}}>
            <AlertCircle size={20}/> {error}
          </div>
        )}

        {isLoadingData ? (
          <div style={{textAlign:'center', padding:'3rem', color:'#64748b'}}>Loading record data...</div>
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
                    placeholder="e.g. 45"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">BHT No (Bed Head Ticket)</label>
                  <input 
                    className="pm-input" 
                    value={form.BHT_No} 
                    onChange={(e) => handleChange('BHT_No', e.target.value)}
                    placeholder="e.g. BHT-902"
                  />
                </div>
              </div>

              <div className="pm-form-grid-2" style={{marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div className="pm-form-group">
                  <label className="pm-label">Date of Death</label>
                  <input 
                    type="date"
                    className="pm-input" 
                    value={form.Date_Of_Death} 
                    onChange={(e) => handleChange('Date_Of_Death', e.target.value)} 
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Death Type</label>
                  <select 
                    className="pm-select" 
                    value={form.Death_Type} 
                    onChange={(e) => handleChange('Death_Type', e.target.value)}
                  >
                    <option value="">Select Type</option>
                    <option value="Natural">Natural</option>
                    <option value="Accident">Accident</option>
                    <option value="Homicide">Homicide</option>
                    <option value="Suicide">Suicide</option>
                    <option value="Undetermined">Undetermined</option>
                  </select>
                </div>
              </div>

              <div className="pm-form-group" style={{marginBottom: '1.5rem'}}>
                <label className="pm-label">Place of Death</label>
                <input 
                  className="pm-input" 
                  value={form.Place_Of_Death} 
                  onChange={(e) => handleChange('Place_Of_Death', e.target.value)} 
                  placeholder="Enter location"
                />
              </div>

              <div className="pm-form-grid-2" style={{marginBottom: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div className="pm-form-group">
                  <label className="pm-label">Hospital ID (Optional)</label>
                  <input 
                    type="number"
                    className="pm-input" 
                    value={form.Hospital_ID} 
                    onChange={(e) => handleChange('Hospital_ID', e.target.value)} 
                    placeholder="e.g. 1"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Ward ID (Optional)</label>
                  <input 
                    type="number"
                    className="pm-input" 
                    value={form.Ward_ID} 
                    onChange={(e) => handleChange('Ward_ID', e.target.value)} 
                    placeholder="e.g. 5"
                  />
                </div>
              </div>

              <div style={{display:'flex', justifyContent:'flex-end', gap:'1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem'}}>
                <button type="button" className="pm-btn pm-btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                <button type="submit" className="pm-btn pm-btn-primary" disabled={isSubmitting}>
                  <Check size={16}/> {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Record' : 'Register Deceased')}
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RegisterDeceased;
