const pool = require('../config/db');

// @desc    Get all hospitals
// @route   GET /api/hospitals
exports.getHospitals = async (req, res) => {
    try {
        const [hospitals] = await pool.query('SELECT * FROM Hospital');
        res.json(hospitals);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Get all wards for a hospital
// @route   GET /api/hospitals/:id/wards
exports.getWards = async (req, res) => {
    try {
        const [wards] = await pool.query('SELECT * FROM Ward WHERE Hospital_ID = ?', [req.params.id]);
        res.json(wards);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
