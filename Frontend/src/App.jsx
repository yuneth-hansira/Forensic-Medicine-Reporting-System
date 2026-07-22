import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PlaceholderPage from './pages/PlaceholderPage';

// Auth & Core
import Login        from './components/Login';
import Register     from './components/Register';
import Dashboard    from './pages/Dashboard';
import CalendarPage from './pages/CalendarPage';

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
import RegisterPoliceInfo from './pages/cases/RegisterPoliceInfo';
import PoliceInfoProfile from './pages/cases/PoliceInfoProfile';
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
import Consents from './pages/cases/Consents';
import RegisterConsent from './pages/cases/RegisterConsent';
import ConsentProfile from './pages/cases/ConsentProfile';
import Reports from './pages/cases/Reports';
import RegisterReport from './pages/cases/RegisterReport';
import ReportProfile from './pages/cases/ReportProfile';
import Certificates from './pages/cases/Certificates';
import RegisterCertificate from './pages/cases/RegisterCertificate';
import CertificateProfile from './pages/cases/CertificateProfile';

// Examinee Management
import ExamineeList     from './pages/examinees/ExamineeList';
import RegisterExaminee from './pages/examinees/RegisterExaminee';
import ExamineeProfile  from './pages/examinees/ExamineeProfile';
import MedicalHistory   from './pages/examinees/MedicalHistory';
import ConsentForms     from './pages/examinees/ConsentForms';

import DeceasedList     from './pages/admin/DeceasedList';
import RegisterDeceased from './pages/admin/RegisterDeceased';
import DeceasedProfile from './pages/admin/DeceasedProfile';
import Hospitals from './pages/admin/Hospitals';
import RegisterHospital from './pages/admin/RegisterHospital';
import HospitalProfile from './pages/admin/HospitalProfile';
import Wards from './pages/admin/Wards';
import RegisterWard from './pages/admin/RegisterWard';
import WardProfile from './pages/admin/WardProfile';
import BodyIdentifications from './pages/admin/BodyIdentifications';
import RegisterBodyIdentification from './pages/admin/RegisterBodyIdentification';
import BodyIdentificationProfile from './pages/admin/BodyIdentificationProfile';
import NextOfKin from './pages/admin/NextOfKin';
import RegisterNextOfKin from './pages/admin/RegisterNextOfKin';
import NextOfKinProfile from './pages/admin/NextOfKinProfile';
import SystemUsers from './pages/admin/SystemUsers';
import RegisterSystemUser from './pages/admin/RegisterSystemUser';
import SystemUserProfile from './pages/admin/SystemUserProfile';
import Doctors from './pages/admin/Doctors';
import RegisterDoctor from './pages/admin/RegisterDoctor';
import DoctorProfile from './pages/admin/DoctorProfile';
import AuditLogs from './pages/admin/AuditLogs';
import RegisterAuditLog from './pages/admin/RegisterAuditLog';
import AuditLogProfile from './pages/admin/AuditLogProfile';
import UserProfile      from './pages/UserProfile';

// ── Additional Forensic & Case Modules ──
import PMFindings from './pages/cases/PMFindings';
import RegisterPMFinding from './pages/cases/RegisterPMFinding';
import PMFindingProfile from './pages/cases/PMFindingProfile';

import Specimens from './pages/cases/Specimens';
import RegisterSpecimen from './pages/cases/RegisterSpecimen';
import SpecimenProfile from './pages/cases/SpecimenProfile';

import HistopathologyReports from './pages/cases/HistopathologyReports';
import RegisterHistopathology from './pages/cases/RegisterHistopathology';
import HistopathologyProfile from './pages/cases/HistopathologyProfile';

import ToxicologyReports from './pages/cases/ToxicologyReports';
import RegisterToxicology from './pages/cases/RegisterToxicology';
import ToxicologyProfile from './pages/cases/ToxicologyProfile';

import Investigations from './pages/cases/Investigations';
import RegisterInvestigation from './pages/cases/RegisterInvestigation';
import InvestigationProfile from './pages/cases/InvestigationProfile';

import Exhibits from './pages/cases/Exhibits';
import RegisterExhibit from './pages/cases/RegisterExhibit';
import ExhibitProfile from './pages/cases/ExhibitProfile';

import Referrals from './pages/cases/Referrals';
import RegisterReferral from './pages/cases/RegisterReferral';
import ReferralProfile from './pages/cases/ReferralProfile';

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
          <Route path="/calendar"  element={<CalendarPage />} />

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
          <Route path="/doctors"                  element={<Doctors />} />
          <Route path="/doctors/register"         element={<RegisterDoctor />} />
          <Route path="/doctors/:id"              element={<DoctorProfile />} />
          <Route path="/doctors/:id/edit"         element={<RegisterDoctor />} />
          <Route path="/settings"                 element={<PlaceholderPage title="System Settings" />} />
          <Route path="/profile"                  element={<UserProfile />} />
          
          {/* ── Additional Database Modules ───────────────────────── */}
          <Route path="/police-info"              element={<PoliceInfo />} />
          <Route path="/police-info/register"     element={<RegisterPoliceInfo />} />
          <Route path="/police-info/:id"          element={<PoliceInfoProfile />} />
          <Route path="/police-info/:id/edit"     element={<RegisterPoliceInfo />} />
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
          <Route path="/consents"                 element={<Consents />} />
          <Route path="/consents/register"        element={<RegisterConsent />} />
          <Route path="/consents/:id"             element={<ConsentProfile />} />
          <Route path="/consents/:id/edit"        element={<RegisterConsent />} />
          <Route path="/reports"                  element={<Reports />} />
          <Route path="/reports/register"         element={<RegisterReport />} />
          <Route path="/reports/:id"              element={<ReportProfile />} />
          <Route path="/reports/:id/edit"         element={<RegisterReport />} />
          <Route path="/certificates"             element={<Certificates />} />
          <Route path="/certificates/register"    element={<RegisterCertificate />} />
          <Route path="/certificates/:id"         element={<CertificateProfile />} />
          <Route path="/certificates/:id/edit"    element={<RegisterCertificate />} />
          <Route path="/hospitals"                element={<Hospitals />} />
          <Route path="/hospitals/register"       element={<RegisterHospital />} />
          <Route path="/hospitals/:id"            element={<HospitalProfile />} />
          <Route path="/hospitals/:id/edit"       element={<RegisterHospital />} />
          <Route path="/wards"                    element={<Wards />} />
          <Route path="/wards/register"           element={<RegisterWard />} />
          <Route path="/wards/:id"                element={<WardProfile />} />
          <Route path="/wards/:id/edit"           element={<RegisterWard />} />
          <Route path="/body-id"                  element={<BodyIdentifications />} />
          <Route path="/body-id/register"         element={<RegisterBodyIdentification />} />
          <Route path="/body-id/:id"              element={<BodyIdentificationProfile />} />
          <Route path="/body-id/:id/edit"         element={<RegisterBodyIdentification />} />
          <Route path="/next-of-kin"              element={<NextOfKin />} />
          <Route path="/next-of-kin/register"     element={<RegisterNextOfKin />} />
          <Route path="/next-of-kin/:id"          element={<NextOfKinProfile />} />
          <Route path="/next-of-kin/:id/edit"     element={<RegisterNextOfKin />} />
          <Route path="/users"                    element={<SystemUsers />} />
          <Route path="/users/register"           element={<RegisterSystemUser />} />
          <Route path="/users/:id"                element={<SystemUserProfile />} />
          <Route path="/users/:id/edit"           element={<RegisterSystemUser />} />
          <Route path="/audit-logs"               element={<AuditLogs />} />
          <Route path="/audit-logs/register"      element={<RegisterAuditLog />} />
          <Route path="/audit-logs/:id"           element={<AuditLogProfile />} />
          <Route path="/audit-logs/:id/edit"      element={<RegisterAuditLog />} />
          
          <Route path="/pm-findings"              element={<PMFindings />} />
          <Route path="/pm-findings/register"     element={<RegisterPMFinding />} />
          <Route path="/pm-findings/:id"          element={<PMFindingProfile />} />
          <Route path="/pm-findings/:id/edit"     element={<RegisterPMFinding />} />
          
          <Route path="/specimens"                element={<Specimens />} />
          <Route path="/specimens/register"       element={<RegisterSpecimen />} />
          <Route path="/specimens/:id"            element={<SpecimenProfile />} />
          <Route path="/specimens/:id/edit"       element={<RegisterSpecimen />} />
          
          <Route path="/histopathology"           element={<HistopathologyReports />} />
          <Route path="/histopathology/register"  element={<RegisterHistopathology />} />
          <Route path="/histopathology/:id"       element={<HistopathologyProfile />} />
          <Route path="/histopathology/:id/edit"  element={<RegisterHistopathology />} />
          
          <Route path="/toxicology"               element={<ToxicologyReports />} />
          <Route path="/toxicology/register"      element={<RegisterToxicology />} />
          <Route path="/toxicology/:id"           element={<ToxicologyProfile />} />
          <Route path="/toxicology/:id/edit"      element={<RegisterToxicology />} />
          
          <Route path="/investigations"           element={<Investigations />} />
          <Route path="/investigations/register"  element={<RegisterInvestigation />} />
          <Route path="/investigations/:id"       element={<InvestigationProfile />} />
          <Route path="/investigations/:id/edit"  element={<RegisterInvestigation />} />
          
          <Route path="/exhibits"                 element={<Exhibits />} />
          <Route path="/exhibits/register"        element={<RegisterExhibit />} />
          <Route path="/exhibits/:id"             element={<ExhibitProfile />} />
          <Route path="/exhibits/:id/edit"        element={<RegisterExhibit />} />
          
          <Route path="/referrals"                element={<Referrals />} />
          <Route path="/referrals/register"       element={<RegisterReferral />} />
          <Route path="/referrals/:id"            element={<ReferralProfile />} />
          <Route path="/referrals/:id/edit"       element={<RegisterReferral />} />
          
          {/* ── Catch-All ── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
