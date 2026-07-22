import React, { useState, useEffect } from 'react';
import { 
  Users, Folder, Clock, CheckCircle, 
  FlaskConical, FileText, Building2, Calendar,
  UserPlus, FilePlus, Activity, Search
} from 'lucide-react';
import { 
  Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import DashboardLayout from '../layouts/DashboardLayout';
import userService from '../services/userService';
import './Dashboard.css';



const pieData = [
  { name: 'Pending', value: 0, color: '#3b82f6' },
  { name: 'In Progress', value: 0, color: '#f59e0b' },
  { name: 'Completed', value: 0, color: '#8b5cf6' },
  { name: 'Court Submitted', value: 0, color: '#10b981' },
];

const Dashboard = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [profileName, setProfileName] = useState('...');
  const [profileRole, setProfileRole] = useState('...');

  useEffect(() => {
    // Clock
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    
    // Fetch Profile
    userService.getProfile().then(data => {
      setProfileName(data.Name || data.Username || 'Unknown User');
      if (data.Designation && data.Role) {
         setProfileRole(`${data.Designation} | ${data.Role}`);
      } else {
         setProfileRole(data.Designation || data.Role || 'Staff Member');
      }
    }).catch(err => console.error('Failed to load profile:', err));

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const formatDay = (date) => date.toLocaleDateString('en-GB', { weekday: 'long' });
  const formatTime = (date) => date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <DashboardLayout>
      <div className="dashboard-content">
        
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-text">
            <h2>Welcome back, <span className="highlight">{profileName}</span></h2>
            <p>{profileRole}</p>
          </div>
          <div className="date-display">
            <Calendar size={18} className="date-icon" />
            <span className="date-text">
              <strong>{formatDate(currentDateTime)}</strong>, {formatDay(currentDateTime)} • {formatTime(currentDateTime)}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card blue">
            <div className="stat-header">
              <Users size={24} className="stat-icon" />
              <span className="stat-title">Total Patients</span>
            </div>
            <div className="stat-value">0</div>
            <div className="stat-footer neutral">
              <span>0 today</span>
              <Activity size={14} />
            </div>
          </div>
          
          <div className="stat-card green">
            <div className="stat-header">
              <Folder size={24} className="stat-icon" />
              <span className="stat-title">Active Cases</span>
            </div>
            <div className="stat-value">0</div>
            <div className="stat-footer neutral">
              <span>0 today</span>
              <Activity size={14} />
            </div>
          </div>

          <div className="stat-card orange">
            <div className="stat-header">
              <Clock size={24} className="stat-icon" />
              <span className="stat-title">Pending Cases</span>
            </div>
            <div className="stat-value">0</div>
            <div className="stat-footer neutral">
              <span>0 today</span>
              <Activity size={14} />
            </div>
          </div>

          <div className="stat-card purple">
            <div className="stat-header">
              <CheckCircle size={24} className="stat-icon" />
              <span className="stat-title">Completed Cases</span>
            </div>
            <div className="stat-value">0</div>
            <div className="stat-footer neutral">
              <span>0 today</span>
              <Activity size={14} />
            </div>
          </div>

          <div className="stat-card red">
            <div className="stat-header">
              <FlaskConical size={24} className="stat-icon" />
              <span className="stat-title">Evidence Items</span>
            </div>
            <div className="stat-value">0</div>
            <div className="stat-footer neutral">
              <span>0 today</span>
              <Activity size={14} />
            </div>
          </div>

          <div className="stat-card teal">
            <div className="stat-header">
              <FileText size={24} className="stat-icon" />
              <span className="stat-title">Reports Generated</span>
            </div>
            <div className="stat-value">0</div>
            <div className="stat-footer neutral">
              <span>0 today</span>
              <Activity size={14} />
            </div>
          </div>

          <div className="stat-card blue-grey">
            <div className="stat-header">
              <Building2 size={24} className="stat-icon" />
              <span className="stat-title">Departments</span>
            </div>
            <div className="stat-value">6</div>
            <div className="stat-footer neutral">
              <span>—</span>
            </div>
          </div>
        </div>

        {/* Middle Section: Quick Actions & Charts */}
        <div className="middle-section">
          
          {/* Quick Actions */}
          <div className="card quick-actions-card">
            <h3 className="card-title">Quick Actions</h3>
            <div className="actions-grid">
              <button className="action-btn">
                <UserPlus size={24} className="action-icon text-blue" />
                <span>Register Patient</span>
              </button>
              <button className="action-btn">
                <FilePlus size={24} className="action-icon text-green" />
                <span>Create New Case</span>
              </button>
              <button className="action-btn">
                <Activity size={24} className="action-icon text-purple" />
                <span>Add Examination</span>
              </button>
              <button className="action-btn">
                <FlaskConical size={24} className="action-icon text-red" />
                <span>Add Evidence</span>
              </button>
              <button className="action-btn">
                <FileText size={24} className="action-icon text-orange" />
                <span>Generate Report</span>
              </button>
              <button className="action-btn">
                <Search size={24} className="action-icon text-teal" />
                <span>Search Patient</span>
              </button>
              <button className="action-btn">
                <Folder size={24} className="action-icon text-blue" />
                <span>Search Case</span>
              </button>
              <button className="action-btn">
                <Calendar size={24} className="action-icon text-pink" />
                <span>View Calendar</span>
              </button>
            </div>
          </div>

          {/* Case Status Overview (Pie Chart) */}
          <div className="card pie-chart-card">
            <h3 className="card-title">Case Status Overview</h3>
            <div className="chart-container pie-container">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-center-text">
                <span className="pie-total">0</span>
                <span className="pie-label">Total Cases</span>
              </div>
            </div>
            <div className="custom-legend">
              {pieData.map((item, index) => (
                <div className="legend-item" key={index}>
                  <div className="legend-indicator" style={{ backgroundColor: item.color }}></div>
                  <span className="legend-name">{item.name}</span>
                  <span className="legend-value">{item.value} 
                    <span className="legend-percent">(0%)</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

// Simple Eye icon wrapper since it wasn't imported at top
const Eye = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
);

export default Dashboard;
