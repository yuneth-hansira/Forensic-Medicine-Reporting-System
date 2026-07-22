import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Filter } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import api from '../services/api';
import './CalendarPage.css';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, case, court

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await api.get('/calendar/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Create grid cells
  const blanks = Array(firstDay).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Filter events for the current month view
  const filteredEvents = events.filter(e => filter === 'all' || e.type === filter);

  return (
    <DashboardLayout>
      <div className="calendar-page">
        
        {/* Header */}
        <div className="calendar-header-card">
          <div className="calendar-title-group">
            <CalendarIcon size={28} className="text-blue" />
            <h2>{monthNames[month]} {year}</h2>
          </div>
          
          <div className="calendar-controls">
            <div className="filter-group">
              <Filter size={16} />
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All Events</option>
                <option value="case">Case Registrations</option>
                <option value="court">Court Trials</option>
              </select>
            </div>
            
            <div className="month-nav">
              <button onClick={handlePrevMonth} className="nav-btn"><ChevronLeft size={20} /></button>
              <button onClick={() => setCurrentDate(new Date())} className="nav-btn today-btn">Today</button>
              <button onClick={handleNextMonth} className="nav-btn"><ChevronRight size={20} /></button>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="calendar-legend">
          <div className="legend-item">
            <span className="dot case-dot"></span> Case Registration
          </div>
          <div className="legend-item">
            <span className="dot court-dot"></span> Court Trial
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="calendar-grid-card">
          {loading ? (
            <div className="calendar-loading">Loading events...</div>
          ) : (
            <div className="calendar">
              <div className="calendar-days-header">
                {dayNames.map(d => (
                  <div key={d} className="day-name">{d}</div>
                ))}
              </div>
              
              <div className="calendar-grid">
                {blanks.map((_, i) => (
                  <div key={`blank-${i}`} className="calendar-cell empty"></div>
                ))}
                
                {days.map(day => {
                  const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  
                  // Find events for this day
                  const dayEvents = filteredEvents.filter(e => {
                    const eDate = new Date(e.date);
                    return eDate.getFullYear() === year && 
                           eDate.getMonth() === month && 
                           eDate.getDate() === day;
                  });

                  const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

                  return (
                    <div key={day} className={`calendar-cell ${isToday ? 'today' : ''}`}>
                      <span className="day-number">{day}</span>
                      <div className="event-list">
                        {dayEvents.map(event => (
                          <div 
                            key={event.id} 
                            className={`event-badge ${event.type}`} 
                            title={event.title}
                          >
                            {event.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
