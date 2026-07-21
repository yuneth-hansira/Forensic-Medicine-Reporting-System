import React from 'react';
import { motion } from 'framer-motion';

const StatisticsCard = ({ title, value, icon: Icon, color, trend }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(226,232,240,0.6)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
        borderRadius: '20px',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: '0.8rem', fontWeight: 500, color: '#64748b', marginBottom: '0.25rem', letterSpacing: '0.02em' }}>
            {title}
          </p>
          <h3 style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>
            {value}
          </h3>
          {trend && (
            <p style={{ fontSize: '0.78rem', marginTop: '0.5rem', fontWeight: 600, color: trend.isPositive ? '#16a34a' : '#f59e0b', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {trend.label}
            </p>
          )}
        </div>

        <div style={{
          padding: '0.75rem',
          borderRadius: '14px',
          backgroundColor: `${color}18`,
          color: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {Icon && <Icon size={22} />}
        </div>
      </div>
    </motion.div>
  );
};

export default StatisticsCard;
