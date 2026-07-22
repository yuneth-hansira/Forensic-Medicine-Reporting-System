const pool = require('../config/db');

// @desc    Get all hospitals
// @route   GET /api/hospitals
// @access  Private
exports.getHospitals = async (req, res) => {
    try {
        const [hospitals] = await pool.query('SELECT * FROM Hospital ORDER BY Hospital_ID DESC');
        res.json(hospitals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching hospitals' });
    }
};

// @desc    Get Hospital by ID
// @route   GET /api/hospitals/:id
// @access  Private
exports.getHospitalById = async (req, res) => {
    try {
        const [records] = await pool.query('SELECT * FROM Hospital WHERE Hospital_ID = ?', [req.params.id]);
        if (records.length === 0) {
            return res.status(404).json({ message: 'Hospital not found' });
        }
        res.json(records[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching hospital by id' });
    }
};

// @desc    Add new Hospital
// @route   POST /api/hospitals
// @access  Private
exports.createHospital = async (req, res) => {
    try {
        const { Hospital_Name, Address, Contact_No } = req.body;
        
        if (!Hospital_Name) {
            return res.status(400).json({ message: 'Hospital_Name is required' });
        }

        const [result] = await pool.query(
            'INSERT INTO Hospital (Hospital_Name, Address, Contact_No) VALUES (?, ?, ?)',
            [Hospital_Name, Address || null, Contact_No || null]
        );
        
        res.status(201).json({ 
            message: 'Hospital added successfully', 
            Hospital_ID: result.insertId 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error adding hospital' });
    }
};

// @desc    Update Hospital
// @route   PUT /api/hospitals/:id
// @access  Private
exports.updateHospital = async (req, res) => {
    try {
        const { Hospital_Name, Address, Contact_No } = req.body;
        const hospitalId = req.params.id;

        const [result] = await pool.query(
            'UPDATE Hospital SET Hospital_Name = ?, Address = ?, Contact_No = ? WHERE Hospital_ID = ?',
            [Hospital_Name, Address || null, Contact_No || null, hospitalId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Hospital not found' });
        }

        res.json({ message: 'Hospital updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error updating hospital' });
    }
};

// @desc    Delete Hospital
// @route   DELETE /api/hospitals/:id
// @access  Private
exports.deleteHospital = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Hospital WHERE Hospital_ID = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Hospital not found' });
        }

        res.json({ message: 'Hospital deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error deleting hospital' });
    }
};

// @desc    Get all wards for a hospital
// @route   GET /api/hospitals/:id/wards
// @access  Private
exports.getWards = async (req, res) => {
    try {
        const [wards] = await pool.query('SELECT * FROM Ward WHERE Hospital_ID = ?', [req.params.id]);
        res.json(wards);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching wards' });
    }
};
