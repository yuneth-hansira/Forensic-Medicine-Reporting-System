const pool = require('../config/db');

// @desc    Get all specimens
// @route   GET /api/specimens
// @access  Private
exports.getAllSpecimens = async (req, res) => {
    try {
        const [specimens] = await pool.query(`
            SELECT s.*, p.Case_ID 
            FROM Specimen s
            LEFT JOIN Postmortem_Findings p ON s.PM_Finding_ID = p.PM_Finding_ID
            ORDER BY s.Specimen_ID DESC
        `);
        res.json(specimens);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching specimens' });
    }
};

// @desc    Get single specimen by ID
// @route   GET /api/specimens/:id
// @access  Private
exports.getSpecimenById = async (req, res) => {
    try {
        const [specimens] = await pool.query(`
            SELECT s.*, p.Case_ID 
            FROM Specimen s
            LEFT JOIN Postmortem_Findings p ON s.PM_Finding_ID = p.PM_Finding_ID
            WHERE s.Specimen_ID = ?
        `, [req.params.id]);
        
        if (specimens.length === 0) {
            return res.status(404).json({ message: 'Specimen not found' });
        }
        res.json(specimens[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching specimen by id' });
    }
};

// @desc    Create Specimen
// @route   POST /api/specimens
// @access  Private
exports.createSpecimen = async (req, res) => {
    try {
        const { PM_Finding_ID, Specimen_Type, Collection_Date, Storage_Location, Chain_Of_Custody_No } = req.body;
        
        if (!PM_Finding_ID) {
            return res.status(400).json({ message: 'Postmortem Finding ID is required' });
        }

        const [result] = await pool.query(
            'INSERT INTO Specimen (PM_Finding_ID, Specimen_Type, Collection_Date, Storage_Location, Chain_Of_Custody_No) VALUES (?, ?, ?, ?, ?)',
            [PM_Finding_ID, Specimen_Type || null, Collection_Date || null, Storage_Location || null, Chain_Of_Custody_No || null]
        );
        
        res.status(201).json({ 
            message: 'Specimen created successfully', 
            Specimen_ID: result.insertId 
        });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
             return res.status(400).json({ message: 'Invalid Postmortem Finding ID. The referenced record does not exist.' });
        }
        res.status(500).json({ message: 'Server error creating specimen' });
    }
};

// @desc    Update Specimen
// @route   PUT /api/specimens/:id
// @access  Private
exports.updateSpecimen = async (req, res) => {
    try {
        const { PM_Finding_ID, Specimen_Type, Collection_Date, Storage_Location, Chain_Of_Custody_No } = req.body;
        const id = req.params.id;

        const [result] = await pool.query(
            'UPDATE Specimen SET PM_Finding_ID = ?, Specimen_Type = ?, Collection_Date = ?, Storage_Location = ?, Chain_Of_Custody_No = ? WHERE Specimen_ID = ?',
            [PM_Finding_ID, Specimen_Type || null, Collection_Date || null, Storage_Location || null, Chain_Of_Custody_No || null, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Specimen not found' });
        }

        res.json({ message: 'Specimen updated successfully' });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
             return res.status(400).json({ message: 'Invalid Postmortem Finding ID. The referenced record does not exist.' });
        }
        res.status(500).json({ message: 'Server error updating specimen' });
    }
};

// @desc    Delete Specimen
// @route   DELETE /api/specimens/:id
// @access  Private
exports.deleteSpecimen = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Specimen WHERE Specimen_ID = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Specimen not found' });
        }

        res.json({ message: 'Specimen deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error deleting specimen' });
    }
};
