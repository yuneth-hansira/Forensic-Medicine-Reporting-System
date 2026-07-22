const pool = require('../config/db');

// @desc    Get all Reports
// @route   GET /api/reports
// @access  Private
exports.getReports = async (req, res) => {
    try {
        const [records] = await pool.query(`
            SELECT r.*, 
                   c.MLEF_No_or_PM_No as FMMS_Case_Number,
                   d.Name as Doctor_Name
            FROM Report r
            LEFT JOIN \`Case\` c ON r.Case_ID = c.Case_ID
            LEFT JOIN Doctor d ON r.Doctor_ID = d.Doctor_ID
            ORDER BY r.Report_ID DESC
        `);
        res.json(records);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching reports' });
    }
};

// @desc    Get Report by ID
// @route   GET /api/reports/:id
// @access  Private
exports.getReportById = async (req, res) => {
    try {
        const [records] = await pool.query('SELECT * FROM Report WHERE Report_ID = ?', [req.params.id]);
        if (records.length === 0) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.json(records[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching report by id' });
    }
};

// @desc    Get Reports by Case ID
// @route   GET /api/reports/case/:caseId
// @access  Private
exports.getReportsByCaseId = async (req, res) => {
    try {
        const [records] = await pool.query('SELECT * FROM Report WHERE Case_ID = ?', [req.params.caseId]);
        res.json(records);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching reports for case' });
    }
};

// @desc    Add new Report
// @route   POST /api/reports
// @access  Private
exports.createReport = async (req, res) => {
    try {
        const { Case_ID, Doctor_ID, Report_Type, Report_Date, Date_Of_Dispatch, Signature } = req.body;
        
        if (!Case_ID) {
            return res.status(400).json({ message: 'Case_ID is required' });
        }

        const [result] = await pool.query(
            'INSERT INTO Report (Case_ID, Doctor_ID, Report_Type, Report_Date, Date_Of_Dispatch, Signature) VALUES (?, ?, ?, ?, ?, ?)',
            [Case_ID, Doctor_ID || null, Report_Type || null, Report_Date || null, Date_Of_Dispatch || null, Signature || null]
        );
        
        res.status(201).json({ 
            message: 'Report added successfully', 
            Report_ID: result.insertId 
        });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
             return res.status(400).json({ message: 'Invalid Case_ID or Doctor_ID provided' });
        }
        res.status(500).json({ message: 'Server error adding report' });
    }
};

// @desc    Update Report
// @route   PUT /api/reports/:id
// @access  Private
exports.updateReport = async (req, res) => {
    try {
        const { Doctor_ID, Report_Type, Report_Date, Date_Of_Dispatch, Signature } = req.body;
        const reportId = req.params.id;

        const [result] = await pool.query(
            'UPDATE Report SET Doctor_ID = ?, Report_Type = ?, Report_Date = ?, Date_Of_Dispatch = ?, Signature = ? WHERE Report_ID = ?',
            [Doctor_ID || null, Report_Type || null, Report_Date || null, Date_Of_Dispatch || null, Signature || null, reportId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.json({ message: 'Report updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error updating report' });
    }
};

// @desc    Delete Report
// @route   DELETE /api/reports/:id
// @access  Private
exports.deleteReport = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Report WHERE Report_ID = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Report not found' });
        }

        

        res.json({ message: 'Report deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error deleting report' });
    }
};

// @desc    Get certificates of receipt
// @route   GET /api/reports/certificates
// @access  Private
exports.getCertificates = async (req, res) => {
    try {
        const [certificates] = await pool.query('SELECT * FROM Certificate_Of_Receipt');
        res.json(certificates);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching certificates' });
    }
};
