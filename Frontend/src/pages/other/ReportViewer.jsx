import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileText, Printer, ArrowLeft, Calendar, BarChart3, Clock, Gavel, AlertTriangle } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import api from '../../services/api';
import './ReportViewer.css';

const REPORT_CONFIG = {
  daily: {
    endpoint: '/dashboard/report/daily',
    icon: Calendar,
    color: '#3b82f6',
    columns: ['Case ID', 'MLEF/PM No', 'Type', 'Status', 'Person', 'Doctor', 'Police Station', 'IO'],
    fields: ['Case_ID', 'MLEF_No_or_PM_No', 'Case_Type', 'Case_Status', 'Person_Name', 'Doctor_Name', 'Police_Station', 'Investigating_Officer']
  },
  monthly: {
    endpoint: '/dashboard/report/monthly',
    icon: BarChart3,
    color: '#8b5cf6',
    columns: ['Case ID', 'MLEF/PM No', 'Type', 'Status', 'Date Registered', 'Person', 'Doctor'],
    fields: ['Case_ID', 'MLEF_No_or_PM_No', 'Case_Type', 'Case_Status', 'Date_Registered', 'Person_Name', 'Doctor_Name']
  },
  pending: {
    endpoint: '/dashboard/report/pending',
    icon: Clock,
    color: '#f59e0b',
    columns: ['Case ID', 'MLEF/PM No', 'Type', 'Date Registered', 'Days Pending', 'Person', 'Doctor', 'Police Station'],
    fields: ['Case_ID', 'MLEF_No_or_PM_No', 'Case_Type', 'Date_Registered', 'Days_Pending', 'Person_Name', 'Doctor_Name', 'Police_Station']
  },
  court: {
    endpoint: '/dashboard/report/court',
    icon: Gavel,
    color: '#10b981',
    columns: ['Case ID', 'MLEF/PM No', 'Court', 'Magistrate', 'Court Case No', 'Trial Date', 'Person', 'Doctor'],
    fields: ['Case_ID', 'MLEF_No_or_PM_No', 'Court_Name', 'Magistrate_Name', 'Court_Case_Number', 'Date_Of_Trial', 'Person_Name', 'Doctor_Name']
  },
  statistical: {
    endpoint: '/dashboard/report/statistical',
    icon: BarChart3,
    color: '#ef4444',
    isStatistical: true
  }
};

const ReportViewer = () => {
  const { type } = useParams();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const config = REPORT_CONFIG[type];

  useEffect(() => {
    if (!config) {
      setError('Invalid report type');
      setLoading(false);
      return;
    }

    const fetchReport = async () => {
      try {
        const response = await api.get(config.endpoint);
        setReportData(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load report. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [type]);

  const handlePrint = () => {
    window.print();
  };

  const formatCellValue = (value, field) => {
    if (value === null || value === undefined) return '-';
    if (field.includes('Date') && value) {
      try {
        return new Date(value).toLocaleDateString('en-GB');
      } catch { return value; }
    }
    return String(value);
  };

  const renderStatisticalReport = () => {
    if (!reportData) return null;
    return (
      <div className="statistical-report">
        {/* Summary Totals */}
        <div className="stat-summary-grid">
          {reportData.totals && Object.entries(reportData.totals).map(([key, val]) => (
            <div className="stat-summary-card" key={key}>
              <span className="stat-summary-label">{key.replace('total', '').replace(/([A-Z])/g, ' $1').trim()}</span>
              <span className="stat-summary-value">{val}</span>
            </div>
          ))}
        </div>

        {/* Cases by Type */}
        {reportData.casesByType && reportData.casesByType.length > 0 && (
          <div className="stat-section">
            <h4 className="stat-section-title">Cases by Type</h4>
            <table className="report-table">
              <thead><tr><th>Case Type</th><th>Count</th></tr></thead>
              <tbody>
                {reportData.casesByType.map((row, i) => (
                  <tr key={i}><td>{row.category || '-'}</td><td>{row.count}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Cases by Status */}
        {reportData.casesByStatus && reportData.casesByStatus.length > 0 && (
          <div className="stat-section">
            <h4 className="stat-section-title">Cases by Status</h4>
            <table className="report-table">
              <thead><tr><th>Status</th><th>Count</th></tr></thead>
              <tbody>
                {reportData.casesByStatus.map((row, i) => (
                  <tr key={i}><td>{row.category || '-'}</td><td>{row.count}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Monthly Trend */}
        {reportData.casesPerMonth && (
          <div className="stat-section">
            <h4 className="stat-section-title">Cases Per Month ({new Date().getFullYear()})</h4>
            <table className="report-table">
              <thead><tr><th>Month</th><th>Cases</th></tr></thead>
              <tbody>
                {reportData.casesPerMonth.map((row, i) => (
                  <tr key={i}><td>{row.month}</td><td>{row.count}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Doctor Workload */}
        {reportData.doctorWorkload && reportData.doctorWorkload.length > 0 && (
          <div className="stat-section">
            <h4 className="stat-section-title">Doctor Workload</h4>
            <table className="report-table">
              <thead><tr><th>Doctor</th><th>Reports</th></tr></thead>
              <tbody>
                {reportData.doctorWorkload.map((row, i) => (
                  <tr key={i}><td>{row.doctor || '-'}</td><td>{row.reports_count}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  const renderCasesTable = () => {
    if (!reportData || !reportData.cases) return null;
    if (reportData.cases.length === 0) {
      return (
        <div className="report-empty">
          <AlertTriangle size={40} />
          <p>No records found for this report.</p>
        </div>
      );
    }
    return (
      <div className="report-table-wrapper">
        <table className="report-table">
          <thead>
            <tr>
              {config.columns.map((col, i) => (
                <th key={i}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reportData.cases.map((row, i) => (
              <tr key={i}>
                {config.fields.map((field, j) => (
                  <td key={j}>{formatCellValue(row[field], field)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (!config) {
    return (
      <DashboardLayout>
        <div className="rv-page">
          <div className="rv-error">Invalid report type: "{type}"</div>
        </div>
      </DashboardLayout>
    );
  }

  const IconComponent = config.icon;

  return (
    <DashboardLayout>
      <div className="rv-page">
        {/* Header - hidden on print */}
        <div className="rv-header no-print">
          <div>
            <div className="rv-breadcrumb">
              <Link to="/dashboard">Dashboard</Link><span>/</span><span>Reports</span><span>/</span><span>{reportData?.reportTitle || type}</span>
            </div>
            <h1 className="rv-title">
              <IconComponent size={24} style={{ color: config.color, marginRight: '0.5rem' }} />
              {reportData?.reportTitle || 'Loading Report...'}
            </h1>
          </div>
          <div className="rv-actions">
            <Link to="/dashboard" className="rv-btn rv-btn-secondary">
              <ArrowLeft size={16} /> Back
            </Link>
            <button className="rv-btn rv-btn-primary" onClick={handlePrint} disabled={loading}>
              <Printer size={16} /> Print Report
            </button>
          </div>
        </div>

        {/* Print Header - only visible on print */}
        <div className="print-only print-header">
          <h1>Forensic Medicine Reporting System</h1>
          <h2>{reportData?.reportTitle}</h2>
          <p>Generated on: {reportData?.reportDate || reportData?.reportMonth || new Date().toLocaleDateString('en-GB')}</p>
        </div>

        {/* Report Content */}
        <div className="rv-card">
          {loading ? (
            <div className="rv-loading">
              <div className="rv-spinner"></div>
              <p>Generating report...</p>
            </div>
          ) : error ? (
            <div className="rv-error">{error}</div>
          ) : (
            <>
              {/* Report Meta Info */}
              <div className="rv-meta no-print">
                <div className="rv-meta-item">
                  <span className="rv-meta-label">Report Date</span>
                  <span className="rv-meta-value">{reportData?.reportDate || reportData?.reportMonth || '-'}</span>
                </div>
                <div className="rv-meta-item">
                  <span className="rv-meta-label">Total Records</span>
                  <span className="rv-meta-value">{reportData?.totalCases ?? reportData?.totalPending ?? '-'}</span>
                </div>
              </div>

              {/* Status summary for monthly report */}
              {type === 'monthly' && reportData?.statusSummary && reportData.statusSummary.length > 0 && (
                <div className="rv-status-summary">
                  {reportData.statusSummary.map((s, i) => (
                    <div className="rv-status-chip" key={i}>
                      <span className="rv-status-label">{s.status}</span>
                      <span className="rv-status-count">{s.count}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Table or Statistical view */}
              {config.isStatistical ? renderStatisticalReport() : renderCasesTable()}
            </>
          )}
        </div>

        {/* Print Footer */}
        <div className="print-only print-footer">
          <div className="print-signature-line">
            <div><span>____________________________</span><br />Authorized Signature</div>
            <div><span>____________________________</span><br />Date</div>
          </div>
          <p className="print-disclaimer">This is a computer-generated report from the Forensic Medicine Reporting System.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportViewer;
