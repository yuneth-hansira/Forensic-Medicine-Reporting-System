import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  BarChart2, Users, FileText, Activity, TrendingUp,
  Download, Filter, Calendar, PieChart as PieIcon
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart,
  Line, AreaChart, Area, Legend
} from 'recharts';
import '../patients/patients.css';
import './PatientAnalytics.css';

const monthlyRegistrations = [
  {month:'Jan',patients:0,completed:0,pending:0},
  {month:'Feb',patients:0,completed:0,pending:0},
  {month:'Mar',patients:0,completed:0,pending:0},
  {month:'Apr',patients:0,completed:0,pending:0},
  {month:'May',patients:0,completed:0,pending:0},
  {month:'Jun',patients:0,completed:0,pending:0},
  {month:'Jul',patients:0,completed:0,pending:0},
  {month:'Aug',patients:0,completed:0,pending:0},
  {month:'Sep',patients:0,completed:0,pending:0},
  {month:'Oct',patients:0,completed:0,pending:0},
  {month:'Nov',patients:0,completed:0,pending:0},
  {month:'Dec',patients:0,completed:0,pending:0},
];

const genderData = [
  {name:'Male',   value:0,color:'#2563eb'},
  {name:'Female', value:0,color:'#ec4899'},
  {name:'Other',  value:0, color:'#94a3b8'},
];

const ageData = [
  {group:'0-18',  count:0},
  {group:'19-30', count:0},
  {group:'31-45', count:0},
  {group:'46-60', count:0},
  {group:'61-75', count:0},
  {group:'75+',   count:0},
];

const caseTypeData = [
  {type:'Medico-Legal',  count:0,color:'#2563eb'},
  {type:'Injury',        count:0,color:'#10b981'},
  {type:'Postmortem',    count:0,color:'#8b5cf6'},
  {type:'Toxicology',    count:0,color:'#f59e0b'},
  {type:'Sexual Assault',count:0, color:'#ef4444'},
  {type:'Other',         count:0,color:'#64748b'},
];

const completionRateData = [
  {month:'Jan',rate:0},{month:'Feb',rate:0},{month:'Mar',rate:0},
  {month:'Apr',rate:0},{month:'May',rate:0},{month:'Jun',rate:0},
  {month:'Jul',rate:0},{month:'Aug',rate:0},{month:'Sep',rate:0},
  {month:'Oct',rate:0},{month:'Nov',rate:0},{month:'Dec',rate:0},
];

const PatientAnalytics = () => {
  return (
    <DashboardLayout>
      <div className="pm-page">
        <div className="pm-page-header">
          <div>
            <div className="pm-breadcrumb">
              <a href="/patients">Patient Management</a><span>/</span><span>Analytics</span>
            </div>
            <h1 className="pm-page-title">Patient Analytics</h1>
            <p className="pm-page-subtitle">Comprehensive statistics and insights — 2026</p>
          </div>
          <div className="pm-header-actions">
            <select className="pm-filter-select"><option>2026</option><option>2025</option></select>
            <button className="pm-btn pm-btn-secondary"><Download size={16}/>Export Report</button>
          </div>
        </div>

        {/* KPI Row */}
        <div className="pm-kpi-grid">
          <div className="pm-kpi-card blue">
            <div className="pm-kpi-icon"><Users size={24}/></div>
            <div className="pm-kpi-info">
              <p className="pm-kpi-label">Total Patients</p>
              <p className="pm-kpi-value">0</p>
              <div className="pm-kpi-trend up"><TrendingUp size={13}/>+0% vs last year</div>
            </div>
          </div>
          <div className="pm-kpi-card green">
            <div className="pm-kpi-icon"><Activity size={24}/></div>
            <div className="pm-kpi-info">
              <p className="pm-kpi-label">Avg. Per Month</p>
              <p className="pm-kpi-value">0</p>
              <div className="pm-kpi-trend up"><TrendingUp size={13}/>+0% vs last year</div>
            </div>
          </div>
          <div className="pm-kpi-card purple">
            <div className="pm-kpi-icon"><FileText size={24}/></div>
            <div className="pm-kpi-info">
              <p className="pm-kpi-label">Reports Generated</p>
              <p className="pm-kpi-value">0</p>
              <div className="pm-kpi-trend up"><TrendingUp size={13}/>+0% vs last year</div>
            </div>
          </div>
          <div className="pm-kpi-card orange">
            <div className="pm-kpi-icon"><BarChart2 size={24}/></div>
            <div className="pm-kpi-info">
              <p className="pm-kpi-label">Completion Rate</p>
              <p className="pm-kpi-value">0%</p>
              <div className="pm-kpi-trend up"><TrendingUp size={13}/>+0% vs last year</div>
            </div>
          </div>
        </div>

        {/* Monthly Registrations */}
        <div className="pm-card pa-card-lg">
          <div className="pm-card-header">
            <h3 className="pm-card-title">Monthly Patient Registrations vs Completions</h3>
            <div style={{display:'flex',gap:'1rem',alignItems:'center',fontSize:'0.8rem',fontWeight:600}}>
              <span style={{display:'flex',alignItems:'center',gap:4}}><span style={{width:10,height:10,borderRadius:2,background:'#2563eb',display:'inline-block'}}/> Registered</span>
              <span style={{display:'flex',alignItems:'center',gap:4}}><span style={{width:10,height:10,borderRadius:2,background:'#10b981',display:'inline-block'}}/> Completed</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyRegistrations} margin={{top:5,right:10,bottom:0,left:-10}} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize:11,fill:'#94a3b8'}} dy={8}/>
              <YAxis axisLine={false} tickLine={false} tick={{fontSize:11,fill:'#94a3b8'}}/>
              <Tooltip contentStyle={{borderRadius:'10px',border:'none',boxShadow:'0 4px 12px rgba(0,0,0,0.12)',fontSize:'0.85rem'}}/>
              <Bar dataKey="patients"  name="Registered" fill="#2563eb" radius={[4,4,0,0]}/>
              <Bar dataKey="completed" name="Completed"  fill="#10b981" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Middle Row */}
        <div className="pa-middle-grid">
          {/* Gender */}
          <div className="pm-card">
            <h3 className="pm-card-title">Gender Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={genderData} cx="50%" cy="50%" outerRadius={75} innerRadius={45} paddingAngle={4} dataKey="value">
                  {genderData.map((e,i)=><Cell key={i} fill={e.color}/>)}
                </Pie>
                <Tooltip contentStyle={{borderRadius:'10px',border:'none',fontSize:'0.85rem'}}/>
              </PieChart>
            </ResponsiveContainer>
            <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
              {genderData.map((g,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:'0.75rem',fontSize:'0.82rem'}}>
                  <span style={{width:10,height:10,borderRadius:2,background:g.color,flexShrink:0}}/>
                  <span style={{flex:1,color:'#475569',fontWeight:500}}>{g.name}</span>
                  <span style={{fontWeight:700,color:'#0f172a'}}>{g.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Age Groups */}
          <div className="pm-card">
            <h3 className="pm-card-title">Age Group Distribution</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={ageData} layout="vertical" margin={{top:0,right:10,bottom:0,left:10}}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9"/>
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fontSize:11,fill:'#94a3b8'}}/>
                <YAxis type="category" dataKey="group" axisLine={false} tickLine={false} tick={{fontSize:11,fill:'#64748b'}} width={40}/>
                <Tooltip contentStyle={{borderRadius:'10px',border:'none',fontSize:'0.85rem'}}/>
                <Bar dataKey="count" fill="#2563eb" radius={[0,4,4,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Completion Rate Trend */}
          <div className="pm-card">
            <h3 className="pm-card-title">Report Completion Rate (%)</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={completionRateData} margin={{top:5,right:10,bottom:0,left:-15}}>
                <defs>
                  <linearGradient id="rateGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize:11,fill:'#94a3b8'}} dy={8}/>
                <YAxis domain={[80,100]} axisLine={false} tickLine={false} tick={{fontSize:11,fill:'#94a3b8'}}/>
                <Tooltip contentStyle={{borderRadius:'10px',border:'none',fontSize:'0.85rem'}} formatter={(v)=>`${v}%`}/>
                <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2.5} dot={{r:3,fill:'#10b981'}} activeDot={{r:5}}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Case Type Distribution */}
        <div className="pm-card">
          <div className="pm-card-header">
            <h3 className="pm-card-title">Case Type Breakdown</h3>
          </div>
          <div className="pa-case-grid">
            {caseTypeData.map((c,i) => {
              const pct = Math.round((c.count/1245)*100);
              return (
                <div key={i} className="pa-case-bar-item">
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.4rem'}}>
                    <span style={{fontSize:'0.82rem',fontWeight:600,color:'#334155'}}>{c.type}</span>
                    <span style={{fontSize:'0.82rem',fontWeight:700,color:'#0f172a'}}>{c.count} <span style={{fontWeight:400,color:'#94a3b8'}}>({pct}%)</span></span>
                  </div>
                  <div style={{height:'8px',background:'#f1f5f9',borderRadius:'4px',overflow:'hidden'}}>
                    <div style={{height:'100%',width:`${pct}%`,background:c.color,borderRadius:'4px',transition:'width 0.5s ease'}}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientAnalytics;
