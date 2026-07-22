const pool = require('../config/db');

// @desc    Get all exhibits
// @route   GET /api/exhibits
// @access  Private
exports.getAllExhibits = async (req, res) => {
    try {
        const [exhibits] = await pool.query(`
            SELECT e.*, c.Status as Case_Status 
            FROM Exhibit e
            LEFT JOIN \`Case\` c ON e.Case_ID = c.Case_ID
            ORDER BY e.Exhibit_ID DESC
        `);
        res.json(exhibits);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching exhibits' });
    }
};

// @desc    Get single exhibit by ID
// @route   GET /api/exhibits/:id
// @access  Private
exports.getExhibitById = async (req, res) => {
    try {
        const [exhibits] = await pool.query(`
            SELECT e.*, c.Status as Case_Status 
            FROM Exhibit e
            LEFT JOIN \`Case\` c ON e.Case_ID = c.Case_ID
            WHERE e.Exhibit_ID = ?
        `, [req.params.id]);
        
        if (exhibits.length === 0) {
            return res.status(404).json({ message: 'Exhibit not found' });
        }
        res.json(exhibits[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching exhibit by id' });
    }
};

// @desc    Create Exhibit
// @route   POST /api/exhibits
// @access  Private
exports.createExhibit = async (req, res) => {
    try {
        const { Case_ID, Police_ID, Exhibit_Type, Description, Storage_Location, Handover_Date } = req.body;
        
        if (!Case_ID) {
            return res.status(400).json({ message: 'Case ID is required' });
        }

        const [result] = await pool.query(
            'INSERT INTO Exhibit (Case_ID, Police_ID, Exhibit_Type, Description, Storage_Location, Handover_Date) VALUES (?, ?, ?, ?, ?, ?)',
            [Case_ID, Police_ID || null, Exhibit_Type || null, Description || null, Storage_Location || null, Handover_Date || null]
        );
        
        res.status(201).json({ 
            message: 'Exhibit created successfully', 
            Exhibit_ID: result.insertId 
        });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
             return res.status(400).json({ message: 'Invalid Case ID or Police ID. The referenced record does not exist.' });
        }
        res.status(500).json({ message: 'Server error creating exhibit' });
    }
};

// @desc    Update Exhibit
// @route   PUT /api/exhibits/:id
// @access  Private
exports.updateExhibit = async (req, res) => {
    try {
        const { Case_ID, Police_ID, Exhibit_Type, Description, Storage_Location, Handover_Date } = req.body;
        const id = req.params.id;

        const [result] = await pool.query(
            'UPDATE Exhibit SET Case_ID = ?, Police_ID = ?, Exhibit_Type = ?, Description = ?, Storage_Location = ?, Handover_Date = ? WHERE Exhibit_ID = ?',
            [Case_ID, Police_ID || null, Exhibit_Type || null, Description || null, Storage_Location || null, Handover_Date || null, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Exhibit not found' });
        }

        res.json({ message: 'Exhibit updated successfully' });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
             return res.status(400).json({ message: 'Invalid Case ID or Police ID. The referenced record does not exist.' });
        }
        res.status(500).json({ message: 'Server error updating exhibit' });
    }
};

// @desc    Delete Exhibit
// @route   DELETE /api/exhibits/:id
// @access  Private
exports.deleteExhibit = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Exhibit WHERE Exhibit_ID = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Exhibit not found' });
        }

        res.json({ message: 'Exhibit deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error deleting exhibit' });
    }
};
