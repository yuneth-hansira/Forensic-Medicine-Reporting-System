import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import api from '../services/api';
import { Calendar, Gavel, Folder, ArrowLeft } from 'lucide-react';
import './patients/patients.css'; // Reusing list styles

const CalendarEventsPage = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get('/dashboard/calendar')
      .then(res => {
        // Filter events for the specific date
        const dayEvents = res.data.filter(e => e.date === date);
        setEvents(dayEvents);
      })
      .catch(err => console.error('Error fetching calendar events', err))
      .finally(() => setLoading(false));
  }, [date]);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getEventIcon = (type) => {
    if (type === 'court') return <Gavel size={20} className="text-green-600" style={{color: '#10b981'}} />;
    if (type === 'registered') return <Folder size={20} className="text-orange-500" style={{color: '#f59e0b'}} />;
    return <Calendar size={20} />;
  };

  return (
    <DashboardLayout>
      <div className="pm-container">
        <div className="pm-header">
          <div>
            <button 
              onClick={() => navigate(-1)} 
              className="pm-btn pm-btn-secondary"
              style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <ArrowLeft size={16} /> Back to Dashboard
            </button>
            <h1 className="pm-page-title">Activities for {formatDate(date)}</h1>
            <p className="pm-page-subtitle">All scheduled events and registrations for this date</p>
          </div>
        </div>

        <div className="pm-content">
          {loading ? (
            <div className="pm-loading">Loading events...</div>
          ) : events.length === 0 ? (
            <div className="pm-empty-state" style={{ padding: '3rem', textAlign: 'center', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <Calendar size={48} style={{ color: '#cbd5e1', margin: '0 auto 1rem auto' }} />
              <h3>No Activities Found</h3>
              <p>There are no events scheduled for this date.</p>
            </div>
          ) : (
            <div className="pm-table-container">
              <table className="pm-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Title</th>
                    <th>Case ID</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((ev, index) => (
                    <tr key={index}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {getEventIcon(ev.type)}
                          <span style={{ textTransform: 'capitalize', fontWeight: '500' }}>
                            {ev.type === 'registered' ? 'Case Registration' : 'Court Trial'}
                          </span>
                        </div>
                      </td>
                      <td>{ev.title}</td>
                      <td>#{ev.id}</td>
                      <td>
                        <button 
                          className="pm-btn pm-btn-primary"
                          onClick={() => navigate(`/cases/${ev.id}`)}
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                        >
                          View Case
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CalendarEventsPage;
