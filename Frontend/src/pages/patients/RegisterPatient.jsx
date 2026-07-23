import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { AlertCircle, Check } from 'lucide-react';
import { patientService } from '../../services/patientService';
import { hospitalService } from '../../services/hospitalService';
import { wardService } from '../../services/wardService';
import '../patients/patients.css';
import './RegisterPatient.css';

const RegisterPatient = () => {
  const [form, setForm] = useState({
    Full_Name: '',
    Date_Of_Birth: '',
    Sex: '',
    NIC_Passport: '',
    Blood_Group: '',
    Contact_No: '',
    Address: '',
    Hospital_ID: '',
    Ward_ID: ''
  });
  
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [error, setError] = useState(null);
  
  const [hospitals, setHospitals] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const [hData, wData] = await Promise.all([
          hospitalService.getAllHospitals(),
          wardService.getAllWards()
        ]);
        setHospitals(hData);
        setWards(wData);
      } catch (err) {
        console.error("Failed to load hospitals/wards");
      }
    };
    fetchMasterData();
  }, []);

  useEffect(() => {
    if (isEditMode) {
      const fetchPatient = async () => {
        try {
          const data = await patientService.getPatientById(id);
          setForm({
            Full_Name: data.Full_Name || '',
            Date_Of_Birth: data.Date_Of_Birth ? data.Date_Of_Birth.substring(0, 10) : '',
            Sex: data.Sex || '',
            NIC_Passport: data.NIC_Passport || '',
            Blood_Group: data.Blood_Group || '',
            Contact_No: data.Contact_No || '',
            Address: data.Address || '',
            Hospital_ID: data.Hospital_ID || '',
            Ward_ID: data.Ward_ID || ''
          });
        } catch (err) {
          setError("Failed to load patient data for editing");
        } finally {
          setIsLoadingData(false);
        }
      };
      fetchPatient();
    }
  }, [id, isEditMode]);

  const handleChange = (field, value) => {
    if (field === 'Hospital_ID') {
      setForm(prev => ({ ...prev, Hospital_ID: value, Ward_ID: '' }));
    } else {
      setForm(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Convert empty strings to null for optional database integer fields
      const payload = {
        ...form,
        Hospital_ID: form.Hospital_ID === '' ? null : form.Hospital_ID,
        Ward_ID: form.Ward_ID === '' ? null : form.Ward_ID,
      };

      if (isEditMode) {
        await patientService.updatePatient(id, payload);
        alert('Patient updated successfully!');
        navigate(`/patients/${id}`);
      } else {
        const response = await patientService.createPatient(payload);
        alert('Patient registered successfully! Patient ID: ' + response.Patient_ID);
        navigate('/patients');
      }
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'register'} patient`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="pm-page" style={{padding:'2rem'}}>
        {/* Header */}
        <div className="pm-page-header" style={{marginBottom:'2rem'}}>
          <div>
            <div className="pm-breadcrumb">
              <a href="/patients">Patients</a><span>/</span><span>{isEditMode ? 'Edit Patient' : 'Register New Patient'}</span>
            </div>
            <h1 className="pm-page-title">{isEditMode ? 'Edit Patient Details' : 'Register New Patient'}</h1>
            <p className="pm-page-subtitle">{isEditMode ? 'Update patient details in the database' : 'Enter patient details to register in the database'}</p>
          </div>
        </div>

        {error && (
          <div style={{background:'#fee2e2', color:'#ef4444', padding:'1rem', borderRadius:'8px', marginBottom:'1.5rem', display:'flex', alignItems:'center', gap:'0.75rem'}}>
            <AlertCircle size={20}/> {error}
          </div>
        )}

        {isLoadingData ? (
          <div style={{textAlign:'center', padding:'3rem', color:'#64748b'}}>Loading patient data...</div>
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
                  <label className="pm-label">Date of Birth</label>
                  <input 
                    type="date" 
                    className="pm-input" 
                    value={form.Date_Of_Birth} 
                    onChange={(e) => handleChange('Date_Of_Birth', e.target.value)}
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
                  <label className="pm-label">NIC / Passport Number</label>
                  <input 
                    className="pm-input" 
                    value={form.NIC_Passport} 
                    onChange={(e) => handleChange('NIC_Passport', e.target.value)} 
                    placeholder="e.g. 901234567V"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Blood Group</label>
                  <select 
                    className="pm-select" 
                    value={form.Blood_Group} 
                    onChange={(e) => handleChange('Blood_Group', e.target.value)}
                  >
                    <option value="">Select Blood Group</option>
                    {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(b=><option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              <div className="pm-form-grid-2" style={{marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div className="pm-form-group">
                  <label className="pm-label">Contact No</label>
                  <input 
                    className="pm-input" 
                    value={form.Contact_No} 
                    onChange={(e) => handleChange('Contact_No', e.target.value)} 
                    placeholder="e.g. +94 71 234 5678"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-label">Hospital</label>
                  <select 
                    className="pm-select" 
                    value={form.Hospital_ID} 
                    onChange={(e) => handleChange('Hospital_ID', e.target.value)} 
                  >
                    <option value="">Select Hospital (Optional)</option>
                    {hospitals.map(h => (
                      <option key={h.Hospital_ID} value={h.Hospital_ID}>
                        H-{h.Hospital_ID} {h.Hospital_Name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pm-form-group" style={{marginBottom: '1.5rem'}}>
                <label className="pm-label">Ward</label>
                <select 
                  className="pm-select" 
                  value={form.Ward_ID} 
                  onChange={(e) => handleChange('Ward_ID', e.target.value)} 
                  disabled={!form.Hospital_ID}
                >
                  <option value="">Select Ward (Optional)</option>
                  {wards
                    .filter(w => w.Hospital_ID.toString() === form.Hospital_ID.toString())
                    .map(w => (
                    <option key={w.Ward_ID} value={w.Ward_ID}>
                      Ward {w.Ward_No} - {w.Ward_Name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pm-form-group" style={{marginBottom: '2rem'}}>
                <label className="pm-label">Address</label>
                <textarea 
                  className="pm-textarea" 
                  rows={3} 
                  value={form.Address} 
                  onChange={(e) => handleChange('Address', e.target.value)} 
                  placeholder="Enter full address"
                />
              </div>

              <div style={{display:'flex', justifyContent:'flex-end', gap:'1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem'}}>
                <button type="button" className="pm-btn pm-btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                <button type="submit" className="pm-btn pm-btn-primary" disabled={isSubmitting}>
                  <Check size={16}/> {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Patient' : 'Save Patient')}
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RegisterPatient;
