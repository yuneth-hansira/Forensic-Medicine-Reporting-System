import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AlertCircle, Check } from 'lucide-react';
import { injuryService } from '../../services/injuryService';
import '../patients/patients.css';

const RegisterInjury = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Case_ID: '',
    Description: '',
    Size: '',
    Shape: '',
    Causative_Weapon: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchRecord = async () => {
        try {
          const data = await injuryService.getInjuryById(id);
          setForm({
            Case_ID: data.Case_ID || '',
            Description: data.Description || '',
            Size: data.Size || '',
            Shape: data.Shape || '',
            Causative_Weapon: data.Causative_Weapon || ''
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
        await injuryService.updateInjury(id, payload);
        alert('Injury updated successfully!');
        navigate(`/injuries/${id}`);
      } else {
        await injuryService.createInjury(payload);
        alert('Injury registered successfully!');
        navigate('/injuries');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'register'} injury`);
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
              <Link to="/injuries">Injuries</Link><span>/</span><span>{isEditMode ? 'Edit Injury' : 'Add Injury'}</span>
            </div>
            <h1 className="pm-page-title">{isEditMode ? 'Edit Injury Record' : 'Add Injury Record'}</h1>
            <p className="pm-page-subtitle">{isEditMode ? 'Update injury details in the database' : 'Enter injury details linked to a case'}</p>
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
                  <label className="pm-label">Size</label>
                  <input 
                    className="pm-input" 
                    value={form.Size} 
                    onChange={(e) => handleChange('Size', e.target.value)}
                    placeholder="e.g. 5cm x 2cm"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Shape</label>
                  <input 
                    className="pm-input" 
                    value={form.Shape} 
                    onChange={(e) => handleChange('Shape', e.target.value)}
                    placeholder="e.g. Oval, Linear"
                  />
                </div>
              </div>

              <div className="pm-form-group" style={{marginBottom: '1.5rem'}}>
                <label className="pm-label">Causative Weapon</label>
                <input 
                  className="pm-input" 
                  value={form.Causative_Weapon} 
                  onChange={(e) => handleChange('Causative_Weapon', e.target.value)}
                  placeholder="e.g. Blunt object, Knife"
                />
              </div>

              <div className="pm-form-group" style={{marginBottom: '2rem'}}>
                <label className="pm-label">Detailed Description</label>
                <textarea 
                  className="pm-input" 
                  value={form.Description} 
                  onChange={(e) => handleChange('Description', e.target.value)}
                  placeholder="Provide a detailed description of the injury..."
                  rows={4}
                />
              </div>

              <div style={{display:'flex', justifyContent:'flex-end', gap:'1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem'}}>
                <button type="button" className="pm-btn pm-btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                <button type="submit" className="pm-btn pm-btn-primary" disabled={isSubmitting}>
                  <Check size={16}/> {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Record' : 'Save Injury')}
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RegisterInjury;
