import React, { useState } from 'react';
import { UploadCloud, X, FileText } from 'lucide-react';

const UploadArea = ({ label, accept = '*', multiple = false, onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const inputId = `file-upload-${(label || 'default').replace(/\s+/g, '-')}`;

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) handleFiles(Array.from(e.dataTransfer.files));
  };

  const handleFileInput = (e) => {
    if (e.target.files?.length) handleFiles(Array.from(e.target.files));
  };

  const handleFiles = (newFiles) => {
    const updated = multiple ? [...files, ...newFiles] : newFiles;
    setFiles(updated);
    onUpload?.(updated);
  };

  const removeFile = (index) => {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    onUpload?.(next);
  };

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}>
          {label}
        </label>
      )}

      <div
        onClick={() => document.getElementById(inputId)?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${isDragging ? '#3b82f6' : '#cbd5e1'}`,
          borderRadius: '14px',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: isDragging ? '#eff6ff' : '#f8fafc',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        <UploadCloud size={40} style={{ color: isDragging ? '#3b82f6' : '#94a3b8', marginBottom: '0.75rem' }} />
        <p style={{ fontSize: '0.875rem', color: '#475569', textAlign: 'center', margin: 0 }}>
          <span style={{ fontWeight: 600, color: '#2563eb' }}>Click to upload</span> or drag and drop
        </p>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
          PNG, JPG, PDF (max 10MB)
        </p>
        <input id={inputId} type="file" style={{ display: 'none' }} accept={accept} multiple={multiple} onChange={handleFileInput} />
      </div>

      {files.length > 0 && (
        <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {files.map((file, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.625rem 0.875rem',
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <div style={{ padding: '0.4rem', background: '#eff6ff', borderRadius: '8px', color: '#2563eb' }}>
                  <FileText size={16} />
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', fontWeight: 500, color: '#334155', margin: 0, maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {file.name}
                  </p>
                  <p style={{ fontSize: '0.7rem', color: '#94a3b8', margin: 0 }}>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px', borderRadius: '6px', display: 'flex' }}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadArea;
