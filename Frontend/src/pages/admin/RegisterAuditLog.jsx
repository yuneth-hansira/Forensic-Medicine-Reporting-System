import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AlertCircle, Check } from 'lucide-react';
import { auditLogService } from '../../services/auditLogService';
import '../patients/patients.css';

const RegisterAuditLog = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    User_ID: '',
    Action: '',
    Table_Affected: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchRecord = async () => {
        try {
          const data = await auditLogService.getLogById(id);
          setForm({
            User_ID: data.User_ID || '',
            Action: data.Action || '',
            Table_Affected: data.Table_Affected || ''
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
        await auditLogService.updateLog(id, payload);
        alert('Log updated successfully!');
        navigate(`/audit-logs/${id}`);
      } else {
        await auditLogService.createLog(payload);
        alert('Log created successfully!');
        navigate('/audit-logs');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} log`);
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
              <Link to="/audit-logs">Audit Logs</Link><span>/</span><span>{isEditMode ? 'Edit Log' : 'Create Log'}</span>
            </div>
            <h1 className="pm-page-title">{isEditMode ? 'Edit Audit Log Entry' : 'Create Manual Audit Log'}</h1>
            <p className="pm-page-subtitle">{isEditMode ? 'Modify an existing system log' : 'Manually record a system action'}</p>
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
            <div style={{padding:'1.5rem 2rem', background:'#f8fafc', borderBottom:'1px solid #e2e8f0', borderTopLeftRadius:'12px', borderTopRightRadius:'12px'}}>
                <h3 style={{margin:0, fontSize:'1rem', color:'#64748b', display:'flex', alignItems:'center', gap:'0.5rem'}}>
                    <AlertCircle size={16}/> Note: Audit Logs are normally generated automatically by the system.
                </h3>
            </div>
            <form onSubmit={handleSubmit} style={{padding: '2rem'}}>
              
              <div className="pm-form-group" style={{marginBottom: '1.5rem'}}>
                <label className="pm-label required">Action Performed</label>
                <input 
                  required
                  className="pm-input" 
                  value={form.Action} 
                  onChange={(e) => handleChange('Action', e.target.value)} 
                  placeholder="e.g. DELETE RECORD, UPDATE PERMISSIONS"
                />
              </div>

              <div className="pm-form-grid-2" style={{marginBottom: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div className="pm-form-group">
                  <label className="pm-label">Table Affected</label>
                  <input 
                    className="pm-input" 
                    value={form.Table_Affected} 
                    onChange={(e) => handleChange('Table_Affected', e.target.value)} 
                    placeholder="e.g. Patient, Doctor"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Linked User ID</label>
                  <input 
                    type="number"
                    className="pm-input" 
                    value={form.User_ID} 
                    onChange={(e) => handleChange('User_ID', e.target.value)}
                    placeholder="e.g. 1"
                  />
                  <small style={{display:'block', marginTop:'0.25rem', color:'#64748b'}}>ID of the user who performed this action</small>
                </div>
              </div>

              <div style={{display:'flex', justifyContent:'flex-end', gap:'1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem'}}>
                <button type="button" className="pm-btn pm-btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                <button type="submit" className="pm-btn pm-btn-primary" disabled={isSubmitting}>
                  <Check size={16}/> {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Log' : 'Save Log')}
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RegisterAuditLog;
