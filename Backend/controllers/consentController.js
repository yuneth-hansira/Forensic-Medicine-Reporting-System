const pool = require('../config/db');

// @desc    Get all Consents
// @route   GET /api/consents
// @access  Private
exports.getAllConsents = async (req, res) => {
    try {
        const [records] = await pool.query(`
            SELECT c.*, e.Full_Name as Examinee_Name 
            FROM Consent c
            LEFT JOIN Examinee e ON c.Examinee_ID = e.Examinee_ID
            ORDER BY c.Consent_ID DESC
        `);
        res.json(records);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching consents' });
    }
};

// @desc    Get Consent by ID
// @route   GET /api/consents/:id
// @access  Private
exports.getConsentById = async (req, res) => {
    try {
        const [records] = await pool.query('SELECT * FROM Consent WHERE Consent_ID = ?', [req.params.id]);
        if (records.length === 0) {
            return res.status(404).json({ message: 'Consent not found' });
        }
        res.json(records[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching consent by id' });
    }
};

// @desc    Get Consents by Examinee ID
// @route   GET /api/consents/examinee/:examineeId
// @access  Private
exports.getConsentsByExaminee = async (req, res) => {
    try {
        const [records] = await pool.query('SELECT * FROM Consent WHERE Examinee_ID = ?', [req.params.examineeId]);
        res.json(records);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching consents for examinee' });
    }
};

// @desc    Add new Consent
// @route   POST /api/consents
// @access  Private
exports.createConsent = async (req, res) => {
    try {
        const { Examinee_ID, Consent_Type, Consent_Date, Signature } = req.body;
        
        if (!Examinee_ID) {
            return res.status(400).json({ message: 'Examinee_ID is required' });
        }

        const [result] = await pool.query(
            'INSERT INTO Consent (Examinee_ID, Consent_Type, Consent_Date, Signature) VALUES (?, ?, ?, ?)',
            [Examinee_ID, Consent_Type || null, Consent_Date || null, Signature || null]
        );
        
        res.status(201).json({ 
            message: 'Consent added successfully', 
            Consent_ID: result.insertId 
        });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
             return res.status(400).json({ message: 'Invalid Examinee_ID provided' });
        }
        res.status(500).json({ message: 'Server error adding consent' });
    }
};

// @desc    Update Consent
// @route   PUT /api/consents/:id
// @access  Private
exports.updateConsent = async (req, res) => {
    try {
        const { Consent_Type, Consent_Date, Signature } = req.body;
        const consentId = req.params.id;

        const [result] = await pool.query(
            'UPDATE Consent SET Consent_Type = ?, Consent_Date = ?, Signature = ? WHERE Consent_ID = ?',
            [Consent_Type || null, Consent_Date || null, Signature || null, consentId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Consent not found' });
        }

        res.json({ message: 'Consent updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error updating consent' });
    }
};

// @desc    Delete Consent
// @route   DELETE /api/consents/:id
// @access  Private
exports.deleteConsent = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Consent WHERE Consent_ID = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Consent not found' });
        }

        res.json({ message: 'Consent deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error deleting consent' });
    }
};
