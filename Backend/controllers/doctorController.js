const pool = require('../config/db');

// @desc    Get all doctors
// @route   GET /api/doctors
exports.getDoctors = async (req, res) => {
    try {
        const [doctors] = await pool.query('SELECT * FROM Doctor');
        res.json(doctors);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Get single doctor by ID
// @route   GET /api/doctors/:id
exports.getDoctorById = async (req, res) => {
    try {
        const [doctors] = await pool.query('SELECT * FROM Doctor WHERE Doctor_ID = ?', [req.params.id]);
        if (doctors.length === 0) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(doctors[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
