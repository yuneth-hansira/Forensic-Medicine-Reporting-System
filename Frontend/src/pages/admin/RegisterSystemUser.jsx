import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AlertCircle, Check } from 'lucide-react';
import { userService } from '../../services/userService';
import '../patients/patients.css';
import { authService } from '../../services/authService';
import { canCreate, canEdit, canDelete } from '../../utils/permissions';

const RegisterSystemUser = () => {
  const user = authService.getUser();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Username: '',
    Password: '',
    Role: 'JMO',
    Access_Level: 'Standard'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchRecord = async () => {
        try {
          const data = await userService.getUserById(id);
          setForm({
            Username: data.Username || '',
            Password: '', // leave empty for edit unless they want to change it
            Role: data.Role || 'JMO',
            Access_Level: data.Access_Level || 'Standard'
          });
        } catch (err) {
          console.error(err);
          setError("Failed to load user for editing");
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
      if (isEditMode && payload.Password === '') {
          delete payload.Password; // Don't update password if it's empty
      }

      if (isEditMode) {
        await userService.updateUser(id, payload);
        alert('User updated successfully!');
        navigate(`/users/${id}`);
      } else {
        await userService.createUser(payload);
        alert('User registered successfully!');
        navigate('/users');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'register'} user`);
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
              <Link to="/users">System Users</Link><span>/</span><span>{isEditMode ? 'Edit User' : 'Add User'}</span>
            </div>
            <h1 className="pm-page-title">{isEditMode ? 'Edit System User' : 'Register System User'}</h1>
            <p className="pm-page-subtitle">{isEditMode ? 'Update user credentials' : 'Create a new user account'}</p>
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
              
              <h3 style={{fontSize:'1.1rem', fontWeight:600, color:'#0f172a', marginBottom:'1rem', borderBottom:'1px solid #e2e8f0', paddingBottom:'0.5rem'}}>Account Credentials</h3>

              <div className="pm-form-grid-2" style={{marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div className="pm-form-group">
                  <label className="pm-label required">Username</label>
                  <input 
                    required
                    className="pm-input" 
                    value={form.Username} 
                    onChange={(e) => handleChange('Username', e.target.value)} 
                    placeholder="jdoe"
                  />
                </div>
                {(!isEditMode || user?.id?.toString() === id) ? (
                  <div className="pm-form-group">
                    <label className={isEditMode ? "pm-label" : "pm-label required"}>Password</label>
                    <input 
                      required={!isEditMode}
                      type="password"
                      className="pm-input" 
                      value={form.Password} 
                      onChange={(e) => handleChange('Password', e.target.value)} 
                      placeholder={isEditMode ? "Leave empty to keep current password" : "Enter a strong password"}
                    />
                  </div>
                ) : (
                  <div className="pm-form-group">
                    <label className="pm-label">Password</label>
                    <input 
                      disabled
                      type="password"
                      className="pm-input" 
                      value="********"
                      title="You can only change your own password"
                      style={{backgroundColor: '#f1f5f9', color: '#94a3b8', cursor: 'not-allowed'}}
                    />
                  </div>
                )}
              </div>

              <div className="pm-form-grid-2" style={{marginBottom: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div className="pm-form-group">
                  <label className="pm-label required">Role</label>
                  <select 
                    required
                    className="pm-input" 
                    value={form.Role} 
                    onChange={(e) => handleChange('Role', e.target.value)}
                  >
                    <option value="JMO">JMO</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Admin">Admin</option>
                    <option value="Nurse">Nurse</option>
                  </select>
                </div>
                <div className="pm-form-group">
                  <label className="pm-label required">Access Level</label>
                  <select 
                    required
                    className="pm-input" 
                    value={form.Access_Level} 
                    onChange={(e) => handleChange('Access_Level', e.target.value)}
                  >
                    <option value="Standard">Standard</option>
                    <option value="Elevated">Elevated</option>
                    <option value="Full">Full</option>
                  </select>
                </div>
              </div>



              <div style={{display:'flex', justifyContent:'flex-end', gap:'1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem'}}>
                <button type="button" className="pm-btn pm-btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                <button type="submit" className="pm-btn pm-btn-primary" disabled={isSubmitting}>
                  <Check size={16}/> {isSubmitting ? 'Saving...' : (isEditMode ? 'Update User' : 'Create User')}
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RegisterSystemUser;
