import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, ArrowRight, ArrowLeft, FileText } from 'lucide-react';

import PageHeader from '../../components/common/PageHeader';
import Stepper from '../../components/common/Stepper';
import UploadArea from '../../components/common/UploadArea';
import DashboardLayout from '../../layouts/DashboardLayout';
import './deceased.css';

const steps = [
  { title: 'Case Info' },
  { title: 'Personal' },
  { title: 'Hospital' },
  { title: 'Death Info' },
  { title: 'Uploads' },
];

/* ── Shared field components ── */
const Row = ({ children }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
    {children}
  </div>
);

const Field = ({ label, children }) => (
  <div>
    <label className="form-label">{label}</label>
    {children}
  </div>
);

const Input = (props) => <input className="form-input" {...props} />;
const Select = ({ children, ...rest }) => (
  <select className="form-input" {...rest}>{children}</select>
);
const Textarea = (props) => <textarea className="form-input" style={{ minHeight: '100px', resize: 'vertical' }} {...props} />;

/* ── Step content ── */
const STEPS_CONTENT = [
  // Step 0 — Case Information
  () => (
    <>
      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.5rem' }}>Case Information</h3>
      <Row>
        <Field label="Case Number *"><Input placeholder="e.g. C2026-1045" /></Field>
        <Field label="PM Number"><Input placeholder="e.g. PM-26-0891" /></Field>
        <Field label="Case Type">
          <Select>
            <option>Medico-Legal</option>
            <option>Clinical</option>
            <option>Unknown Identity</option>
          </Select>
        </Field>
        <Field label="Priority">
          <Select>
            <option>Normal</option>
            <option>High</option>
            <option>Urgent</option>
          </Select>
        </Field>
        <Field label="Registration Date"><Input type="date" /></Field>
        <Field label="Assigned Doctor"><Input placeholder="e.g. Dr. A. Perera" /></Field>
      </Row>
    </>
  ),
  // Step 1 — Personal Information
  () => (
    <>
      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.5rem' }}>Personal Information</h3>
      <Row>
        <Field label="Full Name"><Input placeholder="Unknown if not identified" /></Field>
        <Field label="Known Alias"><Input /></Field>
        <Field label="NIC"><Input placeholder="e.g. 19851234567V" /></Field>
        <Field label="Gender">
          <Select>
            <option>Unknown</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Select>
        </Field>
        <Field label="Estimated Age"><Input placeholder="e.g. 30–40" /></Field>
        <Field label="Date of Birth"><Input type="date" /></Field>
        <Field label="Nationality"><Input defaultValue="Sri Lankan" /></Field>
        <Field label="Religion"><Input /></Field>
        <Field label="Occupation"><Input /></Field>
      </Row>
    </>
  ),
  // Step 2 — Hospital Information
  () => (
    <>
      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.5rem' }}>Hospital Information</h3>
      <Row>
        <Field label="Hospital"><Input placeholder="e.g. General Hospital Colombo" /></Field>
        <Field label="Ward"><Input placeholder="e.g. Ward 14 (ICU)" /></Field>
        <Field label="Bed Number"><Input /></Field>
        <Field label="Admission Date"><Input type="date" /></Field>
        <Field label="Date of Death"><Input type="date" /></Field>
        <Field label="Time of Death"><Input type="time" /></Field>
        <Field label="Place of Death"><Input /></Field>
        <Field label="Attending Doctor"><Input /></Field>
      </Row>
    </>
  ),
  // Step 3 — Death Information
  () => (
    <>
      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.5rem' }}>Death Information</h3>
      <div style={{ display: 'grid', gap: '1.25rem' }}>
        <Field label="Preliminary Cause of Death"><Textarea placeholder="Describe the preliminary cause…" /></Field>
        <Row>
          <Field label="Manner of Death">
            <Select>
              <option>Natural</option>
              <option>Accident</option>
              <option>Suicide</option>
              <option>Homicide</option>
              <option>Pending</option>
              <option>Undetermined</option>
            </Select>
          </Field>
          <Field label="Incident Date"><Input type="date" /></Field>
          <Field label="Incident Time"><Input type="time" /></Field>
          <Field label="Incident Location"><Input /></Field>
          <Field label="Police Station"><Input /></Field>
          <Field label="Investigating Officer"><Input /></Field>
        </Row>
      </div>
    </>
  ),
  // Step 4 — Uploads
  () => (
    <>
      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.5rem' }}>Documents & Evidence Uploads</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
        <UploadArea label="Body Photos (Confidential)" multiple accept=".jpg,.jpeg,.png" />
        <UploadArea label="Identification Documents"   multiple accept=".pdf,.jpg,.jpeg,.png" />
        <UploadArea label="Referral Letter"            multiple accept=".pdf" />
        <UploadArea label="Police Documents"           multiple accept=".pdf,.jpg" />
        <UploadArea label="Medical Records"            multiple accept=".pdf" />
        <UploadArea label="Evidence Photos"            multiple accept=".jpg,.jpeg,.png" />
      </div>
    </>
  ),
];

const RegisterDeceased = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [currentStep, setCurrentStep] = useState(0);

  const StepContent = STEPS_CONTENT[currentStep];

  return (
    <DashboardLayout>
      <div className="deceased-inner">
        <PageHeader
          title={isEdit ? 'Edit Deceased Record' : 'Register Deceased'}
          description={isEdit ? 'Update the deceased record details' : 'Complete all steps to register a new body'}
          breadcrumbs={[{ label: 'Dashboard' }, { label: 'Deceased' }, { label: isEdit ? 'Edit' : 'Register' }]}
          actions={
            <button className="btn-secondary" onClick={() => navigate('/deceased')}>
              <FileText size={16} /> Save Draft
            </button>
          }
        />

        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            {/* Stepper */}
            <Stepper steps={steps} currentStep={currentStep} />

            {/* Step Content */}
            <div style={{ marginTop: '2.5rem', minHeight: '340px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                >
                  <StepContent />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9',
            }}>
              <button
                className="btn-secondary"
                onClick={() => setCurrentStep(p => Math.max(p - 1, 0))}
                disabled={currentStep === 0}
                style={{ opacity: currentStep === 0 ? 0.4 : 1 }}
              >
                <ArrowLeft size={16} /> Back
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {steps.map((_, i) => (
                  <div key={i} style={{
                    width: i === currentStep ? '20px' : '8px', height: '8px',
                    borderRadius: '9999px',
                    background: i === currentStep ? '#2563eb' : i < currentStep ? '#93c5fd' : '#e2e8f0',
                    transition: 'all 0.3s',
                  }} />
                ))}
              </div>

              {currentStep === steps.length - 1 ? (
                <button className="btn-primary" onClick={() => navigate('/deceased')} style={{ background: '#16a34a' }}>
                  <Save size={16} /> Submit Registration
                </button>
              ) : (
                <button className="btn-primary" onClick={() => setCurrentStep(p => Math.min(p + 1, steps.length - 1))}>
                  Next <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RegisterDeceased;
