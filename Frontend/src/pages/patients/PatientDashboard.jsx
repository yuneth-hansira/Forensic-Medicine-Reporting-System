import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  Users, FolderOpen, Clock, CheckCircle, TrendingUp,
  UserPlus, Search, FileText, Calendar, Activity,
  ArrowUpRight, Eye, MoreHorizontal, Filter
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import '../patients/patients.css';
import './PatientDashboard.css';

const areaData = [
  { month: 'Jan', patients: 42 }, { month: 'Feb', patients: 58 },
  { month: 'Mar', patients: 71 }, { month: 'Apr', patients: 65 },
  { month: 'May', patients: 89 }, { month: 'Jun', patients: 78 },
  { month: 'Jul', patients: 95 }, { month: 'Aug', patients: 82 },
  { month: 'Sep', patients: 110 },{ month: 'Oct', patients: 98 },
  { month: 'Nov', patients: 115 },{ month: 'Dec', patients: 130 },
];

const caseTypeData = [
  { name: 'Medico-Legal', value: 38, color: '#2563eb' },
  { name: 'Postmortem',   value: 22, color: '#8b5cf6' },
  { name: 'Injury',       value: 25, color: '#10b981' },
  { name: 'Toxicology',   value: 15, color: '#f59e0b' },
];

const recentPatients = [
  { id: 'PT-2026-1045', name: 'Nimal Perera',    age: 34, gender: 'Male',   caseType: 'Medico-Legal',  status: 'active',      doctor: 'Dr. John Silva',  date: '20 Jul 2026' },
  { id: 'PT-2026-1044', name: 'Kasun Fernando',  age: 28, gender: 'Male',   caseType: 'Injury',        status: 'pending',     doctor: 'Dr. Chandima',    date: '20 Jul 2026' },
  { id: 'PT-2026-1043', name: 'Anjali De Silva', age: 45, gender: 'Female', caseType: 'Postmortem',    status: 'completed',   doctor: 'Dr. N. Perera',   date: '19 Jul 2026' },
  { id: 'PT-2026-1042', name: 'Sahan Wijesiri',  age: 52, gender: 'Male',   caseType: 'Toxicology',    status: 'in-progress', doctor: 'Dr. John Silva',  date: '19 Jul 2026' },
  { id: 'PT-2026-1041', name: 'Ruwan Jayasekara',age: 38, gender: 'Male',   caseType: 'Medico-Legal',  status: 'completed',   doctor: 'Dr. Chandima',    date: '18 Jul 2026' },
];

const statusMap = {
  active:      { label: 'Active',      cls: 'pm-badge-active' },
  pending:     { label: 'Pending',     cls: 'pm-badge-pending' },
  completed:   { label: 'Completed',   cls: 'pm-badge-completed' },
  'in-progress':{ label: 'In Progress', cls: 'pm-badge-in-progress' },
};

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <DashboardLayout>
      <div className="pm-page">
        {/* Header */}
        <div className="pm-page-header">
          <div>
            <div className="pm-breadcrumb">
              <a href="#">Home</a><span>/</span><span>Patient Management</span>
            </div>
            <h1 className="pm-page-title">Patient Management</h1>
            <p className="pm-page-subtitle">Monitor, manage and track all forensic patients</p>
          </div>
          <div className="pm-header-actions">
            <button className="pm-btn pm-btn-secondary"><Filter size={16}/>Filters</button>
            <button className="pm-btn pm-btn-primary" onClick={() => window.location.href='/patients/register'}>
              <UserPlus size={16}/>Register Patient
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="pm-kpi-grid">
          <div className="pm-kpi-card blue">
            <div className="pm-kpi-icon"><Users size={24}/></div>
            <div className="pm-kpi-info">
              <p className="pm-kpi-label">Total Patients</p>
              <p className="pm-kpi-value">1,245</p>
              <div className="pm-kpi-trend up"><TrendingUp size={13}/>+12 today</div>
            </div>
          </div>
          <div className="pm-kpi-card orange">
            <div className="pm-kpi-icon"><Clock size={24}/></div>
            <div className="pm-kpi-info">
              <p className="pm-kpi-label">Pending Reports</p>
              <p className="pm-kpi-value">38</p>
              <div className="pm-kpi-trend down"><TrendingUp size={13}/>-3 since yesterday</div>
            </div>
          </div>
          <div className="pm-kpi-card purple">
            <div className="pm-kpi-icon"><Activity size={24}/></div>
            <div className="pm-kpi-info">
              <p className="pm-kpi-label">Today's Cases</p>
              <p className="pm-kpi-value">14</p>
              <div className="pm-kpi-trend up"><TrendingUp size={13}/>+5 new</div>
            </div>
          </div>
          <div className="pm-kpi-card green">
            <div className="pm-kpi-icon"><CheckCircle size={24}/></div>
            <div className="pm-kpi-info">
              <p className="pm-kpi-label">Completed Cases</p>
              <p className="pm-kpi-value">296</p>
              <div className="pm-kpi-trend up"><TrendingUp size={13}/>+15 this week</div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="pd-charts-row">
          {/* Area Chart */}
          <div className="pm-card pd-chart-main">
            <div className="pm-card-header">
              <h3 className="pm-card-title">Patient Registrations — 2026</h3>
              <select className="pm-filter-select" style={{minWidth:'120px',padding:'0.4rem 0.75rem',fontSize:'0.8rem'}}>
                <option>This Year</option><option>Last Year</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={areaData} margin={{top:5,right:10,bottom:0,left:-10}}>
                <defs>
                  <linearGradient id="colorPat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#2563eb" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize:11,fill:'#94a3b8'}} dy={8}/>
                <YAxis axisLine={false} tickLine={false} tick={{fontSize:11,fill:'#94a3b8'}}/>
                <Tooltip contentStyle={{borderRadius:'10px',border:'none',boxShadow:'0 4px 12px rgba(0,0,0,0.12)',fontSize:'0.85rem'}}/>
                <Area type="monotone" dataKey="patients" stroke="#2563eb" strokeWidth={2.5} fill="url(#colorPat)" dot={{r:3,fill:'#2563eb',strokeWidth:2,stroke:'#fff'}} activeDot={{r:5}}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="pm-card pd-chart-side">
            <div className="pm-card-header">
              <h3 className="pm-card-title">Case Type Distribution</h3>
            </div>
            <ResponsiveContainer width="100%" height={175}>
              <PieChart>
                <Pie data={caseTypeData} cx="50%" cy="50%" outerRadius={70} innerRadius={42} paddingAngle={4} dataKey="value">
                  {caseTypeData.map((e, i) => <Cell key={i} fill={e.color}/>)}
                </Pie>
                <Tooltip contentStyle={{borderRadius:'10px',border:'none',boxShadow:'0 4px 12px rgba(0,0,0,0.12)',fontSize:'0.85rem'}}/>
              </PieChart>
            </ResponsiveContainer>
            <div className="pd-pie-legend">
              {caseTypeData.map((e,i) => (
                <div key={i} className="pd-legend-item">
                  <span className="pd-legend-dot" style={{background:e.color}}/>
                  <span className="pd-legend-name">{e.name}</span>
                  <span className="pd-legend-val">{e.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pm-card" style={{marginBottom:'1.5rem'}}>
          <h3 className="pm-card-title" style={{marginBottom:'1.25rem'}}>Quick Actions</h3>
          <div className="pm-quick-actions">
            {[
              { icon: <UserPlus size={24}/>, label: 'Register Patient',   href:'/patients/register' },
              { icon: <Search    size={24}/>, label: 'Search Patient',    href:'/patients/list' },
              { icon: <FileText  size={24}/>, label: 'Generate Report',   href:'/patients/reports' },
              { icon: <Calendar  size={24}/>, label: 'Appointments',      href:'/patients/appointments' },
              { icon: <Eye       size={24}/>, label: 'Patient Details',   href:'/patients/profile' },
              { icon: <Activity  size={24}/>, label: 'Analytics',         href:'/patients/analytics' },
              { icon: <FolderOpen size={24}/>,label: 'All Cases',         href:'/cases' },
              { icon: <Clock     size={24}/>, label: 'Pending Reports',   href:'/patients/reports' },
            ].map((a,i) => (
              <button key={i} className="pm-quick-action-btn" onClick={()=>window.location.href=a.href}>
                <span className="pm-qa-icon">{a.icon}</span>
                <span className="pm-qa-label">{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Patients Table */}
        <div className="pm-card">
          <div className="pm-card-header">
            <h3 className="pm-card-title">Recent Patients</h3>
            <div style={{display:'flex',gap:'0.75rem',alignItems:'center'}}>
              <div className="pd-tab-pills">
                {['all','active','pending','completed'].map(t => (
                  <button key={t} className={`pd-pill ${activeTab===t?'active':''}`} onClick={()=>setActiveTab(t)}>
                    {t.charAt(0).toUpperCase()+t.slice(1)}
                  </button>
                ))}
              </div>
              <button className="pm-btn pm-btn-secondary pm-btn-sm" onClick={()=>window.location.href='/patients/list'}>
                <ArrowUpRight size={14}/> View All
              </button>
            </div>
          </div>
          <div className="pm-table-wrapper">
            <table className="pm-table">
              <thead>
                <tr>
                  <th>Patient ID</th><th>Name</th><th>Age / Gender</th>
                  <th>Case Type</th><th>Assigned Doctor</th><th>Status</th>
                  <th>Date</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentPatients.map((p,i) => (
                  <tr key={i}>
                    <td><code style={{fontSize:'0.78rem',color:'#2563eb',fontWeight:600}}>{p.id}</code></td>
                    <td>
                      <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
                        <div className="pm-avatar-placeholder pm-avatar-sm" style={{fontSize:'0.75rem'}}>
                          {p.name.charAt(0)}
                        </div>
                        <span style={{fontWeight:600,color:'#0f172a'}}>{p.name}</span>
                      </div>
                    </td>
                    <td>{p.age} / {p.gender}</td>
                    <td><span style={{fontSize:'0.78rem',fontWeight:600,color:'#475569'}}>{p.caseType}</span></td>
                    <td>{p.doctor}</td>
                    <td><span className={`pm-badge ${statusMap[p.status].cls}`}>{statusMap[p.status].label}</span></td>
                    <td style={{color:'#94a3b8',fontSize:'0.8rem'}}>{p.date}</td>
                    <td>
                      <div className="pm-action-menu">
                        <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.65rem'}}>
                          <Eye size={14}/>
                        </button>
                        <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.65rem'}}>
                          <MoreHorizontal size={14}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
