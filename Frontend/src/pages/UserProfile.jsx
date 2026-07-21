import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { User, Mail, Briefcase, Phone, Hash, Shield, Loader, Save, X, Edit2 } from 'lucide-react';
import userService from '../services/userService';
import './UserProfile.css';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    Username: '',
    Name: '',
    SLMC_Reg_No: '',
    Contact_No: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await userService.getProfile();
      setProfile(data);
      setFormData({
        Username: data.Username || '',
        Name: data.Name || '',
        SLMC_Reg_No: data.SLMC_Reg_No || '',
        Contact_No: data.Contact_No || ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.updateProfile(formData);
      setIsEditing(false);
      fetchProfile();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update profile');
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="profile-loading">
          <Loader className="spinner" size={32} />
          <p>Loading profile...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="profile-error">
          <p>{error}</p>
          <button onClick={fetchProfile} className="retry-btn">Retry</button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="profile-page">
        <div className="profile-header">
          <h2>User Profile</h2>
          {!isEditing ? (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              <Edit2 size={18} /> Edit Profile
            </button>
          ) : (
            <button className="cancel-btn" onClick={() => {
              setIsEditing(false);
              setFormData({
                Username: profile.Username || '',
                Name: profile.Name || '',
                SLMC_Reg_No: profile.SLMC_Reg_No || '',
                Contact_No: profile.Contact_No || ''
              });
            }}>
              <X size={18} /> Cancel
            </button>
          )}
        </div>

        <div className="profile-content">
          <div className="profile-avatar-section">
            <div className="avatar-large">
              <User size={64} />
            </div>
            <h3>{profile.Name || profile.Username}</h3>
            <p className="role-badge"><Shield size={14}/> {profile.Role}</p>
          </div>

          <div className="profile-details">
            <form onSubmit={handleSubmit}>
              
              <div className="form-group">
                <label><Mail size={16}/> Username</label>
                {isEditing ? (
                  <input type="text" name="Username" value={formData.Username} onChange={handleInputChange} required />
                ) : (
                  <p className="field-value">{profile.Username}</p>
                )}
              </div>

                  <div className="form-group">
                    <label><User size={16}/> Full Name</label>
                    {isEditing ? (
                      <input type="text" name="Name" value={formData.Name} onChange={handleInputChange} />
                    ) : (
                      <p className="field-value">{profile.Name || '-'}</p>
                    )}
                  </div>

                  {profile.Role === 'Doctor' && (
                    <div className="form-group">
                      <label><Hash size={16}/> SLMC Registration No</label>
                      {isEditing ? (
                        <input type="text" name="SLMC_Reg_No" value={formData.SLMC_Reg_No} onChange={handleInputChange} />
                      ) : (
                        <p className="field-value">{profile.SLMC_Reg_No || '-'}</p>
                      )}
                    </div>
                  )}

                  <div className="form-group">
                    <label><Phone size={16}/> Contact No</label>
                    {isEditing ? (
                      <input type="text" name="Contact_No" value={formData.Contact_No} onChange={handleInputChange} />
                    ) : (
                      <p className="field-value">{profile.Contact_No || '-'}</p>
                    )}
                  </div>

              {isEditing && (
                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    <Save size={18} /> Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;
