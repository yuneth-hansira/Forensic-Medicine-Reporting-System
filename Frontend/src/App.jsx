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

// Examinee Management
import ExamineeList     from './pages/examinees/ExamineeList';
import RegisterExaminee from './pages/examinees/RegisterExaminee';
import ExamineeProfile  from './pages/examinees/ExamineeProfile';
import MedicalHistory   from './pages/examinees/MedicalHistory';
import ConsentForms     from './pages/examinees/ConsentForms';

import DeceasedList     from './pages/admin/DeceasedList';
import UserProfile      from './pages/UserProfile';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* ── Auth ── */}
          <Route path="/"     element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ── Dashboard Layout Routes ── */}
          <Route element={<DashboardLayout />}>
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
            <Route path="/cases/new"                element={<NewCase />} />
            <Route path="/cases/:id"                element={<CaseDetails />} />
            <Route path="/cases/:id/edit"           element={<NewCase />} />
            <Route path="/cases/:id/assign"         element={<AssignDoctor />} />
            <Route path="/cases/:id/timeline"       element={<CaseTimeline />} />
            <Route path="/cases/:id/documents"      element={<CaseDocuments />} />
            <Route path="/cases/:id/close"          element={<CloseCase />} />

            {/* ── Examinee Management ────────────────────────── */}
            <Route path="/examinees"                element={<ExamineeList />} />
            <Route path="/examinees/new"            element={<RegisterExaminee />} />
            <Route path="/examinees/:id"            element={<ExamineeProfile />} />
            <Route path="/examinees/:id/edit"       element={<RegisterExaminee />} />
            <Route path="/examinees/:id/history"    element={<MedicalHistory />} />
            <Route path="/examinees/:id/consent"    element={<ConsentForms />} />

            {/* ── Deceased Management ────────────────────────── */}
            <Route path="/deceased"                       element={<DeceasedList />} />
            <Route path="/deceased/new"                   element={<RegisterDeceased />} />
            <Route path="/deceased/:id"                   element={<DeceasedProfile />} />
            <Route path="/deceased/:id/edit"              element={<RegisterDeceased />} />
            <Route path="/deceased/:id/identification"    element={<BodyIdentification />} />
            <Route path="/deceased/:id/next-of-kin"       element={<NextOfKin />} />
            <Route path="/deceased/:id/hospital"          element={<HospitalInformation />} />
            <Route path="/deceased/:id/release"           element={<BodyRelease />} />

            {/* ── Clinical Examination ───────────────────────── */}
            <Route path="/clinical/dashboard"             element={<ClinicalDashboard />} />
            <Route path="/clinical/:caseId/external"      element={<ExternalExamination />} />
            <Route path="/clinical/:caseId/internal"      element={<InternalExamination />} />
            <Route path="/clinical/:caseId/findings"      element={<ClinicalFindings />} />
            <Route path="/clinical/:caseId/injuries"      element={<InjuryRecording />} />
            <Route path="/clinical/:caseId/body-map"      element={<BodyMap />} />
            <Route path="/clinical/:caseId/measurements"  element={<Measurements />} />
            <Route path="/clinical/:caseId/notes"         element={<Notes />} />

            {/* ── Autopsy Management ─────────────────────────── */}
            <Route path="/autopsy"                        element={<AutopsyList />} />
            <Route path="/autopsy/new"                    element={<NewAutopsy />} />
            <Route path="/autopsy/:id"                    element={<AutopsyDetails />} />
            <Route path="/autopsy/:id/postmortem"         element={<PostmortemFindings />} />
            <Route path="/autopsy/:id/cause-of-death"     element={<CauseOfDeath />} />
            <Route path="/autopsy/:id/opinion"            element={<MedicoLegalOpinion />} />
            <Route path="/autopsy/:id/specimens"          element={<SpecimensCollected />} />
          </Route>

          {/* ── Administration & Other ────────────────────────── */}
          <Route path="/deceased"                 element={<DeceasedList />} />
          <Route path="/clinical-findings"        element={<PlaceholderPage title="Clinical Findings" />} />
          <Route path="/doctors"                  element={<PlaceholderPage title="Doctor Directory" />} />
          <Route path="/settings"                 element={<PlaceholderPage title="System Settings" />} />
          <Route path="/profile"                  element={<UserProfile />} />
          
          {/* ── Catch-All ── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
