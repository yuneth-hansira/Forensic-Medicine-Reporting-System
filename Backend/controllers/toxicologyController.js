const pool = require('../config/db');

// @desc    Get all toxicology reports
// @route   GET /api/toxicology
// @access  Private
exports.getAllReports = async (req, res) => {
    try {
        const [reports] = await pool.query(`
            SELECT t.*, s.Specimen_Type 
            FROM Toxicology_Report t
            LEFT JOIN Specimen s ON t.Specimen_ID = s.Specimen_ID
            ORDER BY t.Toxicology_ID DESC
        `);
        res.json(reports);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching toxicology reports' });
    }
};

// @desc    Get single toxicology report by ID
// @route   GET /api/toxicology/:id
// @access  Private
exports.getReportById = async (req, res) => {
    try {
        const [reports] = await pool.query(`
            SELECT t.*, s.Specimen_Type 
            FROM Toxicology_Report t
            LEFT JOIN Specimen s ON t.Specimen_ID = s.Specimen_ID
            WHERE t.Toxicology_ID = ?
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

// @desc    Create Toxicology Report
// @route   POST /api/toxicology
// @access  Private
exports.createReport = async (req, res) => {
    try {
        const { Specimen_ID, Substance_Tested, Result, Analyst_Name, Test_Date } = req.body;
        
        if (!Specimen_ID) {
            return res.status(400).json({ message: 'Specimen ID is required' });
        }

        const [result] = await pool.query(
            'INSERT INTO Toxicology_Report (Specimen_ID, Substance_Tested, Result, Analyst_Name, Test_Date) VALUES (?, ?, ?, ?, ?)',
            [Specimen_ID, Substance_Tested || null, Result || null, Analyst_Name || null, Test_Date || null]
        );
        
        res.status(201).json({ 
            message: 'Toxicology report created successfully', 
            Toxicology_ID: result.insertId 
        });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
             return res.status(400).json({ message: 'Invalid Specimen ID. The referenced record does not exist.' });
        }
        res.status(500).json({ message: 'Server error creating report' });
    }
};

// @desc    Update Toxicology Report
// @route   PUT /api/toxicology/:id
// @access  Private
exports.updateReport = async (req, res) => {
    try {
        const { Specimen_ID, Substance_Tested, Result, Analyst_Name, Test_Date } = req.body;
        const id = req.params.id;

        const [result] = await pool.query(
            'UPDATE Toxicology_Report SET Specimen_ID = ?, Substance_Tested = ?, Result = ?, Analyst_Name = ?, Test_Date = ? WHERE Toxicology_ID = ?',
            [Specimen_ID, Substance_Tested || null, Result || null, Analyst_Name || null, Test_Date || null, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.json({ message: 'Report updated successfully' });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
             return res.status(400).json({ message: 'Invalid Specimen ID. The referenced record does not exist.' });
        }
        res.status(500).json({ message: 'Server error updating report' });
    }
};

// @desc    Delete Toxicology Report
// @route   DELETE /api/toxicology/:id
// @access  Private
exports.deleteReport = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Toxicology_Report WHERE Toxicology_ID = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.json({ message: 'Report deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error deleting report' });
    }
};
