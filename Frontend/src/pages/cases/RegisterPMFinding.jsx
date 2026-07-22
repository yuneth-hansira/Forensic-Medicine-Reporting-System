import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AlertCircle, Check } from 'lucide-react';
import { pmFindingsService } from '../../services/pmFindingsService';
import '../patients/patients.css';

const RegisterPMFinding = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Case_ID: '',
    PMR_Text: '',
    Immediate_Cause_Of_Death: '',
    Antecedent_Cause: '',
    Contributory_Cause: '',
    Interval_Onset_Death: '',
    Maternal_Death: false,
    Comments_Opinions: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchRecord = async () => {
        try {
          const data = await pmFindingsService.getFindingById(id);
          setForm({
            Case_ID: data.Case_ID || '',
            PMR_Text: data.PMR_Text || '',
            Immediate_Cause_Of_Death: data.Immediate_Cause_Of_Death || '',
            Antecedent_Cause: data.Antecedent_Cause || '',
            Contributory_Cause: data.Contributory_Cause || '',
            Interval_Onset_Death: data.Interval_Onset_Death || '',
            Maternal_Death: Boolean(data.Maternal_Death),
            Comments_Opinions: data.Comments_Opinions || ''
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
        await pmFindingsService.updateFinding(id, payload);
        alert('Postmortem finding updated successfully!');
        navigate(`/pm-findings/${id}`);
      } else {
        await pmFindingsService.createFinding(payload);
        alert('Postmortem finding registered successfully!');
        navigate('/pm-findings');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'register'} postmortem finding`);
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
              <Link to="/pm-findings">Postmortem Findings</Link><span>/</span><span>{isEditMode ? 'Edit Finding' : 'Add Finding'}</span>
            </div>
            <h1 className="pm-page-title">{isEditMode ? 'Edit Finding' : 'Add Finding'}</h1>
            <p className="pm-page-subtitle">{isEditMode ? 'Update postmortem details' : 'Log new autopsy findings for a case'}</p>
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
                <div className="pm-form-group" style={{display: 'flex', alignItems: 'center', marginTop: '1.5rem'}}>
                  <label className="pm-label" style={{display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: 0}}>
                    <input 
                      type="checkbox"
                      checked={form.Maternal_Death} 
                      onChange={(e) => handleChange('Maternal_Death', e.target.checked)}
                      style={{marginRight: '0.5rem', width: '1.25rem', height: '1.25rem'}}
                    />
                    Flag as Maternal Death
                  </label>
                </div>
              </div>

              <div className="pm-form-group" style={{marginBottom: '1.5rem'}}>
                <label className="pm-label">Immediate Cause Of Death (1a)</label>
                <input 
                  className="pm-input" 
                  value={form.Immediate_Cause_Of_Death} 
                  onChange={(e) => handleChange('Immediate_Cause_Of_Death', e.target.value)}
                  placeholder="e.g. Acute Myocardial Infarction"
                />
              </div>

              <div className="pm-form-grid-2" style={{marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div className="pm-form-group">
                  <label className="pm-label">Antecedent Cause (1b/1c)</label>
                  <input 
                    className="pm-input" 
                    value={form.Antecedent_Cause} 
                    onChange={(e) => handleChange('Antecedent_Cause', e.target.value)}
                    placeholder="e.g. Coronary Artery Disease"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Contributory Cause (2)</label>
                  <input 
                    className="pm-input" 
                    value={form.Contributory_Cause} 
                    onChange={(e) => handleChange('Contributory_Cause', e.target.value)}
                    placeholder="e.g. Type 2 Diabetes Mellitus"
                  />
                </div>
              </div>

              <div className="pm-form-group" style={{marginBottom: '1.5rem'}}>
                <label className="pm-label">Interval between Onset and Death</label>
                <input 
                  className="pm-input" 
                  value={form.Interval_Onset_Death} 
                  onChange={(e) => handleChange('Interval_Onset_Death', e.target.value)}
                  placeholder="e.g. 2 Hours, 5 Days"
                />
              </div>

              <div className="pm-form-group" style={{marginBottom: '1.5rem'}}>
                <label className="pm-label">PMR Text (Full Report Summary)</label>
                <textarea 
                  className="pm-input" 
                  style={{minHeight: '120px', resize: 'vertical'}}
                  value={form.PMR_Text} 
                  onChange={(e) => handleChange('PMR_Text', e.target.value)}
                  placeholder="Summary of postmortem examination..."
                ></textarea>
              </div>

              <div className="pm-form-group" style={{marginBottom: '2rem'}}>
                <label className="pm-label">Comments / Opinions</label>
                <textarea 
                  className="pm-input" 
                  style={{minHeight: '80px', resize: 'vertical'}}
                  value={form.Comments_Opinions} 
                  onChange={(e) => handleChange('Comments_Opinions', e.target.value)}
                  placeholder="Additional remarks..."
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

export default RegisterPMFinding;
