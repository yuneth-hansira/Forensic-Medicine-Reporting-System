import React from 'react';
import { Menu, Search, Bell } from 'lucide-react';
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

      <div className="header-center">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search patients, cases, reports..." />
        </div>
      </div>

      <div className="header-right">
        <button className="notification-btn">
          <Bell size={20} />
          <span className="notification-badge">5</span>
        </button>
        
        <div className="user-profile">
          <div className="avatar">
            <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Doctor Profile" />
          </div>
          <div className="user-info">
            <span className="user-name">Dr. John Silva</span>
            <span className="user-role">JMO</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
