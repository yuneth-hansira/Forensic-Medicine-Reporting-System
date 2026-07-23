const pool = require('../config/db');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Private
exports.getAllDoctors = async (req, res) => {
    try {
        const [doctors] = await pool.query(`
            SELECT d.*, u.Username
            FROM Doctor d
            LEFT JOIN User u ON d.User_ID = u.User_ID
            ORDER BY d.Doctor_ID DESC
        `);
        res.json(doctors);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching doctors' });
    }
};

// @desc    Get single doctor by ID
// @route   GET /api/doctors/:id
// @access  Private
exports.getDoctorById = async (req, res) => {
    try {
        const [doctors] = await pool.query(`
            SELECT d.*, u.Username
            FROM Doctor d
            LEFT JOIN User u ON d.User_ID = u.User_ID
            WHERE d.Doctor_ID = ?
        `, [req.params.id]);
        if (doctors.length === 0) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(doctors[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching doctor by id' });
    }
};

// @desc    Add new Doctor
// @route   POST /api/doctors
// @access  Private
exports.createDoctor = async (req, res) => {
    try {
        const { User_ID, Name, Designation, SLMC_Reg_No, Contact_No } = req.body;
        
        if (!Name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const [result] = await pool.query(
            'INSERT INTO Doctor (User_ID, Name, Designation, SLMC_Reg_No, Contact_No) VALUES (?, ?, ?, ?, ?)',
            [User_ID || null, Name, Designation || null, SLMC_Reg_No || null, Contact_No || null]
        );
        
        res.status(201).json({ 
            message: 'Doctor added successfully', 
            Doctor_ID: result.insertId 
        });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_DUP_ENTRY') {
             return res.status(400).json({ message: 'SLMC Registration Number already exists' });
        }
        res.status(500).json({ message: 'Server error adding doctor' });
    }
};

// @desc    Update Doctor
// @route   PUT /api/doctors/:id
// @access  Private
exports.updateDoctor = async (req, res) => {
    try {
        const { User_ID, Name, Designation, SLMC_Reg_No, Contact_No } = req.body;
        const id = req.params.id;

        const [result] = await pool.query(
            'UPDATE Doctor SET User_ID = ?, Name = ?, Designation = ?, SLMC_Reg_No = ?, Contact_No = ? WHERE Doctor_ID = ?',
            [User_ID || null, Name || null, Designation || null, SLMC_Reg_No || null, Contact_No || null, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.json({ message: 'Doctor updated successfully' });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_DUP_ENTRY') {
             return res.status(400).json({ message: 'SLMC Registration Number already exists' });
        }
        res.status(500).json({ message: 'Server error updating doctor' });
    }
};

// @desc    Delete Doctor
// @route   DELETE /api/doctors/:id
// @access  Private
exports.deleteDoctor = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Find associated User_ID
        const [docs] = await connection.query('SELECT User_ID FROM Doctor WHERE Doctor_ID = ?', [req.params.id]);
        
        if (docs.length === 0) {
            await connection.rollback();
            return res.status(404).json({ message: 'Doctor not found' });
        }
        
        const userId = docs[0].User_ID;

        // 2. Delete Doctor record
        await connection.query('DELETE FROM Doctor WHERE Doctor_ID = ?', [req.params.id]);
        
        // 3. Delete associated User record if it exists
        if (userId) {
            await connection.query('DELETE FROM User WHERE User_ID = ?', [userId]);
        }

        await connection.commit();
        res.json({ message: 'Doctor and associated user account deleted successfully' });
    } catch (err) {
        await connection.rollback();
        console.error(err);
        res.status(500).json({ message: 'Server error deleting doctor' });
    } finally {
        connection.release();
    }
};
