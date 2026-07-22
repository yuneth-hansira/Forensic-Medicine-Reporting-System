const pool = require('../config/db');

// @desc    Get all investigations
// @route   GET /api/investigations
// @access  Private
exports.getAllInvestigations = async (req, res) => {
    try {
        const [investigations] = await pool.query(`
            SELECT i.*, c.Status as Case_Status 
            FROM Investigation i
            LEFT JOIN \`Case\` c ON i.Case_ID = c.Case_ID
            ORDER BY i.Investigation_ID DESC
        `);
        res.json(investigations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching investigations' });
    }
};

// @desc    Get single investigation by ID
// @route   GET /api/investigations/:id
// @access  Private
exports.getInvestigationById = async (req, res) => {
    try {
        const [investigations] = await pool.query(`
            SELECT i.*, c.Status as Case_Status 
            FROM Investigation i
            LEFT JOIN \`Case\` c ON i.Case_ID = c.Case_ID
            WHERE i.Investigation_ID = ?
        `, [req.params.id]);
        
        if (investigations.length === 0) {
            return res.status(404).json({ message: 'Investigation not found' });
        }
        res.json(investigations[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching investigation by id' });
    }
};

// @desc    Create Investigation
// @route   POST /api/investigations
// @access  Private
exports.createInvestigation = async (req, res) => {
    try {
        const { Case_ID, Type, Institution_Referred, Result } = req.body;
        
        if (!Case_ID) {
            return res.status(400).json({ message: 'Case ID is required' });
        }

        const [result] = await pool.query(
            'INSERT INTO Investigation (Case_ID, Type, Institution_Referred, Result) VALUES (?, ?, ?, ?)',
            [Case_ID, Type || null, Institution_Referred || null, Result || null]
        );
        
        res.status(201).json({ 
            message: 'Investigation created successfully', 
            Investigation_ID: result.insertId 
        });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
             return res.status(400).json({ message: 'Invalid Case ID. The case does not exist.' });
        }
        res.status(500).json({ message: 'Server error creating investigation' });
    }
};

// @desc    Update Investigation
// @route   PUT /api/investigations/:id
// @access  Private
exports.updateInvestigation = async (req, res) => {
    try {
        const { Case_ID, Type, Institution_Referred, Result } = req.body;
        const id = req.params.id;

        const [result] = await pool.query(
            'UPDATE Investigation SET Case_ID = ?, Type = ?, Institution_Referred = ?, Result = ? WHERE Investigation_ID = ?',
            [Case_ID, Type || null, Institution_Referred || null, Result || null, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Investigation not found' });
        }

        res.json({ message: 'Investigation updated successfully' });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
             return res.status(400).json({ message: 'Invalid Case ID. The case does not exist.' });
        }
        res.status(500).json({ message: 'Server error updating investigation' });
    }
};

// @desc    Delete Investigation
// @route   DELETE /api/investigations/:id
// @access  Private
exports.deleteInvestigation = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Investigation WHERE Investigation_ID = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Investigation not found' });
        }

        res.json({ message: 'Investigation deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error deleting investigation' });
    }
};
