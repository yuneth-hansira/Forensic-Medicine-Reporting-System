const pool = require('../config/db');

// @desc    Get all Next of Kin records
// @route   GET /api/next-of-kin
// @access  Private
exports.getAllNextOfKin = async (req, res) => {
    try {
        const [records] = await pool.query(`
            SELECT k.*, 
                   d.Full_Name as Deceased_Name
            FROM Next_of_Kin k
            LEFT JOIN Deceased d ON k.Deceased_ID = d.Deceased_ID
            ORDER BY k.Kin_ID DESC
        `);
        res.json(records);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching next of kin' });
    }
};

// @desc    Get Next of Kin by ID
// @route   GET /api/next-of-kin/:id
// @access  Private
exports.getNextOfKinById = async (req, res) => {
    try {
        const [records] = await pool.query('SELECT * FROM Next_of_Kin WHERE Kin_ID = ?', [req.params.id]);
        if (records.length === 0) {
            return res.status(404).json({ message: 'Next of kin record not found' });
        }
        res.json(records[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching next of kin by id' });
    }
};

// @desc    Add new Next of Kin
// @route   POST /api/next-of-kin
// @access  Private
exports.createNextOfKin = async (req, res) => {
    try {
        const { Deceased_ID, Full_Name, Relationship, Contact_No, Address } = req.body;
        
        if (!Deceased_ID) {
            return res.status(400).json({ message: 'Deceased_ID is required' });
        }

        const [result] = await pool.query(
            'INSERT INTO Next_of_Kin (Deceased_ID, Full_Name, Relationship, Contact_No, Address) VALUES (?, ?, ?, ?, ?)',
            [Deceased_ID, Full_Name || null, Relationship || null, Contact_No || null, Address || null]
        );
        
        res.status(201).json({ 
            message: 'Next of kin added successfully', 
            Kin_ID: result.insertId 
        });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
             return res.status(400).json({ message: 'Invalid Deceased_ID provided' });
        }
        res.status(500).json({ message: 'Server error adding next of kin' });
    }
};

// @desc    Update Next of Kin
// @route   PUT /api/next-of-kin/:id
// @access  Private
exports.updateNextOfKin = async (req, res) => {
    try {
        const { Full_Name, Relationship, Contact_No, Address } = req.body;
        const id = req.params.id;

        const [result] = await pool.query(
            'UPDATE Next_of_Kin SET Full_Name = ?, Relationship = ?, Contact_No = ?, Address = ? WHERE Kin_ID = ?',
            [Full_Name || null, Relationship || null, Contact_No || null, Address || null, id]
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

// @desc    Delete Next of Kin
// @route   DELETE /api/next-of-kin/:id
// @access  Private
exports.deleteNextOfKin = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Next_of_Kin WHERE Kin_ID = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Record not found' });
        }

        res.json({ message: 'Record deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error deleting record' });
    }
};
