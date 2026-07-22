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

// Deceased Management
import DeceasedList         from './pages/deceased/DeceasedList';
import RegisterDeceased     from './pages/deceased/RegisterDeceased';
import DeceasedProfile      from './pages/deceased/DeceasedProfile';
import BodyIdentification   from './pages/deceased/BodyIdentification';
import NextOfKin            from './pages/deceased/NextOfKin';
import HospitalInformation  from './pages/deceased/HospitalInformation';
import BodyRelease          from './pages/deceased/BodyRelease';

// Clinical Examination
import ClinicalDashboard    from './pages/clinical/ClinicalDashboard';
import ExternalExamination  from './pages/clinical/ExternalExamination';
import InternalExamination  from './pages/clinical/InternalExamination';
import ClinicalFindings     from './pages/clinical/ClinicalFindings';
import InjuryRecording      from './pages/clinical/InjuryRecording';
import BodyMap              from './pages/clinical/BodyMap';
import Measurements         from './pages/clinical/Measurements';
import Notes                from './pages/clinical/Notes';

// Autopsy Management
import AutopsyList          from './pages/autopsy/AutopsyList';
import NewAutopsy           from './pages/autopsy/NewAutopsy';
import AutopsyDetails       from './pages/autopsy/AutopsyDetails';
import PostmortemFindings   from './pages/autopsy/PostmortemFindings';
import CauseOfDeath         from './pages/autopsy/CauseOfDeath';
import MedicoLegalOpinion   from './pages/autopsy/MedicoLegalOpinion';
import SpecimensCollected   from './pages/autopsy/SpecimensCollected';



import DashboardLayout from './layouts/DashboardLayout';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* ── Auth ── */}
          <Route path="/"     element={<Login />} />
          <Route path="/home" element={<LandingPage />} />

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

          {/* ── Catch-All ── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
