import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = ({ title, description, actions, breadcrumbs }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ marginBottom: '2rem' }}
    >
      {breadcrumbs && (
        <nav style={{ fontSize: '0.8rem', fontWeight: 500, color: '#94a3b8', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {breadcrumbs.map((crumb, idx) => (
            <span key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span style={{ color: idx === breadcrumbs.length - 1 ? '#475569' : '#94a3b8' }}>
                {crumb.label}
              </span>
              {idx < breadcrumbs.length - 1 && <span style={{ color: '#cbd5e1' }}>/</span>}
            </span>
          ))}
        </nav>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', margin: 0, lineHeight: 1.2 }}>{title}</h1>
          {description && (
            <p style={{ color: '#64748b', marginTop: '0.35rem', fontSize: '0.9rem', margin: '0.35rem 0 0 0' }}>{description}</p>
          )}
        </div>

        {actions && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {actions}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PageHeader;
