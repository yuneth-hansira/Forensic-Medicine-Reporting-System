import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  EyeOff, 
  Eye,
  Shield, 
  Scale, 
  Dna, 
  Fingerprint, 
  Microscope,
  ShieldCheck,
  UserPlus
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('User');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, password, role });
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container animate-fade-in">
        
        {/* Left Information Pane */}
        <div className="login-left">
          <div className="floating-icons">
            <Dna className="float-icon icon-1" />
            <Fingerprint className="float-icon icon-2" />
            <Microscope className="float-icon icon-3" />
          </div>
          
          <div className="left-content">
            <div className="brand animate-fade-in delay-100">
              <div className="brand-icon">
                <Scale size={32} color="#fff" />
              </div>
              <div className="brand-text">
                <h1>FORENSIC</h1>
                <h1>MEDICINE</h1>
                <span>DATA REPORT SYSTEM</span>
              </div>
            </div>
            
            <div className="brand-separator animate-fade-in delay-150"></div>
            
            <h2 className="animate-fade-in delay-200">
              Join the System. <br/>
              Ensure <strong>Accountability.</strong>
            </h2>
            
            <p className="animate-fade-in delay-300">
              Create an account to securely access forensic medicine reports, manage cases, and handle departmental data.
            </p>
          </div>

          <div className="copyright animate-fade-in delay-400">
            © 2026 Forensic Medicine Data Report System. All rights reserved.
          </div>
        </div>

        {/* Right Form Pane */}
        <div className="login-right">
          <div className="right-content">
            <div className="form-header animate-fade-in delay-100">
              <div className="form-header-icon">
                <UserPlus size={40} />
              </div>
              <h2>Create Account</h2>
              <p>Sign up for the Forensic Medicine <br/> Data Report System</p>
            </div>

            {error && (
              <div style={{ color: '#ef4444', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                {error}
              </div>
            )}
            
            {success && (
              <div style={{ color: '#10b981', backgroundColor: '#d1fae5', padding: '10px', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                {success}
              </div>
            )}

            <form className="login-form animate-fade-in delay-200" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Role</label>
                <div className="input-wrapper">
                  <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="User">User</option>
                    <option value="Doctor">Doctor</option>
                    <option value="JMO">JMO</option>
                    <option value="Nurse">Nurse</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Username</label>
                <div className="input-wrapper">
                  <input 
                    type="text" 
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button" 
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <div className="input-wrapper">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-submit" disabled={loading} style={{ marginTop: '1.5rem' }}>
                <UserPlus size={18} />
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
              
              <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.95rem' }}>
                Already have an account? <Link to="/" style={{ color: '#2563eb', fontWeight: '500', textDecoration: 'none' }}>Sign in here</Link>
              </div>

            </form>

            <div className="footer-text animate-fade-in delay-300" style={{ marginTop: '1rem' }}>
              <Shield size={16} />
              Secure • Confidential • Authorized Access Only
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
