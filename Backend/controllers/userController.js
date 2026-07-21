const pool = require('../config/db');

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const [users] = await pool.query('SELECT User_ID, Username, Role, Access_Level FROM user WHERE User_ID = ?', [userId]);
        
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const user = users[0];
        let profileData = { ...user };
        
        const [doctors] = await pool.query('SELECT Doctor_ID, Name, Designation, SLMC_Reg_No, Contact_No FROM doctor WHERE User_ID = ?', [userId]);
        if (doctors.length > 0) {
            profileData = { ...profileData, ...doctors[0] };
        }
        
        res.json(profileData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { Username, Name, Designation, SLMC_Reg_No, Contact_No } = req.body;
        
        const [users] = await pool.query('SELECT Role FROM user WHERE User_ID = ?', [userId]);
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const role = users[0].Role;

        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            if (Username) {
                await connection.query('UPDATE user SET Username = ? WHERE User_ID = ?', [Username, userId]);
            }
            
            const [doctors] = await connection.query('SELECT Doctor_ID FROM doctor WHERE User_ID = ?', [userId]);
            if (doctors.length > 0) {
                await connection.query(
                    'UPDATE doctor SET Name = ?, Designation = ?, SLMC_Reg_No = ?, Contact_No = ? WHERE User_ID = ?',
                    [Name || null, Designation || null, SLMC_Reg_No || null, Contact_No || null, userId]
                );
            } else {
                await connection.query(
                    'INSERT INTO doctor (User_ID, Name, Designation, SLMC_Reg_No, Contact_No) VALUES (?, ?, ?, ?, ?)',
                    [userId, Name || 'Unknown', Designation || null, SLMC_Reg_No || null, Contact_No || null]
                );
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
