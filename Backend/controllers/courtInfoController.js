const pool = require('../config/db');

// @desc    Get Court Info by ID
// @route   GET /api/court-info/:id
// @access  Private
exports.getCourtInfoById = async (req, res) => {
    try {
        const [records] = await pool.query('SELECT * FROM Court_info WHERE Court_ID = ?', [req.params.id]);
        if (records.length === 0) {
            return res.status(404).json({ message: 'Court record not found' });
        }
        res.json(records[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching court information by id' });
    }
};

// @desc    Get all Court Info records
// @route   GET /api/court-info
// @access  Private
exports.getAllCourtInfo = async (req, res) => {
    try {
        const [records] = await pool.query(`
            SELECT c_info.*, c.MLEF_No_or_PM_No as FMMS_Case_Number 
            FROM Court_info c_info
            LEFT JOIN \`Case\` c ON c_info.Case_ID = c.Case_ID
            ORDER BY c_info.Court_ID DESC
        `);
        res.json(records);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching court information' });
    }
};

// @desc    Get Court Info by Case ID
// @route   GET /api/court-info/case/:caseId
// @access  Private
exports.getCourtInfoByCase = async (req, res) => {
    try {
        const [records] = await pool.query('SELECT * FROM Court_info WHERE Case_ID = ?', [req.params.caseId]);
        res.json(records);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching court information for case' });
    }
};

// @desc    Add new Court Info
// @route   POST /api/court-info
// @access  Private
exports.createCourtInfo = async (req, res) => {
    try {
        const { Case_ID, Court_Name, Magistrate_Name, Case_Number, Date_Of_Trial } = req.body;
        
        if (!Case_ID) {
            return res.status(400).json({ message: 'Case_ID is required' });
        }

        const [result] = await pool.query(
            'INSERT INTO Court_info (Case_ID, Court_Name, Magistrate_Name, Case_Number, Date_Of_Trial) VALUES (?, ?, ?, ?, ?)',
            [Case_ID, Court_Name || null, Magistrate_Name || null, Case_Number || null, Date_Of_Trial || null]
        );
        
        res.status(201).json({ 
            message: 'Court information added successfully', 
            Court_ID: result.insertId 
        });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
             return res.status(400).json({ message: 'Invalid Case_ID provided' });
        }
        res.status(500).json({ message: 'Server error adding court information' });
    }
};

// @desc    Update Court Info
// @route   PUT /api/court-info/:id
// @access  Private
exports.updateCourtInfo = async (req, res) => {
    try {
        const { Court_Name, Magistrate_Name, Case_Number, Date_Of_Trial } = req.body;
        const courtId = req.params.id;

        const [result] = await pool.query(
            'UPDATE Court_info SET Court_Name = ?, Magistrate_Name = ?, Case_Number = ?, Date_Of_Trial = ? WHERE Court_ID = ?',
            [Court_Name || null, Magistrate_Name || null, Case_Number || null, Date_Of_Trial || null, courtId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Court record not found' });
        }

        res.json({ message: 'Court information updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error updating court information' });
    }
};

// @desc    Delete Court Info
// @route   DELETE /api/court-info/:id
// @access  Private
exports.deleteCourtInfo = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Court_info WHERE Court_ID = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Court record not found' });
        }

        res.json({ message: 'Court information deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error deleting court information' });
    }
};
