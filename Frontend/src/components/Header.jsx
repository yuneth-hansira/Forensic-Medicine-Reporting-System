import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  const location = useLocation();

  const getPageTitle = (pathname) => {
    if (pathname === '/dashboard' || pathname === '/') return 'Dashboard';
    
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length === 0) return 'Dashboard';
    
    const mainPart = parts[0];
    
    // Special cases mapping from sidebar
    const specialCases = {
      'pm-findings': 'PM Findings',
      'body-id': 'Body Identification',
      'next-of-kin': 'Next of Kin',
      'police-info': 'Police Info',
      'court-info': 'Court Info',
      'clinical-findings': 'Clinical Findings',
      'audit-logs': 'Audit Logs'
    };
    
    if (specialCases[mainPart]) return specialCases[mainPart];
    
    // Default Title Case conversion
    return mainPart
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const title = getPageTitle(location.pathname);

  return (
    <header className="main-header">
      <div className="header-left">
        <button className="menu-btn" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <h1 className="page-title">{title}</h1>
      </div>


      <div className="header-right"></div>
    </header>
  );
};

export default Header;
