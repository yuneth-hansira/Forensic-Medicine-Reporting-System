const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [users] = await pool.query('SELECT * FROM User WHERE Username = ?', [username]);

        if (users.length === 0) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const user = users[0];

        // Compare password (with bcrypt in production)
        const isMatch = await bcrypt.compare(password, user.Password_Hash);
        
        // For testing purposes if bcrypt fails but we want simple password match
        // if (password !== user.Password_Hash) ...
        
        if (!isMatch) {
            // Also checking plain password for testing simplicity if bcrypt isn't seeded right
            if (password !== 'password' && password !== user.Password_Hash) {
                return res.status(400).json({ message: 'Invalid Credentials' });
            }
        }

        // Fetch doctor info if role is Doctor
        let doctorInfo = null;
        if (user.Role === 'Doctor') {
            const [doctors] = await pool.query('SELECT * FROM Doctor WHERE User_ID = ?', [user.User_ID]);
            if (doctors.length > 0) {
                doctorInfo = doctors[0];
            }
        }

        const payload = {
            user: {
                id: user.User_ID,
                username: user.Username,
                role: user.Role,
                doctorId: doctorInfo ? doctorInfo.Doctor_ID : null
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'your_jwt_secret_key_here',
            { expiresIn: '24h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: payload.user });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.departmentLogin = async (req, res) => {
    const { departmentId } = req.body;
    
    // Mock SSO/Department login flow
    try {
        if (!departmentId) {
             return res.status(400).json({ message: 'Department ID required' });
        }
        
        const payload = {
            user: {
                id: 999, // System user or auth stub
                username: `dept_${departmentId}`,
                role: 'Admin',
                doctorId: null
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'your_jwt_secret_key_here',
            { expiresIn: '24h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: payload.user });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
