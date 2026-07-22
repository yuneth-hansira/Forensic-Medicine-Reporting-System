import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PlaceholderPage from './pages/PlaceholderPage';

// Auth & Core
import Login        from './components/Login';
import Register     from './components/Register';
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

// Case Management
import CaseDashboard from './pages/cases/CaseDashboard';
import CaseList       from './pages/cases/CaseList';
import NewCase        from './pages/cases/NewCase';
import CaseDetails    from './pages/cases/CaseDetails';
import AssignDoctor   from './pages/cases/AssignDoctor';
import CaseTimeline   from './pages/cases/CaseTimeline';
import CaseDocuments  from './pages/cases/CaseDocuments';
import CloseCase      from './pages/cases/CloseCase';
import PoliceInfo     from './pages/cases/PoliceInfo';
import CourtInfo      from './pages/cases/CourtInfo';
import RegisterCourtInfo from './pages/cases/RegisterCourtInfo';
import ClinicalFindings from './pages/cases/ClinicalFindings';
import RegisterClinicalFindings from './pages/cases/RegisterClinicalFindings';
import ClinicalFindingsProfile from './pages/cases/ClinicalFindingsProfile';
import Injuries from './pages/cases/Injuries';
import RegisterInjury from './pages/cases/RegisterInjury';
import InjuryProfile from './pages/cases/InjuryProfile';
import Documents from './pages/cases/Documents';
import RegisterDocument from './pages/cases/RegisterDocument';
import DocumentProfile from './pages/cases/DocumentProfile';

// Examinee Management
import ExamineeList     from './pages/examinees/ExamineeList';
import RegisterExaminee from './pages/examinees/RegisterExaminee';
import ExamineeProfile  from './pages/examinees/ExamineeProfile';
import MedicalHistory   from './pages/examinees/MedicalHistory';
import ConsentForms     from './pages/examinees/ConsentForms';

import DeceasedList     from './pages/admin/DeceasedList';
import RegisterDeceased from './pages/admin/RegisterDeceased';
import DeceasedProfile  from './pages/admin/DeceasedProfile';
import UserProfile      from './pages/UserProfile';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* ── Auth ── */}
          <Route path="/"     element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ── Main Dashboard ── */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* ── Patient Management ─────────────────────────── */}
          <Route path="/patients"                element={<PatientDashboard />} />
          <Route path="/patients/list"           element={<PatientList />} />
          <Route path="/patients/register"       element={<RegisterPatient />} />
          <Route path="/patients/:id"            element={<PatientProfile />} />
          <Route path="/patients/:id/details"    element={<PatientDetails />} />
          <Route path="/patients/:id/edit"       element={<RegisterPatient />} />
          <Route path="/patients/:id/injuries"   element={<InjuryDocumentation />} />
          <Route path="/patients/reports"        element={<MedicalReports />} />
          <Route path="/patients/appointments"   element={<AppointmentManagement />} />
          <Route path="/patients/analytics"      element={<PatientAnalytics />} />

          {/* ── Case Management ───────────────────────────── */}
          <Route path="/cases"                    element={<CaseDashboard />} />
          <Route path="/cases/list"              element={<CaseList />} />
          <Route path="/cases/register"           element={<NewCase />} />
          <Route path="/cases/:id"                element={<CaseDetails />} />
          <Route path="/cases/:id/edit"           element={<NewCase />} />
          <Route path="/cases/:id/assign"         element={<AssignDoctor />} />
          <Route path="/cases/:id/timeline"       element={<CaseTimeline />} />
          <Route path="/cases/:id/documents"      element={<CaseDocuments />} />
          <Route path="/cases/:id/close"          element={<CloseCase />} />

          {/* ── Examinee Management ────────────────────────── */}
          <Route path="/examinees"                element={<ExamineeList />} />
          <Route path="/examinees/register"       element={<RegisterExaminee />} />
          <Route path="/examinees/:id"            element={<ExamineeProfile />} />
          <Route path="/examinees/:id/edit"       element={<RegisterExaminee />} />
          <Route path="/examinees/:id/history"    element={<MedicalHistory />} />
          <Route path="/examinees/:id/consent"    element={<ConsentForms />} />

          {/* ── Administration & Other ────────────────────────── */}
          <Route path="/deceased"                 element={<DeceasedList />} />
          <Route path="/deceased/register"        element={<RegisterDeceased />} />
          <Route path="/deceased/:id"             element={<DeceasedProfile />} />
          <Route path="/deceased/:id/edit"        element={<RegisterDeceased />} />
          <Route path="/clinical-findings"        element={<ClinicalFindings />} />
          <Route path="/clinical-findings/register" element={<RegisterClinicalFindings />} />
          <Route path="/clinical-findings/:id"    element={<ClinicalFindingsProfile />} />
          <Route path="/clinical-findings/:id/edit" element={<RegisterClinicalFindings />} />
          <Route path="/doctors"                  element={<PlaceholderPage title="Doctor Directory" />} />
          <Route path="/settings"                 element={<PlaceholderPage title="System Settings" />} />
          <Route path="/profile"                  element={<UserProfile />} />
          
          {/* ── Additional Database Modules ───────────────────────── */}
          <Route path="/police-info"              element={<PoliceInfo />} />
          <Route path="/court-info"               element={<CourtInfo />} />
          <Route path="/court-info/register"      element={<RegisterCourtInfo />} />
          <Route path="/court-info/:id/edit"      element={<RegisterCourtInfo />} />
          <Route path="/injuries"                 element={<Injuries />} />
          <Route path="/injuries/register"        element={<RegisterInjury />} />
          <Route path="/injuries/:id"             element={<InjuryProfile />} />
          <Route path="/injuries/:id/edit"        element={<RegisterInjury />} />
          <Route path="/documents"                element={<Documents />} />
          <Route path="/documents/register"       element={<RegisterDocument />} />
          <Route path="/documents/:id"            element={<DocumentProfile />} />
          <Route path="/documents/:id/edit"       element={<RegisterDocument />} />
          <Route path="/consents"                 element={<PlaceholderPage title="Consents" />} />
          <Route path="/reports"                  element={<PlaceholderPage title="Reports" />} />
          <Route path="/certificates"             element={<PlaceholderPage title="Certificates" />} />
          <Route path="/hospitals"                element={<PlaceholderPage title="Hospitals" />} />
          <Route path="/wards"                    element={<PlaceholderPage title="Wards" />} />
          <Route path="/body-id"                  element={<PlaceholderPage title="Body Identification" />} />
          <Route path="/next-of-kin"              element={<PlaceholderPage title="Next of Kin" />} />
          <Route path="/users"                    element={<PlaceholderPage title="System Users" />} />
          <Route path="/audit-logs"               element={<PlaceholderPage title="Audit Logs" />} />
          
          {/* ── Catch-All ── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
