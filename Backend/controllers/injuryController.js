const pool = require('../config/db');

// @desc    Get all Injuries
// @route   GET /api/injuries
// @access  Private
exports.getAllInjuries = async (req, res) => {
    try {
        const [records] = await pool.query(`
            SELECT i.*, c.MLEF_No_or_PM_No as FMMS_Case_Number 
            FROM Injury i
            LEFT JOIN \`Case\` c ON i.Case_ID = c.Case_ID
            ORDER BY i.Injury_ID DESC
        `);
        res.json(records);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching injuries' });
    }
};

// @desc    Get Injury by ID
// @route   GET /api/injuries/:id
// @access  Private
exports.getInjuryById = async (req, res) => {
    try {
        const [records] = await pool.query('SELECT * FROM Injury WHERE Injury_ID = ?', [req.params.id]);
        if (records.length === 0) {
            return res.status(404).json({ message: 'Injury not found' });
        }
        res.json(records[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching injury by id' });
    }
};

// @desc    Get Injuries by Case ID
// @route   GET /api/injuries/case/:caseId
// @access  Private
exports.getInjuriesByCase = async (req, res) => {
    try {
        const [records] = await pool.query('SELECT * FROM Injury WHERE Case_ID = ?', [req.params.caseId]);
        res.json(records);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching injuries for case' });
    }
};

// @desc    Add new Injury
// @route   POST /api/injuries
// @access  Private
exports.createInjury = async (req, res) => {
    try {
        const { Case_ID, Description, Size, Shape, Causative_Weapon } = req.body;
        
        if (!Case_ID) {
            return res.status(400).json({ message: 'Case_ID is required' });
        }

        const [result] = await pool.query(
            'INSERT INTO Injury (Case_ID, Description, Size, Shape, Causative_Weapon) VALUES (?, ?, ?, ?, ?)',
            [Case_ID, Description || null, Size || null, Shape || null, Causative_Weapon || null]
        );
        
        res.status(201).json({ 
            message: 'Injury added successfully', 
            Injury_ID: result.insertId 
        });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
             return res.status(400).json({ message: 'Invalid Case_ID provided' });
        }
        res.status(500).json({ message: 'Server error adding injury' });
    }
};

// @desc    Update Injury
// @route   PUT /api/injuries/:id
// @access  Private
exports.updateInjury = async (req, res) => {
    try {
        const { Description, Size, Shape, Causative_Weapon } = req.body;
        const injuryId = req.params.id;

        const [result] = await pool.query(
            'UPDATE Injury SET Description = ?, Size = ?, Shape = ?, Causative_Weapon = ? WHERE Injury_ID = ?',
            [Description || null, Size || null, Shape || null, Causative_Weapon || null, injuryId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Injury not found' });
        }

        res.json({ message: 'Injury updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error updating injury' });
    }
};

// @desc    Delete Injury
// @route   DELETE /api/injuries/:id
// @access  Private
exports.deleteInjury = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Injury WHERE Injury_ID = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Injury not found' });
        }

        res.json({ message: 'Injury deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error deleting injury' });
    }
};
