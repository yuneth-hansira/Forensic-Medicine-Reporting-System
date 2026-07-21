import React from 'react';
import { Check } from 'lucide-react';

const Stepper = ({ steps, currentStep }) => {
  return (
    <div style={{ width: '100%', paddingBottom: '2.5rem', marginBottom: '1rem', position: 'relative' }}>
      {/* Background track */}
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: '20px',
        height: '4px',
        background: '#e2e8f0',
        borderRadius: '9999px',
        zIndex: 0,
      }} />
      {/* Active track */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: '20px',
        height: '4px',
        background: '#2563eb',
        borderRadius: '9999px',
        zIndex: 0,
        width: `${(currentStep / (steps.length - 1)) * 100}%`,
        transition: 'width 0.4s ease',
      }} />

      {/* Step dots */}
      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: '0.875rem',
                transition: 'all 0.3s',
                boxShadow: isActive ? '0 0 0 4px rgba(37,99,235,0.15)' : '0 1px 3px rgba(0,0,0,0.08)',
                background: isCompleted ? '#2563eb' : isActive ? '#fff' : '#fff',
                border: isCompleted ? '2px solid #2563eb' : isActive ? '2px solid #2563eb' : '1px solid #e2e8f0',
                color: isCompleted ? '#fff' : isActive ? '#2563eb' : '#94a3b8',
              }}>
                {isCompleted ? <Check size={18} strokeWidth={3} /> : index + 1}
              </div>
              <span style={{
                position: 'absolute',
                top: '48px',
                whiteSpace: 'nowrap',
                fontSize: '0.72rem',
                fontWeight: 600,
                color: isActive ? '#2563eb' : isCompleted ? '#374151' : '#94a3b8',
                letterSpacing: '0.02em',
              }}>
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
