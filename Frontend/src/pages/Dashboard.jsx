import React, { useState, useEffect } from 'react';
import { 
  Users, Folder, Clock, CheckCircle, 
  FlaskConical, FileText, Building2, Calendar,
  UserPlus, FilePlus, Activity, Search
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import DashboardLayout from '../layouts/DashboardLayout';
import userService from '../services/userService';
import './Dashboard.css';

const monthlyData = [
  { name: 'Jan', cases: 0 },
  { name: 'Feb', cases: 0 },
  { name: 'Mar', cases: 0 },
  { name: 'Apr', cases: 0 },
  { name: 'May', cases: 0 },
  { name: 'Jun', cases: 0 },
  { name: 'Jul', cases: 0 },
  { name: 'Aug', cases: 0 },
  { name: 'Sep', cases: 0 },
  { name: 'Oct', cases: 0 },
  { name: 'Nov', cases: 0 },
  { name: 'Dec', cases: 0 },
];

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

          {/* Monthly Cases (Line Chart) */}
          <div className="card line-chart-card">
            <div className="card-header">
              <h3 className="card-title">Monthly Cases</h3>
              <select className="filter-select">
                <option>This Year</option>
                <option>Last Year</option>
              </select>
            </div>
            <div className="chart-container line-container">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={monthlyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                  />
                  <Line type="monotone" dataKey="cases" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Bottom Section: Tables and Lists */}
        <div className="bottom-section">
          
          {/* Recent Cases */}
          <div className="card table-card">
            <div className="card-header">
              <h3 className="card-title">Recent Cases</h3>
              <a href="#" className="view-all">View all</a>
            </div>
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Case ID</th>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No recent cases</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Police Requests */}
          <div className="card table-card">
            <div className="card-header">
              <h3 className="card-title">Recent Police Requests</h3>
              <a href="#" className="view-all">View all</a>
            </div>
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>Police Station</th>
                    <th>Purpose</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No recent requests</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Upcoming Examinations */}
          <div className="card list-card">
            <div className="card-header">
              <h3 className="card-title">Upcoming Examinations</h3>
              <a href="#" className="view-all">View all</a>
            </div>
            <div className="schedule-list">
              <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No upcoming examinations</div>
            </div>
          </div>

        </div>
        
        {/* Row 3 */}
        <div className="bottom-section-2">
            {/* Recent Evidence */}
            <div className="card table-card">
              <div className="card-header">
                <h3 className="card-title">Recent Evidence</h3>
                <a href="#" className="view-all">View all</a>
              </div>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Evidence ID</th>
                      <th>Case ID</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No recent evidence</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notifications */}
            <div className="card list-card">
              <div className="card-header">
                <h3 className="card-title">Notifications</h3>
                <a href="#" className="view-all">View all</a>
              </div>
              <div className="notification-list">
                <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No new notifications</div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="card list-card">
              <div className="card-header">
                <h3 className="card-title">Recent Activities</h3>
                <a href="#" className="view-all">View all</a>
              </div>
              <div className="timeline">
                <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No recent activities</div>
              </div>
            </div>

        </div>

      </div>
    );
};

// Simple Eye icon wrapper since it wasn't imported at top
const Eye = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
);

export default Dashboard;
