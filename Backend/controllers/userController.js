const pool = require('../config/db');
const bcrypt = require('bcryptjs');

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const [users] = await pool.query('SELECT User_ID, Username, Role, Access_Level FROM User WHERE User_ID = ?', [userId]);
        
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const user = users[0];
        let profileData = { ...user };
        
        res.json(profileData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { Username } = req.body;
        
        const [users] = await pool.query('SELECT Role FROM User WHERE User_ID = ?', [userId]);
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const role = users[0].Role;

        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            if (Username) {
                await connection.query('UPDATE User SET Username = ? WHERE User_ID = ?', [Username, userId]);
            }

            await connection.commit();
            res.json({ message: 'Profile updated successfully' });
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }

    } catch (err) {
        console.error(err.message);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Username or SLMC Reg No already exists.' });
        }
        res.status(500).send('Server error');
    }
};

// Admin CRUD functions
exports.getAllUsers = async (req, res) => {
    try {
        const [records] = await pool.query(`
            SELECT User_ID, Username, Role, Access_Level
            FROM User
            ORDER BY User_ID DESC
        `);
        res.json(records);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching users' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const [records] = await pool.query(`
            SELECT User_ID, Username, Role, Access_Level
            FROM User
            WHERE User_ID = ?
        `, [req.params.id]);
        
        if (records.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(records[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching user by id' });
    }
};

exports.createUser = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const { Username, Password, Role, Access_Level } = req.body;
        
        if (!Username || !Password) {
            return res.status(400).json({ message: 'Username and Password are required' });
        }

        await connection.beginTransaction();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        const [userResult] = await connection.query(
            'INSERT INTO User (Username, Password_Hash, Role, Access_Level) VALUES (?, ?, ?, ?)',
            [Username, hashedPassword, Role || 'JMO', Access_Level || 'Standard']
        );
        
        const userId = userResult.insertId;

        await connection.commit();
        res.status(201).json({ message: 'User created successfully', User_ID: userId });
    } catch (err) {
        await connection.rollback();
        console.error(err);
        if (err.code === 'ER_DUP_ENTRY') {
             return res.status(400).json({ message: 'Username already exists' });
        }
        res.status(500).json({ message: 'Server error creating user' });
    } finally {
        connection.release();
    }
};

exports.updateUser = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const { Username, Password, Role, Access_Level } = req.body;
        const id = req.params.id;

        await connection.beginTransaction();

        let updateQuery = 'UPDATE User SET Username = ?, Role = ?, Access_Level = ?';
        let updateParams = [Username, Role, Access_Level];

        if (Password && Password.trim() !== '') {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(Password, salt);
            updateQuery += ', Password_Hash = ?';
            updateParams.push(hashedPassword);
        }

        updateQuery += ' WHERE User_ID = ?';
        updateParams.push(id);

        const [userResult] = await connection.query(updateQuery, updateParams);

        if (userResult.affectedRows === 0) {
            await connection.rollback();
            return res.status(404).json({ message: 'User not found' });
        }

        await connection.commit();
        res.json({ message: 'User updated successfully' });
    } catch (err) {
        await connection.rollback();
        console.error(err);
        if (err.code === 'ER_DUP_ENTRY') {
             return res.status(400).json({ message: 'Username already exists' });
        }
        res.status(500).json({ message: 'Server error updating user' });
    } finally {
        connection.release();
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM User WHERE User_ID = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error deleting user' });
    }
};
