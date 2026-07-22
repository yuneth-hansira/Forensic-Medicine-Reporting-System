import React, { useEffect, useRef, useState } from 'react';
import { 
  Home, Users, FolderOpen, ShieldAlert, Activity, 
  FileText, Shield, Gavel, Users2, Building2, Clock,
  Settings, UserCircle, LogOut, Scale,
  List, UserPlus, Calendar, AlertCircle, BarChart2, FileCheck,
  FlaskConical, Search, Archive, Microscope, ArrowRightCircle
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';
import './Sidebar.css';

// ClipboardList fallback using FileText alias
const ClipboardList = FileText;

const navItems = [
  { section: 'MAIN', items: [
    { name: 'Patients',            icon: Users,      path: '/patients' },
    { name: 'Cases',               icon: FolderOpen, path: '/cases' },
    { name: 'Examinees',           icon: Users,      path: '/examinees' },
    { name: 'Deceased',            icon: Shield,     path: '/deceased' },
  ]},
  { section: 'CASE DETAILS', items: [
    { name: 'Police Info',         icon: ShieldAlert,path: '/police-info' },
    { name: 'Court Info',          icon: Gavel,      path: '/court-info' },
    { name: 'Clinical Findings',   icon: FileText,   path: '/clinical-findings' },
    { name: 'Injuries',            icon: AlertCircle,path: '/injuries' },
    { name: 'Documents',           icon: ClipboardList,path: '/documents' },
  ]},
  { section: 'INVESTIGATIONS', items: [
    { name: 'Investigations',      icon: Search,     path: '/investigations' },
    { name: 'Exhibits',            icon: Archive,    path: '/exhibits' },
    { name: 'Referrals',           icon: ArrowRightCircle, path: '/referrals' },
  ]},
  { section: 'FORENSIC & LAB', items: [
    { name: 'PM Findings',         icon: ClipboardList, path: '/pm-findings' },
    { name: 'Specimens',           icon: FlaskConical, path: '/specimens' },
    { name: 'Histopathology',      icon: Microscope, path: '/histopathology' },
    { name: 'Toxicology',          icon: FlaskConical, path: '/toxicology' },
  ]},
  { section: 'MEDICAL & REPORTS', items: [
    { name: 'Consents',            icon: FileCheck,  path: '/consents' },
    { name: 'Reports',             icon: ClipboardList, path: '/reports' },
    { name: 'Certificates',        icon: FileText,   path: '/certificates' },
  ]},
  { section: 'HOSPITALIZATION', items: [
    { name: 'Hospitals',           icon: Building2,  path: '/hospitals' },
    { name: 'Wards',               icon: Building2,  path: '/wards' },
  ]},
  { section: 'DECEASED INFO', items: [
    { name: 'Body Identification', icon: Users,      path: '/body-id' },
    { name: 'Next of Kin',         icon: Users2,     path: '/next-of-kin' },
  ]},
  { section: 'ADMINISTRATION', items: [
    { name: 'Users',               icon: UserCircle, path: '/users' },
    { name: 'Doctors',             icon: Users2,     path: '/doctors' },
    { name: 'Audit Logs',          icon: List,       path: '/audit-logs' },
  ]},
  { section: 'ACCOUNT', items: [
    { name: 'Profile', icon: UserCircle, path: '/profile' },
    { name: 'Logout',  icon: LogOut,     path: '/logout', action: true },
  ]}
];

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const navContainerRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedScrollPos = sessionStorage.getItem('sidebarScrollPos');
    if (savedScrollPos && navContainerRef.current) {
      navContainerRef.current.scrollTop = parseInt(savedScrollPos, 10);
    }
  }, []);

  const handleScroll = (e) => {
    sessionStorage.setItem('sidebarScrollPos', e.target.scrollTop);
  };

  const handleNavigation = (path) => {
    if (path === '/logout') {
      authService.logout();
      navigate('/', { replace: true });
    } else if (path === '/') {
      navigate('/home');
    } else {
      navigate(path);
    }
  };

  const isActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    if (path !== '/dashboard' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <Scale className="logo-icon" size={28} />
        <div className="logo-text">
          <h2>Forensic Medical</h2>
          <p>Management System</p>
        </div>
      </div>

      <div className="sidebar-nav-container" ref={navContainerRef} onScroll={handleScroll}>
        <div className="sidebar-search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search items..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="sidebar-search-input"
          />
        </div>

        {(!searchTerm || 'dashboard'.includes(searchTerm.toLowerCase())) && (
          <div className={`nav-item dashboard-btn ${isActive('/dashboard') ? 'active' : ''}`} onClick={() => handleNavigation('/dashboard')}>
            <Home size={20} />
            <span>Dashboard</span>
          </div>
        )}

        {navItems.map((group, idx) => {
          const filteredItems = group.items.filter(item => 
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          
          if (filteredItems.length === 0) return null;

          return (
            <div key={idx} className="nav-group">
              <h3 className="nav-group-title">{group.section}</h3>
              <ul className="nav-list">
                {filteredItems.map((item, itemIdx) => (
                  <li 
                    key={itemIdx} 
                    className={`nav-item ${item.action ? 'action-item' : ''} ${isActive(item.path) ? 'active' : ''}`}
                    onClick={() => handleNavigation(item.path)}
                  >
                    <item.icon size={20} className="nav-icon" />
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="sidebar-footer">
        <Scale className="bg-logo" size={120} />
      </div>
    </aside>
  );
};

export default Sidebar;
