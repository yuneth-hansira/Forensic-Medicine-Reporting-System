import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AlertCircle, Check } from 'lucide-react';
import { policeInfoService } from '../../services/policeInfoService';
import '../patients/patients.css';

const RegisterPoliceInfo = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Case_ID: '',
    Police_Station: '',
    Investigating_Officer: '',
    Officer_Reg_No: '',
    Officer_Rank: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchRecord = async () => {
        try {
          const records = await policeInfoService.getAllPoliceInfo();
          // Find the record. Since getAll is used, we have to find it manually.
          // Ideally there is a getById method. Let's assume there might not be, or we just filter.
          // In policeInfoService we might have getPoliceInfoByCase, but let's just fetch all and find it since it's a small app.
          const data = records.find(r => String(r.Police_ID) === String(id));
          if (!data) throw new Error("Record not found");
          
          setForm({
            Case_ID: data.Case_ID || '',
            Police_Station: data.Police_Station || '',
            Investigating_Officer: data.Investigating_Officer || '',
            Officer_Reg_No: data.Officer_Reg_No || '',
            Officer_Rank: data.Officer_Rank || ''
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
      
      if (isEditMode) {
        await policeInfoService.updatePoliceInfo(id, form);
        alert('Police info updated successfully!');
        navigate(`/police-info/${id}`);
      } else {
        await policeInfoService.createPoliceInfo(form);
        alert('Police info registered successfully!');
        navigate('/police-info');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'register'} police record`);
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
              <Link to="/police-info">Police Information</Link><span>/</span><span>{isEditMode ? 'Edit Record' : 'Add Record'}</span>
            </div>
            <h1 className="pm-page-title">{isEditMode ? 'Edit Police Info' : 'Add Police Info'}</h1>
            <p className="pm-page-subtitle">{isEditMode ? 'Update police details for a case' : 'Log new police details for a case'}</p>
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
          <div className="pm-card" style={{maxWidth: '800px'}}>
            <form onSubmit={handleSubmit} style={{padding:'2rem'}}>
              
              <div className="pm-form-grid" style={{gridTemplateColumns: '1fr', gap:'1.5rem'}}>
                <div>
                  <label className="pm-label required">Case ID (Database ID)</label>
                  <input required type="number" className="pm-input" value={form.Case_ID} onChange={e => handleChange('Case_ID', e.target.value)} placeholder="e.g. 1" />
                </div>
                
                <div>
                  <label className="pm-label">Police Station</label>
                  <input className="pm-input" value={form.Police_Station} onChange={e => handleChange('Police_Station', e.target.value)} placeholder="e.g. Cinnamon Gardens" />
                </div>

                <div>
                  <label className="pm-label">Investigating Officer Name</label>
                  <input className="pm-input" value={form.Investigating_Officer} onChange={e => handleChange('Investigating_Officer', e.target.value)} placeholder="e.g. Inspector Perera" />
                </div>

                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem'}}>
                  <div>
                    <label className="pm-label">Officer Rank</label>
                    <input className="pm-input" value={form.Officer_Rank} onChange={e => handleChange('Officer_Rank', e.target.value)} placeholder="e.g. Inspector" />
                  </div>
                  <div>
                    <label className="pm-label">Officer Reg No</label>
                    <input className="pm-input" value={form.Officer_Reg_No} onChange={e => handleChange('Officer_Reg_No', e.target.value)} placeholder="e.g. REG-4432" />
                  </div>
                </div>

              </div>

              <div style={{display:'flex', justifyContent:'flex-end', gap:'1rem', marginTop:'2.5rem', paddingTop:'1.5rem', borderTop:'1px solid #e2e8f0'}}>
                <button type="button" className="pm-btn pm-btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                <button type="submit" className="pm-btn pm-btn-primary" disabled={isSubmitting}>
                  <Check size={16}/> {isSubmitting ? 'Saving...' : 'Save Record'}
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RegisterPoliceInfo;
