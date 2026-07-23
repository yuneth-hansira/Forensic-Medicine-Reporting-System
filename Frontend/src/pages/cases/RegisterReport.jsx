import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AlertCircle, Check } from 'lucide-react';
import { reportService } from '../../services/reportService';
import '../patients/patients.css';
import { authService } from '../../services/authService';
import { canCreate, canEdit, canDelete } from '../../utils/permissions';

const RegisterReport = () => {
  const user = authService.getUser();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Case_ID: '',
    Doctor_ID: '',
    Report_Type: '',
    Report_Date: '',
    Date_Of_Dispatch: '',
    Signature: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchRecord = async () => {
        try {
          const data = await reportService.getReportById(id);
          setForm({
            Case_ID: data.Case_ID || '',
            Doctor_ID: data.Doctor_ID || '',
            Report_Type: data.Report_Type || '',
            Report_Date: data.Report_Date ? data.Report_Date.substring(0, 10) : '',
            Date_Of_Dispatch: data.Date_Of_Dispatch ? data.Date_Of_Dispatch.substring(0, 10) : '',
            Signature: data.Signature || ''
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
        Doctor_ID: form.Doctor_ID === '' ? null : form.Doctor_ID,
        Report_Date: form.Report_Date === '' ? null : form.Report_Date,
        Date_Of_Dispatch: form.Date_Of_Dispatch === '' ? null : form.Date_Of_Dispatch
      };

      if (isEditMode) {
        await reportService.updateReport(id, payload);
        alert('Report updated successfully!');
        navigate(`/reports/${id}`);
      } else {
        await reportService.createReport(payload);
        alert('Report registered successfully!');
        navigate('/reports');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'register'} report`);
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
              <Link to="/reports">Reports</Link><span>/</span><span>{isEditMode ? 'Edit Report' : 'Add Report'}</span>
            </div>
            <h1 className="pm-page-title">{isEditMode ? 'Edit Report Record' : 'Add Report Record'}</h1>
            <p className="pm-page-subtitle">{isEditMode ? 'Update report details in the database' : 'Enter report details linked to a case'}</p>
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
                <div className="pm-form-group">
                  <label className="pm-label">Doctor ID</label>
                  <input 
                    type="number"
                    className="pm-input" 
                    value={form.Doctor_ID} 
                    onChange={(e) => handleChange('Doctor_ID', e.target.value)} 
                    placeholder="e.g. 1"
                  />
                </div>
              </div>

              <div className="pm-form-group" style={{marginBottom: '1.5rem'}}>
                <label className="pm-label">Report Type</label>
                <input 
                  className="pm-input" 
                  value={form.Report_Type} 
                  onChange={(e) => handleChange('Report_Type', e.target.value)}
                  placeholder="e.g. Autopsy Report, Medico-Legal Report"
                />
              </div>

              <div className="pm-form-grid-2" style={{marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div className="pm-form-group">
                  <label className="pm-label">Report Date</label>
                  <input 
                    type="date"
                    className="pm-input" 
                    value={form.Report_Date} 
                    onChange={(e) => handleChange('Report_Date', e.target.value)}
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Date of Dispatch</label>
                  <input 
                    type="date"
                    className="pm-input" 
                    value={form.Date_Of_Dispatch} 
                    onChange={(e) => handleChange('Date_Of_Dispatch', e.target.value)}
                  />
                </div>
              </div>

              <div className="pm-form-group" style={{marginBottom: '2rem'}}>
                <label className="pm-label">Signature / Remarks</label>
                <input 
                  className="pm-input" 
                  value={form.Signature} 
                  onChange={(e) => handleChange('Signature', e.target.value)}
                  placeholder="e.g. Dr. J. Doe, Signed on Original"
                />
              </div>

              <div style={{display:'flex', justifyContent:'flex-end', gap:'1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem'}}>
                <button type="button" className="pm-btn pm-btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                <button type="submit" className="pm-btn pm-btn-primary" disabled={isSubmitting}>
                  <Check size={16}/> {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Record' : 'Save Report')}
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RegisterReport;
