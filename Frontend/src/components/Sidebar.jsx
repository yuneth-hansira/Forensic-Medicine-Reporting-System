import React from 'react';
import { 
  Home, Users, FolderOpen, ShieldAlert, Activity, 
  FileText, Shield, Gavel, Users2, Building2, Clock,
  Settings, UserCircle, LogOut, Scale,
  List, UserPlus, Calendar, AlertCircle, BarChart2, FileCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

// ClipboardList fallback using FileText alias
const ClipboardList = FileText;

const navItems = [
  { section: 'CASE MANAGEMENT', items: [
    { name: 'Case Dashboard',      icon: Activity,     path: '/cases' },
    { name: 'All Cases',           icon: FolderOpen,   path: '/cases/list' },
    { name: 'New Case',            icon: FileText,     path: '/cases/new' },
    { name: 'Timeline',            icon: Clock,        path: '/cases/C2026-1045/timeline' },
    { name: 'Documents',           icon: ClipboardList,path: '/cases/C2026-1045/documents' },
  ]},
  { section: 'EXAMINEE MANAGEMENT', items: [
    { name: 'Examinee List',       icon: Users,        path: '/examinees' },
    { name: 'Register Examinee',   icon: UserPlus,     path: '/examinees/new' },
    { name: 'Medical History',     icon: FileText,     path: '/examinees/EX-2026-0891/history' },
    { name: 'Consent Forms',       icon: FileCheck,    path: '/examinees/EX-2026-0891/consent' },
  ]},
  { section: 'PATIENT MANAGEMENT', items: [
    { name: 'Patients',            icon: Users,      path: '/patients' },
    { name: 'Register Patient',    icon: UserPlus,   path: '/patients/register' },
    { name: 'Appointments',        icon: Calendar,   path: '/patients/appointments' },
    { name: 'Medical Reports',     icon: ClipboardList, path: '/patients/reports' },
    { name: 'Injury Docs',         icon: AlertCircle,path: '/patients/PT-2026-1045/injuries' },
    { name: 'Analytics',           icon: BarChart2,  path: '/patients/analytics' },
  ]},
  { section: 'ADMINISTRATION', items: [
    { name: 'Deceased',         icon: Shield,    path: '/deceased' },
    { name: 'Clinical Findings',icon: Activity,  path: '/clinical-findings' },
    { name: 'Doctors',          icon: Users2,    path: '/doctors' },
    { name: 'Settings',         icon: Settings,  path: '/settings' },
  ]},
  { section: 'OTHER', items: [
    { name: 'Profile', icon: UserCircle, path: '/profile' },
    { name: 'Logout',  icon: LogOut,     path: '/logout', action: true },
  ]}
];

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (path === '/logout') {
      navigate('/');
    } else if (path === '/') {
      navigate('/home');
    } else {
      navigate(path);
    }
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

      <div className="sidebar-nav-container">
        <div className="nav-item active dashboard-btn" onClick={() => handleNavigation('/dashboard')}>
          <Home size={20} />
          <span>Dashboard</span>
        </div>

        {navItems.map((group, idx) => (
          <div key={idx} className="nav-group">
            <h3 className="nav-group-title">{group.section}</h3>
            <ul className="nav-list">
              {group.items.map((item, itemIdx) => (
                <li 
                  key={itemIdx} 
                  className={`nav-item ${item.action ? 'action-item' : ''}`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <item.icon size={20} className="nav-icon" />
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="footer-content">
          <p className="version">FMMS v1.0</p>
          <p className="copyright">© 2026 All rights reserved.</p>
        </div>
        <Scale className="bg-logo" size={120} />
      </div>
    </aside>
  );
};

export default Sidebar;
