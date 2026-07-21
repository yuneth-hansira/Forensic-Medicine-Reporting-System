import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  Calendar, Clock, ChevronLeft, ChevronRight, Plus,
  Video, User, Check, X, RefreshCw, Filter, Search,
  MoreHorizontal, Edit3, MapPin, Stethoscope
} from 'lucide-react';
import '../patients/patients.css';
import './AppointmentManagement.css';

const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const appointments = [];

const statusCls = { upcoming:'pm-badge-pending', completed:'pm-badge-completed', scheduled:'pm-badge-in-progress', cancelled:'pm-badge-closed' };

const AppointmentManagement = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year,  setYear]  = useState(today.getFullYear());
  const [activeView, setActiveView] = useState('list');
  const [filter, setFilter] = useState('all');

  // Calendar calculation
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const calendarCells = Array.from({length: firstDay + daysInMonth}, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );

  const prevMonth = () => { if(month === 0){setMonth(11);setYear(y=>y-1);}else setMonth(m=>m-1); };
  const nextMonth = () => { if(month === 11){setMonth(0);setYear(y=>y+1);}else setMonth(m=>m+1); };

  const filtered = filter === 'all' ? appointments : appointments.filter(a=>a.status===filter);

  return (
    <DashboardLayout>
      <div className="pm-page">
        <div className="pm-page-header">
          <div>
            <div className="pm-breadcrumb">
              <a href="/patients">Patient Management</a><span>/</span><span>Appointments</span>
            </div>
            <h1 className="pm-page-title">Appointment Management</h1>
            <p className="pm-page-subtitle">{appointments.filter(a=>a.status==='upcoming').length} upcoming appointments today</p>
          </div>
          <div className="pm-header-actions">
            <div className="am-view-toggle">
              <button className={activeView==='list'?'active':''} onClick={()=>setActiveView('list')}>List</button>
              <button className={activeView==='calendar'?'active':''} onClick={()=>setActiveView('calendar')}>Calendar</button>
            </div>
            <button className="pm-btn pm-btn-primary"><Plus size={16}/>Schedule Appointment</button>
          </div>
        </div>

        <div className="am-layout">

          {/* Calendar Widget */}
          <div className="pm-card am-calendar-card">
            <div className="am-cal-header">
              <button className="am-nav-btn" onClick={prevMonth}><ChevronLeft size={16}/></button>
              <h3>{MONTHS[month]} {year}</h3>
              <button className="am-nav-btn" onClick={nextMonth}><ChevronRight size={16}/></button>
            </div>
            <div className="am-cal-grid">
              {DAYS.map(d=><div key={d} className="am-cal-day-label">{d}</div>)}
              {calendarCells.map((d,i)=>(
                <div key={i} className={`am-cal-cell ${d===today.getDate() && month===today.getMonth() ? 'today' : ''} ${d===21?'has-event':''} ${!d?'empty':''}`}>
                  {d && (
                    <>
                      <span>{d}</span>
                      {(d===21||d===22) && <div className="am-event-dot"/>}
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="am-cal-legend">
              <div><span className="am-dot blue"/>Today</div>
              <div><span className="am-dot green"/>Appointment</div>
            </div>

            {/* Today's Summary */}
            <div className="am-today-summary">
              <h4 style={{margin:'0 0 0.75rem',fontSize:'0.875rem',fontWeight:700,color:'#0f172a'}}>Today's Summary</h4>
              {[
                {label:'Total Appointments', value:0, color:'#2563eb'},
                {label:'Completed', value:0, color:'#10b981'},
                {label:'Upcoming', value:0, color:'#f59e0b'},
              ].map((s,i)=>(
                <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0.4rem 0',borderBottom:'1px solid #f1f5f9',fontSize:'0.82rem'}}>
                  <span style={{color:'#64748b'}}>{s.label}</span>
                  <span style={{fontWeight:700,color:s.color}}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Appointment List */}
          <div className="am-list-panel">
            {/* Filter Tabs */}
            <div className="pm-card" style={{padding:'1rem 1.25rem',marginBottom:'1rem'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'1rem',flexWrap:'wrap'}}>
                <div className="am-filter-tabs">
                  {['all','upcoming','completed','scheduled','cancelled'].map(f=>(
                    <button key={f} className={`am-filter-tab ${filter===f?'active':''}`} onClick={()=>setFilter(f)}>
                      {f.charAt(0).toUpperCase()+f.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="pm-search-wrapper" style={{maxWidth:'260px',minWidth:'200px'}}>
                  <Search size={16} color="#94a3b8"/>
                  <input placeholder="Search appointments..."/>
                </div>
              </div>
            </div>

            {/* Cards */}
            <div className="am-cards-list">
              {filtered.map((a,i)=>(
                <div key={i} className={`pm-card am-apt-card ${a.status}`}>
                  <div className="am-apt-left">
                    <div className={`am-apt-type-dot ${a.status}`}/>
                    <div className="am-time-block">
                      <div className="am-apt-time">{a.time}</div>
                      <div className="am-apt-date">{a.date}</div>
                    </div>
                    <div className="am-apt-divider"/>
                    <div className="am-apt-details">
                      <div className="am-apt-patient">
                        <div className="pm-avatar-placeholder pm-avatar-sm" style={{fontSize:'0.7rem',width:28,height:28}}>
                          {a.patient.charAt(0)}
                        </div>
                        <div>
                          <p style={{margin:0,fontWeight:700,fontSize:'0.9rem',color:'#0f172a'}}>{a.patient}</p>
                          <p style={{margin:0,fontSize:'0.78rem',color:'#64748b'}}>{a.id}</p>
                        </div>
                      </div>
                      <div style={{display:'flex',gap:'1.5rem',marginTop:'0.5rem',flexWrap:'wrap'}}>
                        <span style={{display:'flex',alignItems:'center',gap:4,fontSize:'0.8rem',color:'#64748b'}}>
                          <Stethoscope size={13}/>{a.doctor}
                        </span>
                        <span style={{display:'flex',alignItems:'center',gap:4,fontSize:'0.8rem',color:'#64748b'}}>
                          <MapPin size={13}/>{a.room}
                        </span>
                        <span style={{display:'flex',alignItems:'center',gap:4,fontSize:'0.8rem',color:'#64748b'}}>
                          <Clock size={13}/>{a.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="am-apt-right">
                    <span className={`pm-badge ${statusCls[a.status]}`}>{a.status}</span>
                    <div style={{display:'flex',gap:'0.4rem',marginTop:'0.75rem'}}>
                      {a.status === 'upcoming' && (
                        <>
                          <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem'}} title="Edit"><Edit3 size={13}/></button>
                          <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem'}} title="Reschedule"><RefreshCw size={13}/></button>
                          <button className="pm-btn pm-btn-danger pm-btn-sm" style={{padding:'0.3rem 0.6rem'}} title="Cancel"><X size={13}/></button>
                        </>
                      )}
                      {a.status === 'completed' && (
                        <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem'}}><Check size={13}/> Report</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="pm-empty-state pm-card">
                  <Calendar size={36}/>
                  <h4>No Appointments Found</h4>
                  <p>No appointments match the selected filter</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AppointmentManagement;
