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
  {month:'Jan',patients:42,completed:38,pending:4},
  {month:'Feb',patients:58,completed:51,pending:7},
  {month:'Mar',patients:71,completed:65,pending:6},
  {month:'Apr',patients:65,completed:60,pending:5},
  {month:'May',patients:89,completed:79,pending:10},
  {month:'Jun',patients:78,completed:72,pending:6},
  {month:'Jul',patients:95,completed:82,pending:13},
  {month:'Aug',patients:82,completed:75,pending:7},
  {month:'Sep',patients:110,completed:98,pending:12},
  {month:'Oct',patients:98,completed:90,pending:8},
  {month:'Nov',patients:115,completed:104,pending:11},
  {month:'Dec',patients:130,completed:118,pending:12},
];

const genderData = [
  {name:'Male',   value:58,color:'#2563eb'},
  {name:'Female', value:38,color:'#ec4899'},
  {name:'Other',  value:4, color:'#94a3b8'},
];

const ageData = [
  {group:'0-18',  count:45},
  {group:'19-30', count:198},
  {group:'31-45', count:312},
  {group:'46-60', count:287},
  {group:'61-75', count:154},
  {group:'75+',   count:63},
];

const caseTypeData = [
  {type:'Medico-Legal',  count:420,color:'#2563eb'},
  {type:'Injury',        count:285,color:'#10b981'},
  {type:'Postmortem',    count:198,color:'#8b5cf6'},
  {type:'Toxicology',    count:142,color:'#f59e0b'},
  {type:'Sexual Assault',count:98, color:'#ef4444'},
  {type:'Other',         count:102,color:'#64748b'},
];

const completionRateData = [
  {month:'Jan',rate:90},{month:'Feb',rate:88},{month:'Mar',rate:92},
  {month:'Apr',rate:92},{month:'May',rate:89},{month:'Jun',rate:92},
  {month:'Jul',rate:86},{month:'Aug',rate:91},{month:'Sep',rate:89},
  {month:'Oct',rate:92},{month:'Nov',rate:90},{month:'Dec',rate:91},
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
              <p className="pm-kpi-value">1,245</p>
              <div className="pm-kpi-trend up"><TrendingUp size={13}/>+12.4% vs last year</div>
            </div>
          </div>
          <div className="pm-kpi-card green">
            <div className="pm-kpi-icon"><Activity size={24}/></div>
            <div className="pm-kpi-info">
              <p className="pm-kpi-label">Avg. Per Month</p>
              <p className="pm-kpi-value">86</p>
              <div className="pm-kpi-trend up"><TrendingUp size={13}/>+8.2% vs last year</div>
            </div>
          </div>
          <div className="pm-kpi-card purple">
            <div className="pm-kpi-icon"><FileText size={24}/></div>
            <div className="pm-kpi-info">
              <p className="pm-kpi-label">Reports Generated</p>
              <p className="pm-kpi-value">1,087</p>
              <div className="pm-kpi-trend up"><TrendingUp size={13}/>+18.7% vs last year</div>
            </div>
          </div>
          <div className="pm-kpi-card orange">
            <div className="pm-kpi-icon"><BarChart2 size={24}/></div>
            <div className="pm-kpi-info">
              <p className="pm-kpi-label">Completion Rate</p>
              <p className="pm-kpi-value">90.3%</p>
              <div className="pm-kpi-trend up"><TrendingUp size={13}/>+2.1% vs last year</div>
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
