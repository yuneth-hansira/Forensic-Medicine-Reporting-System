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
  ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Backend API call
      const response = await authService.login(username, password);
      console.log("Login success", response);
      
      if (!username || !password) {
        throw new Error('Please enter username and password');
      }
      
      console.log('Login attempt:', { username, rememberMe });
      
      // Navigate to landing page on success
      navigate('/home');
      
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleDepartmentLogin = async () => {
    // Example handler for the secondary login option
    console.log('Department login initiated');
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
              Accurate Data. Reliable Reports. <br/>
              Justice Through <strong>Evidence.</strong>
            </h2>
            
            <p className="animate-fade-in delay-300">
              A secure and efficient platform for managing forensic medicine reports, cases, and departmental data.
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
                <User size={40} />
                <div className="badge">
                  <Lock size={14} />
                </div>
              </div>
              <h2>Welcome Back</h2>
              <p>Sign in to continue to Forensic Medicine <br/> Data Report System</p>
            </div>

            {error && (
              <div style={{ color: '#ef4444', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                {error}
              </div>
            )}

            <form className="login-form animate-fade-in delay-200" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <div className="input-wrapper">
                  <User className="input-icon" size={20} />
                  <input 
                    type="text" 
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={20} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <div className="form-options">
                <label className="checkbox-wrapper">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember me
                </label>
                <a href="#" className="forgot-password">Forgot Password?</a>
              </div>

              <button type="submit" className="btn-submit" disabled={loading}>
                <Lock size={18} />
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              <div className="divider">or</div>

              <button type="button" className="btn-secondary" onClick={handleDepartmentLogin}>
                <ShieldCheck size={20} />
                Login with Department ID
              </button>
            </form>

            <div className="footer-text animate-fade-in delay-300">
              <Shield size={16} />
              Secure • Confidential • Authorized Access Only
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
