import React from 'react';

const STATUS_STYLES = {
  success: { background: '#dcfce7', color: '#15803d', border: '1px solid #bbf7d0' },
  warning: { background: '#fef9c3', color: '#a16207', border: '1px solid #fde68a' },
  danger:  { background: '#fee2e2', color: '#b91c1c', border: '1px solid #fecaca' },
  info:    { background: '#dbeafe', color: '#1d4ed8', border: '1px solid #bfdbfe' },
  default: { background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0' },
};

const StatusBadge = ({ status, type }) => {
  const getStyle = (s, t) => {
    if (t && STATUS_STYLES[t]) return STATUS_STYLES[t];

    const lower = s?.toString().toLowerCase() || '';
    if (lower.includes('released') || lower.includes('completed') || lower.includes('confirmed') || lower.includes('verified')) return STATUS_STYLES.success;
    if (lower.includes('pending') || lower.includes('awaiting')) return STATUS_STYLES.warning;
    if (lower.includes('unidentified') || lower.includes('unknown') || lower.includes('not verified') || lower.includes('not cleared')) return STATUS_STYLES.danger;
    if (lower.includes('identified') || lower.includes('progress')) return STATUS_STYLES.info;
    return STATUS_STYLES.default;
  };

  const style = getStyle(status, type);

  return (
    <span style={{
      ...style,
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0.2rem 0.65rem',
      borderRadius: '9999px',
      fontSize: '0.72rem',
      fontWeight: 600,
      whiteSpace: 'nowrap',
      letterSpacing: '0.02em',
    }}>
      {status}
    </span>
  );
};

export default StatusBadge;
