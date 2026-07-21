import React from 'react';
import { motion } from 'framer-motion';

const MedicalTable = ({ columns, data, onRowClick }) => {
  return (
    <div style={{ width: '100%', overflowX: 'auto', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            {columns.map((col, idx) => (
              <th key={idx} style={{
                padding: '0.875rem 1.25rem',
                textAlign: 'left',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#64748b',
                whiteSpace: 'nowrap',
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
              }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8', fontWeight: 500 }}>
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: rowIndex * 0.04 }}
                onClick={() => onRowClick && onRowClick(row)}
                style={{
                  borderBottom: rowIndex < data.length - 1 ? '1px solid #f1f5f9' : 'none',
                  cursor: onRowClick ? 'pointer' : 'default',
                  transition: 'background 0.15s',
                }}
                whileHover={{ backgroundColor: '#f8fafc' }}
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} style={{ padding: '1rem 1.25rem', color: '#334155', verticalAlign: 'middle' }}>
                    {col.accessor
                      ? typeof col.accessor === 'function'
                        ? col.accessor(row)
                        : row[col.accessor]
                      : null}
                  </td>
                ))}
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MedicalTable;
