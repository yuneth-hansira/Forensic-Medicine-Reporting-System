import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AlertCircle, Check } from 'lucide-react';
import { exhibitService } from '../../services/exhibitService';
import '../patients/patients.css';

const RegisterExhibit = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Case_ID: '',
    Police_ID: '',
    Exhibit_Type: '',
    Description: '',
    Storage_Location: '',
    Handover_Date: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchRecord = async () => {
        try {
          const data = await exhibitService.getExhibitById(id);
          setForm({
            Case_ID: data.Case_ID || '',
            Police_ID: data.Police_ID || '',
            Exhibit_Type: data.Exhibit_Type || '',
            Description: data.Description || '',
            Storage_Location: data.Storage_Location || '',
            Handover_Date: data.Handover_Date ? data.Handover_Date.split('T')[0] : ''
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
      if (!payload.Police_ID) payload.Police_ID = null;

      if (isEditMode) {
        await exhibitService.updateExhibit(id, payload);
        alert('Exhibit updated successfully!');
        navigate(`/exhibits/${id}`);
      } else {
        await exhibitService.createExhibit(payload);
        alert('Exhibit registered successfully!');
        navigate('/exhibits');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'register'} exhibit`);
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
              <Link to="/exhibits">Exhibits</Link><span>/</span><span>{isEditMode ? 'Edit Exhibit' : 'Add Exhibit'}</span>
            </div>
            <h1 className="pm-page-title">{isEditMode ? 'Edit Exhibit' : 'Add Exhibit'}</h1>
            <p className="pm-page-subtitle">{isEditMode ? 'Update physical evidence details' : 'Log new physical evidence for a case'}</p>
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
                  <label className="pm-label required">Case ID</label>
                  <input 
                    required
                    type="number"
                    className="pm-input" 
                    value={form.Case_ID} 
                    onChange={(e) => handleChange('Case_ID', e.target.value)} 
                    placeholder="e.g. 101"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Police ID (Optional)</label>
                  <input 
                    type="number"
                    className="pm-input" 
                    value={form.Police_ID} 
                    onChange={(e) => handleChange('Police_ID', e.target.value)}
                    placeholder="e.g. 5"
                  />
                </div>
              </div>

              <div className="pm-form-grid-2" style={{marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div className="pm-form-group">
                  <label className="pm-label">Exhibit Type</label>
                  <input 
                    className="pm-input" 
                    value={form.Exhibit_Type} 
                    onChange={(e) => handleChange('Exhibit_Type', e.target.value)}
                    placeholder="e.g. Clothing, Weapon, Biological Sample"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Handover Date</label>
                  <input 
                    type="date"
                    className="pm-input" 
                    value={form.Handover_Date} 
                    onChange={(e) => handleChange('Handover_Date', e.target.value)}
                  />
                </div>
              </div>

              <div className="pm-form-group" style={{marginBottom: '1.5rem'}}>
                <label className="pm-label">Storage Location</label>
                <input 
                  className="pm-input" 
                  value={form.Storage_Location} 
                  onChange={(e) => handleChange('Storage_Location', e.target.value)}
                  placeholder="e.g. Locker 4A, Evidence Room B"
                />
              </div>

              <div className="pm-form-group" style={{marginBottom: '2rem'}}>
                <label className="pm-label">Description</label>
                <textarea 
                  className="pm-input" 
                  style={{minHeight: '120px', resize: 'vertical'}}
                  value={form.Description} 
                  onChange={(e) => handleChange('Description', e.target.value)}
                  placeholder="Detailed description of the exhibit..."
                ></textarea>
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

export default RegisterExhibit;
