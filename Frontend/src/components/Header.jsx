import React from 'react';
import { Menu } from 'lucide-react';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="main-header">
      <div className="header-left">
        <button type="button" className="menu-btn" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <h1 className="page-title">Dashboard</h1>
      </div>


      <div className="header-right"></div>
    </header>
  );
};

export default Header;
