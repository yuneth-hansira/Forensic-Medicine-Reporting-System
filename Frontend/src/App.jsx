import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth & Core
import Login        from './components/Login';
import LandingPage  from './pages/LandingPage';
import Dashboard    from './pages/Dashboard';

// Patient Management
import PatientDashboard      from './pages/patients/PatientDashboard';
import PatientList           from './pages/patients/PatientList';
import RegisterPatient       from './pages/patients/RegisterPatient';
import PatientProfile        from './pages/patients/PatientProfile';
import PatientDetails        from './pages/patients/PatientDetails';
import InjuryDocumentation   from './pages/patients/InjuryDocumentation';
import MedicalReports        from './pages/patients/MedicalReports';
import AppointmentManagement from './pages/patients/AppointmentManagement';
import PatientAnalytics      from './pages/patients/PatientAnalytics';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* ── Auth ── */}
          <Route path="/"     element={<Login />} />
          <Route path="/home" element={<LandingPage />} />

          {/* ── Main Dashboard ── */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* ── Patient Management ─────────────────────────── */}
          {/* /patients          → Patient Module Dashboard      */}
          <Route path="/patients"                element={<PatientDashboard />} />

          {/* /patients/list     → Searchable Patient Table      */}
          <Route path="/patients/list"           element={<PatientList />} />

          {/* /patients/register → 7-Step Registration Form      */}
          <Route path="/patients/register"       element={<RegisterPatient />} />

          {/* /patients/:id      → Patient Profile (hero card)   */}
          <Route path="/patients/:id"            element={<PatientProfile />} />

          {/* /patients/:id/details → 9-Tab Detail Page         */}
          <Route path="/patients/:id/details"    element={<PatientDetails />} />

          {/* /patients/:id/edit → Edit Form                     */}
          <Route path="/patients/:id/edit"       element={<RegisterPatient />} />

          {/* /patients/:id/injuries → Injury Body Diagram       */}
          <Route path="/patients/:id/injuries"   element={<InjuryDocumentation />} />

          {/* /patients/reports  → Medical Reports + PDF View    */}
          <Route path="/patients/reports"        element={<MedicalReports />} />

          {/* /patients/appointments → Calendar + Appointment Mgmt */}
          <Route path="/patients/appointments"   element={<AppointmentManagement />} />

          {/* /patients/analytics → Charts & KPI Analytics       */}
          <Route path="/patients/analytics"      element={<PatientAnalytics />} />

          {/* ── Catch-All ── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

