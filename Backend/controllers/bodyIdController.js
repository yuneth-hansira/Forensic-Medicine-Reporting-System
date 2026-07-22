const pool = require('../config/db');

// @desc    Get all Body Identifications
// @route   GET /api/body-id
// @access  Private
exports.getAllBodyIdentifications = async (req, res) => {
    try {
        const [records] = await pool.query(`
            SELECT bi.*, 
                   d.Full_Name as Deceased_Name
            FROM Body_Identification bi
            LEFT JOIN Deceased d ON bi.Deceased_ID = d.Deceased_ID
            ORDER BY bi.Identification_ID DESC
        `);
        res.json(records);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching body identifications' });
    }
};

// @desc    Get Body Identification by ID
// @route   GET /api/body-id/:id
// @access  Private
exports.getBodyIdentificationById = async (req, res) => {
    try {
        const [records] = await pool.query('SELECT * FROM Body_Identification WHERE Identification_ID = ?', [req.params.id]);
        if (records.length === 0) {
            return res.status(404).json({ message: 'Body identification record not found' });
        }
        res.json(records[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching body identification by id' });
    }
};

// @desc    Add new Body Identification
// @route   POST /api/body-id
// @access  Private
exports.createBodyIdentification = async (req, res) => {
    try {
        const { Deceased_ID, Method, Identified_By, Identification_Date, Relationship_To_Deceased } = req.body;
        
        if (!Deceased_ID) {
            return res.status(400).json({ message: 'Deceased_ID is required' });
        }

        const [result] = await pool.query(
            'INSERT INTO Body_Identification (Deceased_ID, Method, Identified_By, Identification_Date, Relationship_To_Deceased) VALUES (?, ?, ?, ?, ?)',
            [Deceased_ID, Method || null, Identified_By || null, Identification_Date || null, Relationship_To_Deceased || null]
        );
        
        res.status(201).json({ 
            message: 'Body identification added successfully', 
            Identification_ID: result.insertId 
        });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
             return res.status(400).json({ message: 'Invalid Deceased_ID provided' });
        }
        res.status(500).json({ message: 'Server error adding body identification' });
    }
};

// @desc    Update Body Identification
// @route   PUT /api/body-id/:id
// @access  Private
exports.updateBodyIdentification = async (req, res) => {
    try {
        const { Method, Identified_By, Identification_Date, Relationship_To_Deceased } = req.body;
        const id = req.params.id;

        const [result] = await pool.query(
            'UPDATE Body_Identification SET Method = ?, Identified_By = ?, Identification_Date = ?, Relationship_To_Deceased = ? WHERE Identification_ID = ?',
            [Method || null, Identified_By || null, Identification_Date || null, Relationship_To_Deceased || null, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Record not found' });
        }

        res.json({ message: 'Record updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error updating record' });
    }
};

// @desc    Delete Body Identification
// @route   DELETE /api/body-id/:id
// @access  Private
exports.deleteBodyIdentification = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Body_Identification WHERE Identification_ID = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Record not found' });
        }

        res.json({ message: 'Record deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error deleting record' });
    }
};
