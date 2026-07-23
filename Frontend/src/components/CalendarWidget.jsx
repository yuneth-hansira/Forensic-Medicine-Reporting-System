import React, { useState, useEffect } from 'react';
import './CalendarWidget.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/dashboard/calendar')
      .then(res => setEvents(res.data))
      .catch(err => console.error('Error fetching calendar events', err));
  }, []);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const today = new Date();

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = today.getDate() === i && today.getMonth() === month && today.getFullYear() === year;
    
    // Format current cell date as YYYY-MM-DD
    const cellDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    
    // Find events for this day
    const dayEvents = events.filter(e => e.date === cellDateStr);
    
    days.push(
      <div 
        key={`day-${i}`} 
        className={`calendar-day ${isToday ? 'today' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`}
        title={dayEvents.map(e => e.title).join(', ')}
        onClick={() => {
            if (dayEvents.length > 0) {
                // Navigate to the daily events summary page
                navigate(`/calendar/events/${cellDateStr}`);
            }
        }}
        style={{ cursor: dayEvents.length > 0 ? 'pointer' : 'default' }}
      >
        <span className="day-number">{i}</span>
        {dayEvents.length > 0 && (
            <div className="day-dots">
                {dayEvents.map((ev, idx) => (
                    <span key={idx} className={`dot ${ev.type}`}></span>
                ))}
            </div>
        )}
      </div>
    );
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="calendar-widget">
      <div className="calendar-header">
        <button className="calendar-btn" onClick={prevMonth}><ChevronLeft size={18}/></button>
        <span className="calendar-title">{monthNames[month]} {year}</span>
        <button className="calendar-btn" onClick={nextMonth}><ChevronRight size={18}/></button>
      </div>
      <div className="calendar-weekdays">
        <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
      </div>
      <div className="calendar-grid">
        {days}
      </div>
    </div>
  );
};

export default CalendarWidget;
