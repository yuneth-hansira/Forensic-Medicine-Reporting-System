import React from 'react';
import { 
  Users, Folder, Clock, CheckCircle, 
  FlaskConical, FileText, Building2, Calendar,
  UserPlus, FilePlus, Activity, Search
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

import './Dashboard.css';

const monthlyData = [
  { name: 'Jan', cases: 30 },
  { name: 'Feb', cases: 40 },
  { name: 'Mar', cases: 55 },
  { name: 'Apr', cases: 80 },
  { name: 'May', cases: 60 },
  { name: 'Jun', cases: 65 },
  { name: 'Jul', cases: 82 },
  { name: 'Aug', cases: 60 },
  { name: 'Sep', cases: 55 },
  { name: 'Oct', cases: 65 },
  { name: 'Nov', cases: 50 },
  { name: 'Dec', cases: 45 },
];

const pieData = [
  { name: 'Pending', value: 28, color: '#3b82f6' },
  { name: 'In Progress', value: 112, color: '#f59e0b' },
  { name: 'Completed', value: 296, color: '#8b5cf6' },
  { name: 'Court Submitted', value: 24, color: '#10b981' },
];

const Dashboard = () => {
  return (
    <div className="dashboard-content">
        
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-text">
            <h2>Welcome back, <span className="highlight">Dr. John Silva</span></h2>
            <p>Judicial Medical Officer | Forensic Medicine Department</p>
          </div>
          <div className="date-display">
            <Calendar size={18} className="date-icon" />
            <span className="date-text"><strong>21 July 2026</strong>, Monday</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card blue">
            <div className="stat-header">
              <Users size={24} className="stat-icon" />
              <span className="stat-title">Total Patients</span>
            </div>
            <div className="stat-value">1,245</div>
            <div className="stat-footer positive">
              <span>+12 today</span>
              <Activity size={14} />
            </div>
          </div>
          
          <div className="stat-card green">
            <div className="stat-header">
              <Folder size={24} className="stat-icon" />
              <span className="stat-title">Active Cases</span>
            </div>
            <div className="stat-value">324</div>
            <div className="stat-footer positive">
              <span>+8 today</span>
              <Activity size={14} />
            </div>
          </div>

          <div className="stat-card orange">
            <div className="stat-header">
              <Clock size={24} className="stat-icon" />
              <span className="stat-title">Pending Cases</span>
            </div>
            <div className="stat-value">28</div>
            <div className="stat-footer negative">
              <span>-3 today</span>
              <Activity size={14} />
            </div>
          </div>

          <div className="stat-card purple">
            <div className="stat-header">
              <CheckCircle size={24} className="stat-icon" />
              <span className="stat-title">Completed Cases</span>
            </div>
            <div className="stat-value">296</div>
            <div className="stat-footer positive">
              <span>+15 today</span>
              <Activity size={14} />
            </div>
          </div>

          <div className="stat-card red">
            <div className="stat-header">
              <FlaskConical size={24} className="stat-icon" />
              <span className="stat-title">Evidence Items</span>
            </div>
            <div className="stat-value">152</div>
            <div className="stat-footer positive">
              <span>+6 today</span>
              <Activity size={14} />
            </div>
          </div>

          <div className="stat-card teal">
            <div className="stat-header">
              <FileText size={24} className="stat-icon" />
              <span className="stat-title">Reports Generated</span>
            </div>
            <div className="stat-value">91</div>
            <div className="stat-footer positive">
              <span>+10 today</span>
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
                <span className="pie-total">324</span>
                <span className="pie-label">Total Cases</span>
              </div>
            </div>
            <div className="custom-legend">
              {pieData.map((item, index) => (
                <div className="legend-item" key={index}>
                  <div className="legend-indicator" style={{ backgroundColor: item.color }}></div>
                  <span className="legend-name">{item.name}</span>
                  <span className="legend-value">{item.value} 
                    <span className="legend-percent">({((item.value/460)*100).toFixed(1)}%)</span>
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
                    <td>C2026-1045</td>
                    <td>Nimal Perera</td>
                    <td>Dr. John Silva</td>
                    <td><span className="badge badge-warning">Pending</span></td>
                    <td>20/07/2026</td>
                    <td><button className="icon-btn"><Eye size={16}/></button></td>
                  </tr>
                  <tr>
                    <td>C2026-1044</td>
                    <td>Kasun Fernando</td>
                    <td>Dr. Chandima</td>
                    <td><span className="badge badge-info">In Progress</span></td>
                    <td>20/07/2026</td>
                    <td><button className="icon-btn"><Eye size={16}/></button></td>
                  </tr>
                  <tr>
                    <td>C2026-1043</td>
                    <td>Anjali De Silva</td>
                    <td>Dr. N. Perera</td>
                    <td><span className="badge badge-success">Completed</span></td>
                    <td>19/07/2026</td>
                    <td><button className="icon-btn"><Eye size={16}/></button></td>
                  </tr>
                  <tr>
                    <td>C2026-1042</td>
                    <td>Sahan Wijesinghe</td>
                    <td>Dr. John Silva</td>
                    <td><span className="badge badge-warning">Pending</span></td>
                    <td>19/07/2026</td>
                    <td><button className="icon-btn"><Eye size={16}/></button></td>
                  </tr>
                  <tr>
                    <td>C2026-1041</td>
                    <td>Ruwan Jayasekara</td>
                    <td>Dr. Chandima</td>
                    <td><span className="badge badge-success">Completed</span></td>
                    <td>18/07/2026</td>
                    <td><button className="icon-btn"><Eye size={16}/></button></td>
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
                    <td>PR2026-089</td>
                    <td>Kandy PS</td>
                    <td>Medico-legal Examination</td>
                    <td><span className="badge badge-light-green">New</span></td>
                  </tr>
                  <tr>
                    <td>PR2026-088</td>
                    <td>Matale PS</td>
                    <td>Postmortem Request</td>
                    <td><span className="badge badge-info">In Progress</span></td>
                  </tr>
                  <tr>
                    <td>PR2026-087</td>
                    <td>Peradeniya PS</td>
                    <td>Injury Examination</td>
                    <td><span className="badge badge-light-green">New</span></td>
                  </tr>
                  <tr>
                    <td>PR2026-086</td>
                    <td>Gampola PS</td>
                    <td>Postmortem Request</td>
                    <td><span className="badge badge-light-blue">Completed</span></td>
                  </tr>
                  <tr>
                    <td>PR2026-085</td>
                    <td>Kegalle PS</td>
                    <td>Medico-legal Examination</td>
                    <td><span className="badge badge-info">In Progress</span></td>
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
              <div className="schedule-item">
                <div className="time-badge blue">10:00 AM</div>
                <div className="schedule-info">
                  <span className="schedule-title">Case ID: C2026-1046</span>
                  <span className="schedule-desc">Patient: Dinesh Madushan</span>
                </div>
                <span className="tag blue">Medical Examination</span>
              </div>
              
              <div className="schedule-item">
                <div className="time-badge purple">11:30 AM</div>
                <div className="schedule-info">
                  <span className="schedule-title">Case ID: C2026-1047</span>
                  <span className="schedule-desc">Patient: Chamari Fernando</span>
                </div>
                <span className="tag purple">Injury Examination</span>
              </div>

              <div className="schedule-item">
                <div className="time-badge orange">02:00 PM</div>
                <div className="schedule-info">
                  <span className="schedule-title">Case ID: PM2026-0148</span>
                  <span className="schedule-desc">Patient: Unknown</span>
                </div>
                <span className="tag orange">Postmortem</span>
              </div>

              <div className="schedule-item">
                <div className="time-badge green">03:30 PM</div>
                <div className="schedule-info">
                  <span className="schedule-title">Case ID: C2026-1049</span>
                  <span className="schedule-desc">Patient: Thilina Perera</span>
                </div>
                <span className="tag green">Medical Examination</span>
              </div>
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
                      <td>EV2026-0152</td>
                      <td>C2026-1045</td>
                      <td>Blood Sample</td>
                      <td><span className="badge badge-success">Collected</span></td>
                      <td>Lab - Freezer 1</td>
                    </tr>
                    <tr>
                      <td>EV2026-0151</td>
                      <td>C2026-1044</td>
                      <td>Clothing</td>
                      <td><span className="badge badge-info">Stored</span></td>
                      <td>Evidence Room A</td>
                    </tr>
                    <tr>
                      <td>EV2026-0150</td>
                      <td>C2026-1043</td>
                      <td>Weapon</td>
                      <td><span className="badge badge-success">Collected</span></td>
                      <td>Evidence Room B</td>
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
                <div className="notification-item">
                  <div className="notif-icon green-bg"><CheckCircle size={16}/></div>
                  <div className="notif-content">
                    <p>New Police Request (PR2026-089) received from Kandy Police Station.</p>
                  </div>
                  <span className="notif-time">09:15 AM</span>
                </div>
                <div className="notification-item">
                  <div className="notif-icon blue-bg"><UserPlus size={16}/></div>
                  <div className="notif-content">
                    <p>New patient (Nimal Perera) registered.</p>
                  </div>
                  <span className="notif-time">09:10 AM</span>
                </div>
                <div className="notification-item">
                  <div className="notif-icon purple-bg"><FileText size={16}/></div>
                  <div className="notif-content">
                    <p>Court Report (CR2026-078) approved by Dr. John Silva.</p>
                  </div>
                  <span className="notif-time">08:45 AM</span>
                </div>
                <div className="notification-item">
                  <div className="notif-icon orange-bg"><FlaskConical size={16}/></div>
                  <div className="notif-content">
                    <p>New evidence (EV2026-0152) added to case C2026-1045.</p>
                  </div>
                  <span className="notif-time">08:30 AM</span>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="card list-card">
              <div className="card-header">
                <h3 className="card-title">Recent Activities</h3>
                <a href="#" className="view-all">View all</a>
              </div>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-time">09:10 AM</div>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Patient Registered</h4>
                    <p>Patient Nimal Perera registered by Clerk</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-time">09:45 AM</div>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Evidence Uploaded</h4>
                    <p>Evidence EV2026-0152 uploaded to case C2026-1045</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-time">10:20 AM</div>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Report Generated</h4>
                    <p>Postmortem Report PM2026-0147 generated</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-time">11:30 AM</div>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Case Updated</h4>
                    <p>Case C2026-1044 status changed to In Progress</p>
                  </div>
                </div>
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
