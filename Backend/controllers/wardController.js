const pool = require('../config/db');

// @desc    Get all wards
// @route   GET /api/wards
// @access  Private
exports.getAllWards = async (req, res) => {
    try {
        const [wards] = await pool.query(`
            SELECT w.*, h.Hospital_Name 
            FROM Ward w
            LEFT JOIN Hospital h ON w.Hospital_ID = h.Hospital_ID
            ORDER BY w.Ward_ID DESC
        `);
        res.json(wards);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching wards' });
    }
};

// @desc    Get Ward by ID
// @route   GET /api/wards/:id
// @access  Private
exports.getWardById = async (req, res) => {
    try {
        const [records] = await pool.query('SELECT * FROM Ward WHERE Ward_ID = ?', [req.params.id]);
        if (records.length === 0) {
            return res.status(404).json({ message: 'Ward not found' });
        }
        res.json(records[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching ward by id' });
    }
};

// @desc    Add new Ward
// @route   POST /api/wards
// @access  Private
exports.createWard = async (req, res) => {
    try {
        const { Hospital_ID, Ward_No, Ward_Name } = req.body;
        
        if (!Hospital_ID) {
            return res.status(400).json({ message: 'Hospital_ID is required' });
        }

        const [result] = await pool.query(
            'INSERT INTO Ward (Hospital_ID, Ward_No, Ward_Name) VALUES (?, ?, ?)',
            [Hospital_ID, Ward_No || null, Ward_Name || null]
        );
        
        res.status(201).json({ 
            message: 'Ward added successfully', 
            Ward_ID: result.insertId 
        });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
             return res.status(400).json({ message: 'Invalid Hospital_ID provided' });
        }
        res.status(500).json({ message: 'Server error adding ward' });
    }
};

// @desc    Update Ward
// @route   PUT /api/wards/:id
// @access  Private
exports.updateWard = async (req, res) => {
    try {
        const { Ward_No, Ward_Name } = req.body;
        const wardId = req.params.id;

        // Note: Generally we don't update the Hospital_ID it belongs to.
        const [result] = await pool.query(
            'UPDATE Ward SET Ward_No = ?, Ward_Name = ? WHERE Ward_ID = ?',
            [Ward_No || null, Ward_Name || null, wardId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Ward not found' });
        }

        res.json({ message: 'Ward updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error updating ward' });
    }
};

// @desc    Delete Ward
// @route   DELETE /api/wards/:id
// @access  Private
exports.deleteWard = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Ward WHERE Ward_ID = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Ward not found' });
        }

        res.json({ message: 'Ward deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error deleting ward' });
    }
};
