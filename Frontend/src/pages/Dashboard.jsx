import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Folder, Clock, CheckCircle, 
  FlaskConical, FileText, Building2, Calendar,
  UserPlus, FilePlus, Activity, Search,
  BarChart3, Gavel, Download
} from 'lucide-react';
import { 
  Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  AreaChart, Area, XAxis, YAxis, CartesianGrid
} from 'recharts';
import DashboardLayout from '../layouts/DashboardLayout';
import userService from '../services/userService';
import api from '../services/api';
import './Dashboard.css';





const Dashboard = () => {
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [profileName, setProfileName] = useState('...');
  const [profileRole, setProfileRole] = useState('...');
  const [stats, setStats] = useState({
    totalPatients: 0,
    activeCases: 0,
    pendingCases: 0,
    completedCases: 0,
    usersCount: 0
  });
  const [dashboardPieData, setDashboardPieData] = useState([]);
  const [timelineData, setTimelineData] = useState([]);

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

    // Fetch Dashboard Stats
    api.get('/dashboard').then(response => {
      if (response.data && response.data.stats) {
        setStats(response.data.stats);
        if (response.data.pieData) {
           setDashboardPieData(response.data.pieData);
        }
        if (response.data.monthlyCases) {
           const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
           const formattedTimeline = response.data.monthlyCases.map((count, index) => ({
             name: months[index],
             cases: count
           }));
           setTimelineData(formattedTimeline);
        }
      }
    }).catch(err => console.error('Failed to load dashboard stats:', err));

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
            <h2>Welcome, <span className="highlight">{profileName}</span></h2>
            <p>{profileRole}</p>
          </div>
          <div 
            className="date-display" 
            onClick={() => navigate('/calendar')} 
            style={{ cursor: 'pointer' }}
            title="View Full Calendar"
          >
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
              <span className="stat-title">Total Users</span>
            </div>
            <div className="stat-value">{stats.usersCount}</div>
            <div className="stat-footer neutral">
              <span>Active accounts</span>
              <Activity size={14} />
            </div>
          </div>
          
          <div className="stat-card teal">
            <div className="stat-header">
              <Users size={24} className="stat-icon" />
              <span className="stat-title">Total Patients</span>
            </div>
            <div className="stat-value">{stats.totalPatients}</div>
            <div className="stat-footer neutral">
              <span>All registered</span>
              <Activity size={14} />
            </div>
          </div>

          <div className="stat-card green">
            <div className="stat-header">
              <Folder size={24} className="stat-icon" />
              <span className="stat-title">Active Cases</span>
            </div>
            <div className="stat-value">{stats.activeCases}</div>
            <div className="stat-footer neutral">
              <span>In progress</span>
              <Activity size={14} />
            </div>
          </div>

          <div className="stat-card orange">
            <div className="stat-header">
              <Clock size={24} className="stat-icon" />
              <span className="stat-title">Pending Cases</span>
            </div>
            <div className="stat-value">{stats.pendingCases}</div>
            <div className="stat-footer neutral">
              <span>Awaiting action</span>
              <Activity size={14} />
            </div>
          </div>

          <div className="stat-card purple">
            <div className="stat-header">
              <CheckCircle size={24} className="stat-icon" />
              <span className="stat-title">Completed Cases</span>
            </div>
            <div className="stat-value">{stats.completedCases}</div>
            <div className="stat-footer neutral">
              <span>Closed cases</span>
              <Activity size={14} />
            </div>
          </div>

        </div>

        {/* Middle Section: Quick Actions & Charts */}
        <div className="middle-section">
          
          {/* Reports */}
          <div className="card quick-actions-card">
            <h3 className="card-title"><FileText size={18} style={{marginRight:'0.5rem'}}/> Reports</h3>
            <div className="reports-grid">
              <button className="report-btn" onClick={() => navigate('/reports/view/daily')}>
                <div className="report-btn-icon" style={{backgroundColor:'#eff6ff', color:'#3b82f6'}}>
                  <Calendar size={22} />
                </div>
                <div className="report-btn-info">
                  <span className="report-btn-title">Daily Case Report</span>
                  <span className="report-btn-desc">Today's registered cases</span>
                </div>
              </button>
              <button className="report-btn" onClick={() => navigate('/reports/view/monthly')}>
                <div className="report-btn-icon" style={{backgroundColor:'#f5f3ff', color:'#8b5cf6'}}>
                  <BarChart3 size={22} />
                </div>
                <div className="report-btn-info">
                  <span className="report-btn-title">Monthly Report</span>
                  <span className="report-btn-desc">This month's summary</span>
                </div>
              </button>
              <button className="report-btn" onClick={() => navigate('/reports/view/pending')}>
                <div className="report-btn-icon" style={{backgroundColor:'#fffbeb', color:'#f59e0b'}}>
                  <Clock size={22} />
                </div>
                <div className="report-btn-info">
                  <span className="report-btn-title">Pending Cases</span>
                  <span className="report-btn-desc">Awaiting action</span>
                </div>
              </button>
              <button className="report-btn" onClick={() => navigate('/reports/view/court')}>
                <div className="report-btn-icon" style={{backgroundColor:'#ecfdf5', color:'#10b981'}}>
                  <Gavel size={22} />
                </div>
                <div className="report-btn-info">
                  <span className="report-btn-title">Court Report</span>
                  <span className="report-btn-desc">Court submissions & trials</span>
                </div>
              </button>
              <button className="report-btn" onClick={() => navigate('/reports/view/statistical')}>
                <div className="report-btn-icon" style={{backgroundColor:'#fef2f2', color:'#ef4444'}}>
                  <BarChart3 size={22} />
                </div>
                <div className="report-btn-info">
                  <span className="report-btn-title">Statistical Report</span>
                  <span className="report-btn-desc">Overall analytics</span>
                </div>
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
                    data={dashboardPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dashboardPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-center-text">
                <span className="pie-total">{dashboardPieData.reduce((acc, curr) => acc + curr.value, 0)}</span>
                <span className="pie-label">Total Cases</span>
              </div>
            </div>
            <div className="custom-legend">
              {dashboardPieData.map((item, index) => {
                const total = dashboardPieData.reduce((acc, curr) => acc + curr.value, 0);
                const percent = total > 0 ? Math.round((item.value / total) * 100) : 0;
                return (
                  <div className="legend-item" key={index}>
                    <div className="legend-indicator" style={{ backgroundColor: item.color }}></div>
                    <span className="legend-name">{item.name}</span>
                    <span className="legend-value">{item.value} 
                      <span className="legend-percent">({percent}%)</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Timeline Chart */}
          <div className="card timeline-card">
            <h3 className="card-title">Cases Timeline (This Year)</h3>
            <div className="chart-container" style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                  />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="cases" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorCases)" 
                    activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
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
