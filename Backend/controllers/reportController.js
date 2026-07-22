const pool = require('../config/db');

// @desc    Get all reports
// @route   GET /api/reports
exports.getReports = async (req, res) => {
    try {
        const [reports] = await pool.query('SELECT * FROM Report ORDER BY Report_Date DESC');
        res.json(reports);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Get reports by Case ID
// @route   GET /api/reports/case/:caseId
exports.getReportsByCaseId = async (req, res) => {
    try {
        const [reports] = await pool.query('SELECT * FROM Report WHERE Case_ID = ?', [req.params.caseId]);
        res.json(reports);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Create a report
// @route   POST /api/reports
exports.createReport = async (req, res) => {
    const { Case_ID, Doctor_ID, Report_Type, Report_Date, Date_Of_Dispatch, Signature } = req.body;
    
    try {
        const [result] = await pool.query(
            'INSERT INTO Report (Case_ID, Doctor_ID, Report_Type, Report_Date, Date_Of_Dispatch, Signature) VALUES (?, ?, ?, ?, ?, ?)',
            [Case_ID, Doctor_ID, Report_Type, Report_Date, Date_Of_Dispatch, Signature]
        );
        
        if (req.user) {
            await pool.query(
                'INSERT INTO Audit_Log (User_ID, Action, Table_Affected) VALUES (?, ?, ?)',
                [req.user.id, 'Create Report', 'Report']
            );
        }
        
        res.status(201).json({ message: 'Report created successfully', reportId: result.insertId });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Get certificates of receipt
// @route   GET /api/reports/certificates
exports.getCertificates = async (req, res) => {
    try {
        const [certificates] = await pool.query('SELECT * FROM Certificate_Of_Receipt');
        res.json(certificates);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
