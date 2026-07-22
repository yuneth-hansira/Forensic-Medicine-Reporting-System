const pool = require('../config/db');

// @desc    Get all histopathology reports
// @route   GET /api/histopathology
// @access  Private
exports.getAllReports = async (req, res) => {
    try {
        const [reports] = await pool.query(`
            SELECT h.*, s.Specimen_Type 
            FROM Histopathology_Report h
            LEFT JOIN Specimen s ON h.Specimen_ID = s.Specimen_ID
            ORDER BY h.Histo_ID DESC
        `);
        res.json(reports);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching histopathology reports' });
    }
};

// @desc    Get single histopathology report by ID
// @route   GET /api/histopathology/:id
// @access  Private
exports.getReportById = async (req, res) => {
    try {
        const [reports] = await pool.query(`
            SELECT h.*, s.Specimen_Type 
            FROM Histopathology_Report h
            LEFT JOIN Specimen s ON h.Specimen_ID = s.Specimen_ID
            WHERE h.Histo_ID = ?
        `, [req.params.id]);
        
        if (reports.length === 0) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.json(reports[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching report by id' });
    }
};

// @desc    Create Histopathology Report
// @route   POST /api/histopathology
// @access  Private
exports.createReport = async (req, res) => {
    try {
        const { Specimen_ID, Pathologist_ID, Tissue_Type, Findings, Report_Date } = req.body;
        
        if (!Specimen_ID) {
            return res.status(400).json({ message: 'Specimen ID is required' });
        }

        const [result] = await pool.query(
            'INSERT INTO Histopathology_Report (Specimen_ID, Pathologist_ID, Tissue_Type, Findings, Report_Date) VALUES (?, ?, ?, ?, ?)',
            [Specimen_ID, Pathologist_ID || null, Tissue_Type || null, Findings || null, Report_Date || null]
        );
        
        res.status(201).json({ 
            message: 'Histopathology report created successfully', 
            Histo_ID: result.insertId 
        });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
             return res.status(400).json({ message: 'Invalid Specimen ID or Pathologist ID. The referenced record does not exist.' });
        }
        res.status(500).json({ message: 'Server error creating report' });
    }
};

// @desc    Update Histopathology Report
// @route   PUT /api/histopathology/:id
// @access  Private
exports.updateReport = async (req, res) => {
    try {
        const { Specimen_ID, Pathologist_ID, Tissue_Type, Findings, Report_Date } = req.body;
        const id = req.params.id;

        const [result] = await pool.query(
            'UPDATE Histopathology_Report SET Specimen_ID = ?, Pathologist_ID = ?, Tissue_Type = ?, Findings = ?, Report_Date = ? WHERE Histo_ID = ?',
            [Specimen_ID, Pathologist_ID || null, Tissue_Type || null, Findings || null, Report_Date || null, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.json({ message: 'Report updated successfully' });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
             return res.status(400).json({ message: 'Invalid Specimen ID or Pathologist ID. The referenced record does not exist.' });
        }
        res.status(500).json({ message: 'Server error updating report' });
    }
};

// @desc    Delete Histopathology Report
// @route   DELETE /api/histopathology/:id
// @access  Private
exports.deleteReport = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Histopathology_Report WHERE Histo_ID = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.json({ message: 'Report deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error deleting report' });
    }
};
