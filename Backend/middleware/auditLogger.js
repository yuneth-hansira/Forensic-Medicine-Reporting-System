const pool = require('../config/db');

const auditLogger = (req, res, next) => {
    if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
        res.on('finish', async () => {
            // Check if request was successful (2xx status)
            if (res.statusCode >= 200 && res.statusCode < 300) {
                // Do not log authentication requests or audit log management
                if (req.originalUrl.includes('/api/auth')) return;
                if (req.originalUrl.includes('/api/audit-logs')) return;

                let action = '';
                if (req.method === 'POST') action = 'Create';
                if (req.method === 'PUT') action = 'Update';
                if (req.method === 'DELETE') action = 'Delete';

                // Extract table name from URL
                // Example: /api/patients/123 -> Resource: patients
                const pathParts = req.originalUrl.split('?')[0].split('/');
                const resource = pathParts[2]; // assuming /api/{resource}/...
                
                if (!resource) return;

                const tableMap = {
                    'cases': 'Case',
                    'examinees': 'Examinee',
                    'deceased': 'Deceased',
                    'hospitals': 'Hospital',
                    'pm-findings': 'PM_Findings',
                    'specimens': 'Specimen',
                    'histopathology': 'Histopathology',
                    'toxicology': 'Toxicology',
                    'reports': 'Report',
                    'investigations': 'Investigation',
                    'exhibits': 'Exhibit',
                    'referrals': 'Referral',
                    'users': 'User',
                    'patients': 'Patient',
                    'police-info': 'Police_Info',
                    'court-info': 'Court_Info',
                    'doctors': 'Doctor',
                    'clinical-findings': 'Clinical_Findings',
                    'injuries': 'Injury',
                    'documents': 'Document',
                    'consents': 'Consent',
                    'certificates': 'Certificate',
                    'wards': 'Ward',
                    'body-id': 'Body_Identification',
                    'next-of-kin': 'Next_Of_Kin'
                };

                const tableAffected = tableMap[resource] || resource.charAt(0).toUpperCase() + resource.slice(1);
                
                // Get User ID from JWT if available
                const userId = req.user ? req.user.id : null;
                
                try {
                    await pool.query(
                        'INSERT INTO Audit_Log (User_ID, Action, Table_Affected) VALUES (?, ?, ?)',
                        [userId, action, tableAffected]
                    );
                } catch (err) {
                    console.error('Failed to write audit log:', err);
                }
            }
        });
    }
    next();
};

module.exports = auditLogger;
