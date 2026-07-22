const pool = require('../config/db');

// @desc    Get all referrals
// @route   GET /api/referrals
// @access  Private
exports.getAllReferrals = async (req, res) => {
    try {
        const [referrals] = await pool.query(`
            SELECT r.*, c.Status as Case_Status 
            FROM Referral r
            LEFT JOIN \`Case\` c ON r.Case_ID = c.Case_ID
            ORDER BY r.Referral_ID DESC
        `);
        res.json(referrals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching referrals' });
    }
};

// @desc    Get single referral by ID
// @route   GET /api/referrals/:id
// @access  Private
exports.getReferralById = async (req, res) => {
    try {
        const [referrals] = await pool.query(`
            SELECT r.*, c.Status as Case_Status 
            FROM Referral r
            LEFT JOIN \`Case\` c ON r.Case_ID = c.Case_ID
            WHERE r.Referral_ID = ?
        `, [req.params.id]);
        
        if (referrals.length === 0) {
            return res.status(404).json({ message: 'Referral not found' });
        }
        res.json(referrals[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching referral by id' });
    }
};

// @desc    Create Referral
// @route   POST /api/referrals
// @access  Private
exports.createReferral = async (req, res) => {
    try {
        const { Case_ID, Referral_Date, Referral_To, Referral_Report } = req.body;
        
        if (!Case_ID) {
            return res.status(400).json({ message: 'Case ID is required' });
        }

        const [result] = await pool.query(
            'INSERT INTO Referral (Case_ID, Referral_Date, Referral_To, Referral_Report) VALUES (?, ?, ?, ?)',
            [Case_ID, Referral_Date || null, Referral_To || null, Referral_Report || null]
        );
        
        res.status(201).json({ 
            message: 'Referral created successfully', 
            Referral_ID: result.insertId 
        });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
             return res.status(400).json({ message: 'Invalid Case ID. The case does not exist.' });
        }
        res.status(500).json({ message: 'Server error creating referral' });
    }
};

// @desc    Update Referral
// @route   PUT /api/referrals/:id
// @access  Private
exports.updateReferral = async (req, res) => {
    try {
        const { Case_ID, Referral_Date, Referral_To, Referral_Report } = req.body;
        const id = req.params.id;

        const [result] = await pool.query(
            'UPDATE Referral SET Case_ID = ?, Referral_Date = ?, Referral_To = ?, Referral_Report = ? WHERE Referral_ID = ?',
            [Case_ID, Referral_Date || null, Referral_To || null, Referral_Report || null, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Referral not found' });
        }

        res.json({ message: 'Referral updated successfully' });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
             return res.status(400).json({ message: 'Invalid Case ID. The case does not exist.' });
        }
        res.status(500).json({ message: 'Server error updating referral' });
    }
};

// @desc    Delete Referral
// @route   DELETE /api/referrals/:id
// @access  Private
exports.deleteReferral = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Referral WHERE Referral_ID = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Referral not found' });
        }

        res.json({ message: 'Referral deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error deleting referral' });
    }
};
