const pool = require('../config/db');

// @desc    Get all Certificates
// @route   GET /api/certificates
// @access  Private
exports.getAllCertificates = async (req, res) => {
    try {
        const [records] = await pool.query(`
            SELECT cert.*, 
                   c.MLEF_No_or_PM_No as FMMS_Case_Number,
                   d.Full_Name as Doctor_Name
            FROM Certificate_Of_Receipt cert
            LEFT JOIN \`Case\` c ON cert.Case_ID = c.Case_ID
            LEFT JOIN Doctor d ON cert.Doctor_ID = d.Doctor_ID
            ORDER BY cert.Receipt_ID DESC
        `);
        res.json(records);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching certificates' });
    }
};

// @desc    Get Certificate by ID
// @route   GET /api/certificates/:id
// @access  Private
exports.getCertificateById = async (req, res) => {
    try {
        const [records] = await pool.query('SELECT * FROM Certificate_Of_Receipt WHERE Receipt_ID = ?', [req.params.id]);
        if (records.length === 0) {
            return res.status(404).json({ message: 'Certificate not found' });
        }
        res.json(records[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching certificate by id' });
    }
};

// @desc    Get Certificates by Case ID
// @route   GET /api/certificates/case/:caseId
// @access  Private
exports.getCertificatesByCase = async (req, res) => {
    try {
        const [records] = await pool.query('SELECT * FROM Certificate_Of_Receipt WHERE Case_ID = ?', [req.params.caseId]);
        res.json(records);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching certificates for case' });
    }
};

// @desc    Add new Certificate
// @route   POST /api/certificates
// @access  Private
exports.createCertificate = async (req, res) => {
    try {
        const { Report_ID, Case_ID, Doctor_ID, Court_Reference, Findings, Injury_Description, Conclusion, Report_Date } = req.body;
        
        if (!Report_ID || !Case_ID) {
            return res.status(400).json({ message: 'Report_ID and Case_ID are required' });
        }

        const [result] = await pool.query(
            'INSERT INTO Certificate_Of_Receipt (Report_ID, Case_ID, Doctor_ID, Court_Reference, Findings, Injury_Description, Conclusion, Report_Date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [Report_ID, Case_ID, Doctor_ID || null, Court_Reference || null, Findings || null, Injury_Description || null, Conclusion || null, Report_Date || null]
        );
        
        res.status(201).json({ 
            message: 'Certificate added successfully', 
            Receipt_ID: result.insertId 
        });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'A certificate for this Report_ID already exists (UNIQUE constraint)' });
        }
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
             return res.status(400).json({ message: 'Invalid Report_ID, Case_ID or Doctor_ID provided' });
        }
        res.status(500).json({ message: 'Server error adding certificate' });
    }
};

// @desc    Update Certificate
// @route   PUT /api/certificates/:id
// @access  Private
exports.updateCertificate = async (req, res) => {
    try {
        const { Doctor_ID, Court_Reference, Findings, Injury_Description, Conclusion, Report_Date } = req.body;
        const receiptId = req.params.id;

        const [result] = await pool.query(
            'UPDATE Certificate_Of_Receipt SET Doctor_ID = ?, Court_Reference = ?, Findings = ?, Injury_Description = ?, Conclusion = ?, Report_Date = ? WHERE Receipt_ID = ?',
            [Doctor_ID || null, Court_Reference || null, Findings || null, Injury_Description || null, Conclusion || null, Report_Date || null, receiptId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Certificate not found' });
        }

        res.json({ message: 'Certificate updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error updating certificate' });
    }
};

// @desc    Delete Certificate
// @route   DELETE /api/certificates/:id
// @access  Private
exports.deleteCertificate = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Certificate_Of_Receipt WHERE Receipt_ID = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Certificate not found' });
        }

        res.json({ message: 'Certificate deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error deleting certificate' });
    }
};
