import React from 'react';
import { 
  Scale, Home, Info, Grid, HelpCircle, Bell, 
  Play, Users, FolderOpen, Fingerprint, Activity, 
  Gavel, ShieldCheck, ChevronDown, LayoutDashboard,
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-brand">
          <Scale size={28} className="text-white" />
          <div className="brand-text">
            <span className="brand-title">Forensic Medical</span>
            <span className="brand-subtitle">Management System</span>
          </div>
        </div>
        
        <div className="nav-links">
          <a href="#" className="nav-link active"><Home size={16} /> Home</a>
          <a href="#" className="nav-link"><Info size={16} /> About</a>
          <a href="#" className="nav-link"><Grid size={16} /> Features</a>
          <a href="#" className="nav-link"><HelpCircle size={16} /> Help</a>
        </div>
        
        <div className="nav-user">
          <button className="nav-icon-btn">
            <Bell size={20} />
            <span className="notif-badge">5</span>
          </button>
          <div className="profile-dropdown">
            <img 
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
              alt="User" 
              className="profile-img" 
            />
            <div className="profile-info">
              <span className="profile-name">Dr. John Silva</span>
              <span className="profile-role">JMO</span>
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">Welcome to</div>
          <h1 className="hero-title">
            Forensic Medical <br/>
            <span className="text-cyan">Management System</span>
          </h1>
          <h3 className="hero-tagline">Accurate Records. Stronger Justice.</h3>
          <p className="hero-description">
            A secure and comprehensive digital platform to manage 
            forensic medical information, examinations, evidence and reports.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
              <LayoutDashboard size={20} />
              Go to Dashboard
              <span className="arrow">→</span>
            </button>
            <button className="btn btn-outline">
              <Play size={20} />
              Watch Overview
            </button>
          </div>
        </div>
        <div className="hero-image-overlay"></div>
      </header>

      {/* Features Grid */}
      <section className="features-section">
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon-wrapper bg-blue-100">
              <Users size={28} className="text-blue-600" />
            </div>
            <h4 className="feature-title">Patient Management</h4>
            <p className="feature-desc">Register and manage patient information securely.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper bg-green-100">
              <FolderOpen size={28} className="text-green-600" />
            </div>
            <h4 className="feature-title">Case Management</h4>
            <p className="feature-desc">Handle medico-legal cases with complete case history.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper bg-purple-100">
              <Fingerprint size={28} className="text-purple-600" />
            </div>
            <h4 className="feature-title">Evidence Tracking</h4>
            <p className="feature-desc">Maintain chain of custody and store evidence details.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper bg-red-100">
              <Activity size={28} className="text-red-600" />
            </div>
            <h4 className="feature-title">Postmortem & Examination</h4>
            <p className="feature-desc">Record findings and generate professional medical reports.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper bg-yellow-100">
              <Gavel size={28} className="text-yellow-600" />
            </div>
            <h4 className="feature-title">Court Reports</h4>
            <p className="feature-desc">Prepare accurate reports for legal proceedings.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper bg-teal-100">
              <ShieldCheck size={28} className="text-teal-600" />
            </div>
            <h4 className="feature-title">Secure & Reliable</h4>
            <p className="feature-desc">Role-based access with high data confidentiality.</p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <Users size={32} className="text-blue-600" />
            <div className="stat-info">
              <span className="stat-number">1,245</span>
              <span className="stat-label">Total Patients</span>
            </div>
          </div>
          <div className="stat-divider"></div>
          
          <div className="stat-item">
            <FolderOpen size={32} className="text-green-600" />
            <div className="stat-info">
              <span className="stat-number">324</span>
              <span className="stat-label">Active Cases</span>
            </div>
          </div>
          <div className="stat-divider"></div>
          
          <div className="stat-item">
            <Fingerprint size={32} className="text-purple-600" />
            <div className="stat-info">
              <span className="stat-number">152</span>
              <span className="stat-label">Evidence Items</span>
            </div>
          </div>
          <div className="stat-divider"></div>
          
          <div className="stat-item">
            <FileText size={32} className="text-blue-600" />
            <div className="stat-info">
              <span className="stat-number">91</span>
              <span className="stat-label">Reports Generated</span>
            </div>
          </div>
          <div className="stat-divider"></div>

          <div className="stat-item">
            <Users size={32} className="text-blue-600" />
            <div className="stat-info">
              <span className="stat-number">24</span>
              <span className="stat-label">System Users</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <p>Forensic Medical Management System | University Project - 2026</p>
          <p className="footer-motto">Accuracy Today, Justice Tomorrow</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
