const pool = require('../config/db');

// @desc    Get all Police Info records
// @route   GET /api/police-info
// @access  Private
exports.getAllPoliceInfo = async (req, res) => {
    try {
        const [records] = await pool.query(`
            SELECT p.*, c.MLEF_No_or_PM_No as Case_Number 
            FROM Police_Info p
            LEFT JOIN \`Case\` c ON p.Case_ID = c.Case_ID
            ORDER BY p.Police_ID DESC
        `);
        res.json(records);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching police information' });
    }
};

// @desc    Get Police Info by Case ID
// @route   GET /api/police-info/case/:caseId
// @access  Private
exports.getPoliceInfoByCase = async (req, res) => {
    try {
        const [records] = await pool.query('SELECT * FROM Police_Info WHERE Case_ID = ?', [req.params.caseId]);
        res.json(records);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching police information for case' });
    }
};

// @desc    Add new Police Info
// @route   POST /api/police-info
// @access  Private
exports.createPoliceInfo = async (req, res) => {
    try {
        const { Case_ID, Police_Station, Investigating_Officer, Officer_Reg_No, Officer_Rank } = req.body;
        
        if (!Case_ID) {
            return res.status(400).json({ message: 'Case_ID is required' });
        }

        const [result] = await pool.query(
            'INSERT INTO Police_Info (Case_ID, Police_Station, Investigating_Officer, Officer_Reg_No, Officer_Rank) VALUES (?, ?, ?, ?, ?)',
            [Case_ID, Police_Station || null, Investigating_Officer || null, Officer_Reg_No || null, Officer_Rank || null]
        );
        
        res.status(201).json({ 
            message: 'Police information added successfully', 
            Police_ID: result.insertId 
        });
    } catch (err) {
        console.error(err);
        // Handle constraint violation if Case_ID doesn't exist
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
             return res.status(400).json({ message: 'Invalid Case_ID provided' });
        }
        res.status(500).json({ message: 'Server error adding police information' });
    }
};

// @desc    Update Police Info
// @route   PUT /api/police-info/:id
// @access  Private
exports.updatePoliceInfo = async (req, res) => {
    try {
        const { Police_Station, Investigating_Officer, Officer_Reg_No, Officer_Rank } = req.body;
        const policeId = req.params.id;

        const [result] = await pool.query(
            'UPDATE Police_Info SET Police_Station = ?, Investigating_Officer = ?, Officer_Reg_No = ?, Officer_Rank = ? WHERE Police_ID = ?',
            [Police_Station || null, Investigating_Officer || null, Officer_Reg_No || null, Officer_Rank || null, policeId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Police record not found' });
        }

        res.json({ message: 'Police information updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error updating police information' });
    }
};

// @desc    Delete Police Info
// @route   DELETE /api/police-info/:id
// @access  Private
exports.deletePoliceInfo = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Police_Info WHERE Police_ID = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Police record not found' });
        }

        res.json({ message: 'Police information deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error deleting police information' });
    }
};
